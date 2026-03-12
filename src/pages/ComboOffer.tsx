import { useState, useEffect } from 'react';
import { CheckCircle, Download, BookOpen, Package, Gift, ArrowRight } from 'lucide-react';
import AboutPreview from '../components/AboutPreview';
import { trackPaymentInitiated } from '@/utils/analytics';
import { appendUtmsToUrl } from '@/utils/utm';
import { useContent } from '@/utils/cms';

// Facebook Pixel type
declare global {
  interface Window {
    fbq: (event: string, eventName: string, params?: { [key: string]: string | number | boolean }) => void;
  }
}

const ComboOffer = () => {
  const headline = useContent('combo-offer', 'hero_title', 'Ultimate Intimacy Bundle');
  const subheadline = useContent('combo-offer', 'hero_subtitle', 'Get both of our bestselling guides at a special discounted price and transform your intimate life completely!');
  const price = useContent('combo-offer', 'price', '999');
  const rawPurchaseUrl = useContent('combo-offer', 'purchase_url', 'https://payments.cashfree.com/forms?code=combo-ebook');
  const purchaseUrl = appendUtmsToUrl(rawPurchaseUrl);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simple state for UI
  const [isLoading, setIsLoading] = useState(false);

  // Handle buy now button click - redirect to payment page
  const handleBuyNow = () => {
    setIsLoading(true);

    // Track with Google Analytics
    trackPaymentInitiated(Number(price.replace(/,/g, '')), 'INR');

    // Track click with Facebook Pixel if available
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Combo Offer - 69 Positions + The Naughty Bedroom Playbook',
        content_category: 'Playbooks for couples Bundle',
        value: Number(price.replace(/,/g, '')),
        currency: 'INR'
      });
    }

    // Redirect to payment page
    window.location.href = purchaseUrl;
  };

  return (
    <div className="bg-gradient-to-b from-[#FFE5EC] to-[#FFF5F8] min-h-screen">
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container-custom max-w-6xl">
          {/* Hero Section */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12">
            <div className="relative">
              <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-1.5 px-4 text-center animate-pulse">
                <p className="text-sm font-bold text-yellow-900">⭐ EXCLUSIVE BUNDLE OFFER - SAVE ₹1000! ⭐</p>
              </div>
              <div className="p-8 md:p-12">
                <div className="text-[#FF7A9A] text-sm font-bold uppercase tracking-wider mb-2 text-center">SPECIAL COMBO DEAL</div>
                <h2 className="font-serif text-3xl md:text-5xl font-black text-slate-900 mb-6 text-center tracking-tighter">
                  {headline}
                </h2>

                {/* Urgency Timer */}
                <div className="flex justify-center mb-8">
                  <div className="bg-slate-950 text-white rounded-2xl p-4 md:p-6 shadow-2xl flex items-center gap-4 md:gap-8 min-w-[300px] justify-center">
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Offer Ends In</p>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl md:text-3xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Mins</span>
                        </div>
                        <span className="text-2xl font-black animate-pulse">:</span>
                        <div className="flex flex-col items-center">
                          <span className="text-2xl md:text-3xl font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Secs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10 text-lg font-medium leading-relaxed">
                  Get both of our bestselling guides at a special discounted price and transform your intimate life completely!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-12">
              {/* Bundle Image & Info */}
              <div className="flex flex-col">
                <div className="relative overflow-hidden rounded-xl shadow-lg mb-6">
                  <div className="flex items-center justify-center">
                    <div className="relative w-1/2">
                      <img
                        src="/69.jpg"
                        alt="69 Position Playbooks for couples"
                        className="w-full h-auto rounded-l-xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/300x400?text=69+Positions";
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute top-0 left-0 bg-[#FF7A9A] text-white text-xs font-bold py-1 px-2 rounded-br-lg">
                        BOOK 1
                      </div>
                    </div>
                    <div className="relative w-1/2">
                      <img
                        src="/images/32 days v2.jpg"
                        alt="The Naughty Bedroom Playbook"
                        className="w-full h-auto rounded-r-xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/300x400?text=30+Day+Challenge";
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute top-0 right-0 bg-[#FF7A9A] text-white text-xs font-bold py-1 px-2 rounded-bl-lg">
                        BOOK 2
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-[#FF7A9A] text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      +
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAFAFA] rounded-xl p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <Package size={24} className="text-[#FF7A9A] mr-3" />
                    <h3 className="font-medium text-lg">What's Included:</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} />
                      </div>
                      <span><strong>Book 1:</strong> 69+ Saucy Positions Playbooks for couples</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} />
                      </div>
                      <span><strong>Book 2:</strong> The Naughty Bedroom Playbook (Go Beyond Missionary)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} />
                      </div>
                      <span>Instant digital delivery to your email</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} />
                      </div>
                      <span>Lifetime access to both products</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-[#FF7A9A] to-[#FF5A84] rounded-xl p-6 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Gift size={24} className="mr-3" />
                      <h3 className="font-bold text-lg">Special Bundle Price</h3>
                    </div>
                    <div>
                      <span className="text-lg line-through opacity-70">₹1999</span>
                      <span className="text-2xl font-bold ml-2">₹{price}</span>
                    </div>
                  </div>
                  <p className="mb-4">
                    Save ₹1000 when you purchase both guides together!
                  </p>
                  <button
                    onClick={handleBuyNow}
                    disabled={isLoading}
                    className="bg-white text-[#FF5A84] hover:bg-[#FFE5EC] py-3 px-6 rounded-full font-bold text-lg transition-colors w-full disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? 'Processing...' : 'Buy Now'}
                    {!isLoading && <ArrowRight size={18} className="ml-2" />}
                  </button>
                </div>
              </div>

              {/* Content Column */}
              <div className="flex flex-col space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">
                    Book 1: 69+ Saucy Positions
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Want to bring back the spark in your sex life? This book has 69+ fun, bold, and sensual positions to help you explore, play, and feel more connected with your partner. Whether you want something wild or something romantic — this book has it all.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm">Step-by-step instructions for 69+ exciting positions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm">Adjustments for different body types and comfort levels</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm">Tips for deeper connection during intimate moments</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">
                    Book 2: The Naughty Bedroom Playbook
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Don’t try this at home… unless you’re ready to break the bed. This playbook is designed to take you beyond missionary, ignite curiosity, and create a deeper, more experimental connection with your partner.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm">30+ unique daily challenges to break routine</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm">Activities designed to build anticipation and desire</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#FFE5EC] text-[#FF7A9A] w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm">Exercises for emotional and physical reconnection</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                  <h3 className="font-medium text-lg text-gray-800 mb-3">Why Get Both?</h3>
                  <p className="text-gray-700 mb-4">
                    Whether you're trying new things or bringing back the passion — these two playbooks for couples are the perfect way to reconnect, explore, and enjoy each other more. The positions playbook gives you immediate options to try, while the pleasure exploration activities create a structured journey to rebuild intimacy over time.
                  </p>
                  <p className="text-[#FF7A9A] font-medium">
                    Don't wait. Your next adventure starts on the next page.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-12">
            <button
              onClick={handleBuyNow}
              className="bg-gradient-to-r from-[#FF7A9A] to-[#FF5A84] text-white py-4 px-12 rounded-full font-black text-xl shadow-xl shadow-pink-200/50 hover:scale-105 transition-transform flex items-center gap-2"
            >
              Buy Now - ₹{price}
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-800 mb-8 text-center">
              What Our Readers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <p className="italic text-gray-700 mb-4">
                  "The 69 positions playbook for couples gave us so many new ideas! We thought we'd tried everything, but this opened up a whole new world of possibilities."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF7A9A] text-sm font-bold mr-3">R</div>
                  <span className="text-sm font-medium text-gray-800">Couple, 7 years together</span>
                </div>
              </div>

              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <p className="italic text-gray-700 mb-4">
                  "The Naughty Bedroom Playbook completely transformed our relationship. We're communicating better and the intimacy is on another level now."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF7A9A] text-sm font-bold mr-3">K</div>
                  <span className="text-sm font-medium text-gray-800">Same-sex couple, 3 years</span>
                </div>
              </div>

              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <p className="italic text-gray-700 mb-4">
                  "Getting both guides was the best decision. We use the positions book for spontaneous nights and the challenge for a more structured approach."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF7A9A] text-sm font-bold mr-3">M</div>
                  <span className="text-sm font-medium text-gray-800">Married couple, 4 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          {/* About then Featured */}
          <AboutPreview />

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Featured In</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
              {['BBC.jpg', 'Deccan.jpg', 'Huf.jpg', 'INDIA (1).jpg', 'INDIA (2).jpg', 'INDIA (3).jpg', 'Indian ex.jpg', 'Mint.jpg', 'Vogue.jpg'].map(img => (
                <div key={img} className="w-28 md:w-32 lg:w-36 opacity-80 hover:opacity-100 transition-opacity">
                  <img
                    src={`/Featured/${img}`}
                    alt={img.replace(/\.[^/.]+$/, '')}
                    className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-200"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-800 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <h3 className="font-medium text-lg text-gray-800 mb-2">How will I receive my guides?</h3>
                <p className="text-gray-700">
                  After purchase, you'll receive an email with download links for both guides. You can access them on any device with a PDF reader.
                </p>
              </div>

              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <h3 className="font-medium text-lg text-gray-800 mb-2">Is my payment secure?</h3>
                <p className="text-gray-700">
                  Yes, we use Cashfree for all transactions, which provides bank-grade security for your payment information.
                </p>
              </div>

              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <h3 className="font-medium text-lg text-gray-800 mb-2">Can I get a refund?</h3>
                <p className="text-gray-700">
                  Due to the digital nature of these products, we don't offer refunds. However, we're happy to help with any issues you might have.
                </p>
              </div>

              <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#F0F0F5]">
                <h3 className="font-medium text-lg text-gray-800 mb-2">How long will I have access?</h3>
                <p className="text-gray-700">
                  Forever! Once you purchase the guides, they're yours to keep. You can download them and refer back anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-[#FF7A9A] to-[#FF5A84] rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 text-white text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Ready to Transform Your Intimate Life?</h2>
            <p className="mb-8 max-w-3xl mx-auto">
              Get both guides today at our special bundle price and start your journey to a more passionate, connected relationship.
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-bold line-through opacity-70">₹1999</span>
                <span className="text-4xl font-bold">₹{price} Only!</span>
              </div>
              <button
                onClick={handleBuyNow}
                disabled={isLoading}
                className="bg-white text-[#FF5A84] hover:bg-[#FFE5EC] py-4 px-10 rounded-full font-bold text-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed max-w-md"
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
              </button>
              <p className="text-sm mt-2 opacity-90">
                Instant digital delivery • Secure payment • Lifetime access
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComboOffer;
