import React, { useState, useEffect } from 'react';
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
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image and CTA - Appears first on mobile */}
              <div className="order-first md:order-last p-6 md:p-8 bg-[#FAFAFA]">
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
  {/* Original Price */}
  <span className="text-sm line-through text-gray-500 mr-2">
    ₹1999
  </span>

  {/* Discounted Price */}
  <span className="text-2xl font-serif text-[#D9A6FF] font-medium">
    ₹999
  </span>

  {/* Subscription Description */}
  <p className="text-[#5D4777] font-medium uppercase text-sm tracking-wide">
    1 Month Subscription
  </p>
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
              
              {/* Content - Appears second on mobile */}
              <div className="order-last md:order-first p-6 md:p-8 flex flex-col md:border-r border-[#F0F0F5]">
                {/* Title and Intro */}
                <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                  {/* Suggestion for a small, engaging icon or badge here related to 'discovery' or 'community' */}
                  {/* <span className="inline-block bg-[#D9A6FF] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">Unlock Your Curiosity</span> */}
                  <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-4">
                    Confused About Sex? You're Not Alone.
                  </h1>
                  {/* Suggestion: Add a tasteful, abstract image or illustration here representing curiosity, openness, or connection */} 
                  {/* <img src="/placeholder-images/intimate-talks-hero-element.svg" alt="Open discussion on intimacy" className="w-full h-auto rounded-lg mb-4 shadow-sm" /> */}
                  <p className="text-gray-700 text-lg mb-3">
                    For too long, silence and shame have surrounded these topics. But your curiosity is valid. Your pleasure is valid. It's time for a space that truly understands.
                  </p>
                  <p className="text-gray-700 mb-1">
                    That's why I created <span className="font-semibold text-[#5D4777]">Intimate Talks</span> – a safe and bold sex-ed community where you can explore everything you've ever wondered about sex, intimacy, and pleasure.
                  </p>
                </div>

                {/* Description & How It Works */}
                <div className="mb-6 pb-6 border-b border-[#F0F0F5]">
                  <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-800 mb-4">This is Where Real Sex Ed Happens.</h2>
                  {/* Suggestion: Consider a row of 3 simple icons here representing: 'Expert Answers', 'Like-minded Community', 'Daily Nudges' */}
                  {/* <div className="flex justify-around my-4"> <IconExpert /> <IconCommunity /> <IconNudge /> </div> */}
                  <p className="text-gray-700 mb-3">
                    Without judgment. Here, you'll find real answers from experts, connect with like-minded people who just get it, and receive daily nudges to reconnect with your sensual self.
                  </p>
                  <p className="text-gray-700">
                    We talk about stuff no one really talks about—from pleasure to consent to emotional intimacy—with honesty, fun, and a little spice. You will learn, laugh, and unlearn all the guilt.
                  </p>
                </div>

                {/* More Than Just Talk Section */}
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-800 mb-4">More Than Just Talk: It's an Experience</h2>
                  {/* Suggestion: Playful icons for 'games', 'chats', 'playful conversations' could be used inline or as a small visual break. */}
                  <p className="text-gray-700 mb-3">
                    We make fun and sexy conversations that make taboo topics feel natural and playful. Plus, we've got games to bust myths and steamy chats to spice things up.
                  </p>
                  <p className="text-gray-700 mb-4">
                    No shame, no silence—just knowledge, connection, and a whole lot of fun. But Intimate Talks is more than just a group; it's a community with clear guidelines to ensure respect, safety, and comfort for everyone.
                  </p>

                  <div className="mt-6 mb-8 p-4 bg-[#F9F9FB] rounded-xl border border-[#F0F0F5]">
                    <h3 className="text-lg font-serif font-medium text-gray-800 mb-3">Inside Intimate Talks, You Will:</h3>
                    <ul className="space-y-2.5 text-gray-700">
                      <li className="flex items-start"><span className="text-[#D9A6FF] mr-2.5 mt-1">✓</span><span>Get answers to your most intimate questions.</span></li>
                      <li className="flex items-start"><span className="text-[#D9A6FF] mr-2.5 mt-1">✓</span><span>Learn from others' experiences and insights.</span></li>
                      <li className="flex items-start"><span className="text-[#D9A6FF] mr-2.5 mt-1">✓</span><span>Access exclusive content and resources.</span></li>
                      <li className="flex items-start"><span className="text-[#D9A6FF] mr-2.5 mt-1">✓</span><span>Be part of a supportive, non-judgmental community.</span></li>
                      <li className="flex items-start"><span className="text-[#D9A6FF] mr-2.5 mt-1">✓</span><span>Participate in regular Q&A sessions with me (Khushboo).</span></li>
                    </ul>
                  </div>

                  <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-800 mb-3">Ready to Get Confident?</h2>
                  {/* Suggestion: A compelling graphic or an abstract image representing confidence or transformation. */}
                  {/* <img src="/placeholder-images/confidence-boost.svg" alt="Gain confidence" className="w-1/2 mx-auto my-4 rounded-lg" /> */}
                  <p className="text-gray-700 mb-3">
                    If you're eager to learn, explore, or simply feel seen, this is your space. Get confident in bed and beyond. Join Intimate Talks.
                  </p>
                  <p className="text-gray-700 text-lg font-medium mb-4">
                    So many people are already learning, exploring, and owning their pleasure stories.
                  </p>
                  <p className="text-[#5D4777] font-semibold text-xl">
                    See you there!
                  </p>
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
          message="✨ Limited Time: Join Intimate Talks & get a FREE 7-day mindfulness guide!"
          ctaText="Claim Free Guide"
          ctaLink="https://payments.cashfree.com/forms/intimatetalks" // Should ideally lead to a page or section explaining the guide then to payment
          onClose={handleCloseStickyBar}
        />
      )}

      <UpsellPopup
        isOpen={showUpsellPopup}
        onClose={handleCloseUpsellPopup}
        title="Unlock Deeper Connection!"
        description="Upgrade to our 3-Month Intimate Talks PLUS for exclusive workshops & personalized Q&A sessions. Save 25% today!"
        originalPrice="₹2997"
        discountedPrice="₹2249"
        ctaText="Upgrade & Save 25%"
        ctaLink="https://payments.cashfree.com/forms/intimatetalksplus" // Example link for an upgraded product
        productImage="/intimate-talks-plus-promo.jpg" // Replace with an actual image URL if available in public/
      />
    </div>
  );
};

export default IntimateTalks;
