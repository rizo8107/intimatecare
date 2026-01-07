import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, BookOpen, Star, Shield, Clock, ArrowRight, Gift, Zap, Heart, ChevronDown, CheckCircle2 } from 'lucide-react';

const GuideModern = () => {
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
      text: "This guide transformed our bedroom experience! The instructions are clear, the illustrations are helpful, and the tips really work.",
      author: "Priya & Rahul",
      location: "Mumbai",
      rating: 5
    },
    {
      text: "I bought this for my partner and me to try something new. We've had so much fun exploring these positions together. It's rekindled our passion!",
      author: "Sneha",
      location: "Delhi",
      rating: 5
    },
    {
      text: "Finally, a guide that's tasteful, informative, and actually practical. The variations for different body types are a game-changer.",
      author: "Anjali",
      location: "Bangalore",
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
                  src="/69.jpg"
                  alt="69 Position Playbook"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-1000"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 lg:-right-10 bg-slate-950 text-white font-black px-8 py-4 rounded-3xl shadow-2xl transform rotate-12 border border-white/10">
                <div className="flex flex-col items-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-primary mb-1">Status</span>
                  <span className="text-xl">BESTSELLER</span>
                </div>
              </div>

              {/* Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 animate-float-delayed">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 leading-tight">Instant Delivery</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">To your inbox</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left - Content */}
            <div className="animate-fade-in-up">
              <span className="badge-premium mb-6">Digital Playbook</span>

              <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-[1.05] tracking-tighter">
                The 69 Position <br />
                <span className="text-gradient">Experience</span>
              </h1>

              <p className="text-xl text-slate-500 font-medium mb-10 leading-relaxed max-w-xl">
                Expert-crafted guide with explained positions to bring variety, excitement, and deeper connection to your intimate life.
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i + 40}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="User" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#FFB800] mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">2,500+ Couples Transformed</p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 mb-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-end gap-4 mb-8">
                  <div>
                    <span className="text-slate-400 line-through text-lg font-bold">₹999</span>
                    <div className="text-5xl font-black text-slate-950 tracking-tighter">₹699</div>
                  </div>
                  <div className="mb-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    Save 30%
                  </div>
                </div>

                <a
                  href="https://payments.cashfree.com/forms/69positionsebbok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium-primary w-full text-lg py-5 shadow-xl shadow-primary/20"
                >
                  Unlock Instant Access
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Digital PDF</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Secure Payment</span>
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
            <span className="badge-premium mb-6">The Content</span>
            <h2 className="section-title">What's Inside</h2>
            <p className="text-xl text-slate-500 font-medium">Everything you need to transform your intimate experiences and explore new dimensions of pleasure.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                  <CheckCircle2 className="w-6 h-6 text-white stroke-[3px]" />
                </div>
                <p className="text-lg font-black text-slate-950 leading-tight tracking-tight">{feature}</p>
              </div>
            ))}
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <h3 className="text-2xl font-black mb-4">+ Free Bonus</h3>
              <p className="text-slate-400 font-medium mb-6">Get our exclusive "Communication Guide" worth ₹499 for free.</p>
              <Gift className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">Verified Reviews</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-700 mb-8 font-medium leading-relaxed italic">
                  “{testimonial.text}”
                </blockquote>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-black text-slate-950">{testimonial.author}</span>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="section-title">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden ${openFaq === index
                ? 'bg-slate-900 border-slate-900 shadow-2xl'
                : 'bg-slate-50/50 border-slate-100'
                }`}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left outline-none"
                >
                  <span className={`text-lg font-black tracking-tight transition-colors duration-500 ${openFaq === index ? 'text-white' : 'text-slate-900'
                    }`}>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openFaq === index ? 'bg-primary text-white rotate-180' : 'bg-slate-200/50 text-slate-400'
                    }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className="px-8 pb-10 border-t border-white/10 pt-4">
                    <p className={`text-lg font-medium leading-relaxed ${openFaq === index ? 'text-slate-300' : 'text-slate-500'
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-xl">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">Ready to Begin?</h2>
              <p className="text-xl text-slate-400 font-medium">Join 2,500+ couples today.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center sm:text-right">
                <span className="text-slate-500 line-through font-bold">₹999</span>
                <div className="text-4xl font-black text-white">₹699</div>
              </div>
              <a
                href="https://payments.cashfree.com/forms/69positionsebbok"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-primary !bg-white !text-primary transform hover:scale-105"
              >
                Get My Copy
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuideModern;

