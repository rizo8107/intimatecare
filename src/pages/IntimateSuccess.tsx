import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Check, CheckCircle, MessageCircle, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

// Add type declaration for telegramLoginCallback
declare global {
  interface Window {
    telegramLoginCallback: (user: any) => void;
  }
}

// Form data interface
interface FormData {
  gender: string;
  location: string;
  problems: string;
  joinReason: string;
  mobileNumber: string;
  email: string;
  referral: string;
  // Agreement fields
  hookupAgreement: boolean;
  privacyAgreement: boolean;
  participationAgreement: boolean;
  respectAgreement: boolean;
  contentAgreement: boolean;
  nonJudgmentalAgreement: boolean;
  participateAgreement: boolean;
  sensitiveTopicsAgreement: boolean;
  anonymityAgreement: boolean;
  liabilityAgreement: boolean;
  explicitLanguageAgreement: boolean;
  additionalGuidelinesAgreement: boolean;
  privacySettingsAgreement: boolean;
  impliedSignatureAgreement: boolean;
  groupGuidelinesAgreement: boolean;
  guidelineReviewAgreement: boolean;
}

// Supabase API keys
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q';

const IntimateSuccess = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);
  const [loading, setLoading] = useState(false);
  const [telegramData, setTelegramData] = useState<any>(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const telegramLoginContainerRef = useRef<HTMLDivElement>(null);
  const [matchedPayment, setMatchedPayment] = useState<any>(null);
  
  // Extract payment details from query params
  const paymentId = queryParams?.get('payment_id') || '';
  const status = queryParams?.get('status') || '';
  const amount = queryParams?.get('amount') || '';
  
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    location: '',
    problems: '',
    joinReason: '',
    mobileNumber: '',
    email: '',
    referral: '',
    // Agreement fields
    hookupAgreement: false,
    privacyAgreement: false,
    participationAgreement: false,
    respectAgreement: false,
    contentAgreement: false,
    nonJudgmentalAgreement: false,
    participateAgreement: false,
    sensitiveTopicsAgreement: false,
    anonymityAgreement: false,
    liabilityAgreement: false,
    explicitLanguageAgreement: false,
    additionalGuidelinesAgreement: false,
    privacySettingsAgreement: false,
    impliedSignatureAgreement: false,
    groupGuidelinesAgreement: false,
    guidelineReviewAgreement: false
  });

  // Load form data from localStorage on component mount
  useEffect(() => {
    const storedFormData = localStorage.getItem('membershipFormData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

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
    console.log('Verifying phone number:', formData.mobileNumber);
    
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
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
        localStorage.setItem('verified_phone', formData.mobileNumber);
        console.log('Stored phone in localStorage:', formData.mobileNumber);
      } catch (e) {
        console.error('Failed to store phone in localStorage', e);
      }
      
      // For development, auto-verify the phone number
      // setFormCompleted(true);
      // return true;
      
      // In production, verify with Supabase:
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
      const matchedPayment = payments.find((payment: any) => {
        // Normalize phone numbers by removing any non-digit characters and comparing only the last 10 digits
        const normalizePhone = (phone: string | null | undefined) => {
          if (!phone) return '';
          // Convert to string in case it's a number
          const phoneStr = String(phone);
          const digits = phoneStr.replace(/\D/g, '');
          return digits.slice(-10); // Get last 10 digits
        };
        
        const formattedInputPhone = normalizePhone(formData.mobileNumber);
        const paymentPhone = normalizePhone(payment.phone);
        const paymentPhoneNumber = normalizePhone(payment.phone_number);
        const customerPhone = normalizePhone(payment.customer_phone);
        
        console.log('Comparing phones:', {
          input: formattedInputPhone,
          payment: paymentPhone,
          paymentNumber: paymentPhoneNumber,
          customer: customerPhone
        });
        
        return formattedInputPhone === paymentPhone || 
               formattedInputPhone === paymentPhoneNumber ||
               formattedInputPhone === customerPhone;
      });
      
      console.log('Matched payment:', matchedPayment);
      
      if (matchedPayment) {
        setMatchedPayment(matchedPayment);
        setFormCompleted(true);
        return true;
      } else {
        toast({
          title: 'Verification failed',
          description: 'We could not find a payment associated with this phone number. Please contact support.',
          variant: 'destructive'
        });
        return false;
      }
      
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

  // Function to handle agreement to terms
  const handleAgreeToTerms = async () => {
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
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
      setFormCompleted(true);
    }
  };

  // Function to handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, mobileNumber: value });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // For checkboxes, use checked property
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
      
      // Save to localStorage for persistence
      const updatedFormData = {
        ...formData,
        [name]: checked
      };
      localStorage.setItem('membershipFormData', JSON.stringify(updatedFormData));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Save to localStorage for persistence
      const updatedFormData = {
        ...formData,
        [name]: value
      };
      localStorage.setItem('membershipFormData', JSON.stringify(updatedFormData));
    }
  };

  // Function to go to next step
  const nextStep = async () => {
    // If on phone verification step, verify phone first
    if (currentStep === 2) {
      const verified = await verifyPhoneNumber();
      if (!verified) return;
    }
    
    // If on final step, submit form data
    if (currentStep === 3) {
      submitFormData();
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };

  // Function to go to previous step
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Function to submit form data
  const submitFormData = async () => {
    try {
      setLoading(true);
      
      // Store form data in localStorage as backup
      try {
        localStorage.setItem('form_data', JSON.stringify(formData));
      } catch (e) {
        console.error('Failed to store form data in localStorage', e);
      }
      
      // Verify phone number with Supabase before proceeding
      const verified = await verifyPhoneNumber();
      
      if (!verified) {
        toast({
          title: 'Verification failed',
          description: 'We could not verify your phone number. Please check and try again.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
      
      // For now, just log the form data
      console.log('Form data submitted:', formData);
      
      // Show success message
      toast({
        title: 'Form submitted successfully',
        description: 'You can now connect with Telegram to join the group.',
      });
      
      // Set form as completed to enable Telegram login
      setFormCompleted(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'There was a problem submitting your form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Telegram auth callback
  const handleTelegramAuth = (user: any) => {
    console.log('Telegram auth success:', user);
    console.log('Current formData state:', formData);
    
    // Store the phone number in local storage as a backup
    try {
      localStorage.setItem('verified_phone', formData.mobileNumber);
      console.log('Stored phone in localStorage:', formData.mobileNumber);
    } catch (e) {
      console.error('Failed to store phone in localStorage', e);
    }
    
    // First store the Telegram data in state
    setTelegramData({
      ...user,
      phone_number: formData.mobileNumber,
      verified_phone: formData.mobileNumber
    });
    
    // Explicitly get the phone number from the input field if possible
    let currentPhone = formData.mobileNumber;
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput && 'value' in phoneInput) {
      currentPhone = (phoneInput as HTMLInputElement).value || formData.mobileNumber;
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
      matched_payment: paymentDataCopy,
      form_data: formData
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
      console.log('[DEBUG] Phone number state:', formData.mobileNumber);
      
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
      console.log('[DEBUG] Form completed state:', formCompleted);
      console.log('[DEBUG] Payment verified state:', paymentVerified);
      
      // Get the most reliable phone number
      const reliablePhone = userData.phone_number || inputValue || formData.mobileNumber || backupPhone;
      console.log('[DEBUG] Most reliable phone number:', reliablePhone);
      
      // Log important data before sending
      console.log('Raw Telegram user data:', userData);
      console.log('User ID from Telegram:', userData.id);
      console.log('Final phone number being sent:', reliablePhone);
      console.log('Form data being sent:', formData);
      
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
        customer_name: userData.customer_name || paymentDataToSend?.customer_name || paymentDataToSend?.name || '',
        form_data: formData
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

  // Form Step 1: Basic Information
  const renderStep1 = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl font-medium text-gray-800 mb-4">Membership Information</h2>
      <p className="text-gray-700 mb-6">Please provide some basic information about yourself.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Your Gender <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
            required
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Your Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
            placeholder="e.g. Mumbai, India"
            required
          />
        </div>
        
        <div>
          <label htmlFor="problems" className="block text-sm font-medium text-gray-700 mb-1">
            What problems are you facing? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="problems"
            name="problems"
            value={formData.problems}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
            rows={3}
            placeholder="Please describe any issues you're experiencing..."
            required
          />
        </div>
        
        <div>
          <label htmlFor="joinReason" className="block text-sm font-medium text-gray-700 mb-1">
            Why did you join this group? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="joinReason"
            name="joinReason"
            value={formData.joinReason}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
            rows={3}
            placeholder="What motivated you to join our community?"
            required
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-2 px-6 rounded-full text-center font-medium transition-colors flex items-center"
          onClick={nextStep}
          disabled={!formData.gender || !formData.location || !formData.problems || !formData.joinReason}
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Form Step 2: Terms and Agreements
  const renderStep2 = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl font-medium text-gray-800 mb-4">Membership Agreement</h2>
      <p className="text-gray-700 mb-6">Please read and agree to the following terms and conditions.</p>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Mandatory Guidelines</h3>
          <p className="text-sm text-gray-700 mb-4">
            Your participation in our group requires adherence to the following guidelines:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="hookupAgreement"
                name="hookupAgreement"
                checked={formData.hookupAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="hookupAgreement" className="text-sm text-gray-700">
                <span className="font-medium">1. Prohibition of Hookup or Dating Solicitations:</span> This group is solely for constructive discussions and prohibits any attempts to initiate or solicit romantic or sexual encounters. Any such actions, including private propositions, will result in immediate removal from the group.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacyAgreement"
                name="privacyAgreement"
                checked={formData.privacyAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="privacyAgreement" className="text-sm text-gray-700">
                <span className="font-medium">2. Privacy and Confidentiality:</span> Respecting the privacy of all members is paramount. Any use of screenshots or group content for purposes such as public display, harassment, or blackmail is strictly prohibited and will be treated as a severe breach of trust.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="participationAgreement"
                name="participationAgreement"
                checked={formData.participationAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="participationAgreement" className="text-sm text-gray-700">
                <span className="font-medium">3. Voluntary Participation:</span> Members acknowledge that all interactions, opinions, and advice within the group are voluntary and non-professional. Users engage at their own discretion and bear personal responsibility for any actions taken based on shared advice or content.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="respectAgreement"
                name="respectAgreement"
                checked={formData.respectAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="respectAgreement" className="text-sm text-gray-700">
                <span className="font-medium">4. Respect and Empathy:</span> Members are expected to engage with empathy, respect, and consideration towards others. Behaviors that ridicule, mock, or humiliate fellow members are unacceptable and will not be tolerated.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="contentAgreement"
                name="contentAgreement"
                checked={formData.contentAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="contentAgreement" className="text-sm text-gray-700">
                <span className="font-medium">5. Content Restrictions:</span> Group content should contribute positively and be relevant to our discussions on intimacy. Sharing of memes, jokes, or pornographic materials is strictly prohibited to maintain the group's focus on constructive dialogue.
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <input
            type="checkbox"
            id="additionalGuidelinesAgreement"
            name="additionalGuidelinesAgreement"
            checked={formData.additionalGuidelinesAgreement}
            onChange={handleInputChange}
            className="mt-1 mr-3"
          />
          <label htmlFor="additionalGuidelinesAgreement" className="text-sm text-gray-700">
            <span className="font-medium">Additional Guidelines:</span> I have read and agree to all additional guidelines, including the private messaging policy, legal action for harassment, limitation of liability, prohibition of sexually triggering language, and moderation and termination/refund policy.
          </label>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button
          className="bg-white border border-[#FF7A9A] text-[#FF7A9A] hover:bg-gray-50 py-2 px-6 rounded-full text-center font-medium transition-colors flex items-center"
          onClick={prevStep}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        
        <button
          className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-2 px-6 rounded-full text-center font-medium transition-colors flex items-center"
          onClick={nextStep}
          disabled={!formData.hookupAgreement || !formData.privacyAgreement || !formData.participationAgreement || !formData.respectAgreement || !formData.contentAgreement || !formData.additionalGuidelinesAgreement}
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Form Step 3: Contact Information
  const renderStep3 = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl font-medium text-gray-800 mb-4">Contact Information</h2>
      <p className="text-gray-700 mb-6">Please provide your contact details to complete your registration.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Your Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handlePhoneNumberChange}
            className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
            placeholder="e.g. 9876543210"
            maxLength={10}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Please note you will be added to the community only after validating your mobile number. Please enter the right number.
          </p>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email ID <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
            placeholder="e.g. yourname@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">
            Referred by
          </label>
          <input
            type="text"
            id="referral"
            name="referral"
            value={formData.referral}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
            placeholder="If you have a referral code, enter it here"
          />
          <p className="text-xs text-gray-500 mt-1">
            If you have a referral code, use this space to enter it.
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button
          className="bg-white border border-[#FF7A9A] text-[#FF7A9A] hover:bg-gray-50 py-2 px-6 rounded-full text-center font-medium transition-colors flex items-center"
          onClick={prevStep}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        
        <button
          className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-2 px-6 rounded-full text-center font-medium transition-colors flex items-center"
          onClick={nextStep}
          disabled={!formData.mobileNumber || !formData.email}
        >
          Submit <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Form Step 4: Thank You and Telegram Login
  const renderStep4 = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl font-medium text-gray-800 mb-4">Thank You!</h2>
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-[#E6F7EB] text-[#10B981] p-4 rounded-full">
            <Check className="h-8 w-8" strokeWidth={3} />
          </div>
        </div>
        <p className="text-gray-700">
          Dear Subscriber,
        </p>
        <p className="text-gray-700 mt-2">
          I wanted to take a moment to express my sincere gratitude. Your kindness and support mean the world to me. Thank you for being an incredible part of our community. 🌟
        </p>
        <p className="text-gray-700 mt-4 font-medium">
          Warm regards 😊
        </p>
        <p className="text-gray-700 mt-1">
          Khushboo Bist
        </p>
      </div>
      
      <div className="mt-8">
        <h3 className="font-serif text-xl font-medium text-gray-800 mb-4">Join Our Telegram Group</h3>
        <p className="text-gray-700 mb-6">
          {formCompleted 
            ? "Click the button below to connect with Telegram and join our community."
            : "Please wait while we verify your information..."}
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
                <span className="font-medium">Phone:</span> {formData.mobileNumber}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            {formCompleted ? (
              <div ref={telegramLoginContainerRef} className="telegram-login-container">
                {/* Telegram widget will be inserted here by useEffect */}
                <div className="animate-pulse bg-[#F0F0F5] h-12 w-48 rounded-lg"></div>
              </div>
            ) : (
              <div className="bg-[#F0F0F5] text-gray-400 py-3 px-6 rounded-full text-center">
                Telegram Login (Verifying your information...)
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-center">
        <Link 
          to="/" 
          className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-2 px-6 rounded-full text-center font-medium transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );

  // Add the Telegram widget script when terms are agreed to
  useEffect(() => {
    if (!formCompleted || !telegramLoginContainerRef.current) {
      return;
    }
    
    console.log('Loading Telegram widget, terms agreed:', formCompleted);
    
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
  }, [formCompleted]);

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
                  Complete Your Registration
                </h1>
                <p className="text-gray-700 font-medium">
                  Please fill out the form below to join our Intimate Talks community
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
                  {/* Progress indicator */}
                  <div className="mb-8">
                    <div className="flex justify-between">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex flex-col items-center">
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              currentStep + 1 >= step 
                                ? 'bg-[#FF7A9A] text-white' 
                                : 'bg-[#F0F0F5] text-gray-400'
                            }`}
                          >
                            {currentStep + 1 > step ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <span>{step}</span>
                            )}
                          </div>
                          <span className={`text-xs mt-1 ${
                            currentStep + 1 >= step 
                              ? 'text-[#FF7A9A]' 
                              : 'text-gray-400'
                          }`}>
                            {step === 1 ? 'Info' : 
                             step === 2 ? 'Terms' : 
                             step === 3 ? 'Contact' : 'Complete'}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 h-1 bg-[#F0F0F5] rounded-full">
                      <div 
                        className="h-full bg-[#FF7A9A] rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {currentStep === 0 && renderStep1()}
                  {currentStep === 1 && renderStep2()}
                  {currentStep === 2 && renderStep3()}
                  {currentStep === 3 && renderStep4()}
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
