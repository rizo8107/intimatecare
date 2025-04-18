import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, MessageCircle, CheckCircle } from 'lucide-react';

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Free Session */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl font-medium text-gray-800 mb-3">Free First Session</h3>
              <p className="text-3xl font-serif text-[#FF7A9A] mb-4">₹0</p>
              <ul className="space-y-3 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>1 hour of open, non-judgmental audio conversation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>Discuss any topic you're comfortable with</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>Get to know my coaching approach</span>
                </li>
              </ul>
              <Link to="/sessions" className="block text-center py-3 px-6 bg-[#FF7A9A] text-white rounded-full hover:bg-[#FF5A8A] transition-colors font-medium">
                Book Free Session
              </Link>
            </div>
          </div>
          
          {/* Regular Session */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-[#FF7A9A] text-white px-4 py-1 rounded-bl-2xl text-sm font-medium">
              Popular
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl font-medium text-gray-800 mb-3">30-Minute Session</h3>
              <p className="text-3xl font-serif text-[#FF7A9A] mb-4">₹1,500</p>
              <ul className="space-y-3 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>30 minutes of focused discussion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>Personalized advice and guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>Follow-up resource recommendations</span>
                </li>
              </ul>
              <Link to="/sessions" className="block text-center py-3 px-6 bg-[#FF7A9A] text-white rounded-full hover:bg-[#FF5A8A] transition-colors font-medium">
                Book Session
              </Link>
            </div>
          </div>
          
          {/* Student Session */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl font-medium text-gray-800 mb-3">Student Special</h3>
              <p className="text-3xl font-serif text-[#FF7A9A] mb-4">₹500</p>
              <ul className="space-y-3 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>30 minutes of focused guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>Help with porn addiction recovery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7A9A] mr-2">✓</span>
                  <span>Breaking unhealthy patterns</span>
                </li>
              </ul>
              <Link to="/sessions" className="block text-center py-3 px-6 bg-[#FF7A9A] text-white rounded-full hover:bg-[#FF5A8A] transition-colors font-medium">
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
