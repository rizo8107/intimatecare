import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://crm-supabase.7za6uc.easypanel.host';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const ComingSoon = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Track form submission with Facebook Pixel if available
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Waiting List Signup',
          content_category: 'Coming Soon',
        });
      }

      // Save to Supabase
      const { error } = await supabase
        .from('waiting_list')
        .insert([
          { 
            name, 
            email, 
            phone, 
            message,
            created_at: new Date().toISOString() 
          }
        ]);

      if (error) {
        throw error;
      }

      // Show success message
      toast({
        title: "Thank you for joining our waiting list!",
        description: "We'll notify you as soon as we launch.",
      });

      // Reset form and show success state
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FFE5EC] to-[#FFF5F8] min-h-screen">
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container-custom max-w-6xl">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#FFE5EC] text-[#FF7A9A] px-4 py-1 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
                Coming Soon
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                Something Exciting is on the Way
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                We're working on something special to help transform your intimate life. 
                Join our waiting list to be the first to know when we launch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Column - Illustration/Image */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-[#FF7A9A] opacity-10 rounded-full transform -rotate-6"></div>
                  <img 
                    src="/images/coming-soon.svg" 
                    alt="Coming Soon" 
                    className="relative z-10 w-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/500x500?text=Coming+Soon";
                      target.onerror = null;
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Form */}
              <div>
                {isSubmitted ? (
                  <div className="bg-[#F0FFF4] border border-green-100 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                      You're on the List!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for joining our waiting list. We'll notify you as soon as we launch.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="bg-white hover:bg-gray-50"
                    >
                      Join Again with Different Email
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-[#FAFAFA] rounded-xl p-6 md:p-8">
                    <h3 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                      Join the Waiting List
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Your phone number"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">What are you most excited about?</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us what you're looking forward to..."
                          className="mt-1 resize-none"
                          rows={3}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Join Waiting List
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      By joining our waiting list, you agree to receive updates about our launch. 
                      We respect your privacy and will never share your information.
                    </p>
                  </form>
                )}
              </div>
            </div>
            
            {/* Features Preview Section */}
            <div className="mt-16">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                What to Expect
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#FFE5EC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF7A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg text-gray-800 mb-2">Exclusive Content</h3>
                  <p className="text-gray-600">
                    Access to premium resources designed to transform your intimate life.
                  </p>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#FFE5EC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF7A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg text-gray-800 mb-2">Expert Guidance</h3>
                  <p className="text-gray-600">
                    Professional advice and support from relationship specialists.
                  </p>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#FFE5EC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF7A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg text-gray-800 mb-2">Early Access</h3>
                  <p className="text-gray-600">
                    Be the first to try our new features and get special launch offers.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-lg text-gray-800 mb-2">When will you launch?</h3>
                  <p className="text-gray-600">
                    We're working hard to bring this to you soon. Join our waiting list to be notified of our exact launch date.
                  </p>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-lg text-gray-800 mb-2">What will be offered?</h3>
                  <p className="text-gray-600">
                    We're creating a comprehensive platform with resources, courses, and personalized guidance for intimate wellness.
                  </p>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-lg text-gray-800 mb-2">Will there be early bird pricing?</h3>
                  <p className="text-gray-600">
                    Yes! Waiting list members will receive exclusive discounts and special offers when we launch.
                  </p>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-lg text-gray-800 mb-2">How can I get updates?</h3>
                  <p className="text-gray-600">
                    After joining our waiting list, you'll receive email updates about our progress and launch details.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Final CTA */}
            <div className="mt-16 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Don't Miss Out
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Join our waiting list today and be the first to know when we launch. 
                Plus, get exclusive access to special offers and early bird pricing.
              </p>
              
              {!isSubmitted && (
                <Button 
                  onClick={() => document.getElementById('name')?.focus()}
                  className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white px-8 py-6 rounded-full text-lg"
                >
                  Join the Waiting List
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;
