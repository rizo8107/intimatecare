import { Link } from 'react-router-dom';

const AboutPreview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#FFF8E1]">
      <div className="container-custom max-w-5xl">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Main content - Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Column 1 - Author Image and Intro */}
            <div className="p-6 md:p-8 flex flex-col items-center md:border-r border-[#F0F0F5]">
              {/* Title and Author */}
              <div className="text-center mb-6 pb-6 border-b border-[#F0F0F5] w-full">
                <div className="text-[#FF7A9A] text-sm font-medium mb-1">About Me</div>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                  Hey, I'm Khushboo Bist!
                </h2>
                <p className="text-gray-800 font-medium">
                  A certified sex educator, intimacy coach and your go-to guide for all things 
                  pleasure, connection, and self-discovery.
                </p>
              </div>
              
              {/* Author Image */}
              <div className="w-full max-w-sm">
                <img 
                  src="/about.jpg" 
                  alt="Khushboo Bist" 
                  className="w-full h-auto rounded-2xl shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x500";
                    target.onerror = null;
                  }}
                />
              </div>
            </div>
            
            {/* Column 2 - Content */}
            <div className="p-6 md:p-8">
              {/* About content */}
              <div className="text-gray-700 mb-6 pb-6 border-b border-[#F0F0F5]">
                <p className="mb-4">
                  Sex is one of the most natural yet most misunderstood aspects of our lives. 
                  We desire it, we fear it, we suppress it—but do we truly understand it? I grew up 
                  seeing how misinformation, shame, and silence around sexuality create confusion, 
                  fear, and unfulfilled relationships.
                </p>
                <p className="mb-4">
                  I'm here to help you improve your sexual well-being and intimacy. My focus is on offering 
                  practical advice and education. I believe that open communication and understanding are key 
                  to having a healthy and happy sex life.
                </p>
                <p className="text-[#FF7A9A] font-medium">
                  Let's make your sexual experiences more fulfilling and enjoyable.
                </p>
              </div>
              
              {/* Credentials */}
              <div className="bg-[#F9F9FB] rounded-xl p-5 mb-6">
                <h3 className="font-serif text-lg mb-3">Credentials:</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>Certified in Sex and Sexual Health – Modern Sex Therapy Institute, USA</li>
                  <li>Pursuing a Master's in Psychology to better understand human connection and intimacy</li>
                </ul>
              </div>
              
              {/* CTA Button */}
              <Link 
                to="/about" 
                className="inline-block bg-[#FF9A76] hover:bg-[#FF8A66] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
              >
                Explore & Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
