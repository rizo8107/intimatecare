import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import DynamicInstructorCard from './DynamicInstructorCard';
import { Loader2, ArrowRight } from 'lucide-react';

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
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
            Meet Our Instructors
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our compassionate instructors are here to guide you on your journey to holistic well-being.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-purple-700" />
          </div>
        )}

        {error && <div className="text-center py-10 text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <DynamicInstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>

            {instructors.length > 0 && (
              <div className="mt-12 text-center">
                <Link 
                  to="/instructors"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#FF5A84] hover:bg-[#FF4A7A] transition-colors duration-300 shadow-lg"
                >
                  View All Instructors <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SessionsPreview;
