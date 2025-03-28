
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
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-serif font-medium mb-8 md:mb-12">What I Offer</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-sand-50 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3 text-blush-600">{feature.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base mb-4">{feature.description}</p>
              <Link 
                to={feature.link}
                className="text-blush-600 font-medium hover:text-blush-800 transition-colors text-sm md:text-base"
              >
                {feature.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 md:mt-16 lg:mt-20 container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1596560548464-f010549e45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Couple holding hands over water" 
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1551978129-b73f45d132eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Man kissing woman's forehead" 
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
