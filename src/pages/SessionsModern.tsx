import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, MessageCircle, CheckCircle, Star, Shield, Heart, ArrowRight, Users, Award, Zap, Phone } from 'lucide-react';

const SessionsModern = () => {
  const sessions = [
    {
      id: 'regular',
      title: "Sex Education Consultation",
      subtitle: "With Khushboo",
      duration: "45 minutes",
      price: "₹2,500",
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-pink-500 to-rose-500",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      image: "/working.webp",
      link: "https://topmate.io/intimatecare/1102760",
      features: [
        "Personalized 1:1 guidance",
        "Confidential & judgment-free",
        "Expert advice on intimacy",
        "Practical techniques you can use",
        "Follow-up resources included"
      ],
      highlights: [
        "Because most of us were never taught how to talk about sex",
        "Real questions about pleasure deserve real answers",
        "Healthy intimacy starts with informed conversations"
      ]
    },
    {
      id: 'student',
      title: "Student Special Session",
      subtitle: "Affordable Support",
      duration: "45 minutes",
      price: "₹299",
      originalPrice: "₹999",
      badge: "For Students",
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      image: "/students.webp",
      link: "https://topmate.io/intimatecare/1823535",
      features: [
        "Same quality, student pricing",
        "Safe space for young adults",
        "Navigate relationships confidently",
        "Understand consent & boundaries",
        "Build healthy habits early"
      ],
      highlights: [
        "Because pleasure is part of well-being",
        "Your curiosity is valid",
        "Start your journey to healthy intimacy"
      ]
    }
  ];

  const steps = [
    { number: 1, title: "Choose Your Session", description: "Select the session type that fits your needs", color: "bg-pink-100 text-pink-600" },
    { number: 2, title: "Pick a Time Slot", description: "Book a convenient time on Topmate", color: "bg-green-100 text-green-600" },
    { number: 3, title: "Complete Payment", description: "Secure payment with instant confirmation", color: "bg-orange-100 text-orange-600" },
    { number: 4, title: "Join Your Session", description: "Connect via the link sent to your email", color: "bg-purple-100 text-purple-600" }
  ];

  const testimonials = [
    {
      text: "Khushboo's guidance was transformative for my relationship. She provided practical advice that helped me communicate better with my partner.",
      author: "Anonymous Client",
      rating: 5
    },
    {
      text: "I was nervous about discussing such personal topics, but Khushboo made me feel completely at ease. Her approach is professional and empathetic.",
      author: "Satisfied Client",
      rating: 5
    },
    {
      text: "The one-on-one session gave me insights I couldn't have found anywhere else. Worth every penny for personalized advice.",
      author: "Grateful Client",
      rating: 5
    }
  ];

  const trustBadges = [
    { icon: Shield, title: "100% Confidential", description: "Your privacy is sacred" },
    { icon: Award, title: "Certified Expert", description: "USA-certified educator" },
    { icon: Heart, title: "Judgment-Free", description: "Safe space guaranteed" },
    { icon: Users, title: "2,500+ Helped", description: "Trusted by thousands" }
  ];

  return (
    <div className="bg-gradient-to-b from-[#FFF5F7] via-white to-[#FFF0F5] min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-[#FF5A84] rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Phone className="w-4 h-4" />
              Premium 1:1 Sessions
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-6 leading-tight">
              Expert Guidance for Your
              <span className="bg-gradient-to-r from-[#FF5A84] to-[#9B59B6] bg-clip-text text-transparent"> Intimate Life</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Struggling with something and need to talk? Let's figure it out together in a safe, 
              confidential, judgment-free space.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {trustBadges.map((badge, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <badge.icon className="w-8 h-8 text-[#FF5A84] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800 text-sm">{badge.title}</h4>
                <p className="text-xs text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* Session Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className={`bg-gradient-to-br ${session.bgGradient} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Badge */}
                <div className={`${session.badgeColor} text-white text-center py-2 font-medium`}>
                  {session.badge}
                </div>

                {/* Image */}
                <div className="p-6 pb-0">
                  <img 
                    src={session.image} 
                    alt={session.title}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-1">{session.title}</h3>
                  <p className="text-gray-500 mb-4">{session.subtitle}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="text-right">
                      {session.originalPrice && (
                        <span className="text-gray-400 line-through text-sm mr-2">{session.originalPrice}</span>
                      )}
                      <span className={`text-2xl font-bold bg-gradient-to-r ${session.gradient} bg-clip-text text-transparent`}>
                        {session.price}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {session.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 bg-gradient-to-r ${session.gradient} text-white rounded-full p-0.5`} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={session.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${session.gradient} text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    Book Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
                What to Expect in Your Session
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sometimes, just talking about a problem can bring clarity. In our session, we'll explore 
                your concerns, find solutions, and if needed—I'll simply listen and offer suggestions.
              </p>
              <div className="space-y-4">
                {[
                  "Personalized advice for your specific situation",
                  "Discuss sensitive topics in a safe environment",
                  "Learn practical techniques to improve intimacy",
                  "Address relationship challenges with expert guidance",
                  "Get answers to questions you can't ask elsewhere"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#FF5A84] flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="/sessions.webp" 
                alt="One-on-One Session"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Audio/Video Call</p>
                    <p className="text-sm text-gray-500">Your choice of format</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5F7] to-[#F8F4FF]">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              How to Book Your Session
            </h2>
            <p className="text-lg text-gray-600">Simple 4-step process to get started</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200"></div>
                )}
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg`}>
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-pink-50 border border-pink-100 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-[#FF5A84]">
              <Shield className="w-5 h-5" />
              <span className="font-medium">All sessions are completely confidential. Your privacy is our top priority.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              What Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm font-medium text-gray-600">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#FF5A84] via-[#FF7A9A] to-[#9B59B6]">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Transform Your Intimate Life?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your session today and take the first step towards deeper connection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://topmate.io/intimatecare/1102760"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-white text-[#FF5A84] font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Book Regular Session - ₹2,500
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://topmate.io/intimatecare/1823535"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Student Session - ₹299
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SessionsModern;
