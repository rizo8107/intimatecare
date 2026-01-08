import React, { useState, useRef, Suspense, lazy, useCallback, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Star, Heart, MessageCircle, Award, CheckCircle, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
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
  });

  // Only fetch related data when instructor data is available
  const instructorId = instructor?.id;

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
        pollingTimeoutIdRef.current = window.setTimeout(() => pollForPaymentStatus(orderId, attempt + 1), POLLING_INTERVAL);
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
    console.log('Opening booking modal...', { slot, availableSlotsCount: availableSlots.length });

    // Always open the modal first to ensure responsiveness
    setIsModalOpen(true);
    setPaymentOutcome(null);
    setPaymentError(null);

    if (slot) {
      const sessionType = sessionTypes.find(st => st.id === slot.session_type_id);
      if (sessionType) {
        setSelectedSlot(slot);
        setSelectedSessionType(sessionType);
      }
    } else if (availableSlots.length > 0) {
      // If no slot provided, try to pre-select the first available one
      const firstSlot = availableSlots[0];
      const firstSessionType = sessionTypes.find(st => st.id === firstSlot.session_type_id);
      if (firstSessionType) {
        setSelectedSlot(firstSlot);
        setSelectedSessionType(firstSessionType);
      }
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
      <div className="min-h-screen p-6 bg-[#FFF7EC]">
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
    <div className="min-h-screen pt-12">
      {/* Premium Background Elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/3 rounded-full blur-[100px] -z-10" />

      {/* Navigation & Header */}
      <div className="container-custom max-w-6xl relative z-20 mb-8">
        <Link to="/instructors" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-all font-bold text-sm group">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to Expert Coaches
        </Link>
      </div>

      <section className="pb-24">
        <div className="container-custom max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Box: Sticky Profile Section */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white rounded-[2rem] p-5 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-0" />

                {/* Profile Image & Badges */}
                <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] mb-6 bg-slate-50 shadow-inner z-10">
                  <img
                    src={instructor?.profile_image_url || `/images/${instructor?.name?.toLowerCase()}-profile.jpg`}
                    alt={instructor?.name}
                    className="w-full h-full object-cover transition-transform duration-1000"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/500x625/F8FAFC/FF5A84?text=${instructor?.name?.charAt(0)}&font=playfair`;
                    }}
                  />

                  {/* Glass Header Info */}
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[2px]">
                    <h1 className="text-2xl font-black text-white tracking-tighter mb-0.5 leading-none">{instructor?.name}</h1>
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest leading-none">{instructor?.specialization}</p>
                  </div>

                  {/* Rating Bubble */}
                  <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-white/40 shadow-xl">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[9px] font-black text-slate-900">5.0 (480+)</span>
                  </div>
                </div>

                {/* Trust Signals Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6 relative z-10">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-tight">100% Private</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-1.5">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-tight">{instructor?.experience || 'Certified'}</span>
                  </div>
                </div>

                {/* Primary Booking Feature */}
                {firstSession && (
                  <div className="space-y-4 relative z-10">
                    <button
                      disabled={firstSession?.button_lock}
                      onClick={handleBookNowClick}
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/20 ${firstSession?.button_lock
                        ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/95 hover:shadow-primary/30 active:scale-[0.98]'
                        }`}
                    >
                      <Calendar className="w-4 h-4" />
                      Book Private Session
                    </button>
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Session starts at ₹{firstSession.price} • {firstSession.duration_minutes} Minutes
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Box: Detailed Content Sections */}
            <div className="lg:col-span-8 space-y-6">

              {/* About & Philosophy */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/2 rounded-full blur-3xl -z-0" />
                <h2 className="text-2xl font-black text-slate-950 mb-4 tracking-tighter relative z-10">
                  About {instructor?.name}
                </h2>
                <p className="text-base text-slate-500 font-medium leading-relaxed relative z-10">
                  {getSection('intro')?.content || instructor?.bio || 'Dedicated to creating a safe, non-judgmental space for your journey.'}
                </p>

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mt-8 relative z-10">
                    {highlights.map(highlight => (
                      <div key={highlight.id} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 transition-colors hover:bg-primary/5 hover:text-primary group">
                        <DynamicIcon name={highlight.icon_name} className="text-primary group-hover:scale-110 transition-transform" size={14} />
                        <span className="text-xs font-bold tracking-tight">{highlight.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sessions Grid */}
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-950 tracking-tighter px-4 leading-none">Choose Your Session</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {sessionTypes.map((session) => (
                    <div
                      key={session.id}
                      className={`relative bg-white rounded-3xl p-6 border hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col group ${session.is_first_session ? 'border-primary/20 shadow-lg shadow-primary/5' : 'border-slate-100 shadow-sm'
                        }`}
                    >
                      {session.is_first_session && (
                        <div className="absolute top-0 right-0 bg-primary/95 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl backdrop-blur-sm">
                          Highly Recommended
                        </div>
                      )}

                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                        {session.is_first_session ? <Star size={20} /> : <BookOpen size={20} />}
                      </div>

                      <h3 className="text-xl font-black text-slate-950 mb-1.5 tracking-tight leading-none">{session.name}</h3>
                      <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6 flex-grow">
                        {session.description || `${session.duration_minutes} minutes of dedicated personalized guidance and support.`}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Investment</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-slate-950 leading-none tracking-tighter">₹{session.price}</span>
                            <span className="text-[10px] font-bold text-slate-400">/ {session.duration_minutes}m</span>
                          </div>
                        </div>
                        <button
                          disabled={session?.button_lock}
                          onClick={() => {
                            if (!session?.button_lock) {
                              if (session.is_external && session.external_url) {
                                window.open(session.external_url, '_blank');
                              } else {
                                setSelectedSessionType(session);
                                openBookingModal();
                              }
                            }
                          }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${session?.button_lock
                            ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-200'
                            : 'bg-slate-950 text-white hover:bg-primary hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1'
                            }`}
                        >
                          {session.button_lock ? <LucideIcons.Lock size={18} /> : <Calendar size={18} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Areas - Dark Mode Contrast */}
              <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />

                <div className="relative z-10 mb-8 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest mb-3">
                    What We Will Resolve Together
                  </div>
                  <h2 className="text-3xl md:text-3xl font-black text-white mb-3 tracking-tighter leading-tight">My Promise: Resolving Your Concerns</h2>
                  <p className="text-slate-400 font-medium max-w-xl mx-auto text-base leading-relaxed">Dedicated to helping you navigate and resolve the most intimate challenges with compassion and expertise.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 relative z-10 mb-8">
                  {supportAreas.map(area => (
                    <div key={area.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors hover:scale-110 transition-transform">
                          <DynamicIcon name={area.icon_name} className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-white tracking-tight mb-1.5 leading-none">{area.title}</h4>
                          <p className="text-slate-400 text-xs font-medium leading-relaxed">{area.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 text-center">
                  <button
                    onClick={() => openBookingModal()}
                    className="btn-premium-primary !bg-white !text-slate-950 hover:!bg-primary hover:!text-white shadow-2xl shadow-white/5 !py-3 !px-8 text-sm"
                  >
                    Resolve My Concerns Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Mobile Floating CTA */}
      <div className="lg:hidden fixed bottom-8 left-4 right-4 z-[100] animate-fade-in-up md:hidden">
        <button
          onClick={() => openBookingModal()}
          className="w-full btn-premium-primary !py-5 shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
        >
          <Calendar size={20} />
          <span className="uppercase tracking-widest font-black text-sm">Book & Resolve Now</span>
        </button>
      </div>

      {/* Modal for booking */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={closeBookingModal}
        instructorId={instructor?.id || 1}
        instructorName={instructor?.name}
      />
    </div>
  );
};

export default DynamicInstructorBookingWrapper;
