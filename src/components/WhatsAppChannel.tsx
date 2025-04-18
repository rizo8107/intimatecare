import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppChannel = () => {
  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#E1FFE2] rounded-full flex items-center justify-center">
          <MessageCircle size={28} className="text-[#25D366]" />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-serif font-medium text-gray-800 mb-4">
          Join My WhatsApp Channel
        </h3>
        <p className="text-gray-700 mb-6">
          Get exclusive tips, updates, and intimate care advice directly on WhatsApp.
        </p>
        
        <a 
          href="https://whatsapp.com/channel/0029VbAhYG93QxS0OHSHd623" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center py-3 px-8 bg-[#25D366] text-white rounded-full hover:bg-[#1DA851] transition-colors font-medium"
        >
          <MessageCircle size={18} className="mr-2" />
          Join "Khushboo Bist: Let's talk Intimate Care"
        </a>
        
        <p className="text-sm text-gray-600 mt-4">
          Stay updated with the latest content and connect with a community of like-minded individuals.
        </p>
      </div>
    </div>
  );
};

export default WhatsAppChannel;
