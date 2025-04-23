import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Issues = () => {
  const commonIssues = [
    {
      title: "Low Sexual Desire",
      description: "Understanding and addressing the root causes of low libido and rekindling desire in relationships.",
      link: "#low-desire",
      icon: <CheckCircle className="h-5 w-5 text-pink-400" />
    },
    {
      title: "Communication Problems",
      description: "Learning effective communication techniques to express needs, boundaries, and desires with your partner.",
      link: "#communication",
      icon: <CheckCircle className="h-5 w-5 text-pink-400" />
    },
    {
      title: "Pain During Intercourse",
      description: "Exploring causes and solutions for painful sex to create more comfortable and pleasurable experiences.",
      link: "#pain",
      icon: <CheckCircle className="h-5 w-5 text-pink-400" />
    },
    {
      title: "Orgasm Difficulties",
      description: "Understanding orgasm challenges and learning techniques to enhance pleasure and satisfaction.",
      link: "#orgasm",
      icon: <CheckCircle className="h-5 w-5 text-pink-400" />
    },
    {
      title: "Erectile Dysfunction",
      description: "Addressing performance anxiety and physical factors that contribute to erectile difficulties.",
      link: "#ed",
      icon: <CheckCircle className="h-5 w-5 text-pink-400" />
    },
    {
      title: "Premature Ejaculation",
      description: "Learning techniques and strategies to improve control and enhance sexual experiences.",
      link: "#pe",
      icon: <CheckCircle className="h-5 w-5 text-pink-400" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sexual Wellness Issues & Solutions | Khushboo Bist</title>
        <meta name="description" content="Expert guidance from Khushboo Bist on common sexual issues including low desire, pain during sex, communication problems, and more. Find personalized solutions for your intimate concerns." />
        <meta name="keywords" content="sexual issues, sex problems, low libido, painful sex, erectile dysfunction, premature ejaculation, orgasm difficulties, sex therapy, Khushboo Bist" />
        <link rel="canonical" href="https://khushboobist.com/issues" />
        
        {/* Schema.org structured data for FAQ page */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How can Khushboo Bist help with low sexual desire?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Khushboo Bist offers personalized coaching sessions to help identify the root causes of low desire, which may include stress, relationship dynamics, hormonal factors, or past experiences. Through evidence-based approaches, she helps clients reconnect with their bodies and rediscover pleasure."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What solutions does Khushboo Bist provide for pain during intercourse?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Khushboo Bist works with clients experiencing painful sex by addressing both physical and psychological factors. She provides education about anatomy, recommends appropriate lubricants, teaches relaxation techniques, and helps couples explore comfortable positions and alternative forms of intimacy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does Khushboo Bist address erectile dysfunction and performance anxiety?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Khushboo Bist takes a holistic approach to erectile difficulties, addressing psychological factors like performance anxiety while providing education about physical health factors. Her coaching includes mindfulness techniques, communication strategies, and pleasure-focused approaches rather than performance-focused ones."
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <div className="bg-gradient-to-b from-pink-50 to-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-custom max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-800 mb-4">
                Sexual Wellness Issues & Solutions
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Expert guidance from Khushboo Bist on addressing common sexual concerns with compassion, knowledge, and practical solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {commonIssues.map((issue, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-pink-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-4">
                    {issue.icon}
                    <h2 className="text-xl font-serif font-medium text-gray-800 ml-2">
                      {issue.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {issue.description}
                  </p>
                  <a href={issue.link} className="text-pink-500 font-medium inline-flex items-center hover:text-pink-600">
                    Learn more <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Low Sexual Desire Section */}
        <section id="low-desire" className="py-16 bg-white">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-4">
                  Low Sexual Desire
                </h2>
                <p className="text-gray-600 mb-4">
                  Low sexual desire or libido is one of the most common sexual concerns people face. It can stem from various factors including stress, relationship dynamics, hormonal changes, medication side effects, or past negative experiences.
                </p>
                <p className="text-gray-600 mb-4">
                  As a sex educator and intimacy coach, Khushboo Bist helps individuals and couples understand the complex nature of desire and provides personalized strategies to reconnect with their sexuality.
                </p>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  How Khushboo Can Help:
                </h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mt-0.5 mr-2" />
                    <span>Identify underlying factors affecting your desire</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mt-0.5 mr-2" />
                    <span>Develop a personalized plan to reconnect with your body</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mt-0.5 mr-2" />
                    <span>Learn techniques to cultivate desire and pleasure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mt-0.5 mr-2" />
                    <span>Address relationship dynamics that may impact desire</span>
                  </li>
                </ul>
                <Button asChild className="bg-pink-500 hover:bg-pink-600">
                  <Link to="/sessions">Book a Session</Link>
                </Button>
              </div>
              <div className="bg-pink-50 p-8 rounded-2xl">
                <h3 className="text-xl font-medium text-gray-800 mb-4">
                  Common Questions About Low Desire
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800">Is it normal for desire to fluctuate?</h4>
                    <p className="text-gray-600">Yes, sexual desire naturally ebbs and flows throughout life. Factors like stress, health changes, and relationship dynamics all influence desire levels.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Can mismatched desire be resolved?</h4>
                    <p className="text-gray-600">Absolutely. With open communication, understanding, and appropriate strategies, couples with different desire levels can find a satisfying balance.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">How long does it take to see changes?</h4>
                    <p className="text-gray-600">Everyone's journey is different, but many clients report positive shifts after just a few sessions when they implement the recommended practices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pain During Intercourse Section */}
        <section id="pain" className="py-16 bg-pink-50">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-8 rounded-2xl order-2 md:order-1">
                <h3 className="text-xl font-medium text-gray-800 mb-4">
                  Understanding Pain During Sex
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800">What causes painful intercourse?</h4>
                    <p className="text-gray-600">Pain can stem from physical conditions, insufficient arousal, tension, anxiety, or past trauma. Identifying the specific cause is key to finding solutions.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Should I see a doctor?</h4>
                    <p className="text-gray-600">Medical evaluation is recommended to rule out physical conditions. Khushboo works alongside healthcare providers to address both physical and psychological aspects.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Can painful sex be overcome?</h4>
                    <p className="text-gray-600">Yes, with proper support and appropriate techniques, most people can develop a comfortable and pleasurable sex life, even after experiencing pain.</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-4">
                  Pain During Intercourse
                </h2>
                <p className="text-gray-600 mb-4">
                  Pain during sexual activity is more common than many realize and can significantly impact one's quality of life and relationships. It deserves attention and compassionate care.
                </p>
                <p className="text-gray-600 mb-4">
                  Khushboo Bist provides education, techniques, and support for individuals experiencing painful sex, helping them understand their bodies and develop strategies for comfortable intimacy.
                </p>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  How Khushboo Can Help:
                </h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mt-0.5 mr-2" />
                    <span>Provide education about anatomy and sexual response</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mt-0.5 mr-2" />
                    <span>Teach relaxation and mindfulness techniques</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mt-0.5 mr-2" />
                    <span>Suggest comfortable positions and alternatives</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mt-0.5 mr-2" />
                    <span>Address psychological aspects like anxiety or past experiences</span>
                  </li>
                </ul>
                <Button asChild className="bg-pink-500 hover:bg-pink-600">
                  <Link to="/sessions">Book a Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-4xl">
            <div className="bg-gradient-to-r from-pink-500 to-pink-400 rounded-3xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">
                Ready to Address Your Concerns?
              </h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Khushboo Bist provides personalized, compassionate guidance to help you overcome sexual challenges and create a fulfilling intimate life.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-white text-pink-500 hover:bg-gray-100 hover:text-pink-600">
                  <Link to="/sessions">Book a Session</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">Contact Khushboo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Issues;
