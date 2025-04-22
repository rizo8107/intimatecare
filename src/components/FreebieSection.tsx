import { Link } from 'react-router-dom';
import { Gift, Heart, Download } from 'lucide-react';

const FreebieSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#FFE5EC]">
      <div className="container-custom max-w-5xl text-center">
        <div className="mb-8">
          <div className="text-[#FF7A9A] text-sm font-medium mb-2">FREE RESOURCE</div>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-4">
            Your Gift! Because Relationships Matter
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Grab this FREE resource to start your journey to better communication and connection.
          </p>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm max-w-lg mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src="/freebie.webp" 
              alt="Intimacy Guide" 
              className="w-48 h-auto rounded-lg shadow-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/freebie.webp/400x400";
                target.onerror = null;
              }}
            />
          </div>
          <h3 className="font-serif text-2xl font-medium text-gray-800 mb-4">Intimacy Guide</h3>
          <p className="mb-6 text-gray-700">Essential knowledge for building healthy relationships and understanding intimacy.</p>
          <Link to="/freebie" className="inline-block py-3 px-8 bg-[#FF7A9A] text-white rounded-full hover:bg-[#FF5A8A] transition-colors font-medium">
            <span className="flex items-center justify-center">
              <Download size={18} className="mr-2" />
              Get Your Free Guide Now
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreebieSection;
