import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Star, Zap, Shield, Clock, Gift, Lock, Sparkles, MessageCircle, Heart, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AboutPreviewModern from '../components/AboutPreviewModern';

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
      subtitle: "The Bestseller",
      image: "/69.jpg",
      description: "Beautifully illustrated guide with step-by-step instructions for 69+ exciting positions and variations for every body type.",
      features: ["Anatomical Illustrations", "Body Type Variations", "Communication Tips"]
    },
    {
      title: "30-Day Couple Challenge",
      subtitle: "Routine Breaker",
      image: "/images/32 days v2.jpg",
      description: "Daily activities designed to break routines, ignite passion, and create deeper connection with your partner.",
      features: ["30 Ready-to-use Tasks", "Connection Prompts", "Novelty Inducers"]
    },
    {
      title: "Pleasure School Access",
      subtitle: "The Community",
      image: "/telegram.png",
      description: "Exclusive access to our private Telegram community for expert guidance, live Q&A, and a safe space for real talk.",
      features: ["Expert Q&A Sessions", "Supportive Peer Group", "Priority Updates"]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="badge-premium mb-6">Holiday Exclusive</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-950 mb-8 leading-[1.05] tracking-tighter">
              New Year,<br />
              <span className="text-gradient">New Connections</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium mb-12 leading-relaxed max-w-2xl mx-auto">
              Transform your intimacy in 2026 with our ultimate pleasure ecosystem. The complete toolkit for deeper bonds.
            </p>

            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-slate-200">
              {[
                { icon: Clock, text: "Lifetime Access" },
                { icon: Shield, text: "100% Confidential" },
                { icon: Gift, text: "Bonus Content" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Value Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {products.map((product, index) => (
              <div key={index} className="group relative bg-white rounded-[3rem] p-4 border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-700 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="relative h-72 rounded-[2.5rem] overflow-hidden mb-8">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="badge-premium !bg-white/20 !text-white !border-white/20 backdrop-blur-md mb-2">{product.subtitle}</span>
                    <h3 className="text-2xl font-black text-white">{product.title}</h3>
                  </div>
                </div>
                <div className="px-6 pb-6 text-center lg:text-left">
                  <p className="text-slate-500 font-medium mb-8 line-clamp-2">{product.description}</p>
                  <div className="space-y-3 mb-8">
                    {product.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-slate-600 font-bold text-sm tracking-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Converting Pricing Strip */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-30" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Claim Your Special Price</h2>
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl mb-12">
              <div className="flex justify-center items-center gap-8 mb-8">
                <div>
                  <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-1">Normal SLAP</p>
                  <p className="text-3xl text-slate-600 line-through font-bold">₹2,297</p>
                </div>
                <div className="h-16 w-px bg-white/10" />
                <div>
                  <p className="text-primary font-black uppercase tracking-widest text-xs mb-1">Limited Offer</p>
                  <p className="text-6xl md:text-7xl font-black text-white tracking-tighter">₹1,599</p>
                </div>
              </div>

              <a
                href={purchaseUrl}
                className="w-full btn-premium-primary text-xl py-6 hover:scale-105 transition-transform"
              >
                SPICE UP YOUR NEW YEAR
                <ArrowRight className="w-6 h-6" />
              </a>
              <p className="mt-6 text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Secure SSL Checkout • Instant Access
              </p>
            </div>

            <div className="flex justify-center gap-12 text-slate-400">
              <div className="text-center">
                <div className="text-2xl font-black text-white mb-1">100%</div>
                <div className="text-[10px] uppercase font-bold tracking-widest">Confidential</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white mb-1">Instant</div>
                <div className="text-[10px] uppercase font-bold tracking-widest">Digital Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white mb-1">2026</div>
                <div className="text-[10px] uppercase font-bold tracking-widest">Fresh Content</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <p className="text-center text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-12">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
            {['BBC', 'Vogue', 'Mint', 'Deccan', 'Huf'].map((logo, index) => (
              <img key={index} src={`/Featured/${logo}.jpg`} alt={logo} className="h-8 md:h-12 w-auto object-contain hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dives Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="section-title">What's Inside The Box</h2>
            <p className="text-xl text-slate-500 font-medium">A curated selection of our most powerful tools.</p>
          </div>

          <div className="space-y-32">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src="/69.jpg" alt="Positions" className="relative rounded-[3rem] shadow-2xl z-10 border-8 border-white" />
              </div>
              <div>
                <span className="badge-premium mb-6">Volume I</span>
                <h3 className="text-4xl md:text-5xl font-black text-slate-950 mb-6 tracking-tight">The Position Playbook</h3>
                <p className="text-xl text-slate-600 font-medium mb-8 leading-relaxed">
                  Say goodbye to routine. Our bestseller includes beautiful illustrations and clinical-yet-saucy advice on how to explore 69+ positions.
                </p>
                <ul className="space-y-4 mb-10">
                  {["Illustrated step-by-step", "Focus on dual satisfaction", "Variation for every body"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <span className="badge-premium mb-6">Volume II</span>
                <h3 className="text-4xl md:text-5xl font-black text-slate-950 mb-6 tracking-tight">The 30-Day Spark</h3>
                <p className="text-xl text-slate-600 font-medium mb-8 leading-relaxed">
                  A daily prompt-based system to rebuild connection and excitement. Each task takes less than 15 minutes but lasts a lifetime.
                </p>
                <ul className="space-y-4 mb-10">
                  {["No-intimidation tasks", "Psychology-backed connection", "Routine breaking systems"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 relative group">
                <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src="/images/32 days v2.jpg" alt="Challenge" className="relative rounded-[3rem] shadow-2xl z-10 border-8 border-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 px-4">
            <h2 className="section-title">Trusted by Real Couples</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "The bundle is a total game-changer. The positions guide is so clear and the challenge actually brought us closer together.", author: "Priya & Rohan" },
              { text: "Finally, content that is practical and respectful. We loved the variety in the playbook. Worth every rupee.", author: "Anjali S." },
              { text: "The Telegram group alone is worth the price. Such a safe space to ask real questions without judgment.", author: "Vikram" }
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex gap-1 mb-6 text-[#FFB800]">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg text-slate-700 italic font-medium mb-8 leading-relaxed">"{t.text}"</p>
                <div className="font-black text-slate-950 uppercase tracking-widest text-xs">— {t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Section */}
      <AboutPreviewModern />

      {/* Final CTA Strip */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 backdrop-blur-xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Your Transformation Starts Now</h2>
            <p className="text-xl text-slate-400 font-medium mb-12">Don't wait for the spark. Create it with our complete bundle.</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-4">
                <span className="text-2xl text-slate-600 line-through font-bold">₹2,297</span>
                <span className="text-5xl font-black text-white">₹1,599</span>
              </div>
              <a
                href={purchaseUrl}
                className="btn-premium-primary !bg-white !text-primary text-xl px-12 py-6 shadow-2xl transform hover:scale-105"
              >
                Instant Access
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> 100% Secure</span>
              <span className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> Discreet Billing</span>
              <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Instant Delivery</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewYearBundle;
