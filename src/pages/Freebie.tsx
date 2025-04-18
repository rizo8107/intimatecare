import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Freebie = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

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
          description: "Check your email for your free Pleasure Mapping guide.",
        });
        
        // Reset the form
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

  return (
    <div className="bg-[#FFE5EC]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="text-[#FF7A9A] text-sm font-medium mb-1">Exclusive Offer</div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-gray-800 mb-3">
                  Your Free Gift
                </h1>
                <p className="text-gray-700 font-medium">
                  Because your pleasure matters!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Left Column - Guide Info */}
                <div className="bg-gradient-to-br from-[#FF7A9A] to-[#FF5A84] rounded-xl p-6 md:p-8 text-white flex flex-col">
                  <h2 className="font-serif text-2xl md:text-3xl mb-4">Pleasure Mapping</h2>
                  <p className="text-white/90 mb-6">
                    Discover Your Pleasure Spots – Identify what truly excites you.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Learn to identify your pleasure zones</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Understand your unique sensitivity patterns</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Communicate your desires effectively</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Enhance self-pleasure and partner intimacy</span>
                    </li>
                  </ul>
                  
                  <div className="mt-auto">
                    <div className="inline-block bg-white/20 rounded-full px-6 py-2 text-sm font-medium">
                      Completely Free!
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Form */}
                <div className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-medium text-gray-800 mb-6">Get Your Free Guide Now</h3>
                  
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
                    
                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Me The Free Guide"}
                      </button>
                    </div>
                    
                    <p className="text-xs text-center text-gray-500 mt-2">
                      By submitting this form, you'll receive your free Pleasure Mapping guide via email.
                      You'll also be subscribed to our newsletter with intimacy tips and resources.
                      You can unsubscribe at any time.
                    </p>
                  </form>
                  
                  <div className="mt-8 pt-6 border-t border-[#F0F0F5]">
                    <h4 className="font-medium mb-3 text-center text-gray-800">What Others Found</h4>
                    
                    <div className="bg-white p-4 rounded-lg border border-[#F0F0F5] shadow-sm">
                      <p className="italic text-gray-600 text-sm">
                        "The Pleasure Mapping guide helped me discover sensations I never knew existed.
                        It's changed how I view my own body and improved intimacy with my partner."
                      </p>
                      <div className="flex items-center mt-3">
                        <div className="w-6 h-6 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF7A9A] text-xs font-bold mr-2">S</div>
                        <span className="text-xs font-medium text-gray-700">Sarah, 32</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-6 md:p-8 text-center">
            <h2 className="font-serif text-xl md:text-2xl font-medium text-gray-800 mb-4">Want More Resources?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              This is just the beginning of your journey to better intimacy and pleasure. 
              Explore our other offerings to deepen your understanding and enhance your experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
      </section>
    </div>
  );
};

export default Freebie;
