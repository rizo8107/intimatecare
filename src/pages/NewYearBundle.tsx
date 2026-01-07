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
      title: "Intimate Talks",
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
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Right Image (Moved to first for image-first layout) */}
            <div className="relative animate-fade-in mb-10 lg:mb-0">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
                <img
                  src="/bundle.jpg"
                  alt="New Year Bundle"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                />

                {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 max-w-[180px]">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Includes</p>
                  <p className="font-serif font-bold text-slate-900 leading-tight">3 Bestselling Products + Bonuses</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            </div>

            {/* Left Content */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <span className="badge-premium mb-6">Holiday Exclusive Bundle</span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-6 leading-[1.05] tracking-tighter">
                New Year,<br />
                <span className="text-gradient">New Connections</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                The ultimate pleasure toolkit for 2026. Get all our bestsellers in one complete package for deeper intimacy.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
                <a
                  href={purchaseUrl}
                  className="btn-premium-primary text-lg w-full sm:w-auto px-10 py-4 shadow-xl shadow-primary/20 hover:shadow-primary/30"
                >
                  Get The Bundle - ₹1,599
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex flex-col items-start bg-slate-100 px-4 py-2 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 line-through">Total Value ₹2,297</span>
                  <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">Save ₹698 Today</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" /> Lifetime Access</span>
                <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-primary" /> 100% Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside - Compact Grid */}
      <section className="section-padding py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything You Get</h2>
            <p className="text-lg text-slate-500 font-medium">Three powerful tools, one unbeatable price.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div key={index} className="group bg-slate-50 rounded-[2rem] p-6 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="mb-6 relative aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-primary border border-white/50">
                    {product.subtitle}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{product.title}</h3>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                <div className="space-y-2 mb-6 border-t border-slate-100 pt-5">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700 font-bold text-xs">{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={purchaseUrl}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm group-hover:bg-primary transition-colors"
                >
                  Included in Bundle
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={purchaseUrl}
              className="inline-flex items-center gap-2 btn-premium-primary px-12 py-4"
            >
              Get Instant Access
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">30-Day Money Back Guarantee</p>
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
