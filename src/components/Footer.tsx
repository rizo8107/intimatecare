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
              <a href="https://www.instagram.com/khushboobist__/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" title="Follow Khushboo Bist on Instagram" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UClzuIsSjP2aAYw6rCqE_8CQ" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" title="Subscribe to Khushboo Bist on YouTube" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://www.facebook.com/p/Sex-ed-with-Khushboo-100088380176574/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" title="Follow Sex-ed with Khushboo on Facebook" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/khushboo-bist-2a294b27a/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" title="Connect with Khushboo Bist on LinkedIn" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
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
                <a href="mailto:teamkhushboobist@gmail.com" className="text-white/80 hover:text-white transition-colors">
                  teamkhushboobist@gmail.com
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
          <p className="mb-4"> {new Date().getFullYear()} Khushboo Bist. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/terms-conditions" className="text-white/80 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link to="/cancellation-refund" className="text-white/80 hover:text-white transition-colors">
              Cancellation & Refund
            </Link>
            <span>|</span>
            <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
