import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  profile_image_url: string;
  highlight_color: string;
  show_in_card: boolean;
}

const DynamicInstructorCard: React.FC<{ instructor: Instructor }> = ({ instructor }) => {
  return (
    <div className="bg-[#FFF6F8] border border-[#FFE5EC] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full p-4">
      <div className="w-full h-80 rounded-xl overflow-hidden mb-4">
        <img src={instructor.profile_image_url} alt={instructor.name} className="w-full h-full object-cover" />
      </div>
      <div className="text-center flex-grow flex flex-col">
        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-1">{instructor.name}</h3>
        <p style={{ color: instructor.highlight_color }} className="font-medium text-md mb-3">{instructor.specialization}</p>
        <p className="text-gray-600 text-sm mb-6 flex-grow px-2">{instructor.bio.substring(0, 120)}...</p>
        <Link 
          to={`/instructor/${instructor.name}`}
          className="mt-auto block w-full bg-[#FF5A84] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#FF4A7A] transition-colors duration-300 shadow-md"
        >
          Book a Session
        </Link>
      </div>
    </div>
  );
};

export default DynamicInstructorCard;
