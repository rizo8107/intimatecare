import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DayScheduleButton from './DayScheduleButton';

interface Instructor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  profile_image_url: string;
  highlight_color: string;
  show_in_card: boolean;
  event_id?: string | null;
  dayschedule_url?: string | null; // Full booking URL for popup widget
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
        <p className="text-gray-600 text-sm mb-3 px-2">{instructor.bio.substring(0, 120)}...</p>

        {/* Booking actions */}
        <div className="mt-auto grid grid-cols-1 gap-2">
          {instructor.dayschedule_url ? (
            <DayScheduleButton
              url={instructor.dayschedule_url}
              colors={{ primary: '#FF5A84', secondary: '#FFE5EC' }}
              label="Book with Calendar"
              className="w-full bg-[#FF5A84] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#FF4A7A] transition-colors duration-300 shadow-md"
            />
          ) : null}

          <Link 
            to={`/instructor/${instructor.name}`}
            className="block w-full border border-[#FF5A84] text-[#FF5A84] text-center py-3 rounded-lg font-semibold hover:bg-rose-50 transition-colors duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicInstructorCard;
