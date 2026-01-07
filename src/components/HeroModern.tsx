import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HeroModern() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-white pt-20">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-full px-5 py-2.5 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-in-up">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="h-4 w-[1px] bg-slate-200 mx-2" />
              <span className="text-sm font-semibold text-slate-600">
                <span className="text-slate-950">2,500+</span> Couples Transformed
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] mb-8 tracking-tighter animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Reignite Your <br />
              <span className="text-gradient">Intimate Connection</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Expert-guided sessions, proven playbooks & community support to help you experience
              <span className="text-slate-900"> deeper pleasure</span> and lasting intimacy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link
                to="/sessions"
                className="btn-premium-primary text-xl px-12 h-16"
              >
                Book Free Discovery Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-100 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
                <p className="text-sm font-bold text-slate-900">4.9/5 Rating</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Happy Couples</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-black text-slate-900 tracking-tight">10K+</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Community Members</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-black text-slate-900 tracking-tight">Certified</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">USA Institute</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 relative group animate-fade-in">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative shapes */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Main Image Container */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border-8 border-white animate-float">
                <img
                  src="/hero_banner/single-hero.png"
                  alt="Khushboo Bist - Intimacy Coach"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>

              {/* Floating Card - Top Right */}
              <div className="absolute -top-6 -right-6 lg:-right-12 bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-5 animate-float-delayed border border-white/40">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <ShieldCheck className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">100% Confidential</p>
                    <p className="text-sm text-slate-500 font-medium">Safe & Private Environment</p>
                  </div>
                </div>
              </div>

              {/* Floating Card - Bottom Left */}
              <div className="absolute -bottom-8 -left-6 lg:-left-12 bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-5 animate-float border border-white/40">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">Expert Guidance</p>
                    <p className="text-sm text-slate-500 font-medium">Certified Pleasure Coach</p>
                  </div>
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
