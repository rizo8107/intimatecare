import { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
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
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32 animate-fade-in-up">
            <span className="badge-premium mb-6">FAQ</span>
            <h2 className="section-title">
              Common Questions <br />
              <span className="text-gradient">Fully Answered</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-10 max-w-lg leading-relaxed">
              We understand you might have questions about starting your journey. Here are answers to the most common inquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                to="/contact"
                className="btn-premium-primary w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Still have questions?
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-slate-50 border border-slate-100">
                  <HelpCircle className="w-5 h-5 text-slate-400" />
                </div>
                <span className="text-sm font-bold text-slate-900">24/7 Support for Clients</span>
              </div>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden ${openIndex === index
                    ? 'bg-slate-900 border-slate-900 shadow-2xl'
                    : 'bg-slate-50/50 border-slate-100 hover:border-primary/20 hover:bg-white'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left outline-none"
                >
                  <span className={`text-lg font-black tracking-tight transition-colors duration-500 ${openIndex === index ? 'text-white' : 'text-slate-900 group-hover:text-primary'
                    }`}>
                    {index + 1}. {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-primary text-white rotate-180' : 'bg-slate-200/50 text-slate-400'
                    }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                >
                  <div className="px-8 pb-10 border-t border-white/10 pt-4">
                    <p className={`text-lg font-medium leading-relaxed transition-colors duration-500 ${openIndex === index ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                      {faq.answer}
                    </p>
                  </div>
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

