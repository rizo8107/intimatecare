import { useState } from 'react';
import SimpleInstructorBookingForm from '@/components/SimpleInstructorBookingForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstructorBooking = () => {
  return (
    <div className="bg-[#FFE5EC] min-h-screen py-12">
      <div className="container-custom max-w-3xl">
        <Link to="/sessions" className="inline-flex items-center text-[#FF5A84] hover:text-[#FF7A9A] mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Sessions
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="text-[#FF5A84] text-sm font-medium mb-2">EXPERT SESSION</div>
              <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                Book a Session with Mansi
              </h1>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Holistic Listener & Intuitive Guide providing a safe, non-judgmental space for emotional support, clarity, and healing.
              </p>
            </div>
            
            <div className="bg-[#FFF5F8] p-4 rounded-lg mb-6">
              <h2 className="font-medium text-[#853f92] mb-2">Services Offered:</h2>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="text-[#FF5A84] mr-2">✓</span>
                  <div>
                    <span className="text-gray-800 font-medium">Holistic Listening & Cathartic Healing Sessions</span>
                    <p className="text-gray-700 text-sm mt-1">
                      A compassionate space where you can share your thoughts, feelings, and worries without fear of judgment.
                      <br />
                      <span className="text-[#FF5A84] font-medium">₹2,800</span> for 1 hour | <span className="text-[#FF5A84] font-medium">₹7,500</span> for 3 sessions package
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5A84] mr-2">✓</span>
                  <div>
                    <span className="text-gray-800 font-medium">Tarot Reading Sessions</span>
                    <p className="text-gray-700 text-sm mt-1">
                      Tap into the wisdom of tarot for clarity and guidance in relationships, career, personal growth, and life decisions.
                      <br />
                      <span className="text-[#FF5A84] font-medium">₹700</span> for 30 minutes | <span className="text-[#FF5A84] font-medium">₹1,400</span> for 1 hour
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5A84] mr-2">✓</span>
                  <div>
                    <span className="text-gray-800 font-medium">Emotional & Sexual Trauma Listening</span>
                    <p className="text-gray-700 text-sm mt-1">
                      A safe space to process deep emotional wounds, past sexual trauma, and intimacy struggles.
                      <br />
                      <span className="text-[#FF5A84] font-medium">₹2,800</span> for 1 hour | <span className="text-[#FF5A84] font-medium">₹7,500</span> for 3 sessions package
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#FFF5F8] p-4 rounded-lg mb-6">
              <h2 className="font-medium text-[#853f92] mb-2">Why Choose Mansi:</h2>
              <ul className="space-y-3 mb-2">
                <li className="flex items-start">
                  <span className="text-[#FF5A84] mr-2">✓</span>
                  <span className="text-gray-700">A Judgment-Free Zone – A safe and confidential space where your emotions and experiences are honored.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5A84] mr-2">✓</span>
                  <span className="text-gray-700">Personalized Guidance – Every session is tailored to your unique needs, whether for emotional release, insight, or healing.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5A84] mr-2">✓</span>
                  <span className="text-gray-700">Intuitive Healing – A holistic blend of deep listening, spiritual guidance, and energy work to nurture your mind, body, and soul.</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <SimpleInstructorBookingForm instructorId={1} instructorName="Mansi" />
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

export default InstructorBooking;
