import { Link } from 'react-router-dom';
import { Award, Heart, Users, ArrowRight, ShieldCheck, Check } from 'lucide-react';

const AboutPreviewModern = () => {
  const credentials = [
    {
      icon: Award,
      title: "Certified Educator",
      description: "Modern Sex Therapy Institute, USA"
    },
    {
      icon: Heart,
      title: "Intimacy Coach",
      description: "Specialized in couples & individuals"
    },
    {
      icon: Users,
      title: "2,500+ Clients",
      description: "Transformed relationships worldwide"
    }
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative group mx-auto max-w-[500px] lg:max-w-none mb-12 lg:mb-0">
            {/* Decorative background for image */}
            <div className="absolute -inset-4 bg-slate-50 rounded-[2.5rem] lg:rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-700 hidden sm:block" />

            <div className="relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border-4 sm:border-8 border-white">
              <img
                src="/about.jpg"
                alt="Khushboo Bist - Intimacy Coach"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-10 right-4 sm:-bottom-10 sm:-right-6 lg:-right-10 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 sm:p-8 max-w-[220px] sm:max-w-xs border border-white/50 animate-float z-20">
              <div className="flex items-center gap-3 sm:gap-5 mb-3 sm:mb-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg sm:text-3xl font-black text-slate-900 tracking-tight">5+ Years</p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Global Experience</p>
                </div>
              </div>
              <div className="flex -space-x-2 sm:-space-x-3 mb-2 sm:mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-slate-100 border-2 border-white overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="Client" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] sm:text-sm font-bold text-slate-600 leading-tight block">Join 2,500+ couples who rediscovered their spark.</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="animate-fade-in-up text-center lg:text-left">
            <span className="badge-premium mb-4 sm:mb-6 inline-block">Meet Your Guide</span>
            <h2 className="section-title mb-6">
              Hey, I'm <br className="sm:hidden" />
              <span className="text-gradient"> Khushboo Bist!</span>
            </h2>

            <p className="text-base sm:text-xl text-slate-500 font-medium mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I am a certified sex educator and intimacy coach, helping individuals and couples
              navigate the complex world of pleasure, connection, and self-discovery without
              judgment or shame.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 inline-block text-left">
              {[
                "Evidence-based therapeutic techniques",
                "Shame-free & confidential environment",
                "Holistic approach to emotional & physical intimacy"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary stroke-[3px]" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm sm:text-base">{text}</span>
                </div>
              ))}
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {credentials.map((cred, index) => (
                <div key={index} className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100 border border-transparent hover:border-slate-100 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-3 sm:mb-4">
                    <cred.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1 sm:mb-2 leading-tight">{cred.title}</h4>
                  <p className="text-[11px] font-semibold text-slate-400 leading-normal">{cred.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                to="/about"
                className="btn-premium-primary group w-full sm:w-auto text-center justify-center"
              >
                Learn More About Me
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewModern;

