import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { Mail, Send, Heart, Lock } from 'lucide-react';
import WhatsAppChannel from './WhatsAppChannel';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Sending newsletter subscription data...');
      
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/kb_newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          source: 'website_newsletter',
          subscriptionDate: new Date().toISOString(),
        }),
      });
      
      const data = await response.json().catch(() => null);
      console.log('Webhook response:', response.status, data);
      
      if (response.ok) {
        setEmail('');
        setName('');
        toast({
          title: "Success!",
          description: "You've successfully subscribed to our newsletter.",
        });
      } else {
        console.error('Newsletter subscription failed:', response.status, data);
        throw new Error(`Failed to subscribe: ${response.status}`);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#FFE5EC]">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-8">
          <div className="text-[#FF7A9A] text-sm font-medium mb-2">STAY CONNECTED</div>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Stay updated with expert tips, exclusive content, and intimate care advice through your preferred channel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Newsletter Subscription */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#FFE5EC] rounded-full flex items-center justify-center">
                <Mail size={28} className="text-[#FF7A9A]" />
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif font-medium text-gray-800 mb-3">
                Newsletter Subscription
              </h3>
              <p className="text-gray-700">
                Get intimacy & pleasure hacks delivered straight to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button 
                  type="submit"
                  className="flex items-center justify-center py-3 px-8 bg-[#FF7A9A] text-white rounded-full hover:bg-[#FF5A8A] transition-colors font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    "Subscribing..."
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Subscribe Now
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-center text-gray-600 text-sm mt-4">
                <Lock size={14} className="mr-2" />
                <p>
                  We respect your privacy and will never share your information.
                </p>
              </div>
            </form>
          </div>
          
          {/* WhatsApp Channel */}
          <WhatsAppChannel />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
