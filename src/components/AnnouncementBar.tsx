import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface AnnouncementBarProps {
  message: string;
  linkText: string;
  linkUrl: string;
  bgColor?: string;
  textColor?: string;
}

const AnnouncementBar = ({
  message,
  linkText,
  linkUrl,
  bgColor = '#FFE5EC',
  textColor = '#FF5A84'
}: AnnouncementBarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      className="relative py-3 px-4 text-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container-custom flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <p className="text-sm sm:text-base font-medium" style={{ color: textColor }}>
          {message}
        </p>
        <Link 
          to={linkUrl}
          className="font-medium underline underline-offset-2 text-sm sm:text-base hover:opacity-80 transition-opacity"
          style={{ color: textColor }}
        >
          {linkText} →
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close announcement"
      >
        <X size={18} style={{ color: textColor }} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
