import { Link } from 'react-router-dom';
import { Award, Heart, Users, ArrowRight } from 'lucide-react';

const AboutPreviewModern = () => {
  const credentials = [
    {
      icon: Award,
      title: "Certified Sex Educator",
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
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/about.jpg" 
                alt="Khushboo Bist - Sex Educator and Intimacy Coach" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FF7A9A] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">5+ Years</p>
                  <p className="text-sm text-gray-500">Helping couples thrive</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white -ml-2 first:ml-0"></div>
                ))}
                <span className="ml-2 text-sm text-gray-600 self-center">+2,500 happy clients</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-pink-100 text-[#FF5A84] rounded-full text-sm font-medium mb-4">
              Meet Your Guide
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
              Hey, I'm
              <span className="text-[#FF7A9A]"> Khushboo Bist!</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              A certified sex educator, intimacy coach, and your go-to guide for all things 
              pleasure, connection, and self-discovery. I believe that everyone deserves a 
              fulfilling intimate life, free from shame and confusion.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              My mission is simple: to help you and your partner experience deeper connection, 
              better communication, and more pleasure. Whether you're navigating challenges or 
              simply want to enhance what you already have, I'm here to guide you.
            </p>

            {/* Credentials */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {credentials.map((cred, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                  <cred.icon className="w-8 h-8 text-[#FF5A84] mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{cred.title}</h4>
                  <p className="text-xs text-gray-500">{cred.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link 
              to="/about"
              className="group inline-flex items-center gap-2 bg-[#FF7A9A] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#FF5A84] hover:shadow-lg transition-all duration-300"
            >
              Learn More About Me
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewModern;
