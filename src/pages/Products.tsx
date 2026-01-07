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

// Product Categories by Issues
const ISSUES = [
    "All Issues",
    "Low Libido",
    "Performance",
    "Relationship Spark",
    "Vaginismus",
    "Communication",
    "Pleasure Skills"
];

const PRODUCTS = [
    {
        id: 1,
        title: "1:1 Confidential Coaching",
        description: "Personalized intimacy strategy sessions tailored to your specific needs and pace.",
        price: "₹2,500",
        category: "Coaching",
        issue: ["Low Libido", "Performance", "Relationship Spark", "Vaginismus", "Communication"],
        icon: Heart,
        color: "from-pink-500 to-rose-600",
        rating: "4.9",
        reviews: "850+",
        link: "/sessions",
        badge: "Personalized"
    },
    {
        id: 2,
        title: "69 Position Playbook",
        description: "Expert-crafted guide with 69 illustrated positions to bring excitement and confidence.",
        price: "₹699",
        originalPrice: "₹999",
        category: "Playbook",
        issue: ["Relationship Spark", "Pleasure Skills"],
        icon: BookOpen,
        color: "from-violet-500 to-purple-600",
        rating: "4.8",
        reviews: "1.2k+",
        link: "/guide",
        badge: "Bestseller"
    },
    {
        id: 3,
        title: "30-Day Couple Challenge",
        description: "Daily sparks and activities designed to reignite passion and deepen your bond.",
        price: "₹599",
        originalPrice: "₹999",
        category: "Challenge",
        issue: ["Relationship Spark", "Communication"],
        icon: Target,
        color: "from-amber-400 to-orange-500",
        rating: "5.0",
        reviews: "450+",
        link: "/30-day-challenge",
        badge: "Top Rated"
    },
    {
        id: 4,
        title: "Pleasure School Community",
        description: "Ongoing support, expert Q&A, and community discussions for lasting transformation.",
        price: "Free",
        category: "Community",
        issue: ["Communication", "Pleasure Skills"],
        icon: Zap,
        color: "from-emerald-400 to-teal-500",
        rating: "4.7",
        reviews: "2.5k+",
        link: "/intimatetalks",
        badge: "Free Access"
    },
    {
        id: 5,
        title: "The Ultimate Pleasure Bundle",
        description: "Complete ecosystem including the playbook, challenge, and exclusive bonus content.",
        price: "₹999",
        originalPrice: "₹1,999",
        category: "Bundle",
        issue: ["All Issues"],
        icon: Sparkles,
        color: "from-indigo-500 to-blue-600",
        rating: "4.9",
        reviews: "150+",
        link: "/newyear-bundle",
        badge: "Best Value"
    }
];

const Products = () => {
    const [selectedIssue, setSelectedIssue] = useState("All Issues");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            const matchesIssue = selectedIssue === "All Issues" ||
                product.issue.includes(selectedIssue) ||
                product.issue.includes("All Issues");
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesIssue && matchesSearch;
        });
    }, [selectedIssue, searchQuery]);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-slate-50">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="badge-premium mb-6">Our Transformation Tools</span>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                                Everything You Need for <br />
                                <span className="text-gradient">Intimate Excellence</span>
                            </h1>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
                                Choose the perfect path to deeper pleasure. Filter by issue to find exactly what you need to transform your connection today.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="sticky top-[88px] md:top-[112px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Issue Filter Chips */}
                        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide w-full lg:w-auto">
                            {ISSUES.map((issue) => (
                                <button
                                    key={issue}
                                    onClick={() => setSelectedIssue(issue)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${selectedIssue === issue
                                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {issue}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full lg:w-[350px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20">
                <div className="container-custom">
                    {filteredProducts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <Link to={product.link} className="block group h-full">
                                            <div className="card-modern h-full flex flex-col p-8 relative overflow-hidden bg-white border border-slate-100 hover:border-primary/20 transition-all duration-500">
                                                {/* Accent Gradient */}
                                                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${product.color} opacity-[0.03] group-hover:opacity-10 rounded-full transition-all duration-700 blur-2xl`} />

                                                {/* Top Badge */}
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} p-[1px] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-slate-100`}>
                                                        <div className="w-full h-full bg-white rounded-[0.9rem] flex items-center justify-center">
                                                            <product.icon className="w-7 h-7 text-primary" />
                                                        </div>
                                                    </div>
                                                    {product.badge && (
                                                        <span className={`px-4 py-1.5 bg-gradient-to-r ${product.color} text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg`}>
                                                            {product.badge}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Ratings */}
                                                <div className="flex items-center gap-1.5 mb-4">
                                                    <div className="flex items-center">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star key={s} className={`w-3.5 h-3.5 ${s <= parseFloat(product.rating) ? 'fill-[#FFB800] text-[#FFB800]' : 'text-slate-200'}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-900">{product.rating}</span>
                                                    <span className="text-[10px] font-semibold text-slate-400">({product.reviews})</span>
                                                </div>

                                                {/* Content */}
                                                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-primary transition-colors pr-8">
                                                    {product.title}
                                                </h3>
                                                <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed">
                                                    {product.description}
                                                </p>

                                                {/* Issue Tags */}
                                                <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                                                    {product.issue.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {product.issue.length > 3 && (
                                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                            +{product.issue.length - 3} More
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Price & Action */}
                                                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Total Value</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl font-black text-slate-900 tracking-tight">{product.price}</span>
                                                            {product.originalPrice && (
                                                                <span className="text-sm font-bold text-slate-300 line-through">{product.originalPrice}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="h-12 w-12 rounded-2xl bg-slate-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-500 transform group-hover:translate-x-1">
                                                        <ArrowRight className="w-6 h-6" />
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
                            <p className="text-slate-500 font-medium mb-8">Try adjusting your filters or search query to find what you're looking for.</p>
                            <button
                                onClick={() => { setSelectedIssue("All Issues"); setSearchQuery(""); }}
                                className="btn-premium-outline"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Trust Quote Section */}
            <section className="py-20 border-t border-slate-100">
                <div className="container-custom">
                    <div className="bg-slate-950 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
                                    Need Help Choosing <br />
                                    <span className="text-primary">The Right Path?</span>
                                </h2>
                                <p className="text-lg text-white/60 font-medium leading-relaxed mb-10">
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
