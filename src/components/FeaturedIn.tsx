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
    <section className="py-8 md:py-12 bg-white">
      <div className="container-custom">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8 w-full max-w-2xl">
            <div className="h-[1px] flex-grow bg-slate-100" />
            <p className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
              Recognized & Trusted By
            </p>
            <div className="h-[1px] flex-grow bg-slate-100" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 opacity-70">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="w-[80px] sm:w-[100px] md:w-[120px] transition-all duration-500 grayscale hover:grayscale-0 hover:scale-110 hover:opacity-100 cursor-default flex items-center justify-center"
              >
                <img
                  src={`/Featured/${logo}`}
                  alt={logo.replace(/\.[^/.]+$/, '')}
                  className="w-full h-auto object-contain max-h-[30px] md:max-h-[40px]"
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

