import { Link } from 'react-router-dom';

const GuidePreview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#FFF2E5]">
      <div className="container-custom max-w-5xl">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Main content - Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Column 1 - Content */}
            <div className="p-6 md:p-8 flex flex-col md:border-r border-[#F0F0F5]">
              {/* Title and Intro */}
              <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                <div className="text-[#FF8E7F] text-sm font-medium mb-1">Exclusive E-Guide</div>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                  69 Position E-Guide
                </h2>
                <p className="text-gray-800 font-medium">
                  Spice up your bedroom game with my expert-crafted 69 Position E-Guide
                </p>
              </div>
              
              {/* What You'll Discover Card */}
              <div className="bg-[#F9F9FB] rounded-xl p-5 mb-6">
                <h3 className="font-serif text-lg mb-3">What You'll Discover:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Step-by-step instructions for 69 exciting sex positions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    How to adjust each position to fit your unique bodies
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Secrets to deeper connection & pleasure during penetration
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    How to move your body, hips, arms & legs for maximum satisfaction
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Tips on foreplay & oral play to take pleasure to new heights
                  </li>
                </ul>
              </div>
              
              {/* CTA Button */}
              <Link 
                to="/guide" 
                className="inline-block bg-[#FF8E7F] hover:bg-[#FF7A69] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
              >
                Spice Up Your Bedroom Today!
              </Link>
            </div>
            
            {/* Column 2 - Image */}
            <div className="p-6 md:p-8 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <img 
                  src="/69.jpg" 
                  alt="69 Position E-Guide Cover" 
                  className="w-full h-auto rounded-2xl shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x500";
                    target.onerror = null;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidePreview;
