import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Download,
    Type,
    Image as ImageIcon,
    Sparkles,
    ArrowLeft,
    RefreshCw,
    Check,
    Smartphone,
    Square,
    RectangleHorizontal,
    Maximize2,
    Columns2,
    Rows2,
    LayoutList,
    Trello,
    Zap,
    Crown,
    Leaf,
    Grid,
    Layers as LayersIcon,
    Palette,
    Plus,
    X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

const PRODUCTS = [
    {
        id: 2,
        title: "69 Position Playbook",
        tagline: "Expert Guide for Modern Couples",
        price: "699",
        image: "/69.jpg",
        color: "#FB4672"
    },
    {
        id: 3,
        title: "30-Day Couple Challenge",
        tagline: "Reignite Your Passion Daily",
        price: "599",
        image: "/images/32 days v2.jpg",
        color: "#6366f1"
    },
    {
        id: 4,
        title: "Intimate Talks",
        tagline: "Community Support & Expert Q&A",
        price: "Free",
        image: "/students.webp",
        color: "#10b981"
    },
    {
        id: 5,
        title: "Pleasure Bundle",
        tagline: "The Complete Intimacy Ecosystem",
        price: "999",
        image: "/bundle.jpg",
        color: "#8b5cf6"
    },
    {
        id: 1,
        title: "1:1 Coaching",
        tagline: "Personalized Intimacy Strategy Sessions",
        price: "2,500",
        image: "/hero_banner/single-hero.png",
        color: "#f43f5e"
    }
];

const LAYOUTS = [
    { id: 'square', name: 'Post', width: 1080, height: 1080, icon: Square },
    { id: 'story', name: 'Story', width: 1080, height: 1920, icon: Smartphone },
    { id: 'link', name: 'Link Post', width: 1200, height: 628, icon: RectangleHorizontal },
];

const IMAGE_ARRANGEMENTS = [
    { id: 'single', name: 'Single', icon: Maximize2 },
    { id: 'grid', name: 'Grid', icon: Grid },
    { id: 'stack', name: 'Stacked', icon: LayersIcon },
    { id: 'two-column', name: '2 Columns', icon: Columns2 },
    { id: 'two-row', name: '2 Rows', icon: Rows2 },
    { id: 'freeform', name: 'Freeform', icon: Trello },
];

const COLOR_PRESETS = [
    '#ffffff', '#FB4672', '#6366f1', '#8b5cf6', '#10b981', '#f43f5e', '#ffb800', '#000000'
];

const DESIGN_STYLES = [
    { id: 'modern', name: 'Modern Dark', bg: 'bg-slate-950', accent: '#FB4672', theme: 'dark' },
    { id: 'glass', name: 'Glassmorphism', bg: 'bg-indigo-900/20', accent: '#6366f1', theme: 'dark' },
    { id: 'minimal', name: 'Pure Minimal', bg: 'bg-white', accent: '#000000', theme: 'light' },
    { id: 'vibrant', name: 'Neon Party', bg: 'bg-purple-900', accent: '#f0f', theme: 'dark' },
    { id: 'editorial', name: 'Editorial', bg: 'bg-[#f4f1ea]', accent: '#1a1a1a', theme: 'light' },
    { id: 'cyber', name: 'Cyberpunk', bg: 'bg-black', accent: '#00f2ff', theme: 'dark', icon: Zap },
    { id: 'luxury', name: 'Royal Gold', bg: 'bg-[#1a1a1a]', accent: '#d4af37', theme: 'dark', icon: Crown },
    { id: 'organic', name: 'Organic', bg: 'bg-[#e9ece6]', accent: '#606c38', theme: 'light', icon: Leaf },
];

const FONTS = [
    { id: 'inter', name: 'Inter (Sans)', value: "'Inter', sans-serif" },
    { id: 'playfair', name: 'Playfair (Serif)', value: "'Playfair Display', serif" },
    { id: 'outfit', name: 'Outfit (Modern)', value: "'Outfit', sans-serif" },
    { id: 'bebas', name: 'Bebas (Impact)', value: "'Bebas Neue', cursiv" },
    { id: 'syne', name: 'Syne (Art)', value: "'Syne', sans-serif" },
];

