
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Guide = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Purchase Successful!",
        description: "Check your email for the download link to your 69 Position E-Guide.",
      });
      
      // Reset the form
      setEmail('');
      setName('');
      setPhone('');
    }, 1000);
  };

  return (
    <div>
      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              69 Position E-Guide
            </h1>
            <p className="text-xl text-blush-600 max-w-2xl mx-auto">
              Spice up your bedroom game with my expert-crafted guide
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex justify-center mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg rotate-3 max-w-sm">
                  <div className="aspect-[3/4] bg-gradient-to-br from-blush-400 to-blush-600 rounded-md flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <h3 className="font-serif text-3xl mb-3">69 Position</h3>
                      <h4 className="font-serif text-4xl mb-6">E-Guide</h4>
                      <p className="text-md mb-8">The ultimate guide to spice up your intimate moments</p>
                      <div className="inline-block border-2 border-white rounded-full px-6 py-2">
                        By Khushboo Bist
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="font-serif text-xl mb-4">What You'll Discover in this Guide:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Step-by-step instructions for 69 exciting sex positions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    How to adjust each position to fit your unique bodies
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Secrets to deeper connection & pleasure during penetration
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    How to move your body, hips, arms & legs for maximum satisfaction
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Tips on foreplay & oral play to take pleasure to new heights
                  </li>
                </ul>
              </div>
              
              <div className="bg-blush-50 p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-4">Why This Guide Is Different:</h3>
                <p className="mb-4 text-muted-foreground">
                  Unlike generic position guides, this resource is created with real bodies and real pleasure in mind. 
                  Each position comes with variations for different body types, mobility levels, and experience.
                </p>
                <p className="text-muted-foreground">
                  I've included practical tips based on real feedback from couples who have successfully 
                  incorporated these positions into their intimate lives.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="font-serif text-2xl text-center">Get Your Copy Today!</h2>
                  <div className="flex justify-center my-4">
                    <div className="bg-blush-50 px-6 py-3 rounded-full">
                      <span className="text-sm line-through text-muted-foreground mr-2">₹2,499</span>
                      <span className="text-2xl font-serif text-blush-600 font-medium">₹1,499</span>
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground mb-6">
                    One-time payment • Instant digital download • PDF format
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      Your Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="btn-primary w-full text-lg py-4"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Buy Now"}
                    </button>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    After purchase, you'll receive an email with the download link for your guide.
                    Your information is securely processed and will never be shared with third parties.
                  </p>
                </form>
                
                <div className="mt-8 pt-6 border-t border-sand-100">
                  <h3 className="font-serif text-lg mb-4 text-center">What Readers Are Saying</h3>
                  
                  <div className="bg-sand-50 p-4 rounded-lg mb-4">
                    <p className="italic text-muted-foreground mb-2">
                      "This guide transformed our bedroom experience! The instructions are clear, 
                      the illustrations are helpful, and the tips really work. Worth every penny!"
                    </p>
                    <p className="text-right text-sm font-medium">— Anonymous Couple</p>
                  </div>
                  
                  <div className="bg-sand-50 p-4 rounded-lg">
                    <p className="italic text-muted-foreground mb-2">
                      "I bought this for my partner and me to try something new. We've had so much 
                      fun exploring these positions together. It's rekindled our passion!"
                    </p>
                    <p className="text-right text-sm font-medium">— Happy Reader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;
