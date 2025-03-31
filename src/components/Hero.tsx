
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-sand-50 to-white py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4 leading-tight">
              Your Go-To Sex Educator & Intimacy Coach
            </h1>
            <p className="text-xl md:text-2xl text-blush-600 mb-6 font-serif italic">
              Let's Make Pleasure a Priority!
            </p>
            <p className="text-muted-foreground mb-8 text-lg">
              Sex education—something we all need, yet something we barely talk about. Why? 
              We were born from it. We experience it. We crave it. But when it comes to understanding 
              pleasure, intimacy, and connection, we hesitate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sessions" className="btn-primary text-center">
                Let's Start
              </Link>
              <Link to="/about" className="btn-accent text-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-blush-200 opacity-30 blur"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Sex Educator and Intimacy Coach" 
                className="rounded-full w-full max-w-md h-auto relative z-10 border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
