import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Star, Zap, Shield, Clock, Gift, Lock, Sparkles, MessageCircle } from 'lucide-react';
import AboutPreview from '../components/AboutPreview';

const NewYearBundle = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
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

  const purchaseUrl = "https://payments.cashfree.com/forms/newyear";

  const products = [
    {
      title: "69+ Saucy Positions",
      subtitle: "Spice Up Your Life",
      image: "/69.jpg",
      description: "Illustrated guide with detailed instructions for 69 exciting positions and variations for every body type.",
      features: ["Illustrated Instructions", "Body Type Variations", "Foreplay Tips"]
    },
    {
      title: "Break The Routine",
      subtitle: "30+ Day Challenge",
      image: "/images/32 days v2.jpg",
      description: "Carefully crafted daily activities designed to break routines, ignite passion, and create deeper connection.",
      features: ["30+ Daily Tasks", "Connection Prompts", "Passion Igniters"]
    },
    {
      title: "Intimate Talks",
      subtitle: "Exclusive Product",
      image: "/telegram.png",
      description: "Private Telegram community access for expert answers, supportive discussions, and exclusive Q&A sessions.",
      features: ["Expert Support", "Private Community", "Weekly Q&A"]
    }
  ];

  return (
    <div className="bg-[#1A0B0B] min-h-screen text-white overflow-x-hidden font-sans">
      {/* Urgency Banner */}
      <div className="bg-[#D4AF37] text-[#1A0B0B] py-2 text-center font-bold sticky top-0 z-50 shadow-md">
        <p className="text-sm md:text-base flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 animate-pulse" />
          NEW YEAR SPECIAL: 30% OFF ENDS IN {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden">
        {/* Background Sparkles/Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-radial-gradient from-[#4A1D1D] to-transparent opacity-50 blur-3xl -z-10"></div>
        
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center gap-2 mb-6">
            <Sparkles className="text-[#D4AF37] w-6 h-6 animate-spin-slow" />
            <Sparkles className="text-[#D4AF37] w-4 h-4" />
            <Sparkles className="text-[#D4AF37] w-8 h-8 animate-bounce" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 tracking-tight leading-tight">
            New Year,<br />
            <span className="text-[#D4AF37]">New Beginnings</span><br />
            Sex Ed Bundle
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Everything you need to transform your intimacy, spice up your bedroom, and connect deeper with your partner in 2026.
          </p>

          {/* Product Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
            {products.map((product, idx) => (
              <div key={idx} className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-[#D4AF37]/50 shadow-xl">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 shadow-lg">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0B]/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">{product.subtitle}</p>
                    <h3 className="text-lg font-bold text-white">{product.title}</h3>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-3 h-3 text-[#D4AF37]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto relative mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-[2.5rem] blur opacity-30 animate-pulse"></div>
            <div className="relative bg-[#2A1515] rounded-[2rem] border-2 border-[#D4AF37] p-8 md:p-10 shadow-2xl overflow-hidden">
              {/* Decorative Frame like in image */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] -translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] translate-x-1 -translate-y-1"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37] -translate-x-1 translate-y-1"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] translate-x-1 translate-y-1"></div>

              <div className="flex justify-around items-center mb-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1">SLAP</p>
                  <p className="text-2xl text-gray-500 line-through font-bold">₹2297</p>
                </div>
                <div className="h-12 w-px bg-white/10"></div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1 text-[#D4AF37]">PRICE</p>
                  <p className="text-5xl text-white font-bold">₹1599</p>
                </div>
              </div>
              
              <a 
                href={purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#B8860B] text-[#1A0B0B] font-black py-5 px-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 text-xl uppercase tracking-wider"
              >
                SPICE UP YOUR NEW YEAR!
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <p className="mt-6 text-gray-400 text-xs flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" /> SECURE CHECKOUT • INSTANT DELIVERY
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#D4AF37]" /> Lifetime Access</div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#D4AF37]" /> 100% Confidential</div>
            <div className="flex items-center gap-2"><Gift className="w-4 h-4 text-[#D4AF37]" /> Free Bonus Content</div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['BBC.jpg', 'Vogue.jpg', 'Mint.jpg', 'Deccan.jpg', 'Huf.jpg'].map((logo, index) => (
              <img key={index} src={`/Featured/${logo}`} alt={logo} className="h-6 md:h-8 w-auto grayscale" />
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#2A1515]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-[#D4AF37]">What You're Getting</h2>
            <p className="text-gray-400">A complete ecosystem for your intimate health and pleasure</p>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Star className="text-[#D4AF37] w-6 h-6" /> 69+ Saucy Positions
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Bring excitement and variety to your bedroom with our bestseller. Each position is beautifully illustrated and includes step-by-step instructions on how to move, where to touch, and how to adjust for comfort and maximum satisfaction.
                </p>
                <ul className="space-y-3">
                  {["Illustrated for clarity", "Variations for all body types", "Focus on dual pleasure"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src="/69.jpg" alt="69 Positions" className="w-full" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src="/images/32 days v2.jpg" alt="30 Day Challenge" className="w-full" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Sparkles className="text-[#D4AF37] w-6 h-6" /> 30+ Day Challenge
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Stuck in the same routine? This challenge is designed to reignite the spark. With 30 unique, non-intimidating, and fun tasks, you'll rediscover why you fell for each other and build new habits of intimacy.
                </p>
                <ul className="space-y-3">
                  {["Break predictable patterns", "Connection prompts", "Novelty-based pleasure"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <MessageCircle className="text-[#D4AF37] w-6 h-6" /> Intimate Talks Community
                </h3>
                <p className="text-gray-700 md:text-gray-300 mb-6 leading-relaxed">
                  Join 100+ members in our private Telegram group. This is your safe space to ask questions, learn from experts, and connect with like-minded people. No judgment, just real talk about intimacy and pleasure.
                </p>
                <ul className="space-y-3">
                  {["Direct access to Khushboo", "Supportive environment", "Exclusive content"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src="/telegram.png" alt="Intimate Talks" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-[#1A0B0B]">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-serif font-bold mb-12">What Couples Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "The bundle is a game-changer! The 69 positions guide is so clear and the 30-day challenge actually brought us closer.", author: "Couple from Mumbai" },
              { text: "Finally, content that is practical and respectful. The Telegram group is such a safe space to ask questions.", author: "Riya & Karan" },
              { text: "Best New Year investment we've made. The variety in the positions playbook is insane!", author: "Siddharth, Bangalore" }
            ].map((t, idx) => (
              <div key={idx} className="bg-white/5 p-8 rounded-2xl border border-white/10 text-left relative">
                <Star className="text-[#D4AF37] w-5 h-5 mb-4 absolute top-6 right-6" />
                <p className="text-gray-300 italic mb-6">"{t.text}"</p>
                <p className="text-[#D4AF37] font-bold text-sm">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Section */}
      <AboutPreview />

      {/* Final CTA Footer */}
      <div className="bg-[#2A1515] py-20 px-4 text-center border-t border-[#D4AF37]/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Don't Wait For The Spark</h2>
          <p className="text-xl text-gray-400 mb-10 italic">Create it yourself with the New Year Bundle.</p>
          
          <div className="inline-block bg-[#1A0B0B] border-2 border-[#D4AF37] rounded-3xl p-10 shadow-2xl w-full max-w-md">
            <div className="flex justify-center items-baseline gap-2 mb-8">
              <span className="text-gray-500 line-through text-xl font-bold">₹2297</span>
              <span className="text-6xl font-black text-white">₹1599</span>
            </div>
            
            <a 
              href={purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#B8860B] text-[#1A0B0B] font-black py-5 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 uppercase tracking-wider text-xl"
            >
              Get Instant Access
              <ArrowRight className="w-6 h-6" />
            </a>
            
            <div className="mt-8 flex justify-center gap-4 text-gray-500 text-xs uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Discreet</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Forever</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewYearBundle;
