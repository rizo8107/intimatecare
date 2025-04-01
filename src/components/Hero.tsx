import { Link } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import useIsTablet from "../hooks/useIsTablet";

export default function Hero() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  return (
    <section className="relative w-full">
      <div className="container-custom pb-0">
        {/* Two column layout for desktop, stacked for mobile */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Left column - Text content */}
          <div className="w-full md:w-1/2 order-1 py-8 md:py-12 lg:py-16">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#853f92] mb-3 md:mb-4 leading-tight">
                Your Go-To Sex Educator & Intimacy Coach
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-[#984444] mb-4 md:mb-6 font-serif italic">
                Let's Make Pleasure a Priority!
              </p>
              <p className="text-[#444444] mb-6 md:mb-8 md:text-lg max-w-prose">
                Sex education—something we all need, yet something we barely talk about. Why? 
                We were born from it. We experience it
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8">
                <Link to="/sessions" className="btn-primary text-center px-6 py-3 text-base md:text-lg">
                  Let's Start
                </Link>
                <Link to="/about" className="btn-accent text-center px-6 py-3 text-base md:text-lg">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width image at bottom with no spacing */}
      <div className="w-full order-2 md:absolute md:right-0 md:bottom-0 md:top-0 md:w-1/2 h-[450px] sm:h-[550px] md:h-full">
        <img 
          src="/hero_banner/single-hero.png" 
          alt="Khushboo Bist - Sex Educator and Intimacy Coach" 
          className="w-full h-full object-cover object-top sm:object-center"
        />
      </div>
      
      {/* Add spacer for mobile view to ensure proper layout */}
      <div className="block md:hidden h-[100px]"></div>
    </section>
  );
}
