import React from 'react';

interface UpsellPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  originalPrice?: string;
  discountedPrice: string;
  productImage?: string;
}

const UpsellPopup: React.FC<UpsellPopupProps> = ({
  isOpen,
  onClose,
  title,
  description,
  ctaText,
  ctaLink,
  originalPrice,
  discountedPrice,
  productImage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-md w-full relative transform scale-100 animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-3xl leading-none"
          aria-label="Close popup"
        >
          &times;
        </button>
        
        {productImage && (
          <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
            <img src={productImage} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-serif font-semibold text-gray-800 mb-3 text-center">{title}</h2>
        <p className="text-gray-600 mb-5 text-center text-sm md:text-base">{description}</p>

        <div className="mb-6 text-center">
          {originalPrice && (
            <span className="text-lg line-through text-gray-500 mr-2">
              {originalPrice}
            </span>
          )}
          <span className="text-3xl font-serif text-[#D9A6FF] font-bold">
            {discountedPrice}
          </span>
        </div>

        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#D9A6FF] hover:bg-[#C88DF7] text-white py-3 px-6 rounded-full text-center font-semibold transition-colors text-base md:text-lg mb-3"
        >
          {ctaText}
        </a>
        <button
            onClick={onClose}
            className="block w-full text-gray-600 hover:text-gray-800 py-2.5 px-6 rounded-full text-center font-medium transition-colors border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 text-sm md:text-base"
        >
            No, thanks
        </button>
      </div>
    </div>
  );
};

export default UpsellPopup;
