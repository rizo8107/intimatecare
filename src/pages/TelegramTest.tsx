import { useState, useEffect, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define interface for Telegram user data
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

// Add type declaration for telegramLoginCallback
declare global {
  interface Window {
    telegramLoginCallback: (user: any) => void;
  }
}

const TelegramTest = () => {
  const [telegramData, setTelegramData] = useState<TelegramUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<string>('');
  const telegramLoginContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Telegram login widget
  useEffect(() => {
    const container = telegramLoginContainerRef.current;
    if (container) {
      // Clear any existing content
      container.innerHTML = '';
      
      // Create the script element for Telegram login widget
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', 'IntimateCareTalksBot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '8');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-onauth', 'telegramLoginCallback(user)');
      
      // Append the script to the container
      container.appendChild(script);
      
      console.log('Telegram login widget initialized');
    }
    
    return () => {
      // Clean up if needed
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Define the Telegram login callback
  useEffect(() => {
    // Define the auth callback globally
    window.telegramLoginCallback = handleTelegramAuth;
    
    return () => {
      // Clean up global callback
      delete window.telegramLoginCallback;
    };
  }, []);

  // Function to handle Telegram authentication
  const handleTelegramAuth = async (user: TelegramUser) => {
    console.log('Telegram auth data:', user);
    setTelegramData(user);
    
    try {
      setLoading(true);
      
      // Send data to the webhook
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook-test/telegram-success-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...user,
          telegram_id: user.id,
          source: 'telegram_test',
          auth_date_formatted: new Date(user.auth_date * 1000).toISOString(),
          command: '/user_join_verified',
          chat_id: user.id,
          user_id: user.id,
          test_mode: true
        })
      });
      
      const responseData = await response.text();
      setWebhookResponse(responseData);
      
      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }
      
      toast({
        title: 'Success!',
        description: 'Webhook called successfully!',
        variant: 'default'
      });
      
    } catch (error) {
      console.error('Error in webhook call:', error);
      toast({
        title: 'Error',
        description: 'There was an error calling the webhook. Check console for details.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Telegram Webhook Test</h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Step 1: Login with Telegram</h2>
          <p className="text-gray-600 mb-4">
            Click the button below to authenticate with Telegram. This will trigger the webhook.
          </p>
          
          <div className="flex justify-center mb-4">
            <div ref={telegramLoginContainerRef} className="telegram-login-container">
              {/* Telegram widget will be inserted here by useEffect */}
              <div className="animate-pulse bg-gray-200 h-12 w-48 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {telegramData && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step 2: Telegram Data</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm overflow-auto">{JSON.stringify(telegramData, null, 2)}</pre>
            </div>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center my-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {webhookResponse && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step 3: Webhook Response</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm overflow-auto">{webhookResponse}</pre>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Troubleshooting Tips:</h3>
          <ul className="list-disc pl-5 text-blue-700 text-sm">
            <li>Check browser console for any JavaScript errors</li>
            <li>Verify that the Telegram bot is correctly configured</li>
            <li>Ensure the webhook URL is accessible and correctly formatted</li>
            <li>Check server logs for any backend errors</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TelegramTest;
