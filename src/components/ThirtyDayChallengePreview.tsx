import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThirtyDayChallengePreview = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#FFE5EC] to-[#FFF5F8]">
      <div className="container-custom max-w-6xl">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="relative">
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-1.5 px-4 text-center animate-pulse">
              <p className="text-sm font-bold text-yellow-900">⏰ LIMITED TIME OFFER - 62% OFF! ⏰</p>
            </div>
            <div className="p-8 md:p-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                Break The Same-Sex Routine
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-12">
            {/* Image Column */}
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src="/images/32 days v2.jpg" 
                alt="30+ Day Challenge" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/600x800?text=30+Day+Challenge";
                  target.onerror = null;
                }}
              />
            </div>
            
            {/* Content Column */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-gray-700 mb-6">
                  Are you tired of the same predictable patterns in your intimate life? This 30+ Day Challenge is designed to break routines, ignite passion, and create deeper connection with your partner through carefully crafted daily activities.
                </p>
                
                <div className="bg-[#FF7A9A] rounded-xl p-6 mb-6 text-white relative overflow-hidden">
                  <div className="absolute top-6 -right-14 transform rotate-45 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-1.5 px-16 text-sm font-bold text-yellow-900 shadow-lg animate-pulse">
                    LIMITED TIME OFFER
                  </div>
                  <div className="text-lg md:text-xl font-light mb-4">
                    A <span className="font-bold text-[#FFD1DC]">30+ Day Challenge</span> to<br />
                    Crave, Connect & Come Again
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-4 justify-start">
                      <span className="text-white text-xl font-bold line-through opacity-60">₹1299</span>
                      <span className="text-white text-3xl font-bold">₹499</span>
                    </div>
                  </div>
                  <Link 
                    to="/thirty-day-challenge"
                    className="inline-flex items-center mt-2 bg-white text-[#FF5A84] hover:bg-[#FFE5EC] py-2 px-6 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Get It Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                
                <div className="bg-[#F9F9F9] rounded-xl p-6">
                  <h3 className="font-medium text-lg text-gray-800 mb-3">What You'll Get:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-gray-700">30+ unique daily challenges for couples</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-gray-700">Detailed instructions for each activity</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-center">
                    <Link 
                      to="/thirty-day-challenge"
                      className="inline-flex items-center text-[#FF5A84] hover:text-[#FF7A9A] font-medium"
                    >
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
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

export default ThirtyDayChallengePreview;
