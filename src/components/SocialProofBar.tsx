import { useEffect, useState } from 'react';
import { ShoppingCart, Users, Heart, Zap } from 'lucide-react';

const SocialProofBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const proofs = [
    { icon: <Zap className="w-3.5 h-3.5 text-yellow-400" />, text: "Sarah from Mumbai just booked a 1:1 session", time: "2 min ago" },
    { icon: <ShoppingCart className="w-3.5 h-3.5 text-primary" />, text: "Couple from Delhi downloaded the 69 Position Playbook", time: "5 min ago" },
    { icon: <Heart className="w-3.5 h-3.5 text-primary" />, text: "Priya joined the Intimate Talks", time: "8 min ago" },
    { icon: <Users className="w-3.5 h-3.5 text-emerald-400" />, text: "Rahul completed the 30-Day Challenge", time: "12 min ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 text-white py-2.5 overflow-hidden relative z-[40]">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50" />
      <div className="container-custom relative">
        <div className="flex items-center justify-center gap-4 text-[13px] font-bold tracking-tight">
          <div className="flex items-center gap-2 animate-fade-in-right">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
              {proofs[currentIndex].icon}
            </div>
            <span className="text-white/90">{proofs[currentIndex].text}</span>
          </div>
          <div className="h-3 w-[1px] bg-white/20" />
          <span className="text-white/40 font-semibold uppercase text-[10px] tracking-widest">{proofs[currentIndex].time}</span>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SocialProofBar;

