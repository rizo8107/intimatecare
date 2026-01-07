import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Check, CheckCircle, MessageCircle, Lock, ArrowRight, ArrowLeft, ChevronDown, Shield, Heart } from 'lucide-react';
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
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center lg:text-left">
        <span className="badge-premium mb-4">Step 01</span>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Personal Details</h2>
        <p className="text-slate-500 font-medium mt-2">Tell us a bit about yourself to personalize your experience.</p>
      </div>

      <div className="grid gap-6">
        <div className="group">
          <label htmlFor="gender" className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Gender <span className="text-primary italic">*</span>
          </label>
          <div className="relative">
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full h-14 px-6 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer"
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Location <span className="text-primary italic">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full h-14 px-6 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
            placeholder="e.g. Mumbai, India"
            required
          />
        </div>

        <div>
          <label htmlFor="problems" className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            What challenges are you facing? <span className="text-primary italic">*</span>
          </label>
          <textarea
            id="problems"
            name="problems"
            value={formData.problems}
            onChange={handleInputChange}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none"
            rows={3}
            placeholder="Describe any issues you're experiencing..."
            required
          />
        </div>

        <div>
          <label htmlFor="joinReason" className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Why are you joining? <span className="text-primary italic">*</span>
          </label>
          <textarea
            id="joinReason"
            name="joinReason"
            value={formData.joinReason}
            onChange={handleInputChange}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none"
            rows={3}
            placeholder="What motivated you to join?"
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          className="btn-premium-primary h-14 px-10 text-lg shadow-xl shadow-primary/20"
          onClick={handleCompleteStep}
          disabled={!formData.gender || !formData.location || !formData.problems || !formData.joinReason}
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );

  // Form Step 2: Terms and Agreements
  const renderStep2 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center lg:text-left">
        <span className="badge-premium mb-4">Step 02</span>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Community Rules</h2>
        <p className="text-slate-500 font-medium mt-2">A safe community requires shared values. Please review carefully.</p>
      </div>

      <div className="space-y-3 max-h-[440px] overflow-y-auto pr-4 scrollbar-hide">
        <div className="mb-6">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Mandatory Agreements</h3>

          <div className="grid gap-3">
            {[
              { id: 'hookupAgreement', title: 'No Hookup Solicitations', sub: 'Romantic or sexual encounter requests are strictly prohibited.' },
              { id: 'privacyAgreement', title: 'Privacy & Confidentiality', sub: 'Absolutely no screenshots or sharing group content externally.' },
              { id: 'participationAgreement', title: 'Voluntary Participation', sub: 'All interactions are voluntary and non-professional in nature.' },
              { id: 'respectAgreement', title: 'Respect & Empathy', sub: 'Always engage with kindness and consideration for others.' },
              { id: 'contentAgreement', title: 'Content Restrictions', sub: 'Memes, jokes, or inappropriate materials are not allowed.' },
              { id: 'nonJudgmentalAgreement', title: 'Non-Judgmental Space', sub: 'We maintain zero tolerance for shaming or judgmental talk.' },
              { id: 'participateAgreement', title: 'Active Participation', sub: 'Prolonged inactivity may result in removal from the group.' },
              { id: 'sensitiveTopicsAgreement', title: 'Sensitive Topics', sub: 'Approach intense topics with empathy and correct language.' },
              { id: 'anonymityAgreement', title: 'Anonymity Protection', sub: 'Never reveal member identities without explicit consent.' },
              { id: 'liabilityAgreement', title: 'Liability Disclaimer', sub: 'The organization is not liable for individual member actions.' },
              { id: 'explicitLanguageAgreement', title: 'No Explicit Content', sub: 'Sexually explicit or graphic media is strictly forbidden.' },
            ].map((item: any) => (
              <label key={item.id} className={`flex items-start gap-4 p-5 rounded-[2rem] border transition-all cursor-pointer group hover:bg-slate-50 ${formData[item.id as keyof FormData] ? 'bg-primary/5 border-primary/20' : 'bg-slate-50/50 border-slate-100'}`}>
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    id={item.id}
                    name={item.id}
                    checked={formData[item.id as keyof FormData] as boolean}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData[item.id as keyof FormData] ? 'bg-primary border-primary scale-110' : 'border-slate-300 bg-white'}`}>
                    {formData[item.id as keyof FormData] && <Check className="w-4 h-4 text-white stroke-[3px]" />}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-black tracking-tight leading-none mb-1 transition-colors ${formData[item.id as keyof FormData] ? 'text-primary' : 'text-slate-950'}`}>{item.title}</span>
                  <span className="text-xs text-slate-500 font-medium leading-relaxed">{item.sub}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <label className={`flex items-start gap-4 p-6 rounded-[2.5rem] border bg-slate-950 text-white transition-all cursor-pointer group ${formData.additionalGuidelinesAgreement ? 'border-primary shadow-lg shadow-primary/10' : 'border-slate-800'}`}>
          <div className="relative mt-1">
            <input
              type="checkbox"
              id="additionalGuidelinesAgreement"
              name="additionalGuidelinesAgreement"
              checked={formData.additionalGuidelinesAgreement}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${formData.additionalGuidelinesAgreement ? 'bg-primary border-primary' : 'border-white/20 bg-white/5'}`}>
              {formData.additionalGuidelinesAgreement && <Check className="w-4 h-4 text-white stroke-[3px]" />}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight mb-1">Accept Master Terms</span>
            <span className="text-xs text-slate-400 font-medium leading-relaxed">I agree to DM policies, harassment reporting, and total limitation of liability.</span>
          </div>
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <button
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-500 hover:text-slate-900 transition-colors"
          onClick={prevStep}
        >
          <Lock className="w-4 h-4" /> Back
        </button>

        <button
          className="btn-premium-primary h-14 px-10 text-lg shadow-xl shadow-primary/20"
          onClick={handleCompleteStep}
          disabled={!formData.hookupAgreement || !formData.privacyAgreement || !formData.participationAgreement ||
            !formData.respectAgreement || !formData.contentAgreement || !formData.nonJudgmentalAgreement ||
            !formData.participateAgreement || !formData.sensitiveTopicsAgreement || !formData.anonymityAgreement ||
            !formData.liabilityAgreement || !formData.explicitLanguageAgreement || !formData.additionalGuidelinesAgreement}
        >
          Confirm Rules
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );

  // Initial Step: Phone Verification (Step -1)
  const renderPhoneVerification = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-[2rem] bg-primary/10 text-primary mb-6 shadow-lg shadow-primary/5">
          <Lock className="h-7 w-7 stroke-[2.5px]" />
        </div>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Identity Check</h2>
        <p className="text-slate-500 font-medium mt-2">Enter the mobile number used for your subscription.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="mobileNumber" className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Mobile Number <span className="text-primary italic">*</span>
          </label>
          <div className="relative group">
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handlePhoneNumberChange}
              className="w-full h-16 px-6 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-center font-black text-2xl tracking-[0.1em] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all group-hover:border-slate-300"
              placeholder="9876543210"
              maxLength={10}
              required
            />
            <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 text-center">
            Encrypted • Confidential • Instant
          </p>
        </div>

        <button
          className="btn-premium-primary w-full h-16 text-lg shadow-2xl shadow-primary/20"
          onClick={verifyPhoneInitial}
          disabled={!formData.mobileNumber || formData.mobileNumber.length < 10 || verificationLoading}
        >
          {verificationLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying Access...
            </div>
          ) : (
            <>
              Access Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Form Step 3: Additional Contact Information (Email & Referral)
  const renderStep3 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center lg:text-left">
        <span className="badge-premium mb-4">Step 03</span>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Final Details</h2>
        <p className="text-slate-500 font-medium mt-2">Almost there! Just a few more things to get you set up.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Email Address <span className="text-primary italic">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-14 px-6 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="referral" className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Referral Code <span className="text-slate-300 font-normal italic">(optional)</span>
          </label>
          <input
            type="text"
            id="referral"
            name="referral"
            value={formData.referral}
            onChange={handleInputChange}
            className="w-full h-14 px-6 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
            placeholder="Enter referral code"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-500 hover:text-slate-900 transition-colors"
          onClick={prevStep}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <button
          className="btn-premium-primary h-14 px-10 text-lg shadow-xl shadow-primary/20"
          onClick={handleCompleteStep}
          disabled={!formData.email}
        >
          Secure Account
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );

  // Form Step 4: Thank You and Telegram Login
  const renderStep4 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-emerald-500 text-white mb-6 shadow-xl shadow-emerald-100 animate-bounce-subtle">
          <CheckCircle className="h-10 w-10 stroke-[2.5px]" />
        </div>
        <h2 className="text-4xl font-black text-slate-950 tracking-tight leading-tight">
          {isExistingDeletedUser ? 'Welcome Home!' : 'All Verified & Set!'}
        </h2>
        {isExistingDeletedUser ? (
          <p className="text-slate-500 font-bold mt-4">
            Hi {deletedUserData?.customer_name || 'Member'}! Your re-subscription is active. <br />Join your tribe on Telegram below.
          </p>
        ) : (
          <p className="text-slate-500 font-bold mt-4">
            Thank you for being part of this journey. <br />Your safe space is just one click away.
          </p>
        )}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Official Telegram Link</h3>
          </div>

          <p className="text-slate-400 font-medium mb-10 leading-relaxed">
            {formCompleted
              ? "Your unique invite link is ready. Use as provided to enter our private community."
              : "Synchronizing your profile across our secure servers..."}
          </p>

          {telegramData ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[2rem] text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-white stroke-[3px]" />
              </div>
              <span className="block font-black text-white text-lg mb-1">Redirection Ready</span>
              <p className="text-emerald-400 font-bold text-sm">
                Connected as {telegramData.first_name}. Open Telegram now!
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              {formCompleted ? (
                <div ref={telegramLoginContainerRef} className="telegram-login-container transform hover:scale-105 transition-transform">
                  <div className="w-64 h-16 bg-white/10 rounded-2xl animate-pulse flex items-center justify-center text-white/20 font-bold">
                    Loading Secure Portal...
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 text-slate-500 font-bold italic">
                  <div className="w-5 h-5 border-2 border-slate-700 border-t-primary rounded-full animate-spin" />
                  Verifying Security Protocol...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="text-center pt-10 border-t border-slate-50">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Go Home
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
    <div className="min-h-screen bg-slate-50/50 py-20 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 text-emerald-600 text-[11px] font-black uppercase tracking-[0.2em] rounded-full mb-6 border border-emerald-500/10">
            <CheckCircle className="h-4 w-4 stroke-[3px]" />
            Payment Verified
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 mb-4 tracking-tighter">
            Community <span className="text-gradient">Entrance</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Welcome to Intimate Talks. Please complete your registration below.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100/50 overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {verificationLoading && currentStep === -1 ? (
            <div className="p-20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8"></div>
              <p className="text-slate-950 font-black uppercase tracking-widest text-sm animate-pulse">Running Security Check</p>
            </div>
          ) : (
            <div className="p-8 md:p-12">
              {/* Progress Steps */}
              {!isExistingDeletedUser && currentStep < 3 && (
                <div className="mb-14">
                  <div className="flex items-center justify-between px-2">
                    {['Verify', 'Profile', 'Safety', 'Legal'].map((label, index) => {
                      const stepNum = index;
                      const adjustedCurrent = currentStep + 1;
                      const isActive = adjustedCurrent === stepNum;
                      const isComplete = adjustedCurrent > stepNum;
                      return (
                        <div key={label} className="relative flex-1 flex flex-col items-center">
                          {/* Line */}
                          {index > 0 && (
                            <div className={`absolute right-1/2 top-4 w-full h-[3px] -translate-y-1/2 transition-colors duration-500 ${isComplete || isActive ? 'bg-primary/20' : 'bg-slate-100'}`} style={{ right: 'calc(50% + 20px)', width: 'calc(100% - 40px)' }} />
                          )}

                          <div className={`
                            relative z-10 w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-500
                            ${isComplete ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}
                            ${isActive ? 'bg-slate-950 text-white ring-8 ring-slate-50 shadow-xl' : ''}
                            ${!isActive && !isComplete ? 'bg-slate-100 text-slate-400' : ''}
                          `}>
                            {isComplete ? <Check className="h-5 w-5 stroke-[4px]" /> : index + 1}
                          </div>

                          <span className={`mt-4 text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Form Steps */}
              <div className="min-h-[400px] flex flex-col justify-center">
                {currentStep === -1 && renderPhoneVerification()}
                {currentStep === 0 && renderStep1()}
                {currentStep === 1 && renderStep2()}
                {currentStep === 2 && renderStep3()}
                {currentStep === 3 && renderStep4()}
              </div>
            </div>
          )}
        </div>

        {/* Footer Support */}
        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {[
              { icon: Shield, text: "End-to-end Encrypted" },
              { icon: Heart, text: "Community Verified" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-6">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-200">|</span>
            <Link
              to="/guide"
              className="text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors"
            >
              Help Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntimateSuccess;
