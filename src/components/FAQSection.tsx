import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is everything completely confidential?",
      answer: "Absolutely. Your privacy is our top priority. All sessions are conducted on secure, encrypted platforms. We never share any personal information, and you can choose to remain anonymous if you prefer."
    },
    {
      question: "I'm nervous about discussing intimate topics. Is that normal?",
      answer: "Completely normal! Most of our clients feel the same way initially. Khushboo creates a warm, non-judgmental space where you can open up at your own pace. There's no pressure to share anything you're not comfortable with."
    },
    {
      question: "Can I book a session as an individual, or do I need my partner?",
      answer: "Both options are available! Many clients start with individual sessions to work on personal growth, while others prefer couples sessions. We'll help you determine what's best for your situation."
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer: "We offer a satisfaction guarantee on our digital products. If you're not happy with your playbook or challenge within 7 days, reach out to us and we'll make it right."
    },
    {
      question: "How are the sessions conducted?",
      answer: "Sessions are conducted via secure video call (Zoom or Google Meet) or audio call, based on your preference. You can be anywhere in the world - all you need is a private space and stable internet connection."
    },
    {
      question: "Is this therapy or counseling?",
      answer: "While Khushboo is a certified sex educator and intimacy coach, this is not therapy or medical treatment. We focus on education, communication skills, and practical guidance. For clinical issues, we can recommend appropriate professionals."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block px-4 py-1.5 bg-pink-100 text-[#FF5A84] rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
              Questions?
              <br />
              <span className="bg-gradient-to-r from-[#FF5A84] to-[#9B59B6] bg-clip-text text-transparent">We've Got Answers</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Still have questions? We're here to help. Reach out anytime and we'll get back to you within 24 hours.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5A84] to-[#FF7A9A] text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us
            </Link>
          </div>

          {/* Right Column - Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'shadow-lg' : 'hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#FF5A84] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
