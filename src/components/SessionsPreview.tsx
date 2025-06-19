import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, MessageCircle, CheckCircle } from 'lucide-react';
import OptimizedImage from './ui/optimized-image';

const SessionsPreview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#FFE5EC]">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-10">
          <div className="text-[#FF7A9A] text-sm font-medium mb-2">PERSONAL SESSIONS</div>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-4">
            Book a One-on-One Audio Session with Me!
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Struggling with something and need to talk? Let's figure it out together in a judgment-free space.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Regular Session Card */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-[#FF7A9A] text-white px-4 py-1 rounded-bl-2xl text-sm font-medium">
              Audio-based session
            </div>
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="mb-4">
                <img 
                  src="/working.webp" 
                  alt="One-on-One Session" 
                  className="w-full h-auto rounded-2xl shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/working.webp/400x400";
                    target.onerror = null;
                  }}
                />
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-800 mb-3">Sex Education Consultation Session</h3>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <Clock className="w-4 h-4 text-[#FF7A9A] mr-2" />
                  <span className="text-gray-700">Duration: 45 minutes</span>
                </div>
                <div>
                  <p className="text-xl font-serif text-[#FF7A9A] font-medium">₹999</p>
                </div>
              </div>
              
              <div className="mb-6 flex-grow">
                <h4 className="font-medium text-[#853f92] mb-2">Why This Session Matters:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#FF7A9A] mr-2">✓</span>
                    <span>Because most of us were never taught how to talk about sex — let alone understand it without shame or confusion.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF7A9A] mr-2">✓</span>
                    <span>Because real questions about pleasure, consent, comfort, and curiosity deserve real answers.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF7A9A] mr-2">✓</span>
                    <span>Because knowing your body and boundaries isn't just about sex — it's about confidence, connection, and choice.</span>
                  </li>
                </ul>
              </div>
              <Link to="/sessions" className="block text-center py-3 px-6 bg-[#FF7A9A] text-white rounded-full hover:bg-[#FF5A8A] transition-colors font-medium mt-auto">
                Book Session
              </Link>
            </div>
          </div>
          
          {/* Student Session Card */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-[#E5F2FF] text-[#3B82F6] px-4 py-1 rounded-bl-2xl text-sm font-medium">
              For Students Only
            </div>
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="mb-4">
                <img 
                  src="/students.webp" 
                  alt="Student Session" 
                  className="w-full h-auto rounded-2xl shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/students.webp/400x400";
                    target.onerror = null;
                  }}
                />
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-800 mb-3 pr-24">Student Special: Sex Education Session</h3>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <Clock className="w-4 h-4 text-[#3B82F6] mr-2" />
                  <span className="text-gray-700">Duration: 45 minutes</span>
                </div>
                <div>
                  <p className="text-xl font-serif text-[#3B82F6] font-medium">₹299</p>
                </div>
              </div>
              
              <div className="mb-6 flex-grow">
                <h4 className="font-medium text-[#853f92] mb-2">Why This Session Matters:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#3B82F6] mr-2">✓</span>
                    <span>Because pleasure is not a luxury — it's part of well-being.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#3B82F6] mr-2">✓</span>
                    <span>Because healthy intimacy starts with informed conversations — and this is your space to start that.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#3B82F6] mr-2">✓</span>
                    <span>Because real questions about pleasure, consent, comfort, and curiosity deserve real answers.</span>
                  </li>
                </ul>
              </div>
              <Link to="/student-booking" className="block text-center py-3 px-6 bg-[#3B82F6] text-white rounded-full hover:bg-[#2563EB] transition-colors font-medium mt-auto">
                Book Student Session
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-10 bg-white rounded-3xl shadow-sm p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <CheckCircle size={20} className="text-[#FF7A9A] mr-2" />
            <p className="text-gray-800 font-medium">No shame. No judgment. Just real conversations and support.</p>
          </div>
          <Link to="/sessions" className="inline-flex items-center text-[#FF7A9A] font-medium hover:text-[#FF5A8A] transition-colors">
            View All Session Details
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SessionsPreview;
