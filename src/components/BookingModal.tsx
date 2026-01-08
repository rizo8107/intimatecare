import React from 'react';
import SimpleInstructorBookingForm from './SimpleInstructorBookingForm';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructorId?: string | number;
  instructorName?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  instructorId = 1,
  instructorName = "Mansi"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif font-medium text-[#853f92]">Book a Session with {instructorName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <SimpleInstructorBookingForm
            instructorId={instructorId}
            instructorName={instructorName}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
