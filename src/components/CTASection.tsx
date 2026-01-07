import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Clock, Shield } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* High-Impact Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-rose-500 to-accent" />

      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 md:p-20 border border-white/20 shadow-2xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-2.5 mb-10 border border-white/10">
              <Gift className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white text-sm font-black uppercase tracking-widest">Limited Offer</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              Ready to Rediscover <br />
              <span className="text-white/80">Your Connection?</span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Take the first step towards a more fulfilling intimate life. Book your confidential 15-minute discovery call today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/sessions"
                className="btn-premium-primary !bg-white !text-primary transform hover:scale-105 transition-all text-lg py-5 px-10"
              >
                Book Free Discovery Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/freebie"
                className="btn-premium-outline !border-white !text-white hover:!bg-white/10 text-lg py-5 px-10"
              >
                Download Free Guide
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">15-min free call</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 text-white">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">100% confidential</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 text-white">
                  <Gift className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">No obligation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

