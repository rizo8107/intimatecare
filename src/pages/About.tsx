
const About = () => {
  return (
    <div>
      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              About Me
            </h1>
            <p className="text-xl text-blush-600 italic font-serif">
              Sex Educator & Intimacy Coach
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-12">
              <img
                src="/lovable-uploads/ed233340-7b1c-46cf-8369-944b2ebeaa4e.png"
                alt="Khushboo Bist"
                className="rounded-lg shadow-lg max-w-md w-full"
              />
            </div>

            <div className="prose prose-lg mx-auto">
              <h2 className="font-serif text-3xl mb-4">Hey, I'm Khushboo Bist!</h2>
              <p>
                A certified sex educator, intimacy coach and your go-to guide for all things 
                pleasure, connection, and self-discovery.
              </p>
              <p>
                Sex is one of the most natural yet most misunderstood aspects of our lives. 
                We desire it, we fear it, we suppress it—but do we truly understand it? I grew up 
                seeing how misinformation, shame, and silence around sexuality create confusion, 
                fear, and unfulfilled relationships.
              </p>
              <p>
                And I decided to change that—to create a space where open, honest conversations 
                about sex and relationships are normal, not taboo. A space where individuals and 
                couples can navigate their sensuality with confidence, knowledge, and pleasure—without 
                guilt or shame.
              </p>

              <h3 className="font-serif text-2xl mt-8 mb-4">My Philosophy</h3>
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

              <h3 className="font-serif text-2xl mt-8 mb-4">Credentials</h3>
              <ul>
                <li>Certified in Sex and Sexual Health – Modern Sex Therapy Institute, USA</li>
                <li>Pursuing a Master's in Psychology to better understand human connection and intimacy</li>
                <li>Trained in trauma-informed approaches to sexual education</li>
                <li>Regular participant in workshops and conferences on sexual health and education</li>
              </ul>

              <h3 className="font-serif text-2xl mt-8 mb-4">My Approach</h3>
              <p>
                My approach is rooted in empathy, inclusivity, and evidence-based information. 
                I create a space where all questions are valid, all experiences are honored, 
                and all journeys are respected. Whether through one-on-one sessions, group workshops, 
                or digital resources, I provide practical guidance tailored to your unique needs.
              </p>
              <p>
                It's time to unlearn the shame, embrace your desires, and take charge of your pleasure.
              </p>

              <div className="bg-blush-50 p-6 rounded-lg mt-8">
                <h3 className="font-serif text-2xl mb-4">Ready to Transform Your Relationship with Pleasure?</h3>
                <p>
                  Whether you're seeking personal guidance, looking to join a supportive community, 
                  or interested in educational resources, I'm here to help you navigate your journey 
                  to better intimacy and pleasure.
                </p>
                <div className="flex justify-center mt-4">
                  <a href="/sessions" className="btn-primary">
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
