import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, Gift, Zap, Sparkles, MessageCircle, Heart, Phone } from 'lucide-react';

const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 800px
      if (window.scrollY > 800 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  // Don't show on contact page or booking confirmation
  if (pathname === '/contact' || pathname === '/intimate-success') return null;
  if (!isVisible || isDismissed) return null;

  const getCtaContent = () => {
    if (pathname === '/guide') {
      return {
        text: "The 69 Position Playbook",
        sub: "30% OFF Today + Free Bonus Guide!",
        link: "https://payments.cashfree.com/forms/69pp",
        icon: <Zap className="w-5 h-5" />,
        color: "bg-slate-950"
      };
    }
    if (pathname === '/30-day-challenge') {
      return {
        text: "Join the 30-Day Challenge",
        sub: "Reignite your spark in just 30 days.",
        to: "/30-day-challenge",
        icon: <Sparkles className="w-5 h-5" />,
        color: "bg-primary"
      };
    }
    if (pathname === '/newyear-bundle') {
      return {
        text: "The New Year Bundle",
        sub: "Complete Pleasure Ecosystem - 30% OFF!",
        link: "https://payments.cashfree.com/forms/newyear",
        icon: <Gift className="w-5 h-5" />,
        color: "bg-slate-950"
      };
    }
    if (pathname === '/intimatetalks') {
      return {
        text: "Join Pleasure School",
        sub: "India's largest intimate wellness community.",
        to: "/intimatetalks",
        icon: <MessageCircle className="w-5 h-5" />,
        color: "bg-slate-900"
      };
    }
    if (pathname.includes('/instructor') || pathname === '/instructors') {
      return {
        text: "Book an Expert Session",
        sub: "Confidential 1:1 guidance with our specialists.",
        to: "/instructors",
        icon: <Heart className="w-5 h-5" />,
        color: "bg-emerald-600"
      };
    }
    // Default
    return {
      text: "Book Discovery Call",
      sub: "Free 15-min consultation with Khushboo.",
      to: "/sessions",
      icon: <Phone className="w-5 h-5" />,
      color: "bg-primary"
    };
  };

  const content = getCtaContent();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-[90] animate-slide-up">
      <div className={`${content.color} rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden relative backdrop-blur-md`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />

        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left - Icon & Text */}
            <div className="flex items-center gap-4 text-white">
              <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-white/10 items-center justify-center">
                {content.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight leading-none mb-1">
                  {content.text}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-white/60 uppercase tracking-widest">
                  {content.sub}
                </span>
              </div>
            </div>

            {/* Right - CTA & Close */}
            <div className="flex items-center gap-3">
              {content.to ? (
                <Link
                  to={content.to}
                  className="group inline-flex items-center gap-2 bg-white text-slate-950 font-black px-5 sm:px-8 py-3 rounded-2xl text-sm transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white text-slate-950 font-black px-5 sm:px-8 py-3 rounded-2xl text-sm transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Buy Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              <button
                onClick={() => setIsDismissed(true)}
                className="p-2 text-white/40 hover:text-white/80 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translate(-50%, 100%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default StickyCtaBar;

