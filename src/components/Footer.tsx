
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sand-100 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-xl mb-4">Khushboo Bist</h3>
            <p className="text-muted-foreground mb-4">
              Your Go-To Sex Educator & Intimacy Coach – Let's Make Pleasure a Priority!
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blush-600 hover:text-blush-800 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-blush-600 hover:text-blush-800 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blush-600 hover:text-blush-800 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-blush-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-blush-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="text-muted-foreground hover:text-blush-600 transition-colors">
                  Sessions
                </Link>
              </li>
              <li>
                <Link to="/intimatetalks" className="text-muted-foreground hover:text-blush-600 transition-colors">
                  Intimate Talks
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-muted-foreground hover:text-blush-600 transition-colors">
                  69 Positions Guide
                </Link>
              </li>
              <li>
                <Link to="/freebie" className="text-muted-foreground hover:text-blush-600 transition-colors">
                  Free Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-blush-600" />
                <a href="mailto:contact@khushboobist.com" className="text-muted-foreground hover:text-blush-600 transition-colors">
                  contact@khushboobist.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-blush-600" />
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-blush-600 transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Subscribe to Newsletter</h4>
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500"
                  required
                />
                <button type="submit" className="btn-primary sm:whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-sand-200 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Khushboo Bist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
