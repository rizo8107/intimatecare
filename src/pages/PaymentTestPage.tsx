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
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null); // To store the order_id for status check
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
    setPaymentHtml(null);
    const order_id = generateOrderId();
    setCurrentOrderId(order_id); // Store the generated order_id
    setOrderStatus(null); // Reset status on new attempt
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
                if (result.error) {
                  console.error("Cashfree payment error:", result.error);
                  toast({
                    title: 'Payment Error',
                    description: result.error.message || 'An error occurred during payment.',
                    variant: 'destructive',
                  });
                }
                if (result.redirect) {
                  console.log("Cashfree payment will be redirected (inAppBrowser scenario).");
                }
                if (result.paymentDetails) {
                  console.log("Cashfree payment completed:", result.paymentDetails);
                  toast({
                    title: 'Payment Complete',
                    description: result.paymentDetails.paymentMessage || 'Payment processed.',
                  });
                  // Handle successful payment (e.g., navigate to a success page, update order status)
                  if (result.paymentDetails.orderId) {
                    checkOrderStatus(result.paymentDetails.orderId); // Use orderId from Cashfree's response
                  } else if (currentOrderId) {
                    checkOrderStatus(currentOrderId); // Fallback to initially generated orderId
                  }
                }
                // If user closes modal or there's an error without paymentDetails
                if (result.error && currentOrderId) {
                  // Check status even if user closes, as payment might be pending or even successful via other means
                  checkOrderStatus(currentOrderId);
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
      }
    } catch (fetchError: any) {
      console.error('Webhook fetch error:', fetchError);
      toast({
        title: 'Webhook Request Error',
        description: fetchError.message || 'Could not fetch payment session from webhook.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const checkOrderStatus = async (orderIdToCheck: string) => {
    if (!orderIdToCheck) return;
    setIsLoading(true); // Can use a different loading state for status check if needed
    try {
      // IMPORTANT: This is a HYPOTHETICAL backend endpoint YOU NEED TO CREATE.
      // It should securely call Cashfree's Get Order Status API.
      const statusResponse = await fetch(`https://backend-n8n.7za6uc.easypanel.host/webhook-test/check-cashfree-order-status?order_id=${orderIdToCheck}`, {
        method: 'GET',
        // Add any necessary headers for your backend endpoint, e.g., auth if you secure it
      });
      if (statusResponse.ok) {
        const statusData = await statusResponse.json(); // Expecting { "orderStatus": "Success" | "Pending" | "Failure" }
        setOrderStatus(statusData.orderStatus || 'Status unclear');
        toast({
          title: 'Order Status Fetched',
          description: `Payment status: ${statusData.orderStatus}`,
        });
      } else {
        const errorText = await statusResponse.text();
        console.error('Error fetching order status from backend:', statusResponse.status, errorText);
        setOrderStatus('Failed to fetch status');
        toast({
          title: 'Status Check Error',
          description: `Could not fetch order status from backend. ${errorText}`,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error in checkOrderStatus:', error);
      setOrderStatus('Error checking status');
      toast({
        title: 'Status Check Failed',
        description: error.message || 'An error occurred while checking payment status.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
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

      {orderStatus && (
        <div className="mt-6 p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Payment Status:</h3>
          <p className={`text-xl ${orderStatus === 'Success' ? 'text-green-600' : orderStatus === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
            {orderStatus}
          </p>
        </div>
      )}

      {/* iframe is no longer needed as payment will be a direct modal popup */}
    </div>
  );
};

export default PaymentTestPage;
