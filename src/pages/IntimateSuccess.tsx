import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const IntimateSuccess = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);
  const [loading, setLoading] = useState(false);
  const [telegramData, setTelegramData] = useState<any>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const telegramLoginContainerRef = useRef<HTMLDivElement>(null);

  // Parse query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQueryParams(params);
    
    // Define the auth callback globally
    window.onTelegramAuth = handleTelegramAuth;
    
    return () => {
      // Clean up global callback
      delete window.onTelegramAuth;
    };
  }, [location]);

  // Extract payment details from query params
  const paymentId = queryParams?.get('payment_id') || '';
  const status = queryParams?.get('status') || '';
  const amount = queryParams?.get('amount') || '';

  // Function to handle Telegram auth callback
  const handleTelegramAuth = (user: any) => {
    console.log('Telegram auth success:', user);
    
    // Ensure we capture both user ID and username for chat identification
    const telegramUserData = {
      ...user,
      chat_id: user.id, // Adding chat_id field which is the same as user.id
    };
    
    setTelegramData(telegramUserData);
    
    // Send the data to the backend
    sendTelegramDataToBackend(telegramUserData);
  };

  // Function to send data to the backend webhook
  const sendTelegramDataToBackend = async (userData: any) => {
    try {
      setLoading(true);
      
      // Add payment details to the payload
      const payloadData = {
        ...userData,
        payment_id: paymentId,
        amount,
        source: 'intimate_talks',
        auth_date_formatted: new Date(userData.auth_date * 1000).toISOString(),
        command: '/user_join_verified',
        chat_id: userData.id,  // Explicitly include chat_id for the webhook
        username: userData.username || ''
      };
      
      console.log('Sending data to webhook:', payloadData);
      
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/telegram-success-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadData),
      });
      
      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'You have successfully joined the Intimate Talks community. Check your Telegram for the group link.',
        });
      } else {
        throw new Error('Failed to process Telegram login');
      }
    } catch (error) {
      console.error('Error sending Telegram data:', error);
      toast({
        title: 'Error',
        description: 'There was a problem joining the group. Please contact support.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle agreement to terms
  const handleAgreeToTerms = () => {
    setAgreedToTerms(true);
    toast({
      title: 'Terms Accepted',
      description: 'You can now connect with Telegram to join the group',
    });
  };

  // Add the Telegram widget script when terms are agreed to
  useEffect(() => {
    if (!agreedToTerms || !telegramLoginContainerRef.current) {
      return;
    }
    
    // Clear any existing content
    if (telegramLoginContainerRef.current) {
      telegramLoginContainerRef.current.innerHTML = '';
    }
    
    // Create the script exactly as provided
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'KB_initmatetalks_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-auth-url', 'https://intimatecare.in' + window.location.pathname);
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-radius', '8');
    
    // Append the script to the container
    telegramLoginContainerRef.current.appendChild(script);
    
    return () => {
      // Clean up when component unmounts or terms change
      if (telegramLoginContainerRef.current) {
        telegramLoginContainerRef.current.innerHTML = '';
      }
    };
  }, [agreedToTerms]);

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
            <h2 className="font-serif text-2xl mb-6">Group Rules & Terms</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
              <h3 className="font-semibold text-lg mb-3">Community Guidelines</h3>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Respect all members and their privacy at all times</li>
                <li>No sharing of personal information without consent</li>
                <li>Zero tolerance for harassment or inappropriate behavior</li>
                <li>All shared content must stay within the group</li>
                <li>Be mindful of different perspectives and experiences</li>
                <li>Maintain confidentiality of all discussions</li>
              </ul>
              
              <h3 className="font-semibold text-lg mb-3">Terms of Participation</h3>
              <p className="mb-4">
                By joining this community, you agree to abide by our rules and understand that violation 
                of these terms may result in removal from the group without refund. We aim to create a safe, 
                supportive environment for all members to share and learn.
              </p>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm text-gray-500">
                  Your payment ID: {paymentId} | Amount: ₹{amount}
                </p>
              </div>
            </div>
            
            {!agreedToTerms && (
              <button 
                onClick={handleAgreeToTerms}
                className="w-full py-3 px-4 bg-blush-600 hover:bg-blush-700 text-white font-medium rounded-lg transition-colors"
              >
                I Agree to the Group Rules & Terms
              </button>
            )}
            
            <div className="mt-8">
              <h3 className="font-serif text-xl mb-4">Join Our Telegram Group</h3>
              <p className="text-muted-foreground mb-6">
                {agreedToTerms 
                  ? "Click the button below to connect with Telegram and join our community."
                  : "Please agree to our terms first to unlock the Telegram login option."}
              </p>
              
              {telegramData ? (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Thank you, {telegramData.first_name}! You're all set to join our Telegram group. 
                    Check your Telegram app for the invitation link.
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    Your Telegram ID: {telegramData.id} 
                    {telegramData.username && ` (@${telegramData.username})`}
                  </p>
                  <input type="hidden" id="telegram-chat-id" value={telegramData.id} />
                </div>
              ) : (
                <div className="flex justify-center">
                  {agreedToTerms ? (
                    <div ref={telegramLoginContainerRef} className="telegram-login-container">
                      {/* Telegram widget will be inserted here by useEffect */}
                      <div className="animate-pulse bg-gray-200 h-12 w-48 rounded-lg"></div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 text-gray-400 py-3 px-4 rounded-lg">
                      Telegram Login (Agree to terms first)
                    </div>
                  )}
                </div>
              )}
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

// Add global type definition for the Telegram callback
declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}

export default IntimateSuccess; 