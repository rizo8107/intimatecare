import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, BookOpen, Sparkles, Zap } from 'lucide-react';

const PRODUCTS_PREVIEW = [
    {
        id: 1,
        title: "1:1 Confidential Coaching",
        description: "Personalized intimacy strategy sessions tailored to your specific needs and pace.",
        price: "₹2,500",
        icon: Heart,
        color: "from-pink-500 to-rose-600",
        link: "/sessions",
        badge: "Most Popular"
    },
    {
        id: 2,
        title: "69 Position Playbook",
        description: "Expert-crafted guide with 69 illustrated positions to bring excitement and confidence.",
        price: "₹699",
        originalPrice: "₹999",
        icon: BookOpen,
        color: "from-violet-500 to-purple-600",
        link: "/guide",
        badge: "Bestseller"
    },
    {
        id: 5,
        title: "The Ultimate Pleasure Bundle",
        description: "Complete ecosystem including the playbook, challenge, and exclusive bonus content.",
        price: "₹999",
        originalPrice: "₹1,999",
        icon: Sparkles,
        color: "from-indigo-500 to-blue-600",
        link: "/newyear-bundle",
        badge: "Best Value"
    }
];

const ProductsPreview = () => {
    return (
        <section className="py-24 bg-slate-50/50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
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
                    <Link to="/products" className="group flex items-center gap-2 px-8 py-4 bg-white border border-slate-100 rounded-2xl font-bold hover:border-primary/20 transition-all shadow-sm mb-4">
                        View All Products
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRODUCTS_PREVIEW.map((product) => (
                        <Link key={product.id} to={product.link} className="group block h-full">
                            <div className="card-modern h-full flex flex-col p-8 relative overflow-hidden bg-white border border-slate-100 group-hover:border-primary/20 transition-all duration-500">
                                <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${product.color} opacity-[0.03] group-hover:opacity-10 rounded-full transition-all duration-700 blur-2xl`} />

                                <div className="flex justify-between items-start mb-8">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} p-[1px] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
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

                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 block">Starting From</span>
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsPreview;
