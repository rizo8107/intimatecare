
import { Link } from 'react-router-dom';

const AboutPreview = () => {
  return (
    <section className="section-padding bg-sand-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Intimacy Coach" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          
          <div>
            <h2 className="section-subtitle">About Me</h2>
            <h3 className="section-title">Hey, I'm Khushboo Bist!</h3>
            <p className="mb-4 text-lg">
              A certified sex educator, intimacy coach and your go-to guide for all things 
              pleasure, connection, and self-discovery.
            </p>
            <p className="mb-6 text-muted-foreground">
              Sex is one of the most natural yet most misunderstood aspects of our lives. 
              We desire it, we fear it, we suppress it—but do we truly understand it? I grew up 
              seeing how misinformation, shame, and silence around sexuality create confusion, 
              fear, and unfulfilled relationships.
            </p>
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h4 className="font-serif text-lg mb-2">Credentials:</h4>
              <ul className="list-disc list-inside text-muted-foreground">
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
