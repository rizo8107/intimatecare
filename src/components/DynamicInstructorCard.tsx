import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DayScheduleButton from './DayScheduleButton';

interface DayScheduleHour { time: string; available: number; users: number[] }
interface DayScheduleSlot { date: string; capacity: number; hours: DayScheduleHour[] }
interface DayScheduleAvailability { slots: DayScheduleSlot[]; time_zone?: string; duration?: number }

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
  const [loadingSlots, setLoadingSlots] = React.useState<boolean>(false);
  const [slotTimes, setSlotTimes] = React.useState<string[]>([]);
  const [slotError, setSlotError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchAvailability = async () => {
      if (!instructor.event_id) return; // No external availability configured
      try {
        setLoadingSlots(true);
        setSlotError(null);

        const today = new Date();
        const end = new Date();
        end.setDate(today.getDate() + 14);

        const fmt = (d: Date) => d.toISOString().split('T')[0];
        const startStr = fmt(today);
        const endStr = fmt(end);

        const url = `https://api.dayschedule.com/v2/public/availability/${instructor.event_id}?start=${startStr}&end=${endStr}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to load availability');
        const json: DayScheduleAvailability = await res.json();

        // Flatten hours[].time to a list of ISO strings, keep earliest few
        const times: string[] = (json?.slots || [])
          .flatMap((s: DayScheduleSlot) => (s.hours || []).map((h: DayScheduleHour) => h.time))
          .filter((t: string) => typeof t === 'string');

        // Sort by datetime ascending and take first 3
        times.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        const firstThree = times.slice(0, 3);

        // Format times for display
        const formatter = new Intl.DateTimeFormat(undefined, {
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
        const labels = firstThree.map(t => formatter.format(new Date(t)));
        setSlotTimes(labels);
      } catch (e) {
        setSlotError('Unable to fetch availability');
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailability();
  }, [instructor.event_id]);

  return (
    <div className="bg-[#FFF6F8] border border-[#FFE5EC] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full p-4">
      <div className="w-full h-80 rounded-xl overflow-hidden mb-4">
        <img src={instructor.profile_image_url} alt={instructor.name} className="w-full h-full object-cover" />
      </div>
      <div className="text-center flex-grow flex flex-col">
        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-1">{instructor.name}</h3>
        <p style={{ color: instructor.highlight_color }} className="font-medium text-md mb-3">{instructor.specialization}</p>
        <p className="text-gray-600 text-sm mb-3 px-2">{instructor.bio.substring(0, 120)}...</p>

        {/* Availability preview */}
        {instructor.event_id && (
          <div className="mb-4 min-h-[24px]">
            {loadingSlots && (
              <div className="flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulse"></span>
                <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulse [animation-delay:150ms]"></span>
                <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulse [animation-delay:300ms]"></span>
              </div>
            )}
            {!loadingSlots && slotError && <p className="text-xs text-red-500">{slotError}</p>}
            {!loadingSlots && !slotError && slotTimes.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wide text-rose-500 mb-1">Next slots</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {slotTimes.map((label, idx) => (
                    <Link
                      key={idx}
                      to={`/instructor/${instructor.name}`}
                      className="px-3 py-1 rounded-full border border-rose-300 text-rose-700 bg-white hover:bg-rose-50 text-xs shadow-sm transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {!loadingSlots && !slotError && slotTimes.length === 0 && (
              <p className="text-xs text-gray-500">No upcoming slots in 2 weeks</p>
            )}
          </div>
        )}

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
