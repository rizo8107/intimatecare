import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  CalendarIcon, 
  Users, 
  CheckCircle2, 
  Clock, 
  Bell, 
  AlertCircle,
  Star, 
  Award, 
  TrendingUp, 
  Share2, 
  X 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { toast } from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';

// Directly create Supabase client here to avoid module resolution issues
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://crm-supabase.lhs56u.easypanel.host';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define interface for webinar data
interface Webinar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  presenter: string;
  presenter_description?: string;
  presenter_image_url?: string;
  image_url?: string;
  benefits: string[];
  hook_questions: string[];
  registration_url?: string;
  is_featured: boolean;
  price?: number;
}

const Webinars = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [featuredWebinar, setFeaturedWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [spotsLeft, setSpotsLeft] = useState<number>(25);
  const [showUrgencyPopup, setShowUrgencyPopup] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const popupTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Calculate time remaining until webinar date
  const calculateTimeRemaining = (webinarDate: string, webinarTime: string) => {
    // Parse webinar date and time
    const [year, month, day] = webinarDate.split('-').map(Number);
    const [webinarHours, webinarMinutes] = webinarTime.split(':').map(Number);
    
    // Create webinar datetime object
    const webinarDateTime = new Date(year, month - 1, day, webinarHours, webinarMinutes);
    const now = new Date();
    
    // Calculate time difference in milliseconds
    const diff = webinarDateTime.getTime() - now.getTime();
    
    // If webinar is in the past, return zeros
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours: remainingHours, minutes: remainingMinutes, seconds };
  };
  
  // Countdown timer for webinar
  useEffect(() => {
    if (featuredWebinar) {
      // Initial calculation
      setTimeLeft(calculateTimeRemaining(featuredWebinar.date, featuredWebinar.time));
      
      // Update every second
      timerRef.current = setInterval(() => {
        setTimeLeft(calculateTimeRemaining(featuredWebinar.date, featuredWebinar.time));
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, [featuredWebinar]);
  
  // Simulate spots decreasing occasionally
  useEffect(() => {
    const decreaseSpots = () => {
      if (Math.random() > 0.7 && spotsLeft > 5) {
        setSpotsLeft(prev => prev - 1);
      }
    };
    
    const spotInterval = setInterval(decreaseSpots, 45000); // Every 45 seconds
    
    return () => clearInterval(spotInterval);
  }, [spotsLeft]);

  // Fetch webinar data
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('webinars')
          .select('*')
          .order('date', { ascending: true });
          
        if (error) {
          console.error('Error fetching webinars:', error);
          // If there's an error (table might not exist yet), use hardcoded data
          const hardcodedWebinar: Webinar = {
            id: 1,
            title: 'Understanding Porn Addiction',
            description: 'Struggling to stop watching but don\'t know why? Join me for a raw, judgment-free session on the emotional and psychological side of porn addiction.',
            date: '2025-08-01',
            time: '18:00',
            duration: '60 minutes',
            presenter: 'Dr. Maya Sharma',
            presenter_description: 'Certified Sex Therapist & Addiction Specialist with over 10 years of experience helping individuals overcome compulsive behaviors. Dr. Sharma takes a compassionate, shame-free approach to addressing the emotional roots of addiction.',
            presenter_image_url: '/images/dr-maya-sharma.jpg',
            image_url: '/images/webinar-porn-addiction.jpg',
            benefits: [
              'What is Porn Addiction? Understanding the science behind compulsive behaviors',
              'Myths and Realities: Separating fact from fiction about porn addiction',
              'Root Causes & Emotional Patterns: Identifying your personal triggers',
              'How to Break the Loop: Practical strategies for regaining control'
            ],
            hook_questions: [
              'Do you find yourself watching porn even when you promised yourself you wouldn\'t?',
              'Has porn viewing started to interfere with your relationships or daily life?',
              'Do you feel shame or guilt after watching, yet return to it again and again?',
              'Have you tried to stop but found yourself unable to break the pattern?'
            ],
            registration_url: 'https://forms.gle/pornAddictionWebinar',
            is_featured: true,
            price: 1499
          };
          
          setWebinars([hardcodedWebinar]);
          setFeaturedWebinar(hardcodedWebinar);
          return;
        }
        
        // Process data if successfully fetched
        if (data) {
          // Parse string arrays if needed (Supabase might store arrays as strings)
          const processedData = data.map(webinar => ({
            ...webinar,
            benefits: Array.isArray(webinar.benefits) ? webinar.benefits : JSON.parse(webinar.benefits || '[]'),
            hook_questions: Array.isArray(webinar.hook_questions) ? webinar.hook_questions : JSON.parse(webinar.hook_questions || '[]')
          }));
          
          setWebinars(processedData);
          
          // Set featured webinar
          const featured = processedData.find(w => w.is_featured);
          setFeaturedWebinar(featured || processedData[0]);
        }
      } catch (error) {
        console.error('Error loading webinars:', error);
        toast.error('Failed to load webinars. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWebinars();
  }, []);

  const handleRegister = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      // Fallback if URL not available
      toast.success('Registration will open soon. We\'ll notify you!');
    }
  };

  // Format date to readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    
    // Format: "15 August 2025"
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Format time to 12-hour format with AM/PM
  const formatTime = (timeStr: string) => {
    // Input format is "HH:MM" in 24-hour format
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Show urgency popup after 10 seconds
  useEffect(() => {
    popupTimerRef.current = setTimeout(() => {
      setShowUrgencyPopup(true);
    }, 10000); // 10 seconds
    
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="container-custom py-28 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded-full w-48 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-xl w-full max-w-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-0 pb-0">
      {/* Urgency Popup */}
      <Dialog open={showUrgencyPopup} onOpenChange={setShowUrgencyPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-600">
              <AlertCircle size={20} />
              <span>Limited Time Offer!</span>
            </DialogTitle>
            <DialogDescription>
              <div className="py-4">
                <p className="text-lg font-medium mb-3">Only {spotsLeft} spots remaining for this exclusive webinar!</p>
                <p className="mb-4">Secure your spot now before all seats are filled. This is a rare opportunity to learn directly from {featuredWebinar?.presenter}.</p>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-amber-700 font-medium flex items-center gap-2">
                    <Clock size={18} />
                    <span>Time is running out! Only {timeLeft.days} days, {timeLeft.hours}h {timeLeft.minutes}m left</span>
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="bg-rose-500 hover:bg-rose-600 text-white py-6 px-8 rounded-full text-lg shadow-md animate-pulse"
                    onClick={() => {
                      handleRegister(featuredWebinar?.registration_url || '');
                      setShowUrgencyPopup(false);
                    }}
                  >
                    Yes! Reserve My Spot for ₹{featuredWebinar?.price || 1499}
                  </Button>
                </div>
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  <span className="font-medium">100% Satisfaction Guarantee</span> • Secure payment
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      {featuredWebinar && (
        <>
          {/* Featured Webinar Image Banner */}
          <section className="bg-white">
            <div className="container-custom max-w-full mx-auto px-0">
              <div className="overflow-hidden shadow-md">
                <img 
                  src={featuredWebinar.image_url || "/images/webinar-placeholder.jpg"} 
                  alt={featuredWebinar.title} 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/webinar-placeholder.jpg";
                  }}
                />
              </div>
            </div>
          </section>
          
          {/* Hero Section with Title and Date */}
          <section className="bg-slate-50 py-16 px-4">
            <div className="container-custom max-w-5xl mx-auto">
              <div className="text-center">
                <Badge className="bg-rose-500 text-white px-4 py-2 text-sm font-medium mb-4">LIVE WEBINAR</Badge>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="inline-block bg-rose-50 text-rose-500 px-4 py-2 rounded-full font-medium">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={18} />
                      <span>{formatDate(featuredWebinar.date)} · {formatTime(featuredWebinar.time)} · {featuredWebinar.duration}</span>
                    </div>
                  </div>
                  
                  {featuredWebinar.price && (
                    <div className="inline-block bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full font-medium">
                      <div className="flex items-center gap-2">
                        <span>₹{featuredWebinar.price}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-serif font-semibold text-gray-800 mb-6 max-w-3xl mx-auto leading-tight">
                  {featuredWebinar.title}
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
                  {featuredWebinar.description}
                </p>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 max-w-xl mx-auto">
                  <p className="text-amber-700 font-medium flex items-center justify-center gap-2">
                    <Bell size={18} />
                    <span>Important: No recordings will be provided. Live attendance required.</span>
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 text-emerald-600 font-medium">
                    <Users size={20} />
                    <span>Only {spotsLeft} spots remaining!</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-amber-600 font-medium">
                    <Star size={20} />
                    <span>4.9/5 rating from past attendees</span>
                  </div>
                </div>
                
                {/* Countdown Timer */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-md mx-auto">
                  <p className="text-gray-600 mb-3 flex items-center justify-center gap-2">
                    <Bell className="text-rose-500" />
                    <span>Registration closes in:</span>
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-2xl font-bold text-gray-800">{timeLeft.days}</div>
                      <div className="text-xs text-gray-500">Days</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-2xl font-bold text-gray-800">{timeLeft.hours}</div>
                      <div className="text-xs text-gray-500">Hours</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-2xl font-bold text-gray-800">{timeLeft.minutes}</div>
                      <div className="text-xs text-gray-500">Minutes</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-2xl font-bold text-gray-800">{timeLeft.seconds}</div>
                      <div className="text-xs text-gray-500">Seconds</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="bg-rose-500 hover:bg-rose-600 text-white py-6 px-10 rounded-full text-lg shadow-md animate-pulse"
                  onClick={() => handleRegister(featuredWebinar.registration_url)}
                >
                  Reserve Your Spot for ₹{featuredWebinar.price || 1499}
                </Button>
                
                <p className="text-gray-500 text-sm mt-3">Secure payment • Instant confirmation</p>
              </div>
            </div>
          </section>
          
          {/* Presenter Profile Section */}
          <section className="py-16 px-4 bg-white">
            <div className="container-custom max-w-5xl mx-auto">
              {featuredWebinar.presenter && (
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  {/* Presenter Image */}
                  <div className="w-full md:w-2/5 flex justify-center">
                    {featuredWebinar.presenter_image_url ? (
                      <div className="relative">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-rose-100 shadow-lg">
                          <img 
                            src={featuredWebinar.presenter_image_url} 
                            alt={featuredWebinar.presenter} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredWebinar.presenter)}&background=FF7A9A&color=fff&size=256`;
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-rose-50 border border-rose-100 rounded-full py-2 px-5 shadow-md">
                          <span className="text-rose-500 font-medium">Your Host</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-rose-100 flex items-center justify-center text-white text-6xl font-medium shadow-lg">
                        {featuredWebinar.presenter.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Presenter Details */}
                  <div className="w-full md:w-3/5 text-center md:text-left mt-8 md:mt-0">
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-4">
                      {featuredWebinar.presenter}
                    </h2>
                    
                    {featuredWebinar.presenter_description && (
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {featuredWebinar.presenter_description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
          
          {/* Webinar Content Section */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="container-custom max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* What You'll Learn */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-rose-100 p-3 rounded-full">
                      <CheckCircle2 className="text-rose-500" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-800">
                      What You'll Learn
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {featuredWebinar.benefits.map((benefit, index) => (
                      <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                        <div className="bg-rose-50 text-rose-500 font-semibold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Is This For You */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <div className="text-purple-500 font-bold">?</div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-800">
                      Is This For You?
                    </h2>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <ul className="space-y-5">
                      {featuredWebinar.hook_questions.map((question, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-purple-50 text-purple-500 p-2 rounded-full shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                            </svg>
                          </div>
                          <p className="text-gray-700">{question}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Social Proof Section */}
          <section className="py-16 px-4 bg-white">
            <div className="container-custom max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-10">
                What Past Attendees Are Saying
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Testimonial 1 */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "This webinar completely changed my perspective. The insights were practical and I've already started implementing the strategies in my daily life."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-medium">
                      S
                    </div>
                    <div>
                      <p className="font-medium">Sarath K.</p>
                      <p className="text-sm text-gray-500">Attended last month</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "The presenter was incredibly knowledgeable and created such a safe space for discussion. I finally feel understood and have a clear path forward."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-medium">
                      M
                    </div>
                    <div>
                      <p className="font-medium">Michael T.</p>
                      <p className="text-sm text-gray-500">Attended 2 weeks ago</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 3 */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "I was hesitant to join at first, but I'm so glad I did. The information was presented in a judgment-free way that made me feel comfortable asking questions."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-medium">
                      
                    </div>
                    <div>
                      <p className="font-medium">Neha.M</p>
                      <p className="text-sm text-gray-500">Attended last week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Why Attend Section */}
          <section className="py-16 px-4 bg-slate-50">
            <div className="container-custom max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-4">
                Why You Can't Miss This Webinar
              </h2>
              
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Join hundreds of others who have already benefited from our expert-led sessions
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="bg-rose-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-rose-500" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Expert-Led Session</h3>
                  <p className="text-gray-600">Learn from a certified specialist with years of experience in the field</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="bg-rose-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="text-rose-500" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Practical Strategies</h3>
                  <p className="text-gray-600">Walk away with actionable techniques you can implement immediately</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="bg-rose-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="text-rose-500" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Supportive Community</h3>
                  <p className="text-gray-600">Connect with others facing similar challenges in a judgment-free environment</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="py-16 px-4 bg-rose-50">
            <div className="container-custom max-w-3xl mx-auto text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-rose-100">
                <Badge className="bg-rose-500 text-white px-4 py-1 mb-6">LIMITED SEATS AVAILABLE</Badge>
                
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-6">
                  Ready to transform your understanding and take control?
                </h2>
                
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Join {spotsLeft} others who have already reserved their spot for this life-changing session.
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span>Live Q&A included</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span>Live interactive Q&A session</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span>Free resource guide</span>
                  </div>
                </div>
                
                <Button 
                  className="bg-rose-500 hover:bg-rose-600 text-white py-6 px-12 rounded-full text-lg shadow-md animate-pulse"
                  onClick={() => handleRegister(featuredWebinar.registration_url)}
                >
                  Reserve Your Spot for ₹{featuredWebinar.price || 1499}
                </Button>
                
                <p className="text-gray-500 text-sm mt-4">
                  <span className="font-medium">Hurry!</span> {timeLeft.days > 0 ? `${timeLeft.days} days, ` : ''}{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s until webinar starts
                </p>
              </div>
            </div>
          </section>
        </>
      )}
      
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-10">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-2">How long is the webinar?</h3>
              <p className="text-gray-600">The webinar lasts for {featuredWebinar?.duration || '60 minutes'}, including time for Q&A at the end.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-2">Will I receive a recording?</h3>
              <p className="text-gray-600">No. This webinar is live-only and no recordings will be provided. Please ensure you can attend the scheduled session.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-2">What's included in the registration fee?</h3>
              <p className="text-gray-600">Your registration includes access to the live session, Q&A participation, and a downloadable resource guide. No recordings will be provided.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-2">What if I can't attend live?</h3>
              <p className="text-gray-600">Unfortunately, no recordings will be available. We recommend only registering if you can attend the live session.</p>
            </div>
          </div>
        </div>
      </section>

      {/* List of upcoming webinars (if there are more than one) */}
      {webinars.length > 1 && (
        <section className="container-custom py-16 bg-slate-50">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-4">
            More Upcoming Webinars
          </h2>
          
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Continue your journey with these additional educational sessions
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.filter(w => w.id !== featuredWebinar?.id).map(webinar => (
              <Card key={webinar.id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden relative">
                  <Badge className="absolute top-3 right-3 bg-rose-500 text-white">UPCOMING</Badge>
                  <img 
                    src={webinar.image_url || "/images/webinar-placeholder.jpg"} 
                    alt={webinar.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/webinar-placeholder.jpg";
                    }}
                  />
                </div>
                <CardContent className="p-5">
                  <div className="bg-rose-50 inline-block rounded-md px-3 py-1 mb-3">
                    <div className="flex items-center gap-1 text-rose-500 font-medium">
                      <CalendarIcon size={14} />
                      <span>{formatDate(webinar.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-rose-500 mt-1">
                      <Clock size={14} />
                      <span>{formatTime(webinar.time)}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {webinar.description}
                  </p>
                  <Button 
                    className="bg-rose-50 hover:bg-rose-100 text-rose-500 w-full font-medium"
                    onClick={() => handleRegister(webinar.registration_url)}
                  >
                    Register for ₹{webinar.price || 1499}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Webinars;
