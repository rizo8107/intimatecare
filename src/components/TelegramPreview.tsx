import { Link } from 'react-router-dom';
import OptimizedImage from './ui/optimized-image';

const TelegramPreview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F9E5FF]">
      <div className="container-custom max-w-5xl">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Main content - Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Column 1 - Content */}
            <div className="p-6 md:p-8 flex flex-col md:border-r border-[#F0F0F5]">
              {/* Title and Intro */}
              <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                <div className="text-[#D9A6FF] text-sm font-medium mb-1">Join Our Community</div>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                  My Exclusive Product – Intimate Talks
                </h2>
                <p className="text-gray-800 font-medium">
                  Join the most intimate space for open, honest conversations about sex, pleasure, and relationships!
                </p>
              </div>
              
              {/* Description */}
              <div className="text-gray-700 mb-6 pb-6 border-b border-[#F0F0F5]">
                <p className="mb-4">
                  A safe, inclusive, and judgment-free space for open and honest discussions about relationships, 
                  love, and intimacy. Whether you're seeking advice, looking to share experiences, or simply 
                  want to connect with like-minded individuals, you're in the right place.
                </p>
              </div>
              
              {/* Why Join Card */}
              <div className="bg-[#F9F9FB] rounded-xl p-5 mb-6">
                <h3 className="font-serif text-lg mb-3">Why Join?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#D9A6FF] mr-2">•</span>
                    Learn what no one taught you about intimacy
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D9A6FF] mr-2">•</span>
                    Share your experiences and get guidance
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D9A6FF] mr-2">•</span>
                    Engage in enriching conversations and activities
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D9A6FF] mr-2">•</span>
                    Special discounts on guides and resources
                  </li>
                </ul>
              </div>
              
              {/* CTA Button */}
              <Link 
                to="/intimatetalks" 
                className="inline-block bg-[#D9A6FF] hover:bg-[#C990FF] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
              >
                Become a Member Today
              </Link>
            </div>
            
            {/* Column 2 - Image */}
            <div className="p-6 md:p-8 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <OptimizedImage 
                  src="/telegram.png" 
                  alt="Intimate Talks Telegram Group" 
                  className="w-full h-auto rounded-2xl shadow-sm"
                  width={400}
                  height={400}
                  blurEffect={true}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramPreview;
