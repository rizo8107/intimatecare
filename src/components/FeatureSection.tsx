
import { Link } from 'react-router-dom';

const FeatureSection = () => {
  const features = [
    {
      title: "One-on-One Sessions",
      description: "Personalized audio sessions to address your specific intimacy and relationship concerns.",
      link: "/sessions",
      linkText: "Book Now"
    },
    {
      title: "Intimate Talks Group",
      description: "Join our exclusive Telegram community for honest conversations about intimacy and relationships.",
      link: "/intimatetalks",
      linkText: "Join Group"
    },
    {
      title: "69 Positions Guide",
      description: "Spice up your bedroom game with our expert-crafted guide to 69 exciting positions.",
      link: "/guide",
      linkText: "Get Guide"
    },
    {
      title: "Free Resources",
      description: "Access free resources to start your journey to better intimacy and pleasure.",
      link: "/freebie",
      linkText: "Access Now"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-center section-title mb-12">What I Offer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-sand-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-serif text-xl mb-3 text-blush-600">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Link 
                to={feature.link}
                className="text-blush-600 font-medium hover:text-blush-800 transition-colors"
              >
                {feature.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
