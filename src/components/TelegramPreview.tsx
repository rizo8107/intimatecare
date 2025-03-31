
import { Link } from 'react-router-dom';

const TelegramPreview = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-blush-50 to-sand-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-subtitle">Join Our Community</h2>
            <h3 className="section-title">My Exclusive Product – Intimate Talks</h3>
            <p className="text-lg mb-4">
              Join the most intimate space for open, honest conversations about sex, pleasure, and relationships!
            </p>
            <p className="mb-6 text-muted-foreground">
              A safe, inclusive, and judgment-free space for open and honest discussions about relationships, 
              love, and intimacy. Whether you're seeking advice, looking to share experiences, or simply 
              want to connect with like-minded individuals, you're in the right place.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h4 className="font-serif text-xl mb-4">Why Join?</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-blush-500 mr-2">•</span>
                  Learn what no one taught you about intimacy
                </li>
                <li className="flex items-start">
                  <span className="text-blush-500 mr-2">•</span>
                  Share your experiences and get guidance
                </li>
                <li className="flex items-start">
                  <span className="text-blush-500 mr-2">•</span>
                  Engage in enriching conversations and activities
                </li>
                <li className="flex items-start">
                  <span className="text-blush-500 mr-2">•</span>
                  Special discounts on guides and resources
                </li>
              </ul>
            </div>
            
            <Link to="/intimatetalks" className="btn-primary inline-block">
              Become a Member Today
            </Link>
          </div>
          
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Intimate Talks Telegram Group" 
              className="rounded-lg shadow-lg max-w-md w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramPreview;
