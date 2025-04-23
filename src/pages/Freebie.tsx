import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Download, ExternalLink } from 'lucide-react';

const Freebie = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting form data to webhook...');
      
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/freebie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: 'website_freebie_form',
        }),
      });
      
      const data = await response.json().catch(() => null);
      console.log('Webhook response:', response.status, data);
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your free guides are ready below!",
        });
        
        // Track the form submission event with Meta Pixel
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Intimacy Guide',
            content_category: 'Freebie',
            value: 1.00,
            currency: 'INR'
          });
        }
        
        // Save the user's name for the success page
        setUserName(name);
        
        // Set submitted to true to show the success page
        setSubmitted(true);
        
        // Reset the form fields
        setEmail('');
        setName('');
        setPhone('');
      } else {
        console.error('Form submission failed:', response.status, data);
        throw new Error(`Failed to submit form: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Success page component with links to PDF files
  const SuccessPage = () => (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8 p-6 md:p-8">
      <div className="text-center mb-8">
        <div className="text-[#FF7A9A] text-sm font-medium mb-1">Thank You!</div>
        <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
          Your Free Resources Are Ready
        </h1>
        <p className="text-gray-700">
          {userName ? `Hi ${userName.split(' ')[0]}, thank` : 'Thank'} you for your interest! Here are your free guides.
        </p>
        <div className="mt-5 flex justify-center">
          <img 
            src="/freebie.webp" 
            alt="Intimacy Guide" 
            className="w-48 h-auto rounded-lg shadow-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/freebie.webp/400x400";
              target.onerror = null;
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pleasure Map PDF */}
        <div className="bg-[#F9F9FB] rounded-xl p-6 border border-[#F0F0F5] hover:shadow-md transition-shadow flex flex-col h-full">
          <h3 className="font-serif text-lg font-medium text-gray-800 mb-3">Pleasure Map</h3>
          <p className="text-gray-700 text-sm mb-4 flex-grow">
            Discover your pleasure zones and enhance your intimate experiences.
          </p>
          <a 
            href="https://drive.google.com/file/d/1a7MS8Fr76ulCY5fk1VqtNq7UnG6MroEm/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2 px-4 bg-[#FF7A9A] hover:bg-[#FF5A84] text-white rounded-full text-center font-medium transition-colors text-sm"
          >
            <Download size={16} className="mr-2" />
            View PDF
          </a>
        </div>
        
        {/* Female Sensitivity PDF */}
        <div className="bg-[#F9F9FB] rounded-xl p-6 border border-[#F0F0F5] hover:shadow-md transition-shadow flex flex-col h-full">
          <h3 className="font-serif text-lg font-medium text-gray-800 mb-3">Female Sensitivity</h3>
          <p className="text-gray-700 text-sm mb-4 flex-grow">
            Understand female sensitivity patterns for more fulfilling intimate connections.
          </p>
          <a 
            href="https://drive.google.com/file/d/1kPbLfZwUuy3HcQaPnevbRODRa297XGiH/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2 px-4 bg-[#FF7A9A] hover:bg-[#FF5A84] text-white rounded-full text-center font-medium transition-colors text-sm"
          >
            <Download size={16} className="mr-2" />
            View PDF
          </a>
        </div>
        
        {/* Consent is Sexy PDF */}
        <div className="bg-[#F9F9FB] rounded-xl p-6 border border-[#F0F0F5] hover:shadow-md transition-shadow flex flex-col h-full">
          <h3 className="font-serif text-lg font-medium text-gray-800 mb-3">Consent is Sexy</h3>
          <p className="text-gray-700 text-sm mb-4 flex-grow">
            Learn how consent enhances intimacy and builds trust in relationships.
          </p>
          <a 
            href="https://drive.google.com/file/d/12fhOdUDIN-BXBSb6uwHvyocUyuzonLpw/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2 px-4 bg-[#FF7A9A] hover:bg-[#FF5A84] text-white rounded-full text-center font-medium transition-colors text-sm"
          >
            <Download size={16} className="mr-2" />
            View PDF
          </a>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-700 mb-4">
          We've also sent these links to your email for future reference.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="inline-block py-2 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-center font-medium transition-colors"
        >
          Back to Form
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFE5EC]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          {submitted ? (
            <SuccessPage />
          ) : (
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image and Form - Appears first on mobile */}
                <div className="order-first md:order-last p-6 md:p-8 bg-[#FAFAFA]">
                  <div className="w-full max-w-sm mx-auto mb-6">
                    <div className="relative">
                      <div className="bg-[#FFE5EC] rounded-xl p-4 mb-4 text-center">
                        <p className="text-[#FF7A9A] font-medium uppercase text-sm tracking-wide">FREE RESOURCE</p>
                      </div>
                      <img 
                        src="/freebie.webp" 
                        alt="Intimacy Guide" 
                        className="w-full h-auto rounded-2xl shadow-sm"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/freebie.webp/400x400";
                          target.onerror = null;
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#F0F0F5]">
                    <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                      <h2 className="font-serif text-xl text-center mb-4">Get Your Free Guide</h2>
                      <div className="flex justify-center my-4">
                        <div className="bg-[#FFE5EC] px-6 py-3 rounded-full">
                          <span className="text-2xl font-serif text-[#FF7A9A] font-medium">FREE</span>
                        </div>
                      </div>
                      <p className="text-center text-gray-700 text-sm">
                        Instant access • No credit card required • Valuable insights
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Optional, but recommended for better communication
                        </p>
                      </div>
                      
                      <div className="pt-4">
                        <button 
                          type="submit"
                          className="w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Me The Free Guide"}
                        </button>
                      </div>
                      
                      <p className="text-xs text-center text-gray-500 mt-2">
                        By submitting this form, you'll receive your free Intimacy Guide via email.
                        You'll also be subscribed to our newsletter with relationship tips and resources.
                        You can unsubscribe at any time.
                      </p>
                    </form>
                  </div>
                </div>
                
                {/* Content - Appears second on mobile */}
                <div className="order-last md:order-first p-6 md:p-8 flex flex-col md:border-r border-[#F0F0F5]">
                  {/* Title and Intro */}
                  <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                    <div className="text-[#FF7A9A] text-sm font-medium mb-1">Exclusive Offer</div>
                    <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                      Your Free Intimacy Guide
                    </h1>
                    <p className="text-gray-700">
                      Essential knowledge for building healthy relationships and understanding intimacy.
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                    <h2 className="text-xl font-serif font-medium text-gray-800 mb-3">What's Inside?</h2>
                    <p className="text-gray-700 mb-4">
                      This comprehensive guide provides practical insights and advice to help you navigate
                      the complexities of intimate relationships. Whether you're single, dating, or in a
                      long-term partnership, you'll find valuable information to enhance your connection.
                    </p>
                    <p className="text-gray-700">
                      Created with care and backed by research, this guide addresses common challenges
                      and offers solutions for building stronger, more fulfilling relationships.
                    </p>
                  </div>

                  {/* Benefits Section */}
                  <div>
                    <h2 className="text-xl font-serif font-medium text-gray-800 mb-3">Why This Guide Matters</h2>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span>Build deeper emotional connections</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span>Improve communication about sensitive topics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span>Understand consent and boundaries</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span>Create more fulfilling relationships</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span>Learn practical strategies for relationship growth</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Section */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
                What Others Are Saying
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "The Intimacy Guide provided valuable insights that transformed my relationship.
                    I've learned how to communicate better and build a deeper connection with my partner."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Rahul, 29</p>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "This guide helped me understand my own needs better and express them to my partner.
                    Our relationship has improved significantly since applying these principles."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Priya, 31</p>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "I was struggling with setting boundaries in my relationship. This guide gave me
                    practical tools to address this issue in a healthy, constructive way."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Amit, 27</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="/guide" className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors">
                  69 Position Guide
                </a>
                <a href="/sessions" className="bg-white hover:bg-gray-50 text-[#FF7A9A] border border-[#FF7A9A] py-3 px-6 rounded-full text-center font-medium transition-colors">
                  Book a Session
                </a>
                <a href="/intimatetalks" className="bg-[#FFE5EC] hover:bg-[#FFD6E3] text-[#FF7A9A] py-3 px-6 rounded-full text-center font-medium transition-colors">
                  Join Intimate Talks
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Freebie;
