import React, { useState, useRef, Suspense, lazy, useCallback, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Star, Heart, MessageCircle, Award, CheckCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';
import { createClient } from '@supabase/supabase-js';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery, useQueries, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://crm-supabase.7za6uc.easypanel.host';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize React Query client with caching configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Type definitions for our data
interface Instructor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  experience: string;
  profile_image_url: string;
  highlight_color: string;
  secondary_color: string;
  event_id?: string | null;
}

interface SessionType {
  id: number;
  instructor_id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number;
  is_first_session: boolean;
  is_external: boolean;
  external_url: string | null;
  button_lock: boolean;
}

interface InstructorHighlight {
  id: number;
  instructor_id: string;
  title: string;
  icon_name: string;
  icon_color: string;
  display_order: number;
}

interface InstructorSupportArea {
  id: number;
  instructor_id: string;
  category: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
}

interface InstructorOffering {
  id: number;
  instructor_id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
}

interface InstructorPageSection {
  id: number;
  instructor_id: string;
  section_type: string;
  title: string;
  subtitle: string | null;
  content: string;
  display_order: number;
}

interface InstructorTestimonial {
  id: number;
  instructor_id: string;
  client_name: string;
  client_description: string;
  content: string;
  rating: number;
}

interface AvailableSlot {
  id: number;
  slot_date: string;
  start_time: string;
  end_time: string;
  session_type_id: number;
  booking_status: boolean;
}

// External availability (DaySchedule) types
interface DayScheduleHour { time: string; available: number; users: number[] }
interface DayScheduleSlot { date: string; capacity: number; hours: DayScheduleHour[] }
interface DayScheduleAvailability { slots: DayScheduleSlot[]; time_zone?: string; duration?: number }

// Dynamic Icon component
const DynamicIcon = ({ name, size = 16, className = "" }: { name: string | null, size?: number, className?: string }) => {
  if (!name) return <LucideIcons.HelpCircle size={size} className={className} />;
  
  // Handle dynamic icon rendering in a type-safe way
  switch (name) {
    case 'Star': return <LucideIcons.Star size={size} className={className} />;
    case 'Heart': return <LucideIcons.Heart size={size} className={className} />;
    case 'MessageCircle': return <LucideIcons.MessageCircle size={size} className={className} />;
    case 'Lock': return <LucideIcons.Lock size={size} className={className} />;
    case 'Shield': return <LucideIcons.Shield size={size} className={className} />;
    case 'MessageSquare': return <LucideIcons.MessageSquare size={size} className={className} />;
    case 'Calendar': return <LucideIcons.Calendar size={size} className={className} />;
    case 'Zap': return <LucideIcons.Zap size={size} className={className} />;
    case 'Compass': return <LucideIcons.Compass size={size} className={className} />;
    case 'Users': return <LucideIcons.Users size={size} className={className} />;
    case 'Search': return <LucideIcons.Search size={size} className={className} />;
    case 'Sparkles': return <LucideIcons.Sparkles size={size} className={className} />;
    case 'Flame': return <LucideIcons.Flame size={size} className={className} />;
    case 'BookOpen': return <LucideIcons.BookOpen size={size} className={className} />;
    case 'PenTool': return <LucideIcons.PenTool size={size} className={className} />;
    case 'Clock': return <LucideIcons.Clock size={size} className={className} />;
    case 'CheckCircle': return <LucideIcons.CheckCircle size={size} className={className} />;
    case 'Award': return <LucideIcons.Award size={size} className={className} />;
    default: return <LucideIcons.HelpCircle size={size} className={className} />;
  }
};

// Main component wrapped with QueryClientProvider
const DynamicInstructorBookingWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicInstructorBookingContent />
    </QueryClientProvider>
  );
};

