
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const IntimateTalks = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success!",
        description: "Check your email for the Telegram group invitation link.",
      });
      
      // Reset the form
      setEmail('');
      setName('');
    }, 1000);
  };

  return (
    <div>
      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              Intimate Talks
            </h1>
            <p className="text-xl text-blush-600 max-w-2xl mx-auto">
              Your Safe Space for Real Conversations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <p className="text-lg mb-6">
                Join the most intimate space for open, honest conversations about sex, pleasure, and relationships!
              </p>
              <p className="mb-6 text-muted-foreground">
                A safe, inclusive, and judgment-free space for open and honest discussions about relationships, 
                love, and intimacy. Whether you're seeking advice, looking to share experiences, or simply 
                want to connect with like-minded individuals, you're in the right place.
              </p>
              <p className="mb-8 text-muted-foreground">
                Let's create a supportive and respectful environment where we can explore the depths of 
                intimacy together.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="font-serif text-xl mb-4">Why Join Our Telegram Group?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-blush-500 mr-2">•</span>
                    Learn what no one taught you about intimacy
                  </li>
                  <li className="flex items-start">
                    <span className="text-blush-500 mr-2">•</span>
                    Share your experiences and get guidance from experts and community members
                  </li>
                  <li className="flex items-start">
                    <span className="text-blush-500 mr-2">•</span>
                    Engage in enriching conversations, activities, and challenges designed for personal growth
                  </li>
                  <li className="flex items-start">
                    <span className="text-blush-500 mr-2">•</span>
                    Gain confidence in your pleasure and relationships
                  </li>
                  <li className="flex items-start">
                    <span className="text-blush-500 mr-2">•</span>
                    Get access to exclusive content and expert insights
                  </li>
                  <li className="flex items-start">
                    <span className="text-blush-500 mr-2">•</span>
                    Special Discounts – Community members enjoy exclusive discounts on my personal guides and resources!
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="font-serif text-2xl mb-6 text-center">Join The Intimate Talks Today!</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                  
                  <div className="text-center">
                    <button 
                      type="submit"
                      className="btn-primary w-full"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Join Now"}
                    </button>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By joining, you agree to our community guidelines. We'll send you the Telegram 
                    group invitation link via email. Your privacy is important to us.
                  </p>
                </form>
                
                <div className="mt-8 pt-6 border-t border-sand-100">
                  <h3 className="font-serif text-lg mb-4 text-center">What Members Are Saying</h3>
                  
                  <div className="bg-sand-50 p-4 rounded-lg mb-4">
                    <p className="italic text-muted-foreground mb-2">
                      "This group has helped me understand so much about my own body and desires. The 
                      conversations are enlightening and judgment-free. So grateful I found this space!"
                    </p>
                    <p className="text-right text-sm font-medium">— Priya S.</p>
                  </div>
                  
                  <div className="bg-sand-50 p-4 rounded-lg">
                    <p className="italic text-muted-foreground mb-2">
                      "I've never felt comfortable discussing intimacy issues before joining this group. 
                      Now I have a place where I can ask questions and get honest, helpful answers."
                    </p>
                    <p className="text-right text-sm font-medium">— Rahul K.</p>
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

export default IntimateTalks;
