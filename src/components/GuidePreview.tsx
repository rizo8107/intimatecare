
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
              
              <div className="flex justify-center lg:justify-start">
                <Link to="/guide" className="btn-primary">
                  Spice Up Your Bedroom Today!
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 lg:mt-0">
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg rotate-3 max-w-[200px] sm:max-w-[250px] md:max-w-xs">
                <div className="aspect-[3/4] bg-gradient-to-br from-blush-400 to-blush-600 rounded-md flex items-center justify-center">
                  <div className="text-center text-white p-4 md:p-6">
                    <h3 className="font-serif text-xl md:text-2xl mb-1 md:mb-2">69 Position</h3>
                    <h4 className="font-serif text-2xl md:text-3xl mb-3 md:mb-4">E-Guide</h4>
                    <p className="text-xs md:text-sm mb-4 md:mb-6">The ultimate guide to spice up your intimate moments</p>
                    <div className="inline-block border-2 border-white rounded-full px-3 md:px-4 py-1 text-xs md:text-sm">
                      By Khushboo Bist
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidePreview;
