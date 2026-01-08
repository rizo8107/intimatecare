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
    <div className="group relative rounded-[2.5rem] bg-white border border-slate-100 p-5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

      {/* Image Container */}
      <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] mb-6 shadow-inner bg-slate-50">
        <img
          src={instructor.profile_image_url}
          alt={instructor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/400x500/F8FAFC/FF5A84?text=${instructor.name.charAt(0)}&font=playfair`;
          }}
        />

        {/* Verification Badge - Premium Style */}
        <div className="absolute top-5 right-5 glass px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/40 shadow-xl shadow-black/5 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">Verified Expert</span>
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-5 left-5 glass-dark px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10 shadow-xl shadow-black/20 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse border border-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Online</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 flex-grow flex flex-col">
        {/* Specialization Badge */}
        <div className="mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
            {instructor.specialization}
          </span>
        </div>

        <h3 className="text-3xl font-black text-slate-950 mb-2 group-hover:translate-x-1 transition-transform duration-300 tracking-tighter">
          {instructor.name}
        </h3>

        <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow line-clamp-2">
          {instructor.bio}
        </p>

        {/* Actions - Modern & Stacked */}
        <div className="space-y-3 mt-auto">
          {instructor.dayschedule_url ? (
            <DayScheduleButton
              url={instructor.dayschedule_url}
              colors={{ primary: '#FF5A84', secondary: '#FDF2F8' }}
              label="Book Private Session"
              className="w-full btn-premium-primary !py-4 h-auto text-sm shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
            />
          ) : null}

          <Link
            to={`/instructor/${instructor.name}`}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 border border-slate-100"
          >
            <User className="w-4 h-4" />
            View Expert Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicInstructorCard;

