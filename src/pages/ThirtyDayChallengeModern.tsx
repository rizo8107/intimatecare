import { useState } from 'react';
import { CheckCircle, Sparkles, Heart, Calendar, ArrowRight, Star, Shield, Clock, Zap, Gift, Users, ChevronDown, CheckCircle2 } from 'lucide-react';
import { trackPaymentInitiated } from '@/utils/analytics';
import { appendUtmsToUrl } from '@/utils/utm';

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
    // Track with Google Analytics
    trackPaymentInitiated(599.00, 'INR');

    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: '30+ Ways to Explore Pleasure',
        content_category: 'Playbooks for couples',
        value: 599.00,
        currency: 'INR'
      });
    }
    window.location.href = appendUtmsToUrl('https://payments.cashfree.com/forms/Break-The-Same-Sex-Routine');
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
      answer: "Yes! Whether you're newly dating or married for decades, the challenges are designed to work for couples at any stage."
    },
    {
      question: "What if we miss a day?",
      answer: "No problem! The challenge is flexible. You can pick up where you left off or extend it beyond 30 days. The goal is connection, not perfection."
    },
    {
      question: "Is the content explicit?",
      answer: "The challenge includes a mix of emotional connection activities and sensual experiences. Everything is tasteful and focused on building intimacy."
    }
  ];

  const testimonials = [
    {
      text: "By day 15, we were communicating about our desires in ways we never had before. The challenges made it easy to try new things.",
      author: "Pooja & Sameer",
      rating: 5
    },
    {
      text: "We were stuck in such a routine that intimacy felt like a chore. This challenge brought back the excitement and anticipation.",
      author: "Rahul & Neha",
      rating: 5
    },
    {
      text: "The daily prompts gave us something to look forward to. It's like having a relationship coach guiding you every day.",
      author: "Vikram & Anjali",
      rating: 5
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Right - Image (Moved to first for image-first layout) */}
            <div className="relative group animate-fade-in order-first">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-white border-8 border-white animate-float">
                <img
                  src="/images/32 days v2.jpg"
                  alt="30+ Ways to Explore Pleasure"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-1000"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 lg:-right-10 bg-orange-500 text-white font-black px-6 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-3xl shadow-2xl transform rotate-12 border border-white/10 animate-pulse text-[10px] md:text-sm">
                HOT ITEM 🔥
              </div>

              {/* Stats Card Overlay */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-4 md:p-6 border border-white/40 flex gap-6 md:gap-8 items-center min-w-[280px] md:min-w-[300px]">
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-500 leading-none">30+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Days</div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <div className="text-3xl font-black text-primary leading-none">5</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Bonuses</div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-500 leading-none">∞</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Pleasure</div>
                </div>
              </div>
            </div>

            {/* Left - Content */}
            <div className="animate-fade-in-up">
              <span className="badge-premium mb-6">30-Day Experience</span>

              <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-950 mb-8 leading-[1.05] tracking-tighter">
                Break Your <br />
                <span className="text-gradient">Routine</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 font-medium mb-4 leading-relaxed max-w-xl">
                Daily prompts and activities designed to reignite passion and deepen your connection.
              </p>

              <p className="text-sm sm:text-base text-primary font-black uppercase tracking-widest mb-10">
                Crave, Connect & Come Again
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                <div className="flex -space-x-3">
                  {[10, 11, 12, 13].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="User" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">1,500+ COUPLES ENROLLED</p>
                  <div className="flex items-center gap-1 text-[#FFB800]">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 mb-10 relative overflow-hidden group">
                <div className="flex items-end gap-4 mb-8">
                  <div>
                    <span className="text-slate-400 line-through text-lg font-bold">₹999</span>
                    <div className="text-5xl font-black text-slate-950 tracking-tighter">₹599</div>
                  </div>
                  <div className="mb-2 bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    40% OFF
                  </div>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  className="btn-premium-primary w-full text-lg py-5 shadow-xl shadow-primary/20"
                >
                  {isLoading ? 'Processing...' : 'Start Your Journey'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">Instant Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Shield className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
            <span className="badge-premium mb-6">The Science</span>
            <h2 className="section-title">Why It Works</h2>
            <p className="text-base sm:text-lg text-slate-500 font-medium">Based on relationship psychology and sexual wellness research.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-primary rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">{benefit.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="section-padding bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">What's Included</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whatYouGet.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">Success Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex gap-1 mb-6 text-[#FFB800]">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-base sm:text-lg text-slate-700 italic font-medium mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black">
                    {t.author.charAt(0)}
                  </div>
                  <span className="font-black text-slate-950 uppercase tracking-widest text-xs">{t.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="section-title">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden ${openFaq === index
                ? 'bg-slate-900 border-slate-900 shadow-2xl'
                : 'bg-white border-slate-100 shadow-sm'
                }`}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left outline-none"
                >
                  <span className={`text-base sm:text-lg font-black tracking-tight transition-colors duration-500 ${openFaq === index ? 'text-white' : 'text-slate-900'
                    }`}>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openFaq === index ? 'bg-orange-500 text-white rotate-180' : 'bg-slate-100 text-slate-400'
                    }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className="px-8 pb-10 border-t border-white/10 pt-4">
                    <p className={`text-base sm:text-lg font-medium leading-relaxed ${openFaq === index ? 'text-slate-300' : 'text-slate-500'
                      }`}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 backdrop-blur-xl">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter">Ready to Begin?</h2>
              <p className="text-lg text-slate-400 font-medium">Join 1,500+ couples today.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="text-center sm:text-right">
                <span className="text-slate-500 line-through font-bold">₹999</span>
                <div className="text-4xl font-black text-white">₹599</div>
              </div>
              <button
                onClick={handleBuyNow}
                className="btn-premium-primary !bg-white !text-primary transform hover:scale-105 shadow-2xl"
              >
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThirtyDayChallengeModern;

