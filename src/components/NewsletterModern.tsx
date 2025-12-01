import { useState } from 'react';
import { Mail, Gift, ArrowRight, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NewsletterModern = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/kb_newsletter', {
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
    <section className="py-16 md:py-24 bg-[#FFF7EC] relative overflow-hidden">

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF7A9A] mb-8">
            <Gift className="w-8 h-8 text-white" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
            Get Weekly Intimacy Tips
            <br />
            <span className="text-[#FF7A9A]">
              + Free Guide
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Join 10,000+ subscribers getting practical tips on intimacy, communication, 
            and pleasure delivered to your inbox every week.
          </p>

          {/* Form or Success Message */}
          {isSubscribed ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You're In!</h3>
              <p className="text-gray-600">Check your inbox for your free guide and welcome email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A84] focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group inline-flex items-center justify-center gap-2 bg-[#FF7A9A] text-white font-semibold px-6 py-4 rounded-full hover:bg-[#FF5A84] hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? 'Joining...' : 'Get Free Guide'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Weekly tips</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Free intimacy guide</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Exclusive offers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterModern;
