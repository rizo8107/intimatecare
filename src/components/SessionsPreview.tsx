import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import DynamicInstructorCard from './DynamicInstructorCard';
import { Loader2, ArrowRight, Star } from 'lucide-react';

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {instructors.map((instructor) => (
                <DynamicInstructorCard key={instructor.id} instructor={instructor} />
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

