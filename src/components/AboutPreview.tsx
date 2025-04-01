import { Link } from 'react-router-dom';

const AboutPreview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-sand-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="mb-6 lg:mb-0">
            <img 
              src="/about.jpg" 
              alt="Intimacy Coach" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-blush-600 mb-2 md:mb-3">About Me</h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 md:mb-5">Hey, I'm Khushboo Bist!</h3>
            <p className="mb-4 text-base md:text-lg">
              A certified sex educator, intimacy coach and your go-to guide for all things 
              pleasure, connection, and self-discovery.
            </p>
            <p className="mb-5 md:mb-6 text-muted-foreground text-sm md:text-base">
              Sex is one of the most natural yet most misunderstood aspects of our lives. 
              We desire it, we fear it, we suppress it—but do we truly understand it? I grew up 
              seeing how misinformation, shame, and silence around sexuality create confusion, 
              fear, and unfulfilled relationships.
            </p>
            <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm mb-5 md:mb-6">
              <h4 className="font-serif text-base md:text-lg mb-2">Credentials:</h4>
              <ul className="list-disc list-inside text-muted-foreground text-sm md:text-base">
                <li>Certified in Sex and Sexual Health – Modern Sex Therapy Institute, USA</li>
                <li>Pursuing a Master's in Psychology to better understand human connection and intimacy</li>
              </ul>
            </div>
            <Link to="/about" className="btn-primary inline-block">
              Explore & Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
