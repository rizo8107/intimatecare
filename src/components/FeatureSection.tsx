import { Link } from 'react-router-dom';

const FeatureSection = () => {
  const features = [
    {
      title: "One-on-One Sessions",
      description: "Personalized audio sessions to address your specific intimacy and relationship concerns.",
      link: "/sessions",
      linkText: "Book Now",
      bgColor: "bg-[#FFE5EC]", // Light pink
      btnColor: "bg-[#FF9AB3]" // Soft pink
    },
    {
      title: "Intimate Talks Group",
      description: "Join our exclusive Telegram community for honest conversations about intimacy and relationships.",
      link: "/intimatetalks",
      linkText: "Join Group",
      bgColor: "bg-[#E5FFF1]", // Light mint
      btnColor: "bg-[#9ADCBF]" // Soft mint
    },
    {
      title: "69 Positions Guide",
      description: "Spice up your bedroom game with our expert-crafted guide to 69 exciting positions.",
      link: "/guide",
      linkText: "Get Guide",
      bgColor: "bg-[#F9E5FF]", // Light lavender
      btnColor: "bg-[#D9A6FF]" // Soft lavender
    },
    {
      title: "Free Resources",
      description: "Access free resources to start your journey to better intimacy and pleasure.",
      link: "/freebie",
      linkText: "Access Now",
      bgColor: "bg-[#FFF2E5]", // Light peach
      btnColor: "bg-[#FFD6A5]" // Soft peach
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-serif font-medium mb-8 md:mb-12 text-[#333333]">What I Offer</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${feature.bgColor} rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full`}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Title */}
                <h3 className="font-serif text-xl font-medium text-[#333333] mb-4">{feature.title}</h3>
                
                {/* Description */}
                <p className="text-[#555555] text-sm mb-auto">{feature.description}</p>
                
                {/* Footer with number badge and button */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="bg-[#333333] text-white text-xs px-2 py-1 rounded-full">
                    {index + 1}+
                  </div>
                  
                  <Link 
                    to={feature.link}
                    className={`${feature.btnColor} text-white font-medium px-4 py-2 rounded-full text-sm transition-all hover:opacity-90`}
                  >
                    {feature.linkText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
