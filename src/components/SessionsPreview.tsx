
import { Link } from 'react-router-dom';

const SessionsPreview = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Book a One-on-One Audio Session with Me!</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Struggling with something and need to talk? Let's figure it out together in a judgment-free space.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Session */}
          <div className="border border-sand-200 rounded-lg p-8 bg-sand-50 hover:shadow-md transition-shadow">
            <h3 className="font-serif text-xl mb-4">Free First Session</h3>
            <p className="text-3xl font-serif text-blush-600 mb-4">₹0</p>
            <ul className="space-y-2 mb-6 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                1 hour of open, non-judgmental audio conversation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Discuss any topic you're comfortable with
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Get to know my coaching approach
              </li>
            </ul>
            <Link to="/sessions" className="btn-primary block text-center">
              Book Free Session
            </Link>
          </div>
          
          {/* Regular Session */}
          <div className="border border-blush-200 rounded-lg p-8 bg-white shadow-md relative">
            <div className="absolute top-0 right-0 bg-blush-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
              Popular
            </div>
            <h3 className="font-serif text-xl mb-4">30-Minute Session</h3>
            <p className="text-3xl font-serif text-blush-600 mb-4">₹1,500</p>
            <ul className="space-y-2 mb-6 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                30 minutes of focused discussion
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Personalized advice and guidance
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Follow-up resource recommendations
              </li>
            </ul>
            <Link to="/sessions" className="btn-primary block text-center">
              Book Session
            </Link>
          </div>
          
          {/* Student Session */}
          <div className="border border-sand-200 rounded-lg p-8 bg-sand-50 hover:shadow-md transition-shadow">
            <h3 className="font-serif text-xl mb-4">Student Special</h3>
            <p className="text-3xl font-serif text-blush-600 mb-4">₹500</p>
            <ul className="space-y-2 mb-6 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                30 minutes of focused guidance
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Help with porn addiction recovery
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Breaking unhealthy patterns
              </li>
            </ul>
            <Link to="/sessions" className="btn-primary block text-center">
              Book Student Session
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-2">No shame. No judgment. Just real conversations and support.</p>
          <Link to="/sessions" className="text-blush-600 font-medium hover:text-blush-800 transition-colors">
            View All Session Details →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SessionsPreview;
