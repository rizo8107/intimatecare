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
      gradient: "bg-pink-500",
      bgGradient: "bg-[#FFE9EC]",
      badge: "Most Popular"
    },
    {
      icon: Users,
      title: "Student Support Session",
      description: "Compassionate, judgment-free guidance for students navigating relationships and sexuality.",
      price: "Special Pricing",
      link: "https://topmate.io/intimatecare/1823535",
      external: true,
      gradient: "bg-sky-500",
      bgGradient: "bg-[#E6F4FF]"
    },
    {
      icon: BookOpen,
      title: "69 Position Playbook",
      description: "Expert-crafted guide with illustrated positions to bring excitement and variety to your bedroom.",
      price: "₹699",
      originalPrice: "₹999",
      link: "/guide",
      gradient: "bg-violet-500",
      bgGradient: "bg-[#EFE6FF]",
      badge: "Bestseller"
    },
    {
      icon: Sparkles,
      title: "30-Day Pleasure Challenge",
      description: "Daily prompts and activities designed to reignite passion and deepen your connection.",
      price: "₹599",
      originalPrice: "₹999",
      link: "/30-day-challenge",
      gradient: "bg-amber-500",
      bgGradient: "bg-[#FFF3E0]",
      badge: "New"
    },
    {
      icon: MessageCircle,
      title: "Pleasure School Community",
      description: "Join our exclusive Telegram group for ongoing support, discussions, and expert Q&A sessions.",
      price: "Free to Join",
      link: "/intimatetalks",
      gradient: "bg-emerald-500",
      bgGradient: "bg-[#E5F6F0]"
    },
    {
      icon: Video,
      title: "Live Masterclasses",
      description: "Monthly live sessions covering trending topics in intimacy, pleasure, and relationships.",
      price: "Included in Community",
      link: "/webinars",
      gradient: "bg-indigo-500",
      bgGradient: "bg-[#E8ECFF]"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFF7EC]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-[#FF5A84] rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
            Everything You Need for a
            <span className="text-[#FF7A9A]"> Fulfilling Intimate Life</span>
          </h2>
          <p className="text-lg text-gray-600">
            From personalized coaching to self-paced resources, find the perfect path to deeper connection and pleasure.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const cardClassName = `group relative ${service.bgGradient} rounded-3xl p-6 lg:p-8 border border-gray-100 hover:border-pink-200 hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden`;
            
            const cardContent = (
              <>
                {/* Badge */}
                {service.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 ${service.gradient} text-white text-xs font-bold rounded-full`}>
                    {service.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#FF5A84] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-lg font-bold text-gray-800">{service.price}</span>
                    {service.originalPrice && (
                      <span className="ml-2 text-sm text-gray-400 line-through">{service.originalPrice}</span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-[#FF7A9A] transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </>
            );

            if (service.external) {
              return (
                <a
                  key={index}
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <Link key={index} to={service.link} className={cardClassName}>
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
