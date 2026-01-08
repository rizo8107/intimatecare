import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, BookOpen, Star, Shield, Clock, Users, ArrowRight, Gift, Zap, Heart, ChevronDown } from 'lucide-react';
import { trackPaymentInitiated } from '@/utils/analytics';
import { appendUtmsToUrl } from '@/utils/utm';

const Guide = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    "Step-by-step instructions for 69 exciting positions",
    "How to adjust each position to fit your unique bodies",
    "Secrets to deeper connection & pleasure",
    "How to move your body for maximum satisfaction",
    "Tips on foreplay & oral play to take pleasure to new heights"
  ];

  const faqs = [
    {
      question: "Is this guide suitable for beginners?",
      answer: "Absolutely! Each position includes beginner-friendly variations and detailed instructions. We've designed it to be accessible for couples at any experience level."
    },
    {
      question: "How will I receive the playbook?",
      answer: "After purchase, you'll receive an instant download link via email. The playbook is in PDF format, viewable on any device."
    },
    {
      question: "Is my purchase confidential?",
      answer: "100% confidential. Your purchase will appear discreetly on your statement, and we never share your information with third parties."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes! We offer a 7-day satisfaction guarantee. If you're not happy with your purchase, contact us for a full refund."
    }
  ];

  const testimonials = [
    {
      text: "This guide transformed our bedroom experience! The instructions are clear, the illustrations are helpful, and the tips really work. Worth every penny!",
      author: "Couple from Mumbai",
      rating: 5
    },
    {
      text: "I bought this for my partner and me to try something new. We've had so much fun exploring these positions together. It's rekindled our passion!",
      author: "Reader from Delhi",
      rating: 5
    },
    {
      text: "Finally, a guide that's tasteful, informative, and actually practical. The variations for different body types are a game-changer.",
      author: "Happy Customer",
      rating: 5
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#FFF5F7] via-white to-[#FFF0F5] min-h-screen">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-[#FF5A84] to-[#9B59B6] text-white py-3 text-center">
        <div className="container-custom">
          <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            <span>🔥 Limited Time: 30% OFF + Free Bonus Guide!</span>
            <Zap className="w-4 h-4" />
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Right - Image (Moved to first for image-first layout) */}
            <div className="relative order-first">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/69.jpg"
                  alt="69 Position Playbook"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-6 py-3 rounded-full shadow-lg transform rotate-12">
                BESTSELLER
              </div>
            </div>

            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-100 text-[#FF5A84] rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Digital Playbook for Couples
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-6 leading-tight">
                69 Position
                <span className="bg-gradient-to-r from-[#FF5A84] to-[#9B59B6] bg-clip-text text-transparent"> Playbook</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Expert-crafted guide with illustrated positions to bring excitement, variety, and deeper connection to your intimate life.
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">2,000+ couples love it</p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-400 line-through text-lg">₹999</span>
                    <span className="text-4xl font-bold text-[#FF5A84] ml-3">₹699</span>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Save 30%
                  </div>
                </div>

                <a
                  href={appendUtmsToUrl("https://payments.cashfree.com/forms/69positionsebbok")}
                  onClick={() => trackPaymentInitiated(699, 'INR')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5A84] to-[#9B59B6] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Get Instant Access
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Instant Download
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Secure Payment
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-[#FF5A84]" />
                  </div>
                  <p className="text-xs text-gray-600">100% Confidential</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-[#FF5A84]" />
                  </div>
                  <p className="text-xs text-gray-600">Instant Access</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift className="w-6 h-6 text-[#FF5A84]" />
                  </div>
                  <p className="text-xs text-gray-600">7-Day Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              What's Inside the Playbook
            </h2>
            <p className="text-lg text-gray-600">Everything you need to transform your intimate experiences</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF5A84] to-[#FF7A9A] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5F7] to-[#F8F4FF]">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              What Couples Are Saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-600">{testimonial.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#FF5A84] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#FF5A84] via-[#FF7A9A] to-[#9B59B6]">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Transform Your Intimate Life?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 2,000+ couples who have already discovered new dimensions of pleasure.
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-white/70 line-through text-xl">₹999</span>
              <span className="text-5xl font-bold text-white">₹699</span>
            </div>

            <a
              href={appendUtmsToUrl("https://payments.cashfree.com/forms/69positionsebbok")}
              onClick={() => trackPaymentInitiated(699, 'INR')}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full inline-flex items-center justify-center gap-2 bg-white text-[#FF5A84] font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Get Your Copy Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-white/80 text-sm mt-4">
              Instant download • 7-day guarantee • 100% confidential
            </p>
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['BBC.jpg', 'Vogue.jpg', 'Mint.jpg', 'Deccan.jpg', 'Huf.jpg'].map((logo, index) => (
              <div key={index} className="w-24 md:w-32 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <img src={`/Featured/${logo}`} alt={logo} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;
