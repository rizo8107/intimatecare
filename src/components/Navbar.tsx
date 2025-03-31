
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="py-4 bg-sand-50 sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="font-serif text-2xl font-medium text-blush-600">
              Khushboo <span className="font-cursive">Bist</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-blush-500 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-blush-500 transition-colors">
              About
            </Link>
            <Link to="/sessions" className="text-foreground hover:text-blush-500 transition-colors">
              Sessions
            </Link>
            <Link to="/intimatetalks" className="text-foreground hover:text-blush-500 transition-colors">
              Intimate Talks
            </Link>
            <Link to="/guide" className="text-foreground hover:text-blush-500 transition-colors">
              69 Positions
            </Link>
            <Link to="/products" className="text-foreground hover:text-blush-500 transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-foreground hover:text-blush-500 transition-colors">
              Contact
            </Link>
            <Link to="/freebie" className="btn-primary">
              Free Guide
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-sand-50 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-blush-500 transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-blush-500 transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/sessions" 
                className="text-foreground hover:text-blush-500 transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Sessions
              </Link>
              <Link 
                to="/intimatetalks" 
                className="text-foreground hover:text-blush-500 transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Intimate Talks
              </Link>
              <Link 
                to="/guide" 
                className="text-foreground hover:text-blush-500 transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                69 Positions
              </Link>
              <Link 
                to="/products" 
                className="text-foreground hover:text-blush-500 transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-blush-500 transition-colors px-4 py-2"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link 
                to="/freebie" 
                className="btn-primary mx-4"
                onClick={closeMenu}
              >
                Free Guide
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
