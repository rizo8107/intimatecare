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
    <div className="bg-[#FFF7EC] min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom max-w-6xl">
          <Link to="/instructors" className="inline-flex items-center text-[#e05286] hover:text-[#C61F60] mb-6 transition-colors font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to All Coaches
          </Link>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left: Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-[#FFE5EC] lg:sticky lg:top-24">
                {/* Profile Image */}
                <div className="relative overflow-hidden aspect-[3/4] max-h-[520px] mx-auto">
                  <img 
                    src={instructor?.profile_image_url || `/images/${instructor?.name?.toLowerCase()}-profile.jpg`} 
                    alt={instructor?.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/400x400/FFE5EC/FF5A84?text=${instructor?.name?.charAt(0)}&font=playfair`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h1 className="text-2xl font-bold text-white drop-shadow-sm">{instructor?.name}</h1>
                    <p className="text-white/90 text-sm">{instructor?.specialization}</p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">5.0 Rating</span>
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#e05286]" />
                      <span>100% Confidential</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Award className="w-5 h-5 text-[#e05286]" />
                      <span>{instructor?.experience || 'Certified Professional'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Heart className="w-5 h-5 text-[#e05286]" />
                      <span>Judgment-Free Space</span>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  {firstSession && (
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-[#FFE0EC] rounded-xl border border-[#e05286]/40">
                        <p className="text-sm text-gray-600 mb-1">{firstSession.name}</p>
                        <p className="text-3xl font-bold text-[#e05286]">₹{firstSession.price}</p>
                        <p className="text-xs text-gray-500">{firstSession.duration_minutes} minutes</p>
                      </div>
                      <button
                        disabled={firstSession?.button_lock}
                        onClick={handleBookNowClick}
                        className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg ${
                          firstSession?.button_lock 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-[#e05286] hover:bg-[#C61F60] hover:shadow-xl hover:-translate-y-0.5 text-white'
                        }`}
                      >
                        <Calendar className="w-5 h-5" />
                        Book Session Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#FFE5EC]">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                  About {instructor?.name}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {getSection('intro')?.content || instructor?.bio || 'A safe, non-judgmental space where you can feel heard, witnessed, and truly understood.'}
                </p>

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {highlights.map(highlight => (
                      <div key={highlight.id} className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        {highlight.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Session Types */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#FFE5EC]">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                  Available Sessions
                </h2>
                
                <div className="space-y-4">
                  {firstSession && (
                    <div className="p-5 rounded-xl bg-[#FFE0EC] border-2 border-[#e05286]/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="inline-block bg-[#e05286] text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                            RECOMMENDED
                          </div>
                          <h3 className="font-bold text-gray-800 text-lg">{firstSession.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{firstSession.description || `${firstSession.duration_minutes} minutes of dedicated space`}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-2xl font-bold text-[#e05286]">₹{firstSession.price}</span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {firstSession.duration_minutes} min
                            </span>
                          </div>
                        </div>
                        <button
                          disabled={firstSession?.button_lock}
                          onClick={handleBookNowClick}
                          className={`px-6 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2 ${
                            firstSession?.button_lock 
                              ? 'bg-gray-400 cursor-not-allowed text-white' 
                              : 'bg-[#e05286] hover:bg-[#C61F60] text-white shadow-md hover:shadow-lg'
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}

                  {followUpSession && (
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-gray-800">{followUpSession.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{followUpSession.description || `${followUpSession.duration_minutes} minutes of continued support`}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xl font-bold text-gray-800">₹{followUpSession.price}</span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {followUpSession.duration_minutes} min
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <button
                            disabled={followUpSession?.button_lock}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                              e.preventDefault();
                              if (!followUpSession?.button_lock) {
                                if (followUpSession.is_external && followUpSession.external_url) {
                                  window.open(followUpSession.external_url, '_blank');
                                } else {
                                  setSelectedSessionType(followUpSession);
                                  openBookingModal();
                                }
                              }
                            }}
                            className={`px-6 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2 ${
                              followUpSession?.button_lock 
                                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                                : 'bg-gray-800 hover:bg-gray-900 text-white'
                            }`}
                          >
                            <Calendar className="w-4 h-4" />
                            Book Follow-Up
                          </button>
                          {followUpSession?.button_lock && (
                            <span className="text-xs text-gray-500 mt-2 italic">Available after first session</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Support Areas */}
              {(supportAreasByCategory['Sexual Wellness'] || supportAreasByCategory['Holistic Support']) && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#FFE5EC]">
                  <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                    How I Can Help You
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {supportAreasByCategory['Sexual Wellness']?.map(area => (
                      <div key={area.id} className="flex items-start gap-3 p-4 rounded-xl bg-pink-50 border border-pink-100">
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                          <DynamicIcon name={area.icon_name} className="text-white" size={18} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{area.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{area.description}</p>
                        </div>
                      </div>
                    ))}
                    {supportAreasByCategory['Holistic Support']?.map(area => (
                      <div key={area.id} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100">
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                          <DynamicIcon name={area.icon_name} className="text-white" size={18} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{area.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{area.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What You'll Receive */}
              {offerings.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#FFE5EC]">
                  <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                    What You'll Receive
                  </h2>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    {offerings.map(offering => (
                      <div key={offering.id} className="text-center p-5 rounded-xl bg-[#FFF7EC] border border-[#FFE5EC]">
                        <div className="w-14 h-14 rounded-full bg-[#FFE0EC] flex items-center justify-center mx-auto mb-4">
                          <DynamicIcon name={offering.icon_name} className="text-[#e05286]" size={24} />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{offering.title}</h3>
                        <p className="text-gray-600 text-sm">{offering.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {testimonials.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#FFE5EC]">
                  <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                    Client Stories
                  </h2>
                  
                  <div className="space-y-4">
                    {testimonials.slice(0, 3).map(testimonial => (
                      <div key={testimonial.id} className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                            {testimonial.client_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{testimonial.client_name}</p>
                            <p className="text-sm text-gray-500">{testimonial.client_description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-[#FFE0EC] border-t border-[#e05286]/40">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {getSection('closing')?.content || `Take the first step toward healing and self-discovery. Book a session with ${instructor?.name} today.`}
          </p>
          <button
            onClick={handleBookNowClick}
            className="inline-flex items-center gap-2 bg-[#e05286] hover:bg-[#C61F60] text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
          >
            <Calendar className="w-5 h-5" />
            Book Your Session Now
          </button>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#e05286]" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#e05286]" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#e05286]" />
              <span>Flexible Scheduling</span>
            </div>
          </div>
        </div>
      </section>
      
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