// The actual content component
const DynamicInstructorBookingContent = () => {
  const { instructorName: instructorNameFromUrl } = useParams<{ instructorName: string }>();
  
  // Modal and payment state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [selectedSessionType, setSelectedSessionType] = useState<SessionType | null>(null);
  const [paymentOutcome, setPaymentOutcome] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPollingStatus, setIsPollingStatus] = useState<boolean>(false);
  
  // Refs for polling control
  const pollingActiveRef = useRef<boolean>(false);
  const pollingTimeoutIdRef = useRef<number | null>(null);
  const pollingAttemptsRef = useRef<number>(0);

  // Payment constants
  const FINAL_PAYMENT_STATUSES = ['SUCCESS', 'FAILED', 'CANCELLED', 'PAID'];
  const MAX_POLLING_ATTEMPTS = 20;
  const POLLING_INTERVAL = 5000;

  // --- External availability preview (DaySchedule) ---
  const [loadingExtSlots, setLoadingExtSlots] = useState<boolean>(false);
  const [extSlotLabels, setExtSlotLabels] = useState<string[]>([]);
  const [extSlotError, setExtSlotError] = useState<string | null>(null);

  // Query for instructor details with prefetching
  const { data: instructor, isLoading: isLoadingInstructor, error: errorInstructor } = useQuery<Instructor | null>({
    queryKey: ['instructor', instructorNameFromUrl],
    queryFn: async () => {
      if (!instructorNameFromUrl) return null;
      // Decode the URL parameter in case it contains encoded characters like %20 for spaces
      const decodedInstructorName = decodeURIComponent(instructorNameFromUrl || '');
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .eq('name', decodedInstructorName)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!instructorNameFromUrl,
  });

  // Only fetch related data when instructor data is available
  const instructorId = instructor?.id;

  // Fetch public availability from DaySchedule using instructor.event_id (if present)
  useEffect(() => {
    const fetchExtAvailability = async () => {
      if (!instructor?.event_id) {
        // No external event configured
        return;
      }
      try {
        setLoadingExtSlots(true);
        setExtSlotError(null);

        const today = new Date();
        const end = new Date();
        end.setDate(today.getDate() + 14);
        const fmt = (d: Date) => d.toISOString().split('T')[0];
        const startStr = fmt(today);
        const endStr = fmt(end);

        const url = `https://api.dayschedule.com/v2/public/availability/${instructor.event_id}?start=${startStr}&end=${endStr}&time_zone=Asia%2FCalcutta`;
        console.debug('[Availability] Fetch:', url);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to load availability');
        const json: DayScheduleAvailability = await res.json();
        console.debug('[Availability] Slots payload size:', json?.slots?.length ?? 0);

        const times: string[] = (json?.slots || [])
          .flatMap((s: DayScheduleSlot) => (s.hours || []).map((h: DayScheduleHour) => h.time))
          .filter((t: string) => typeof t === 'string');
        times.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        const firstThree = times.slice(0, 3);

        // Use explicit Indian time zone (Asia/Kolkata) for consistent display
        const formatter = new Intl.DateTimeFormat('en-IN', {
          month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',
          timeZone: 'Asia/Kolkata'
        });
        const labels = firstThree.map(t => formatter.format(new Date(t)));
        setExtSlotLabels(labels);
        console.debug('[Availability] Labels:', labels);
      } catch (e) {
        console.error('[Availability] Error:', e);
        setExtSlotError('Unable to fetch availability');
      } finally {
        setLoadingExtSlots(false);
      }
    };

    fetchExtAvailability();
  }, [instructor?.event_id]);
  
  // Parallel data fetching for all related data
  const queries = useQueries({
    queries: [
      // Session Types
      {
        queryKey: ['sessionTypes', instructorId],
        queryFn: async () => {
          if (!instructorId) return [];
          const { data, error } = await supabase
            .from('session_types')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('is_first_session', { ascending: false });
          
          if (error) throw error;
          return data as SessionType[];
        },
        enabled: !!instructorId,
      },
      // Highlights
      {
        queryKey: ['highlights', instructorId],
        queryFn: async () => {
          if (!instructorId) return [];
          const { data, error } = await supabase
            .from('instructor_highlights')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('display_order');
          
          if (error) throw error;
          return data as InstructorHighlight[];
        },
        enabled: !!instructorId,
      },
      // Support Areas
      {
        queryKey: ['supportAreas', instructorId],
        queryFn: async () => {
          if (!instructorId) return [];
          const { data, error } = await supabase
            .from('instructor_support_areas')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('display_order');
          
          if (error) throw error;
          return data as InstructorSupportArea[];
        },
        enabled: !!instructorId,
      },
      // Offerings
      {
        queryKey: ['offerings', instructorId],
        queryFn: async () => {
          if (!instructorId) return [];
          const { data, error } = await supabase
            .from('instructor_offerings')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('display_order');
          
          if (error) throw error;
          return data as InstructorOffering[];
        },
        enabled: !!instructorId,
      },
      // Page Sections
      {
        queryKey: ['pageSections', instructorId],
        queryFn: async () => {
          if (!instructorId) return [];
          const { data, error } = await supabase
            .from('instructor_page_sections')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('display_order');
          
          if (error) throw error;
          return data as InstructorPageSection[];
        },
        enabled: !!instructorId,
      },
      // Testimonials
      {
        queryKey: ['testimonials', instructorId],
        queryFn: async () => {
          if (!instructorId) return [];
          const { data, error } = await supabase
            .from('instructor_testimonials')
            .select('*')
            .eq('instructor_id', instructorId);
          
          if (error) throw error;
          return data as InstructorTestimonial[];
        },
        enabled: !!instructorId,
      },
    ],
  });
  
  // Extract data from queries using useMemo to prevent dependency issues
  const sessionTypes = useMemo(() => queries[0].data as SessionType[] || [], [queries[0].data]);
  const highlights = useMemo(() => queries[1].data as InstructorHighlight[] || [], [queries[1].data]);
  const supportAreas = useMemo(() => queries[2].data as InstructorSupportArea[] || [], [queries[2].data]);
  const offerings = useMemo(() => queries[3].data as InstructorOffering[] || [], [queries[3].data]);
  const pageSections = useMemo(() => queries[4].data as InstructorPageSection[] || [], [queries[4].data]);
  const testimonials = useMemo(() => queries[5].data as InstructorTestimonial[] || [], [queries[5].data]);
  
  // Fetch available slots only after session types are loaded
  const { data: availableSlots = [], isLoading: isLoadingSlots } = useQuery({
    queryKey: ['availableSlots', sessionTypes.map(st => st.id)],
    queryFn: async () => {
      if (!sessionTypes.length) return [];
      
      const { data, error } = await supabase
        .from('available_slots')
        .select('*')
        .in('session_type_id', sessionTypes.map(st => st.id))
        .eq('booking_status', false)
        .gte('slot_date', new Date().toISOString().split('T')[0])
        .order('slot_date').order('start_time');
      
      if (error) throw error;
      return data as AvailableSlot[];
    },
    enabled: sessionTypes.length > 0,
    staleTime: 60 * 1000, // Cache for 1 minute (shorter time as availability changes frequently)
  });
  
  // Determine loading state
  const isLoading = isLoadingInstructor || queries.some(query => query.isLoading) || isLoadingSlots;

  // Helper function to get a specific section by type - memoized
  const getSection = useCallback((sectionType: string) => {
    return pageSections.find(section => section.section_type === sectionType);
  }, [pageSections]);

  // Helper function to filter support areas by category - memoized for performance
  const supportAreasByCategory = useMemo(() => {
    const categories: Record<string, InstructorSupportArea[]> = {};
    
    supportAreas.forEach(area => {
      const category = area.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(area);
    });
    
    return categories;
  }, [supportAreas]);
  
  // Get first session and follow-up session - memoized
  const firstSession = useMemo(() => 
    sessionTypes.find(session => session.is_first_session),
  [sessionTypes]);
  
  const followUpSession = useMemo(() => 
    sessionTypes.find(session => !session.is_first_session),
  [sessionTypes]);
  
  // Set the default selected session type to firstSession when it loads
  useEffect(() => {
    if (firstSession) {
      setSelectedSessionType(firstSession);
    }
  }, [firstSession]);
  
  // Function to handle booking button clicks
  const handleBookNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!firstSession || firstSession.button_lock) return;

    setSelectedSessionType(firstSession);

    if (firstSession.is_external && firstSession.external_url) {
      window.open(firstSession.external_url, '_blank', 'noopener,noreferrer');
      return;
    }

    openBookingModal();
  };
  
  // Theme colors - memoized
  const highlightColor = useMemo(() => 
    instructor?.highlight_color || '#FF5A84',
  [instructor]);
  
  const secondaryColor = useMemo(() => 
    instructor?.secondary_color || '#853f92',
  [instructor]);

  // Function to format date - memoized for better performance
  const formatDate = useCallback((dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }, []);

  // Function to format time - memoized for better performance
  const formatTime = useCallback((timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }, []);

  // --- PAYMENT LOGIC ---
  const loadCashfreeSDK = async () => {
    return new Promise((resolve) => {
      if (window.Cashfree) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const generateOrderId = async (slotId: number, amount: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/webhook/studentpay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, slot_id: slotId }), // Send slot_id to backend
      });
      if (!response.ok) throw new Error('Failed to create payment session');
      const data = await response.json();
      return data.payment_session_id;
    } catch (error) {
      console.error('Order ID generation failed:', error);
      setPaymentError('Could not initiate payment. Please try again.');
      return null;
    }
  };

  const pollForPaymentStatus = async (orderId: string, attempt = 1) => {
    if (!pollingActiveRef.current) return;
    if (attempt > MAX_POLLING_ATTEMPTS) {
      setPaymentOutcome('FAILED');
      setPaymentError('Payment status check timed out. Please contact support.');
      setIsPollingStatus(false);
      pollingActiveRef.current = false;
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/webhook/verify?order_id=${orderId}`);
      const data = await response.json();

      if (data.payment_status && FINAL_PAYMENT_STATUSES.includes(data.payment_status)) {
        setPaymentOutcome(data.payment_status);
        if (data.payment_status !== 'SUCCESS') {
          setPaymentError('Payment was not successful. Please try again or contact support.');
        }
        setIsPollingStatus(false);
        pollingActiveRef.current = false;
        
        // If payment is successful:
        if (data.payment_status === 'SUCCESS') {
          // 1. Update UI by removing the booked slot
          const newSlots = availableSlots.filter(s => s.id !== selectedSlot?.id);
          // 2. IMPORTANT: The actual database update happens on the backend!
          // The backend webhook should execute this SQL when it verifies the payment:
          // UPDATE available_slots SET booking_status = TRUE WHERE id = [the_booked_slot_id];
          // This is NOT done in the frontend for security reasons.
        }
      } else {
        pollingTimeoutIdRef.current = setTimeout(() => pollForPaymentStatus(orderId, attempt + 1), POLLING_INTERVAL);
      }
    } catch (error) {
      console.error('Polling error:', error);
      pollingTimeoutIdRef.current = setTimeout(() => pollForPaymentStatus(orderId, attempt + 1), POLLING_INTERVAL);
    }
  };

  const startPaymentStatusPolling = (orderId: string) => {
    if (pollingActiveRef.current) return;
    pollingActiveRef.current = true;
    setIsPollingStatus(true);
    setPaymentOutcome(null);
    setPaymentError(null);
    pollForPaymentStatus(orderId);
  };

  const handleBookNow = async () => {
    if (!selectedSlot || !selectedSessionType) return;
    
    // Check if this is an external session type
    if (selectedSessionType.is_external && selectedSessionType.external_url) {
      window.open(selectedSessionType.external_url, '_blank', 'noopener,noreferrer');
      closeBookingModal();
      return;
    }

    setPaymentError(null);
    setPaymentOutcome(null);

    const sdkLoaded = await loadCashfreeSDK();
    if (!sdkLoaded) {
      setPaymentError('Failed to load payment SDK. Please check your connection.');
      return;
    }

    const paymentSessionId = await generateOrderId(selectedSlot.id, selectedSessionType.price);
    if (!paymentSessionId) {
      return;
    }

    const cashfree = new window.Cashfree(paymentSessionId);

    cashfree.checkout({
      paymentStyle: 'modal',
      onComplete: (data: any) => {
        if (data.order && data.order.status === 'PAID') {
          startPaymentStatusPolling(data.order.orderId);
        } else {
          setPaymentOutcome('FAILED');
          setPaymentError('Payment process was not completed.');
        }
      },
      onError: (error: any) => {
        console.error('Cashfree error:', error);
        setPaymentOutcome('FAILED');
        setPaymentError(error.message || 'An unknown payment error occurred.');
      },
    });
  };

  // Function to open booking modal with improved performance
  const openBookingModal = useCallback((slot?: AvailableSlot) => {
    if (!slot) {
      if (availableSlots.length > 0) {
        const firstSlot = availableSlots[0];
        const firstSessionType = sessionTypes.find(st => st.id === firstSlot.session_type_id);
        if (firstSessionType) {
          setSelectedSlot(firstSlot);
          setSelectedSessionType(firstSessionType);
          setPaymentOutcome(null);
          setPaymentError(null);
          setIsModalOpen(true);
          return;
        }
      }
      setIsModalOpen(true);
      return;
    }
    const sessionType = sessionTypes.find(st => st.id === slot.session_type_id);
    if (sessionType) {
      setSelectedSlot(slot);
      setSelectedSessionType(sessionType);
      setPaymentOutcome(null);
      setPaymentError(null);
      setIsModalOpen(true);
    }
  }, [availableSlots, sessionTypes]);

  const closeBookingModal = () => {
    setIsModalOpen(false);
    pollingActiveRef.current = false;
    if (pollingTimeoutIdRef.current) {
      clearTimeout(pollingTimeoutIdRef.current);
    }
  };
  
  // Lock state is now controlled directly from the database via the button_lock column


  // Show skeleton loading state
  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        {/* Header skeleton */}
        <div className="max-w-6xl mx-auto">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="w-48 h-48 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="w-full h-20 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="w-40 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="w-full h-32 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <Link to="/sessions" className="inline-flex items-center text-[#FF5A84] hover:text-[#FF7A9A] mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Sessions
        </Link>
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8 border border-gray-200">
          {/* Hero Banner with Author Image */}
          <div className="relative bg-slate-50 py-12 px-6 md:px-10">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('/images/pattern-dots.png')] bg-repeat"></div>
            <div className="flex flex-col md:flex-row items-center relative z-10">
              {/* Author Image */}
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="relative">
                  <img 
                    src={instructor?.profile_image_url || `/images/${instructor?.name?.toLowerCase()}-profile.jpg`} 
                    alt={`${instructor?.name} - Holistic Listener`} 
                    className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/200x200/FFE5EC/FF5A84?text=${instructor?.name?.charAt(0)}&font=playfair`;
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#FF5A84] text-white rounded-full p-2">
                    <Award size={20} />
                  </div>
                </div>
              </div>
              
              {/* Intro Text */}
              <div className="md:w-2/3 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-3">
                  Book a Session with {instructor?.name}
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                  {getSection('intro')?.content || instructor?.bio || 'A safe, non-judgmental space where you can feel heard, witnessed, and truly understood.'}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm mb-4">
                  {highlights.map(highlight => (
                    <div key={highlight.id} className="flex items-center">
                      <Heart size={16} className="text-rose-500 mr-2" fill="currentColor" />
                      <span>{highlight.title}</span>
                    </div>
                  ))}
                </div>
                {/* Next slots (external availability) */}
                <div className="mb-2">
                  {!instructor?.event_id && (
                    <p className="text-xs text-gray-500">Live availability will appear here once configured.</p>
                  )}
                  {instructor?.event_id && (
                    <div className="rounded-lg border border-rose-100 bg-rose-50/40 p-3">
                      {loadingExtSlots && (
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulse"></span>
                          <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulse [animation-delay:150ms]"></span>
                          <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulse [animation-delay:300ms]"></span>
                        </div>
                      )}
                      {!loadingExtSlots && extSlotError && (
                        <p className="text-xs text-red-500">{extSlotError}</p>
                      )}
                      {!loadingExtSlots && !extSlotError && extSlotLabels.length === 0 && (
                        <p className="text-xs text-gray-500">No upcoming slots in 2 weeks</p>
                      )}
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-4 bg-rose-500 hover:bg-rose-600" 
                  onClick={handleBookNowClick}
                >
                  {firstSession?.is_external ? (
                    <>
                      <ArrowLeft size={18} className="mr-2" />
                      Book Now
                    </>
                  ) : (
                    <>
                      <BookOpen size={18} className="mr-2" />
                      Book Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-6 md:p-8">
            {/* Session Details */}
            <div className="mb-12">
              <div className="flex items-center mb-5">
                <div className="bg-[#FF5A84] p-2 rounded-lg mr-3">
                  <Clock size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-[#853f92]">
                  {getSection('Session Details')?.title || 'Session Details'}
                </h2>
              </div>
              
              <div className="bg-white p-5 rounded-lg mb-6 border border-[#FFE5EC] shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  {getSection('session_details')?.content || 'During our sessions, I create a container for you to explore your inner landscape with curiosity rather than judgment.'}
                </p>
              </div>
              
              {firstSession && (
                <div className="mt-6 bg-purple-50 p-5 rounded-lg border-l-4 border-purple-700 shadow-sm">
                  <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-medium text-gray-800 mb-1">{firstSession.name}</h3>
                      <p className="text-gray-600 text-sm">{firstSession.description || `${firstSession.duration_minutes} minutes of dedicated space`}</p>
                      <div className="text-2xl font-serif font-bold text-rose-500 mt-1">₹{firstSession.price}</div>
                      {firstSession.is_external && (
                        <div className="mt-1 inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          <span className="mr-1">•</span> External Session
                        </div>
                      )}
                    </div>
                    <button
                      disabled={firstSession?.button_lock}
                      onClick={handleBookNowClick}
                      className={`${firstSession?.button_lock ? 'bg-gray-500 cursor-not-allowed opacity-70' : 'bg-purple-700 hover:bg-purple-800'} text-white py-2 px-6 rounded-full font-medium transition-colors inline-flex items-center shadow-sm w-full md:w-auto justify-center md:justify-start`}
                    >
                      {firstSession.is_external ? (
                        <>
                          <ArrowLeft size={18} className="mr-2" />
                          Book Now
                        </>
                      ) : (
                        <>
                          <Calendar size={18} className="mr-2" />
                          Book First Session
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {followUpSession && (
                <>
                  <div className="my-4 border-t border-gray-200"></div>
                  <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-medium text-gray-800 mb-1">{followUpSession.name}</h3>
                      <p className="text-gray-600 text-sm">{followUpSession.description || `${followUpSession.duration_minutes} minutes of continued support`}</p>
                      <div className="text-2xl font-serif font-bold text-rose-500 mt-1">₹{followUpSession.price}</div>
                      {followUpSession.is_external && (
                        <div className="mt-1 inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          <span className="mr-1">•</span> External Session
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center w-full md:w-auto">
                      {followUpSession.is_external ? (
                        <button
                          disabled={followUpSession?.button_lock}
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => { 
                            e.preventDefault(); 
                            if (!followUpSession?.button_lock && followUpSession.is_external && followUpSession.external_url) {
                              window.open(followUpSession.external_url, '_blank');
                            } else if (!followUpSession?.button_lock) {
                              // Set the selected session type to follow-up session before opening modal
                              setSelectedSessionType(followUpSession);
                              openBookingModal();
                            }
                          }}
                          className={`${followUpSession?.button_lock ? 'bg-gray-500 cursor-not-allowed opacity-70' : 'bg-purple-700 hover:bg-purple-800'} text-white py-2 px-6 rounded-full font-medium transition-colors inline-flex items-center shadow-sm w-full md:w-auto justify-center`}
                        >
                          <ArrowLeft size={18} className="mr-2" />
                          Book Now
                        </button>
                      ) : (
                        <>
                          <button
                            disabled={followUpSession?.button_lock}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                              e.preventDefault();
                              if (!followUpSession?.button_lock) {
                                // Set the selected session type to follow-up session before opening modal
                                setSelectedSessionType(followUpSession);
                                openBookingModal();
                              }
                            }}
                            className={`${followUpSession?.button_lock ? 'bg-gray-500 cursor-not-allowed opacity-70' : 'bg-purple-700 hover:bg-purple-800'} text-white py-2 px-6 rounded-full font-medium inline-flex items-center transition-colors shadow-sm w-full md:w-auto justify-center`}
                          >
                            <Calendar size={18} className="mr-2" />
                            Book Follow-Up
                          </button>
                          {followUpSession?.button_lock && (
                            <span className="text-xs text-gray-700 mt-2 italic font-medium">Enabled after first session</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Support Areas - Sexual Wellness */}
            {supportAreasByCategory['Sexual Wellness'] && (
              <div className="bg-white p-6 rounded-xl mb-8 shadow-sm border border-[#FFE5EC]">
                <div className="flex items-center mb-5">
                  <div className="bg-[#FF5A84] p-2 rounded-lg mr-3">
                    <Heart size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-[#853f92]">
                    {getSection('sexual_wellness')?.title || 'Sexual Wellness Support'}
                  </h2>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {getSection('sexual_wellness')?.content || 'As a trained sexual wellness coach, I provide a safe space to explore challenges around intimacy, desire, and pleasure.'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {supportAreasByCategory['Sexual Wellness'].map(area => (
                    <div key={area.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <DynamicIcon name={area.icon_name} className="text-rose-500 mr-2" size={16} />
                        <h3 className="font-medium text-gray-800">{area.title}</h3>
                      </div>
                      <p className="text-gray-700 text-sm">{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Support Areas - Holistic Support */}
            {supportAreasByCategory['Holistic Support'] && (
              <div className="bg-white p-6 rounded-xl mb-8 shadow-sm border border-[#FFE5EC]">
                <div className="flex items-center mb-5">
                  <div className="bg-purple-700 p-2 rounded-lg mr-3">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-[#853f92]">
                    {getSection('holistic_support')?.title || 'Non-Sexual Holistic Support'}
                  </h2>
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute left-0 top-0 h-full w-1 bg-purple-700"></div>
                  <p className="pl-6 text-gray-700 italic">
                    {getSection('holistic_support')?.content || 'Other areas where I can hold space for your journey:'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {supportAreasByCategory['Holistic Support']?.map(area => (
                    <div key={area.id} className="flex bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="bg-purple-700 p-2 rounded-full h-min mr-3">
                        <DynamicIcon name={area.icon_name} className="text-white" size={16} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">{area.title}</h3>
                        <p className="text-gray-700 text-sm">{area.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Post-Session Offerings */}
            {offerings.length > 0 && (
              <div className="bg-white p-6 rounded-xl mb-8 shadow-sm border border-[#FFE5EC]">
                <div className="flex items-center mb-5">
                  <div className="bg-[#FF5A84] p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-[#853f92]">
                    {getSection('post_session')?.title || 'What You\'ll Receive Post-Session'}
                  </h2>
                </div>
                
                <div className="bg-rose-50 p-5 rounded-lg mb-6 border-l-4 border-rose-500 shadow-sm">
                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                    {getSection('post_session')?.content || 'Each session is more than a conversation—it\'s an energetic exchange. Based on our time together, you may receive:'}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {offerings.map(offering => (
                      <div key={offering.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="bg-rose-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <DynamicIcon name={offering.icon_name} className="text-rose-500" size={20} />
                        </div>
                        <h3 className="font-medium text-gray-800 mb-2">{offering.title}</h3>
                        <p className="text-gray-600 text-sm">{offering.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-700 italic text-lg">"This is soul work, and no two sessions are the same."</p>
                </div>
              </div>
            )}
            
            {/* CTA Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="bg-purple-50 p-6 rounded-xl mb-8 text-center border-2 border-purple-700 shadow-lg">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-rose-500 p-3 rounded-full">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-purple-800 ml-3">
                    {getSection('closing')?.title || 'Ready to Begin Your Journey?'}
                  </h2>
                </div>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  {getSection('closing')?.content || `Take the first step toward healing and self-discovery. Book a session with ${instructor?.name} and experience a safe space where you can explore, express, and embrace your authentic self.`}
                </p>
                <button
                  onClick={handleBookNowClick}
                  className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-8 rounded-full font-medium transition-colors inline-flex items-center text-lg mx-auto shadow-md"
                >
                  {firstSession?.is_external ? (
                    <>
                      <ArrowLeft size={20} className="mr-2" />
                      Book Now
                    </>
                  ) : (
                    <>
                      <Calendar size={20} className="mr-2" />
                      Book Your Session Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-rose-100 rounded-full opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 -mb-16 -ml-16 bg-rose-100 rounded-full opacity-30"></div>
          
          <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
            <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm mb-2">
              <p className="text-rose-500 font-serif text-xl font-medium">"Come as you are—there is no fixing, only feeling."</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-2">
                  <Heart size={18} className="text-rose-500 mr-2" />
                  <h3 className="font-medium text-gray-800">Inclusive Space</h3>
                </div>
                <p className="text-gray-700 text-sm">A safe space for women, men, LGBTQIA+, and anyone navigating emotional or sexual healing.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-2">
                  <Star size={18} className="text-rose-500 mr-2" />
                  <h3 className="font-medium text-gray-800">Wisdom-Based</h3>
                </div>
                <p className="text-gray-700 text-sm">Rooted in feminine wisdom, energetic sensitivity & real-world compassion.</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-700 text-lg mb-3 font-medium relative z-10">
                {getSection('footer')?.title || "Come as you are—there is no fixing, only feeling."}
              </p>
              <p className="text-gray-600 relative z-10">
                {getSection('footer')?.content || "No diagnosis. No pressure. Just presence. A bridge between what you feel and what you haven't yet dared to speak—whether you're a man holding back tears, a woman silenced by shame, or anyone seeking wholeness."}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal for booking */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={closeBookingModal} 
        instructorId={1} 
        instructorName={instructor?.name} 
      />
    </div>
  );
};

export default DynamicInstructorBookingWrapper;
