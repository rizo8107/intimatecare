import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, BookOpen, Sparkles, Zap, Eye, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PRODUCTS_PREVIEW = [
    {
        id: 2,
        title: "69 Position Playbook",
        subtitle: "Expert Guide",
        description: "Expert-crafted guide with 69 illustrated positions to bring excitement and confidence.",
        price: "₹699",
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
        image: "/images/32 days v2.jpg",
        icon: Target,
        rating: "5.0",
        reviews: "450+",
        link: "/30-day-challenge",
        badge: "Top Rated"
    },
    {
        id: 1,
        title: "1:1 Coaching",
        subtitle: "Personalized Strategy",
        description: "Personalized intimacy strategy sessions tailored to your specific needs and pace.",
        price: "₹2,500",
        image: "/sessions.webp",
        icon: Heart,
        rating: "4.9",
        reviews: "850+",
        link: "/sessions",
        badge: "Most Popular"
    }
];

const ProductsPreview = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-slate-50/50 overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div className="max-w-2xl">
                        <span className="badge-premium mb-6">Our Marketplace</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Transform Your <br />
                            <span className="text-gradient">Intimate Experience</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            Explore our curated selection of coaching services, playbooks, and challenges designed to help you build a deeper, more fulfilling connection.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-sm"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <Link to="/products" className="hidden md:flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-bold hover:border-primary/20 transition-all shadow-sm ml-4">
                            View All
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 md:gap-8 pb-10 -mx-4 md:-mx-8 px-4 md:px-8 scrollbar-hide snap-x snap-mandatory"
                >
                    {PRODUCTS_PREVIEW.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="min-w-[50%] md:min-w-[340px] lg:min-w-[380px] snap-start"
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

                                        {/* Footer */}
                                        <div className="flex flex-col items-stretch mt-auto gap-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="px-4 py-1.5 md:px-5 md:py-2 bg-slate-100 rounded-full">
                                                    <span className="text-slate-900 font-bold tracking-tight text-xs md:text-base">{product.price}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-primary">
                                                    <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">View</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-2.5 bg-slate-900 rounded-full text-white font-medium group-hover:bg-primary transition-colors text-[10px] md:text-base">
                                                <span className="hidden md:inline">Buy Now</span>
                                                <span className="md:hidden">Buy Now</span>
                                                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white -rotate-45 group-hover:rotate-0 transition-transform hidden md:block" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsPreview;
