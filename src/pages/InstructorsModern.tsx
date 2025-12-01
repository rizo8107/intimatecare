import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { Loader2, Star, Shield, Heart, Award, Users, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  profile_image_url: string;
  highlight_color: string;
  show_in_card: boolean;
  display_order: number;
}

const InstructorsModern = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('instructors')
          .select('*')
          .eq('show_in_card', true)
          .order('display_order', { ascending: true });

        if (error) throw new Error('Failed to fetch coaches.');
        setInstructors(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const trustBadges = [
    { icon: Shield, title: "100% Confidential", description: "Your privacy is sacred" },
    { icon: Award, title: "Certified Experts", description: "Qualified professionals" },
    { icon: Heart, title: "Compassionate Care", description: "Judgment-free support" },
    { icon: Users, title: "Holistic Approach", description: "Mind, body & spirit" }
  ];

  const specializations = [
    {
      title: "Psychology & Emotional Wellness",
      description: "Therapeutic care for mental health, trauma healing, and emotional balance",
      icon: "🧠",
      color: "bg-[#E6F4FF]",
    },
    {
      title: "Holistic Listening & Healing",
      description: "Safe spaces for release, integration, and deep listening practices",
      icon: "🌿",
      color: "bg-[#E5F6F0]",
    },
    {
      title: "Ayurvedic Mind-Body Healing",
      description: "Traditional care for embodied balance and natural wellness",
      icon: "🪷",
      color: "bg-[#FFF3E0]",
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF7EC]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#FF5A84] mx-auto mb-4" />
          <p className="text-gray-600">Loading our expert coaches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF7EC]">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-[#FF5A84] text-white rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7EC] min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FFE5F0] text-[#f491c2] rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Expert Healing & Support
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-6 leading-tight">
              Meet Our
              <span className="text-[#f491c2]"> Expert Coaches</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Compassionate professionals dedicated to your holistic well-being. 
              Find the guide who resonates with your personal journey.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {trustBadges.map((badge, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <badge.icon className="w-8 h-8 text-[#f491c2] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800 text-sm">{badge.title}</h4>
                <p className="text-xs text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* Specializations */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {specializations.map((spec, index) => (
              <div key={index} className={`${spec.color} rounded-2xl p-6 text-gray-800 border border-white/60 shadow-sm`}>
                <div className="text-3xl mb-3">{spec.icon}</div>
                <h3 className="text-lg font-bold mb-1">{spec.title}</h3>
                <p className="text-gray-600 text-sm">{spec.description}</p>
              </div>
            ))}
          </div>

          {/* Instructors Grid */}
          {instructors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <div 
                  key={instructor.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-[#FFE5EC]"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img 
                      src={instructor.profile_image_url || '/placeholder-avatar.jpg'} 
                      alt={instructor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white drop-shadow-sm">{instructor.name}</h3>
                      <p className="text-white/90 text-sm drop-shadow-sm">{instructor.specialization}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col h-full">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{instructor.bio}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">5.0</span>
                    </div>

                    <Link
                      to={`/instructor/${instructor.name}`}
                      className="group/btn w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Book Session
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Coaches Available</h3>
              <p className="text-gray-500">Please check back soon for our expert coaches.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Coaches */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              Why Choose Our Coaches
            </h2>
            <p className="text-lg text-gray-600">Every coach brings unique expertise to your healing journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Certified & Qualified",
                description: "All our coaches hold relevant certifications and have extensive experience in their fields.",
                icon: Award
              },
              {
                title: "Personalized Approach",
                description: "Sessions are tailored to your specific needs, concerns, and goals for maximum impact.",
                icon: Heart
              },
              {
                title: "Confidential & Safe",
                description: "Your privacy is paramount. All sessions are conducted in a secure, judgment-free environment.",
                icon: Shield
              },
              {
                title: "Holistic Healing",
                description: "We address mind, body, and spirit for comprehensive well-being and lasting transformation.",
                icon: Users
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-[#F4FFFA] p-6 rounded-2xl border border-[#D9F0E6]">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FFE5F0]">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#b53f76] mb-6">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-[#7a234d]/80 mb-8">
            Choose a coach who resonates with you and take the first step towards transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sessions"
              className="group inline-flex items-center justify-center gap-2 bg-[#f491c2] hover:bg-[#FF5A84] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Book with Khushboo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#b53f76] text-[#b53f76] font-bold py-4 px-8 rounded-full hover:bg-[#FFE5F0] transition-all duration-300"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['BBC.jpg', 'Vogue.jpg', 'Mint.jpg', 'Deccan.jpg', 'Huf.jpg'].map((logo, index) => (
              <div key={index} className="w-24 md:w-32 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <img src={`/Featured/${logo}`} alt={logo} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorsModern;
