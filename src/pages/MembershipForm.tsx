import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Check, CheckCircle, MessageCircle, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { trackEvent, trackFormStart, trackFormStepComplete, trackFormSubmit, EventCategory } from '@/utils/analytics';
import { trackFormEvent, trackTelegramEvent } from '@/components/ClarityEvents';

// Add type declaration for telegramLoginCallback
declare global {
  interface Window {
    telegramLoginCallback: (user: any) => void;
  }
}

// Form step interfaces
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

const MembershipForm = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);
  const [loading, setLoading] = useState(false);
  const [telegramData, setTelegramData] = useState<any>(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const telegramLoginContainerRef = useRef<HTMLDivElement>(null);
  const [matchedPayment, setMatchedPayment] = useState<any>(null);
  
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
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
    
    // Track form view/start
    trackFormStart('membership_form');
    trackFormEvent('membership_form', 'init', 'start');
    
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
          'apikey': ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }
      
      const payments = await response.json();
      console.log('Payment verification data received');
      
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
        console.log('Phone information stored in localStorage');
      } catch (e) {
        console.error('Failed to store data in localStorage', e);
      }
      
      // For development, auto-verify the phone number
      setPhoneVerified(true);
      
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
      console.log('Payment verification data received');
      
      // Find a payment that matches the phone number
      const matchedPayment = payments.find((payment: any) => 
        payment.phone === formData.mobileNumber || 
        payment.phone_number === formData.mobileNumber ||
        payment.customer_phone === formData.mobileNumber
      );
      
      console.log('Payment verification completed');
      
      if (matchedPayment) {
        setMatchedPayment(matchedPayment);
        setPhoneVerified(true);
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
    console.log('Current formData state:', formData);
    
    // Track Telegram authentication attempt
    trackEvent('telegram_auth_attempt', EventCategory.CONVERSION, 'membership_form');
    trackTelegramEvent('login', true);
    
    // Store the phone number in local storage as a backup
    try {
      localStorage.setItem('verified_phone', formData.mobileNumber);
      console.log('Phone verification completed');
    } catch (e) {
      console.error('Failed to store verification data', e);
    }
    
    // First store the Telegram data in state
    setTelegramData({
      ...user,
      phone_number: formData.mobileNumber,
      verified_phone: formData.mobileNumber
    });
    
    // Create a deep copy of the matched payment to avoid reference issues
    const paymentDataCopy = matchedPayment ? JSON.parse(JSON.stringify(matchedPayment)) : null;
    
    // Create combined user data with all necessary information
    const combinedUserData = {
      ...user,
      chat_id: user.id,
      user_id: user.id,
      telegram_id: user.id,
      phone_number: formData.mobileNumber,
      verified_phone: formData.mobileNumber,
      payment_id: paymentId || (matchedPayment?.payment_id || matchedPayment?.id || ''),
      amount: amount || (matchedPayment?.amount || ''),
      customer_name: matchedPayment?.customer_name || matchedPayment?.name || '',
      matched_payment: paymentDataCopy,
      // Add form data
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
      
      // Debug information - remove sensitive data
      console.log('[DEBUG] Verification process started');
      
      // Get phone from various sources (without logging the actual numbers)
      const reliablePhone = userData.phone_number || userData.verified_phone || formData.mobileNumber || backupPhone || '';
      
      console.log('[DEBUG] Verification state checked');
      
      // Get the most reliable phone number to use
      console.log('Verification data prepared for submission');
      
      // Log important data before sending
      console.log('Preparing Telegram verification data');
      
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // For checkboxes, use checked property
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const updatedFormData = {
        ...formData,
        [name]: checked
      };
      setFormData(updatedFormData);
      
      // Save to localStorage for persistence
      localStorage.setItem('membershipFormData', JSON.stringify(updatedFormData));
    } else {
      const updatedFormData = {
        ...formData,
        [name]: value
      };
      setFormData(updatedFormData);
      
      // Save to localStorage for persistence
      localStorage.setItem('membershipFormData', JSON.stringify(updatedFormData));
    }
  };
};
