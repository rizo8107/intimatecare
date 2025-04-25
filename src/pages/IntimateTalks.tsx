import React from 'react';

const IntimateTalks = () => {
  return (
    <div className="bg-[#F9E5FF]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image and CTA - Appears first on mobile */}
              <div className="order-first md:order-last p-6 md:p-8 bg-[#FAFAFA]">
                <div className="w-full max-w-sm mx-auto mb-6">
                  <div className="relative">
                    <div className="bg-[#F9E5FF] rounded-xl p-4 mb-4 text-center">
                      <p className="text-[#5D4777] font-medium uppercase text-sm tracking-wide">MY EXCLUSIVE PRODUCT</p>
                    </div>
                    <img 
                      src="/telegram.png" 
                      alt="Intimate Talks Telegram Group" 
                      className="w-full h-auto rounded-2xl shadow-sm"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/telegram-placeholder.png";
                        target.onerror = null;
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#F0F0F5]">
                  <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                    <h2 className="font-serif text-xl text-center mb-4">Join Intimate Talks Today!</h2>
                    <div className="flex justify-center my-4">
                      <div className="bg-[#F9E5FF] px-6 py-3 rounded-full">
                        <span className="text-sm line-through text-gray-500 mr-2">₹1999</span>
                        <span className="text-2xl font-serif text-[#D9A6FF] font-medium">₹999</span>
                      </div>
                    </div>
                    <p className="text-center text-gray-700 text-sm">
                      One-time payment • Lifetime access • No recurring fees
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-center text-gray-700">
                      Join our growing community of over 500 members who are on a journey to better intimacy and relationships.
                    </p>
                    
                    <div className="pt-4">
                      <a 
                        href="https://payments.cashfree.com/forms/intimatetalks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#D9A6FF] hover:bg-[#C88DF7] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                      >
                        Join Now
                      </a>
                    </div>
                    
                    <p className="text-xs text-center text-gray-600">
                      After payment, you'll receive an invite link to join our private Telegram group.
                      Your privacy is our priority.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content - Appears second on mobile */}
              <div className="order-last md:order-first p-6 md:p-8 flex flex-col md:border-r border-[#F0F0F5]">
                {/* Title and Intro */}
                <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                  <div className="text-[#D9A6FF] text-sm font-medium mb-1">Join Our Community</div>
                  <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                    My Exclusive Product – Intimate Talks
                  </h1>
                  <p className="text-gray-700">
                    A private Telegram group where we discuss everything related to intimacy, relationships, and sex.
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                  <h2 className="text-xl font-serif font-medium text-gray-800 mb-3">What is Intimate Talks?</h2>
                  <p className="text-gray-700 mb-4">
                    Intimate Talks is a safe, judgment-free space where we can openly discuss topics that are often 
                    considered taboo in our society. From sexual wellness to relationship dynamics, we cover it all.
                  </p>
                  <p className="text-gray-700">
                    This is not just another Telegram group – it's a community of like-minded individuals who want to 
                    learn, share, and grow together in their journey of sexual wellness and relationship satisfaction.
                  </p>
                </div>

                {/* Why Join Section */}
                <div>
                  <h2 className="text-xl font-serif font-medium text-gray-800 mb-3">Why Join Intimate Talks?</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-[#D9A6FF] mr-2">✓</span>
                      <span>Get answers to your most intimate questions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#D9A6FF] mr-2">✓</span>
                      <span>Learn from others' experiences and insights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#D9A6FF] mr-2">✓</span>
                      <span>Access exclusive content and resources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#D9A6FF] mr-2">✓</span>
                      <span>Be part of a supportive community</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#D9A6FF] mr-2">✓</span>
                      <span>Participate in regular Q&A sessions with me</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
                What Our Members Say
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "This group has been a game-changer for my relationship. The open discussions and advice have helped me communicate better with my partner."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Anonymous Member</p>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "I've learned so much about myself and my needs. The community is supportive and non-judgmental, which makes it easy to open up."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Happy Member</p>
                </div>
                
                <div className="bg-[#F9F9FB] p-5 rounded-xl">
                  <p className="italic text-gray-700 mb-3">
                    "The regular Q&A sessions with Khushboo are invaluable. She provides thoughtful, expert advice that has really improved my intimate life."
                  </p>
                  <p className="text-right text-sm font-medium text-gray-800">— Grateful Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntimateTalks;
