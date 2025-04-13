import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Sessions = () => {
  return (
    <div>
      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              Book a One-on-One Audio Session
            </h1>
            <p className="text-xl text-blush-600 max-w-2xl mx-auto">
              Struggling with something and need to talk? Let's figure it out together.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8 text-center">
              Sometimes, just talking about a problem can bring clarity. In our session, we'll explore 
              your concerns, see if we can find solutions, and if not—I'll simply listen, talk it out 
              with you, and offer suggestions. If needed, I'll also share my expertise in sex and 
              intimacy to help you navigate your challenges. Because sometimes, being heard is enough.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Free Session */}
              <div className="border border-sand-200 rounded-lg p-8 bg-white hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl mb-4">First Session</h3>
                <p className="text-3xl font-serif text-blush-600 mb-4">₹599</p>
                <ul className="space-y-2 mb-6 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    1 hour of open, non-judgmental Audio conversation
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
              </div>
              
              {/* Regular Session */}
              <div className="border border-blush-200 rounded-lg p-8 bg-white shadow-md relative">
                <div className="absolute top-0 right-0 bg-blush-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Popular
                </div>
                <h3 className="font-serif text-xl mb-4">30-Minute Session</h3>
                <p className="text-3xl font-serif text-blush-600 mb-4">₹499</p>
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
              </div>
              
              {/* Student Session */}
              <div className="border border-sand-200 rounded-lg p-8 bg-white hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl mb-4">Student Special</h3>
                <p className="text-3xl font-serif text-blush-600 mb-4">₹399</p>
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
              </div>
            </div>
            
            {/* Booking Link */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-serif text-2xl mb-6 text-center">Book Your Session Now</h2>
              
              <div className="space-y-6">
                <p className="text-center text-lg">
                  Ready to book your session? Click below to select an available time slot.
                </p>
                
                <div className="flex justify-center">
                  <a 
                    href="https://topmate.io/intimatecare/1102760" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary px-12 py-4 text-lg inline-block"
                  >
                    Book on Topmate
                  </a>
                </div>
                
                <p className="text-sm text-center text-muted-foreground">
                  Your session will be held via audio call. You'll be able to select your preferred time slot on the booking page.
                  <br />
                  All sessions are completely confidential and your privacy is our top priority.
                </p>
                
                <div className="mt-6 bg-blush-50 p-4 rounded-lg">
                  <p className="text-center text-muted-foreground">
                    <span className="font-medium">Current Special Offer:</span> Book your first 60-minute session for only ₹499 (Regular price: ₹2,999)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sessions;
