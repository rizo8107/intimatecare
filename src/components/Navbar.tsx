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
            <NavLink to="/about" active={isActive('/about')}>
              About
            </NavLink>
            <NavLink to="/sessions" active={isActive('/sessions')}>
              Sessions
            </NavLink>
            <NavLink to="/intimatetalks" active={isActive('/intimatetalks')}>
              Intimate Talks
            </NavLink>
            <NavLink to="/issues" active={isActive('/issues')}>
              Sexual Issues
            </NavLink>
            <NavLink to="/guide" active={isActive('/guide')}>
              69 Positions
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
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-1 border border-[#F0F0F5]">
            <MobileNavLink to="/" active={isActive('/')} onClick={closeMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/about" active={isActive('/about')} onClick={closeMenu}>
              About
            </MobileNavLink>
            <MobileNavLink to="/sessions" active={isActive('/sessions')} onClick={closeMenu}>
              Sessions
            </MobileNavLink>
            <MobileNavLink to="/intimatetalks" active={isActive('/intimatetalks')} onClick={closeMenu}>
              Intimate Talks
            </MobileNavLink>
            <MobileNavLink to="/issues" active={isActive('/issues')} onClick={closeMenu}>
              Sexual Issues
            </MobileNavLink>
            <MobileNavLink to="/guide" active={isActive('/guide')} onClick={closeMenu}>
              69 Positions
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
