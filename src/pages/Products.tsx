import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Search,
    Filter,
    Sparkles,
    BookOpen,
    Heart,
    Star,
    ChevronRight,
    Target,
    Clock,
    Zap,
    CheckCircle2,
    Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';



const PRODUCTS = [
    {
        id: 2,
        title: "69 Position Playbook",
        subtitle: "Expert Guide",
        description: "Expert-crafted guide with 69 illustrated positions to bring excitement and confidence.",
        price: "₹699",
        category: "Playbook",
        issue: ["Relationship Spark", "Pleasure Skills"],
        image: "/69.jpg",
        icon: BookOpen,
        rating: "4.8",
        reviews: "1.2k+",
        link: "/guide",
        badge: "Bestseller"
    },
    {
        id: 3,
        title: "30-Day Couple Challenge",
        subtitle: "Daily Sparks",
        description: "Daily sparks and activities designed to reignite passion and deepen your bond.",
        price: "₹599",
        category: "Challenge",
        issue: ["Relationship Spark", "Communication"],
        image: "/images/32 days v2.jpg", // Using a fallback image for challenge
        icon: Target,
        rating: "5.0",
        reviews: "450+",
        link: "/30-day-challenge",
        badge: "Top Rated"
    },
    {
        id: 4,
        title: "Intimate Talks",
        subtitle: "Community Support",
        description: "Ongoing support, expert Q&A, and community discussions for lasting transformation.",
        price: "Free",
        category: "Community",
        issue: ["Communication", "Pleasure Skills"],
        image: "/telegram.png",
        icon: Zap,
        rating: "4.7",
        reviews: "2.5k+",
        link: "/intimatetalks",
        badge: "Free Access"
    },
    {
        id: 5,
        title: "Pleasure Bundle",
        subtitle: "Complete Ecosystem",
        description: "Complete ecosystem including the playbook, challenge, and exclusive bonus content.",
        price: "₹999",
        category: "Bundle",
        issue: ["All Issues"],
        image: "/bundle.jpg",
        icon: Sparkles,
        rating: "4.9",
        reviews: "150+",
        link: "/newyear-bundle",
        badge: "Best Value"
    },
    {
        id: 1,
        title: "1:1 Coaching",
        subtitle: "Personalized Strategy",
        description: "Personalized intimacy strategy sessions tailored to your specific needs and pace.",
        price: "₹2,500",
        category: "Coaching",
        issue: ["Low Libido", "Performance", "Relationship Spark", "Vaginismus", "Communication"],
        image: "/hero_banner/single-hero.png",
        icon: Heart,
        rating: "4.9",
        reviews: "850+",
        link: "/sessions",
        badge: "Personalized"
    }
];

const Products = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [searchQuery]);

    return (
        <div className="bg-white min-h-screen">

            {/* Products Grid */}
            <section className="py-10">
                <div className="container-custom">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <Link to={product.link} className="group block h-full">
                                            <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                                {/* Image Container */}
                                                <div className="relative aspect-[4/5] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden mb-3 md:mb-6">
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />

                                                    {/* Floating Badge (Left) */}
                                                    {product.badge && (
                                                        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/60 backdrop-blur-md px-2 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 hidden xs:block">
                                                            <span className="text-[8px] md:text-xs font-medium text-white tracking-wide">
                                                                {product.badge}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Icon Badge (Right) */}
                                                    <div className="absolute top-2 right-2 md:top-4 md:right-4 w-7 h-7 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                        <product.icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-slate-900" />
                                                    </div>

                                                    {/* Dots Indicator (Visual only) */}
                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex gap-1.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50 backdrop-blur-sm" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50 backdrop-blur-sm" />
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="px-1 md:px-2 pb-1 md:pb-2 flex flex-col flex-grow">
                                                    <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-0.5 md:mb-1 tracking-tight leading-tight line-clamp-1">
                                                        {product.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                                                        <p className="text-slate-400 font-medium text-[10px] md:text-sm line-clamp-1">
                                                            {product.subtitle}
                                                        </p>
                                                        <span className="w-[1px] h-3 bg-slate-200" />
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-[#FFB800] fill-[#FFB800]" />
                                                            <span className="text-[10px] md:text-xs font-bold text-slate-600">{product.rating}</span>
                                                            <span className="text-[9px] md:text-[10px] text-slate-400 font-medium">({product.reviews})</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2">
                                                        {product.description}
                                                    </p>

                                                    {/* Tags row - Hidden on small mobile */}
                                                    <div className="hidden sm:flex flex-wrap gap-2 mb-6 mt-auto">
                                                        {product.issue.slice(0, 2).map((tag) => (
                                                            <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {product.issue.length > 2 && (
                                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                                +{product.issue.length - 2}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mt-auto gap-2">
                                                        <div className="px-3 py-1.5 md:px-5 md:py-2.5 bg-slate-100 rounded-full text-center">
                                                            <span className="text-slate-900 font-bold tracking-tight text-xs md:text-base">{product.price}</span>
                                                        </div>
                                                        <div className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-2.5 bg-slate-900 rounded-full text-white font-medium group-hover:bg-primary transition-colors text-[10px] md:text-base">
                                                            <span className="hidden md:inline">Buy Now</span>
                                                            <span className="md:hidden">Buy</span>
                                                            <div className="bg-white/20 rounded-full p-0.5 hidden md:block">
                                                                <ArrowRight className="w-3 h-3 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-40 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200">
                                <Search className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-500 font-medium mb-8">Try adjusting your search query to find what you're looking for.</p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="btn-premium-outline"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Trust Quote Section */}
            <section className="py-20 border-t border-slate-100">
                <div className="container-custom">
                    <div className="bg-slate-950 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-2xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
                                    Need Help Choosing <br />
                                    <span className="text-primary">The Right Path?</span>
                                </h2>
                                <p className="text-base sm:text-lg text-white/60 font-medium leading-relaxed mb-10">
                                    Every journey is unique. If you're unsure which guide or bundle is best for your current situation, schedule a brief discovery call with our team.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/sessions" className="btn-premium-primary">
                                        Book Discovery Call
                                    </Link>
                                    <Link to="/contact" className="px-8 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                                        Ask a Question
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { icon: ShieldCheck, title: "100% Private", desc: "Confidential billing" },
                                    { icon: Heart, title: "Expert Led", desc: "Proven methodologies" },
                                    { icon: Clock, title: "Instant Access", desc: "Start journey now" },
                                    { icon: Star, title: "Lifetime Use", desc: "Keep guides forever" }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                                        <item.icon className="w-8 h-8 text-primary mb-4" />
                                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                        <p className="text-white/40 text-xs font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

// Simple reusable components that might be missing in some setups
const ShieldCheck = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
);

export default Products;
