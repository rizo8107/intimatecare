import { useState } from 'react';
import StudentBookingForm from '@/components/StudentBookingForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentBooking = () => {
  return (
    <div className="bg-[#E5F2FF] min-h-screen py-12">
      <div className="container-custom max-w-3xl">
        <Link to="/sessions" className="inline-flex items-center text-[#3B82F6] hover:text-[#2563EB] mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Sessions
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="text-[#3B82F6] text-sm font-medium mb-2">STUDENT SPECIAL</div>
              <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                Book Your Student Session
              </h1>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Take advantage of our special student rate of ₹299 for a 45-minute audio consultation session.
              </p>
            </div>
            
            <div className="bg-[#E5F2FF] p-4 rounded-lg mb-6">
              <h2 className="font-medium text-[#853f92] mb-2">Why This Session Matters:</h2>
              <ul className="space-y-3 mb-2">
                <li className="flex items-start">
                  <span className="text-[#3B82F6] mr-2">✓</span>
                  <span className="text-gray-700">Because pleasure is not a luxury — it's part of well-being.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#3B82F6] mr-2">✓</span>
                  <span className="text-gray-700">Because healthy intimacy starts with informed conversations — and this is your space to start that.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#3B82F6] mr-2">✓</span>
                  <span className="text-gray-700">Because real questions about pleasure, consent, comfort, and curiosity deserve real answers.</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <StudentBookingForm />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
          <p className="text-gray-800">
            All sessions are completely confidential and your privacy is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentBooking;
