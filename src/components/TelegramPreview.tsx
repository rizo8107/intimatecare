import { Link } from 'react-router-dom';

const TelegramPreview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-r from-blush-50 to-sand-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-blush-600 mb-2 md:mb-3">Join Our Community</h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-3 md:mb-4">My Exclusive Product – Intimate Talks</h3>
            <p className="text-base md:text-lg mb-3 md:mb-4">
              Join the most intimate space for open, honest conversations about sex, pleasure, and relationships!
            </p>
            <p className="mb-5 md:mb-6 text-muted-foreground text-sm md:text-base">
              A safe, inclusive, and judgment-free space for open and honest discussions about relationships, 
              love, and intimacy. Whether you're seeking advice, looking to share experiences, or simply 
              want to connect with like-minded individuals, you're in the right place.
            </p>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6 md:mb-8">
              <h4 className="font-serif text-lg md:text-xl mb-3 md:mb-4">Why Join?</h4>
              <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
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
          
          <div className="flex justify-center mt-6 lg:mt-0">
            <img 
              src="/telegram.png"
              alt="Intimate Talks Telegram Group" 
              className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramPreview;
