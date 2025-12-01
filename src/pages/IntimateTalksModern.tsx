import { useState } from 'react';
import { Users, Sparkles, MessageCircle, CheckCircle, Star, Shield, Heart, ArrowRight, Zap, Gift, Lock, Video, ChevronDown } from 'lucide-react';

const IntimateTalksModern = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      icon: MessageCircle,
      title: "Expert Answers",
      description: "Get clear, honest information from certified professionals"
    },
    {
      icon: Users,
      title: "Supportive Community",
      description: "Connect with others who understand and share your journey"
    },
    {
      icon: Sparkles,
      title: "Daily Reconnection",
      description: "Rediscover your sensual self with gentle daily nudges"
    },
    {
      icon: Video,
      title: "Live Q&A Sessions",
      description: "Regular live sessions with Khushboo for personalized guidance"
    }
  ];

  const benefits = [
    "Get answers to your most intimate questions",
    "Learn from others' experiences and insights",
    "Access exclusive content and resources",
    "Be part of a supportive, non-judgmental community",
    "Participate in regular Q&A sessions with Khushboo",
    "Fun games and myth-busting activities"
  ];

  const testimonials = [
    {
      text: "This group has been a game-changer for my relationship. The open discussions and advice have helped me communicate better with my partner.",
      author: "Anonymous Member",
      rating: 5
    },
    {
      text: "I've learned so much about myself and my needs. The community is supportive and non-judgmental, which makes it easy to open up.",
      author: "Happy Member",
      rating: 5
    },
    {
      text: "The regular Q&A sessions with Khushboo are invaluable. She provides thoughtful, expert advice that has really improved my intimate life.",
      author: "Grateful Member",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "What is Intimate Talks?",
      answer: "Intimate Talks is a private Telegram community where you can explore topics around sex, intimacy, and pleasure in a safe, judgment-free environment. It's led by Khushboo, a certified sex educator."
    },
    {
      question: "Is my identity protected?",
      answer: "Absolutely. You can join anonymously and participate without revealing your identity. Your privacy is our top priority, and all discussions are confidential."
    },
    {
      question: "What kind of content is shared?",
      answer: "We share educational content, have open discussions, play myth-busting games, and host live Q&A sessions. Topics range from pleasure and consent to emotional intimacy and communication."
    },
    {
      question: "How do I join after payment?",
      answer: "After completing payment, you'll receive an invite link to join our private Telegram group within minutes. The process is quick and seamless."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#F8F4FF] via-white to-[#F8F4FF] min-h-screen">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 text-center">
        <div className="container-custom">
          <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            <span>🎉 Join 100+ members already learning & growing together!</span>
            <Zap className="w-4 h-4" />
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Exclusive Community
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-6 leading-tight">
                Join
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"> Intimate Talks</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                A safe and bold sex-ed community where you can explore everything you've ever wondered about sex, intimacy, and pleasure.
              </p>
              
              <p className="text-lg text-gray-500 mb-8">
                No shame, no silence—just <span className="font-semibold text-purple-600">knowledge, connection, and a whole lot of fun</span>.
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">100+ Active Members</p>
                  <p className="text-sm text-gray-600">Growing community</p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 shadow-lg text-white mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm mb-1">1 Month Subscription</p>
                    <div>
                      <span className="text-white/70 line-through text-lg">₹1999</span>
                      <span className="text-4xl font-bold ml-3">₹999</span>
                    </div>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Save 50%
                  </div>
                </div>
                
                <a 
                  href="https://payments.cashfree.com/forms/intimatetalks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-white text-purple-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Join Intimate Talks Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    Private Group
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Anonymous OK
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-600">100% Private</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-600">Judgment-Free</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-600">Exclusive Content</p>
                </div>
              </div>
            </div>

            {/* Right - Image & Video */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/telegram.png" 
                  alt="Intimate Talks Community" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-6 py-3 rounded-full shadow-lg transform rotate-12">
                50% OFF
              </div>

              {/* Video Preview */}
              <div className="mt-6 rounded-2xl overflow-hidden shadow-lg">
                <div style={{paddingTop:'56.25%', position:'relative', width: '100%', height: 0}}>
                  <iframe 
                    src="https://app.tpstreams.com/embed/6u448b/7f2CDfh8sRJ/?access_token=2ba9a940-67be-4207-a0a6-73a130ac6228" 
                    style={{border:0, maxWidth:'100%', position:'absolute', top:0, left:0, height:'100%', width:'100%'}} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen={true} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              This is Where Real Sex Ed Happens
            </h2>
            <p className="text-lg text-gray-600">Without judgment, with honesty, fun, and a little spice</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 bg-gradient-to-br from-[#F8F4FF] to-[#FFF5F7]">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
                Inside Intimate Talks, You Will:
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Confident?</h3>
              <p className="text-white/90 mb-6">
                If you're eager to learn, explore, or simply feel seen, this is your space. 
                Get confident in bed and beyond.
              </p>
              <a 
                href="https://payments.cashfree.com/forms/intimatetalks"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-white text-purple-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Yes, I'm Ready to Join!
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              What Our Members Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm font-medium text-gray-600">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-br from-[#F8F4FF] to-[#FFF5F7]">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-purple-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Join the Conversation Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            So many people are already learning, exploring, and owning their pleasure stories.
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div className="mb-4">
              <p className="text-white/80 text-sm">1 Month Subscription</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/70 line-through text-xl">₹1999</span>
                <span className="text-5xl font-bold text-white">₹999</span>
              </div>
            </div>
            
            <a 
              href="https://payments.cashfree.com/forms/intimatetalks"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full inline-flex items-center justify-center gap-2 bg-white text-purple-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Join Now - See You There!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <p className="text-white/80 text-sm mt-4">
              Private Telegram group • Anonymous participation OK • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['BBC.jpg', 'Vogue.jpg', 'Mint.jpg', 'Deccan.jpg', 'Huf.jpg'].map((logo, index) => (
              <div key={index} className="w-24 md:w-32 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <img src={`/Featured/${logo}`} alt={logo} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntimateTalksModern;
