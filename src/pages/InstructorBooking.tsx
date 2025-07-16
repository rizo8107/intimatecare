import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Star, Heart, MessageCircle, Award, CheckCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';

const InstructorBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openBookingModal = () => {
    setIsModalOpen(true);
  };
  
  const closeBookingModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-gradient-to-b from-[#FF9EB5] to-white min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <Link to="/sessions" className="inline-flex items-center text-[#FF5A84] hover:text-[#FF7A9A] mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Sessions
        </Link>
        
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8 border border-[#FFE5EC]">
          {/* Hero Banner with Author Image */}
          <div className="relative bg-gradient-to-r from-[#FFE5EC] to-[#FFF5F8] py-12 px-6 md:px-10">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('/images/pattern-dots.png')] bg-repeat"></div>
            <div className="flex flex-col md:flex-row items-center relative z-10">
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="relative">
                  <img 
                    src="/images/mansi-profile.jpg" 
                    alt="Mansi - Holistic Listener" 
                    className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/200x200/FFE5EC/FF5A84?text=M&font=playfair';
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#FF5A84] text-white rounded-full p-2">
                    <Award size={20} />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left md:pl-8">
                <div className="inline-block bg-[#FF5A84] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">HOLISTIC LISTENER</div>
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-3">
                  Book a Session with Mansi
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                  A safe, non-judgmental space where you can feel heard, witnessed, and truly understood.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm mb-4">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    <span>1.5+ Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="text-[#FF5A84] mr-1" size={16} />
                    <span>Intuitive Healing</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="text-[#3498db] mr-1" size={16} />
                    <span>Judgment-Free Zone</span>
                  </div>
                </div>
                
                <button
                  onClick={openBookingModal}
                  className="bg-[#FF5A84] hover:bg-[#FF7A9A] text-white py-2 px-6 rounded-full font-medium transition-colors inline-flex items-center"
                >
                  <BookOpen size={18} className="mr-2" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            
            <div className="relative bg-white p-6 rounded-xl mb-8 shadow-sm border border-[#FFE5EC] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-[#FFE5EC] rounded-full opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 -mb-6 -ml-6 bg-[#FFE5EC] rounded-full opacity-20"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FF5A84] p-2 rounded-lg mr-3">
                    <Heart size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-[#853f92]">What Do I Do?</h2>
                </div>
                
                <div className="pl-2 border-l-2 border-[#FF5A84] mb-6">
                  <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                    I hold space for you, without judgment, interruption, or agenda. As a Holistic Listener, I support your emotional, sensual, and spiritual well-being by deeply listening to what is said and unsaid. This is a safe, non-clinical space where you can feel heard, witnessed, and understood.
                  </p>
                </div>
                
                <div className="bg-[#FFF5F8] p-4 rounded-lg border-l-4 border-[#FF5A84]">
                  <div className="flex items-start">
                    <Award className="text-[#FF5A84] mr-2 mt-1 flex-shrink-0" size={18} />
                    <p className="text-gray-700">
                      <span className="font-medium">Experience:</span> Though I hold no formal certifications, my 1.5 years of experience come from deeply intuitive work, inner healing, and holding space for many clients navigating everything from emotional blocks to sexual suppression.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl mb-8 shadow-sm border border-[#FFE5EC]">
              <div className="flex items-center mb-5">
                <div className="bg-[#FF5A84] p-2 rounded-lg mr-3">
                  <Calendar size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-[#853f92]">Session Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-5 rounded-lg border border-[#FFE5EC] shadow-sm">
                  <div className="flex items-center mb-3">
                    <Calendar className="text-[#FF5A84] mr-2" size={18} />
                    <h3 className="font-medium text-gray-800">Availability</h3>
                  </div>
                  <p className="text-gray-700 ml-7">By appointment (book 2 days in advance)</p>
                  <p className="text-gray-700 ml-7 mt-1">Daily between 11:00 AM and 11:00 PM</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-5 rounded-lg border border-[#FFE5EC] shadow-sm">
                  <div className="flex items-center mb-3">
                    <Clock className="text-[#FF5A84] mr-2" size={18} />
                    <h3 className="font-medium text-gray-800">Session Duration</h3>
                  </div>
                  <p className="text-gray-700 ml-7">First Session: 1.5 hours</p>
                  <p className="text-gray-700 ml-7 mt-1">Follow-Up Sessions: 1 hour</p>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-[#FFD0E0] to-[#FFF5F8] p-5 rounded-lg border-l-4 border-[#853f92] shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-3 md:mb-0">
                    <h3 className="font-medium text-gray-800 mb-1">First Session</h3>
                    <p className="text-gray-600 text-sm">1.5 hours of dedicated space</p>
                    <div className="text-2xl font-serif font-bold text-[#FF5A84] mt-1">₹1111</div>
                  </div>
                  <button
                    onClick={openBookingModal}
                    className="bg-[#853f92] hover:bg-[#9A4DAB] text-white py-2 px-6 rounded-full font-medium transition-colors inline-flex items-center shadow-md"
                  >
                    <Calendar size={18} className="mr-2" />
                    Book First Session
                  </button>
                </div>
                <div className="my-4 border-t border-[#FFD5E2]"></div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-3 md:mb-0">
                    <h3 className="font-medium text-gray-800 mb-1">Follow-Up Sessions</h3>
                    <p className="text-gray-600 text-sm">1 hour of continued support</p>
                    <div className="text-2xl font-serif font-bold text-[#FF5A84] mt-1">₹555</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      disabled
                      className="bg-gray-500 text-white py-2 px-6 rounded-full font-medium inline-flex items-center cursor-not-allowed opacity-70"
                    >
                      <Calendar size={18} className="mr-2" />
                      Book Follow-Up
                    </button>
                    <span className="text-xs text-gray-700 mt-2 italic font-medium">Enabled after first session</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl mb-8 shadow-sm border border-[#FFE5EC]">
              <div className="flex items-center mb-5">
                <div className="bg-[#FF5A84] p-2 rounded-lg mr-3">
                  <Heart size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-[#853f92]">Sexual Health Support Areas</h2>
              </div>
              
              <div className="relative mb-6">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#FF5A84] to-[#FFE5EC]"></div>
                <p className="pl-6 text-gray-700 italic">Areas where I can provide a safe space for exploration and healing:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Body Image</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Body image concerns & breast shame</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Pleasure</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Difficulty feeling pleasure or being touched</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Sensual Self</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Disconnection from your sensual self</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Desire</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Guilt or fear around sexual desires</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Trauma</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Sexual shutdown due to past trauma</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Communication</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Lack of communication with partners</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Life Changes</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Navigating desire after childbirth or menopause</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Self-pleasure</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Self-pleasure & orgasm blockages</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF5F8] to-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-[#FF5A84] mr-2" size={16} />
                    <h3 className="font-medium text-gray-800">Energetic</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Energetic disconnection from yoni/womb</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl mb-8 shadow-sm border border-[#FFE5EC]">
              <div className="flex items-center mb-5">
                <div className="bg-[#853f92] p-2 rounded-lg mr-3">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-[#853f92]">Non-Sexual Holistic Support</h2>
              </div>
              
              <div className="relative mb-6">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#853f92] to-[#FFE5EC]"></div>
                <p className="pl-6 text-gray-700 italic">Other areas where I can hold space for your journey:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex bg-gradient-to-br from-[#F9F0FF] to-white p-4 rounded-lg border border-[#E5D5F0] shadow-sm">
                  <div className="bg-[#853f92] p-2 rounded-full h-min mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Emotional Processing</h3>
                    <p className="text-gray-700 text-sm">Anxiety, overthinking & emotional overwhelm</p>
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-br from-[#F9F0FF] to-white p-4 rounded-lg border border-[#E5D5F0] shadow-sm">
                  <div className="bg-[#853f92] p-2 rounded-full h-min mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Relationship Patterns</h3>
                    <p className="text-gray-700 text-sm">Relationship dynamics & people-pleasing behaviors</p>
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-br from-[#F9F0FF] to-white p-4 rounded-lg border border-[#E5D5F0] shadow-sm">
                  <div className="bg-[#853f92] p-2 rounded-full h-min mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Inner Child Work</h3>
                    <p className="text-gray-700 text-sm">Inner child grief & abandonment healing</p>
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-br from-[#F9F0FF] to-white p-4 rounded-lg border border-[#E5D5F0] shadow-sm">
                  <div className="bg-[#853f92] p-2 rounded-full h-min mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Creative Expression</h3>
                    <p className="text-gray-700 text-sm">Creative blocks & fear of expression</p>
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-br from-[#F9F0FF] to-white p-4 rounded-lg border border-[#E5D5F0] shadow-sm">
                  <div className="bg-[#853f92] p-2 rounded-full h-min mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Emotional Numbness</h3>
                    <p className="text-gray-700 text-sm">Feeling lost, stuck, or emotionally numb</p>
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-br from-[#F9F0FF] to-white p-4 rounded-lg border border-[#E5D5F0] shadow-sm">
                  <div className="bg-[#853f92] p-2 rounded-full h-min mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Life Transitions</h3>
                    <p className="text-gray-700 text-sm">Navigating breakups, career changes, identity shifts</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl mb-8 shadow-sm border border-[#FFE5EC]">
              <div className="flex items-center mb-5">
                <div className="bg-[#FF5A84] p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-medium text-[#853f92]">What You'll Receive Post-Session</h2>
              </div>
              
              <div className="bg-gradient-to-br from-[#FFD0E0] to-white p-5 rounded-lg mb-6 border-l-4 border-[#FF5A84] shadow-md">
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  Each session is more than a conversation—it's an <span className="text-[#FF5A84] font-medium">energetic exchange</span>. Based on our time together, you may receive:
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="bg-[#FFF5F8] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5A84]">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <line x1="10" y1="9" x2="8" y2="9"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">Journaling Prompts</h3>
                  <p className="text-gray-600 text-sm">Personalized prompts to continue your inner exploration</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="bg-[#FFF5F8] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5A84]">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">Embodiment Practices</h3>
                  <p className="text-gray-600 text-sm">Sensory exercises and breath practices for grounding</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="bg-[#FFF5F8] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5A84]">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">Reflection Tools</h3>
                  <p className="text-gray-600 text-sm">Ritual suggestions to support your healing journey</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="bg-[#FFF5F8] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5A84]">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">Tarot/Oracle Guidance</h3>
                  <p className="text-gray-600 text-sm">Intuitive card readings when spiritually called</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#FFE5EC] shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="bg-[#FFF5F8] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5A84]">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="23"></line>
                      <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">Voice Notes</h3>
                  <p className="text-gray-600 text-sm">Personalized reminders available upon request</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-700 italic text-lg">"This is soul work, and no two sessions are the same."</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <div className="bg-gradient-to-r from-[#FFD0E0] to-white p-6 rounded-xl mb-8 text-center border-2 border-[#853f92] shadow-lg">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-[#FF5A84] p-3 rounded-full">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-[#853f92] ml-3">Ready to Begin Your Journey?</h2>
                </div>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">Take the first step toward healing and self-discovery. Book a session with Mansi and experience a safe space where you can explore, express, and embrace your authentic self.</p>
                <button
                  onClick={openBookingModal}
                  className="bg-[#853f92] hover:bg-[#9A4DAB] text-white py-3 px-8 rounded-full font-medium transition-colors inline-flex items-center text-lg mx-auto shadow-lg"
                >
                  <Calendar size={20} className="mr-2" />
                  Book Your Session Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#FFD0E0] to-white rounded-3xl shadow-lg p-8 text-center border-2 border-[#853f92] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-[#FFE5EC] rounded-full opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 -mb-16 -ml-16 bg-[#FFE5EC] rounded-full opacity-30"></div>
          
          <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
            <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm mb-2">
              <p className="text-[#FF5A84] font-serif text-xl font-medium">"Come as you are—there is no fixing, only feeling."</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#FFE5EC]">
                <div className="flex items-center mb-2">
                  <Heart size={18} className="text-[#FF5A84] mr-2" />
                  <h3 className="font-medium text-gray-800">Inclusive Space</h3>
                </div>
                <p className="text-gray-700 text-sm">A safe space for women, men, LGBTQIA+, and anyone navigating emotional or sexual healing.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#FFE5EC]">
                <div className="flex items-center mb-2">
                  <Star size={18} className="text-[#FF5A84] mr-2" />
                  <h3 className="font-medium text-gray-800">Wisdom-Based</h3>
                </div>
                <p className="text-gray-700 text-sm">Rooted in feminine wisdom, energetic sensitivity & real-world compassion.</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-[#FFE5EC]">
              <p className="text-gray-700 mb-4">No diagnosis. No pressure. Just presence.</p>
              <p className="text-gray-700 italic">A bridge between what you feel and what you haven't yet dared to speak—whether you're a man holding back tears, a woman silenced by shame, or anyone seeking wholeness.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={closeBookingModal} 
        instructorId={1} 
        instructorName="Mansi" 
      />
    </div>
  );
};

export default InstructorBooking;
