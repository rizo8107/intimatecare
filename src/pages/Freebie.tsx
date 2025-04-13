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
    <div>
      <section className="bg-gradient-to-b from-blush-50 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              Your Free Gift
            </h1>
            <p className="text-xl text-blush-600 max-w-2xl mx-auto">
              Because your pleasure matters!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gradient-to-br from-blush-400 to-blush-600 p-8 md:p-12 text-white flex flex-col justify-center">
                <h2 className="font-serif text-3xl mb-4">Pleasure Mapping</h2>
                <p className="text-lg mb-6">
                  Discover Your Pleasure Spots – Identify what truly excites you.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Learn to identify your pleasure zones
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Understand your unique sensitivity patterns
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Communicate your desires effectively
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Enhance self-pleasure and partner intimacy
                  </li>
                </ul>
                <div className="mt-auto">
                  <div className="inline-block border-2 border-white rounded-full px-6 py-2 text-sm">
                    Completely Free!
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-serif text-2xl mb-6">Get Your Free Guide Now</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500"
                      placeholder="Enter your phone number"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Optional, but recommended for better communication
                    </p>
                  </div>
                  
                  <div>
                    <button 
                      type="submit"
                      className="btn-primary w-full"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Me The Free Guide"}
                    </button>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you'll receive your free Pleasure Mapping guide via email.
                    You'll also be subscribed to our newsletter with intimacy tips and resources.
                    You can unsubscribe at any time.
                  </p>
                </form>
                
                <div className="mt-8 pt-6 border-t border-sand-100">
                  <h4 className="font-medium mb-3 text-center">What Others Found</h4>
                  
                  <div className="bg-sand-50 p-3 rounded-lg text-sm">
                    <p className="italic text-muted-foreground">
                      "The Pleasure Mapping guide helped me discover sensations I never knew existed.
                      It's changed how I view my own body and improved intimacy with my partner."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl mb-4">Want More Resources?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              This is just the beginning of your journey to better intimacy and pleasure. 
              Explore our other offerings to deepen your understanding and enhance your experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/guide" className="btn-primary">
                69 Position Guide
              </a>
              <a href="/sessions" className="btn-accent">
                Book a Session
              </a>
              <a href="/intimatetalks" className="btn-secondary">
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
