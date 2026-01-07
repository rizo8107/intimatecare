import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Youtube, Linkedin, Facebook, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      if (response.ok) {
        setFooterEmail('');
        toast({
          title: "Success! 🎉",
          description: "You've been added to our private community guide.",
        });
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
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
    <footer className="bg-slate-950 pt-24 pb-12 text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block group mb-8">
              <span className="text-3xl font-black tracking-tighter text-white transition-colors group-hover:text-primary">
                KHUSHBOO<span className="text-primary">.BIST</span>
              </span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed mb-10 max-w-sm">
              Empowering couples and individuals to reignite passion and deepen their intimate connection through expert-led education and support.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/khushboobist__/", label: "Instagram" },
                { icon: Youtube, href: "https://www.youtube.com/channel/UClzuIsSjP2aAYw6rCqE_8CQ", label: "YouTube" },
                { icon: Facebook, href: "https://www.facebook.com/p/Sex-ed-with-Khushboo-100088380176574/", label: "Facebook" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/khushboo-bist-2a294b27a/", label: "LinkedIn" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-8">Explore</h3>
              <ul className="space-y-4">
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "/about" },
                  { label: "Sessions", to: "/sessions" },
                  { label: "Playbooks", to: "/guide" },
                  { label: "Free Gifts", to: "/freebie" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="text-slate-400 font-bold hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-8">Support</h3>
              <ul className="space-y-4">
                {[
                  { label: "Contact Us", to: "/contact" },
                  { label: "Terms", to: "/terms-conditions" },
                  { label: "Privacy", to: "/privacy-policy" },
                  { label: "Refunds", to: "/cancellation-refund" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="text-slate-400 font-bold hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-8">Private Newsletter</h3>
            <p className="text-slate-400 font-medium mb-8">
              Join 10,000+ others receiving weekly tips on intimacy and connection.
            </p>
            <form onSubmit={handleSubscribe} className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                className="w-full h-14 pl-6 pr-16 rounded-2xl bg-white/5 border border-white/10 text-white font-bold placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 bg-primary rounded-xl text-white hover:bg-rose-600 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "..." : <Send size={18} />}
              </button>
            </form>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">100% Confidential Guarantee</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-bold text-sm">
            © {new Date().getFullYear()} Khushboo Bist. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-500 font-bold text-sm">
            <span>Made with</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-primary text-lg">♥</span>
            </div>
            <span>for your connection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

