import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

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
      name: "Anonymous",
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
    }, 5000);
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
    <section className="py-16 md:py-24 bg-[#FFF7EC] overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-[#FF5A84] rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
            Real Couples, Real
            <span className="text-[#FF7A9A]"> Transformations</span>
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of couples who have reignited their passion and deepened their connection.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-8 right-8 w-16 h-16 text-pink-100" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-pink-400 flex items-center justify-center text-white text-xl font-bold">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-gray-500">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-pink-50 rounded-full">
                  <span className="text-sm font-medium text-[#FF5A84]">{testimonials[currentIndex].service}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#FF5A84] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { number: "2,500+", label: "Couples Helped" },
            { number: "4.9/5", label: "Average Rating" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "50+", label: "Countries" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-[#FF7A9A] mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
