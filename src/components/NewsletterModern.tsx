import { useState } from 'react';
import { Mail, Gift, ArrowRight, Check, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NewsletterModern = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://backend-n8n.lhs56u.easypanel.host/webhook/kb_newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'website_newsletter_modern',
          subscriptionDate: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        toast({
          title: "Welcome to the community! 🎉",
          description: "Check your inbox for your free guide.",
        });
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-padding bg-slate-50/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100 text-center relative overflow-hidden">
            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-10 border border-primary/10">
              <Sparkles className="w-3.5 h-3.5" />
              Join 10,000+ Others
            </div>

            {/* Headline */}
            <h2 className="section-title mb-6">
              Get Weekly Intimacy Tips
              <br />
              <span className="text-gradient">
                + Free Pleasure Guide
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Practical tips on intimacy, communication, and pleasure delivered to your inbox every week.
            </p>

            {/* Form or Success Message */}
            {isSubscribed ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-10 max-w-md mx-auto animate-fade-in-up">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                  <Check className="w-8 h-8 text-white stroke-[3px]" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">You're In!</h3>
                <p className="text-slate-600 font-medium">Check your inbox for your free guide and welcome email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto animate-fade-in-up">
                <div className="flex flex-col gap-4">
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/30 transition-all text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-premium-primary w-full text-lg py-5 shadow-xl shadow-primary/20"
                  >
                    {isLoading ? 'Joining...' : 'Get Your Free Guide'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <p className="text-sm font-bold text-slate-400 mt-6 tracking-tight">
                  No spam, ever. Unsubscribe anytime in one click.
                </p>
              </form>
            )}

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-50">
              {[
                { label: "Weekly expert tips", icon: Check },
                { label: "Free intimacy guide", icon: Check },
                { label: "Exclusive offers", icon: Check }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-3 h-3 text-emerald-500 stroke-[3px]" />
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{benefit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterModern;

