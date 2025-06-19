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

function PaymentTestPage() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentOutcome, setPaymentOutcome] = useState<any | null>(null); // To store result.paymentDetails
  const [paymentError, setPaymentError] = useState<any | null>(null);   // To store result.error
  const [storedCfOrderId, setStoredCfOrderId] = useState<string | null>(null); // State for cf_order_id from initial webhook
  const [isPollingStatus, setIsPollingStatus] = useState(false); // Indicates if auto-polling is active
  const pollingTimeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Using ref for timeout ID
  const pollingActiveRef = useRef(false); // Ref to control polling loop

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

    // This variable will hold the order ID and be accessible in the .then() callback, avoiding stale state.
    let cfOrderIdFromWebhook: string | null = null;

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
        const responseData = await response.json();
        let paymentSessionIdFromWebhook: string | null = null;

        if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].payment_session_id) {
          paymentSessionIdFromWebhook = responseData[0].payment_session_id;
          cfOrderIdFromWebhook = responseData[0].cf_order_id; // Assign to the higher-scoped variable

          if (cfOrderIdFromWebhook) {
            setStoredCfOrderId(cfOrderIdFromWebhook); // Set state for UI display purposes
          } else {
            console.error("cf_order_id not found in initial webhook response");
            toast({
              title: 'Webhook Error',
              description: 'Critical: cf_order_id missing from initial payment setup response.',
              variant: 'destructive',
            });
            setIsLoading(false);
            return;
          }
        } else if (responseData && responseData.payment_session_id) {
          paymentSessionIdFromWebhook = responseData.payment_session_id;
        }

        if (typeof paymentSessionIdFromWebhook === 'string' && paymentSessionIdFromWebhook.trim() !== '') {
          const paymentSessionId = paymentSessionIdFromWebhook;
          try {
            await loadCashfreeSDK();
            if (window.Cashfree) {
              const cashfree = window.Cashfree({ mode: "sandbox" });
              const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: "_modal",
              };
              cashfree.checkout(checkoutOptions).then((result: any) => {
                setIsLoading(false); // Set loading to false only after modal closes
                console.log('Cashfree SDK onSuccess FULL result:', JSON.stringify(result, null, 2));

                // Use the local variable `cfOrderIdFromWebhook` to avoid stale state from closure
                if (cfOrderIdFromWebhook) {
                  console.log('Cashfree modal closed. Starting polling with cfOrderIdFromWebhook:', cfOrderIdFromWebhook);
                  toast({ title: 'Verifying Payment', description: 'Payment modal closed. Checking status...', variant: 'default' });
                  startPaymentStatusPolling(cfOrderIdFromWebhook);
                } else {
                  console.error('CRITICAL: Cannot poll for status because cfOrderIdFromWebhook is missing after modal close.');
                  toast({ title: 'Error', description: 'Payment outcome unclear and no Order ID to verify.', variant: 'destructive' });
                }
              });
            } else {
              throw new Error('Cashfree SDK not available on window object.');
            }
          } catch (sdkError: any) {
            console.error("Cashfree SDK or checkout error:", sdkError);
            toast({ title: 'SDK Error', description: sdkError.message || 'Could not initialize payment.', variant: 'destructive' });
            setIsLoading(false); // Also set loading false on SDK error
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
          setIsLoading(false);
        }
      } else {
        const errorText = await response.text();
        console.error('Webhook error:', response.status, errorText);
        toast({
          title: 'Webhook Error',
          description: `Failed to fetch payment page. Status: ${response.status}. ${errorText}`,
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Network or other error:', error);
      toast({
        title: 'Request Error',
        description: 'An error occurred while contacting the webhook.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
    // DO NOT set isLoading to false here, as the modal is still open. It's handled in the .then() and catch blocks.
  };

  const pollForPaymentStatus = async (currentCfOrderId: string, attempt: number) => {
    // Use the ref to check if polling should continue.
    if (!pollingActiveRef.current) {
        console.log('Polling was stopped externally or component unmounted.');
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

        // CORRECTED: Check 'payment_status' from the webhook response, not 'order_status'
        if (FINAL_PAYMENT_STATUSES.includes(statusData.payment_status) || attempt + 1 >= MAX_POLLING_ATTEMPTS) {
          // Stop polling
          pollingActiveRef.current = false;
          setIsPollingStatus(false);
          if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
          
          toast({
            title: 'Payment Status Finalized',
            description: `Order ${statusData.order_id}: ${statusData.payment_status}. ${statusData.payment_message || ''}`,
            variant: statusData.payment_status === 'PAID' || statusData.payment_status === 'SUCCESS' ? 'default' : 'destructive',
          });
        } else {
          // Schedule next poll only if polling is still active
          if(pollingActiveRef.current) {
            pollingTimeoutIdRef.current = setTimeout(() => pollForPaymentStatus(currentCfOrderId, attempt + 1), POLLING_INTERVAL);
          }
        }
      } else {
        const errorText = await response.text();
        setPaymentError(`Polling error: ${response.status}. ${errorText}`);
        // Stop polling
        pollingActiveRef.current = false;
        setIsPollingStatus(false);
        if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
        toast({ title: 'Polling Error', description: `Could not verify status: ${errorText}`, variant: 'destructive' });
      }
    } catch (error: any) {
      console.error('Polling fetch error:', error);
      setPaymentError(`Polling network error: ${error.message}`);
      // Stop polling
      pollingActiveRef.current = false;
      setIsPollingStatus(false);
      if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
      toast({ title: 'Polling Network Error', description: 'Connection failed while checking status.', variant: 'destructive' });
    }
  };

  const startPaymentStatusPolling = (cfOrderIdToPoll: string) => {
    if (pollingActiveRef.current) {
      console.log('Polling already in progress for:', cfOrderIdToPoll);
      return; 
    }
    console.log('Starting payment status polling for order:', cfOrderIdToPoll);
    
    // Set ref and state to start polling
    pollingActiveRef.current = true;
    setIsPollingStatus(true);
    
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
      pollingActiveRef.current = false; // Signal polling to stop
      if (pollingTimeoutIdRef.current) {
        clearTimeout(pollingTimeoutIdRef.current);
      }
      console.log('PaymentTestPage unmounted, ensuring polling is stopped.');
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
          <p className="text-sm"><strong>Status:</strong> <span className={`font-semibold ${paymentOutcome.payment_status === 'PAID' || paymentOutcome.payment_status === 'SUCCESS' ? 'text-green-600' : 'text-orange-600'}`}>{paymentOutcome.payment_status}</span></p>
          <p className="text-sm"><strong>Cashfree Payment ID:</strong> {paymentOutcome.cf_payment_id}</p>
          <p className="text-sm"><strong>Message:</strong> {paymentOutcome.payment_message || 'No specific message.'}</p>
          <p className="text-sm"><strong>Amount:</strong> {paymentOutcome.order_amount} {paymentOutcome.order_currency}</p>
          <p className="text-sm"><strong>Payment Time:</strong> {paymentOutcome.payment_time ? new Date(paymentOutcome.payment_time).toLocaleString() : 'N/A'}</p>
          {isPollingStatus && (
            <p className="mt-4 text-sm text-blue-600 animate-pulse">Verifying payment status, please wait...</p>
          )}
          {/* Show manual check button if not polling AND status is still ambiguous and not final */}
          {!isPollingStatus && paymentOutcome && 
           (paymentOutcome.payment_message === 'Payment finished. Check status.' || (paymentOutcome.payment_status && paymentOutcome.payment_status === 'PENDING')) && 
           (!paymentOutcome.payment_status || !FINAL_PAYMENT_STATUSES.includes(paymentOutcome.payment_status)) && (
            <Button onClick={handleManualCheckStatus} disabled={isPollingStatus} className="mt-4">
              {isPollingStatus ? 'Checking...' : 'Check Payment Status Manually'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default PaymentTestPage;
