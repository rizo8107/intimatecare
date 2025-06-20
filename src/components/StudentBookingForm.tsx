import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://crm-supabase.7za6uc.easypanel.host';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Add error checking for required Supabase configuration
if (!supabaseKey) {
  console.error('Supabase configuration missing. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Interface for session types and slots
interface SessionType {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number;
}

interface AvailableSlot {
  id: number;
  slot_date: string;
  start_time: string;
  end_time: string;
  session_type_id: number;
  status: string;
  booking_status: boolean;
}

// Declare global Cashfree type
declare global {
  interface Window {
    Cashfree: any;
    fbq: (event: string, eventName: string, params?: { [key: string]: string | number | boolean; }) => void;
  }
}

interface FormData {
  name: string;
  gender: string;
  email: string;
  phone: string;
  college: string;
  courseAndYear: string;
  location: string;
  idCard: File | null;
  preferredDate: string;
  preferredTime: string;
  sessionTypeId: number | null;
  selectedSlotId: number | null;
  bringsToSession: string;
  hopesToGain: string;
  specificTopics: string;
  spokenToSomeone: string;
  lookingFor: string;
  anythingElse: string;
  joinWhatsappChannel: string;
}

const StudentBookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    email: '',
    phone: '',
    college: '',
    courseAndYear: '',
    location: '',
    idCard: null,
    preferredDate: '',
    preferredTime: '',
    sessionTypeId: null,
    selectedSlotId: null,
    bringsToSession: '',
    hopesToGain: '',
    specificTopics: '',
    spokenToSomeone: '',
    lookingFor: '',
    anythingElse: '',
    joinWhatsappChannel: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  
  // Payment-related state
  const [isLoading, setIsLoading] = useState(false);
  const [storedCfOrderId, setStoredCfOrderId] = useState<string>('');
  const [paymentOutcome, setPaymentOutcome] = useState<any>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPollingStatus, setIsPollingStatus] = useState(false);
  
  // Confirmation page state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  // Session types and available slots state
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedSessionType, setSelectedSessionType] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  
  // Refs for polling control
  const pollingActiveRef = useRef(false);
  const pollingTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  
  // Payment constants
  const FINAL_PAYMENT_STATUSES = ['SUCCESS', 'FAILED', 'CANCELLED', 'PAID'];
  const MAX_POLLING_ATTEMPTS = 20;
  const POLLING_INTERVAL = 5000; // 5 seconds

  // Fetch session types from Supabase
  const fetchSessionTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('session_types')
        .select('*')
        .order('id');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setSessionTypes(data);
        // Select the first session type by default if available
        if (data.length > 0 && !selectedSessionType) {
          setSelectedSessionType(data[0].id);
          // Fetch available slots for the selected session type
          fetchAvailableSlots(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching session types:', error);
      toast({
        title: 'Error',
        description: 'Failed to load session types. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  // Fetch available slots for a specific session type
  const fetchAvailableSlots = async (sessionTypeId: number) => {
    setIsLoadingSlots(true);
    try {
      const { data, error } = await supabase
        .from('available_slots')
        .select('*')
        .eq('session_type_id', sessionTypeId)
        .eq('status', 'available')
        .eq('booking_status', false)
        .gte('slot_date', new Date().toISOString().split('T')[0]) // Only future dates
        .order('slot_date')
        .order('start_time');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setAvailableSlots(data);
        // Clear any previously selected slot
        setSelectedSlot(null);
        setSelectedDate('');
        
        // Update form data
        setFormData(prev => ({
          ...prev,
          preferredDate: '',
          preferredTime: '',
          selectedSlotId: null
        }));
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      toast({
        title: 'Error',
        description: 'Failed to load available slots. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingSlots(false);
    }
  };
  
  // Handle session type selection
  const handleSessionTypeChange = (sessionTypeId: number) => {
    setSelectedSessionType(sessionTypeId);
    setFormData(prev => ({ ...prev, sessionTypeId }));
    fetchAvailableSlots(sessionTypeId);
  };
  
  // Handle date selection
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setFormData(prev => ({
      ...prev,
      preferredDate: date,
      preferredTime: ''
    }));
  };
  
  // Handle slot selection
  const handleSlotSelection = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
    setFormData(prev => ({
      ...prev,
      preferredDate: slot.slot_date,
      preferredTime: `${slot.start_time} - ${slot.end_time}`,
      selectedSlotId: slot.id
    }));
  };
  
  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else {
      return format(date, 'EEE, MMM d'); // e.g., "Mon, Jan 1"
    }
  };
  
  // Format time for display
  const formatTimeForDisplay = (timeString: string) => {
    return timeString.replace(/:00$/, ''); // Remove seconds if present
  };
  
  // Get unique dates from available slots
  const getUniqueDates = () => {
    const uniqueDates = [...new Set(availableSlots.map(slot => slot.slot_date))];
    return uniqueDates.sort();
  };
  
  // Get slots for a specific date
  const getSlotsByDate = (date: string) => {
    return availableSlots.filter(slot => slot.slot_date === date);
  };
  
  // Fetch session types on component mount
  useEffect(() => {
    fetchSessionTypes();
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      pollingActiveRef.current = false;
      if (pollingTimeoutIdRef.current) {
        clearTimeout(pollingTimeoutIdRef.current);
      }
    };
  }, []);

  // Generate order ID
  const generateOrderId = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 9).toUpperCase();
    return `studentform_${timestamp}_${randomString}`;
  };

  // Load Cashfree SDK
  const loadCashfreeSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Cashfree SDK'));
      document.head.appendChild(script);
    });
  };

  // Start payment status polling
  const startPaymentStatusPolling = (cfOrderId: string) => {
    console.log('Starting payment status polling for order:', cfOrderId);
    pollingActiveRef.current = true;
    setIsPollingStatus(true);
    pollForPaymentStatus(cfOrderId, 0);
  };

  // Poll for payment status
  const pollForPaymentStatus = async (currentCfOrderId: string, attempt: number) => {
    if (!pollingActiveRef.current) {
      console.log('Polling was stopped externally or component unmounted.');
      if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
      return;
    }

    console.log(`Polling for order ${currentCfOrderId}, attempt ${attempt + 1}`);
    setPaymentError(null);

    const verifyWebhookUrl = 'https://backend-n8n.7za6uc.easypanel.host/webhook/verify';
    const username = 'nirmal@lifedemy.in';
    const password = 'Life@123';

    try {
      const response = await fetch(verifyWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        },
        body: JSON.stringify({ order_id: currentCfOrderId }),
      });

      if (response.ok) {
        const statusData = await response.json();
        setPaymentOutcome(statusData);

        if (FINAL_PAYMENT_STATUSES.includes(statusData.payment_status) || attempt + 1 >= MAX_POLLING_ATTEMPTS) {
          pollingActiveRef.current = false;
          setIsPollingStatus(false);
          if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
          
          if (statusData.payment_status === 'SUCCESS') {
            toast({
              title: 'Payment Successful!',
              description: 'Processing your booking...',
              variant: 'default',
            });
            await submitFormAfterPayment();
          } else {
            toast({
              title: 'Payment Failed',
              description: `Payment status: ${statusData.payment_status}. ${statusData.payment_message || ''}`,
              variant: 'destructive',
            });
            setIsLoading(false);
          }
        } else {
          if (pollingActiveRef.current) {
            pollingTimeoutIdRef.current = setTimeout(() => pollForPaymentStatus(currentCfOrderId, attempt + 1), POLLING_INTERVAL);
          }
        }
      } else {
        const errorText = await response.text();
        setPaymentError(`Polling error: ${response.status}. ${errorText}`);
        pollingActiveRef.current = false;
        setIsPollingStatus(false);
        if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
        toast({ title: 'Polling Error', description: `Could not verify status: ${errorText}`, variant: 'destructive' });
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Polling fetch error:', error);
      setPaymentError(`Polling network error: ${error.message}`);
      pollingActiveRef.current = false;
      setIsPollingStatus(false);
      if (pollingTimeoutIdRef.current) clearTimeout(pollingTimeoutIdRef.current);
      toast({ title: 'Polling Network Error', description: 'Connection failed while checking status.', variant: 'destructive' });
      setIsLoading(false);
    }
  };

  // Submit form after successful payment
  const submitFormAfterPayment = async () => {
    try {
      setIsLoading(true);
      
      // Prepare data for database insertion
      const bookingData = {
        // Personal Information
        name: formData.name,
        gender: formData.gender,
        email: formData.email,
        phone: `+91${formData.phone}`, // Add +91 prefix to phone number
        
        // Student Information
        college: formData.college,
        course_and_year: formData.courseAndYear,
        location: formData.location,
        id_card_filename: formData.idCard?.name || null,
        
        // Session Details
        session_type: 'Student Session',
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime ? formData.preferredTime.split(' - ')[0] : null, // Extract just the start time from the range
        slot_id: formData.selectedSlotId,
        
        // Session Questions
        brings_to_session: formData.bringsToSession,
        hopes_to_gain: formData.hopesToGain,
        specific_topics: formData.specificTopics,
        spoken_to_someone: formData.spokenToSomeone,
        looking_for: formData.lookingFor,
        anything_else: formData.anythingElse || '',
        join_whatsapp_channel: formData.joinWhatsappChannel,
        
        // Payment Information
        price: 299.00,
        payment_status: 'PAID',
        cf_order_id: storedCfOrderId,
        cf_payment_id: paymentOutcome?.cf_payment_id || null,
        payment_timestamp: new Date().toISOString(),
        
        // System Fields
        status: 'BOOKED'
      };
      
      // Insert booking data into the student_bookings table
      const { data, error } = await supabase
        .from('student_bookings')
        .insert([bookingData])
        .select();
      
      if (error) {
        console.error('Error inserting booking:', error);
        throw new Error(`Database error: ${error.message}`);
      }
      
      // Set booking details for confirmation page
      setBookingDetails(data?.[0] || bookingData);
      setShowConfirmation(true);
      
      // Track successful booking with Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'CompleteRegistration', {
          content_name: 'Student Session Booking',
          content_category: 'Student',
          value: 299.00,
          currency: 'INR'
        });
      }
      
      // Show success toast
      toast({
        title: "Booking confirmed successfully!",
        description: "Payment received. We'll contact you soon to confirm your session.",
      });
      
      // Also send data to webhook for backward compatibility
      try {
        const submissionData = new FormData();
        Object.keys(formData).forEach(key => {
          const value = formData[key as keyof FormData];
          if (value !== null && value !== undefined) {
            if (value instanceof File) {
              submissionData.append(key, value, value.name);
            } else {
              submissionData.append(key, String(value));
            }
          }
        });
        submissionData.append('sessionType', 'Student Session');
        submissionData.append('price', '₹299');
        submissionData.append('paymentStatus', 'PAID');
        submissionData.append('cfOrderId', storedCfOrderId);
        
        // Send to webhook in background (don't await)
        fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/studenform', {
          method: 'POST',
          body: submissionData,
        });
      } catch (webhookError) {
        // Just log webhook errors, don't fail the booking process
        console.error('Webhook submission error:', webhookError);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error submitting booking",
        description: "Payment was successful but booking submission failed. Please contact us.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      setFormData(prev => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.gender) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.college || !formData.courseAndYear || !formData.location) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields for student information.",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.idCard) {
      toast({
        title: "ID Card Required",
        description: "Please upload your student ID card.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.bringsToSession || !formData.hopesToGain || !formData.specificTopics || !formData.spokenToSomeone || !formData.lookingFor || !formData.joinWhatsappChannel) {
      toast({ title: "Missing information", description: "Please fill in all required fields.", variant: "destructive" });
      return false;
    }
    
    if (!selectedSessionType) {
      toast({ title: "Session type required", description: "Please select a session type.", variant: "destructive" });
      return false;
    }
    
    if (!formData.preferredDate || !formData.preferredTime) {
      toast({ title: "Date and time required", description: "Please select an available date and time slot.", variant: "destructive" });
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2);
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3);
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep3()) {
      return;
    }

    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all customer details.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const order_id = generateOrderId();
    const customer_id = `${formData.name.replace(/\s+/g, '_')}_${order_id}`;

    const payload = {
      order_amount: 299,
      order_id: order_id,
      customer_id: customer_id,
      customer_phone: formData.phone,
      customer_email: formData.email,
    };

    const webhookUrl = 'https://backend-n8n.7za6uc.easypanel.host/webhook/studentpay';
    const username = 'nirmal@lifedemy.in';
    const password = 'Life@123';

    let cfOrderIdFromWebhook: string | null = null;

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        let paymentSessionIdFromWebhook: string | null = null;

        if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].payment_session_id) {
          paymentSessionIdFromWebhook = responseData[0].payment_session_id;
          cfOrderIdFromWebhook = responseData[0].cf_order_id;

          if (cfOrderIdFromWebhook) {
            setStoredCfOrderId(cfOrderIdFromWebhook);
          } else {
            console.error("cf_order_id not found in initial webhook response");
            toast({
              title: 'Webhook Error',
              description: 'Critical: cf_order_id missing from initial payment setup response.',
              variant: 'destructive',
            });
            setIsLoading(false);
            return;
          }
        } else if (responseData && responseData.payment_session_id) {
          paymentSessionIdFromWebhook = responseData.payment_session_id;
        }

        if (typeof paymentSessionIdFromWebhook === 'string' && paymentSessionIdFromWebhook.trim() !== '') {
          const paymentSessionId = paymentSessionIdFromWebhook;
          try {
            await loadCashfreeSDK();
            if (window.Cashfree) {
              const cashfree = window.Cashfree({ mode: "production" });
              const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: "_modal",
              };
              cashfree.checkout(checkoutOptions).then((result: any) => {
                setIsLoading(false);
                console.log('Cashfree SDK result:', JSON.stringify(result, null, 2));

                if (cfOrderIdFromWebhook) {
                  console.log('Payment modal closed. Starting polling with cfOrderIdFromWebhook:', cfOrderIdFromWebhook);
                  toast({ title: 'Verifying Payment', description: 'Payment modal closed. Checking status...', variant: 'default' });
                  startPaymentStatusPolling(cfOrderIdFromWebhook);
                } else {
                  console.error('CRITICAL: Cannot poll for status because cfOrderIdFromWebhook is missing after modal close.');
                  toast({ title: 'Error', description: 'Payment outcome unclear and no Order ID to verify.', variant: 'destructive' });
                }
              });
            } else {
              throw new Error('Cashfree SDK not available on window object.');
            }
          } catch (sdkError: any) {
            console.error("Cashfree SDK or checkout error:", sdkError);
            toast({ title: 'SDK Error', description: sdkError.message || 'Could not initialize payment.', variant: 'destructive' });
            setIsLoading(false);
          }
        } else {
          let errorDescription = 'The webhook did not return a valid payment_session_id.';
          if (paymentSessionIdFromWebhook === '') {
            errorDescription = 'The webhook returned an empty payment_session_id.';
          }
          console.error('Webhook response issue. paymentSessionIdFromWebhook:', paymentSessionIdFromWebhook, 'Full responseData:', responseData);
          toast({
            title: 'Webhook Response Error',
            description: errorDescription,
            variant: 'destructive',
          });
          setIsLoading(false);
        }
      } else {
        const errorText = await response.text();
        console.error('Webhook error:', response.status, errorText);
        toast({
          title: 'Webhook Error',
          description: `Failed to fetch payment page. Status: ${response.status}. ${errorText}`,
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Network or other error:', error);
      toast({
        title: 'Request Error',
        description: 'An error occurred while contacting the webhook.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const timeSlots = [];
  for (let hour = 9; hour <= 20; hour++) {
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const amPm = hour >= 12 ? 'PM' : 'AM';
    timeSlots.push(`${formattedHour}:00 ${amPm}`);
    if (hour !== 20) {
      timeSlots.push(`${formattedHour}:30 ${amPm}`);
    }
  }

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {showConfirmation ? (
        <div className="max-w-3xl mx-auto">
          {/* Success Header with Animation */}
          <div className="text-center mb-10">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-6 shadow-lg animate-pulse">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
            <p className="text-xl text-gray-600">Thank you for booking your student session with us.</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Session booked for {formData.preferredDate} at {formData.preferredTime}
            </div>
          </div>

          {/* Main Content Cards */}
          <div className="space-y-8">
            {/* Payment Card */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Payment Successful</h3>
                <div className="ml-auto bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-green-700 font-medium text-sm">₹299 PAID</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-medium">{paymentOutcome?.order_id || bookingDetails?.order_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment ID</p>
                    <p className="font-medium">{paymentOutcome?.cf_payment_id || bookingDetails?.cf_payment_id}</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Session Type</p>
                    <p className="font-medium">Student Session</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Time</p>
                    <p className="font-medium">{paymentOutcome?.payment_time || bookingDetails?.payment_time ? new Date(paymentOutcome?.payment_time || bookingDetails?.payment_time).toLocaleString() : 'Just now'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details Card */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Your Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">College</p>
                    <p className="font-medium">{formData.college}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Course & Year</p>
                    <p className="font-medium">{formData.courseAndYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium">{formData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next Card */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">What's Next?</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-sm font-bold">1</span>
                  </div>
                  <p>We'll contact you within 24 hours to confirm your session details</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-sm font-bold">2</span>
                  </div>
                  <p>You'll receive a confirmation email with session link and guidelines</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-sm font-bold">3</span>
                  </div>
                  <p>Please keep your college ID ready for verification during the session</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-sm font-bold">4</span>
                  </div>
                  <p>If you need to reschedule, contact us at least 24 hours in advance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                // Reset all states to allow booking another session
                setShowConfirmation(false);
                setBookingDetails(null);
                setPaymentOutcome(null);
                setStoredCfOrderId('');
                setPaymentError(null);
                setFormStep(1);
                setFormData({
                  name: '',
                  gender: '',
                  email: '',
                  phone: '',
                  college: '',
                  courseAndYear: '',
                  location: '',
                  idCard: null,
                  preferredDate: '',
                  preferredTime: '',
                  sessionTypeId: null,
                  selectedSlotId: null,
                  bringsToSession: '',
                  hopesToGain: '',
                  specificTopics: '',
                  spokenToSomeone: '',
                  lookingFor: '',
                  anythingElse: '',
                  joinWhatsappChannel: '',
                });
                const fileInput = document.getElementById('idCard') as HTMLInputElement;
                if (fileInput) {
                  fileInput.value = '';
                }
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Book Another Session
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-serif font-medium text-gray-800 mb-4">Book Your Student Session</h3>

          <form onSubmit={handleSubmit}>
            {formStep === 1 && (
              <div className="space-y-4">
                <h4 className="font-medium text-[#3B82F6] mb-2">Personal Information</h4>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender / Pronouns <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID: (if any) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">10-digit number without spaces or dashes</p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-[#3B82F6] text-white py-2 px-4 rounded-md hover:bg-[#2563EB] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-4">
                <h4 className="font-medium text-[#3B82F6] mb-2">Student Information</h4>

                <div>
                  <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                    College/University Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="courseAndYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Course & Year: (e.g., BA Psychology, 2nd Year) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="courseAndYear"
                    name="courseAndYear"
                    value={formData.courseAndYear}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location (City & State) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                {/* ID Card Upload */}
                <div>
                  <label htmlFor="idCard" className="block text-sm font-medium text-gray-700 mb-1">
                    Attach your valid College ID: (a clear photo or scan) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="idCard"
                    name="idCard"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E0E7FF] file:text-[#3B82F6] hover:file:bg-[#C7D2FE]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF. Max size: 5MB.</p>
                </div>

                {/* Mandatory Notice */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-300 rounded-md text-sm text-blue-700">
                  <p className="font-semibold">Important Notice:</p>
                  <p>Uploading your ID card is mandatory to avail the student pass. This helps us prevent misuse and ensure genuine student participation. Your details will be kept safe and confidential. Your wellness and privacy are our utmost concern.</p>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#3B82F6] text-white py-2 px-4 rounded-md hover:bg-[#2563EB] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-4">
                <h4 className="font-medium text-[#3B82F6] mb-2">Session Details</h4>

                <div>
                  <label htmlFor="bringsToSession" className="block text-sm font-medium text-gray-700 mb-1">
                    What brings you to this session? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="bringsToSession"
                    name="bringsToSession"
                    value={formData.bringsToSession}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="hopesToGain" className="block text-sm font-medium text-gray-700 mb-1">
                    What are you hoping to gain or understand better through this session? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="hopesToGain"
                    name="hopesToGain"
                    value={formData.hopesToGain}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="specificTopics" className="block text-sm font-medium text-gray-700 mb-1">
                    Are there specific topics you’d like to explore? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="specificTopics"
                    name="specificTopics"
                    value={formData.specificTopics}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="spokenToSomeone" className="block text-sm font-medium text-gray-700 mb-1">
                    Have you spoken to anyone about this before? Please specify who? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="spokenToSomeone"
                    name="spokenToSomeone"
                    value={formData.spokenToSomeone}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-700 mb-1">
                    What are you truly looking for from this space? Please share in detail. <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="lookingFor"
                    name="lookingFor"
                    value={formData.lookingFor}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="anythingElse" className="block text-sm font-medium text-gray-700 mb-1">
                    Is there anything else you’d like me to know before we begin?
                  </label>
                  <textarea
                    id="anythingElse"
                    name="anythingElse"
                    value={formData.anythingElse}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                  />
                </div>

                <div className="space-y-6">
                  {/* Session Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Session Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sessionTypes.map((type) => (
                        <div 
                          key={type.id}
                          onClick={() => handleSessionTypeChange(type.id)}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedSessionType === type.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-blue-300'}`}
                        >
                          <h4 className="font-medium text-gray-900">{type.name}</h4>
                          {type.description && (
                            <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                          )}
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm text-gray-500">{type.duration} mins</span>
                            <span className="font-medium text-blue-600">₹{type.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Date <span className="text-red-500">*</span>
                    </label>
                    {isLoadingSlots ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="flex overflow-x-auto pb-2 space-x-2">
                        {getUniqueDates().map((date) => (
                          <div 
                            key={date}
                            onClick={() => handleDateSelection(date)}
                            className={`flex-shrink-0 p-3 border rounded-lg cursor-pointer transition-all ${selectedDate === date ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-200'}`}
                          >
                            <p className="text-sm font-medium">{formatDateForDisplay(date)}</p>
                            <p className="text-xs text-gray-500 mt-1">{format(parseISO(date), 'MMMM d, yyyy')}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                        <p className="text-gray-500">No available slots for this session type</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Time Slot Selection */}
                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Time <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {getSlotsByDate(selectedDate).map((slot) => (
                          <div
                            key={slot.id}
                            onClick={() => handleSlotSelection(slot)}
                            className={`p-3 border rounded-lg text-center cursor-pointer transition-all ${selectedSlot?.id === slot.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-300 hover:border-blue-200'}`}
                          >
                            <p className="text-sm font-medium">
                              {formatTimeForDisplay(slot.start_time)} - {formatTimeForDisplay(slot.end_time)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Hidden inputs to store the values */}
                  <input type="hidden" name="preferredDate" value={formData.preferredDate} />
                  <input type="hidden" name="preferredTime" value={formData.preferredTime} />
                  <input type="hidden" name="selectedSlotId" value={formData.selectedSlotId} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Would you like to join our Free WhatsApp channel for educational & informative purposes ( session updates, webinars, insights, etc.,) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="joinWhatsappChannel"
                        value="Yes"
                        checked={formData.joinWhatsappChannel === 'Yes'}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-[#3B82F6] border-gray-300 focus:ring-[#3B82F6]"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="joinWhatsappChannel"
                        value="No"
                        checked={formData.joinWhatsappChannel === 'No'}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-[#3B82F6] border-gray-300 focus:ring-[#3B82F6]"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isPollingStatus}
                    className="w-1/2 bg-[#3B82F6] text-white py-2 px-4 rounded-md hover:bg-[#2563EB] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing Payment...' : isPollingStatus ? 'Verifying Payment...' : 'Book Now for ₹299'}
                  </button>
                </div>

                {/* Payment Status Display */}
                {paymentOutcome && (
                  <div className="mt-6 p-4 border rounded-lg shadow-sm bg-green-50 border-green-200">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Payment Status</h3>
                    <p className="text-sm"><strong>Order ID:</strong> {paymentOutcome.order_id}</p>
                    <p className="text-sm"><strong>Status:</strong> <span className={`font-semibold ${paymentOutcome.payment_status === 'PAID' || paymentOutcome.payment_status === 'SUCCESS' ? 'text-green-600' : 'text-orange-600'}`}>{paymentOutcome.payment_status}</span></p>
                    <p className="text-sm"><strong>Cashfree Payment ID:</strong> {paymentOutcome.cf_payment_id}</p>
                    <p className="text-sm"><strong>Message:</strong> {paymentOutcome.payment_message || 'No specific message.'}</p>
                    <p className="text-sm"><strong>Amount:</strong> {paymentOutcome.order_amount} {paymentOutcome.order_currency}</p>
                    <p className="text-sm"><strong>Payment Time:</strong> {paymentOutcome.payment_time ? new Date(paymentOutcome.payment_time).toLocaleString() : 'Just now'}</p>
                    {isPollingStatus && (
                      <p className="mt-4 text-sm text-blue-600 animate-pulse">Verifying payment status, please wait...</p>
                    )}
                  </div>
                )}

                {paymentError && (
                  <div className="mt-4 p-4 border rounded-lg shadow-sm bg-red-50 border-red-200">
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Payment Error</h3>
                    <p className="text-sm text-red-600">{paymentError}</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentBookingForm;
