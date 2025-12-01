import { useState } from 'react';
import { CheckCircle, Sparkles, Heart, Calendar, ArrowRight, Star, Shield, Clock, Zap, Gift, Users, ChevronDown } from 'lucide-react';

declare global {
  interface Window {
    fbq: (event: string, eventName: string, params?: { [key: string]: string | number | boolean }) => void;
  }
}

const ThirtyDayChallengeModern = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleBuyNow = () => {
    setIsLoading(true);
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: '30+ Ways to Explore Pleasure',
        content_category: 'Playbooks for couples',
        value: 599.00,
        currency: 'INR'
      });
    }
    window.location.href = 'https://payments.cashfree.com/forms/Break-The-Same-Sex-Routine';
  };

  const benefits = [
    {
      icon: Sparkles,
      title: "Break Routines",
      description: "Novel experiences trigger dopamine release, creating excitement and anticipation."
    },
    {
      icon: Heart,
      title: "Deepen Connection",
      description: "Structured activities create opportunities for vulnerability and emotional intimacy."
    },
    {
      icon: Calendar,
      title: "Lasting Change",
      description: "30 days is the optimal period to establish new patterns in your intimate dynamics."
    }
  ];

  const whatYouGet = [
    "30+ unique daily challenges designed for couples",
    "Detailed instructions for each activity",
    "Connection prompts and conversation starters",
    "Sensual techniques to enhance pleasure",
    "Bonus: 5 special weekend activities",
    "Printable tracking calendar"
  ];

  const faqs = [
    {
      question: "How does the 30-Day Challenge work?",
      answer: "Each day, you'll receive a new activity or prompt designed to bring you and your partner closer. Activities range from communication exercises to sensual experiences, building progressively over the month."
    },
    {
      question: "Is this suitable for all couples?",
      answer: "Yes! Whether you're newly dating or married for decades, the challenges are designed to work for couples at any stage. Each activity can be adapted to your comfort level."
    },
    {
      question: "What if we miss a day?",
      answer: "No problem! The challenge is flexible. You can pick up where you left off or extend it beyond 30 days. The goal is connection, not perfection."
    },
    {
      question: "Is the content explicit?",
      answer: "The challenge includes a mix of emotional connection activities and sensual experiences. Everything is tasteful and focused on building intimacy, not just physical pleasure."
    }
  ];

  const testimonials = [
    {
      text: "By day 15, we were communicating about our desires in ways we never had before. The structured challenges made it easy to try new things without awkwardness.",
      author: "Married couple, 5 years",
      rating: 5
    },
    {
      text: "We were stuck in such a routine that intimacy felt like a chore. This challenge brought back the excitement and anticipation we had when we first met.",
      author: "Dating couple, 3 years",
      rating: 5
    },
    {
      text: "The daily prompts gave us something to look forward to. It's like having a relationship coach guiding you every day.",
      author: "Newlyweds",
      rating: 5
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#FFF5F7] via-white to-[#FFF0F5] min-h-screen">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 text-center animate-pulse">
        <div className="container-custom">
          <p className="text-sm md:text-base font-bold flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            ⏰ LIMITED TIME: 40% OFF - Only ₹599 (Regular ₹999)
            <Zap className="w-4 h-4" />
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                30-Day Transformation Program
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-6 leading-tight">
                Break The Same-Sex
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"> Routine</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                <span className="font-bold text-[#FF5A84]">30+ Ways to Explore Pleasure</span> — Daily prompts and activities designed to reignite passion and deepen your connection.
              </p>
              
              <p className="text-lg text-gray-500 mb-8 italic">
                Crave, Connect & Come Again
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
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
                  <p className="text-sm text-gray-600">1,500+ couples transformed</p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-white/70 line-through text-lg">₹999</span>
                    <span className="text-4xl font-bold ml-3">₹599</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Save 40%
                  </div>
                </div>
                
                <button 
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  className="group w-full inline-flex items-center justify-center gap-2 bg-white text-orange-500 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-70"
                >
                  {isLoading ? 'Processing...' : 'Start Your 30-Day Journey'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Instant Access
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
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-600">For All Couples</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-600">30+ Activities</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-600">Bonus Content</p>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/32 days v2.jpg" 
                  alt="30+ Ways to Explore Pleasure" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-6 py-3 rounded-full shadow-lg transform rotate-12 animate-bounce">
                HOT! 🔥
              </div>
              
              {/* Countdown-style element */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl p-4 flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">30+</div>
                  <div className="text-xs text-gray-500">Activities</div>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-500">5</div>
                  <div className="text-xs text-gray-500">Bonuses</div>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">∞</div>
                  <div className="text-xs text-gray-500">Pleasure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              Why This Challenge Works
            </h2>
            <p className="text-lg text-gray-600">Based on relationship psychology and sexual wellness research</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5F7] to-[#F8F4FF]">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              What's Included
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whatYouGet.map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              What Couples Are Saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white font-bold">
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
      <section className="py-16 bg-gradient-to-br from-[#FFF5F7] to-[#F8F4FF]">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
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
      <section className="py-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Transform Your Intimate Life?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your 30-day journey to deeper connection and more pleasure.
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-white/70 line-through text-xl">₹999</span>
              <span className="text-5xl font-bold text-white">₹599</span>
            </div>
            
            <button 
              onClick={handleBuyNow}
              disabled={isLoading}
              className="group w-full inline-flex items-center justify-center gap-2 bg-white text-orange-500 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-70"
            >
              {isLoading ? 'Processing...' : 'Start Now - 40% Off'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-white/80 text-sm mt-4">
              Instant download • Works for all couples • 100% confidential
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

export default ThirtyDayChallengeModern;
