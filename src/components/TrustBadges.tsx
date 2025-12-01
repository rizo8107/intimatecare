import { Shield, Lock, Award, Clock } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Your privacy is our priority"
    },
    {
      icon: Award,
      title: "Certified Expert",
      description: "USA-certified sex educator"
    },
    {
      icon: Lock,
      title: "Secure Sessions",
      description: "End-to-end encrypted"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Book at your convenience"
    }
  ];

  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-6 h-6 text-[#FF5A84]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">{badge.title}</h4>
                <p className="text-xs text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
