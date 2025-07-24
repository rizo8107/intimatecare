import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Add scroll event listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Check if the current route matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 backdrop-blur-lg bg-white/90 shadow-sm' 
          : 'py-4 bg-white/80'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <h1 className="font-serif text-2xl font-medium text-[#FF7A9A] relative">
              Khushboo{" "}
              <span className="font-cursive inline-block transition-transform group-hover:scale-110 origin-bottom-left">
                Bist
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF7A9A] transition-all duration-300 group-hover:w-full"></span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink to="/" active={isActive('/')}>
              Home
            </NavLink>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#FFE5EC] text-gray-700 hover:text-[#FF7A9A]">
                Services
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#F0F0F5] overflow-hidden">
                <Link to="/sessions" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/sessions') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Sessions</div>
                      <div className="text-xs text-gray-500">One-on-one coaching sessions</div>
                    </div>
                  </div>
                </Link>
                <Link to="/student-booking" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/student-booking') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Student Session</div>
                      <div className="text-xs text-gray-500">Book a student coaching session</div>
                    </div>
                  </div>
                </Link>
                <Link to="/instructor-booking" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/instructor-booking') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Book with Mansi</div>
                      <div className="text-xs text-gray-500">Specialized sessions with Mansi</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#FFE5EC] text-gray-700 hover:text-[#FF7A9A]">
                Resources
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#F0F0F5] overflow-hidden">
                <Link to="/intimatetalks" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/intimatetalks') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Intimate Talks</div>
                      <div className="text-xs text-gray-500">Discussions on intimacy topics</div>
                    </div>
                  </div>
                </Link>
                <Link to="/guide" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/guide') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">69 Positions</div>
                      <div className="text-xs text-gray-500">Intimate position guide</div>
                    </div>
                  </div>
                </Link>
                <Link to="/webinars" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/webinars') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Webinars</div>
                      <div className="text-xs text-gray-500">Free online sessions</div>
                    </div>
                  </div>
                </Link>
                <Link to="/30-day-challenge" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/30-day-challenge') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="flex items-center font-medium text-gray-800">
                        <span className="inline-block animate-pulse mr-1 text-[#FF5A84]">✨</span>
                        30+ Day Challenge
                        <span className="ml-1 text-xs bg-[#FF5A84] text-white px-1.5 py-0.5 rounded-full font-bold">HOT</span>
                      </div>
                      <div className="text-xs text-gray-500">Daily intimacy exercises</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            <NavLink to="/contact" active={isActive('/contact')}>
              Contact
            </NavLink>
            
            <Link 
              to="/freebie" 
              className={`ml-2 px-5 py-2 rounded-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
                isActive('/freebie') ? 'shadow-md' : ''
              }`}
            >
              Free Guide
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-700 focus:outline-none hover:bg-[#FFE5EC] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} className="text-[#FF7A9A]" /> : <Menu size={24} className="text-[#FF7A9A]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[650px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-2 border border-[#F0F0F5]">
            <MobileNavLink to="/" active={isActive('/')} onClick={closeMenu}>
              Home
            </MobileNavLink>
            
            {/* Services Category */}
            <div className="px-4 pt-3 pb-1">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">Services</div>
            </div>
            
            <MobileNavLink to="/sessions" active={isActive('/sessions')} onClick={closeMenu}>
              Sessions
            </MobileNavLink>
            
            <MobileNavLink to="/student-booking" active={isActive('/student-booking')} onClick={closeMenu}>
              <div>
                <div className="font-medium">Student Session</div>
                <div className="text-xs text-gray-500">Book a student coaching session</div>
              </div>
            </MobileNavLink>
            
            <MobileNavLink to="/instructor-booking" active={isActive('/instructor-booking')} onClick={closeMenu}>
              <div>
                <div className="font-medium">Book with Mansi</div>
                <div className="text-xs text-gray-500">Specialized sessions with Mansi</div>
              </div>
            </MobileNavLink>
            
            {/* Resources Category */}
            <div className="px-4 pt-3 pb-1">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">Resources</div>
            </div>
            
            <MobileNavLink to="/intimatetalks" active={isActive('/intimatetalks')} onClick={closeMenu}>
              <div>
                <div className="font-medium">Intimate Talks</div>
                <div className="text-xs text-gray-500">Discussions on intimacy topics</div>
              </div>
            </MobileNavLink>
            
            <MobileNavLink to="/guide" active={isActive('/guide')} onClick={closeMenu}>
              <div>
                <div className="font-medium">69 Positions</div>
                <div className="text-xs text-gray-500">Intimate position guide</div>
              </div>
            </MobileNavLink>
            
            <MobileNavLink to="/webinars" active={isActive('/webinars')} onClick={closeMenu}>
              <div>
                <div className="font-medium">Webinars</div>
                <div className="text-xs text-gray-500">Free online sessions</div>
              </div>
            </MobileNavLink>
            
            <MobileNavLink to="/30-day-challenge" active={isActive('/30-day-challenge')} onClick={closeMenu}>
              <span className="flex items-center">
                <span className="inline-block animate-pulse mr-1 text-[#FF5A84]">✨</span>
                <span>30+ Day Challenge</span>
                <span className="ml-1 text-xs bg-[#FF5A84] text-white px-1.5 py-0.5 rounded-full font-bold">HOT</span>
              </span>
            </MobileNavLink>
            
            <MobileNavLink to="/contact" active={isActive('/contact')} onClick={closeMenu}>
              Contact
            </MobileNavLink>
            
            <div className="pt-4">
              <Link 
                to="/freebie" 
                className="block w-full py-3 rounded-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white font-medium text-center transition-all"
                onClick={closeMenu}
              >
                Get Your Free Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop navigation link component
const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#FFE5EC] ${
      active 
        ? 'text-[#FF7A9A] bg-[#FFE5EC]' 
        : 'text-gray-700 hover:text-[#FF7A9A]'
    }`}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#FF7A9A] rounded-full"></span>
    )}
  </Link>
);

// Mobile navigation link component
const MobileNavLink = ({ to, active, onClick, children }) => (
  <Link
    to={to}
    className={`block px-4 py-3 rounded-md transition-all ${
      active 
        ? 'bg-[#FFE5EC] text-[#FF7A9A] font-medium' 
        : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF7A9A]'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
