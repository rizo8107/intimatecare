const About = () => {
  return (
    <div className="bg-[#FFE5EC]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column - Image */}
              <div className="p-6 md:p-8 flex flex-col justify-center items-center md:border-r border-[#F0F0F5]">
                <div className="w-full max-w-sm mx-auto">
                  <div className="relative">
                    <div className="bg-[#FFE5EC] rounded-xl p-4 mb-4 text-center">
                      <p className="text-[#FF7A9A] font-medium uppercase text-sm tracking-wide">SEX EDUCATOR & COACH</p>
                    </div>
                    <img 
                      src="/about.jpg" 
                      alt="Khushboo Bist" 
                      className="w-full h-auto rounded-2xl shadow-sm"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/400x500";
                        target.onerror = null;
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="p-6 md:p-8 bg-[#FAFAFA]">
                {/* Title and Intro */}
                <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                  <div className="text-[#FF7A9A] text-sm font-medium mb-1">About Me</div>
                  <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                    Hey, I'm Khushboo Bist!
                  </h1>
                  <p className="text-gray-700">
                    A certified sex educator, intimacy coach and your go-to guide for all things 
                    pleasure, connection, and self-discovery.
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                  <h2 className="text-xl font-serif font-medium text-gray-800 mb-3">My Story</h2>
                  <p className="text-gray-700 mb-4">
                    Sex is one of the most natural yet most misunderstood aspects of our lives. 
                    We desire it, we fear it, we suppress it—but do we truly understand it? I grew up 
                    seeing how misinformation, shame, and silence around sexuality create confusion, 
                    fear, and unfulfilled relationships.
                  </p>
                  <p className="text-gray-700">
                    And I decided to change that—to create a space where open, honest conversations 
                    about sex and relationships are normal, not taboo. A space where individuals and 
                    couples can navigate their sensuality with confidence, knowledge, and pleasure—without 
                    guilt or shame.
                  </p>
                </div>

                {/* CTA */}
                <div>
                  <a 
                    href="/sessions"
                    className="block w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                  >
                    Book a Session
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
                My Philosophy
              </h2>
              
              <div className="text-gray-700 space-y-4">
                <p>
                  I believe that understanding our bodies, desires, and boundaries is essential 
                  for living a fulfilled life. Sex education isn't just about the mechanics—it's 
                  about connection, communication, consent, and pleasure. It's about embracing your 
                  authentic self and fostering deeper relationships.
                </p>
                <p>
                  Through my work, I aim to break down the stigma and shame surrounding sexuality, 
                  providing a safe, judgment-free environment for learning and exploration. 
                  Whether you're seeking to enhance intimacy in your relationship, overcome personal 
                  challenges, or simply expand your knowledge, I'm here to support your journey.
                </p>
              </div>
            </div>
          </div>

          {/* Credentials Section */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
                Credentials
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-[#FFE5EC] text-[#FF7A9A] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <p className="text-gray-700">Certified in Sex and Sexual Health – Modern Sex Therapy Institute, USA</p>
                  </div>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-[#FFE5EC] text-[#FF7A9A] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <p className="text-gray-700">Pursuing a Master's in Psychology to better understand human connection and intimacy</p>
                  </div>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-[#FFE5EC] text-[#FF7A9A] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <p className="text-gray-700">Trained in trauma-informed approaches to sexual education</p>
                  </div>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-[#FFE5EC] text-[#FF7A9A] w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <p className="text-gray-700">Regular participant in workshops and conferences on sexual health and education</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Approach Section */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
                My Approach
              </h2>
              
              <div className="text-gray-700 space-y-4">
                <p>
                  My approach is rooted in empathy, inclusivity, and evidence-based information. 
                  I create a space where all questions are valid, all experiences are honored, 
                  and all journeys are respected. Whether through one-on-one sessions, group workshops, 
                  or digital resources, I provide practical guidance tailored to your unique needs.
                </p>
                <p>
                  It's time to unlearn the shame, embrace your desires, and take charge of your pleasure.
                </p>
              </div>
              
              <div className="mt-8 bg-[#FFE5EC] p-6 rounded-xl">
                <h3 className="font-serif text-xl font-medium text-gray-800 mb-4 text-center">Ready to Transform Your Relationship with Pleasure?</h3>
                <p className="text-gray-700 text-center mb-6">
                  Whether you're seeking personal guidance, looking to join a supportive community, 
                  or interested in educational resources, I'm here to help you navigate your journey 
                  to better intimacy and pleasure.
                </p>
                <div className="flex justify-center">
                  <a 
                    href="/sessions"
                    className="inline-block bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-8 rounded-full text-center font-medium transition-colors"
                  >
                    Book a Session Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
