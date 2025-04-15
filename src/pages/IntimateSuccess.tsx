import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Add type declaration for telegramLoginCallback
declare global {
  interface Window {
    telegramLoginCallback: (user: any) => void;
  }
}

// Supabase API keys
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey AgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey AgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q';

const IntimateSuccess = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);
  const [loading, setLoading] = useState(false);
  const [telegramData, setTelegramData] = useState<any>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const telegramLoginContainerRef = useRef<HTMLDivElement>(null);

  // Parse query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQueryParams(params);
    
    // Define the auth callback globally
    window.telegramLoginCallback = handleTelegramAuth;
    
    // Check if payment exists in Supabase
    const paymentId = params.get('payment_id');
    if (paymentId) {
      verifyPayment(paymentId);
    }
    
    return () => {
      // Clean up global callback
      delete window.telegramLoginCallback;
    };
  }, [location]);

  // Verify payment with Supabase
  const verifyPayment = async (paymentId: string) => {
    try {
      setVerificationLoading(true);
      // For now, auto-verify the payment to let development proceed
      setPaymentVerified(true);
      
      // In production, uncomment this code to verify with Supabase:
      /*
      const response = await fetch('https://crm-supabase.7za6uc.easypanel.host/rest/v1/payments_kb?select=*', {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey AgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey AgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }
      
      const payments = await response.json();
      console.log('Payments data:', payments);
      
      const verified = payments.some((payment: any) => payment.payment_id === paymentId);
      setPaymentVerified(verified);
      
      if (!verified) {
        toast({
          title: 'Payment verification failed',
          description: 'We could not verify your payment. Please contact support.',
          variant: 'destructive'
        });
      }
      */
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: 'Error',
        description: 'Could not verify payment status. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setVerificationLoading(false);
    }
  };

  // Function to handle phone number verification
  const verifyPhoneNumber = async () => {
    console.log('Verifying phone number:', phoneNumber);
    
    if (!phoneNumber) {
      toast({
        title: 'Phone number required',
        description: 'Please enter your phone number',
        variant: 'destructive'
      });
      return false;
    }
    
    if (phoneNumber.length < 10) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive'
      });
      return false;
    }
    
    setVerificationLoading(true);
    
    // For development, auto-verify any phone number
    // Comment this out and uncomment the code below for production
    /*
    setAgreedToTerms(true);
    toast({
      title: 'Success',
      description: 'Phone verified successfully!'
    });
    setVerificationLoading(false);
    return true;
    */
    
    // Real verification code
    try {
      // Fetch data from Supabase API
      const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';
      
      const response = await fetch(`https://crm-supabase.7za6uc.easypanel.host/rest/v1/payments_kb?select=*`, {
        method: 'GET',
        headers: {
          'apikey': ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`
        }
      });
      
      if (!response.ok) {
        toast({
          title: 'Error',
          description: 'Failed to verify phone number',
          variant: 'destructive'
        });
        return false;
      }
      
      const payments = await response.json();
      console.log('Payments data received:', payments);
      
      // Normalize the input phone number
      const normalizedInputPhone = phoneNumber.replace(/\D/g, '').slice(-10);
      console.log('Checking for normalized phone:', normalizedInputPhone);
      
      // Check if the phone number exists in any payment record
      const verified = payments.some((payment: any) => {
        // Get all possible phone fields
        const phoneFields = [
          payment.phone,
          payment.customer_phone,
          payment.mobile,
          payment.customer_mobile,
          payment.phone_number
        ];
        
        // Check each phone field
        for (const field of phoneFields) {
          if (!field) continue;
          
          // Normalize the payment phone number
          const normalizedPaymentPhone = String(field).replace(/\D/g, '').slice(-10);
          console.log('Comparing with payment phone:', normalizedPaymentPhone);
          
          if (normalizedPaymentPhone === normalizedInputPhone) {
            console.log('Match found!');
            return true;
          }
        }
        
        return false;
      });
      
      console.log('Verification result:', verified);
      setPaymentVerified(verified);
      
      if (verified) {
        setAgreedToTerms(true);
        toast({
          title: 'Success',
          description: 'Phone verified successfully!'
        });
        return true;
      } else {
        toast({
          title: 'Verification failed',
          description: 'This phone number is not associated with any payment. Please contact support.',
          variant: 'destructive'
        });
        return false;
      }
    } catch (error) {
      console.error('Error verifying phone number:', error);
      toast({
        title: 'Error',
        description: 'Error verifying phone number. Please try again later.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setVerificationLoading(false);
    }
  };

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
      phone_number: phoneNumber // Add phone number from input field
    };
    
    setTelegramData(telegramUserData);
    
    // Send the data to the backend
    sendTelegramDataToBackend(telegramUserData);
  };

  // Function to send data to the backend webhook
  const sendTelegramDataToBackend = async (userData: any) => {
    try {
      setLoading(true);
      
      // Log the raw user data from Telegram
      console.log('Raw Telegram user data:', userData);
      console.log('User ID from Telegram:', userData.id);
      
      // Add payment details to the payload
      const payloadData = {
        ...userData,
        payment_id: paymentId,
        amount,
        source: 'intimate_talks',
        auth_date_formatted: new Date(userData.auth_date * 1000).toISOString(),
        command: '/user_join_verified',
        chat_id: userData.id,  // Explicitly include chat_id for the webhook
        user_id: userData.id,  // Also include as user_id for compatibility
        telegram_id: userData.id, // Third format to ensure it's captured
        username: userData.username || '',
        phone_number: phoneNumber
      };
      
      console.log('Sending data to webhook:', payloadData);
      
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/telegram-success-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadData),
      });
      
      // Log response status
      console.log('Webhook response status:', response.status);
      
      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'You have successfully joined the Intimate Talks community. Check your Telegram for the group link.',
        });
      } else {
        const errorText = await response.text();
        console.error('Webhook error response:', errorText);
        throw new Error(`Failed to process Telegram login: ${response.status}`);
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
  const handleAgreeToTerms = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: 'Phone number required',
        description: 'Please enter a valid phone number to continue.',
        variant: 'destructive'
      });
      return;
    }
    
    // Verify phone number against Supabase before proceeding
    const verified = await verifyPhoneNumber();
    
    if (verified) {
      setAgreedToTerms(true);
    }
  };

  // Add the Telegram widget script when terms are agreed to
  useEffect(() => {
    if (!agreedToTerms || !telegramLoginContainerRef.current) {
      return;
    }
    
    console.log('Loading Telegram widget, terms agreed:', agreedToTerms);
    
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
    script.setAttribute('data-onauth', 'telegramLoginCallback(user)');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-auth-url', window.location.href);
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

  // Handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

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
          
          {verificationLoading ? (
            <div className="bg-white p-8 rounded-lg shadow-md mb-8 flex justify-center items-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-blush-200 mb-4"></div>
                <div className="h-4 w-48 bg-blush-100 rounded"></div>
                <p className="mt-4 text-blush-600">Verifying your payment...</p>
              </div>
            </div>
          ) : (
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
                <div>
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-left text-sm font-medium text-gray-700 mb-1">
                      Enter your phone number to continue
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blush-500"
                      placeholder="e.g. 9876543210"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      maxLength={10}
                    />
                    <p className="text-xs text-left text-gray-500 mt-1">
                      We'll use this to verify your payment and add you to the group
                    </p>
                  </div>
                  
                  <button
                    className="mt-6 w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                    onClick={verifyPhoneNumber}
                  >
                    Verify Phone & Agree to Terms
                  </button>
                </div>
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
                    <p className="text-green-600 text-sm mt-1">
                      Phone: {phoneNumber}
                    </p>
                    <input type="hidden" id="telegram-chat-id" value={telegramData.id} />
                    <input type="hidden" id="user-phone" value={phoneNumber} />
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
          )}
          
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