import React from 'react';

interface StickyBarProps {
  message: string;
  ctaText: string;
  ctaLink: string;
  onClose?: () => void;
}

const StickyBar: React.FC<StickyBarProps> = ({ message, ctaText, ctaLink, onClose }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#5D4777] text-white p-3 shadow-lg z-50 flex items-center justify-between animate-slideInUp">
      <p className="text-sm md:text-base flex-grow mr-3">{message}</p>
      <div className="flex items-center flex-shrink-0">
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#D9A6FF] hover:bg-[#C88DF7] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors mr-3 whitespace-nowrap"
        >
          {ctaText}
        </a>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200 text-2xl leading-none"
            aria-label="Close sticky bar"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default StickyBar;
