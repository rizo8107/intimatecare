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
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 for phone verification
  const [formCompleted, setFormCompleted] = useState(false);
  const [isExistingDeletedUser, setIsExistingDeletedUser] = useState(false); // For users in telegram_sub_deleted
  const [deletedUserData, setDeletedUserData] = useState<any>(null);
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

  // Helper function to normalize phone numbers
  const normalizePhone = (phone: string | null | undefined) => {
    if (!phone) return '';
    const phoneStr = String(phone);
    const digits = phoneStr.replace(/\D/g, '');
    return digits.slice(-10); // Get last 10 digits
  };

  // Check if user exists in telegram_sub_deleted table (previously removed users)
  const checkDeletedUser = async (phoneNumber: string) => {
    try {
      const response = await fetch('https://crm-supabase.7za6uc.easypanel.host/rest/v1/telegram_sub_deleted?select=*', {
        method: 'GET',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      
      if (!response.ok) {
        console.error('Failed to fetch deleted users data');
        return null;
      }
      
      const deletedUsers = await response.json();
      const formattedInputPhone = normalizePhone(phoneNumber);
      
      // Find a deleted user that matches the phone number
      const matchedDeletedUser = deletedUsers.find((user: any) => {
        const userPhone = normalizePhone(user.phone_number);
        return formattedInputPhone === userPhone;
      });
      
      return matchedDeletedUser || null;
    } catch (error) {
      console.error('Error checking deleted users:', error);
      return null;
    }
  };

  // Initial phone verification at the beginning
  const verifyPhoneInitial = async () => {
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      toast({
        title: 'Phone number required',
        description: 'Please enter a valid 10-digit phone number to continue.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setVerificationLoading(true);
      const formattedInputPhone = normalizePhone(formData.mobileNumber);
      
      // Fetch payment data first (needed for both new and returning users)
      const paymentResponse = await fetch('https://crm-supabase.7za6uc.easypanel.host/rest/v1/payments_kb_all?select=*', {
        method: 'GET',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      
      if (!paymentResponse.ok) {
        throw new Error('Failed to fetch payment data');
      }
      
      const payments = await paymentResponse.json();
      
      // Find a payment that matches the phone number
      const matchedPaymentData = payments.find((payment: any) => {
        const paymentPhone = normalizePhone(payment.phone);
        const paymentPhoneNumber = normalizePhone(payment.phone_number);
        const customerPhone = normalizePhone(payment.customer_phone);
        
        return formattedInputPhone === paymentPhone || 
               formattedInputPhone === paymentPhoneNumber ||
               formattedInputPhone === customerPhone;
      });
      
      // Check if user exists in telegram_sub_deleted (previously removed users)
      const deletedUser = await checkDeletedUser(formData.mobileNumber);
      
      if (deletedUser) {
        console.log('Found user in telegram_sub_deleted');
        
        // Cross-check with payment_kb_all to verify they have re-subscribed
        if (matchedPaymentData) {
          // Check if the payment is newer than when they were deleted (if we have expiry_date)
          const deletedExpiry = deletedUser.expiry_date ? new Date(deletedUser.expiry_date) : null;
          const paymentDate = matchedPaymentData.created_at ? new Date(matchedPaymentData.created_at) : 
                             matchedPaymentData.payment_date ? new Date(matchedPaymentData.payment_date) : null;
          
          // If we can compare dates, check if payment is after expiry (re-subscription)
          // Or if no dates available, just verify payment exists
          const hasValidResubscription = !deletedExpiry || !paymentDate || paymentDate > deletedExpiry;
          
          if (hasValidResubscription) {
            console.log('Verified re-subscription for deleted user');
            setDeletedUserData(deletedUser);
            setMatchedPayment(matchedPaymentData);
            setIsExistingDeletedUser(true);
            setFormCompleted(true);
            setCurrentStep(3); // Skip to Telegram login step
            
            localStorage.setItem('verifiedPhone', formData.mobileNumber);
            
            toast({
              title: 'Welcome back!',
              description: 'Your re-subscription has been verified. Please connect with Telegram to rejoin.',
              variant: 'default'
            });
            return;
          }
        }
        
        // Deleted user but no valid payment found - they need to subscribe again
        toast({
          title: 'Subscription Required',
          description: 'Your previous subscription has expired. Please subscribe again to rejoin the group.',
          variant: 'destructive'
        });
        return;
      }
      
      // New user - check if they have a valid payment
      if (matchedPaymentData) {
        setMatchedPayment(matchedPaymentData);
        localStorage.setItem('verifiedPhone', formData.mobileNumber);
        setCurrentStep(0); // Proceed to form step 1
        
        toast({
          title: 'Phone Verified!',
          description: 'Your payment has been verified. Please complete the registration form.',
          variant: 'default'
        });
      } else {
        toast({
          title: 'Verification Failed',
          description: 'We could not find a payment associated with this phone number. Please check your number or contact support.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error during initial phone verification:', error);
      toast({
        title: 'Error',
        description: 'Could not verify your phone number. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setVerificationLoading(false);
    }
  };

  // Verify phone number against Supabase database (for form submission)
  const verifyPhoneNumber = async () => {
    try {
      setVerificationLoading(true);
      
      // First, send the current form data to the form webhook
      await submitFormToWebhook();
      
      // Proceed with phone verification
      const response = await fetch('https://crm-supabase.7za6uc.easypanel.host/rest/v1/payments_kb_all?select=*', {
        method: 'GET',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment data');
      }
      
      const payments = await response.json();
      console.log('Verification process started');
      
      const formattedInputPhone = normalizePhone(formData.mobileNumber);
      
      // Find a payment that matches the phone number
      const matchedPaymentData = payments.find((payment: any) => {
        const paymentPhone = normalizePhone(payment.phone);
        const paymentPhoneNumber = normalizePhone(payment.phone_number);
        const customerPhone = normalizePhone(payment.customer_phone);
        
        return formattedInputPhone === paymentPhone || 
               formattedInputPhone === paymentPhoneNumber ||
               formattedInputPhone === customerPhone;
      });
      
      console.log('Verification process completed');
      
      if (matchedPaymentData) {
        setMatchedPayment(matchedPaymentData);
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
        // If the webhook returns an error, log it and potentially handle it
        const errorData = await response.text(); // Use text() to avoid JSON parse error if not JSON
        console.error('Webhook submission failed:', response.status, errorData);
        // Potentially throw an error or return a specific value to indicate failure
        // For now, we'll let it proceed, but you might want to handle this more robustly
        // Consider not setting localStorage 'lastFormSubmission' if webhook fails, to allow quicker retry
      }

      // Return true to indicate that the submission process was initiated
      return true;
    } catch (error) {
      console.error('Error in submitFormToWebhook:', error);
      // Return false or throw error to indicate failure
      return false;
    } finally {
      // Always release the global lock and reset submitting state
      // This ensures that even if an error occurs, the lock is released.
      (window as any).__formSubmissionLock = false;
      setIsSubmitting(false);
      console.log('GLOBAL LOCK RELEASED and isSubmitting set to false in submitFormToWebhook');
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
    // Step 3: Additional contact info (email, referral)
    else if (currentStep === 2) {
      if (!formData.email) {
        toast({
          title: 'Incomplete information',
          description: 'Please provide your email to continue.',
          variant: 'destructive'
        });
        return;
      }
      
      // Submit form data
      await submitFormToWebhook();
      setFormCompleted(true);
      setCurrentStep(3);
    }
  };

  // Form Step 1: Basic Information
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">About You</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us a bit about yourself</p>
      </div>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-rose-500">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
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
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            placeholder="Mumbai, India"
            required
          />
        </div>
        
        <div>
          <label htmlFor="problems" className="block text-sm font-medium text-gray-700 mb-2">
            What challenges are you facing? <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="problems"
            name="problems"
            value={formData.problems}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
            rows={3}
            placeholder="Describe any issues you're experiencing..."
            required
          />
        </div>
        
        <div>
          <label htmlFor="joinReason" className="block text-sm font-medium text-gray-700 mb-2">
            Why are you joining? <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="joinReason"
            name="joinReason"
            value={formData.joinReason}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
            rows={3}
            placeholder="What motivated you to join?"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          className="inline-flex items-center justify-center h-11 px-6 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCompleteStep}
          disabled={!formData.gender || !formData.location || !formData.problems || !formData.joinReason}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Form Step 2: Terms and Agreements
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Community Guidelines</h2>
        <p className="text-sm text-gray-500 mt-1">Please review and accept our terms</p>
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Mandatory Guidelines</h3>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="hookupAgreement"
                name="hookupAgreement"
                checked={formData.hookupAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">No hookup solicitations</span> - This group prohibits romantic or sexual encounter requests.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="privacyAgreement"
                name="privacyAgreement"
                checked={formData.privacyAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Privacy & confidentiality</span> - No screenshots or sharing group content externally.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="participationAgreement"
                name="participationAgreement"
                checked={formData.participationAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Voluntary participation</span> - All interactions are voluntary and non-professional.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="respectAgreement"
                name="respectAgreement"
                checked={formData.respectAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Respect & empathy</span> - Engage with consideration towards others.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="contentAgreement"
                name="contentAgreement"
                checked={formData.contentAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Content restrictions</span> - No memes, jokes, or inappropriate materials.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="nonJudgmentalAgreement"
                name="nonJudgmentalAgreement"
                checked={formData.nonJudgmentalAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Non-judgmental environment</span> - No shaming or judgmental comments.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="participateAgreement"
                name="participateAgreement"
                checked={formData.participateAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Active participation</span> - Prolonged inactivity may result in removal.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="sensitiveTopicsAgreement"
                name="sensitiveTopicsAgreement"
                checked={formData.sensitiveTopicsAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Sensitive topics</span> - Approach with sensitivity and appropriate language.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="anonymityAgreement"
                name="anonymityAgreement"
                checked={formData.anonymityAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Anonymity protection</span> - Never reveal member identities without consent.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="liabilityAgreement"
                name="liabilityAgreement"
                checked={formData.liabilityAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Liability disclaimer</span> - Company is not liable for user actions.
              </span>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id="explicitLanguageAgreement"
                name="explicitLanguageAgreement"
                checked={formData.explicitLanguageAgreement}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">No explicit language</span> - Sexually explicit content is forbidden.
              </span>
            </label>
          </div>
        </div>
        
        <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            id="additionalGuidelinesAgreement"
            name="additionalGuidelinesAgreement"
            checked={formData.additionalGuidelinesAgreement}
            onChange={handleInputChange}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
          />
          <span className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">I agree to all additional guidelines</span> including DM policies, harassment reporting, and limitation of liability.
          </span>
        </label>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          className="inline-flex items-center justify-center h-11 px-6 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          onClick={prevStep}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        
        <button
          className="inline-flex items-center justify-center h-11 px-6 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCompleteStep}
          disabled={!formData.hookupAgreement || !formData.privacyAgreement || !formData.participationAgreement || 
                   !formData.respectAgreement || !formData.contentAgreement || !formData.nonJudgmentalAgreement || 
                   !formData.participateAgreement || !formData.sensitiveTopicsAgreement || !formData.anonymityAgreement || 
                   !formData.liabilityAgreement || !formData.explicitLanguageAgreement || !formData.additionalGuidelinesAgreement}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Initial Step: Phone Verification (Step -1)
  const renderPhoneVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 mb-4">
          <Lock className="h-6 w-6 text-rose-500" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Verify Your Number</h2>
        <p className="text-sm text-gray-500 mt-1">Enter the mobile number used during payment</p>
      </div>
      
      <div>
        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handlePhoneNumberChange}
          className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-white text-gray-900 text-center text-lg tracking-wider placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
          placeholder="9876543210"
          maxLength={10}
          required
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          We'll verify your subscription with this number
        </p>
      </div>
      
      <div className="flex justify-center pt-2">
        <button
          className="inline-flex items-center justify-center h-11 px-8 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={verifyPhoneInitial}
          disabled={!formData.mobileNumber || formData.mobileNumber.length < 10 || verificationLoading}
        >
          {verificationLoading ? 'Verifying...' : 'Verify & Continue'} <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Form Step 3: Additional Contact Information (Email & Referral)
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
        <p className="text-sm text-gray-500 mt-1">How can we reach you?</p>
      </div>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-2">
            Referral Code <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="referral"
            name="referral"
            value={formData.referral}
            onChange={handleInputChange}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            placeholder="Enter referral code"
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          className="inline-flex items-center justify-center h-11 px-6 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          onClick={prevStep}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        
        <button
          className="inline-flex items-center justify-center h-11 px-6 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCompleteStep}
          disabled={!formData.email}
        >
          Complete <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Form Step 4: Thank You and Telegram Login
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 mb-4">
          <Check className="h-7 w-7 text-emerald-500" strokeWidth={3} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {isExistingDeletedUser ? 'Welcome Back!' : 'You\'re All Set!'}
        </h2>
        {isExistingDeletedUser ? (
          <p className="text-sm text-gray-500 mt-2">
            Hi {deletedUserData?.customer_name || 'there'}! Connect with Telegram to rejoin.
          </p>
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            Thank you for joining our community
          </p>
        )}
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="h-5 w-5 text-rose-500" />
          <h3 className="font-medium text-gray-900">Connect Telegram</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {formCompleted 
            ? "Click below to connect and join our Telegram group."
            : "Please wait while we verify your information..."}
        </p>
        
        {telegramData ? (
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="font-medium text-emerald-700">Connected Successfully</span>
            </div>
            <p className="text-sm text-emerald-600">
              Welcome, {telegramData.first_name}! Check Telegram for your invite.
            </p>
            {telegramData.username && (
              <p className="text-xs text-emerald-500 mt-1">@{telegramData.username}</p>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            {formCompleted ? (
              <div ref={telegramLoginContainerRef} className="telegram-login-container">
                <div className="animate-pulse bg-gray-200 h-11 w-48 rounded-lg"></div>
              </div>
            ) : (
              <div className="bg-gray-100 text-gray-400 py-3 px-6 rounded-lg text-sm">
                Verifying...
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="text-center pt-4">
        <Link 
          to="/" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full mb-4">
            <Check className="h-3 w-3" />
            Payment Confirmed
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Complete Registration
          </h1>
          <p className="text-sm text-gray-500">
            Join the Intimate Talks community
          </p>
        </div>
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {verificationLoading ? (
            <div className="p-8 flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-2 border-rose-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-sm text-gray-500">Verifying...</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Progress Steps */}
              {!isExistingDeletedUser && currentStep < 3 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    {['Verify', 'Info', 'Terms', 'Contact'].map((label, index) => {
                      const stepNum = index;
                      const adjustedCurrent = currentStep + 1;
                      const isActive = adjustedCurrent === stepNum;
                      const isComplete = adjustedCurrent > stepNum;
                      return (
                        <div key={label} className="flex items-center">
                          <div className={`
                            w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all
                            ${isComplete ? 'bg-rose-500 text-white' : ''}
                            ${isActive ? 'bg-rose-500 text-white ring-4 ring-rose-100' : ''}
                            ${!isActive && !isComplete ? 'bg-gray-100 text-gray-400' : ''}
                          `}>
                            {isComplete ? <Check className="h-3.5 w-3.5" /> : index + 1}
                          </div>
                          {index < 3 && (
                            <div className={`w-full h-0.5 mx-1 ${adjustedCurrent > stepNum ? 'bg-rose-500' : 'bg-gray-100'}`} style={{ width: '40px' }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between px-1">
                    {['Verify', 'Info', 'Terms', 'Contact'].map((label, index) => {
                      const adjustedCurrent = currentStep + 1;
                      return (
                        <span key={label} className={`text-xs ${adjustedCurrent >= index ? 'text-gray-700' : 'text-gray-400'}`}>
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Form Steps */}
              {currentStep === -1 && renderPhoneVerification()}
              {currentStep === 0 && renderStep1()}
              {currentStep === 1 && renderStep2()}
              {currentStep === 2 && renderStep3()}
              {currentStep === 3 && renderStep4()}
            </div>
          )}
        </div>
        
        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 mb-4">
            Get access to exclusive content and discussions
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/guide" className="text-sm text-rose-500 hover:text-rose-600 transition-colors">
              Explore Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntimateSuccess;
