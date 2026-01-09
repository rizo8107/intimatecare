import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Star, Zap, Shield, Clock, Gift, Lock, Sparkles, MessageCircle, Heart, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackPaymentInitiated } from '@/utils/analytics';
import { appendUtmsToUrl } from '@/utils/utm';
import { useContent } from '@/utils/cms';
import AboutPreviewModern from '../components/AboutPreviewModern';

const NewYearBundle = () => {
  const headline = useContent('newyear-bundle', 'hero_title', 'New Year, New Connections');
  const subheadline = useContent('newyear-bundle', 'hero_subtitle', 'The ultimate pleasure toolkit for 2026. Get all our bestsellers in one complete package for deeper intimacy.');
  const price = useContent('newyear-bundle', 'price', '1,599');
  const rawPurchaseUrl = useContent('newyear-bundle', 'purchase_url', 'https://payments.cashfree.com/forms/newyear');
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
      <section className="relative pt-12 pb-12 md:pb-16 lg:pt-20 lg:pb-20 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-fade-in-up order-first">
              <span className="badge-premium mb-6">Holiday Exclusive Bundle</span>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-950 mb-6 leading-[1.05] tracking-tighter">
                {headline.includes('Connection') ? (
                  <>
                    {headline.split('Connection')[0]}<br />
                    <span className="text-gradient">Connection</span>
                    {headline.split('Connection')[1]}
                  </>
                ) : headline}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-500 font-medium mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {subheadline}
              </p>

              {/* Mobile Image - Shown below subheadline on mobile only */}
              <div className="lg:hidden mb-10">
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-white">
                  <img
                    src="/bundle.jpg"
                    alt="New Year Bundle"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Includes Section Compact for Mobile */}
                <div className="mt-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Included</p>
                  </div>
                  <p className="font-serif text-sm font-bold text-slate-900">3 Bestselling Products + Exclusive Bonuses</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
                <a
                  href={purchaseUrl}
                  onClick={() => trackPaymentInitiated(Number(price.replace(/,/g, '')), 'INR')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium-primary text-sm sm:text-lg w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 shadow-xl shadow-primary/20 hover:shadow-primary/30"
                >
                  Buy Now - ₹{price}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex flex-col items-center lg:items-start bg-slate-100 px-4 py-2 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 line-through">Total Value ₹2,297</span>
                  <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">Save ₹698 Today</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" /> Lifetime Access</span>
                <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-primary" /> 100% Confidential</span>
              </div>
            </div>

            {/* Right Image - Desktop Only */}
            <div className="hidden lg:block relative animate-fade-in lg:order-last">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
                <img
                  src="/bundle.jpg"
                  alt="New Year Bundle"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>

              <div className="mt-8 bg-white/50 backdrop-blur-sm p-6 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bundle Includes</p>
                </div>
                <p className="font-serif text-xl font-bold text-slate-900 leading-tight">3 Bestselling Products + Exclusive Bonuses</p>
              </div>

              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside - Compact Grid */}
      <section className="section-padding !pt-8 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything You Get</h2>
            <p className="text-lg text-slate-500 font-medium">Three powerful tools, one unbeatable price.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div key={index} className="group bg-slate-50 rounded-[2rem] p-5 md:p-6 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
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
              Buy Now
              <ArrowRight className="w-5 h-5" />
            </a>
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
              <div key={i} className="bg-slate-50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex gap-1 mb-6 text-[#FFB800]">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg text-slate-700 italic font-medium mb-8 leading-relaxed">"{t.text}"</p>
                <div className="font-black text-slate-950 uppercase tracking-widest text-xs">— {t.author}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={purchaseUrl}
              className="inline-flex items-center gap-2 btn-premium-primary px-12 py-4 shadow-xl shadow-primary/20"
            >
              Buy Now - ₹1,599
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <AboutPreviewModern />

      {/* Final CTA Strip */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] sm:rounded-[4rem] p-8 md:p-20 backdrop-blur-xl">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter">Your Transformation Starts Now</h2>
            <p className="text-lg text-slate-400 font-medium mb-12">Don't wait for the spark. Create it with our complete bundle.</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-4">
                <span className="text-2xl text-slate-600 line-through font-bold">₹2,297</span>
                <span className="text-5xl font-black text-white">₹{price}</span>
              </div>
              <a
                href={purchaseUrl}
                className="btn-premium-primary !bg-white !text-primary text-xl px-12 py-6 shadow-2xl transform hover:scale-105"
              >
                Buy Now
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
