import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Download, BookOpen } from 'lucide-react';

const Guide = () => {
  return (
    <div className="bg-[#FFE5EC]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="text-[#FF7A9A] text-sm font-medium mb-1">MY EXCLUSIVE PRODUCT</div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-gray-800 mb-3">
                  69 Position E-Guide
                </h1>
                <p className="text-gray-700 font-medium">
                  Spice up your bedroom game with my expert-crafted guide
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Column - Appears first on mobile */}
                <div className="order-first md:order-last">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#F0F0F5]">
                    <div className="relative">
                      <div className="bg-[#FFE5EC] p-4 text-center">
                        <p className="text-[#FF7A9A] font-medium uppercase text-sm tracking-wide">DIGITAL DOWNLOAD</p>
                      </div>
                      <img 
                        src="/69.jpg" 
                        alt="69 Position E-Guide" 
                        className="w-full h-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/400x500";
                          target.onerror = null;
                        }}
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <BookOpen size={18} className="text-[#FF7A9A] mr-2" />
                          <span className="text-gray-700 font-medium">Digital E-Book</span>
                        </div>
                        <div className="text-xl font-serif font-medium text-[#FF7A9A]">₹1,299</div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-6">
                        <Download size={16} className="mr-2" />
                        <span>69 illustrated positions with detailed instructions</span>
                      </div>
                    </div>
                    
                    <div className="pt-6 mt-4">
                      <a 
                        href="https://payments.cashfree.com/forms/69positionsebbok"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                      >
                        Buy Now
                      </a>
                      <p className="text-xs text-center text-gray-500 mt-2">
                        After purchase, you'll receive an email with the download link for your guide.
                        Your information is securely processed and will never be shared with third parties.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 shadow-sm mt-6">
                    <h3 className="font-serif text-lg font-medium text-gray-800 mb-4 text-center">What Readers Are Saying</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-[#F0F0F5] shadow-sm">
                        <p className="italic text-gray-600 text-sm">
                          "This guide transformed our bedroom experience! The instructions are clear, 
                          the illustrations are helpful, and the tips really work. Worth every penny!"
                        </p>
                        <div className="flex items-center mt-3">
                          <div className="w-6 h-6 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF7A9A] text-xs font-bold mr-2">C</div>
                          <span className="text-xs font-medium text-gray-700">Couple from Mumbai</span>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-[#F0F0F5] shadow-sm">
                        <p className="italic text-gray-600 text-sm">
                          "I bought this for my partner and me to try something new. We've had so much 
                          fun exploring these positions together. It's rekindled our passion!"
                        </p>
                        <div className="flex items-center mt-3">
                          <div className="w-6 h-6 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF7A9A] text-xs font-bold mr-2">R</div>
                          <span className="text-xs font-medium text-gray-700">Reader from Delhi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Column - Appears second on mobile */}
                <div className="order-last md:order-first flex flex-col">
                  <div className="mb-6">
                    <h2 className="font-serif text-xl font-medium text-gray-800 mb-4">What is the 69 Position Guide?</h2>
                    <p className="text-gray-700 mb-4">
                      A comprehensive, illustrated guide featuring 69 exciting positions to enhance your intimate experiences. 
                      Each position comes with detailed instructions, tips, and variations to suit different body types and preferences.
                    </p>
                    <p className="text-gray-700">
                      This isn't just another position guide – it's a carefully crafted resource based on real feedback and 
                      designed to help you and your partner discover new dimensions of pleasure and connection.
                    </p>
                  </div>
                  
                  <div className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 shadow-sm mb-6">
                    <h3 className="font-serif text-lg font-medium text-gray-800 mb-4">What You'll Discover:</h3>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span>Step-by-step instructions for 69 exciting sex positions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span>How to adjust each position to fit your unique bodies</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span>Secrets to deeper connection & pleasure during penetration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span>How to move your body, hips, arms & legs for maximum satisfaction</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} />
                        </div>
                        <span>Tips on foreplay & oral play to take pleasure to new heights</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 shadow-sm">
                    <h3 className="font-serif text-lg font-medium text-gray-800 mb-4">Why This Guide Is Different:</h3>
                    <p className="mb-4 text-gray-700">
                      Unlike generic position guides, this resource is created with real bodies and real pleasure in mind. 
                      Each position comes with variations for different body types, mobility levels, and experience.
                    </p>
                    <p className="text-gray-700">
                      I've included practical tips based on real feedback from couples who have successfully 
                      incorporated these positions into their intimate lives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-6 md:p-8 text-center">
            <h2 className="font-serif text-xl md:text-2xl font-medium text-gray-800 mb-4">Ready to Enhance Your Intimate Life?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              Don't miss out on this opportunity to transform your intimate experiences. 
              Get your copy of the 69 Position E-Guide today and start exploring new dimensions of pleasure with your partner.
            </p>
            <div className="flex justify-center">
              <a 
                href="https://payments.cashfree.com/forms/69positionsebbok"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-8 rounded-full text-center font-medium transition-colors"
              >
                Get Your Copy Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;
