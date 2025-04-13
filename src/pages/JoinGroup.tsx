import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import TelegramLoginButton from '@/components/TelegramLoginButton';

const JoinGroup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'verified' | 'failed'>('loading');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [paymentId, setPaymentId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Extract verification token or payment ID from URL parameters
    const token = searchParams.get('token');
    const payment = searchParams.get('payment');

    if (payment) {
      setPaymentId(payment);
    }

    // If no token is provided, redirect to home
    if (!token && !payment) {
      navigate('/');
      return;
    }

    // Verify token if provided
    if (token) {
      // You would typically make an API call to your backend to verify the token
      // This is a simulated verification
      setTimeout(() => {
        if (token === 'valid_token_example') {
          setVerificationStatus('verified');
        } else {
          setVerificationStatus('failed');
        }
      }, 1500);
    } else {
      // If no token but payment ID exists, wait for Telegram login
      setVerificationStatus('verified');
    }
  }, [searchParams, navigate]);

  const handleTelegramAuth = (user: any) => {
    console.log('Telegram auth success:', user);
    setTelegramUsername(user.username || '');
    setTelegramUser(user);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send verification data to webhook
      const response = await fetch('https://backend-n8n.7za6uc.easypanel.host/webhook/telegram_group_join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramUser,
          paymentId,
          source: 'intimate_care_join_page',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your payment has been verified. You will be added to the Telegram group shortly.',
        });

        // Redirect to thank you page or home after success
        setTimeout(() => {
          navigate('/intimatetalks');
        }, 3000);
      } else {
        throw new Error('Failed to verify payment');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: 'Error',
        description: 'We encountered an issue verifying your payment. Please contact support.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blush-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Verifying your payment...</h2>
          <p className="text-muted-foreground mt-2">This will just take a moment.</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium mb-2">Verification Failed</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't verify your payment. This could be due to an expired or invalid verification link.
          </p>
          <a href="/intimatetalks" className="btn-primary inline-block">
            Back to Intimate Talks
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 py-16">
      <div className="container-custom">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blush-500 to-blush-600 p-6 text-white text-center">
            <h1 className="text-2xl font-serif font-medium">Join Intimate Talks Telegram Group</h1>
            <p className="mt-2">Complete Your Verification</p>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium text-sm">Payment Successfully Detected</p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4">Step 1: Connect Your Telegram Account</h2>
                <p className="text-muted-foreground mb-4 text-sm">
                  To add you to the private Telegram group, we need to verify your Telegram account.
                  Please click the button below to authenticate with Telegram.
                </p>
                
                {!telegramUsername && (
                  <div className="flex justify-center my-4">
                    <TelegramLoginButton 
                      botName="IntimateCareTelegramBot"
                      onAuth={handleTelegramAuth}
                      buttonSize="large"
                      showUserPic={true}
                      requestAccess="write"
                    />
                  </div>
                )}
                
                {telegramUsername && (
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-center">
                      <span className="font-medium">Connected as: </span>
                      <span className="text-blue-600 font-medium">@{telegramUsername}</span>
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4">Step 2: Complete Verification</h2>
                <p className="text-muted-foreground mb-4 text-sm">
                  Click the button below to complete your verification. Once verified,
                  you'll receive an invitation link to join the private Telegram group.
                </p>
                
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={!telegramUsername || isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Complete Verification"}
                  </button>
                </form>
              </div>
              
              <div className="text-xs text-center text-muted-foreground mt-6">
                <p>
                  Having trouble? Please contact us at 
                  <a href="mailto:support@intimatecare.com" className="text-blush-600 hover:underline"> support@intimatecare.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinGroup; 