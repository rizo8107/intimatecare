
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, Instagram, Youtube, Twitter } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset the form
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div>
      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              Contact Me
            </h1>
            <p className="text-xl text-blush-600 max-w-2xl mx-auto">
              Got questions? Want a session? Let's talk!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="font-serif text-2xl mb-6">Send Me a Message</h2>
                
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
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500 min-h-[150px]"
                      placeholder="How can I help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit"
                      className="btn-primary w-full"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="text-blush-600 mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a href="mailto:contact@khushboobist.com" className="text-blush-600 hover:text-blush-800 transition-colors">
                        contact@khushboobist.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-blush-600 mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <a href="tel:+919876543210" className="text-blush-600 hover:text-blush-800 transition-colors">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Connect on Social Media</h3>
                  <div className="flex space-x-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-blush-100 hover:bg-blush-200 transition-colors p-3 rounded-full">
                      <Instagram size={24} className="text-blush-600" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-blush-100 hover:bg-blush-200 transition-colors p-3 rounded-full">
                      <Youtube size={24} className="text-blush-600" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blush-100 hover:bg-blush-200 transition-colors p-3 rounded-full">
                      <Twitter size={24} className="text-blush-600" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-blush-50 p-8 rounded-lg">
                <h2 className="font-serif text-2xl mb-4">Quick Links</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/sessions" className="text-blush-600 hover:text-blush-800 transition-colors">
                      Book a Session →
                    </a>
                  </li>
                  <li>
                    <a href="/intimatetalks" className="text-blush-600 hover:text-blush-800 transition-colors">
                      Join Intimate Talks →
                    </a>
                  </li>
                  <li>
                    <a href="/guide" className="text-blush-600 hover:text-blush-800 transition-colors">
                      Get 69 Positions Guide →
                    </a>
                  </li>
                  <li>
                    <a href="/freebie" className="text-blush-600 hover:text-blush-800 transition-colors">
                      Free Pleasure Mapping Guide →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
