import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles, BookOpen, Heart, Calendar, Zap, Heart as HeartSolid } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TopBanner = () => {
  const { pathname } = useLocation();
  const [proofIndex, setProofIndex] = useState(0);

  const proofs = [
    { text: "Sarah from Mumbai just booked a 1:1 session", time: "2 min ago" },
    { text: "Couple from Delhi downloaded the 69 Position Playbook", time: "5 min ago" },
    { text: "Priya joined the Intimate Talks", time: "8 min ago" },
  ];

  useEffect(() => {
    if (pathname !== '/') return;
    const interval = setInterval(() => {
      setProofIndex((prev) => (prev + 1) % proofs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pathname]);

  const getBannerContent = () => {
    if (pathname === '/') {
      return (
        <div className="flex items-center justify-center gap-4 text-[11px] font-bold tracking-tight">
          <div className="flex items-center gap-2 animate-fade-in-right">
            <HeartSolid className="w-3 h-3 text-primary fill-primary" />
            <span className="text-white/90">{proofs[proofIndex].text}</span>
          </div>
          <div className="h-2 w-[1px] bg-white/20" />
          <span className="text-white/40 uppercase text-[9px] tracking-widest">{proofs[proofIndex].time}</span>
        </div>
      );
    }

    if (pathname === '/guide' || pathname === '/30-day-challenge' || pathname === '/newyear-bundle' || pathname === '/intimatetalks') {
      const text = pathname === '/newyear-bundle'
        ? "NEW YEAR SPECIAL: 30% OFF ENDS SOON!"
        : "LIMITED OFFER: 30% OFF + FREE BONUS GUIDE! ⚡";

      return (
        <div className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em]">
          <Zap className="w-3 h-3 text-primary fill-primary animate-pulse" />
          <span>{text}</span>
          <Zap className="w-3 h-3 text-primary fill-primary animate-pulse" />
        </div>
      );
    }

    return null;
  };

  const content = getBannerContent();
  if (!content) return null;

  return (
    <div className="bg-slate-950 text-white py-2 relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50" />
      <div className="container-custom relative z-10">
        {content}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-[100]">
      <TopBanner />
      <nav
        className={`w-full transition-all duration-500 ${scrolled
          ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
          : 'py-3 lg:py-5 bg-white border-b border-slate-50'
          }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center group relative z-10">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-primary transition-colors duration-300">
                  Intimate Care<span className="text-primary">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 -mt-1 group-hover:text-slate-600 transition-colors">
                  Khushboo Bist
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center bg-slate-100/50 backdrop-blur-md border border-white/40 p-1.5 rounded-full">
              <NavLink to="/" active={isActive('/')}>
                Home
              </NavLink>

              <NavLink to="/products" active={isActive('/products')}>
                Our Products
              </NavLink>

              <NavDropdown
                label="1:1 Coaching"
                icon={<Heart className="w-4 h-4" />}
                items={[
                  { title: "Exclusive 1:1 Coaching", sub: "Personalized intimacy strategy", to: "/sessions" },
                  { title: "Student Support", sub: "Compassionate specialized care", href: "https://topmate.io/intimatecare/1823535" },
                ]}
                isActive={isActive('/sessions')}
              />

              <NavDropdown
                label="Expert Team"
                icon={<Sparkles className="w-4 h-4" />}
                items={[
                  { title: "Emotional Wellness", sub: "Therapeutic psychology care", to: "/instructor/Vishakha Parwani" },
                  { title: "Holistic Healing", sub: "Safe spaces for release", to: "/instructor/Mansi" },
                  { title: "Ayurvedic Care", sub: "Traditional mind-body balance", to: "/instructor/Charu" },
                ]}
                isActive={isActive('/instructors')}
              />

              <NavLink to="/webinars" active={isActive('/webinars')}>
                Masterclasses
              </NavLink>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/freebie"
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:-translate-y-0.5"
              >
                Free Guide
              </Link>
              <Link
                to="/products"
                className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
              >
                View Products
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/products"
                className="px-4 py-2 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-primary/20"
              >
                View Products
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2.5 rounded-2xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden fixed inset-x-4 top-24 pt-4 pb-8 transition-all duration-500 ease-out z-40 ${isOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-8 opacity-0 pointer-events-none'
              }`}
          >
            <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/40 p-6 space-y-3 overflow-hidden">
              <div className="flex flex-col gap-1">
                <MobileNavLink to="/" active={isActive('/')} onClick={closeMenu}>Home</MobileNavLink>

                <div className="mt-4 mb-2 px-4 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Coaching & Guides</div>
                <MobileNavLink to="/guide" active={isActive('/guide')} onClick={closeMenu}>Playbooks</MobileNavLink>
                <MobileNavLink to="/30-day-challenge" active={isActive('/30-day-challenge')} onClick={closeMenu}>Challenges</MobileNavLink>
                <MobileNavLink to="/newyear-bundle" active={isActive('/newyear-bundle')} onClick={closeMenu}>New Year Bundle</MobileNavLink>
                <MobileNavLink to="/sessions" active={isActive('/sessions')} onClick={closeMenu}>1:1 Sessions</MobileNavLink>

                <div className="mt-4 mb-2 px-4 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Community</div>
                <MobileNavLink to="/intimatetalks" active={isActive('/intimatetalks')} onClick={closeMenu}>Pleasure School</MobileNavLink>
                <MobileNavLink to="/webinars" active={isActive('/webinars')} onClick={closeMenu}>Masterclasses</MobileNavLink>
                <MobileNavLink to="/freebie" active={isActive('/freebie')} onClick={closeMenu}>Free Resources</MobileNavLink>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex gap-2">
                <Link to="/contact" className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold text-center shadow-lg shadow-primary/20" onClick={closeMenu}>
                  Book Discovery Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavDropdown = ({ label, items, icon, isActive }: any) => {
  return (
    <div className="relative group px-1">
      <button
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
          ? 'text-primary bg-primary/5'
          : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
      >
        {label}
        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
      </button>

      <div className="absolute left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 border border-slate-100/50 p-4">
        <div className="grid gap-1">
          {items.map((item: any, i: number) => {
            const Content = (
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group/item hover:bg-slate-50">
                <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover/item:bg-primary/10 flex items-center justify-center text-primary transition-colors">
                  {icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 group-hover/item:text-primary transition-colors">{item.title}</span>
                  <span className="text-xs text-slate-500">{item.sub}</span>
                </div>
              </div>
            );

            return item.to ? (
              <Link key={i} to={item.to} className="block">{Content}</Link>
            ) : (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block">{Content}</a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ to, active, children }: any) => (
  <Link
    to={to}
    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${active
      ? 'text-primary bg-white shadow-sm'
      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
      }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, active, onClick, children }: any) => (
  <Link
    to={to}
    className={`px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all ${active
      ? 'bg-primary/5 text-primary'
      : 'text-slate-700 active:bg-slate-50'
      }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;

