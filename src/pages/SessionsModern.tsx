import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, MessageCircle, CheckCircle, Star, Shield, Heart, ArrowRight, Users, Award, Zap, Phone, CheckCircle2 } from 'lucide-react';

const SessionsModern = () => {
  const sessions = [
    {
      id: 'regular',
      title: "Intimacy Consultation",
      subtitle: "With Khushboo Bist",
      duration: "45 minutes",
      price: "₹2,500",
      badge: "Most Popular",
      badgeColor: "bg-primary",
      gradient: "from-primary to-accent",
      image: "/working.webp",
      link: "https://topmate.io/intimatecare/1102760",
      features: [
        "Personalized 1:1 guidance",
        "Confidential & judgment-free",
        "Expert advice on intimacy",
        "Practical techniques you can use",
        "Follow-up resources included"
      ]
    },
    {
      id: 'student',
      title: "Student Special",
      subtitle: "Affordable Support",
      duration: "45 minutes",
      price: "₹299",
      originalPrice: "₹999",
      badge: "For Students",
      badgeColor: "bg-slate-900",
      gradient: "from-slate-700 to-slate-900",
      image: "/students.webp",
      link: "https://topmate.io/intimatecare/1823535",
      features: [
        "Same quality, student pricing",
        "Safe space for young adults",
        "Navigate relationships confidently",
        "Understand consent & boundaries",
        "Build healthy habits early"
      ]
    }
  ];

  const steps = [
    { number: 1, title: "Choose Your Session", description: "Select the session type that fits your needs", icon: Calendar },
    { number: 2, title: "Pick a Time Slot", description: "Book a convenient time on Topmate", icon: Clock },
    { number: 3, title: "Complete Payment", description: "Secure payment with instant confirmation", icon: Shield },
    { number: 4, title: "Join Your Session", description: "Connect via the link sent to your email", icon: Video }
  ];

  const trustBadges = [
    { icon: Shield, title: "100% Confidential", description: "Your privacy is sacred" },
    { icon: Award, title: "Certified Expert", description: "USA-certified educator" },
    { icon: Heart, title: "Judgment-Free", description: "Safe space guaranteed" },
    { icon: Users, title: "2,500+ Helped", description: "Trusted by thousands" }
  ];

  const testimonials = [
    {
      text: "Khushboo's guidance was transformative for my relationship. She provided practical advice that helped me communicate better with my partner.",
      author: "Priya",
      rating: 5
    },
    {
      text: "I was nervous about discussing such personal topics, but Khushboo made me feel completely at ease. Her approach is professional and empathetic.",
      author: "Sneha",
      rating: 5
    },
    {
      text: "The one-on-one session gave me insights I couldn't have found anywhere else. Worth every penny for personalized advice.",
      author: "Aditi",
      rating: 5
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="badge-premium mb-6">1:1 ADVICE</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 tracking-tighter leading-[1.05]">
              Expert Guidance for Your <br />
              <span className="text-gradient">Intimate Life</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              Struggling with something and need to talk? Let's figure it out together in a safe, confidential, judgment-free space.
            </p>

            {/* Trust Row */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-slate-200">
              {trustBadges.slice(0, 3).map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">{badge.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {sessions.map((session, index) => (
              <div key={session.id} className="group relative bg-white rounded-[3rem] p-4 border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-8">
                  <img src={session.image} alt={session.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 right-6">
                    <div className={`${session.badgeColor} text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl`}>
                      {session.badge}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-black text-slate-950 tracking-tight mb-1">{session.title}</h3>
                      <p className="text-slate-500 font-medium">{session.subtitle}</p>
                    </div>
                    <div className="text-right">
                      {session.originalPrice && (
                        <div className="text-slate-400 line-through font-bold text-sm">{session.originalPrice}</div>
                      )}
                      <div className="text-3xl font-black text-slate-950 tracking-tighter">{session.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl text-slate-600 font-bold text-sm">
                      <Clock className="w-4 h-4" />
                      {session.duration}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl text-slate-600 font-bold text-sm">
                      <Video className="w-4 h-4" />
                      Audio/Video
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    {session.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={session.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full btn-premium-primary text-lg py-5 group-hover:scale-[1.02] ${index === 1 ? '!bg-slate-950 !shadow-slate-950/20' : ''}`}
                  >
                    Book This Session
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in-up">
            <span className="badge-premium mb-6">Simple Steps</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-white/10 -z-10 translate-x-4" />
                )}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary flex items-center justify-center text-white mb-6 mx-auto shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-white tracking-tight">{step.title}</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{step.description}</p>
                </div>
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
              <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex gap-1 mb-6 text-[#FFB800]">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg text-slate-700 italic font-medium mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
                    {t.author.charAt(0)}
                  </div>
                  <span className="font-black text-slate-950 uppercase tracking-widest text-xs">{t.author}</span>
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-xl">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">Transformation Awaits</h2>
              <p className="text-xl text-slate-400 font-medium">Take the first step towards deeper connection.</p>
            </div>
            <div className="flex items-center gap-8">
              <Link to="/contact" className="hidden sm:block text-white font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors">Have Questions?</Link>
              <a
                href="https://topmate.io/intimatecare/1102760"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-primary !bg-white !text-primary transform hover:scale-105 shadow-2xl"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SessionsModern;
