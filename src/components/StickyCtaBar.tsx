import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Gift } from 'lucide-react';

const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
      <div className="bg-[#f491c2] shadow-2xl">
        <div className="container-custom py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left - Message */}
            <div className="flex items-center gap-3 text-white">
              <Gift className="w-5 h-5 hidden sm:block" />
              <span className="text-sm sm:text-base font-medium">
                <span className="hidden sm:inline">🔥 Limited Time: </span>
                Free Discovery Call + Bonus Guide
              </span>
            </div>

            {/* Right - CTA & Close */}
            <div className="flex items-center gap-3">
              <Link
                to="/sessions"
                className="group inline-flex items-center gap-2 bg-white text-[#FF5A84] font-semibold px-4 sm:px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300"
              >
                Book Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-2 text-white/80 hover:text-white transition-colors"
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
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StickyCtaBar;
