import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { Loader2, Star, Shield, Heart, Award, Users, ArrowRight, CheckCircle, MessageCircle, Sparkles, Brain, Leaf, Flower2 } from 'lucide-react';

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
      icon: Brain,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Holistic Listening & Healing",
      description: "Safe spaces for release, integration, and deep listening practices",
      icon: Leaf,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Ayurvedic Mind-Body Healing",
      description: "Traditional care for embodied balance and natural wellness",
      icon: Flower2,
      color: "bg-orange-50 text-orange-600 border-orange-100",
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading our expert coaches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="badge-premium mb-6">THE EXPERTS</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 tracking-tighter leading-[1.05]">
              Meet Our <br />
              <span className="text-gradient">Expert Coaches</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              Compassionate professionals dedicated to your holistic well-being. Find the guide who resonates with your personal journey.
            </p>

            {/* Specializations Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-slate-200">
              {specializations.map((spec, index) => (
                <div key={index} className={`flex flex-col items-center gap-4 p-6 rounded-3xl border ${spec.color} bg-white transition-transform hover:-translate-y-1 duration-500`}>
                  <div className={`p-4 rounded-2xl ${spec.color} bg-white shadow-sm`}>
                    <spec.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-950 text-sm uppercase tracking-wider mb-2">{spec.title}</h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">{spec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instructors List */}
      <section className="section-padding">
        <div className="container-custom">
          {error ? (
            <div className="text-center bg-red-50 border border-red-100 p-8 rounded-[2rem] max-w-2xl mx-auto">
              <p className="text-red-500 font-bold mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-premium-primary">Try Again</button>
            </div>
          ) : instructors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {instructors.map((instructor, index) => (
                <div key={instructor.id} className="group flex flex-col animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] mb-8 shadow-2xl shadow-slate-200/50">
                    <img
                      src={instructor.profile_image_url || '/placeholder-avatar.jpg'}
                      alt={instructor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="badge-premium mb-3 !bg-white/20 !text-white !border-white/20 backdrop-blur-md">
                        {instructor.specialization}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-3xl font-black text-slate-950 tracking-tight">{instructor.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-black text-slate-950">5.0</span>
                      </div>
                    </div>

                    <p className="text-slate-500 font-medium mb-8 line-clamp-3 leading-relaxed">
                      {instructor.bio}
                    </p>

                    <Link
                      to={`/instructor/${instructor.name}`}
                      className="mt-auto w-full btn-premium-primary !bg-slate-950 !shadow-slate-950/20 py-5"
                    >
                      Book A Session
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
              <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-950 mb-2">Expanding Our Team</h3>
              <p className="text-slate-500 font-medium font-serif italic text-xl">New experts are coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Grid */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-2 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <p className="text-center text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-12">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
            {['BBC', 'Vogue', 'Mint', 'Deccan', 'Huf'].map((logo, index) => (
              <img key={index} src={`/Featured/${logo}.jpg`} alt={logo} className="h-8 md:h-12 w-auto object-contain hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-xl">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">Start Your Journey</h2>
              <p className="text-xl text-slate-400 font-medium">Book a session with one of our specialized guides.</p>
            </div>
            <div className="flex items-center gap-8">
              <Link to="/contact" className="hidden sm:block text-white font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors">Partner With Us?</Link>
              <Link to="/sessions" className="btn-premium-primary !bg-white !text-primary transform hover:scale-105 shadow-2xl">
                Book Khushboo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorsModern;
