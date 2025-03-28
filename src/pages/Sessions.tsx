
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Sessions = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sessionType, setSessionType] = useState('free');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Booking Request Received!",
        description: "We'll contact you shortly to confirm your session.",
      });
      
      // Reset the form
      setName('');
      setEmail('');
      setPhone('');
      setSessionType('free');
      setMessage('');
    }, 1000);
  };

  return (
    <div>
      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              Book a One-on-One Audio Session
            </h1>
            <p className="text-xl text-blush-600 max-w-2xl mx-auto">
              Struggling with something and need to talk? Let's figure it out together.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8 text-center">
              Sometimes, just talking about a problem can bring clarity. In our session, we'll explore 
              your concerns, see if we can find solutions, and if not—I'll simply listen, talk it out 
              with you, and offer suggestions. If needed, I'll also share my expertise in sex and 
              intimacy to help you navigate your challenges. Because sometimes, being heard is enough.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Free Session */}
              <div className="border border-sand-200 rounded-lg p-8 bg-white hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl mb-4">Free First Session</h3>
                <p className="text-3xl font-serif text-blush-600 mb-4">₹0</p>
                <ul className="space-y-2 mb-6 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    1 hour of open, non-judgmental Audio conversation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Discuss any topic you're comfortable with
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Get to know my coaching approach
                  </li>
                </ul>
              </div>
              
              {/* Regular Session */}
              <div className="border border-blush-200 rounded-lg p-8 bg-white shadow-md relative">
                <div className="absolute top-0 right-0 bg-blush-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Popular
                </div>
                <h3 className="font-serif text-xl mb-4">30-Minute Session</h3>
                <p className="text-3xl font-serif text-blush-600 mb-4">₹1,500</p>
                <ul className="space-y-2 mb-6 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    30 minutes of focused discussion
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Personalized advice and guidance
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Follow-up resource recommendations
                  </li>
                </ul>
              </div>
              
              {/* Student Session */}
              <div className="border border-sand-200 rounded-lg p-8 bg-white hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl mb-4">Student Special</h3>
                <p className="text-3xl font-serif text-blush-600 mb-4">₹500</p>
                <ul className="space-y-2 mb-6 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    30 minutes of focused guidance
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Help with porn addiction recovery
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Breaking unhealthy patterns
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Booking Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-serif text-2xl mb-6 text-center">Book Your Session Now</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  
                  <div>
                    <label htmlFor="sessionType" className="block text-sm font-medium text-muted-foreground mb-1">
                      Session Type
                    </label>
                    <select
                      id="sessionType"
                      value={sessionType}
                      onChange={(e) => setSessionType(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500"
                      required
                    >
                      <option value="free">Free First Session (1 hour)</option>
                      <option value="regular">30-Minute Session (₹1,500)</option>
                      <option value="student">Student Special (₹500)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                    Brief Description of Your Concerns
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500 min-h-[100px]"
                    placeholder="Briefly describe what you'd like to discuss in our session..."
                    required
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button 
                    type="submit"
                    className="btn-primary px-8"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Request Booking"}
                  </button>
                </div>
                
                <p className="text-xs text-center text-muted-foreground">
                  Upon submission, you'll receive an email with available time slots and payment instructions.
                  All sessions are conducted via audio call. Your privacy and confidentiality are guaranteed.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sessions;
