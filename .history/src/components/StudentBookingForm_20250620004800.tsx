import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

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
  
  // Refs for polling control
  const pollingActiveRef = useRef(false);
  const pollingTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  
  // Payment constants
  const FINAL_PAYMENT_STATUSES = ['SUCCESS', 'FAILED', 'CANCELLED', 'PAID'];
  const MAX_POLLING_ATTEMPTS = 20;
  const POLLING_INTERVAL = 5000; // 5 seconds

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
      submissionData.append('sessionType', 'Student Special');
      submissionData.append('price', '₹299');
      submissionData.append('paymentStatus', 'PAID');
      submissionData.append('cfOrderId', storedCfOrderId);

      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/studenform', {
        method: 'POST',
        body: submissionData,
      });

      if (response.ok) {
        const bookingData = await response.json();
        setBookingDetails(bookingData);
        setShowConfirmation(true);
      } else {
        throw new Error('Failed to submit form after payment');
      }
    } catch (error) {
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
    if (!formData.preferredDate || !formData.preferredTime || !formData.bringsToSession || !formData.hopesToGain || !formData.specificTopics || !formData.spokenToSomeone || !formData.lookingFor || !formData.joinWhatsappChannel) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
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
              const cashfree = window.Cashfree({ mode: "sandbox" });
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
  const formattedToday = today.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  const formattedMaxDate = maxDate.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {showConfirmation ? (
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-medium text-gray-800 mb-4">Booking Confirmation</h3>
          <p className="text-lg font-medium text-gray-700 mb-2">Thank you for booking your session!</p>
          <p className="text-sm text-gray-600 mb-4">Below are the details of your booking:</p>
          <div className="bg-gray-50 p-4 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-600 mb-2"><strong>Session Type:</strong> Student Special</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Price:</strong> ₹299</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Payment Status:</strong> PAID</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Order ID:</strong> {bookingDetails.order_id}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Cashfree Payment ID:</strong> {bookingDetails.cf_payment_id}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Payment Time:</strong> {bookingDetails.payment_time}</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={formattedToday}
                      max={formattedMaxDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                      required
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
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
                    <p className="text-sm"><strong>Payment Time:</strong> {paymentOutcome.payment_time ? new Date(paymentOutcome.payment_time).toLocaleString() : 'N/A'}</p>
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
