
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ShoppingCart, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';

const ProductDetails = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('standard');
  const [loading, setLoading] = useState(false);

  const handleBuy = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Purchase Successful!",
        description: "Check your email for the download link to your selected guide.",
      });
    }, 1000);
  };

  return (
    <div className="bg-sand-50 min-h-screen">
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              Intimacy Guides Collection
            </h1>
            <p className="text-xl text-blush-600 max-w-2xl mx-auto">
              Transform your relationship with our expert-crafted intimacy guides
            </p>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
            <div>
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 bg-blush-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    Bestseller
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg rotate-3 max-w-sm">
                    <div className="aspect-[3/4] bg-gradient-to-br from-blush-400 to-blush-600 rounded-md flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <h3 className="font-serif text-2xl mb-2">Complete</h3>
                        <h4 className="font-serif text-3xl mb-4">Intimacy Guides</h4>
                        <p className="text-md mb-6">All your intimacy needs in one collection</p>
                        <div className="inline-block border-2 border-white rounded-full px-6 py-2">
                          By Khushboo Bist
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">(120+ reviews)</span>
                </div>
                <h3 className="font-serif text-xl mb-4">What Customers Are Saying:</h3>
                <div className="space-y-4">
                  <div className="bg-sand-50 p-4 rounded-lg">
                    <p className="italic text-muted-foreground mb-2">
                      "These guides have completely transformed our intimate life. The practical advice 
                      and exercises are easy to follow and incredibly effective!"
                    </p>
                    <p className="text-right text-sm font-medium">— Sarah & Mike</p>
                  </div>
                  <div className="bg-sand-50 p-4 rounded-lg">
                    <p className="italic text-muted-foreground mb-2">
                      "I've tried other resources before but none were as comprehensive and thoughtful as these. 
                      They address both physical and emotional aspects of intimacy."
                    </p>
                    <p className="text-right text-sm font-medium">— Anonymous Couple</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="font-serif text-2xl text-center">Choose Your Package</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card 
                      className={`cursor-pointer transition-all ${
                        selectedPackage === 'basic' 
                          ? 'border-blush-500 shadow-md' 
                          : 'hover:border-blush-300'
                      }`}
                      onClick={() => setSelectedPackage('basic')}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Basic</CardTitle>
                        <CardDescription>Single guide</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-2xl font-serif font-medium text-blush-600">₹1,499</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-xs text-muted-foreground">1 guide of choice</p>
                      </CardFooter>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all ${
                        selectedPackage === 'standard' 
                          ? 'border-blush-500 shadow-md' 
                          : 'hover:border-blush-300'
                      }`}
                      onClick={() => setSelectedPackage('standard')}
                    >
                      <CardHeader className="pb-2 relative">
                        <div className="absolute -top-3 -right-3 bg-blush-500 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                        <CardTitle className="text-lg">Standard</CardTitle>
                        <CardDescription>3 guides bundle</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-2xl font-serif font-medium text-blush-600">₹3,499</p>
                        <p className="text-xs line-through text-muted-foreground">₹4,497</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-xs text-muted-foreground">Save 22%</p>
                      </CardFooter>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all ${
                        selectedPackage === 'premium' 
                          ? 'border-blush-500 shadow-md' 
                          : 'hover:border-blush-300'
                      }`}
                      onClick={() => setSelectedPackage('premium')}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Premium</CardTitle>
                        <CardDescription>All guides</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-2xl font-serif font-medium text-blush-600">₹4,999</p>
                        <p className="text-xs line-through text-muted-foreground">₹8,995</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-xs text-muted-foreground">Save 44%</p>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="mt-8">
                    <div className="bg-blush-50 border border-blush-200 rounded-lg p-4 text-sm mb-6">
                      <h4 className="font-medium mb-2">What you get with {selectedPackage === 'basic' ? 'Basic' : selectedPackage === 'standard' ? 'Standard' : 'Premium'}:</h4>
                      {selectedPackage === 'basic' && (
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>Choose 1 guide from our collection</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>PDF instant digital download</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>Mobile-friendly format</span>
                          </li>
                        </ul>
                      )}
                      
                      {selectedPackage === 'standard' && (
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>3 guides of your choice</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>22% discount on bundle</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>PDF instant digital download</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>Mobile-friendly format</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>30-minute free consultation</span>
                          </li>
                        </ul>
                      )}
                      
                      {selectedPackage === 'premium' && (
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>All 6 guides in our collection</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>44% discount on complete bundle</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>PDF instant digital download</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>Mobile-friendly format</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>1-hour free consultation</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>Access to Intimate Talks group for 1 month</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1" />
                            <span>Lifetime updates</span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                    onClick={handleBuy}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : (
                      <>
                        <ShoppingCart size={18} /> Buy Now
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Secure payment • Instant download • 30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Features Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-16">
            <h2 className="font-serif text-3xl text-center mb-8">What's Inside Our Guides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-sand-50 p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-3">69 Positions Guide</h3>
                <p className="text-muted-foreground mb-4">
                  Our bestselling guide with 69 illustrated positions for maximum pleasure.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Step-by-step instructions</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Adjustments for different body types</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Difficulty level indicators</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-sand-50 p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-3">Pleasure Mapping</h3>
                <p className="text-muted-foreground mb-4">
                  Learn to identify and stimulate the most sensitive pleasure spots.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Anatomical guides for all bodies</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Self-exploration exercises</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Partner communication templates</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-sand-50 p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-3">Tantric Connection</h3>
                <p className="text-muted-foreground mb-4">
                  Ancient wisdom for deeper intimacy and spiritual connection.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Breath synchronization techniques</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Energy circulation exercises</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Mindfulness practices for presence</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-sand-50 p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-3">Foreplay Mastery</h3>
                <p className="text-muted-foreground mb-4">
                  The art of building anticipation and arousal before the main event.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>40+ foreplay ideas and techniques</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Sensual massage instructions</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Role play scenarios and props guide</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-sand-50 p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-3">Communication Blueprint</h3>
                <p className="text-muted-foreground mb-4">
                  Learn to express desires and boundaries for enhanced intimacy.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Effective conversation starters</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Non-verbal communication cues</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Navigating sensitive topics</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-sand-50 p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-3">Intimacy After Children</h3>
                <p className="text-muted-foreground mb-4">
                  Reignite passion and connection after becoming parents.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Time-efficient intimacy strategies</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Reconnecting emotionally</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1" />
                    <span>Body image and postpartum intimacy</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blush-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Info size={24} className="text-blush-600" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2">Each Guide Also Includes:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span>Printable worksheets & exercises</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span>Troubleshooting common challenges</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span>Progress tracking tools</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span>Recommended additional resources</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span>Frequently asked questions</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span>Glossary of terminology</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-serif text-3xl text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl mb-2">Are these guides appropriate for all couples?</h3>
                <p className="text-muted-foreground">
                  Yes! Our guides are designed to be inclusive for all couples regardless of orientation, 
                  gender identity, or relationship style. The content is body-positive and 
                  celebrates diversity in all forms.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl mb-2">How will I receive my guides after purchase?</h3>
                <p className="text-muted-foreground">
                  Immediately after your purchase, you'll receive an email with download links to all your 
                  guides in PDF format. These links remain active for 30 days, and you can download 
                  the files up to 5 times.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl mb-2">Are these guides explicit or pornographic?</h3>
                <p className="text-muted-foreground">
                  No, our guides are educational and tasteful. While they contain detailed information about 
                  intimate activities, they use artistic illustrations and respectful language. 
                  The focus is on emotional connection, communication, and mutual pleasure.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl mb-2">What if I'm not satisfied with my purchase?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not completely satisfied with your guides, 
                  contact us for a full refund, no questions asked.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blush-100 to-blush-200 rounded-xl p-8 text-center">
            <h2 className="font-serif text-3xl mb-4">Ready to Transform Your Intimate Life?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of couples who have enhanced their connection and pleasure with our expert guides.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                className="btn-primary py-3 px-8 flex items-center justify-center gap-2"
                onClick={handleBuy}
              >
                <ShoppingCart size={18} /> Get Your Guides Now
              </button>
              
              <Link to="/contact" className="btn-accent py-3 px-8">
                Have Questions? Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
