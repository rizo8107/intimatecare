import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CancellationRefund = () => {
  return (
    <div className="bg-[#FFE5EC] min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#FF7A9A] hover:text-[#FF5A84] mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-3">
                Cancellation & Refund Policy
              </h1>
              <p className="text-gray-500 text-sm">
                Last updated on 02-05-2025
              </p>
            </div>
            
            <div className="prose prose-pink max-w-none">
              <p>
                KHUSHBOO NANADAN BIST believes in helping its customers as far as possible, and has therefore a
                liberal cancellation policy. Under this policy:
              </p>
              
              <ul className="list-disc pl-5 space-y-4">
                <li>
                  Cancellations will be considered only if the request is made immediately after placing the order.
                  However, the cancellation request may not be entertained if the orders have been communicated to the
                  vendors/merchants and they have initiated the process of shipping them.
                </li>
                <li>
                  KHUSHBOO NANADAN BIST does not accept cancellation requests for perishable items like
                  flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the
                  quality of product delivered is not good.
                </li>
                <li>
                  In case of receipt of damaged or defective items please report the same to our Customer Service team.
                  The request will, however, be entertained once the merchant has checked and determined the same at his
                  own end. This should be reported within 7 days of receipt of the products. In case you feel that the
                  product received is not as shown on the site or as per your expectations, you must bring it to the notice of
                  our customer service within 7 days of receiving the product. The Customer Service Team after
                  looking into your complaint will take an appropriate decision.
                </li>
                <li>
                  In case of complaints regarding products that come with a warranty from manufacturers, please refer
                  the issue to them. In case of any Refunds approved by the KHUSHBOO NANADAN BIST, it'll take 1-2
                  days for the refund to be processed to the end customer.
                </li>
              </ul>
              
              <h2 className="text-xl font-medium mt-8 mb-4">Session Cancellation Policy</h2>
              
              <ul className="list-disc pl-5 space-y-4">
                <li>
                  <strong>24-Hour Notice:</strong> Cancellations made at least 24 hours before your scheduled session will receive a full refund.
                </li>
                <li>
                  <strong>Late Cancellations:</strong> Cancellations made less than 24 hours before your scheduled session will be charged 50% of the session fee.
                </li>
                <li>
                  <strong>No-Shows:</strong> If you fail to attend your scheduled session without prior notice, the full session fee will be charged.
                </li>
                <li>
                  <strong>Rescheduling:</strong> You may reschedule your session without penalty if done at least 24 hours in advance. Late rescheduling requests are subject to availability and may incur a fee.
                </li>
                <li>
                  <strong>Technical Issues:</strong> If your session cannot be completed due to technical issues on our end, you will be offered a full refund or the option to reschedule at no additional cost.
                </li>
              </ul>
              
              <h2 className="text-xl font-medium mt-8 mb-4">How to Request a Refund</h2>
              
              <p>
                To request a refund or report an issue with a product or service, please contact our customer service team at:
              </p>
              
              <ul className="list-none pl-5 space-y-2">
                <li>Email: <a href="mailto:contact@intimatecare.in" className="text-[#FF7A9A] hover:text-[#FF5A84]">contact@intimatecare.in</a></li>
                <li>Phone: +91 9876543210</li>
              </ul>
              
              <p className="mt-4">
                Please include your order details, the reason for your refund request, and any relevant information that will help us process your request efficiently.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Link 
            to="/terms-conditions" 
            className="text-[#FF7A9A] hover:text-[#FF5A84] underline"
          >
            Terms & Conditions
          </Link>
          <span className="text-gray-400">|</span>
          <Link 
            to="/contact" 
            className="text-[#FF7A9A] hover:text-[#FF5A84] underline"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;
