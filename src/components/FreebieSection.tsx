
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FreebieSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-r from-blush-50 to-blush-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium mb-4 md:mb-5">Your Gift! Because Your Pleasure Matters</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-6 md:mb-8">
              Grab this FREE resource to start your journey to better intimacy and pleasure.
            </p>
            
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-sm mx-auto lg:mx-0">
              <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4 text-blush-600">Pleasure Mapping</h3>
              <p className="mb-5 md:mb-6 text-sm md:text-base">Discover Your Pleasure Spots – Identify what truly excites you.</p>
              <Link to="/freebie" className="btn-primary">
                Get Your Free Guide Now
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 lg:mt-0 order-first lg:order-last">
            <img 
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Couple intimacy" 
              className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreebieSection;
