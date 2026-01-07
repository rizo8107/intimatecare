import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from 'lucide-react';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Priya & Rahul",
      location: "Mumbai",
      image: "/testimonials/couple1.jpg",
      rating: 5,
      text: "The 30-Day Challenge completely transformed our relationship. We went from barely talking about intimacy to having the most connected conversations we've ever had. Khushboo's approach is so warm and non-judgmental.",
      service: "30-Day Pleasure Challenge"
    },
    {
      name: "Anjali",
      location: "Delhi",
      image: null,
      rating: 5,
      text: "I was so nervous before my first session, but Khushboo made me feel completely at ease. She helped me understand things about myself I never knew. My confidence has skyrocketed!",
      service: "1:1 Coaching Session"
    },
    {
      name: "Sneha",
      location: "Bangalore",
      image: "/testimonials/woman1.jpg",
      rating: 5,
      text: "The 69 Position Playbook is incredible! It's not just about positions - it's about connection, communication, and pleasure. My partner and I have never been closer.",
      service: "69 Position Playbook"
    },
    {
      name: "Couple from Chennai",
      location: "Chennai",
      image: null,
      rating: 5,
      text: "After 8 years of marriage, we thought we knew everything. The Pleasure School Community opened our eyes to so much more. The monthly masterclasses are worth every minute!",
      service: "Pleasure School Community"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="section-padding bg-slate-50/50 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="badge-premium mb-6">Success Stories</span>
          <h2 className="section-title">
            Real Couples, Real
            <span className="text-gradient"> Transformations</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            Join thousands who have reignited their passion and deepened their connection through our guided approach.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] p-10 md:p-16 relative overflow-hidden transition-all duration-500 border border-slate-100/50">
            {/* Quote Icon */}
            <div className="absolute top-10 right-10 opacity-[0.05] pointer-events-none">
              <Quote className="w-40 h-40 text-primary rotate-12" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Rating */}
              <div className="flex gap-1 mb-8 bg-slate-50 px-4 py-2 rounded-full">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-slate-800 leading-tight mb-12 font-black tracking-tight max-w-3xl">
                “{testimonials[currentIndex].text}”
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-6 pt-10 border-t border-slate-100 w-full">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-primary/20">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-black text-slate-950 flex items-center gap-2">
                      {testimonials[currentIndex].name}
                      <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10" title="Verified Transformation" />
                    </h4>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-10 bg-slate-200" />
                <div className="px-6 py-2.5 bg-primary/5 rounded-full border border-primary/10">
                  <span className="text-xs font-black text-primary uppercase tracking-widest">{testimonials[currentIndex].service}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-8 -right-8 flex justify-between pointer-events-none hidden lg:flex">
            <button
              onClick={goToPrev}
              className="pointer-events-auto w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:scale-110 active:scale-95 group border border-slate-100"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={goToNext}
              className="pointer-events-auto w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:scale-110 active:scale-95 group border border-slate-100"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Arrows & Dots */}
          <div className="flex flex-col items-center mt-12 gap-8 lg:hidden">
            <div className="flex gap-4">
              <button onClick={goToPrev} className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-600 active:scale-90 transition-all border border-slate-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={goToNext} className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-600 active:scale-90 transition-all border border-slate-100">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-12 lg:mt-16">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-700 ${index === currentIndex
                    ? 'bg-primary w-12'
                    : 'bg-slate-200 w-2 hover:bg-slate-300'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-24">
          {[
            { number: "2,500+", label: "Couples Helped", color: "text-primary" },
            { number: "4.9/5", label: "Average Rating", color: "text-[#FFB800]" },
            { number: "98%", label: "Satisfaction Rate", color: "text-emerald-500" },
            { number: "50+", label: "Countries Served", color: "text-blue-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className={`text-3xl md:text-5xl font-black ${stat.color} mb-3 tracking-tighter`}>
                {stat.number}
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

