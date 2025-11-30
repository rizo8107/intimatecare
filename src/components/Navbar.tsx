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
            <NavLink to="/" active={isActive('/') }>
              Home
            </NavLink>

            {/* Premium Sessions */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#FFE5EC] text-gray-700 hover:text-[#FF7A9A]">
                Premium 1:1 Sessions with Khushboo
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-72 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#F0F0F5] overflow-hidden">
                <Link to="/sessions" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/sessions') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Exclusive 1:1 Coaching</div>
                      <div className="text-xs text-gray-500">Deep dive support directly with Khushboo</div>
                    </div>
                  </div>
                </Link>
                <a
                  href="https://topmate.io/intimatecare/1823535"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-[#FFE5EC] transition-colors"
                >
                  <div className="flex items-start px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-800">Student Support Session</div>
                      <div className="text-xs text-gray-500">Compassionate sessions for students</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Playbooks & Digital Guides */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#FFE5EC] text-gray-700 hover:text-[#FF7A9A]">
                Playbooks & Digital Guides
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-72 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#F0F0F5] overflow-hidden">
                <Link to="/guide" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/guide') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Couples 69 Position Playbook</div>
                      <div className="text-xs text-gray-500">Experiment with confidence & joy</div>
                    </div>
                  </div>
                </Link>
                <Link to="/30-day-challenge" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/30-day-challenge') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">30-Day Couple Pleasure Challenge</div>
                      <div className="text-xs text-gray-500">Daily sparks to reignite your bond</div>
                    </div>
                  </div>
                </Link>
                <Link to="/intimatetalks" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/intimatetalks') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Join Our Pleasure School Community</div>
                      <div className="text-xs text-gray-500">Group learning, prompts & accountability</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Expert Healing */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#FFE5EC] text-gray-700 hover:text-[#FF7A9A]">
                Expert Healing & Support
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-80 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#F0F0F5] overflow-hidden">
                <Link to="/instructors" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/instructors') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Psychology & Emotional Wellness</div>
                      <div className="text-xs text-gray-500">Therapeutic care with trusted experts</div>
                    </div>
                  </div>
                </Link>
                <Link to="/coming-soon" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/coming-soon') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Holistic Listening & Healing</div>
                      <div className="text-xs text-gray-500">Safe spaces for release & integration</div>
                    </div>
                  </div>
                </Link>
                <Link to="/coming-soon" className="block hover:bg-[#FFE5EC] transition-colors">
                  <div className={`flex items-start px-4 py-3 ${isActive('/coming-soon') ? 'bg-[#FFE5EC]' : ''}`}>
                    <div>
                      <div className="font-medium text-gray-800">Ayurvedic Mind–Body Healing</div>
                      <div className="text-xs text-gray-500">Traditional care for embodied balance</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <NavLink to="/webinars" active={isActive('/webinars')}>
              Live Monthly Masterclasses
            </NavLink>

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
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'max-h-[80vh] opacity-100 mt-4 overflow-y-auto' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4 border border-[#F0F0F5]">
            <MobileNavLink to="/" active={isActive('/')} onClick={closeMenu}>
              Home
            </MobileNavLink>

            <div className="space-y-2 rounded-2xl border border-[#F8D7E5] bg-[#FFF6FA] p-3">
              <div className="text-xs uppercase tracking-wider text-[#FF5A84] font-semibold">Premium 1:1 Sessions with Khushboo</div>
              <MobileNavLink to="/sessions" active={isActive('/sessions')} onClick={closeMenu}>
                Exclusive 1:1 Coaching
              </MobileNavLink>
              <a
                href="https://topmate.io/intimatecare/1823535"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded-md transition-all text-gray-700 hover:bg-white hover:text-[#FF7A9A]"
                onClick={closeMenu}
              >
                Student Support Session
              </a>
            </div>

            <div className="space-y-2 rounded-2xl border border-[#E5D9FF] bg-[#F8F5FF] p-3">
              <div className="text-xs uppercase tracking-wider text-[#7C5CFF] font-semibold">Playbooks & Digital Guides</div>
              <MobileNavLink to="/guide" active={isActive('/guide')} onClick={closeMenu}>
                Couples 69 Position Playbook
              </MobileNavLink>
              <MobileNavLink to="/30-day-challenge" active={isActive('/30-day-challenge')} onClick={closeMenu}>
                30-Day Couple Pleasure Challenge
              </MobileNavLink>
              <MobileNavLink to="/intimatetalks" active={isActive('/intimatetalks')} onClick={closeMenu}>
                Join Our Pleasure School Community
              </MobileNavLink>
            </div>

            <div className="space-y-2 rounded-2xl border border-[#D9F0E6] bg-[#F4FFFA] p-3">
              <div className="text-xs uppercase tracking-wider text-[#2C9D75] font-semibold">Expert Healing & Support (Team Khushboo)</div>
              <MobileNavLink to="/instructors" active={isActive('/instructors')} onClick={closeMenu}>
                Psychology & Emotional Wellness
              </MobileNavLink>
              <MobileNavLink to="/coming-soon" active={isActive('/coming-soon')} onClick={closeMenu}>
                Holistic Listening & Healing
              </MobileNavLink>
              <MobileNavLink to="/coming-soon" active={isActive('/coming-soon')} onClick={closeMenu}>
                Ayurvedic Mind–Body Healing
              </MobileNavLink>
            </div>

            <div className="space-y-2 rounded-2xl border border-[#FFE4C4] bg-[#FFF8F0] p-3">
              <div className="text-xs uppercase tracking-wider text-[#E07A2C] font-semibold">Live Experiences</div>
              <MobileNavLink to="/webinars" active={isActive('/webinars')} onClick={closeMenu}>
                Live Monthly Masterclasses
              </MobileNavLink>
              <MobileNavLink to="/contact" active={isActive('/contact')} onClick={closeMenu}>
                Contact
              </MobileNavLink>
            </div>
            
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
