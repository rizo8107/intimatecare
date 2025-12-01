import { useEffect, useState } from 'react';

const SocialProofBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const proofs = [
    { icon: "🔥", text: "Sarah from Mumbai just booked a 1:1 session", time: "2 min ago" },
    { icon: "💕", text: "Couple from Delhi downloaded the 69 Position Playbook", time: "5 min ago" },
    { icon: "✨", text: "Priya joined the Pleasure School Community", time: "8 min ago" },
    { icon: "🎯", text: "Rahul completed the 30-Day Challenge", time: "12 min ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FFE9EC] text-gray-800 py-3 overflow-hidden border-b border-pink-100">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="animate-bounce">{proofs[currentIndex].icon}</span>
          <span className="font-medium">{proofs[currentIndex].text}</span>
          <span className="text-gray-500">• {proofs[currentIndex].time}</span>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;
