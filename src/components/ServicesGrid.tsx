import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, BookOpen, Heart, Video, MessageCircle } from 'lucide-react';

const ServicesGrid = () => {
  const services = [
    {
      icon: Heart,
      title: "Exclusive 1:1 Coaching",
      description: "Deep, personalized sessions with Khushboo to address your unique intimacy challenges and goals.",
      price: "From ₹2,500",
      link: "/sessions",
      color: "from-pink-500 to-rose-600",
      badge: "Most Popular"
    },
    {
      icon: Users,
      title: "Student Support Session",
      description: "Compassionate, judgment-free guidance for students navigating relationships and sexuality.",
      price: "Special Pricing",
      link: "https://topmate.io/intimatecare/1823535",
      external: true,
      color: "from-sky-500 to-blue-600",
    },
    {
      icon: BookOpen,
      title: "69 Position Playbook",
      description: "Expert-crafted guide with illustrated positions to bring excitement and variety to your bedroom.",
      price: "₹699",
      originalPrice: "₹999",
      link: "/guide",
      color: "from-violet-500 to-purple-600",
      badge: "Bestseller"
    },
    {
      icon: Sparkles,
      title: "30-Day Pleasure Challenge",
      description: "Daily prompts and activities designed to reignite passion and deepen your connection.",
      price: "₹599",
      originalPrice: "₹999",
      link: "/30-day-challenge",
      color: "from-amber-400 to-orange-500",
      badge: "Highly Rated"
    },
    {
      icon: MessageCircle,
      title: "Intimate Talks",
      description: "Join our exclusive Telegram group for ongoing support, discussions, and expert Q&A sessions.",
      price: "Free to Join",
      link: "/intimatetalks",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <section className="section-padding bg-slate-50/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <span className="badge-premium mb-6">Explore Our Path</span>
          <h2 className="section-title">
            Everything You Need for a
            <span className="text-gradient"> Fulfilling Connection</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            Find the perfect path to deeper pleasure through personalized coaching or self-paced digital guides.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const cardContent = (
              <div className="card-modern h-full flex flex-col group p-8 lg:p-10 relative overflow-hidden">
                {/* Accent Background */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${service.color} opacity-[0.03] group-hover:opacity-10 rounded-full transition-opacity duration-500`} />

                {/* Badge */}
                {service.badge && (
                  <div className={`absolute top-6 right-8 px-4 py-1.5 bg-gradient-to-r ${service.color} text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg shadow-primary/20`}>
                    {service.badge}
                  </div>
                )}

                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-[1.25rem] bg-gradient-to-br ${service.color} p-[1px] mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <div className="w-full h-full bg-white rounded-[1.2rem] flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 font-medium mb-10 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom Bar */}
                <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Pricing</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-slate-900 tracking-tight">{service.price}</span>
                      {service.originalPrice && (
                        <span className="text-sm font-bold text-slate-300 line-through">{service.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1 shadow-sm`}>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );

            return service.external ? (
              <a
                key={index}
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                key={index}
                to={service.link}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