const Posters = () => {
    // Selection state
    const [selectedProducts, setSelectedProducts] = useState<typeof PRODUCTS>([PRODUCTS[0]]);
    const [selectedLayout, setSelectedLayout] = useState(LAYOUTS[0]);
    const [imageArrangement, setImageArrangement] = useState(IMAGE_ARRANGEMENTS[0]);
    const [selectedStyle, setSelectedStyle] = useState(DESIGN_STYLES[0]);

    // Visibility state
    const [hiddenElements, setHiddenElements] = useState({
        logo: false,
        images: false,
        headline: false,
        subheadline: false,
        cta: false,
        socialProof: false,
        price: false
    });

    // Content state
    const [headline, setHeadline] = useState(PRODUCTS[0].title);
    const [subheadline, setSubheadline] = useState(PRODUCTS[0].tagline);
    const [ctaText, setCtaText] = useState("Buy Now");
    const [originalPrice, setOriginalPrice] = useState("999");
    const [discountPrice, setDiscountPrice] = useState("699");
    const [discountLabel, setDiscountLabel] = useState("SPECIAL OFFER");
    const [showDiscountBadge, setShowDiscountBadge] = useState(true);

    // Style state
    const [headlineColor, setHeadlineColor] = useState('#ffffff');
    const [subheadlineColor, setSubheadlineColor] = useState('rgba(255,255,255,0.6)');
    const [ctaBgColor, setCtaBgColor] = useState(PRODUCTS[0].color);
    const [ctaTextColor, setCtaTextColor] = useState('#ffffff');
    const [priceColor, setPriceColor] = useState('#ffffff');

    // NEW Typography & Layout state
    const [fontFamily, setFontFamily] = useState(FONTS[0]);
    const [headlineSize, setHeadlineSize] = useState(64);
    const [subheadlineSize, setSubheadlineSize] = useState(20);
    const [isBold, setIsBold] = useState(true);
    const [isItalic, setIsItalic] = useState(true);
    const [isUppercase, setIsUppercase] = useState(true);
    const [posterPadding, setPosterPadding] = useState(8); // % padding
    const [contentGap, setContentGap] = useState(40); // px gap between images and text
    const [priceSize, setPriceSize] = useState(36); // px for main price
    const [imageGap, setImageGap] = useState(24); // px between images

    // NEW Image Editor state
    const [imageSize, setImageSize] = useState(80); // % of container
    const [imageRounding, setImageRounding] = useState(2.5); // rem
    const [imageBrightness, setImageBrightness] = useState(100);
    const [imageContrast, setImageContrast] = useState(100);
    const [imageSaturation, setImageSaturation] = useState(100);

    // NEW Feature state
    const [showSafeArea, setShowSafeArea] = useState(false);
    const [isDraggable, setIsDraggable] = useState(false);
    const [activeElement, setActiveElement] = useState<string | null>(null);
    const [logoScale, setLogoScale] = useState(1);
    const [ctaScale, setCtaScale] = useState(1);

    // UI state
    const [isGenerating, setIsGenerating] = useState(false);
    const [customImage, setCustomImage] = useState<string | null>(null);
    const posterRef = useRef<HTMLDivElement>(null);

    const toggleProduct = (product: typeof PRODUCTS[0]) => {
        setSelectedProducts(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                if (prev.length === 1) return prev; // Keep at least one
                return prev.filter(p => p.id !== product.id);
            }
            const newSelection = [...prev, product];
            // If it's a new selection and multiple, maybe suggest a layout
            if (newSelection.length > 1 && imageArrangement.id === 'single') {
                setImageArrangement(IMAGE_ARRANGEMENTS[1]); // Switch to grid
            }
            return newSelection;
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setCustomImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async () => {
        if (!posterRef.current) return;
        const canvas = await html2canvas(posterRef.current, { useCORS: true, scale: 2 });
        const link = document.createElement('a');
        link.download = `poster-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const handleShuffleLayout = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const randomArrangement = IMAGE_ARRANGEMENTS[Math.floor(Math.random() * IMAGE_ARRANGEMENTS.length)];
            const randomStyle = DESIGN_STYLES[Math.floor(Math.random() * DESIGN_STYLES.length)];
            const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];

            setImageArrangement(randomArrangement);
            setSelectedStyle(randomStyle);
            setFontFamily(randomFont);

            // Auto-apply contrast colors
            if (randomStyle.theme === 'light') {
                setHeadlineColor('#000000');
                setSubheadlineColor('rgba(0,0,0,0.6)');
            } else {
                setHeadlineColor('#ffffff');
                setSubheadlineColor('rgba(255,255,255,0.6)');
            }
            setCtaBgColor(randomStyle.accent);
            setPriceColor(randomStyle.theme === 'light' ? '#000000' : '#ffffff');

            setIsGenerating(false);
        }, 800);
    };

    const handleAIImprove = () => {
        setIsGenerating(true);
        setTimeout(() => {
            // Randomize design elements
            const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];
            const randomHeadlineSize = Math.floor(Math.random() * (80 - 40) + 40);
            const randomPadding = Math.floor(Math.random() * (12 - 5) + 5);

            setFontFamily(randomFont);
            setHeadlineSize(randomHeadlineSize);
            setPosterPadding(randomPadding);
            setIsUppercase(Math.random() > 0.5);
            setIsItalic(Math.random() > 0.5);

            if (selectedProducts.length > 1) {
                setHeadline("The Ultimate Couples Bundle");
                setSubheadline(`Save BIG on ${selectedProducts.length} expert-led intimacy tools designed for total transformation.`);
                setCtaText("Get Bundle Offer");

                const total = selectedProducts.reduce((sum, p) => sum + (parseInt(p.price.replace(/,/g, '')) || 0), 0);
                setOriginalPrice(total.toString());
                setDiscountPrice(Math.floor(total * 0.7).toString());
                setDiscountLabel(`${Math.floor(Math.random() * (40 - 20) + 20)}% BUNDLE OFF`);
            } else {
                const improvements = [
                    { h: "Transform Your Intimacy", s: "Expert strategies for a deeper connection." },
                    { h: "Rediscover The Spark", s: "The ultimate guide to sexual wellness." },
                    { h: "Level Up Your Connection", s: "Join 2,500+ couples finding more pleasure." }
                ];
                const random = improvements[Math.floor(Math.random() * improvements.length)];
                setHeadline(random.h);
                setSubheadline(random.s);

                const p = selectedProducts[0];
                if (p && p.price !== "Free") {
                    const price = parseInt(p.price.replace(/,/g, '')) || 999;
                    setOriginalPrice((price + 200).toString());
                    setDiscountPrice(price.toString());
                    setDiscountLabel("LIMITED TIME");
                }
            }
            setIsGenerating(false);
        }, 1200);
    };

    const handleGenerateLayout = () => {
        setIsGenerating(true);
        setTimeout(() => {
            // Intelligent Layout Combination
            const productCount = selectedProducts.length;

            // Pick arrangement based on count
            if (productCount === 1) {
                setImageArrangement(IMAGE_ARRANGEMENTS.find(a => a.id === 'single') || IMAGE_ARRANGEMENTS[0]);
                setImageSize(85);
            } else if (productCount === 2) {
                setImageArrangement(IMAGE_ARRANGEMENTS.find(a => a.id === 'two-column') || IMAGE_ARRANGEMENTS[1]);
                setImageSize(95);
            } else {
                setImageArrangement(IMAGE_ARRANGEMENTS.find(a => a.id === 'grid') || IMAGE_ARRANGEMENTS[1]);
                setImageSize(100);
            }

            // Pick a thematic style
            const styles = DESIGN_STYLES;
            const style = styles[Math.floor(Math.random() * styles.length)];
            setSelectedStyle(style);

            // Randomize spacing for "fresh" feel
            setPosterPadding(Math.floor(Math.random() * (12 - 4) + 4));
            setContentGap(Math.floor(Math.random() * (80 - 20) + 20));
            setImageGap(Math.floor(Math.random() * (40 - 10) + 10));

            // Font and Colors
            const font = FONTS[Math.floor(Math.random() * FONTS.length)];
            setFontFamily(font);

            if (style.theme === 'light') {
                setHeadlineColor('#000000');
                setSubheadlineColor('rgba(0,0,0,0.6)');
                setPriceColor('#000000');
            } else {
                setHeadlineColor('#ffffff');
                setSubheadlineColor('rgba(255,255,255,0.7)');
                setPriceColor('#ffffff');
            }
            setCtaBgColor(style.accent);

            setIsGenerating(false);
        }, 1000);
    };

    return (
        <div className="h-screen bg-[#0a0a0b] text-white flex flex-col md:flex-row-reverse overflow-hidden">
            {/* Sidebar - Independent Scroll - Now on Right */}
            <div className="w-full md:w-96 bg-[#111114] border-l border-white/5 flex flex-col h-full overflow-y-auto shrink-0 pb-10 scrollbar-hide">
                {/* Header */}
                <div className="p-6 border-b border-white/5 bg-[#111114] sticky top-0 z-20 backdrop-blur-xl">
                    <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to site</span>
                    </Link>
                    <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Design Studio AI
                    </h1>
                </div>

                <div className="p-6 space-y-10">
                    {/* ACTIVE ELEMENT SETTINGS PANEL */}
                    {activeElement && (
                        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 animate-in slide-in-from-top-4 fade-in duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    Editing: {activeElement}
                                </span>
                                <button onClick={() => setActiveElement(null)} className="p-1 hover:bg-white/10 rounded-full"><X className="w-3 h-3 text-white/40" /></button>
                            </div>

                            {activeElement === 'logo' && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Logo Scale</span>
                                        <span className="text-[10px] font-bold text-primary">{Math.round(logoScale * 100)}%</span>
                                    </div>
                                    <input type="range" min="0.5" max="2" step="0.1" value={logoScale} onChange={(e) => setLogoScale(parseFloat(e.target.value))} className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer" />
                                </div>
                            )}

                            {(activeElement === 'text' || activeElement === 'pricing') && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between"><span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Headline Size</span><span className="text-[10px] font-bold text-primary">{headlineSize}px</span></div>
                                        <input type="range" min="20" max="150" value={headlineSize} onChange={(e) => setHeadlineSize(parseInt(e.target.value))} className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between"><span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Price Size</span><span className="text-[10px] font-bold text-primary">{priceSize}px</span></div>
                                        <input type="range" min="20" max="150" value={priceSize} onChange={(e) => setPriceSize(parseInt(e.target.value))} className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer" />
                                    </div>
                                </div>
                            )}

                            {activeElement === 'cta' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between"><span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">CTA Scale</span><span className="text-[10px] font-bold text-primary">{Math.round(ctaScale * 100)}%</span></div>
                                        <input type="range" min="0.5" max="2" step="0.1" value={ctaScale} onChange={(e) => setCtaScale(parseFloat(e.target.value))} className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer" />
                                    </div>
                                    <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none" />
                                </div>
                            )}

                            {activeElement === 'images' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between"><span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Corner Rounding</span><span className="text-[10px] font-bold text-primary">{imageRounding}rem</span></div>
                                        <input type="range" min="0" max="10" step="0.5" value={imageRounding} onChange={(e) => setImageRounding(parseFloat(e.target.value))} className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between"><span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Gap</span><span className="text-[10px] font-bold text-primary">{imageGap}px</span></div>
                                        <input type="range" min="0" max="100" value={imageGap} onChange={(e) => setImageGap(parseInt(e.target.value))} className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 1. Products Selection */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">1. Select Products</label>
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{selectedProducts.length} Selected</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {PRODUCTS.map((product) => {
                                const isSelected = selectedProducts.find(p => p.id === product.id);
                                return (
                                    <button
                                        key={product.id}
                                        onClick={() => toggleProduct(product)}
                                        className={`flex items-center gap-3 p-3 rounded-2xl transition-all border ${isSelected
                                            ? 'bg-primary/20 border-primary/50 text-white'
                                            : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
                                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                                            {isSelected && <div className="absolute inset-0 bg-primary/40 flex items-center justify-center"><Check className="w-5 h-5" /></div>}
                                        </div>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-xs font-black truncate text-white">{product.title}</div>
                                            <div className="text-[10px] opacity-60">₹{product.price}</div>
                                        </div>
                                        {isSelected && <X className="w-4 h-4 opacity-40 hover:opacity-100" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Format Section */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 block">2. Canvas & Layout</label>
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                {LAYOUTS.map((layout) => (
                                    <button
                                        key={layout.id}
                                        onClick={() => setSelectedLayout(layout)}
                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all border ${selectedLayout.id === layout.id
                                            ? 'bg-primary/20 border-primary/50 text-white'
                                            : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'
                                            }`}
                                    >
                                        <layout.icon className="w-5 h-5" />
                                        <span className="text-[8px] font-bold uppercase tracking-widest">{layout.name}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {IMAGE_ARRANGEMENTS.map((arr) => (
                                    <button
                                        key={arr.id}
                                        onClick={() => setImageArrangement(arr)}
                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all border ${imageArrangement.id === arr.id
                                            ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                                            : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'
                                            }`}
                                    >
                                        <arr.icon className="w-5 h-5" />
                                        <span className="text-[8px] font-bold uppercase tracking-widest">{arr.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* NEW: Design Styles Selection */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 block">3. Design Style / Theme</label>
                        <div className="grid grid-cols-1 gap-2">
                            {DESIGN_STYLES.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => {
                                        setSelectedStyle(style);
                                        // Auto-apply contrast colors
                                        if (style.theme === 'light') {
                                            setHeadlineColor('#000000');
                                            setSubheadlineColor('rgba(0,0,0,0.6)');
                                            setCtaTextColor('#ffffff');
                                        } else {
                                            setHeadlineColor('#ffffff');
                                            setSubheadlineColor('rgba(255,255,255,0.6)');
                                            setCtaTextColor('#ffffff');
                                        }
                                        setCtaBgColor(style.accent);
                                    }}
                                    className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${selectedStyle.id === style.id
                                        ? 'bg-white/10 border-white/20 text-white'
                                        : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full border border-white/20 ${style.bg}`} style={{ backgroundColor: style.id === 'minimal' ? '#fff' : style.id === 'editorial' ? '#f4f1ea' : undefined }} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{style.name}</span>
                                    </div>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.accent }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* NEW: Visibility Toggles */}
                    <div className="space-y-4 pt-6 border-t border-white/5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 block">4. Visibility Layer</label>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(hiddenElements).map(([key, isHidden]) => (
                                <button
                                    key={key}
                                    onClick={() => setHiddenElements(prev => ({ ...prev, [key]: !prev[key] }))}
                                    className={`flex items-center justify-between px-4 py-2 rounded-xl border text-[9px] font-bold uppercase transition-all ${!isHidden ? 'bg-indigo-500/20 border-indigo-500/50 text-white' : 'bg-white/5 border-transparent text-white/40'
                                        }`}
                                >
                                    {key.replace(/([A-Z])/g, ' $1')}
                                    {isHidden ? <X className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 5. Typography & Design Controls */}
                    <div className="space-y-6 pt-6 border-t border-white/5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 block">5. Typography & Styles</label>

                        {/* Font Chooser */}
                        <div className="space-y-2">
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Font Family</span>
                            <div className="grid grid-cols-1 gap-1">
                                {FONTS.map(f => (
                                    <button
                                        key={f.id}
                                        onClick={() => setFontFamily(f)}
                                        className={`px-4 py-2 text-left rounded-xl border text-xs transition-all ${fontFamily.id === f.id ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent text-white/40 hover:bg-white/5'
                                            }`}
                                        style={{ fontFamily: f.value }}
                                    >
                                        {f.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Font Size & Padding Sliders */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Headline Size</span>
                                    <span className="text-[10px] font-bold text-primary">{headlineSize}px</span>
                                </div>
                                <input
                                    type="range" min="20" max="120" value={headlineSize}
                                    onChange={(e) => setHeadlineSize(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Sub-Text Size</span>
                                    <span className="text-[10px] font-bold text-primary">{subheadlineSize}px</span>
                                </div>
                                <input
                                    type="range" min="12" max="40" value={subheadlineSize}
                                    onChange={(e) => setSubheadlineSize(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Content Padding</span>
                                    <span className="text-[10px] font-bold text-primary">{posterPadding}%</span>
                                </div>
                                <input
                                    type="range" min="2" max="20" value={posterPadding}
                                    onChange={(e) => setPosterPadding(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Image Spacing</span>
                                    <span className="text-[10px] font-bold text-primary">{imageGap}px</span>
                                </div>
                                <input
                                    type="range" min="0" max="100" value={imageGap}
                                    onChange={(e) => setImageGap(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Vertical Gap</span>
                                    <span className="text-[10px] font-bold text-primary">{contentGap}px</span>
                                </div>
                                <input
                                    type="range" min="0" max="150" value={contentGap}
                                    onChange={(e) => setContentGap(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Font Style Toggles */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsBold(!isBold)}
                                className={`flex-1 py-3 rounded-xl border text-[10px] font-black transition-all ${isBold ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-transparent opacity-40'}`}
                            >B</button>
                            <button
                                onClick={() => setIsItalic(!isItalic)}
                                className={`flex-1 py-3 rounded-xl border text-[10px] font-black italic transition-all ${isItalic ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-transparent opacity-40'}`}
                            >I</button>
                            <button
                                onClick={() => setIsUppercase(!isUppercase)}
                                className={`flex-1 py-3 rounded-xl border text-[10px] font-black transition-all ${isUppercase ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-transparent opacity-40'}`}
                            >TT</button>
                        </div>
                    </div>

                    {/* NEW: Image Editor Section */}
                    <div className="space-y-6 pt-6 border-t border-white/5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 block">4. Image Editor</label>

                        <div className="space-y-4">
                            {/* Image Size Slider */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Display Size</span>
                                    <span className="text-[10px] font-bold text-primary">{imageSize}%</span>
                                </div>
                                <input
                                    type="range" min="30" max="100" value={imageSize}
                                    onChange={(e) => setImageSize(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Image Rounding Slider */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Corner Rounding</span>
                                    <span className="text-[10px] font-bold text-primary">{imageRounding}rem</span>
                                </div>
                                <input
                                    type="range" min="0" max="10" step="0.5" value={imageRounding}
                                    onChange={(e) => setImageRounding(parseFloat(e.target.value))}
                                    className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Filters Grid */}
                            <div className="grid grid-cols-1 gap-4 pt-2">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Brightness</span>
                                        <span className="text-[10px] font-bold text-primary">{imageBrightness}%</span>
                                    </div>
                                    <input
                                        type="range" min="50" max="150" value={imageBrightness}
                                        onChange={(e) => setImageBrightness(parseInt(e.target.value))}
                                        className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Contrast</span>
                                        <span className="text-[10px] font-bold text-primary">{imageContrast}%</span>
                                    </div>
                                    <input
                                        type="range" min="50" max="150" value={imageContrast}
                                        onChange={(e) => setImageContrast(parseInt(e.target.value))}
                                        className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Saturation</span>
                                        <span className="text-[10px] font-bold text-primary">{imageSaturation}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="200" value={imageSaturation}
                                        onChange={(e) => setImageSaturation(parseInt(e.target.value))}
                                        className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Text Content Content */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 block">5. Personalize Content</label>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Headline</span>
                                    <input type="color" value={headlineColor} onChange={(e) => setHeadlineColor(e.target.value)} className="w-5 h-5 rounded overflow-hidden bg-transparent cursor-pointer" />
                                </div>
                                <input
                                    type="text"
                                    value={headline}
                                    onChange={(e) => setHeadline(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:border-primary/50 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Subheadline</span>
                                    <input type="color" value={subheadlineColor} onChange={(e) => setSubheadlineColor(e.target.value)} className="w-5 h-5 rounded overflow-hidden bg-transparent cursor-pointer" />
                                </div>
                                <textarea
                                    value={subheadline}
                                    onChange={(e) => setSubheadline(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary/50 outline-none transition-all h-20 resize-none leading-relaxed"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Pricing Color</span>
                                    <input type="color" value={priceColor} onChange={(e) => setPriceColor(e.target.value)} className="w-5 h-5 rounded overflow-hidden bg-transparent cursor-pointer" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">CTA Style</span>
                                    <div className="flex gap-2">
                                        <input type="color" value={ctaBgColor} onChange={(e) => setCtaBgColor(e.target.value)} className="w-5 h-5 rounded overflow-hidden bg-transparent cursor-pointer" />
                                        <input type="color" value={ctaTextColor} onChange={(e) => setCtaTextColor(e.target.value)} className="w-5 h-5 rounded overflow-hidden bg-transparent cursor-pointer" />
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={ctaText}
                                    onChange={(e) => setCtaText(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-widest focus:border-primary/50 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* NEW: Workflow Controls */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 block">6. Studio Workflow</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setShowSafeArea(!showSafeArea)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${showSafeArea ? 'bg-primary/20 border-primary/50 text-white' : 'bg-white/5 border-transparent text-white/40'
                                }`}
                        >
                            <div className={`w-3 h-3 rounded-full ${showSafeArea ? 'bg-primary animate-pulse' : 'bg-white/20'}`} />
                            <span className="text-[8px] font-bold uppercase tracking-widest text-center">Instagram Safe Area</span>
                        </button>
                        <button
                            onClick={() => setIsDraggable(!isDraggable)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${isDraggable ? 'bg-indigo-500/20 border-indigo-500/50 text-white' : 'bg-white/5 border-transparent text-white/40'
                                }`}
                        >
                            <div className={`w-3 h-3 rounded-full ${isDraggable ? 'bg-indigo-500 animate-pulse' : 'bg-white/20'}`} />
                            <span className="text-[8px] font-bold uppercase tracking-widest text-center">Free Move Mode</span>
                        </button>
                    </div>
                    {isDraggable && (
                        <p className="text-[9px] text-white/30 italic text-center">
                            * Elements are now draggable directly on the canvas
                        </p>
                    )}
                </div>

                {/* NEW: Pricing & Badge Section */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 block">7. Pricing & Badges</label>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Original Price</span>
                            <input
                                type="text"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Offer Price</span>
                            <input
                                type="text"
                                value={discountPrice}
                                onChange={(e) => setDiscountPrice(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Badge Text</span>
                            <button onClick={() => setShowDiscountBadge(!showDiscountBadge)} className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${showDiscountBadge ? 'bg-primary text-white' : 'bg-white/10 text-white/30'}`}>
                                {showDiscountBadge ? 'ON' : 'OFF'}
                            </button>
                        </div>
                        <input
                            type="text"
                            value={discountLabel}
                            onChange={(e) => setDiscountLabel(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                            placeholder="e.g. 30% OFF, LIMITED TIME"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Price Font Size</span>
                            <span className="text-[10px] font-bold text-primary">{priceSize}px</span>
                        </div>
                        <input
                            type="range" min="20" max="120" value={priceSize}
                            onChange={(e) => setPriceSize(parseInt(e.target.value))}
                            className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                        />
                    </div>

                </div>

                {/* Shuffle, AI & Download Section */}
                <div className="p-6 space-y-3 border-t border-white/5 bg-[#111114]/80 backdrop-blur-xl sticky bottom-0 z-20">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={handleShuffleLayout}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                            Shuffle
                        </button>
                        <button
                            onClick={handleAIImprove}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all disabled:opacity-50"
                        >
                            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                            Improve
                        </button>
                        <button
                            onClick={handleGenerateLayout}
                            disabled={isGenerating}
                            className="col-span-2 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-500 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-50"
                        >
                            <Trello className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                            Generate Fresh Look
                        </button>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-[1.5rem] bg-white text-black font-black uppercase tracking-widest hover:scale-[1.02] shadow-2xl transition-all border border-white"
                    >
                        <Download className="w-4 h-4" />
                        Download Poster
                    </button>
                </div>
            </div>

            {/* Preview Canvas (Main Content Area) */}
            <div className="flex-1 bg-black p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,70,114,0.05)_0%,transparent_70%)] pointer-events-none" />

                <div className="mb-4 text-white/20 text-[8px] font-black uppercase tracking-[0.4em] flex items-center gap-4 shrink-0">
                    <div className="h-[1px] w-12 bg-white/10" />
                    Live Poster Preview
                    <div className="h-[1px] w-12 bg-white/10" />
                </div>

                <div
                    className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] bg-slate-950 origin-center relative border border-white/5 flex-shrink-0"
                    style={{
                        width: `${selectedLayout.width}px`,
                        height: `${selectedLayout.height}px`,
                        transform: `scale(${Math.min(
                            0.7,
                            (window.innerWidth - (window.innerWidth < 768 ? 40 : 400)) / selectedLayout.width,
                            (window.innerHeight - 150) / selectedLayout.height
                        )})`,
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    <div
                        ref={posterRef}
                        className={`w-full h-full relative overflow-hidden flex flex-col transition-colors duration-700 ${selectedStyle.bg}`}
                    >
                        {/* Background Layer */}
                        <div className="absolute inset-0 z-0 opacity-40">
                            {selectedStyle.theme === 'dark' && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-950/80 to-black" />
                                    {selectedProducts[0] && (
                                        <img src={selectedProducts[0].image} alt="" className="w-full h-full object-cover opacity-20 blur-2xl" />
                                    )}
                                    <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-primary/10 to-transparent" />
                                </>
                            )}
                            {selectedStyle.id === 'glass' && (
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_70%)]" />
                            )}
                        </div>

                        {/* Content Layer */}
                        <div
                            className={`relative z-10 w-full h-full flex flex-col items-center text-center transition-all duration-500 ${isDraggable ? 'cursor-move' : ''}`}
                            style={{ padding: `${posterPadding}%` }}
                        >
                            {/* Brand Logo */}
                            {!hiddenElements.logo && (
                                <motion.div
                                    drag={isDraggable}
                                    dragConstraints={posterRef}
                                    dragMomentum={false}
                                    onClick={(e) => { e.stopPropagation(); setActiveElement('logo'); }}
                                    className={`mb-auto transition-shadow ${isDraggable ? 'hover:ring-2 ring-primary ring-offset-4 ring-offset-transparent rounded-lg cursor-grab active:cursor-grabbing' : 'cursor-pointer hover:opacity-80'}`}
                                >
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, scale: logoScale }}
                                        className={`text-2xl font-black tracking-tighter ${selectedStyle.theme === 'light' ? 'text-black' : 'text-white'}`}
                                        style={{ fontFamily: fontFamily.value }}
                                    >
                                        Intimate <span className="text-primary italic">Care.</span>
                                    </motion.span>
                                </motion.div>
                            )}

                            {/* Main Content Area Wrapper */}
                            <div className={`w-full h-full flex ${imageArrangement.id === 'two-column' ? 'flex-row items-center gap-10 text-left' : 'flex-col items-center justify-center text-center'} transition-all`}>

                                {/* Dynamic Image Arrangement */}
                                {!hiddenElements.images && (
                                    <motion.div
                                        drag={isDraggable}
                                        dragConstraints={posterRef}
                                        dragMomentum={false}
                                        onClick={(e) => { e.stopPropagation(); setActiveElement('images'); }}
                                        style={{ marginBottom: imageArrangement.id === 'two-column' ? 0 : `${contentGap}px` }}
                                        className={`
                                        transition-shadow ${isDraggable ? 'hover:ring-2 ring-primary ring-offset-4 ring-offset-transparent rounded-3xl cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                                        ${imageArrangement.id === 'two-column' ? 'w-[45%] flex-shrink-0' : 'w-full flex-grow flex items-center justify-center'}
                                    `}
                                    >
                                        <motion.div
                                            layout
                                            style={{ width: `${imageSize}%`, gap: `${imageGap}px` }}
                                            className={`mx-auto ${imageArrangement.id === 'grid'
                                                ? 'grid grid-cols-2'
                                                : imageArrangement.id === 'two-column'
                                                    ? 'flex flex-row items-center justify-center'
                                                    : imageArrangement.id === 'two-row'
                                                        ? 'flex flex-col items-center justify-center'
                                                        : imageArrangement.id === 'freeform'
                                                            ? 'relative min-h-[400px]'
                                                            : imageArrangement.id === 'stack'
                                                                ? 'relative flex items-center justify-center'
                                                                : 'flex justify-center'
                                                }`}
                                        >
                                            <AnimatePresence mode="popLayout">
                                                {selectedProducts.map((p, i) => (
                                                    <motion.div
                                                        key={p.id}
                                                        layout
                                                        initial={{ y: 50, opacity: 0, scale: 0.8 }}
                                                        animate={{
                                                            y: 0,
                                                            opacity: 1,
                                                            scale: 1,
                                                            rotate: imageArrangement.id === 'stack' ? (i - (selectedProducts.length - 1) / 2) * 8 : 0,
                                                            x: imageArrangement.id === 'stack' ? (i - (selectedProducts.length - 1) / 2) * 50 : 0,
                                                            zIndex: selectedProducts.length - i
                                                        }}
                                                        exit={{ scale: 0.5, opacity: 0 }}
                                                        className={`
                                                        overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-900 aspect-square
                                                        ${imageArrangement.id === 'single' ? 'w-full' : ''}
                                                        ${imageArrangement.id === 'two-column' ? 'flex-1 max-w-[45%]' : ''}
                                                        ${imageArrangement.id === 'two-row' ? 'w-full max-h-[180px]' : ''}
                                                        ${imageArrangement.id === 'grid' ? 'w-full' : ''}
                                                        ${imageArrangement.id === 'stack' ? 'absolute w-[75%]' : ''}
                                                        ${imageArrangement.id === 'freeform' ? 'absolute w-[50%]' : ''}
                                                    `}
                                                        drag={imageArrangement.id === 'freeform' || isDraggable}
                                                        dragConstraints={posterRef}
                                                        dragMomentum={false}
                                                        style={{
                                                            borderRadius: `${imageRounding}rem`,
                                                            filter: `brightness(${imageBrightness}%) contrast(${imageContrast}%) saturate(${imageSaturation}%)`,
                                                            top: imageArrangement.id === 'freeform' ? `${i * 10}%` : undefined,
                                                            left: imageArrangement.id === 'freeform' ? `${i * 10}%` : undefined,
                                                            zIndex: imageArrangement.id === 'freeform' ? 20 + i : (selectedProducts.length - i)
                                                        }}
                                                    >
                                                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Typography Section */}
                                <motion.div
                                    drag={isDraggable}
                                    dragConstraints={posterRef}
                                    dragMomentum={false}
                                    onClick={(e) => { e.stopPropagation(); setActiveElement('text'); }}
                                    className={`
                                    space-y-6 transition-shadow p-4 
                                    ${isDraggable ? 'hover:ring-2 ring-primary ring-offset-4 ring-offset-transparent rounded-3xl cursor-grab active:cursor-grabbing bg-black/20 backdrop-blur-sm' : 'cursor-pointer hover:bg-white/5 rounded-3xl'}
                                    ${imageArrangement.id === 'two-column' ? 'flex-1 flex flex-col items-start min-w-0' : 'w-full mt-auto flex flex-col items-center'}
                                `}
                                >
                                    {!hiddenElements.headline && (
                                        <motion.h2
                                            key={headline}
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="leading-[0.85] tracking-tighter"
                                            style={{
                                                color: headlineColor,
                                                fontFamily: fontFamily.value,
                                                fontSize: `${headlineSize}px`,
                                                fontWeight: isBold ? 900 : 400,
                                                fontStyle: isItalic ? 'italic' : 'normal',
                                                textTransform: isUppercase ? 'uppercase' : 'none',
                                                textShadow: selectedStyle.theme === 'dark' ? '0 10px 40px rgba(0,0,0,0.6)' : 'none'
                                            }}
                                        >
                                            {headline}
                                        </motion.h2>
                                    )}

                                    {!hiddenElements.subheadline && (
                                        <motion.p
                                            key={subheadline}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="font-bold max-w-[90%] mx-auto leading-snug"
                                            style={{
                                                color: subheadlineColor,
                                                fontFamily: fontFamily.value,
                                                fontSize: `${subheadlineSize}px`
                                            }}
                                        >
                                            {subheadline}
                                        </motion.p>
                                    )}

                                    {!hiddenElements.price && (
                                        <div className="flex flex-col items-center gap-2">
                                            {showDiscountBadge && (
                                                <motion.div
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg"
                                                >
                                                    {discountLabel}
                                                </motion.div>
                                            )}
                                            <div className="flex items-center gap-4">
                                                <span className={`font-bold line-through opacity-40`} style={{ color: priceColor, fontSize: `${priceSize * 0.6}px` }}>
                                                    ₹{originalPrice}
                                                </span>
                                                <span className={`font-black`} style={{ color: priceColor, fontSize: `${priceSize}px` }}>
                                                    ₹{discountPrice}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Button Component */}
                                    <div className="pt-8 flex flex-col items-center gap-8 w-full">
                                        {!hiddenElements.cta && (
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                onClick={(e) => { e.stopPropagation(); setActiveElement('cta'); }}
                                                className="px-14 py-6 rounded-full font-black uppercase tracking-[0.2em] text-xl shadow-2xl cursor-pointer"
                                                animate={{ scale: ctaScale }}
                                                style={{
                                                    backgroundColor: ctaBgColor,
                                                    color: ctaTextColor,
                                                    fontFamily: fontFamily.value,
                                                    boxShadow: `0 20px 50px ${ctaBgColor}66`
                                                }}
                                            >
                                                {ctaText}
                                            </motion.div>
                                        )}

                                        {/* Social Proof Bar */}
                                        {!hiddenElements.socialProof && (
                                            <div className="flex items-center gap-3">
                                                <div className="flex -space-x-3">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} className={`w-10 h-10 rounded-full border-4 ${selectedStyle.theme === 'light' ? 'border-white' : 'border-slate-950'} overflow-hidden shadow-lg`}>
                                                            <img src={`https://i.pravatar.cc/100?u=${i + 15}`} alt="" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className={`text-sm font-black uppercase tracking-widest italic ${selectedStyle.theme === 'light' ? 'text-black/40' : 'text-white/30'}`}>2.5k Happy Couples</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>



                        {/* Texture Overlay */}
                        <div
                            className="absolute inset-0 z-40 opacity-[0.2] pointer-events-none mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                            }}
                        />
                    </div>
                </div>

                {/* Visual Feedback for dimensions - Properly Positioned */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-8 items-center z-50 pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-white/40 font-black tracking-widest uppercase">Format</span>
                        <span className="text-xs font-bold text-white/80 drop-shadow-md">{selectedLayout.name} ({selectedLayout.width}x{selectedLayout.height})</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/20" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-white/40 font-black tracking-widest uppercase">DPI</span>
                        <span className="text-xs font-bold text-white/80 drop-shadow-md">300 (High-Res)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posters;
