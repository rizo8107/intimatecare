import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

// Function to load the Cashfree SDK script
const loadCashfreeSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('cashfree-sdk')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'cashfree-sdk';
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Cashfree SDK'));
    document.head.appendChild(script);
  });
};

// Declare global window interface for Cashfree
declare global {
  interface Window {
    Cashfree: any; // Or a more specific type if available
  }
}

const PaymentTestPage: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentOutcome, setPaymentOutcome] = useState<any | null>(null); // To store result.paymentDetails
  const [paymentError, setPaymentError] = useState<any | null>(null);   // To store result.error
  const [storedCfOrderId, setStoredCfOrderId] = useState<string | null>(null); // State for cf_order_id from initial webhook
  const [isPollingStatus, setIsPollingStatus] = useState(false); // Indicates if auto-polling is active
  const pollingTimeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Using ref for timeout ID

  const POLLING_INTERVAL = 5000; // 5 seconds
  const MAX_POLLING_ATTEMPTS = 12; // For 1 minute (12 * 5s = 60s)
  const FINAL_PAYMENT_STATUSES = ['PAID', 'FAILED', 'EXPIRED', 'CANCELLED', 'USER_DROPPED', 'VOID', 'ERROR', 'SUCCESS']; // SUCCESS from SDK can be final

  const generateOrderId = () => {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  };

  const handleBookNow = async () => {
    if (!customerName || !customerPhone || !customerEmail) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all customer details.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const order_id = generateOrderId();
    const customer_id = `${customerName.replace(/\s+/g, '_')}_${order_id}`;

    const payload = {
      order_amount: 299,
      order_id: order_id,
      customer_id: customer_id,
      customer_phone: customerPhone,
      customer_email: customerEmail,
    };

    const webhookUrl = 'https://backend-n8n.7za6uc.easypanel.host/webhook/studentpay';
    const username = 'nirmal@lifedemy.in';
    const password = 'Life@123';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json(); // Webhook might return an array or an object
        let paymentSessionIdFromWebhook: string | null = null;

        if (Array.isArray(responseData) && responseData.length > 0) {
          // If it's an array, take the payment_session_id from the first object
          if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].payment_session_id) {
            paymentSessionIdFromWebhook = responseData[0].payment_session_id;
            const cfOrderIdFromWebhook = responseData[0].cf_order_id;

            if (cfOrderIdFromWebhook) {
              setStoredCfOrderId(cfOrderIdFromWebhook);
            } else {
              console.error("cf_order_id not found in initial webhook response");
              toast({
                title: 'Webhook Error',
                description: 'Critical: cf_order_id missing from initial payment setup response.',
                variant: 'destructive',
              });
              setIsLoading(false);
              return; // Stop if we don't have cf_order_id
            }
          }
        } else if (responseData && responseData.payment_session_id) {
          // If it's a direct object (less likely based on your sample, but good to check)
          paymentSessionIdFromWebhook = responseData.payment_session_id;
        }

        if (typeof paymentSessionIdFromWebhook === 'string' && paymentSessionIdFromWebhook.trim() !== '') {
          const paymentSessionId = paymentSessionIdFromWebhook;
          try {
            await loadCashfreeSDK();
            if (window.Cashfree) {
              const cashfree = window.Cashfree({
                mode: "sandbox", // IMPORTANT: Change to "sandbox" if using test/sandbox session IDs
              });
              const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: "_modal", // This ensures it opens as a modal
              };
              cashfree.checkout(checkoutOptions).then((result: any) => {
                console.log('Cashfree SDK onSuccess result.payment:', JSON.stringify(result.payment, null, 2)); // DEBUG LOG
                setPaymentOutcome(result.payment); // Store the full payment details
                setPaymentError(null);

                // If initial status from SDK is SUCCESS but order_status is still PENDING or requires check, start polling
                if (result.payment.payment_status === 'SUCCESS' && 
                    ((result.payment.order_status && result.payment.order_status === 'PENDING') || result.payment.payment_message === 'Payment finished. Check status.')) {
                  if (storedCfOrderId) { // Make sure we have the cf_order_id
                      startPaymentStatusPolling(storedCfOrderId);
                  } else {
                      toast({ title: 'Polling Error', description: 'Cannot start status polling: cf_order_id is missing.', variant: 'destructive' });
                  }
                }   // Clear previous error

                if (result.error) {
                  console.error("Cashfree payment error or user closed modal:", result.error);
                  setPaymentError(result.error);
                  toast({
                    title: result.error.message ? 'Payment Error' : 'Payment Incomplete',
                    description: result.error.message || 'User closed the payment modal or an error occurred.',
                    variant: 'default', // Changed from 'warning' to 'default'
                  });
                }
                if (result.redirect) {
                  // This typically means the SDK couldn't open the modal and had to redirect the whole page.
                  // We might not get further JS execution here if the page redirects away.
                  console.log("Cashfree payment will be redirected (inAppBrowser scenario).");
                }
                if (result.payment) {
                  console.log("Cashfree payment details received:", result.payment);
                  const status = result.payment.order_status || 'UNKNOWN';
                  let toastVariant: 'default' | 'destructive' = 'default'; // Removed 'warning' from type
                  let toastTitle = `Payment Status: ${status}`;

                  if (status === 'PAID') {
                    toastVariant = 'default';
                  } else if (status === 'FAILED' || status === 'USER_DROPPED' || status === 'CANCELLED') {
                    toastVariant = 'destructive';
                  } else { // For PENDING, UNKNOWN, etc.
                    toastVariant = 'default'; // Use 'default' for non-critical, non-success statuses
                    toastTitle = `Payment ${status.toLowerCase()}`; // e.g., Payment pending
                  }
                  toast({
                    title: toastTitle,
                    description: result.payment.paymentMessage || `Order ID: ${result.payment.order_id}`,
                    variant: toastVariant,
                  });
                  // You can add further logic here based on order_status,
                  // e.g., redirecting to a success/failure page.
                }
              });
            } else {
              throw new Error('Cashfree SDK not available on window object.');
            }
          } catch (sdkError: any) {
            console.error("Cashfree SDK or checkout error:", sdkError);
            toast({
              title: 'SDK Error',
              description: sdkError.message || 'Could not initialize payment.',
              variant: 'destructive',
            });
          }
        } else {
          let errorDescription = 'The webhook did not return a valid payment_session_id.';
          if (paymentSessionIdFromWebhook === '') {
            errorDescription = 'The webhook returned an empty payment_session_id.';
          }
          console.error('Webhook response issue. paymentSessionIdFromWebhook:', paymentSessionIdFromWebhook, 'Full responseData:', responseData);
          toast({
            title: 'Webhook Response Error',
            description: errorDescription,
            variant: 'destructive',
          });
        }
      } else {
        const errorText = await response.text();
        console.error('Webhook error:', response.status, errorText);
        toast({
          title: 'Webhook Error',
          description: `Failed to fetch payment page. Status: ${response.status}. ${errorText}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Network or other error:', error);
      toast({
        title: 'Request Error',
        description: 'An error occurred while contacting the webhook.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const pollForPaymentStatus = async (currentCfOrderId: string, attempt: number) => {
    // Check if polling was stopped externally or by unmount, but not for the first call (attempt 0)
    if (!isPollingStatus && attempt > 0) {
        console.log('Polling was stopped or component unmounted.');
        if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
        return;
    }
    console.log(`Polling for order ${currentCfOrderId}, attempt ${attempt + 1}`);
    setPaymentError(null); // Clear previous errors

    const verifyWebhookUrl = 'https://backend-n8n.7za6uc.easypanel.host/webhook/verify';
    const username = 'nirmal@lifedemy.in';
    const password = 'Life@123';

    try {
      const response = await fetch(verifyWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        },
        body: JSON.stringify({ order_id: currentCfOrderId }),
      });

      if (response.ok) {
        const statusData = await response.json();
        setPaymentOutcome(statusData); // Update with the latest status

        if (FINAL_PAYMENT_STATUSES.includes(statusData.order_status) || attempt + 1 >= MAX_POLLING_ATTEMPTS) {
          setIsPollingStatus(false);
          if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
          toast({
            title: 'Payment Status Finalized',
            description: `Order ${statusData.order_id}: ${statusData.order_status}. ${statusData.payment_message || ''}`,
            variant: statusData.order_status === 'PAID' || statusData.order_status === 'SUCCESS' ? 'default' : 'destructive',
          });
        } else {
          // Schedule next poll only if polling is still active
          if(isPollingStatus) {
            pollingTimeoutIdRef.current = setTimeout(() => pollForPaymentStatus(currentCfOrderId, attempt + 1), POLLING_INTERVAL);
          }
        }
      } else {
        const errorText = await response.text();
        setPaymentError(`Polling error: ${response.status}. ${errorText}`);
        setIsPollingStatus(false); // Stop polling on error
        if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
        toast({ title: 'Polling Error', description: `Could not verify status: ${errorText}`, variant: 'destructive' });
      }
    } catch (error: any) {
      console.error('Polling fetch error:', error);
      setPaymentError(`Polling network error: ${error.message}`);
      setIsPollingStatus(false); // Stop polling on error
      if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
      toast({ title: 'Polling Network Error', description: 'Connection failed while checking status.', variant: 'destructive' });
    }
  };

  const startPaymentStatusPolling = (cfOrderIdToPoll: string) => {
    if (isPollingStatus && pollingTimeoutIdRef.current) {
      console.log('Polling already in progress for:', cfOrderIdToPoll);
      return; 
    }
    console.log('Starting payment status polling for order:', cfOrderIdToPoll);
    setIsPollingStatus(true);
    // setPollingAttempts(0); // Attempts are now passed as param
    if (pollingTimeoutIdRef.current) {
      clearTimeout(pollingTimeoutIdRef.current); // Clear any existing timeout just in case
    }
    pollForPaymentStatus(cfOrderIdToPoll, 0); // Start the first poll immediately
  };

  // Manual check status function, can be triggered by button if polling is not active or failed
  const handleManualCheckStatus = () => {
    if (storedCfOrderId) {
      startPaymentStatusPolling(storedCfOrderId);
    } else {
      toast({ title: 'Error', description: 'Cashfree Order ID not found to check status.', variant: 'destructive'});
    }
  };

  useEffect(() => {
    // Cleanup polling on component unmount
    return () => {
      if (pollingTimeoutIdRef.current) {
        clearTimeout(pollingTimeoutIdRef.current);
      }
      // Setting isPollingStatus to false here might be problematic if a poll is in flight
      // The poll function itself checks isPollingStatus before scheduling next
      // and clears timeout on final status or error.
      // Consider if setIsPollingStatus(false) is truly needed here or if it causes race conditions.
      // For now, let's rely on the poll function's internal stop logic and timeout clearing.
      console.log('PaymentTestPage unmounted, ensuring polling timeout is cleared.');
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount.

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Payment Testing Page (Hidden)</h1>
      
      <div className="space-y-4 mb-8 p-6 border rounded-lg shadow-sm">
        <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">
          <strong>Security Warning:</strong> This page uses hardcoded credentials for testing purposes only. 
          Do NOT use this approach in a production environment.
        </p>
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input 
            id="customerName" 
            type="text" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            placeholder="Enter customer name"
          />
        </div>
        <div>
          <Label htmlFor="customerPhone">Customer Phone</Label>
          <Input 
            id="customerPhone" 
            type="tel" 
            value={customerPhone} 
            onChange={(e) => setCustomerPhone(e.target.value)} 
            placeholder="Enter customer phone"
          />
        </div>
        <div>
          <Label htmlFor="customerEmail">Customer Email</Label>
          <Input 
            id="customerEmail" 
            type="email" 
            value={customerEmail} 
            onChange={(e) => setCustomerEmail(e.target.value)} 
            placeholder="Enter customer email"
          />
        </div>
        <Button onClick={handleBookNow} disabled={isLoading} className="w-full">
          {isLoading ? 'Processing...' : 'Book Now & Initiate Payment'}
        </Button>
      </div>

      {paymentError && (
        <div className="mt-6 p-4 border rounded-lg shadow-sm bg-red-50 border-red-200">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Payment Error/Cancelled</h3>
          <p className="text-sm text-red-600"><strong>Code:</strong> {paymentError.code}</p>
          <p className="text-sm text-red-600"><strong>Message:</strong> {paymentError.message || 'User may have closed the payment window.'}</p>
        </div>
      )}

      {paymentOutcome && (
        <div className="mt-6 p-4 border rounded-lg shadow-sm bg-green-50 border-green-200">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Payment Outcome</h3>
          <p className="text-sm"><strong>Order ID:</strong> {paymentOutcome.order_id}</p>
          <p className="text-sm"><strong>Status:</strong> <span className={`font-semibold ${paymentOutcome.order_status === 'PAID' ? 'text-green-600' : 'text-orange-600'}`}>{paymentOutcome.order_status}</span></p>
          <p className="text-sm"><strong>Cashfree Payment ID:</strong> {paymentOutcome.cf_payment_id}</p>
          <p className="text-sm"><strong>Message:</strong> {paymentOutcome.paymentMessage || 'No specific message.'}</p>
          <p className="text-sm"><strong>Amount:</strong> {paymentOutcome.order_amount} {paymentOutcome.order_currency}</p>
          <p className="text-sm"><strong>Payment Time:</strong> {paymentOutcome.payment_time ? new Date(paymentOutcome.payment_time).toLocaleString() : 'N/A'}</p>
          {isPollingStatus && (
            <p className="mt-4 text-sm text-blue-600 animate-pulse">Verifying payment status, please wait...</p>
          )}
          {/* Show manual check button if not polling AND status is still ambiguous and not final */}
          {!isPollingStatus && paymentOutcome && 
           (paymentOutcome.paymentMessage === 'Payment finished. Check status.' || (paymentOutcome.order_status && paymentOutcome.order_status === 'PENDING')) && 
           (!paymentOutcome.order_status || !FINAL_PAYMENT_STATUSES.includes(paymentOutcome.order_status)) && (
            <Button onClick={handleManualCheckStatus} disabled={isPollingStatus} className="mt-4">
              {isPollingStatus ? 'Checking...' : 'Check Payment Status Manually'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentTestPage;
