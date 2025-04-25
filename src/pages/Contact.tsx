import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, Instagram, Youtube, Twitter } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState('email');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/kb_contactform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          preferredContact,
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        
        // Reset the form
        setName('');
        setEmail('');
        setPhone('');
        setSubject('general');
        setMessage('');
        setPreferredContact('email');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFE5EC]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="text-[#FF7A9A] text-sm font-medium mb-1">Get in Touch</div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-gray-800 mb-3">
                  Contact Me
                </h1>
                <p className="text-gray-700 font-medium">
                  Got questions? Want a session? Let's talk!
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-xl font-serif font-medium text-gray-800 mb-6">Send Me a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                        placeholder="Enter your phone number (optional)"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject*
                      </label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                        required
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sessions">One-on-One Sessions</option>
                        <option value="intimatetalks">Intimate Talks</option>
                        <option value="guide">69 Positions Guide</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message*
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A] focus:border-transparent"
                        placeholder="Enter your message here"
                        rows={5}
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={preferredContact === 'email'}
                            onChange={() => setPreferredContact('email')}
                            className="mr-2 text-[#FF7A9A] focus:ring-[#FF7A9A]"
                          />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={preferredContact === 'phone'}
                            onChange={() => setPreferredContact('phone')}
                            className="mr-2 text-[#FF7A9A] focus:ring-[#FF7A9A]"
                          />
                          <span className="text-sm text-gray-700">Phone</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#FF7A9A] hover:bg-[#FF5A84] text-white py-3 px-6 rounded-full text-center font-medium transition-colors"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Fields marked with * are required
                      </p>
                    </div>
                  </form>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#F0F0F5]">
                    <h2 className="text-xl font-serif font-medium text-gray-800 mb-6">Contact Information</h2>
                    
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Mail size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                          <a href="mailto:teamkhushboobist@gmail.com" className="text-[#FF7A9A] hover:text-[#FF5A84] transition-colors">
                            teamkhushboobist@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-[#FFE5EC] text-[#FF7A9A] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Phone size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 mb-1">Phone</h3>
                          <a href="tel:+919876543210" className="text-[#FF7A9A] hover:text-[#FF5A84] transition-colors">
                            +91 98765 43210
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-[#F0F0F5]">
                      <h3 className="font-medium text-gray-800 mb-4">Connect on Social Media</h3>
                      <div className="flex space-x-4">
                        <a 
                          href="https://instagram.com" 
                          target="https://www.instagram.com/khushboobist__/" 
                          rel="noopener noreferrer" 
                          className="bg-[#FFE5EC] hover:bg-[#FFD6E3] transition-colors p-3 rounded-full"
                          aria-label="Instagram"
                        >
                          <Instagram size={20} className="text-[#FF7A9A]" />
                        </a>
                        <a 
                          href="https://youtube.com" 
                          target="https://www.youtube.com/@SexedwithKhushboo" 
                          rel="noopener noreferrer" 
                          className="bg-[#FFE5EC] hover:bg-[#FFD6E3] transition-colors p-3 rounded-full"
                          aria-label="YouTube"
                        >
                          <Youtube size={20} className="text-[#FF7A9A]" />
                        </a>
                       
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#F0F0F5]">
                    <h2 className="text-xl font-serif font-medium text-gray-800 mb-4">Quick Links</h2>
                    <ul className="space-y-3">
                      <li>
                        <a href="/sessions" className="flex items-center text-gray-700 hover:text-[#FF7A9A] transition-colors">
                          <span className="mr-2">→</span>
                          <span>Book a Session</span>
                        </a>
                      </li>
                      <li>
                        <a href="/intimatetalks" className="flex items-center text-gray-700 hover:text-[#FF7A9A] transition-colors">
                          <span className="mr-2">→</span>
                          <span>Join Intimate Talks</span>
                        </a>
                      </li>
                      <li>
                        <a href="/guide" className="flex items-center text-gray-700 hover:text-[#FF7A9A] transition-colors">
                          <span className="mr-2">→</span>
                          <span>Get 69 Positions Guide</span>
                        </a>
                      </li>
                      <li>
                        <a href="/freebie" className="flex items-center text-gray-700 hover:text-[#FF7A9A] transition-colors">
                          <span className="mr-2">→</span>
                          <span>Free Pleasure Mapping Guide</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
