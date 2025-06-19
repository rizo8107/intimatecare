import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const PaymentTestPage: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentHtml, setPaymentHtml] = useState<string | null>(null);

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
          const paymentSessionId = paymentSessionIdFromWebhook; // Use the extracted ID
          // Removed redundant: const paymentSessionId = jsonResponse.payment_session_id;
          const cashfreeHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cashfree Checkout Integration</title>
        <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
    </head>
    <body>
        <div class="row">
            <p>Click below to open the checkout page in popup</p>
            <button id="renderBtn">Pay Now</button>
        </div>
        <script>
            const cashfree = Cashfree({
                mode: "production", // Or "sandbox" for testing
            });
            document.getElementById("renderBtn").addEventListener("click", () => {
                let checkoutOptions = {
                    paymentSessionId: "${paymentSessionId}",
                    redirectTarget: "_modal",
                };
                cashfree.checkout(checkoutOptions).then((result) => {
                    if(result.error){
                        console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                        console.log(result.error);
                        // You can send this result.error back to your parent window if needed
                        // window.parent.postMessage({ type: 'cashfreeError', data: result.error }, '*');
                    }
                    if(result.redirect){
                        console.log("Payment will be redirected");
                    }
                    if(result.paymentDetails){
                        console.log("Payment has been completed, Check for Payment Status");
                        console.log(result.paymentDetails.paymentMessage);
                        // You can send this result.paymentDetails back to your parent window
                        // window.parent.postMessage({ type: 'cashfreePaymentSuccess', data: result.paymentDetails }, '*');
                    }
                });
            });
        </script>
    </body>
</html>
          `;
          setPaymentHtml(cashfreeHtmlTemplate);
          toast({
            title: 'Webhook Success',
            description: 'Payment session ID received and Cashfree page prepared.',
          });
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
          {isLoading ? 'Processing...' : 'Book Now & Get Payment Page'}
        </Button>
      </div>

      {paymentHtml && (
        <div className="mt-8 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 p-4 bg-gray-100 rounded-t-lg">Payment Page Preview</h2>
          <iframe
            srcDoc={paymentHtml}
            title="Payment Page"
            style={{ width: '100%', height: '600px', border: 'none' }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentTestPage;
