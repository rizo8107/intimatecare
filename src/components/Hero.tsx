
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative w-full">
      {/* Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/lovable-uploads/46de4cb1-d11f-40c5-9c1b-b1f6454a4abd.png" 
          alt="Khushboo Bist - Sex Educator and Intimacy Coach" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sand-950/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-black mb-3 md:mb-4 leading-tight">
            Your Go-To Sex Educator & Intimacy Coach
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blush-500 mb-4 md:mb-6 font-serif italic">
            Let's Make Pleasure a Priority!
          </p>
          <p className="text-sage-700 mb-6 md:mb-8 text-base md:text-lg">
            Sex education—something we all need, yet something we barely talk about. Why? 
            We were born from it. We experience it. We crave it. But when it comes to understanding 
            pleasure, intimacy, and connection, we hesitate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/sessions" className="bg-blush-400 hover:bg-blush-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-md font-medium transition-all text-sm md:text-base text-center">
              Let's Start
            </Link>
            <Link to="/about" className="bg-sand-100 hover:bg-sand-200 text-sage-700 py-2 md:py-3 px-4 md:px-6 rounded-md font-medium transition-all text-sm md:text-base text-center">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
