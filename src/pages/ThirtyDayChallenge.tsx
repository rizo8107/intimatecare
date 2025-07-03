import { useState } from 'react';
import { CheckCircle, Download, BookOpen, Sparkles } from 'lucide-react';

// Facebook Pixel type
declare global {
  interface Window {
    fbq: (event: string, eventName: string, params?: { [key: string]: string | number | boolean }) => void;
  }
}

const ThirtyDayChallenge = () => {
  // Simple state for UI
  const [isLoading, setIsLoading] = useState(false);

  // Handle buy now button click - redirect to payment page
  const handleBuyNow = () => {
    setIsLoading(true);
    
    // Track click with Facebook Pixel if available
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: '30+ Day Challenge',
        content_category: 'E-Book',
        value: 899.00,
        currency: 'INR'
      });
    }
    
    // Get payment URL from environment variable or use default
    const paymentPageUrl = import.meta.env.VITE_PAYMENT_PAGE_URL || 'https://lovable.in/payment/30-day-challenge';
    
    // Redirect to payment page
    window.location.href = paymentPageUrl;
  };

  return (
    <div className="bg-gradient-to-b from-[#FFE5EC] to-[#FFF5F8] min-h-screen">
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container-custom max-w-6xl">
          {/* Hero Section */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12">
            <div className="p-8 md:p-12">
              <div className="text-[#FF7A9A] text-sm font-bold uppercase tracking-wider mb-2 text-center">EXCLUSIVE DIGITAL PRODUCT</div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                Transform Your Intimate Life in 30 Days
              </h2>
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
                  
                  <div className="bg-[#FF7A9A] rounded-xl p-6 mb-6 text-white">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 drop-shadow-sm">
                      Break The<br />Same-Sex Routine
                    </h1>
                    <div className="text-lg md:text-xl font-light mb-4">
                      A <span className="font-bold text-[#FFD1DC]">30+ Day Challenge</span> to<br />
                      Crave, Connect & Come Again
                    </div>
                    <button 
                      onClick={handleBuyNow}
                      disabled={isLoading}
                      className="mt-2 bg-white text-[#FF5A84] hover:bg-[#FFE5EC] py-2 px-6 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : 'Get It Now - ₹899'}
                    </button>
                  </div>
                  
                  <div className="bg-[#F9F9F9] rounded-xl p-6 mb-6">
                    <h3 className="font-medium text-lg text-gray-800 mb-3">What You'll Get:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-gray-700">30+ unique daily challenges for couples</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-gray-700">Detailed instructions for each activity</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-gray-700">Connection prompts and conversation starters</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-gray-700">Sensual techniques to enhance pleasure</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-gray-700">Bonus: 5 special weekend activities</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="md:hidden">
                    <button 
                      onClick={handleBuyNow}
                      disabled={isLoading}
                      className="w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full font-bold text-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : 'Get It Now - ₹899'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 mb-12">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">
                Why This Challenge Works
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Based on research in relationship psychology and sexual wellness, this 30-day program is designed to create lasting change in your intimate connection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FAFAFA] rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#FFE5EC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-[#FF7A9A]" />
                </div>
                <h3 className="font-medium text-lg text-gray-800 mb-2">Break Routines</h3>
                <p className="text-gray-600">
                  Novel experiences trigger dopamine release, creating excitement and anticipation in your relationship.
                </p>
              </div>
              
              <div className="bg-[#FAFAFA] rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#FFE5EC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-[#FF7A9A]" />
                </div>
                <h3 className="font-medium text-lg text-gray-800 mb-2">Deepen Connection</h3>
                <p className="text-gray-600">
                  Structured activities create opportunities for vulnerability and emotional intimacy alongside physical pleasure.
                </p>
              </div>
              
              <div className="bg-[#FAFAFA] rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#FFE5EC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-[#FF7A9A]" />
                </div>
                <h3 className="font-medium text-lg text-gray-800 mb-2">Lasting Change</h3>
                <p className="text-gray-600">
                  30 days is the optimal period to establish new patterns and create lasting changes in your intimate dynamics.
                </p>
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-800 mb-8 text-center">
              What Couples Are Saying
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <p className="italic text-gray-700 mb-4">
                  "By day 15, we were communicating about our desires in ways we never had before. The structured challenges made it easy to try new things without awkwardness."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF7A9A] text-sm font-bold mr-3">M</div>
                  <span className="text-sm font-medium text-gray-800">Married couple, 5 years</span>
                </div>
              </div>
              
              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <p className="italic text-gray-700 mb-4">
                  "We were stuck in such a routine that intimacy felt like a chore. This challenge brought back the excitement and anticipation we had when we first met."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF7A9A] text-sm font-bold mr-3">S</div>
                  <span className="text-sm font-medium text-gray-800">Dating couple, 3 years</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#FF7A9A] to-[#FF5A84] rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 text-white text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Intimate Life?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Get your 30+ Day Challenge now and start your journey to a more passionate, connected relationship. Instant digital delivery.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="text-2xl md:text-3xl font-serif font-bold">₹899</div>
              <button 
                onClick={handleBuyNow}
                disabled={isLoading}
                className="bg-white text-[#FF5A84] hover:bg-[#FFE5EC] py-3 px-8 rounded-full font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Get Your Copy Now'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThirtyDayChallenge;
