import { useState, useEffect } from 'react';
import { X as XIcon, Zap as ZapIcon, ArrowRight as ArrowIcon, Sparkles as SparklesIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SalesPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(3599); // 1 hour
    const { pathname } = useLocation();

    // Track which pages the popup has already been shown on during this session
    // Using a state inside App (globally) would persist, but here it persists as long as component is mounted
    // However, we want it to show on New Pages if it's dynamic.
    const [shownPaths, setShownPaths] = useState<string[]>([]);

    // Dynamic content configuration based on current route
    const getPopupContent = () => {
        // Home Page -> Bundle
        if (pathname === '/') {
            return {
                title: "New Year, New Connections",
                subtitle: "EXCLUSIVE BUNDLE",
                description: "Get our 3 bestselling products + exclusive bonuses for one unbeatable price. Start 2026 with a spark!",
                image: "/bundle.jpg",
                link: "/newyear-bundle",
                buttonText: "Claim Bundle - ₹1,599",
                badge: "HOLIDAY SPECIAL"
            };
        }

        // 30-Day Challenge Page -> 30-Day Challenge Offer
        if (pathname === '/30-day-challenge') {
            return {
                title: "30-Day Couple Challenge",
                subtitle: "ROUTINE BREAKER",
                description: "Break the cycle and rediscover your spark with 30 daily activities designed for maximum connection.",
                image: "/images/32 days v2.jpg",
                link: "https://payments.cashfree.com/forms/Break-The-Same-Sex-Routine",
                isExternal: true,
                buttonText: "Claim Discounted Price",
                badge: "MOST POPULAR"
            };
        }

        // Guide Page -> Playbook Offer
        if (pathname === '/guide') {
            return {
                title: "Get The 69 Position Playbook",
                subtitle: "LIMITED TIME OFFER",
                description: "Join 10,000+ couples who have transformed their intimacy with our expert-crafted guide.",
                image: "/69.jpg",
                link: "https://payments.cashfree.com/forms/69positionsebbok",
                isExternal: true,
                buttonText: "Grab For ₹599 Today",
                badge: "BESTSELLER"
            };
        }

        // Products Page or Combo Page -> Bundle Offer (Great value cross-sell)
        if (pathname === '/products' || pathname === '/combo-offer') {
            return {
                title: "The Ultimate New Year Bundle",
                subtitle: "BEST VALUE PACKAGE",
                description: "Why buy one when you can have them all? Includes 69 Positions, 30-Day Challenge & Private Community.",
                image: "/bundle.jpg",
                link: "/newyear-bundle",
                isExternal: false,
                buttonText: "Claim Bundle Discount",
                badge: "BEST VALUE"
            };
        }

        // Default Playbook content for other general pages
        return {
            title: "Get The 69 Position Playbook",
            subtitle: "LIMITED TIME OFFER",
            description: "Join 10,000+ couples who have transformed their intimacy with our expert-crafted guide.",
            image: "/69.jpg",
            link: "/guide",
            isExternal: false,
            buttonText: "Claim 30% Discount",
            badge: "BESTSELLER"
        };
    };

    const content = getPopupContent();

    useEffect(() => {
        const timerId = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        // Close current popup on navigation
        setIsVisible(false);

        // Don't show on the destination pages for the products themselves
        if (pathname === '/newyear-bundle') {
            return;
        }

        // Only show if it hasn't been shown on THIS specific path yet
        if (!shownPaths.includes(pathname)) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setShownPaths(prev => [...prev, pathname]);
            }, 7000); // 7 seconds delay
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    const closePopup = () => setIsVisible(false);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all z-10"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Image Part */}
                            <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                                <img
                                    src={content.image}
                                    alt={content.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>

                            {/* Content Part */}
                            <div className="md:w-3/5 p-8 md:p-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                                    <SparklesIcon className="w-3 h-3" />
                                    {content.subtitle}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-950 mb-3 tracking-tighter leading-tight">
                                    {content.title.includes('69 Position') ? (
                                        <>Get The <span className="text-gradient">69 Position</span> Playbook</>
                                    ) : content.title.includes('New Connections') || content.title.includes('New Year Bundle') ? (
                                        <>New Year, <span className="text-gradient">New Connections</span></>
                                    ) : (
                                        content.title
                                    )}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                                    {content.description}
                                </p>

                                <div className="flex flex-col gap-3">
                                    {content.isExternal ? (
                                        <a
                                            href={content.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={closePopup}
                                            className="btn-premium-primary w-full py-4 text-base shadow-xl shadow-primary/20"
                                        >
                                            {content.buttonText}
                                            <ArrowIcon className="w-5 h-5" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={content.link}
                                            onClick={closePopup}
                                            className="btn-premium-primary w-full py-4 text-base shadow-xl shadow-primary/20"
                                        >
                                            {content.buttonText}
                                            <ArrowIcon className="w-5 h-5" />
                                        </Link>
                                    )}
                                    <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <ZapIcon className="w-3 h-3 text-primary animate-pulse" />
                                        Offer expires in <span className="text-primary font-black">{formatTime(secondsLeft)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SalesPopup;
