import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Youtube, Twitter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Sending footer newsletter subscription data...');
      
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/kb_newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: footerEmail,
          source: 'website_footer',
          subscriptionDate: new Date().toISOString(),
        }),
      });
      
      const data = await response.json().catch(() => null);
      console.log('Webhook response:', response.status, data);
      
      if (response.ok) {
        setFooterEmail('');
        toast({
          title: "Success!",
          description: "You've successfully subscribed to our newsletter.",
        });
      } else {
        console.error('Newsletter subscription failed:', response.status, data);
        throw new Error(`Failed to subscribe: ${response.status}`);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#FF7A9A] pt-16 pb-8 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-xl mb-4">Khushboo Bist</h3>
            <p className="text-white/80 mb-4">
              Your Go-To Sex Educator & Intimacy Coach – Let's Make Pleasure a Priority!
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="text-white/80 hover:text-white transition-colors">
                  Sessions
                </Link>
              </li>
              <li>
                <Link to="/intimatetalks" className="text-white/80 hover:text-white transition-colors">
                  Intimate Talks
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-white/80 hover:text-white transition-colors">
                  69 Positions Guide
                </Link>
              </li>
              <li>
                <Link to="/freebie" className="text-white/80 hover:text-white transition-colors">
                  Free Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-white" />
                <a href="mailto:contact@khushboobist.com" className="text-white/80 hover:text-white transition-colors">
                  contact@khushboobist.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-white" />
                <a href="tel:+919876543210" className="text-white/80 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Subscribe to Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-white text-[#FF7A9A] hover:bg-white/90 px-4 py-2 rounded-md font-medium transition-colors sm:whitespace-nowrap"
                  disabled={loading}
                >
                  {loading ? "..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
          <p> {new Date().getFullYear()} Khushboo Bist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
