import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, MessageCircle, CheckCircle } from 'lucide-react';

const Sessions = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  
  return (
    <div className="bg-[#FFE5EC]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image and CTA - Appears first on mobile */}
              <div className="order-first md:order-last p-6 md:p-8 bg-[#FAFAFA]">
                <div className="w-full max-w-sm mx-auto mb-6">
                  <div className="relative">
                    <div className="bg-[#FFE5EC] rounded-xl p-4 mb-4 text-center">
                      <p className="text-[#FF7A9A] font-medium uppercase text-sm tracking-wide">AUDIO BASED PERSONAL CONSULTATION</p>
                    </div>
                    <img 
                      src="/sessions.webp" 
                      alt="One-on-One Session" 
                      className="w-full h-auto rounded-2xl shadow-sm"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/sessions.webp/400x400";
                        target.onerror = null;
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#F0F0F5]">
                  <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                    <h2 className="font-serif text-xl text-center mb-4">Book Your Session</h2>
                    <p className="text-center text-gray-700 text-sm">
                      Select the option that best fits your needs
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <a 
                      href="https://topmate.io/intimatecare/1102760"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                    >
                      Book Now
                    </a>
                    
                    <p className="text-xs text-center text-gray-600">
                      After booking, you'll receive a confirmation email with details to join the call.
                      Your privacy is our priority.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content - Appears second on mobile */}
              <div className="order-last md:order-first p-6 md:p-8 flex flex-col md:border-r border-[#F0F0F5]">
                {/* Title and Intro */}
                <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                  <div className="text-[#FF7A9A] text-sm font-medium mb-1">One-on-One Sessions</div>
                  <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                    Book a One-on-One Session
                  </h1>
                  <p className="text-gray-700">
                    Struggling with something and need to talk? Let's figure it out together.
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                  <h2 className="text-xl font-serif font-medium text-gray-800 mb-3">What to Expect</h2>
                  <p className="text-gray-700 mb-4">
                    Sometimes, just talking about a problem can bring clarity. In our session, we'll explore 
                    your concerns, see if we can find solutions, and if not—I'll simply listen, talk it out 
                    with you, and offer suggestions.
                  </p>
                  <p className="text-gray-700">
                    Our sessions are confidential, judgment-free spaces where you can discuss any intimate or 
                    relationship concerns that you might be hesitant to share elsewhere.
                  </p>
                </div>

                {/* Why Book Section */}
                <div>
                  <h2 className="text-xl font-serif font-medium text-gray-800 mb-3">Why Book a Session?</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-[#FF7A9A] mr-2">✓</span>
                      <span>Get personalized advice for your specific situation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FF7A9A] mr-2">✓</span>
                      <span>Discuss sensitive topics in a safe, private environment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FF7A9A] mr-2">✓</span>
                      <span>Learn practical techniques to improve intimacy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FF7A9A] mr-2">✓</span>
                      <span>Address relationship challenges with expert guidance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FF7A9A] mr-2">✓</span>
                      <span>Get answers to questions you can't ask elsewhere</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Session Cards */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
                Available Session Types
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Regular Session Card */}
                <div className="bg-[#F9F9FB] rounded-xl p-6 border border-[#F0F0F5] hover:shadow-md transition-shadow relative flex flex-col h-full">
                  <div className="absolute top-3 right-3 bg-[#FF7A9A] text-white text-xs px-2 py-1 rounded-full">
                    First Session
                  </div>
                  
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
                    <div className="flex items-center mb-3 md:mb-0">
                      <Clock className="w-5 h-5 text-[#FF7A9A] mr-2" />
                      <span className="text-gray-700">Duration: 45 minutes</span>
                    </div>
                    <div>
                      <div className="text-2xl font-serif text-[#FF7A9A] font-medium">₹699</div>
                    </div>
                  </div>
                  
                  <div className="bg-[#FFE5EC] p-4 rounded-lg mb-4 flex-grow">
                    <h4 className="font-medium text-[#853f92] mb-3">Why This Session Matters:</h4>
                    <ul className="space-y-3 mb-2">
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span className="text-gray-700 text-sm">Because most of us were never taught how to talk about sex — let alone understand it without shame or confusion.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span className="text-gray-700 text-sm">Because real questions about pleasure, consent, comfort, and curiosity deserve real answers.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span className="text-gray-700 text-sm">Because knowing your body and boundaries isn't just about sex — it's about confidence, connection, and choice.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span className="text-gray-700 text-sm">Because pleasure is not a luxury — it's part of well-being.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF7A9A] mr-2">✓</span>
                        <span className="text-gray-700 text-sm">Because healthy intimacy starts with informed conversations — and this is your space to start that.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <a 
                    href="https://topmate.io/intimatecare/1102760" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-4 rounded-full text-center font-medium transition-colors"
                  >
                    Book Your Session Now
                  </a>
                </div>
                
                {/* Student Session Card */}
                <div className="bg-[#F9F9FB] rounded-xl p-6 border border-[#F0F0F5] hover:shadow-md transition-shadow relative flex flex-col h-full">
                  <div className="absolute top-3 right-3 bg-[#E5F2FF] text-[#3B82F6] text-xs px-2 py-1 rounded-full">
                    For Students Only
                  </div>
                  
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
                    <div className="flex items-center mb-3 md:mb-0">
                      <Clock className="w-5 h-5 text-[#3B82F6] mr-2" />
                      <span className="text-gray-700">Duration: 45 minutes</span>
                    </div>
                    <div>
                      <div className="text-2xl font-serif text-[#3B82F6] font-medium">₹999</div>
                    </div>
                  </div>
                  
                  <div className="bg-[#E5F2FF] p-4 rounded-lg mb-4 flex-grow">
                    <h4 className="font-medium text-[#853f92] mb-3">Why This Session Matters:</h4>
                    <ul className="space-y-3 mb-2">
                      <li className="flex items-start">
                        <span className="text-[#3B82F6] mr-2">✓</span>
                        <span className="text-gray-700 text-sm">Because pleasure is not a luxury — it's part of well-being.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#3B82F6] mr-2">✓</span>
                        <span className="text-gray-700 text-sm">Because healthy intimacy starts with informed conversations — and this is your space to start that.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#3B82F6] mr-2">✓</span>
                        <span className="text-gray-700 text-sm">Because real questions about pleasure, consent, comfort, and curiosity deserve real answers.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Link 
                    to="/student-booking"
                    className="block w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 px-4 rounded-full text-center font-medium transition-colors mt-auto"
                  >
                    Book Student Session
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* How to Book Section */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
                How to Book a Session
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Step 1 */}
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-[#FFE5EC] text-[#FF7A9A] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </div>
                    <h3 className="font-medium">Choose a session</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Select the session type that best fits your needs and concerns
                  </p>
                </div>
                
                {/* Step 2 */}
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-[#E5FFF1] text-[#2A6B4D] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </div>
                    <h3 className="font-medium">Book a time slot</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Click "Book Now" and select an available time on Topmate
                  </p>
                </div>
                
                {/* Step 3 */}
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-[#FFF2E5] text-[#8A5A2B] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </div>
                    <h3 className="font-medium">Complete payment</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Securely pay for your session and receive a confirmation
                  </p>
                </div>
                
                {/* Step 4 */}
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-[#F9E5FF] text-[#8A2BE2] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      4
                    </div>
                    <h3 className="font-medium">Join your session</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Use the link sent to your email to join at the scheduled time
                  </p>
                </div>
              </div>
              
              <div className="mt-8 bg-[#FFE5EC] p-4 rounded-xl text-sm text-gray-700 text-center">
                <div className="flex items-center justify-center">
                  <CheckCircle size={16} className="text-[#FF7A9A] mr-2" />
                  <span>All sessions are completely confidential and your privacy is our top priority.</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mt-8">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
                What Clients Say
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "Khushboo's guidance was transformative for my relationship. She provided practical advice that helped me communicate better with my partner about our intimate needs."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Anonymous Client</p>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "I was nervous about discussing such personal topics, but Khushboo made me feel completely at ease. Her approach is professional, empathetic, and non-judgmental."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Satisfied Client</p>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "The one-on-one session gave me insights I couldn't have found anywhere else. It was worth every penny to get personalized advice for my specific situation."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Grateful Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sessions;
