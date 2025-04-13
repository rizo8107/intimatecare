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
          ? 'py-2 backdrop-blur-lg bg-white/80 shadow-md' 
          : 'py-4 bg-white/60'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <h1 className="font-serif text-2xl font-medium text-blush-600 relative">
              Khushboo{" "}
              <span className="font-cursive inline-block transition-transform group-hover:scale-110 origin-bottom-left">
                Bist
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blush-400 transition-all duration-300 group-hover:w-full"></span>
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
            <NavLink to="/guide" active={isActive('/guide')}>
              69 Positions
            </NavLink>
            <NavLink to="/contact" active={isActive('/contact')}>
              Contact
            </NavLink>
            <Link 
              to="/freebie" 
              className={`ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blush-200 hover:-translate-y-1 active:translate-y-0 ${
                isActive('/freebie') ? 'shadow-lg shadow-blush-200' : ''
              }`}
            >
              Free Guide
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-foreground focus:outline-none hover:bg-blush-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg p-4 space-y-1">
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
            <MobileNavLink to="/guide" active={isActive('/guide')} onClick={closeMenu}>
              69 Positions
            </MobileNavLink>
            <MobileNavLink to="/contact" active={isActive('/contact')} onClick={closeMenu}>
              Contact
            </MobileNavLink>
            
            <div className="pt-4">
              <Link 
                to="/freebie" 
                className="block w-full py-3 rounded-lg bg-gradient-to-r from-blush-500 to-blush-600 text-white font-medium text-center transition-all hover:shadow-md"
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
    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blush-50 ${
      active 
        ? 'text-blush-600 bg-blush-50' 
        : 'text-foreground hover:text-blush-500'
    }`}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blush-500 rounded-full"></span>
    )}
  </Link>
);

// Mobile navigation link component
const MobileNavLink = ({ to, active, onClick, children }) => (
  <Link
    to={to}
    className={`block px-4 py-3 rounded-md transition-all ${
      active 
        ? 'bg-blush-50 text-blush-600 font-medium' 
        : 'text-foreground hover:bg-gray-50 hover:text-blush-500'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
