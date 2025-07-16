import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Star, Heart, MessageCircle, Award, CheckCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';
import { createClient } from '@supabase/supabase-js';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://crm-supabase.7za6uc.easypanel.host';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
}

interface SessionType {
  id: number;
  instructor_id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number;
  is_first_session: boolean;
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

const DynamicInstructorBooking = () => {
  const { instructorName = "Mansi" } = useParams<{ instructorName: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [highlights, setHighlights] = useState<InstructorHighlight[]>([]);
  const [supportAreas, setSupportAreas] = useState<InstructorSupportArea[]>([]);
  const [offerings, setOfferings] = useState<InstructorOffering[]>([]);
  const [pageSections, setPageSections] = useState<InstructorPageSection[]>([]);
  const [testimonials, setTestimonials] = useState<InstructorTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal and Payment State
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [selectedSessionType, setSelectedSessionType] = useState<SessionType | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [storedCfOrderId, setStoredCfOrderId] = useState<string | null>(null);
  const [paymentOutcome, setPaymentOutcome] = useState<string | null>(null); // e.g., 'SUCCESS', 'FAILED'
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPollingStatus, setIsPollingStatus] = useState(false);

  const pollingActiveRef = useRef(false);
  const pollingTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const FINAL_PAYMENT_STATUSES = ['SUCCESS', 'FAILED', 'CANCELLED', 'PAID'];
  const MAX_POLLING_ATTEMPTS = 20;
  const POLLING_INTERVAL = 5000;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch instructor details
        const { data: instructorData, error: instructorError } = await supabase
          .from('instructors')
          .select('*')
          .eq('name', instructorName)
          .single();
          
        if (instructorError) throw instructorError;
        setInstructor(instructorData);
        
        if (instructorData?.id) {
          const instructorId = instructorData.id;
          
          // Fetch session types
          const { data: sessionData, error: sessionError } = await supabase
            .from('session_types')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('is_first_session', { ascending: false });
            
          if (sessionError) throw sessionError;
          setSessionTypes(sessionData || []);
          
          // Fetch available slots
          const { data: slotsData, error: slotsError } = await supabase
            .from('available_slots')
            .select('*')
            .in('session_type_id', sessionData.map(st => st.id))
            .eq('booking_status', false)
            .gte('slot_date', new Date().toISOString().split('T')[0]) // Fetch from today onwards
            .order('slot_date').order('start_time');
            
          if (slotsError) throw slotsError;
          setAvailableSlots(slotsData || []);
          
          // Fetch highlights
          const { data: highlightsData, error: highlightsError } = await supabase
            .from('instructor_highlights')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('display_order');
            
          if (highlightsError) throw highlightsError;
          setHighlights(highlightsData || []);
          
          // Fetch support areas
          const { data: supportAreasData, error: supportAreasError } = await supabase
            .from('instructor_support_areas')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('display_order');
            
          if (supportAreasError) throw supportAreasError;
          setSupportAreas(supportAreasData || []);
          
          // Fetch offerings
          const { data: offeringsData, error: offeringsError } = await supabase
            .from('instructor_offerings')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('display_order');
            
          if (offeringsError) throw offeringsError;
          setOfferings(offeringsData || []);
          
          // Fetch page sections
          const { data: pageSectionsData, error: pageSectionsError } = await supabase
            .from('instructor_page_sections')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('display_order');
            
          if (pageSectionsError) throw pageSectionsError;
          setPageSections(pageSectionsData || []);
          
          // Fetch testimonials
          const { data: testimonialsData, error: testimonialsError } = await supabase
            .from('instructor_testimonials')
            .select('*')
            .eq('instructor_id', instructorId);
            
          if (testimonialsError) throw testimonialsError;
          setTestimonials(testimonialsData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [instructorName]);

  // Helper function to get a specific section by type
  const getSection = (sectionType: string) => {
    return pageSections.find(section => section.section_type === sectionType);
  };

  // Helper function to filter support areas by category
  const getSupportAreasByCategory = () => {
    const categories: Record<string, InstructorSupportArea[]> = {};
    
    supportAreas.forEach(area => {
      const category = area.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(area);
    });
    
    return categories;
  };
  
  // Get support areas by category
  const supportAreasByCategory = getSupportAreasByCategory();
  
  // Get first session and follow-up session
  const firstSession = sessionTypes.find(session => session.is_first_session);
  const followUpSession = sessionTypes.find(session => !session.is_first_session);

  // Get colors from instructor data or use defaults
  const highlightColor = instructor?.highlight_color || '#FF5A84';
  const secondaryColor = instructor?.secondary_color || '#853f92';

  // --- PAYMENT LOGIC ---
  const loadCashfreeSDK = () => {
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
          setAvailableSlots(newSlots);
          
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

    setIsLoadingPayment(true);
    setPaymentError(null);
    setPaymentOutcome(null);

    const sdkLoaded = await loadCashfreeSDK();
    if (!sdkLoaded) {
      setPaymentError('Failed to load payment SDK. Please check your connection.');
      setIsLoadingPayment(false);
      return;
    }

    const paymentSessionId = await generateOrderId(selectedSlot.id, selectedSessionType.price);
    if (!paymentSessionId) {
      setIsLoadingPayment(false);
      return;
    }

    setStoredCfOrderId(paymentSessionId);
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
    setIsLoadingPayment(false);
  };

  const openBookingModal = (slot?: AvailableSlot) => {
    // If no specific slot is provided, just open the modal with default values
    if (!slot) {
      // If we have available slots, use the first one
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
      // If no slots available or no matching session type, just open modal with empty values
      setIsModalOpen(true);
      return;
    }
    
    // Original behavior for when a specific slot is provided
    const sessionType = sessionTypes.find(st => st.id === slot.session_type_id);
    if (sessionType) {
      setSelectedSlot(slot);
      setSelectedSessionType(sessionType);
      setPaymentOutcome(null);
      setPaymentError(null);
      setIsModalOpen(true);
    }
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    pollingActiveRef.current = false;
    if (pollingTimeoutIdRef.current) {
      clearTimeout(pollingTimeoutIdRef.current);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5A84]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#FF9EB5] to-white min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <Link to="/sessions" className="inline-flex items-center text-[#FF5A84] hover:text-[#FF7A9A] mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Sessions
        </Link>
        
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8 border border-[#FFE5EC]">
          {/* Hero Banner with Author Image */}
          <div className="relative bg-gradient-to-r from-[#FFE5EC] to-[#FFF5F8] py-12 px-6 md:px-10">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('/images/pattern-dots.png')] bg-repeat"></div>
            <div className="flex flex-col md:flex-row items-center relative z-10">
              {/* Author Image */}
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="relative">
                  <img 
                    src={instructor?.profile_image_url || `/images/${instructorName.toLowerCase()}-profile.jpg`} 
                    alt={`${instructorName} - Holistic Listener`} 
                    className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/200x200/FFE5EC/FF5A84?text=${instructorName.charAt(0)}&font=playfair`;
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#FF5A84] text-white rounded-full p-2">
                    <Award size={20} />
                  </div>
                </div>
              </div>
              
              {/* Intro Text */}
              <div className="md:w-2/3 text-center md:text-left md:pl-8">
                <div className="inline-block bg-[#FF5A84] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">HOLISTIC LISTENER</div>
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-3">
                  Book a Session with {instructorName}
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                  {getSection('intro')?.content || instructor?.bio || 'A safe, non-judgmental space where you can feel heard, witnessed, and truly understood.'}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm mb-4">
                  {highlights.map(highlight => (
                    <div key={highlight.id} className="flex items-center">
                      <DynamicIcon name={highlight.icon_name} className={`text-[${highlight.icon_color}] mr-1`} size={16} />
                      <span>{highlight.title}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4" style={{ backgroundColor: instructor.highlight_color }} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); openBookingModal(); }}>
                  <BookOpen size={18} className="mr-2" />
                  Book Now
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
                <div className="mt-6 bg-gradient-to-r from-[#FFD0E0] to-[#FFF5F8] p-5 rounded-lg border-l-4 border-[#853f92] shadow-md">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-medium text-gray-800 mb-1">{firstSession.name}</h3>
                      <p className="text-gray-600 text-sm">{firstSession.description || `${firstSession.duration_minutes} minutes of dedicated space`}</p>
                      <div className="text-2xl font-serif font-bold text-[#FF5A84] mt-1">₹{firstSession.price}</div>
                    </div>
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); openBookingModal(); }}
                      className="bg-[#853f92] hover:bg-[#9A4DAB] text-white py-2 px-6 rounded-full font-medium transition-colors inline-flex items-center shadow-md"
                    >
                      <Calendar size={18} className="mr-2" />
                      Book First Session
                    </button>
                  </div>
                </div>
              )}
              
              {followUpSession && (
                <>
                  <div className="my-4 border-t border-[#FFD5E2]"></div>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-medium text-gray-800 mb-1">{followUpSession.name}</h3>
                      <p className="text-gray-600 text-sm">{followUpSession.description || `${followUpSession.duration_minutes} minutes of continued support`}</p>
                      <div className="text-2xl font-serif font-bold text-[#FF5A84] mt-1">₹{followUpSession.price}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        disabled
                        className="bg-gray-500 text-white py-2 px-6 rounded-full font-medium inline-flex items-center cursor-not-allowed opacity-70"
                      >
                        <Calendar size={18} className="mr-2" />
                        Book Follow-Up
                      </button>
                      <span className="text-xs text-gray-700 mt-2 italic font-medium">Enabled after first session</span>
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
                
                <div className="bg-white p-5 rounded-lg mb-6 border border-[#FFE5EC] shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    {getSection('sexual_wellness')?.content || 'As a trained sexual wellness coach, I provide a safe space to explore challenges around intimacy, desire, and pleasure.'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {supportAreasByCategory['Sexual Wellness'].map(area => (
                    <div key={area.id} className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <DynamicIcon name={area.icon_name} className="text-[#FF5A84] mr-2" size={16} />
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
                  <div className="bg-[#853f92] p-2 rounded-lg mr-3">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-[#853f92]">
                    {getSection('holistic_support')?.title || 'Non-Sexual Holistic Support'}
                  </h2>
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#853f92] to-[#FF5A84]"></div>
                  <p className="pl-6 text-gray-700 italic">
                    {getSection('holistic_support')?.content || 'Other areas where I can hold space for your journey:'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {supportAreasByCategory['Holistic Support']?.map(area => (
                    <div key={area.id} className="flex bg-gradient-to-br from-[#853f9210] to-white p-4 rounded-lg border border-[#853f9230] shadow-sm">
                      <div className="bg-[#853f92] p-2 rounded-full h-min mr-3">
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
                
                <div className="bg-gradient-to-br from-[#FFD0E0] to-white p-5 rounded-lg mb-6 border-l-4 border-[#FF5A84] shadow-md">
                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                    {getSection('post_session')?.content || 'Each session is more than a conversation—it\'s an energetic exchange. Based on our time together, you may receive:'}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {offerings.map(offering => (
                      <div key={offering.id} className="bg-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="bg-[#FF5A8410] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <DynamicIcon name={offering.icon_name} className="text-[#FF5A84]" size={20} />
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
              <div className="bg-gradient-to-r from-[#FFD0E0] to-white p-6 rounded-xl mb-8 text-center border-2 border-[#853f92] shadow-lg">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-[#FF5A84] p-3 rounded-full">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-[#853f92] ml-3">
                    {getSection('closing')?.title || 'Ready to Begin Your Journey?'}
                  </h2>
                </div>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  {getSection('closing')?.content || `Take the first step toward healing and self-discovery. Book a session with ${instructorName} and experience a safe space where you can explore, express, and embrace your authentic self.`}
                </p>
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); openBookingModal(); }}
                  className="bg-[#853f92] hover:bg-[#9A4DAB] text-white py-3 px-8 rounded-full font-medium transition-colors inline-flex items-center text-lg mx-auto shadow-lg"
                >
                  <Calendar size={20} className="mr-2" />
                  Book Your Session Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#FFD0E0] to-white rounded-3xl shadow-lg p-8 text-center border-2 border-[#853f92] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-[#FFE5EC] rounded-full opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 -mb-16 -ml-16 bg-[#FFE5EC] rounded-full opacity-30"></div>
          
          <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
            <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm mb-2">
              <p className="text-[#FF5A84] font-serif text-xl font-medium">"Come as you are—there is no fixing, only feeling."</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#FFE5EC]">
                <div className="flex items-center mb-2">
                  <Heart size={18} className="text-[#FF5A84] mr-2" />
                  <h3 className="font-medium text-gray-800">Inclusive Space</h3>
                </div>
                <p className="text-gray-700 text-sm">A safe space for women, men, LGBTQIA+, and anyone navigating emotional or sexual healing.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#FFE5EC]">
                <div className="flex items-center mb-2">
                  <Star size={18} className="text-[#FF5A84] mr-2" />
                  <h3 className="font-medium text-gray-800">Wisdom-Based</h3>
                </div>
                <p className="text-gray-700 text-sm">Rooted in feminine wisdom, energetic sensitivity & real-world compassion.</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-[#FFE5EC]">
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
        instructorName={instructorName} 
      />
    </div>
  );
};

export default DynamicInstructorBooking;
