import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Clock, Shield } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f491c2] relative overflow-hidden">

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Gift className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Limited Time: Free Discovery Call</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Ready to Transform Your
            <br />
            Intimate Connection?
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book a free 15-minute discovery call to discuss your goals and find the perfect path forward. 
            No pressure, just genuine support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/sessions"
              className="group inline-flex items-center justify-center gap-2 bg-white text-[#FF5A84] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Book Free Discovery Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/freebie"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-bold px-8 py-4 rounded-full border-2 border-white/50 hover:bg-white/10 transition-all duration-300"
            >
              Get Free Guide First
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">15-min free call</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">100% confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span className="text-sm">No obligation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
