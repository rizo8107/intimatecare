import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, Gift, Zap, Sparkles, MessageCircle, Heart, Phone, ShoppingBag } from 'lucide-react';
import { appendUtmsToUrl } from '@/utils/utm';
import { FEATURE_FLAGS } from '@/config/featureFlags';

// CONFIGURATION: Set to false to disable this sticky bar site-wide
const ENABLE_STICKY_BAR = false;

const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Show immediately
    setIsVisible(true);
  }, [isDismissed]);

  // Early return if bar is disabled
  if (!ENABLE_STICKY_BAR) return null;

  // Don't show on contact page, booking confirmation, or products page
  if (pathname === '/contact' || pathname === '/intimate-success' || pathname === '/products') return null;
  if (!isVisible || isDismissed) return null;

  const getCtaContent = () => {
    if (pathname === '/guide') {
      return {
        text: "The 69 Position Playbook",
        sub: "30% OFF Today + Free Bonus Guide!",
        link: "https://payments.cashfree.com/forms/69positionsebbok",
        image: "/69.jpg",
        color: "bg-slate-950"
      };
    }
    if (pathname === '/30-day-challenge') {
      return {
        text: "Join the 30-Day Challenge",
        sub: "Reignite your spark in just 30 days.",
        link: "https://payments.cashfree.com/forms/Break-The-Same-Sex-Routine",
        image: "/images/32 days v2.jpg",
        color: "bg-primary"
      };
    }
    // Only show New Year Bundle CTA if enabled
    if (FEATURE_FLAGS.ENABLE_NEW_YEAR_BUNDLE && pathname === '/newyear-bundle') {
      return {
        text: "The New Year Bundle",
        sub: "Complete Pleasure Ecosystem - 30% OFF!",
        link: "https://payments.cashfree.com/forms/newyear",
        image: "/bundle.jpg",
        color: "bg-slate-950"
      };
    }
    // Only show Intimate Talks CTA if enabled
    if (FEATURE_FLAGS.ENABLE_INTIMATE_TALKS && pathname === '/intimatetalks') {
      return {
        text: "Join Pleasure School",
        sub: "India's largest intimate wellness community.",
        link: "https://payments.cashfree.com/forms/intimatetalks",
        image: "/telegram.png",
        color: "bg-slate-900"
      };
    }
    if (pathname.includes('/instructor') || pathname === '/instructors') {
      return {
        text: "Book an Expert Session",
        sub: "Confidential 1:1 guidance with our specialists.",
        to: "/instructors",
        image: "/sessions.webp",
        color: "bg-emerald-600"
      };
    }
    // Default
    return {
      text: "Explore Our Store",
      sub: "Shop playbooks, courses & more.",
      to: "/products",
      image: "/hero_banner/single-hero.png",
      color: "bg-slate-900"
    };
  };

  const content = getCtaContent();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-[90] animate-slide-up">
      <div className={`${content.color} rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden relative backdrop-blur-md`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />

        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left - Icon & Text */}
            <div className="flex items-center gap-3 md:gap-4 text-white overflow-hidden">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-white/10 shrink-0 overflow-hidden border border-white/10">
                <img src={(content as any).image} alt={(content as any).text} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm md:text-lg font-black tracking-tight leading-tight truncate">
                  {content.text}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest truncate">
                  {content.sub}
                </span>
              </div>
            </div>

            {/* Right - CTA & Close */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {(content as any).to ? (
                <Link
                  to={(content as any).to}
                  className="group inline-flex items-center gap-2 bg-white text-slate-950 font-black px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-2xl text-[10px] md:text-sm transition-all duration-300 hover:scale-105 shadow-xl whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">View</span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <a
                  href={appendUtmsToUrl((content as any).link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white text-slate-950 font-black px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-2xl text-[10px] md:text-sm transition-all duration-300 hover:scale-105 shadow-xl whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Buy Now</span>
                  <span className="sm:hidden">Buy</span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
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

