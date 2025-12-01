import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Award, Play } from "lucide-react";
import { useState } from "react";

export default function HeroModern() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FFF7EC]">

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-pink-100 rounded-full px-4 py-2 mb-6 shadow-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">2,500+</span> couples transformed
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight mb-6">
              <span className="text-gray-800">Reignite Your</span>
              <br />
              <span className="text-[#FF7A9A]">
                Intimate Connection
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Expert-guided sessions, playbooks & community support to help you and your partner 
              <span className="text-[#FF5A84] font-medium"> experience deeper pleasure</span> and lasting intimacy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link 
                to="/sessions" 
                className="group inline-flex items-center justify-center gap-2 bg-[#FF7A9A] text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-pink-200/50 hover:bg-[#FF5A84] hover:shadow-xl hover:shadow-pink-300/50 transition-all duration-300 hover:-translate-y-1"
              >
                Book Free Discovery Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">4.9/5 Rating</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Users className="w-5 h-5 text-[#FF5A84]" />
                  <span className="text-xl font-bold text-gray-800">10K+</span>
                </div>
                <p className="text-sm text-gray-500">Community</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Award className="w-5 h-5 text-[#FF5A84]" />
                  <span className="text-xl font-bold text-gray-800">Certified</span>
                </div>
                <p className="text-sm text-gray-500">USA Institute</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/30 bg-white">
                <img 
                  src="/hero_banner/single-hero.png" 
                  alt="Khushboo Bist - Sex Educator and Intimacy Coach" 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Card - Top Right */}
              <div className="absolute -top-4 -right-4 lg:top-8 lg:-right-8 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">100% Confidential</p>
                    <p className="text-sm text-gray-500">Safe & Private</p>
                  </div>
                </div>
              </div>

              {/* Floating Card - Bottom Left */}
              <div className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8 bg-white rounded-2xl shadow-xl p-4 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A9A] flex items-center justify-center">
                    <span className="text-white text-lg">❤️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Expert Guidance</p>
                    <p className="text-sm text-gray-500">Certified Coach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="How It Works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
}
