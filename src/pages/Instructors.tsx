import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import DynamicInstructorCard from '../components/DynamicInstructorCard';
import { Loader2 } from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  profile_image_url: string;
  highlight_color: string;
  show_in_card: boolean;
}

const InstructorsPage: React.FC = () => {
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
          .eq('show_in_card', true);

        if (error) {
          throw new Error('Failed to fetch instructors. Please try again later.');
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-700" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Meet Our Instructors
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Compassionate instructors dedicated to your holistic well-being.
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Guide to Transformation</h2>
          <p className="text-gray-600 leading-relaxed">
            Every instructor brings a unique perspective and set of skills. We encourage you to read through their profiles, understand their approach, and choose the guide who resonates most with your personal journey. Your path to healing and self-discovery starts with the right connection.
          </p>
        </div>

        {instructors.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <DynamicInstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No instructors found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorsPage;
