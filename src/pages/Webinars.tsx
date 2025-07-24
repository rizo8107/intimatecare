import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'react-hot-toast';
import { CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Directly create Supabase client here to avoid module resolution issues
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://crm-supabase.7za6uc.easypanel.host';
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
  image_url?: string;
  benefits: string[];
  hook_questions: string[];
  registration_url?: string;
  is_featured: boolean;
}

const Webinars = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [featuredWebinar, setFeaturedWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
            title: 'The Pleasure Paradox: Why Masturbation Might Be Hurting Your Sex Life (And How to Fix It)',
            description: 'Join certified intimacy coach Khushboo Bist for a free, confidential, and shame-free webinar where we\'ll have an honest conversation about masturbation.',
            date: '2025-08-15',
            time: '19:00',
            duration: '90 minutes',
            presenter: 'Khushboo Bist',
            image_url: '/images/webinar-masturbation.jpg',
            benefits: [
              'Why so many of us carry deep-seated guilt around self-pleasure (and how to release it).',
              'The #1 reason masturbation can interfere with partnered orgasms and what to do about it.',
              'How to turn your solo practice into a tool that enhances your sex life, instead of competing with it.',
              'A simple technique called "Mindful Masturbation" to rediscover sensation and pleasure.'
            ],
            hook_questions: [
              'Do you ever feel a sense of guilt or shame after masturbating?',
              'Is your solo pleasure routine starting to feel more exciting than sex with your partner?',
              'Are you struggling to reach orgasm with your partner, even though it\'s easy when you\'re alone?',
              'Does the topic of masturbation feel like a secret you have to keep in your relationship?'
            ],
            registration_url: 'https://forms.gle/yourFormLink',
            is_featured: true
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
      {featuredWebinar && (
        <section className="bg-gradient-to-b from-[#FFEBF0] to-white py-12 px-4">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-3">
                  {featuredWebinar.title}
                </h1>
                <p className="text-lg text-gray-600">
                  with <span className="font-medium text-[#FF7A9A]">{featuredWebinar.presenter}</span>
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
                {/* Featured Image */}
                <div className="w-full md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={featuredWebinar.image_url || "/images/webinar-placeholder.jpg"} 
                      alt={featuredWebinar.title} 
                      className="w-full h-auto object-cover aspect-video"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/webinar-placeholder.jpg";
                      }}
                    />
                  </div>
                </div>
                
                {/* Webinar Details */}
                <div className="w-full md:w-1/2 flex flex-col">
                  {/* Date and Time */}
                  <div className="inline-block bg-[#FFE5EC] rounded-lg px-4 py-2 mb-6">
                    <div className="flex items-center gap-2 text-[#FF5A84] font-medium">
                      <CalendarIcon size={18} />
                      <span className="text-lg">{formatDate(featuredWebinar.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#FF5A84] mt-2 font-medium">
                      <Clock size={18} />
                      <span className="text-lg">{formatTime(featuredWebinar.time)} · {featuredWebinar.duration}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-lg text-gray-700 mb-8">
                    {featuredWebinar.description}
                  </p>
                  
                  {/* CTA Button */}
                  <Button
                    className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-6 rounded-full text-lg"
                    onClick={() => handleRegister(featuredWebinar.registration_url)}
                  >
                    Reserve Your Free Spot Now
                  </Button>
                </div>
              </div>
              
              {/* Two-column layout for desktop */}
              <div className="md:flex md:gap-10 md:mt-8">
                {/* Hook Questions */}
                <div className="mb-12 md:mb-0 md:w-1/2">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 font-serif">
                    Is this webinar for you?
                  </h2>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#FFE5EC] h-full">
                    <ul className="space-y-4">
                      {featuredWebinar.hook_questions.map((question, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="text-[#FF7A9A] mt-1 flex-shrink-0">❓</div>
                          <p className="text-gray-800">{question}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Benefits */}
                <div className="md:w-1/2">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 font-serif">
                    What you'll discover in this session:
                  </h2>
                  
                  <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4">
                    {featuredWebinar.benefits.map((benefit, index) => (
                      <Card key={index} className="border-[#FFE5EC]">
                        <CardContent className="p-5 flex items-start gap-3">
                          <CheckCircle2 className="text-[#FF7A9A] shrink-0 mt-1" size={22} />
                          <p>{benefit}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 italic mb-6 max-w-2xl mx-auto">
                  This is a safe space to learn and ask questions without judgment.
                </p>
                
                <Button 
                  className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-6 px-12 rounded-full text-lg shadow-md"
                  onClick={() => handleRegister(featuredWebinar.registration_url)}
                >
                  Reserve Your Free Spot Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* List of upcoming webinars (if there are more than one) */}
      {webinars.length > 1 && (
        <section className="container-custom py-10">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-10">
            More Upcoming Webinars
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.filter(w => w.id !== featuredWebinar?.id).map(webinar => (
              <Card key={webinar.id} className="overflow-hidden border-[#FFE5EC]">
                <div className="aspect-video overflow-hidden">
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
                  <div className="bg-[#FFE5EC] inline-block rounded-md px-3 py-1 mb-3">
                    <div className="flex items-center gap-1 text-[#FF5A84] font-medium">
                      <CalendarIcon size={14} />
                      <span>{formatDate(webinar.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#FF5A84] mt-1">
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
                    className="bg-[#FFE5EC] hover:bg-[#FFD5E0] text-[#FF5A84] w-full"
                    onClick={() => handleRegister(webinar.registration_url)}
                  >
                    Learn More
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
