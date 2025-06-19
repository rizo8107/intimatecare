import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Check, CheckCircle, MessageCircle, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { trackEvent, trackFormStart, trackFormStepComplete, trackFormSubmit, trackTelegramConnect, EventCategory } from '@/utils/analytics';
import { trackFormEvent, trackTelegramEvent, trackButtonClick } from '@/components/ClarityEvents';

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
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

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
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    }
  }, []);

  // Parse query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQueryParams(params);
    
    // Track page view for analytics
    trackFormStart('intimate_success_form');
    trackFormEvent('intimate_success_form', 'init', 'start');
    
    // Define the auth callback globally
    window.telegramLoginCallback = async (user) => {
      setTelegramData(user);
      
      try {
        setLoading(true);
        
        // Get latest form data
        const latestFormData = { ...formData };
        
        // Get phone from various sources
        let reliablePhone = '';
        if (latestFormData.mobileNumber) {
          reliablePhone = latestFormData.mobileNumber;
        } else if (localStorage.getItem('verifiedPhone')) {
          reliablePhone = localStorage.getItem('verifiedPhone') || '';
        }
        
        // Generate a unique submission ID
        const now = Date.now();
        const uniqueId = `telegram-${now}-${Math.random().toString(36).substring(2, 10)}`;
        
        // Create the payload in the same format as before
        const payloadData = {
          ...user,
          chat_id: user.id,
          user_id: user.id,
          telegram_id: user.id,
          phone_number: reliablePhone,
          verified_phone: reliablePhone,
          payment_id: paymentId || '',
          amount: amount || '',
          customer_name: '',
          matched_payment: null,
          form_data: latestFormData,
          source: 'intimate_talks',
          auth_date_formatted: new Date(user.auth_date * 1000).toISOString(),
          command: '/user_join_verified',
          verified_payment: false,
          payment_data: null
        };
        
        // Send to the webhook
        const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/telegram-success-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payloadData)
        });
        
        if (!response.ok) {
          throw new Error(`Webhook error: ${response.status}`);
        }
        
        const responseText = await response.text();
        
        toast({
          title: 'Success!',
          description: 'You have been verified and added to the Intimate Talks group!',
          variant: 'default'
        });
      } catch (error) {
        console.error('Error in webhook call:', error);
        toast({
          title: 'Error',
          description: 'There was an error verifying your account. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    // Check if payment exists in Supabase
    const paymentId = params.get('payment_id');
    if (paymentId) {
      verifyPayment(paymentId);
    }
    
    return () => {
      // Clean up global callback
      delete window.telegramLoginCallback;
    };
  }, [location, formData, amount, paymentId]);

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
          'apikey': ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }
      
      const payments = await response.json();
      
      const verified = payments.some((payment: any) => payment.payment_id === paymentId);
      setPaymentVerified(verified);
      
      if (!verified) {
        toast({
          title: 'Payment verification failed',
          description: 'We could not verify your payment. Please contact support.',
          variant: 'destructive',
        });
      }
      */
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: 'Error',
        description: 'Could not verify payment status. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setVerificationLoading(false);
    }
  };

  // Verify phone number against Supabase database
  const verifyPhoneNumber = async () => {
    try {
      setVerificationLoading(true);
      
      // First, send the current form data to the form webhook
      await submitFormToWebhook();
      
      // Proceed with phone verification
      const response = await fetch('https://crm-supabase.7za6uc.easypanel.host/rest/v1/payments_kb_all?select=*', {
        method: 'GET',
        headers: {
          'apikey': ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment data');
      }
      
      const payments = await response.json();
      console.log('Verification process started');
      
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
        
        return formattedInputPhone === paymentPhone || 
               formattedInputPhone === paymentPhoneNumber ||
               formattedInputPhone === customerPhone;
      });
      
      console.log('Verification process completed');
      
      if (matchedPayment) {
        setMatchedPayment(matchedPayment);
        setFormCompleted(true);
        return true;
      } else {
        toast({
          title: 'Verification Failed',
          description: 'We could not find a payment associated with this phone number. Please check your number or contact support.',
          variant: 'destructive'
        });
        return false;
      }
    } catch (error) {
      console.error('Error during phone verification:', error);
      toast({
        title: 'Error',
        description: 'Could not verify your phone number. Please try again.',
        variant: 'destructive',
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

  // Function to submit form data to the webhook with strict debouncing
  const submitFormToWebhook = async () => {
    // GLOBAL SUBMISSION LOCK
    // This uses a shared global window variable to lock submissions across the entire application
    try {
      if ((window as any).__formSubmissionLock) {
        console.log('GLOBAL LOCK ACTIVE - Submission already in progress');
        return true; // Return success without submitting
      }
      
      // Set global lock
      (window as any).__formSubmissionLock = true;
      
      // Use localStorage for additional protection
      const now = Date.now();
      const lastSubmission = localStorage.getItem('lastFormSubmission');
      const lastSubmissionTime = lastSubmission ? parseInt(lastSubmission) : 0;
      
      // Require at least 5 seconds between submissions
      if (now - lastSubmissionTime < 5000) {
        console.log('PREVENTED duplicate submission, last was', (now - lastSubmissionTime) / 1000, 'seconds ago');
        (window as any).__formSubmissionLock = false; // Release lock
        return true; // Return success without submitting
      }
      
      // Set submission flag
      setIsSubmitting(true);
      
      // Store current submission time in localStorage
      localStorage.setItem('lastFormSubmission', now.toString());
      
      // Generate a unique ID with less chance of collision
      const uniqueId = `${now}-${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}`;
      
      // Prepare the form data to be sent
      const formDataToSend = {
        ...formData,
        // Include timestamp and other metadata
        timestamp: new Date().toISOString(),
        source: 'intimate_talks',
        submission_id: uniqueId
      };
      
      console.log('SUBMITTING form data to webhook with ID:', uniqueId);
      
      // Send the form data to the webhook
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });
      
      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }
      
      console.log('Form data submitted successfully with ID:', uniqueId);
      return true;
    } catch (error) {
      console.error('Error submitting form data:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit form data. Please try again.',
        variant: 'destructive'
      });
      return false;
    } finally {
      // Clear all submission flags
      setIsSubmitting(false);
      // Release global lock with a small delay to prevent race conditions
      setTimeout(() => {
        (window as any).__formSubmissionLock = false;
      }, 500);
    }
  };



  // Function to send data to the backend webhook
  const sendTelegramDataToBackend = async (userData: any) => {
    try {
      // Check for global submission lock
      if ((window as any).__telegramSubmissionLock) {
        console.log('GLOBAL TELEGRAM LOCK ACTIVE - Submission already in progress');
        // Still show success message
        toast({
          title: 'Success!',
          description: 'You have been verified and added to the Intimate Talks group!',
          variant: 'default'
        });
        return; // Return without submitting
      }
      
      // Set global telegram submission lock
      (window as any).__telegramSubmissionLock = true;
      setLoading(true);
      
      // Check for duplicate submission
      const now = Date.now();
      const lastTelegramSubmission = localStorage.getItem('lastTelegramSubmission');
      const lastTelegramTime = lastTelegramSubmission ? parseInt(lastTelegramSubmission) : 0;
      
      // Require at least 5 seconds between Telegram submissions
      if (now - lastTelegramTime < 5000) {
        console.log('PREVENTED duplicate Telegram submission, last was', (now - lastTelegramTime) / 1000, 'seconds ago');
        // Still show success message
        toast({
          title: 'Success!',
          description: 'You have been verified and added to the Intimate Talks group!',
          variant: 'default'
        });
        return; // Return without submitting
      }
      
      // Save current submission time
      localStorage.setItem('lastTelegramSubmission', now.toString());
      
      // Try to get phone from localStorage as a backup
      let backupPhone = '';
      try {
        backupPhone = localStorage.getItem('verifiedPhone') || '';
      } catch (e) {
        console.error('Failed to get phone from localStorage', e);
      }
      
      // Find the most reliable phone number from all possible sources
      const reliablePhone = userData.phone_number || userData.verified_phone || formData.mobileNumber || backupPhone || '';
      
      // Log important data before sending
      console.log('Raw Telegram user data received');
      
      // Deep clone matchedPayment to avoid any reference issues
      const paymentDataToSend = userData.matched_payment || 
                               (matchedPayment ? JSON.parse(JSON.stringify(matchedPayment)) : null);
      
      // Ensure we have the latest form data
      const latestFormData = { ...formData };
      
      // Generate a unique submission ID with less chance of collision
      const uniqueId = `telegram-${now}-${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}`;
      
      // First, send to the form webhook to ensure form data is saved
      console.log('SUBMITTING to form webhook with ID:', uniqueId);
      
      await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...latestFormData,
          telegram_id: userData.id,
          phone_number: reliablePhone,
          timestamp: new Date().toISOString(),
          source: 'intimate_talks',
          submission_id: uniqueId
        })
      });
      
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
        form_data: latestFormData,
        submission_id: uniqueId
      };
      
      console.log('SUBMITTING to Telegram webhook with ID:', uniqueId);
      
      // Now send to the main telegram webhook for user verification
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/telegram-success-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadData)
      });
      
      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }
      
      console.log('Webhook successfully called with ID:', uniqueId);
      
      toast({
        title: 'Success!',
        description: 'You have been verified and added to the Intimate Talks group!',
        variant: 'default'
      });
      
    } catch (error) {
      console.error('Error in webhook call:', error);
      toast({
        title: 'Error',
        description: 'There was an error verifying your account. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
      // Release global telegram lock with a small delay to prevent race conditions
      setTimeout(() => {
        (window as any).__telegramSubmissionLock = false;
      }, 500);
    }
  };

  // Function to complete a step and go to the next one if all requirements are met
  const handleCompleteStep = async () => {
    // Prevent multiple rapid submissions
    if (isSubmitting) {
      console.log('Already submitting, please wait...');
      return;
    }
    
    // Check if current step is complete
    // Step 1: Basic information
    if (currentStep === 0) {
      if (!formData.gender || !formData.location || !formData.problems || !formData.joinReason) {
        toast({
          title: 'Incomplete information',
          description: 'Please fill out all required fields to continue.',
          variant: 'destructive'
        });
        return;
      }
      
      // Submit form data to the webhook after completing step 1
      await submitFormToWebhook();
      
      // Go to next step
      setCurrentStep(1);
    } 
    // Step 2: Terms and conditions
    else if (currentStep === 1) {
      if (!formData.hookupAgreement || !formData.privacyAgreement || !formData.participationAgreement || 
          !formData.respectAgreement || !formData.contentAgreement || !formData.nonJudgmentalAgreement || 
          !formData.participateAgreement || !formData.sensitiveTopicsAgreement || !formData.anonymityAgreement || 
          !formData.liabilityAgreement || !formData.explicitLanguageAgreement || !formData.additionalGuidelinesAgreement) {
        toast({
          title: 'Missing agreements',
          description: 'You must agree to all the terms to continue.',
          variant: 'destructive'
        });
        return;
      }
      
      // Only submit if we've made changes since last step
      const now = Date.now();
      if (now - lastSubmissionTime > 3000) {
        await submitFormToWebhook();
      }
      
      // Go to next step
      setCurrentStep(2);
    } 
    // Step 3: Contact information
    else if (currentStep === 2) {
      if (!formData.mobileNumber || !formData.email) {
        toast({
          title: 'Incomplete information',
          description: 'Please provide your mobile number and email to continue.',
          variant: 'destructive'
        });
        return;
      }
      
      // Final form data submission to the webhook - always submit at final step
      await submitFormToWebhook();
      
      // Verify phone number and proceed
      const verified = await verifyPhoneNumber();
      if (!verified) return;
      
      setCurrentStep(3);
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
          onClick={handleCompleteStep}
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
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="nonJudgmentalAgreement"
                name="nonJudgmentalAgreement"
                checked={formData.nonJudgmentalAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="nonJudgmentalAgreement" className="text-sm text-gray-700">
                <span className="font-medium">6. Non-Judgmental Environment:</span> It is essential to create an environment where members feel safe to share openly without fear of judgment. Shaming, finger-pointing, or making judgmental comments is strictly prohibited.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="participateAgreement"
                name="participateAgreement"
                checked={formData.participateAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="participateAgreement" className="text-sm text-gray-700">
                <span className="font-medium">7. Active Participation:</span> Active involvement from all members enriches our group dynamics. Prolonged inactivity may result in membership revocation to ensure an engaged community.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="sensitiveTopicsAgreement"
                name="sensitiveTopicsAgreement"
                checked={formData.sensitiveTopicsAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="sensitiveTopicsAgreement" className="text-sm text-gray-700">
                <span className="font-medium">8. Sensitive Topics:</span> Discussions on sensitive subjects must be approached with sensitivity and appropriate language to respect the diversity of perspectives among members.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="anonymityAgreement"
                name="anonymityAgreement"
                checked={formData.anonymityAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="anonymityAgreement" className="text-sm text-gray-700">
                <span className="font-medium">9. Anonymity Protection:</span> Protecting members' identities is crucial. Revealing any member's identity without explicit consent is a serious violation of privacy and will not be tolerated.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="liabilityAgreement"
                name="liabilityAgreement"
                checked={formData.liabilityAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="liabilityAgreement" className="text-sm text-gray-700">
                <span className="font-medium">10. Liability Disclaimer:</span> The Company and the influencers affiliated with this group shall not be held liable for the actions of any User. Although the Company provides a platform for discussion and the influencers offer guidance, they bear no responsibility for individual user actions or behaviours in any way.
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="explicitLanguageAgreement"
                name="explicitLanguageAgreement"
                checked={formData.explicitLanguageAgreement}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="explicitLanguageAgreement" className="text-sm text-gray-700">
                <span className="font-medium">11. Explicit Language Prohibition:</span> The use of sexually explicit language or any content that could trigger sexually inappropriate reactions is strictly forbidden within the group. Such actions may constitute criminal offenses under the Indian Penal Code (IPC), and offenders will be subject to legal prosecution and appropriate punishment as per the law.
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="additionalGuidelinesAgreement"
            name="additionalGuidelinesAgreement"
            checked={formData.additionalGuidelinesAgreement}
            onChange={handleInputChange}
            className="mt-1 mr-3"
          />
          <label htmlFor="additionalGuidelinesAgreement" className="text-sm text-gray-700">
            <span className="font-medium">Additional Guidelines:</span> I have read and agree to all additional guidelines, including the following:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Private Messaging Policy: Private messaging or 'DM' of other members without their explicit permission is not allowed. Members wishing to send private messages must seek permission in a transparent manner within the group.</li>
              <li>Legal Action for Harassment: Should any member face harassment within the group, and upon thorough investigation, if the allegations are found to be true, the company will take legal action under the applicable laws.</li>
              <li>Limitation of Liability: Neither the Company nor the influencers associated with this group shall be held liable for the actions of any User.</li>
            </ul>
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
          onClick={handleCompleteStep}
          disabled={!formData.hookupAgreement || !formData.privacyAgreement || !formData.participationAgreement || 
                   !formData.respectAgreement || !formData.contentAgreement || !formData.nonJudgmentalAgreement || 
                   !formData.participateAgreement || !formData.sensitiveTopicsAgreement || !formData.anonymityAgreement || 
                   !formData.liabilityAgreement || !formData.explicitLanguageAgreement || !formData.additionalGuidelinesAgreement}
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
          onClick={handleCompleteStep}
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
    script.setAttribute('data-telegram-login', 'KB_intimate_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-onauth', 'telegramLoginCallback(user)');
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
