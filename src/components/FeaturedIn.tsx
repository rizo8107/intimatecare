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
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-12 w-full">
            <div className="h-[1px] flex-grow bg-slate-100" />
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
              Recognized & Trusted By
            </p>
            <div className="h-[1px] flex-grow bg-slate-100" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-10 items-center justify-items-center opacity-70">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="w-full max-w-[120px] transition-all duration-500 grayscale hover:grayscale-0 hover:scale-110 hover:opacity-100 cursor-default"
              >
                <img
                  src={`/Featured/${logo}`}
                  alt={logo.replace(/\.[^/.]+$/, '')}
                  className="w-full h-auto object-contain max-h-[40px]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;

