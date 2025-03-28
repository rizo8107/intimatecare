
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail('');
      setName('');
      toast({
        title: "Success!",
        description: "You've successfully subscribed to our newsletter.",
      });
    }, 1000);
  };

  return (
    <section className="section-padding bg-sand-50">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="section-title">Sign Up for Our Newsletter!</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Want more expert tips, exclusive content, and spicy insights straight to your inbox?
            Subscribe to our newsletter and be the first to receive intimacy & pleasure hacks!
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-sand-200 focus:outline-none focus:ring-2 focus:ring-blush-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                type="submit"
                className="btn-primary px-8"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe Now"}
              </button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
