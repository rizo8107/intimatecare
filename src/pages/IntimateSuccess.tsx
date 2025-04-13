import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

declare global {
  interface Window {
    TelegramLoginWidget: any;
  }
}

const IntimateSuccess = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);
  const [loading, setLoading] = useState(false);
  const [telegramScriptLoaded, setTelegramScriptLoaded] = useState(false);

  useEffect(() => {
    // Parse query parameters from URL
    const params = new URLSearchParams(location.search);
    setQueryParams(params);

    // Load Telegram widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'KhushbooBistBot'); // replace with your actual bot username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-auth-url', 'https://backend-n8n.7za6uc.easypanel.host/webhook/kb_telegram_auth');
    script.onload = () => {
      setTelegramScriptLoaded(true);
    };
    
    // Check if telegram widget container exists before appending
    const widgetContainer = document.getElementById('telegram-login-container');
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }

    return () => {
      // Clean up script if component unmounts
      if (widgetContainer && widgetContainer.contains(script)) {
        widgetContainer.removeChild(script);
      }
    };
  }, [location]);

  // Extract payment details from query params
  const paymentId = queryParams?.get('payment_id') || '';
  const status = queryParams?.get('status') || '';
  const amount = queryParams?.get('amount') || '';

  return (
    <div className="bg-gradient-to-b from-blush-50 to-white py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-green-100 text-green-800 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-xl text-blush-600 max-w-2xl mx-auto mb-8">
            Thank you for joining our Intimate Talks community!
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="font-serif text-2xl mb-6">Payment Details</h2>
            <dl className="grid grid-cols-1 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-sm text-gray-500">Payment ID</dt>
                <dd className="font-medium">{paymentId}</dd>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-sm text-gray-500">Status</dt>
                <dd className="font-medium text-green-600">Success</dd>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-sm text-gray-500">Amount</dt>
                <dd className="font-medium">₹{amount}</dd>
              </div>
            </dl>
            
            <div className="mb-8">
              <h3 className="font-serif text-xl mb-4">One Last Step!</h3>
              <p className="text-muted-foreground mb-6">
                Please click the button below to join our Telegram group. This will help us connect you with our community and provide you with exclusive content.
              </p>
              
              <div id="telegram-login-container" className="flex justify-center">
                {/* Telegram login button will be inserted here */}
                {!telegramScriptLoaded && (
                  <div className="animate-pulse bg-gray-200 h-12 w-48 rounded-lg"></div>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Once you've joined our Telegram group, you'll have access to exclusive content, discussions, and resources to enhance your intimate life.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
            <Link to="/guide" className="btn-accent">
              Explore 69 Positions Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntimateSuccess; 