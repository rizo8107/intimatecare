import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HeroModern() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left pt-10 lg:pt-0">
            {/* Minimalist Badge */}
            <div className="inline-block mb-6 animate-fade-in-up">
              <span className="py-2 px-4 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-600">
                Redefining Intimacy
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tighter text-slate-950 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Reignite Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-300% animate-gradient">
                Connection
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Expert-guided playbooks, sessions, and community support to help you experience deeper pleasure and lasting intimacy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link
                to="/products"
                className="btn-premium-primary text-base px-10 py-4 h-auto shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                View Products
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Simple Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-slate-100">
                    <img src={`https://i.pravatar.cc/150?u=${i + 30}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                  <span className="font-bold text-slate-900">4.9/5</span>
                </div>
                <p className="text-xs font-semibold text-slate-500">From 10,000+ Happy Couples</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="lg:w-1/2 relative lg:h-[600px] flex items-center justify-center animate-fade-in">
            <div className="relative w-full max-w-[500px] lg:max-w-full">
              {/* Main Image */}
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white">
                <img
                  src="/hero_banner/single-hero.png"
                  alt="Intimacy Coaching"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                />

                {/* Glass Card - Bottom Right */}
                <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-xl border border-white/50 p-4 rounded-2xl shadow-xl max-w-[200px] hidden sm:block">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Featured In</p>
                  <div className="flex items-center gap-2 opacity-70">
                    <span className="font-serif font-bold text-slate-800">Vogue</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="font-serif font-bold text-slate-800">BBC</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

              {/* Floating Badge - Top Left */}
              <div className="absolute top-10 -left-6 bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3 animate-float border border-slate-50 z-20">
                <div className="bg-green-100 p-2 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">100% Secure</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Private & Confidential</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
