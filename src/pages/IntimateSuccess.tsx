import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Check, CheckCircle, MessageCircle, Lock } from 'lucide-react';

// Add type declaration for telegramLoginCallback
declare global {
  interface Window {
    telegramLoginCallback: (user: any) => void;
  }
}

// Supabase API keys
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q';

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
  const [matchedPayment, setMatchedPayment] = useState<any>(null);

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
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: 'Phone number required',
        description: 'Please enter a valid 10-digit phone number to continue.',
        variant: 'destructive'
      });
      return false;
    }
    
    try {
      setVerificationLoading(true);
      
      // Store the phone number in local storage as a backup
      try {
        localStorage.setItem('verified_phone', phoneNumber);
        console.log('Stored phone in localStorage:', phoneNumber);
      } catch (e) {
        console.error('Failed to store phone in localStorage', e);
      }
      
      // For development, auto-verify the phone number
      setAgreedToTerms(true);
      
      // In production, uncomment this code to verify with Supabase:
      /*
      const response = await fetch('https://crm-supabase.7za6uc.easypanel.host/rest/v1/payments_kb?select=*', {
        method: 'GET',
        headers: {
          'apikey': ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify phone number');
      }
      
      const payments = await response.json();
      console.log('Payments data for phone verification:', payments);
      
      // Find a payment that matches the phone number
      const matchedPayment = payments.find((payment: any) => 
        payment.phone === phoneNumber || 
        payment.phone_number === phoneNumber ||
        payment.customer_phone === phoneNumber
      );
      
      console.log('Matched payment:', matchedPayment);
      
      if (matchedPayment) {
        setMatchedPayment(matchedPayment);
        setAgreedToTerms(true);
        return true;
      } else {
        toast({
          title: 'Verification failed',
          description: 'We could not find a payment associated with this phone number. Please contact support.',
          variant: 'destructive'
        });
        return false;
      }
      */
      
      return true;
    } catch (error) {
      console.error('Error verifying phone number:', error);
      toast({
        title: 'Error',
        description: 'Could not verify your phone number. Please try again later.',
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
    console.log('Current phoneNumber state:', phoneNumber);
    console.log('Current matchedPayment state:', matchedPayment);
    
    // Store the phone number in local storage as a backup
    try {
      localStorage.setItem('verified_phone', phoneNumber);
      console.log('Stored phone in localStorage:', phoneNumber);
    } catch (e) {
      console.error('Failed to store phone in localStorage', e);
    }
    
    // First store the Telegram data in state
    setTelegramData({
      ...user,
      phone_number: phoneNumber,
      verified_phone: phoneNumber
    });
    
    // Explicitly get the phone number from the input field if possible
    let currentPhone = phoneNumber;
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput && 'value' in phoneInput) {
      currentPhone = (phoneInput as HTMLInputElement).value || phoneNumber;
    }
    
    console.log('Final phone number to be sent:', currentPhone);
    
    // Create a deep copy of the matched payment to avoid reference issues
    const paymentDataCopy = matchedPayment ? JSON.parse(JSON.stringify(matchedPayment)) : null;
    
    // Create combined user data with all necessary information
    const combinedUserData = {
      ...user,
      chat_id: user.id,
      user_id: user.id,
      telegram_id: user.id,
      phone_number: currentPhone,
      verified_phone: currentPhone,
      payment_id: paymentId || (matchedPayment?.payment_id || matchedPayment?.id || ''),
      amount: amount || (matchedPayment?.amount || ''),
      customer_name: matchedPayment?.customer_name || matchedPayment?.name || '',
      matched_payment: paymentDataCopy
    };
    
    // Send the combined data to the backend
    sendTelegramDataToBackend(combinedUserData);
  };

  // Function to send data to the backend webhook
  const sendTelegramDataToBackend = async (userData: any) => {
    try {
      setLoading(true);
      
      // Try to get phone from localStorage as a backup
      let backupPhone = '';
      try {
        backupPhone = localStorage.getItem('verified_phone') || '';
      } catch (e) {
        console.error('Failed to read from localStorage', e);
      }
      
      // Debug: Log all state variables to check consistency
      console.log('[DEBUG] Phone number state:', phoneNumber);
      
      // Safely access the input value
      let inputValue = '';
      const phoneInput = document.getElementById('phoneNumber');
      if (phoneInput && 'value' in phoneInput) {
        inputValue = (phoneInput as HTMLInputElement).value;
      }
      console.log('[DEBUG] Phone number from input:', inputValue);
      console.log('[DEBUG] Phone number from localStorage:', backupPhone);
      console.log('[DEBUG] Phone number in userData:', userData.phone_number);
      console.log('[DEBUG] Matched payment state:', matchedPayment);
      console.log('[DEBUG] Agreed to terms state:', agreedToTerms);
      console.log('[DEBUG] Payment verified state:', paymentVerified);
      
      // Get the most reliable phone number
      const reliablePhone = userData.phone_number || inputValue || phoneNumber || backupPhone;
      console.log('[DEBUG] Most reliable phone number:', reliablePhone);
      
      // Log important data before sending
      console.log('Raw Telegram user data:', userData);
      console.log('User ID from Telegram:', userData.id);
      console.log('Final phone number being sent:', reliablePhone);
      
      // Deep clone matchedPayment to avoid any reference issues
      const paymentDataToSend = userData.matched_payment || 
                               (matchedPayment ? JSON.parse(JSON.stringify(matchedPayment)) : null);
      
      // Add payment details to the payload with the most reliable phone number
      const payloadData = {
        ...userData,
        payment_id: userData.payment_id || paymentId || (paymentDataToSend?.payment_id || paymentDataToSend?.id || ''),
        amount: userData.amount || amount || (paymentDataToSend?.amount || ''),
        source: 'intimate_talks',
        auth_date_formatted: new Date(userData.auth_date * 1000).toISOString(),
        command: '/user_join_verified',
        chat_id: userData.id,  // Explicitly include chat_id for the webhook
        user_id: userData.id,  // Also include as user_id for compatibility
        telegram_id: userData.id, // Third format to ensure it's captured
        username: userData.username || '',
        phone_number: reliablePhone,
        verified_phone: reliablePhone,
        verified_payment: paymentDataToSend ? true : false,
        payment_data: paymentDataToSend,
        customer_name: userData.customer_name || paymentDataToSend?.customer_name || paymentDataToSend?.name || ''
      };
      
      console.log('Sending webhook payload:', JSON.stringify(payloadData));
      
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
    <div className="bg-[#FFE5EC]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#E6F7EB] text-[#10B981] p-4 rounded-full">
                    <Check className="h-12 w-12" strokeWidth={3} />
                  </div>
                </div>
                
                <div className="text-[#FF7A9A] text-sm font-medium mb-1">PAYMENT CONFIRMED</div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-gray-800 mb-3">
                  Payment Successful!
                </h1>
                <p className="text-gray-700 font-medium">
                  Thank you for joining our Intimate Talks community!
                </p>
              </div>
              
              {verificationLoading ? (
                <div className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 shadow-sm mb-8 flex justify-center items-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-[#FFE5EC] mb-4"></div>
                    <div className="h-4 w-48 bg-[#FFE5EC] rounded"></div>
                    <p className="mt-4 text-[#FF7A9A]">Verifying your payment...</p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 shadow-sm mb-8">
                  <h2 className="font-serif text-xl font-medium text-gray-800 mb-6">Group Rules & Terms</h2>
                  
                  <div className="bg-white p-6 rounded-lg border border-[#F0F0F5] shadow-sm mb-6 text-left">
                    <div className="flex items-start mb-4">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                        <MessageCircle size={16} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">Community Guidelines</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start">
                            <span className="text-[#FF7A9A] mr-2">•</span>
                            <span>Respect all members and their privacy at all times</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FF7A9A] mr-2">•</span>
                            <span>No sharing of personal information without consent</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FF7A9A] mr-2">•</span>
                            <span>Zero tolerance for harassment or inappropriate behavior</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FF7A9A] mr-2">•</span>
                            <span>All shared content must stay within the group</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FF7A9A] mr-2">•</span>
                            <span>Be mindful of different perspectives and experiences</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FF7A9A] mr-2">•</span>
                            <span>Maintain confidentiality of all discussions</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-6">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                        <Lock size={16} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">Terms of Participation</h3>
                        <p className="text-gray-700 text-sm">
                          By joining this community, you agree to abide by our rules and understand that violation 
                          of these terms may result in removal from the group without refund. We aim to create a safe, 
                          supportive environment for all members to share and learn.
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t border-[#F0F0F5] pt-4 mt-6">
                      <p className="text-sm text-gray-500 text-center">
                        Thank you for your purchase and support.
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
                          className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
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
                        className="mt-6 w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                        onClick={verifyPhoneNumber}
                      >
                        Verify Phone & Agree to Terms
                      </button>
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <h3 className="font-serif text-xl font-medium text-gray-800 mb-4">Join Our Telegram Group</h3>
                    <p className="text-gray-700 mb-6">
                      {agreedToTerms 
                        ? "Click the button below to connect with Telegram and join our community."
                        : "Please agree to our terms first to unlock the Telegram login option."}
                    </p>
                    
                    {telegramData ? (
                      <div className="bg-[#E6F7EB] p-6 rounded-lg border border-[#D1E7DD] shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#10B981] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <CheckCircle size={16} />
                          </div>
                          <h4 className="font-medium text-[#0F766E]">Successfully Connected</h4>
                        </div>
                        <p className="text-[#0F766E] font-medium mb-3">
                          Thank you, {telegramData.first_name}! You're all set to join our Telegram group. 
                          Check your Telegram app for the invitation link.
                        </p>
                        <div className="bg-white p-3 rounded-lg border border-[#D1E7DD] text-sm text-[#0F766E]">
                          <p className="mb-1">
                            <span className="font-medium">Telegram ID:</span> {telegramData.id} 
                            {telegramData.username && ` (@${telegramData.username})`}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span> {phoneNumber}
                          </p>
                        </div>
                        <input type="hidden" id="telegram-chat-id" value={telegramData.id} />
                        <input type="hidden" id="user-phone" value={phoneNumber} />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        {agreedToTerms ? (
                          <div ref={telegramLoginContainerRef} className="telegram-login-container">
                            {/* Telegram widget will be inserted here by useEffect */}
                            <div className="animate-pulse bg-[#F0F0F5] h-12 w-48 rounded-lg"></div>
                          </div>
                        ) : (
                          <div className="bg-[#F0F0F5] text-gray-400 py-3 px-6 rounded-full text-center">
                            Telegram Login (Agree to terms first)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-gray-700 text-center mb-6">
                Once you've joined our Telegram group, you'll have access to exclusive content, discussions, and resources to enhance your intimate life.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/" 
                  className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                >
                  Return to Home
                </Link>
                <Link 
                  to="/guide" 
                  className="bg-white hover:bg-gray-50 text-[#FF7A9A] border border-[#FF7A9A] py-3 px-6 rounded-full text-center font-medium transition-colors"
                >
                  Explore 69 Positions Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntimateSuccess;
