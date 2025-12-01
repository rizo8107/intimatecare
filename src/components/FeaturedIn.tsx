const FeaturedIn = () => {
  const logos = [
    'BBC.jpg',
    'Deccan.jpg',
    'Huf.jpg',
    'INDIA (1).jpg',
    'INDIA (2).jpg',
    'INDIA (3).jpg',
    'Indian ex.jpg',
    'Mint.jpg',
    'Vogue.jpg'
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="container-custom">
        <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8 font-medium">
          As Featured In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="w-24 md:w-32 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <img
                src={`/Featured/${logo}`}
                alt={logo.replace(/\.[^/.]+$/, '')}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
