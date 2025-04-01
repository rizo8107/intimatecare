import { Link } from 'react-router-dom';

const GuidePreview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="bg-blush-50 p-6 md:p-8 lg:p-12 rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium mb-4 md:mb-6">69 Position E-Guide</h2>
              <p className="text-base md:text-lg mb-5 md:mb-6">
                Spice up your bedroom game with my expert-crafted 69 Position E-Guide
              </p>
              
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6 md:mb-8">
                <h4 className="font-serif text-lg md:text-xl mb-3 md:mb-4">What You'll Discover:</h4>
                <ul className="space-y-2 md:space-y-3 text-muted-foreground text-sm md:text-base">
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
              
              <Link 
                to="/guides/69-positions" 
                className="inline-block bg-[#ff8e7f] hover:bg-[#ff7a69] text-white py-3 px-6 rounded-md font-medium transition-all text-sm md:text-base"
              >
                Spice Up Your Bedroom Today!
              </Link>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="/69.jpg" 
                alt="69 Position E-Guide Cover" 
                className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidePreview;
