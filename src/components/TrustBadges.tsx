import { Shield, Lock, Award, Clock } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Privacy is our priority"
    },
    {
      icon: Award,
      title: "Certified Expert",
      description: "USA-certified educator"
    },
    {
      icon: Lock,
      title: "Secure Sessions",
      description: "End-to-end encrypted"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Book when you're ready"
    }
  ];

  return (
    <section className="py-10 bg-slate-50/50 border-y border-slate-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-4 group justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">{badge.title}</h4>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

