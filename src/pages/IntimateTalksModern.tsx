import { useState } from 'react';
import { Users, Sparkles, MessageCircle, CheckCircle, Star, Shield, Heart, ArrowRight, Zap, Gift, Lock, Video, ChevronDown, CheckCircle2 } from 'lucide-react';
import { trackPaymentInitiated } from '@/utils/analytics';
import { appendUtmsToUrl } from '@/utils/utm';

const IntimateTalksModern = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      icon: MessageCircle,
      title: "Expert Answers",
      description: "Get clear, honest information from certified professionals directly in the chat."
    },
    {
      icon: Users,
      title: "Supportive Community",
      description: "Connect with others who understand and share your journey in a safe space."
    },
    {
      icon: Sparkles,
      title: "Daily Reconnection",
      description: "Rediscover your sensual self with gentle daily nudges and activities."
    },
    {
      icon: Video,
      title: "Live Q&A Sessions",
      description: "Regular live sessions with Khushboo for personalized, real-time guidance."
    }
  ];

  const benefits = [
    "Get answers to your most intimate questions",
    "Learn from others' experiences and insights",
    "Access exclusive content and resources",
    "Be part of a supportive, non-judgmental community",
    "Participate in regular Q&A sessions with Khushboo",
    "Fun games and myth-busting activities"
  ];

  const testimonials = [
    {
      text: "This group has been a game-changer for my relationship. The open discussions helped us communicate better.",
      author: "Priya",
      rating: 5
    },
    {
      text: "I've learned so much about my needs. The community is supportive and non-judgmental.",
      author: "Sneha",
      rating: 5
    },
    {
      text: "The regular Q&A sessions are invaluable. Expert advice that has really improved my intimate life.",
      author: "Aditi",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "What is Intimate Talks?",
      answer: "Intimate Talks is a private Telegram community where you can explore topics around sex, intimacy, and pleasure in a safe, judgment-free environment led by Khushboo."
    },
    {
      question: "Is my identity protected?",
      answer: "Absolutely. You can join anonymously and participate without revealing your identity. Your privacy is our top priority."
    },
    {
      question: "What kind of content is shared?",
      answer: "We share educational content, have open discussions, play myth-busting games, and host live Q&A sessions via video calls."
    },
    {
      question: "How do I join after payment?",
      answer: "After payment, you'll receive an instant invite link to join our private Telegram group within minutes."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Right - Image & Video (Moved to first for image-first layout) */}
            <div className="relative animate-fade-in order-first">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-white border-8 border-white animate-float mb-8">
                <img
                  src="/telegram.png"
                  alt="Intimate Talks Community"
                  className="w-full h-auto"
                />
              </div>

              {/* Video Card */}
              <div className="bg-slate-950 rounded-[2.5rem] p-4 overflow-hidden shadow-2xl relative border border-white/10">
                <div className="aspect-video relative rounded-2xl overflow-hidden bg-slate-900">
                  <iframe
                    src="https://app.tpstreams.com/embed/6u448b/7f2CDfh8sRJ/?access_token=2ba9a940-67be-4207-a0a6-73a130ac6228"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">Community Preview</span>
                  </div>
                  <Video className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            </div>

            {/* Left - Content */}
            <div className="animate-fade-in-up">
              <span className="badge-premium mb-6">Telegram Community</span>

              <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-950 mb-8 leading-[1.05] tracking-tighter">
                Intimate <br />
                <span className="text-gradient">Talks</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-500 font-medium mb-10 leading-relaxed max-w-xl">
                A safe and bold community where you can explore everything you've ever wondered about sex, intimacy, and pleasure.
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-6 mb-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="User" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">150+ ACTIVE MEMBERS</p>
                  <p className="text-xs text-slate-400 font-bold">Growing Daily</p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 mb-10 relative overflow-hidden">
                <div className="flex items-end gap-4 mb-8">
                  <div>
                    <span className="text-slate-400 line-through text-lg font-bold">₹1,999</span>
                    <div className="text-5xl font-black text-slate-950 tracking-tighter">₹999<span className="text-lg text-slate-400 font-medium tracking-normal">/mo</span></div>
                  </div>
                  <div className="mb-2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    50% OFF
                  </div>
                </div>

                <a
                  href={appendUtmsToUrl("https://payments.cashfree.com/forms/intimatetalks")}
                  onClick={() => trackPaymentInitiated(999, 'INR')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium-primary w-full text-lg py-5 shadow-xl shadow-primary/20"
                >
                  Join Community Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center justify-center gap-6 mt-8">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Lock className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.1em]">Private Group</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Shield className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.1em]">Anonymous OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
            <span className="badge-premium mb-6">The Value</span>
            <h2 className="section-title">Where Real Ed Happens</h2>
            <p className="text-base sm:text-xl text-slate-500 font-medium">Without judgment, with honesty, fun, and a little spice.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Content */}
      <section className="section-padding bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Inside the Community</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl group hover:bg-white/10 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-300 font-bold">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 md:p-12 text-slate-950 text-center shadow-2xl relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <h3 className="text-2xl sm:text-3xl font-black mb-6">Ready to Get Confident?</h3>
              <p className="text-slate-500 font-medium mb-10 text-base sm:text-lg leading-relaxed">
                If you're eager to learn, explore, or simply feel seen, this is your space. Get confident in bed and beyond.
              </p>
              <a
                href="https://payments.cashfree.com/forms/intimatetalks"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-primary w-full py-5 text-lg"
              >
                Yes, I'm Ready to Join!
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">Member Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex gap-1 mb-6 text-[#FFB800]">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-base sm:text-lg text-slate-700 italic font-medium mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">
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
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openFaq === index ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-400'
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
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 backdrop-blur-xl">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-5xl font-black text-white mb-4 tracking-tighter">Join the Conversation</h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium">Safe, Bold, and Anonymous.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="text-center sm:text-right">
                <span className="text-slate-500 line-through font-bold">₹1,999</span>
                <div className="text-4xl font-black text-white">₹999<span className="text-sm font-medium text-slate-400">/mo</span></div>
              </div>
              <a
                href="https://payments.cashfree.com/forms/intimatetalks"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-primary !bg-white !text-primary transform hover:scale-105 shadow-2xl"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntimateTalksModern;

