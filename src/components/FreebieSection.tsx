
import { Link } from 'react-router-dom';

const FreebieSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-r from-blush-50 to-blush-100">
      <div className="container-custom text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium mb-4 md:mb-5">Your Gift! Because Your Pleasure Matters</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
          Grab this FREE resource to start your journey to better intimacy and pleasure.
        </p>
        
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md inline-block max-w-sm">
          <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4 text-blush-600">Pleasure Mapping</h3>
          <p className="mb-5 md:mb-6 text-sm md:text-base">Discover Your Pleasure Spots – Identify what truly excites you.</p>
          <Link to="/freebie" className="btn-primary">
            Get Your Free Guide Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreebieSection;
