import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShieldCheck } from 'lucide-react';
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
    <div className="group rounded-[2.5rem] bg-white border border-slate-100 p-4 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] mb-6">
        <img
          src={instructor.profile_image_url}
          alt={instructor.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Verification Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/50 shadow-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Verified Expert</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Active Now</span>
        </div>

        <h3 className="text-2xl font-black text-slate-950 mb-1 group-hover:text-primary transition-colors tracking-tight">{instructor.name}</h3>
        <p className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: instructor.highlight_color }}>
          {instructor.specialization}
        </p>

        <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
          {instructor.bio.substring(0, 100)}...
        </p>

        {/* Booking actions */}
        <div className="space-y-3">
          {instructor.dayschedule_url ? (
            <DayScheduleButton
              url={instructor.dayschedule_url}
              colors={{ primary: '#FF7A9A', secondary: '#FDF2F8' }}
              label="Book Private Session"
              className="w-full btn-premium-primary !py-4 text-sm"
            />
          ) : null}

          <Link
            to={`/instructor/${instructor.name}`}
            className="btn-premium-outline w-full !py-4 text-sm font-black uppercase tracking-widest"
          >
            <User className="w-4 h-4 mr-2" />
            Expert Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicInstructorCard;

