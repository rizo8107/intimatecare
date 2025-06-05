import React, { useState, useEffect } from 'react';
import { Lightbulb, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import StickyBar from '../components/StickyBar';
import UpsellPopup from '../components/UpsellPopup';

const IntimateTalks = () => {
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [showUpsellPopup, setShowUpsellPopup] = useState(false);

  // Example: Show popup after a delay or on specific user action
  // useEffect(() => {
  //   const hasSeenPopup = localStorage.getItem('hasSeenIntimateTalksPopup');
  //   if (!hasSeenPopup) {
  //     const timer = setTimeout(() => {
  //       setShowUpsellPopup(true);
  //       localStorage.setItem('hasSeenIntimateTalksPopup', 'true');
  //     }, 7000); // Show popup after 7 seconds if not seen before
  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  const handleCloseStickyBar = () => {
    setShowStickyBar(false);
  };

  const handleOpenUpsellPopup = () => {
    setShowUpsellPopup(true);
  };

  const handleCloseUpsellPopup = () => {
    setShowUpsellPopup(false);
  };
  return (
    <div className="bg-[#F9E5FF]">
      {/* Button to test Upsell Popup - you can place this strategically or remove it */}
      {/* <button 
        onClick={handleOpenUpsellPopup}
        className="fixed top-1/2 left-2 bg-purple-600 text-white p-3 rounded-lg shadow-lg z-[200] transform -translate-y-1/2 text-xs"
        title="Test Upsell Popup"
      >
        Show<br/>Upsell
      </button> */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            {/* Section 1: Product Card */}
            <div className="p-6 md:p-8">
              <div className="bg-[#FAFAFA]">
                <div className="w-full max-w-sm mx-auto mb-6">
                  <div className="relative">
                    <div className="bg-[#F9E5FF] rounded-xl p-4 mb-4 text-center">
                      <p className="text-[#5D4777] font-medium uppercase text-sm tracking-wide">MY EXCLUSIVE PRODUCT</p>
                      <p className="text-[#5D4777] font-medium uppercase text-sm tracking-wide">1 Month Subscription</p>
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
                        <p className="text-[#5D4777] font-medium uppercase text-sm tracking-wide">1 Month Subscription</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <p className="text-center text-gray-700">
                      Join our growing community of over 100+ members who are on a journey to better intimacy and relationships.
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
            </div>

            {/* Section 2: Video */}
            <div className="p-6 md:p-8">
              <div className="max-w-3xl mx-auto">
                <div className="md:sticky md:top-28"> 
                  <div style={{paddingTop:'56.25%', position:'relative', width: '100%', height: 0}}>
                    <iframe 
                      src="https://app.tpstreams.com/embed/6u448b/7f2CDfh8sRJ/?access_token=2ba9a940-67be-4207-a0a6-73a130ac6228" 
                      style={{border:0, maxWidth:'100%', position:'absolute', top:0, left:0, height:'100%', width:'100%'}} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen={true} 
                      frameBorder="0" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Enhanced Textual Content */}
            <div className="space-y-12 md:space-y-16">
              {/* Block 1: Confused About Sex? */}
              <div className="py-8 px-6 md:px-8">
                <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[#5D4777] mb-6 text-center md:text-left">
                  Confused About Sex? <span className="block md:inline">You're Not Alone.</span>
                </h1>
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  For too long, silence and shame have surrounded these topics. But your curiosity is valid. Your pleasure is valid. It's time for a space that truly understands.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  That's why I created <span className="font-bold text-[#D9A6FF]">Intimate Talks</span> – a <span className="font-semibold text-gray-800">safe and bold sex-ed community</span> where you can explore everything you've ever wondered about sex, intimacy, and pleasure.
                </p>
              </div>

              {/* Block 2: This is Where Real Sex Ed Happens. */}
              <div className="py-10 px-6 md:px-8 bg-gradient-to-br from-[#F9E5FF]/50 to-[#E6D9FF]/30 rounded-2xl shadow-sm">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#5D4777] mb-10 text-center">
                  This is Where Real Sex Ed Happens.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center">
                  <div className="flex flex-col items-center p-4">
                    <Lightbulb className="w-12 h-12 text-[#D9A6FF] mb-3" strokeWidth={1.5} />
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">Expert Answers</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Get clear, honest information from those who know.</p>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <Users className="w-12 h-12 text-[#D9A6FF] mb-3" strokeWidth={1.5} />
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">Supportive Community</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Connect with others who understand and share.</p>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <Sparkles className="w-12 h-12 text-[#D9A6FF] mb-3" strokeWidth={1.5} />
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">Daily Reconnection</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Rediscover your sensual self with gentle nudges.</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed text-center max-w-3xl mx-auto">
                  Without judgment. Here, you'll find <span className="font-semibold text-gray-800">real answers from experts</span>, connect with <span className="font-semibold text-gray-800">like-minded people</span> who just get it, and receive daily nudges to reconnect with your sensual self.
                </p>
                <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                  We talk about stuff no one really talks about—from <span className="font-medium">pleasure</span> to <span className="font-medium">consent</span> to <span className="font-medium">emotional intimacy</span>—with honesty, fun, and a little spice. You will learn, laugh, and unlearn all the guilt.
                </p>
              </div>

              {/* Block 3: More Than Just Talk */}
              <div className="py-8 px-6 md:px-8">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#5D4777] mb-6 text-center md:text-left">
                  More Than Just Talk: <span className="block md:inline">It's an Experience</span>
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We make <span className="font-semibold text-gray-800">fun and sexy conversations</span> that make taboo topics feel natural and playful. Plus, we've got games to bust myths and steamy chats to spice things up.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  No shame, no silence—just <span className="font-medium">knowledge, connection, and a whole lot of fun</span>. But Intimate Talks is more than just a group; it's a community with clear guidelines to ensure respect, safety, and comfort for everyone.
                </p>
                
                <div className="mt-8 mb-10 p-6 md:p-8 bg-[#F9F9FB] rounded-xl border border-[#E0E0E0] shadow-md">
                  <h3 className="text-xl font-serif font-semibold text-gray-800 mb-6 text-center">Inside Intimate Talks, You Will:</h3>
                  <ul className="space-y-4">
                    {[{
                        icon: <CheckCircle2 className="text-[#D9A6FF] mr-3 mt-0.5 flex-shrink-0 w-6 h-6" strokeWidth={1.5} />,
                        text: "Get answers to your most intimate questions."
                      },{
                        icon: <CheckCircle2 className="text-[#D9A6FF] mr-3 mt-0.5 flex-shrink-0 w-6 h-6" strokeWidth={1.5} />,
                        text: "Learn from others' experiences and insights."
                      },{
                        icon: <CheckCircle2 className="text-[#D9A6FF] mr-3 mt-0.5 flex-shrink-0 w-6 h-6" strokeWidth={1.5} />,
                        text: "Access exclusive content and resources."
                      },{
                        icon: <CheckCircle2 className="text-[#D9A6FF] mr-3 mt-0.5 flex-shrink-0 w-6 h-6" strokeWidth={1.5} />,
                        text: "Be part of a supportive, non-judgmental community."
                      },{
                        icon: <CheckCircle2 className="text-[#D9A6FF] mr-3 mt-0.5 flex-shrink-0 w-6 h-6" strokeWidth={1.5} />,
                        text: "Participate in regular Q&A sessions with me (Khushboo)."
                      }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-gray-700 text-base md:text-lg">
                        {item.icon}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
                {/* New Join Now Button 1 */}
                <div className="mt-12 mb-8 text-center">
                  <a
                    href="https://payments.cashfree.com/forms/intimatetalks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full max-w-sm bg-gradient-to-r from-[#D9A6FF] to-[#C88DF7] hover:from-[#C88DF7] hover:to-[#D9A6FF] text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
                  >
                    Join Intimate Talks Now
                  </a>
                </div>
              
              {/* Block 4: Ready to Get Confident? (CTA) */}
              <div className="py-10 px-6 md:px-10 bg-gradient-to-r from-[#D9A6FF] to-[#C88DF7] rounded-2xl text-center shadow-xl my-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                  Ready to Get Confident?
                </h2>
                <p className="text-white/90 text-lg mb-4 leading-relaxed max-w-2xl mx-auto">
                  If you're eager to learn, explore, or simply feel seen, this is your space. Get confident in bed and beyond. Join Intimate Talks.
                </p>
                <p className="text-white text-xl font-medium mb-8 max-w-2xl mx-auto">
                  So many people are already learning, exploring, and owning their pleasure stories.
                </p>
                <p className="text-white font-bold text-2xl">
                  See you there!
                </p>
                {/* New Join Now Button 2 */}
                <div className="mt-10">
                  <a
                    href="https://payments.cashfree.com/forms/intimatetalks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white hover:bg-gray-100 text-[#5D4777] font-bold py-4 px-10 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 text-lg tracking-wide"
                  >
                    Yes, I'm Ready to Join!
                  </a>
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
      {showStickyBar && (
        <StickyBar
          message="✨ Limited Time: Join Intimate Talks "
          ctaText="Join Now"
          ctaLink="https://payments.cashfree.com/forms/intimatetalks" // Should ideally lead to a page or section explaining the guide then to payment
          onClose={handleCloseStickyBar}
        />
      )}

      <UpsellPopup
        isOpen={showUpsellPopup}
        onClose={handleCloseUpsellPopup}
        title="Unlock Deeper Connection!"
        description="Upgrade to our 3-Month Intimate Talks PLUS for exclusive workshops & personalized Q&A sessions. Save 25% today!"
        originalPrice="₹1998"
        discountedPrice="₹999"
        ctaText="Upgrade & Save 25%"
        ctaLink="https://payments.cashfree.com/forms/intimatetalksplus" // Example link for an upgraded product
        productImage="/telegram.png" // Replace with an actual image URL if available in public/
      />
    </div>
  );
};

export default IntimateTalks;
