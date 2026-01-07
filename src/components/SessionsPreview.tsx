import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Loader2, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Instructor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  profile_image_url: string;
  highlight_color: string;
  show_in_card: boolean;
}

const SessionsPreview = () => {
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
          .limit(3);

        if (error) {
          throw new Error('Failed to fetch instructors.');
        }

        setInstructors(data || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <section className="section-padding bg-slate-50/50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 animate-fade-in-up">
          <div className="max-w-2xl text-center md:text-left">
            <span className="badge-premium mb-6">Expert Guidance</span>
            <h2 className="section-title">
              Learn from the <br />
              <span className="text-gradient">World's Best Experts</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium">
              Our compassionate, USA-certified instructors are dedicated to helping you achieve lasting intimacy and pleasure.
            </p>
          </div>
          <div className="hidden md:block">
            <Link
              to="/instructors"
              className="btn-premium-outline group"
            >
              View All Experts
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Finding the best experts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-red-100 p-10">
            <p className="text-red-500 font-bold mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-premium-primary">Retry</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {instructors.map((instructor, index) => (
                <motion.div
                  key={instructor.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/instructor/${instructor.name}`} className="group block h-full">
                    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative aspect-[4/5] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden mb-3 md:mb-6">
                        <img
                          src={instructor.profile_image_url}
                          alt={instructor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Floating Badge (Left) */}
                        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/60 backdrop-blur-md px-2 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 hidden xs:block">
                          <span className="text-[8px] md:text-xs font-medium text-white tracking-wide">
                            VERIFIED
                          </span>
                        </div>

                        {/* Icon Badge (Right) */}
                        <div className="absolute top-2 right-2 md:top-4 md:right-4 w-7 h-7 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <ShieldCheck className="w-3.5 h-3.5 md:w-5 md:h-5 text-emerald-500" />
                        </div>

                        {/* Dots Indicator (Visual only) */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/50 backdrop-blur-sm" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/50 backdrop-blur-sm" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-1 md:px-2 pb-1 md:pb-2 flex flex-col flex-grow">
                        <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-0.5 md:mb-1 tracking-tight leading-tight line-clamp-1">
                          {instructor.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <p className="text-slate-400 font-medium text-[10px] md:text-sm line-clamp-1" style={{ color: instructor.highlight_color }}>
                            {instructor.specialization}
                          </p>
                          <span className="w-[1px] h-3 bg-slate-200" />
                          <div className="flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-[#FFB800] fill-[#FFB800]" />
                            <span className="text-[10px] md:text-xs font-bold text-slate-600">5.0</span>
                          </div>
                        </div>

                        <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2">
                          {instructor.bio}
                        </p>

                        {/* Footer */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mt-auto gap-2">
                          <div className="px-3 py-1.5 md:px-5 md:py-2.5 bg-slate-100 rounded-full text-center">
                            <span className="text-slate-900 font-bold tracking-tight text-xs md:text-base">Book Now</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-2.5 bg-slate-900 rounded-full text-white font-medium group-hover:bg-primary transition-colors text-[10px] md:text-base">
                            <span className="hidden md:inline">View Profile</span>
                            <span className="md:hidden">Profile</span>
                            <div className="bg-white/20 rounded-full p-0.5 hidden md:block">
                              <ArrowRight className="w-3 h-3 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center md:hidden animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link
                to="/instructors"
                className="btn-premium-primary w-full"
              >
                Explore All Instructors <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Social Proof Footer */}
            <div className="mt-20 flex flex-wrap justify-center items-center gap-10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i + 20}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-600">Rated <span className="text-primary">4.9/5</span> by clients</span>
              </div>
              <div className="flex items-center gap-1 text-[#FFB800]">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SessionsPreview;

