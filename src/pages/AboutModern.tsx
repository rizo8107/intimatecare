import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Heart, MessageCircle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const AboutModern = () => {
    const credentials = [
        "Certified in Sex & Sexual Health – Modern Sex Therapy Institute, USA",
        "Pursuing Master's in Psychology for human connection & intimacy",
        "Trained in trauma-informed approaches to sexual education",
        "Active participant in global sexual health workshops & conferences"
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <span className="badge-premium mb-6">The Founder</span>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 tracking-tighter leading-tight">
                            Making Pleasure a <br />
                            <span className="text-gradient">Daily Priority</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            I'm Khushboo Bist — your guide to open, honest, and shame-free conversations about intimacy.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image Side */}
                        <div className="relative group animate-fade-in">
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-white border-8 border-white animate-float">
                                <img
                                    src="/about.jpg"
                                    alt="Khushboo Bist"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            </div>

                            {/* Trust Card */}
                            <div className="absolute -bottom-10 -right-6 lg:-right-12 bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 border border-white/40 max-w-xs animate-float-delayed">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <span className="font-black text-slate-900 leading-tight">USA Certified Educator</span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium">Providing evidence-based guidance for modern relationships.</p>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-8 tracking-tight">My Journey & Story</h2>
                            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                                <p>
                                    Sex is one of the most natural yet misunderstood aspects of our lives.
                                    Growing up, I witnessed how silence and misinformation create confusion,
                                    fear, and unfulfilled connection.
                                </p>
                                <p>
                                    I decided to change that. I created this space to normalize honest conversations
                                    about intimacy — a space where individuals and couples can navigate their
                                    sensuality with confidence, knowledge, and <span className="text-primary font-black">zero shame</span>.
                                </p>
                                <p>
                                    My mission is to help you break through these barriers and experience the depth
                                    of pleasure and connection you truly deserve.
                                </p>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-4">
                                <Link to="/sessions" className="btn-premium-primary">
                                    Work With Me
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/contact" className="btn-premium-outline">
                                    Ask a Question
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section-padding bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in-up">
                        <span className="badge-premium !bg-white/10 !text-white border-white/10 mb-6">Our Vision</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">The Pleasure Philosophy</h2>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed">
                            We believe intimacy is building a bridge of trust, communication, and mutual discovery.
                            It's not just about mechanics — it's about the heart.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Safe Haven",
                                desc: "100% judgment-free environment where every question is valid and every experience is honored."
                            },
                            {
                                icon: Heart,
                                title: "Holistic Connection",
                                desc: "We focus on the physical, emotional, and psychological layers of intimacy for lasting results."
                            },
                            {
                                icon: Sparkles,
                                title: "Empowered Pleasure",
                                desc: "Taking charge of your own satisfaction is the first step toward a fulfilling partnership."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-colors duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Credentials Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="animate-fade-in-up">
                            <span className="badge-premium mb-6">The Proof</span>
                            <h2 className="section-title">
                                Academic & <br />
                                <span className="text-gradient">Professional Excellence</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-medium mb-10 max-w-lg leading-relaxed">
                                Expertise you can trust. I combine psychological insights with specialized sexual health certifications.
                            </p>
                            <div className="space-y-4">
                                {credentials.map((cred, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl group hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <span className="text-slate-900 font-bold leading-tight">{cred}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual CTA */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <div className="bg-gradient-to-br from-primary to-accent rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-primary/20 overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Ready to Take the <br />Next Step?</h3>
                                <p className="text-lg text-white/80 font-medium mb-10 leading-relaxed">
                                    Join me for a confidential discovery call and let's find the best path forward for your unique situation.
                                </p>
                                <Link to="/sessions" className="btn-premium-primary !bg-white !text-primary transform lg:scale-110 hover:scale-115">
                                    Book Your Call
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <div className="mt-12 flex items-center justify-center gap-6">
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-black">2.5K+</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Couples</span>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/20" />
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-black">4.9/5</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutModern;
