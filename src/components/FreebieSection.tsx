
import { Link } from 'react-router-dom';

const FreebieSection = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-blush-50 to-blush-100">
      <div className="container-custom text-center">
        <h2 className="section-title">Your Gift! Because Your Pleasure Matters</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Grab this FREE resource to start your journey to better intimacy and pleasure.
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-md inline-block">
          <h3 className="font-serif text-2xl mb-4 text-blush-600">Pleasure Mapping</h3>
          <p className="mb-6">Discover Your Pleasure Spots – Identify what truly excites you.</p>
          <Link to="/freebie" className="btn-primary">
            Get Your Free Guide Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreebieSection;
