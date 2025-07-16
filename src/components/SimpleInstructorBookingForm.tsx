import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://crm-supabase.7za6uc.easypanel.host';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseKey) {
  console.error('Supabase configuration missing. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Interface for session types
interface SessionType {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  instructor_id?: number;
}

interface SessionPackage {
  id: number;
  session_type_id: number;
  name: string;
  description: string;
  sessions_count: number;
  price: number;
}

interface AvailableSlot {
  id: number;
  session_type_id: number;
  slot_date: string;
  start_time: string;
  end_time: string;
  status: string;
  booking_status: boolean;
}

interface Instructor {
  id: number;
  name: string;
  specialization: string;
}

// Declare global Cashfree types
interface CashfreeCheckoutOptions {
  paymentSessionId: string;
  redirectTarget: string;
}

interface CashfreeCheckout {
  checkout: (options: CashfreeCheckoutOptions) => Promise<unknown>;
}

// Define Cashfree SDK interface
interface CashfreeSDKInterface {
  (options: { mode: string }): CashfreeCheckout;
}

declare global {
  interface Window {
    // Use any type to avoid conflicts with different SDK versions
    Cashfree: any;
    fbq: (event: string, eventName: string, params?: { [key: string]: string | number | boolean; }) => void;
  }
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  selectedSessionType: number;
  selectedSlotId: number | null;
  preferredDate: string;
  preferredTime: string;
  instructor: number;
  isPackage: boolean;
  packageId: number | null;
  amount: number;
}

const SimpleInstructorBookingForm = ({ instructorId = 1, instructorName = "Mansi" }) => {
  // State variables
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    selectedSessionType: 0,
    selectedSlotId: null,
    preferredDate: '',
    preferredTime: '',
    instructor: instructorId,
    isPackage: false,
    packageId: null,
    amount: 0
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<AvailableSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [storedCfOrderId, setStoredCfOrderId] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  interface BookingDetails {
    id?: string;
    name: string;
    email: string;
    phone: string;
    instructor_id: number;
    session_type_id: number;
    session_type: string;
    preferred_date: string;
    start_time: string;
    end_time: string;
    slot_id: number | null;
    price: number;
    payment_status: string;
    cf_order_id: string;
    cf_payment_id: string | null;
    payment_timestamp: string;
    status: string;
  }

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  // Fetch session types
  useEffect(() => {
    fetchSessionTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Fetch session types from Supabase
  const fetchSessionTypes = async () => {
    try {
      // First try to fetch by ID 3 (Mansi's session type) as a fallback
      // This is for backward compatibility if instructor_id column doesn't exist yet
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('session_types')
        .select('*')
        .eq('id', 3);
        
      if (!fallbackError && fallbackData && fallbackData.length > 0) {
        // Use the fallback data if available
        setSessionTypes(fallbackData);
        const firstType = fallbackData[0];
        setFormData(prev => ({ 
          ...prev, 
          selectedSessionType: firstType.id,
          amount: firstType.price
        }));
        
        // Fetch packages for the first session type
        fetchSessionPackages(firstType.id);
        return;
      }
      
      // If the first approach failed, try to fetch all session types
      // This is useful if there's no specific filtering needed
      const { data, error } = await supabase
        .from('session_types')
        .select('*');
        
      if (error) throw error;
        
      if (data && data.length > 0) {
        // Filter for Mansi's session types (IDs 3, 4, 5) if available
        // This is a temporary solution until the database schema is updated
        const mansiSessionTypes = data.filter(type => [3, 4, 5].includes(type.id));
        
        if (mansiSessionTypes.length > 0) {
          setSessionTypes(mansiSessionTypes);
          const firstType = mansiSessionTypes[0];
          setFormData(prev => ({ 
            ...prev, 
            selectedSessionType: firstType.id,
            amount: firstType.price
          }));
          
          // Fetch packages for the first session type
          fetchSessionPackages(firstType.id);
        } else {
          // If no specific Mansi session types found, use the first available one
          setSessionTypes([data[0]]);
          setFormData(prev => ({ 
            ...prev, 
            selectedSessionType: data[0].id,
            amount: data[0].price
          }));
          
          // Fetch packages for this session type
          fetchSessionPackages(data[0].id);
        }
      } else {
        // No session types found at all
        toast({
          title: 'Notice',
          description: 'No session types found. Please add session types to the database.',
          variant: 'default',
        });
      }
    } catch (error) {
      console.error('Error fetching session types:', error);
      toast({
        title: 'Error',
        description: 'Failed to load session types. Please refresh the page.',
        variant: 'destructive',
      });
    }
  };

  // Fetch session packages
  const [sessionPackages, setSessionPackages] = useState<SessionPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  
  const fetchSessionPackages = async (sessionTypeId: number) => {
    try {
      const { data, error } = await supabase
        .from('session_packages')
        .select('*')
        .eq('session_type_id', sessionTypeId);
        
      if (error) {
        // Check if the error is because the table doesn't exist
        if (error.message && error.message.includes('relation "session_packages" does not exist')) {
          console.log('Session packages table does not exist yet');
          // Create hardcoded packages based on the session type
          // This is a temporary solution until the database schema is updated
          if (sessionTypeId === 3) { // Holistic Listening & Cathartic Healing
            setSessionPackages([{
              id: 1,
              session_type_id: 3,
              name: '3 Sessions Package',
              description: 'Package of 3 Holistic Listening sessions at a discounted rate',
              sessions_count: 3,
              price: 7500 // Instead of 3897 (1299 × 3)
            }]);
          } else if (sessionTypeId === 5) { // Emotional & Sexual Trauma Listening
            setSessionPackages([{
              id: 3,
              session_type_id: 5,
              name: '3 Sessions Package',
              description: 'Package of 3 Trauma Listening sessions at a discounted rate',
              sessions_count: 3,
              price: 7500 // Instead of 3897 (1299 × 3)
            }]);
          } else if (sessionTypeId === 4) { // Tarot Reading - no packages
            setSessionPackages([]);
          } else {
            setSessionPackages([]);
          }
        } else {
          console.error('Error fetching session packages:', error);
          setSessionPackages([]);
        }
      } else {
        setSessionPackages(data || []);
      }
      
      setSelectedPackage(null); // Reset package selection when session type changes
    } catch (error) {
      console.error('Error fetching session packages:', error);
      setSessionPackages([]);
    }
  };
  
  // Handle session type change
  const handleSessionTypeChange = (sessionTypeId: number) => {
    const selectedType = sessionTypes.find(type => type.id === sessionTypeId);
    if (!selectedType) return;
    
    setFormData(prev => ({
      ...prev,
      selectedSessionType: sessionTypeId,
      amount: selectedType.price,
      isPackage: false,
      packageId: null
    }));
    
    // Reset selected package
    setSelectedPackage(null);
    
    // Fetch packages for the selected session type
    fetchSessionPackages(sessionTypeId);
    
    // Reset selected date and time
    setSelectedDate('');
    setAvailableTimes([]);
  };
  
  // Handle package selection
  const handlePackageSelection = (packageId: number | null) => {
    setSelectedPackage(packageId);
    
    if (packageId === null) {
      // If no package selected, use the base session price
      const selectedType = sessionTypes.find(type => type.id === formData.selectedSessionType);
      if (selectedType) {
        setFormData(prev => ({
          ...prev,
          amount: selectedType.price,
          isPackage: false,
          packageId: null
        }));
      }
    } else {
      // If package selected, use the package price
      const selectedPkg = sessionPackages.find(pkg => pkg.id === packageId);
      if (selectedPkg) {
        setFormData(prev => ({
          ...prev,
          amount: selectedPkg.price,
          isPackage: true,
          packageId: selectedPkg.id
        }));
      }
    }
  };

  // Fetch session types
  useEffect(() => {
    const fetchSessionTypes = async () => {
      try {
        // Specifically fetch session type with ID 3 (Mansi)
        const { data, error } = await supabase
          .from('session_types')
          .select('*')
          .eq('id', 3);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setSessionTypes(data);
          setFormData(prev => ({ ...prev, selectedSessionType: 3 }));
        } else {
          // Fallback to fetch by instructor ID if session ID 3 is not found
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('session_types')
            .select('*')
            .eq('instructor_id', instructorId);
          
          if (fallbackError) throw fallbackError;
          
          if (fallbackData && fallbackData.length > 0) {
            setSessionTypes(fallbackData);
            setFormData(prev => ({ ...prev, selectedSessionType: fallbackData[0].id }));
          }
        }
      } catch (error) {
        console.error('Error fetching session types:', error);
        toast({
          title: 'Error',
          description: 'Failed to load session types. Please refresh the page.',
          variant: 'destructive',
        });
      }
    };

    fetchSessionTypes();
  }, [instructorId]);

  // Fetch available slots when session type changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!formData.selectedSessionType) return;
      
      try {
        // For debugging
        console.log('Fetching slots with session_type_id:', formData.selectedSessionType);
        
        // First try to fetch slots specifically for this session type
        const { data, error } = await supabase
          .from('available_slots')
          .select('*')
          .eq('session_type_id', formData.selectedSessionType)
          .eq('booking_status', false)
          .eq('status', 'available')
          .gte('slot_date', new Date().toISOString().split('T')[0]);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          console.log('Found slots:', data.length);
          setAvailableSlots(data);
          
          // Extract unique dates
          const uniqueDates = [...new Set(data.map(slot => slot.slot_date))].sort();
          setAvailableDates(uniqueDates);
          
          if (uniqueDates.length > 0) {
            setSelectedDate(uniqueDates[0]);
          }
        } else {
          // If no slots found for this specific session type, try fetching all available slots
          console.log('No slots found for session type, fetching all available slots');
          const { data: allData, error: allError } = await supabase
            .from('available_slots')
            .select('*')
            .eq('booking_status', false)
            .eq('status', 'available')
            .gte('slot_date', new Date().toISOString().split('T')[0]);
          
          if (allError) throw allError;
          
          if (allData && allData.length > 0) {
            console.log('Found general slots:', allData.length);
            setAvailableSlots(allData);
            
            // Extract unique dates
            const uniqueDates = [...new Set(allData.map(slot => slot.slot_date))].sort();
            setAvailableDates(uniqueDates);
            
            if (uniqueDates.length > 0) {
              setSelectedDate(uniqueDates[0]);
            }
          } else {
            // If still no slots, create some dummy slots for testing
            console.log('Creating dummy slots for testing');
            const today = new Date();
            const dummySlots = [];
            
            // Create 5 days of slots
            for (let i = 0; i < 5; i++) {
              const slotDate = new Date(today);
              slotDate.setDate(today.getDate() + i);
              const dateStr = slotDate.toISOString().split('T')[0];
              
              // Create 3 slots per day
              dummySlots.push({
                id: 1000 + i * 3 + 1,
                slot_date: dateStr,
                start_time: '10:00:00',
                end_time: '11:00:00',
                session_type_id: formData.selectedSessionType,
                instructor_id: instructorId,
                status: 'ACTIVE',
                booking_status: false
              });
              
              dummySlots.push({
                id: 1000 + i * 3 + 2,
                slot_date: dateStr,
                start_time: '14:00:00',
                end_time: '15:00:00',
                session_type_id: formData.selectedSessionType,
                instructor_id: instructorId,
                status: 'ACTIVE',
                booking_status: false
              });
              
              dummySlots.push({
                id: 1000 + i * 3 + 3,
                slot_date: dateStr,
                start_time: '18:00:00',
                end_time: '19:00:00',
                session_type_id: formData.selectedSessionType,
                instructor_id: instructorId,
                status: 'ACTIVE',
                booking_status: false
              });
            }
            
            setAvailableSlots(dummySlots);
            
            // Extract unique dates
            const uniqueDates = [...new Set(dummySlots.map(slot => slot.slot_date))].sort();
            setAvailableDates(uniqueDates);
            
            if (uniqueDates.length > 0) {
              setSelectedDate(uniqueDates[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
        toast({
          title: 'Error',
          description: 'Failed to load available slots. Please try again.',
          variant: 'destructive',
        });
      }
    };

    fetchAvailableSlots();
  }, [formData.selectedSessionType, instructorId]);

  // Update available times when selected date changes
  useEffect(() => {
    if (!selectedDate) return;
    
    // Filter slots for the selected date
    const slotsForDate = availableSlots.filter(slot => slot.slot_date === selectedDate);
    
    // Store the actual slot objects instead of just formatted strings
    setAvailableTimes(slotsForDate);
    
    // Reset selected time
    if (slotsForDate.length > 0) {
      const firstSlot = slotsForDate[0];
      const formattedTime = formatTimeSlot(firstSlot.start_time, firstSlot.end_time);
      
      setFormData(prev => ({
        ...prev,
        preferredDate: selectedDate,
        preferredTime: formattedTime,
        selectedSlotId: firstSlot.id
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        preferredDate: selectedDate,
        preferredTime: '',
        selectedSlotId: null
      }));
    }
  }, [selectedDate, availableSlots]);
  
  // Helper function to format time slots
  const formatTimeSlot = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return '';
    
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');
    
    if (!startHour || !startMinute || !endHour || !endMinute) return '';
    
    const startHours12 = parseInt(startHour) % 12 || 12;
    const endHours12 = parseInt(endHour) % 12 || 12;
    const startPeriod = parseInt(startHour) >= 12 ? 'PM' : 'AM';
    const endPeriod = parseInt(endHour) >= 12 ? 'PM' : 'AM';
    
    return `${startHours12}:${startMinute.padStart(2, '0')} ${startPeriod} - ${endHours12}:${endMinute.padStart(2, '0')} ${endPeriod}`;
  };

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      const today = new Date();
      
      if (isToday(date)) {
        return 'Today';
      } else if (isTomorrow(date)) {
        return 'Tomorrow';
      } else {
        return format(date, 'EEE, MMM d');
      }
    } catch (error) {
      return dateString;
    }
  };

  // Generate a unique order ID
  const generateOrderId = () => {
    return `INST_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  // Load Cashfree SDK
  const loadCashfreeSDK = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.Cashfree) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Cashfree SDK'));
      document.body.appendChild(script);
    });
  };

  // Poll for payment status
  const startPaymentStatusPolling = async (orderId: string) => {
    let attempts = 0;
    const maxAttempts = 5;
    const pollingInterval = 3000; // 3 seconds

    const checkPaymentStatus = async () => {
      if (attempts >= maxAttempts) {
        toast({
          title: 'Payment Verification Timeout',
          description: 'Please contact support with your order ID for assistance.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      attempts++;

      try {
        const webhookUrl = 'https://backend-n8n.7za6uc.easypanel.host/webhook/checkpayment';
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cf_order_id: orderId }),
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data && data.payment_status === 'PAID') {
            // Update slot status to booked ONLY after successful payment
            try {
              if (formData.selectedSlotId) {
                console.log('Updating slot booking status to TRUE for slot ID:', formData.selectedSlotId);
                await supabase
                  .from('available_slots')
                  .update({ booking_status: true })
                  .eq('id', formData.selectedSlotId);
              }
            } catch (error) {
              console.error('Error updating slot booking status:', error);
            }
            
            await handleSuccessfulPayment(data);
            setIsLoading(false);
            setShowConfirmation(true);
            return;
          } else if (data && data.payment_status === 'FAILED') {
            toast({
              title: 'Payment Failed',
              description: 'Your payment was not successful. Please try again.',
              variant: 'destructive',
            });
            setIsLoading(false);
            return;
          }
        }
        
        // If we're here, we need to check again
        setTimeout(checkPaymentStatus, pollingInterval);
      } catch (error) {
        console.error('Error checking payment status:', error);
        setTimeout(checkPaymentStatus, pollingInterval);
      }
    };

    checkPaymentStatus();
  };

  // Handle successful payment
  interface PaymentOutcome {
    payment_status: string;
    cf_payment_id: string | null;
    order_id?: string;
    transaction_status?: string;
    [key: string]: unknown; // For other possible fields
  }

  const handleSuccessfulPayment = async (paymentOutcome: PaymentOutcome) => {
    try {
      // Get the selected session type details
      const sessionType = sessionTypes.find(type => type.id === formData.selectedSessionType);
      
      if (!sessionType) {
        throw new Error('Selected session type not found');
      }

      // Get the selected slot details
      const selectedSlot = availableSlots.find(slot => slot.id === formData.selectedSlotId);
      
      if (!selectedSlot) {
        throw new Error('Selected slot not found');
      }

      // Insert booking into database
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            session_type_id: formData.selectedSessionType,
            slot_id: formData.selectedSlotId,
            booking_date: new Date().toISOString(),
            payment_id: paymentOutcome.cf_payment_id || '',
            payment_status: 'completed',
            amount: formData.amount,
            order_id: paymentOutcome.order_id || storedCfOrderId,
            instructor_id: instructorId,
            is_package: formData.isPackage,
            package_id: formData.packageId,
            sessions_remaining: formData.isPackage ? 
              sessionPackages.find(pkg => pkg.id === formData.packageId)?.sessions_count || 1 : 1,
            status: 'BOOKED'
          }
        ])
        .select();
      
      if (error) {
        console.error('Error inserting booking:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      // Note: Slot booking status is already updated after successful payment
      
      // Set booking details for confirmation page
      setBookingDetails(data?.[0] || bookingData);
      setShowConfirmation(true);
      
      // Track successful booking with Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'CompleteRegistration', {
          content_name: `${instructorName} Session Booking`,
          content_category: 'Instructor',
          value: sessionType.price,
          currency: 'INR'
        });
      }
      
      // Show success toast
      toast({
        title: "Booking confirmed successfully!",
        description: "Payment received. We'll contact you soon to confirm your session.",
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error handling successful payment:', error);
      toast({
        title: 'Error',
        description: 'There was a problem completing your booking. Please contact support.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.selectedSlotId) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields and select a session slot.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const order_id = generateOrderId();
    const customer_id = `${formData.name.replace(/\\s+/g, '_')}_${order_id}`;

    // Get the selected session type for price
    const sessionType = sessionTypes.find(type => type.id === formData.selectedSessionType);
    
    if (!sessionType) {
      toast({
        title: 'Error',
        description: 'Selected session type not found. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const payload = {
      order_amount: sessionType.price,
      order_id: order_id,
      customer_id: customer_id,
      customer_phone: formData.phone,
      customer_email: formData.email,
    };

    const webhookUrl = 'https://backend-n8n.7za6uc.easypanel.host/webhook/instructorpay';
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
          cfOrderIdFromWebhook = responseData.cf_order_id;
          setStoredCfOrderId(cfOrderIdFromWebhook || '');
        }

        if (typeof paymentSessionIdFromWebhook === 'string' && paymentSessionIdFromWebhook.trim() !== '') {
          const paymentSessionId = paymentSessionIdFromWebhook;
          try {
            await loadCashfreeSDK();
            if (window.Cashfree) {
              const cashfree = window.Cashfree({ mode: "production" });
              const checkoutOptions: CashfreeCheckoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: "_modal",
              };
              cashfree.checkout(checkoutOptions).then((result: unknown) => {
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
              console.error('Cashfree SDK not loaded properly');
              toast({
                title: 'Error',
                description: 'Payment gateway not available. Please try again later.',
                variant: 'destructive',
              });
              setIsLoading(false);
            }
          } catch (sdkError) {
            console.error('Error loading Cashfree SDK:', sdkError);
            toast({
              title: 'Error',
              description: 'Failed to load payment gateway. Please try again.',
              variant: 'destructive',
            });
            setIsLoading(false);
          }
        } else {
          console.error('Invalid or missing payment session ID');
          toast({
            title: 'Error',
            description: 'Invalid payment session. Please try again.',
            variant: 'destructive',
          });
          setIsLoading(false);
        }
      } else {
        console.error('Error response from webhook:', response.statusText);
        toast({
          title: 'Error',
          description: 'Failed to initialize payment. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in payment process:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // This function is now handled by the implementation above
  // The click handler version is used instead of the select element version

  // Handle date selection
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
  };

  // Handle time selection
  const handleTimeSelection = (slot: AvailableSlot) => {
    const formattedTime = formatTimeSlot(slot.start_time, slot.end_time);
    
    setFormData(prev => ({
      ...prev,
      preferredTime: formattedTime,
      selectedSlotId: slot.id
    }));
  };

  // Render confirmation screen
  if (showConfirmation && bookingDetails) {
    const sessionType = sessionTypes.find(type => type.id === formData.selectedSessionType);
    
    return (
      <div className="text-center p-6 bg-[#FFF5F8] rounded-lg">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Your session has been successfully booked.</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Booking Details</h3>
          <div className="text-left space-y-2 text-sm">
            <p><span className="font-medium">Session:</span> {sessionType?.name}</p>
            <p><span className="font-medium">Date:</span> {format(parseISO(formData.preferredDate), 'EEEE, MMMM d, yyyy')}</p>
            <p><span className="font-medium">Time:</span> {formData.preferredTime}</p>
            <p><span className="font-medium">Price:</span> ₹{sessionType?.price}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          We've sent a confirmation email to {formData.email} with all the details.
          Our team will contact you shortly to confirm your session.
        </p>
        
        <button
          onClick={() => window.location.href = '/sessions'}
          className="bg-[#FF5A84] text-white py-2 px-6 rounded-full hover:bg-[#FF7A9A] transition-colors"
        >
          Return to Sessions
        </button>
      </div>
    );
  }

  // Main form render
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Session Type Information */}
      {/* Session Type Selection */}
      {sessionTypes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Select Session Type</h3>
          <div className="space-y-4">
            {sessionTypes.map(sessionType => (
              <div 
                key={sessionType.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.selectedSessionType === sessionType.id ? 'border-[#FF5A84] bg-[#FFF5F8]' : 'border-gray-200 hover:border-pink-300'}`}
                onClick={() => handleSessionTypeChange(sessionType.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{sessionType.name}</h4>
                  <span className="font-medium text-[#FF5A84]">₹{sessionType.price}</span>
                </div>
                {sessionType.description && (
                  <p className="text-sm text-gray-600 mb-2">{sessionType.description}</p>
                )}
                <div className="text-sm text-gray-500">{sessionType.duration_minutes} minutes</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Package Selection */}
      {sessionPackages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Select Package (Optional)</h3>
          <div className="space-y-4">
            {/* Single session option */}
            <div 
              className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedPackage === null ? 'border-[#FF5A84] bg-[#FFF5F8]' : 'border-gray-200 hover:border-pink-300'}`}
              onClick={() => handlePackageSelection(null)}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Single Session</h4>
                <span className="font-medium text-[#FF5A84]">₹{sessionTypes.find(type => type.id === formData.selectedSessionType)?.price || 0}</span>
              </div>
              <p className="text-sm text-gray-600">Book a single session</p>
            </div>
            
            {/* Package options */}
            {sessionPackages.map(pkg => (
              <div 
                key={pkg.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedPackage === pkg.id ? 'border-[#FF5A84] bg-[#FFF5F8]' : 'border-gray-200 hover:border-pink-300'}`}
                onClick={() => handlePackageSelection(pkg.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                  <span className="font-medium text-[#FF5A84]">₹{pkg.price}</span>
                </div>
                {pkg.description && (
                  <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{pkg.sessions_count} sessions</span>
                  <span className="text-sm text-green-600 font-medium">
                    Save ₹{3603}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date *
        </label>
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {availableDates.length > 0 ? (
            availableDates.map(date => (
              <button
                key={date}
                type="button"
                onClick={() => handleDateSelection(date)}
                className={`flex-shrink-0 px-4 py-2 border rounded-md ${
                  selectedDate === date
                    ? 'bg-[#FF5A84] text-white border-[#FF5A84]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">{formatDateForDisplay(date)}</div>
                  <div className="text-xs">{format(parseISO(date), 'MMM d, yyyy')}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-gray-500 italic">No available dates for this session type</div>
          )}
        </div>
      </div>
      {/* Time Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Time *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableTimes.length > 0 ? (
            availableTimes.map(slot => {
              const formattedTime = formatTimeSlot(slot.start_time, slot.end_time);
              
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleTimeSelection(slot)}
                  className={`px-3 py-2 border rounded-md text-center ${
                    formData.selectedSlotId === slot.id
                      ? 'bg-[#FF5A84] text-white border-[#FF5A84]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {formattedTime}
                </button>
              );
            })
          ) : (
            <div className="text-gray-500 italic col-span-3">No available times for selected date</div>
          )}
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Your Information</h3>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FF5A84] focus:border-[#FF5A84]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FF5A84] focus:border-[#FF5A84]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FF5A84] focus:border-[#FF5A84]"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#FF5A84] text-white py-3 px-6 rounded-full font-medium hover:bg-[#FF7A9A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <>
              Book Now for ₹{formData.amount || '--'}
              {formData.isPackage && <span className="ml-2 text-xs">({sessionPackages.find(pkg => pkg.id === formData.packageId)?.sessions_count || 3} sessions)</span>}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SimpleInstructorBookingForm;
