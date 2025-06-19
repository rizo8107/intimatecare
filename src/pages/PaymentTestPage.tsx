import React, { useState } from 'react';
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
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);   // New state for checking status
  // No longer need paymentHtml state as we'll invoke SDK directly

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

    const webhookUrl = 'https://backend-n8n.7za6uc.easypanel.host/webhook-test/studentpay';
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
          if (responseData[0] && responseData[0].payment_session_id) {
            paymentSessionIdFromWebhook = responseData[0].payment_session_id;
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
                mode: "production", // IMPORTANT: Change to "sandbox" if using test/sandbox session IDs
              });
              const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: "_modal", // This ensures it opens as a modal
              };
              cashfree.checkout(checkoutOptions).then((result: any) => {
                setPaymentOutcome(null); // Clear previous outcome
                setPaymentError(null);   // Clear previous error

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
                if (result.paymentDetails) {
                  console.log("Cashfree payment details received:", result.paymentDetails);
                  setPaymentOutcome(result.paymentDetails);
                  const status = result.paymentDetails.order_status || 'UNKNOWN';
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
                    description: result.paymentDetails.paymentMessage || `Order ID: ${result.paymentDetails.order_id}`,
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

  const handleCheckStatus = async () => {
    if (!paymentOutcome?.order_id) {
      toast({
        title: 'Error',
        description: 'Order ID not found to check status.',
        variant: 'destructive',
      });
      return;
    }

    setIsCheckingStatus(true);
    setPaymentError(null);

    const verifyWebhookUrl = 'https://backend-n8n.7za6uc.easypanel.host/webhook-test/verify';
    const username = 'nirmal@lifedemy.in'; // Same credentials as before
    const password = 'Life@123';

    try {
      const response = await fetch(verifyWebhookUrl, {
        method: 'POST', // Assuming POST with JSON body
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        },
        body: JSON.stringify({ order_id: paymentOutcome.order_id }),
      });

      if (response.ok) {
        const statusData = await response.json();
        // Assuming statusData is the new paymentOutcome object or has a similar structure
        // If the structure from /verify is different, this might need adjustment
        setPaymentOutcome(statusData); 
        toast({
          title: 'Status Updated',
          description: `Payment status for order ${statusData.order_id} is now ${statusData.order_status}.`,
          variant: 'default',
        });
      } else {
        const errorText = await response.text();
        setPaymentError(`Failed to verify payment status. Server responded with ${response.status}. ${errorText}`);
        toast({
          title: 'Verification Error',
          description: `Could not verify payment status. ${errorText}`,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Check status fetch error:', error);
      setPaymentError(`Error checking payment status: ${error.message}`);
      toast({
        title: 'Network Error',
        description: 'Could not connect to verify payment status.',
        variant: 'destructive',
      });
    }
    setIsCheckingStatus(false);
  };

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
          {(paymentOutcome.paymentMessage === 'Payment finished. Check status.' || paymentOutcome.order_status === 'PENDING') && (
            <Button onClick={handleCheckStatus} disabled={isCheckingStatus} className="mt-4">
              {isCheckingStatus ? 'Checking...' : 'Check Payment Status'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentTestPage;
