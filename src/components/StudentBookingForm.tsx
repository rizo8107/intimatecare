import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  year: string;
  preferredDate: string;
  preferredTime: string;
  concerns: string;
}

const StudentBookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    year: '',
    preferredDate: '',
    preferredTime: '',
    concerns: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }
    
    // Basic phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.college || !formData.course || !formData.year) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };
  
  const nextStep = () => {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2);
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3);
    }
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.preferredDate || !formData.preferredTime) {
      toast({
        title: "Required fields missing",
        description: "Please select your preferred date and time.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/studenform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sessionType: 'Student Special',
          price: '₹499'
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Booking submitted successfully!",
          description: "We'll contact you soon to confirm your session.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          college: '',
          course: '',
          year: '',
          preferredDate: '',
          preferredTime: '',
          concerns: ''
        });
        setFormStep(1);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Error submitting form",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Generate time slots from 9 AM to 8 PM
  const timeSlots = [];
  for (let hour = 9; hour <= 20; hour++) {
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const amPm = hour >= 12 ? 'PM' : 'AM';
    timeSlots.push(`${formattedHour}:00 ${amPm}`);
    if (hour !== 20) {
      timeSlots.push(`${formattedHour}:30 ${amPm}`);
    }
  }
  
  // Get current date and format it for min attribute
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  // Calculate date 30 days from now for max attribute
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  const formattedMaxDate = maxDate.toISOString().split('T')[0];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-serif font-medium text-gray-800 mb-4">Book Your Student Session</h3>
      
      <form onSubmit={handleSubmit}>
        {formStep === 1 && (
          <div className="space-y-4">
            <h4 className="font-medium text-[#3B82F6] mb-2">Personal Information</h4>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                required
              />
              <p className="text-xs text-gray-500 mt-1">10-digit number without spaces or dashes</p>
            </div>
            
            <div className="pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-[#3B82F6] text-white py-2 px-4 rounded-md hover:bg-[#2563EB] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {formStep === 2 && (
          <div className="space-y-4">
            <h4 className="font-medium text-[#3B82F6] mb-2">Student Information</h4>
            
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                College/University <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Course/Program <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year of Study <span className="text-red-500">*</span>
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                required
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-[#3B82F6] text-white py-2 px-4 rounded-md hover:bg-[#2563EB] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {formStep === 3 && (
          <div className="space-y-4">
            <h4 className="font-medium text-[#3B82F6] mb-2">Session Details</h4>
            
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={formattedToday}
                max={formattedMaxDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Select a date within the next 30 days</p>
            </div>
            
            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                required
              >
                <option value="">Select Time</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="concerns" className="block text-sm font-medium text-gray-700 mb-1">
                What would you like to discuss? (Optional)
              </label>
              <textarea
                id="concerns"
                name="concerns"
                value={formData.concerns}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Your information is kept strictly confidential</p>
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#3B82F6] text-white py-2 px-4 rounded-md hover:bg-[#2563EB] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Book Session (₹499)'}
              </button>
            </div>
          </div>
        )}
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Need help? <a href="mailto:contact@intimatecare.com" className="text-[#3B82F6] hover:underline">Contact us</a></p>
      </div>
    </div>
  );
};

export default StudentBookingForm;
