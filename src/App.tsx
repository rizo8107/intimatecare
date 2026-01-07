import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import AboutModern from "./pages/AboutModern";
import Sessions from "./pages/Sessions";
import StudentBooking from "./pages/StudentBooking";
import InstructorBooking from "./pages/InstructorBooking";
import DynamicInstructorBooking from "./pages/DynamicInstructorBooking";
import IntimateTalks from "./pages/IntimateTalks";
import GuideModern from "./pages/GuideModern";
import SessionsModern from "./pages/SessionsModern";
import IntimateTalksModern from "./pages/IntimateTalksModern";
import InstructorsModern from "./pages/InstructorsModern";
import ThirtyDayChallengeModern from "./pages/ThirtyDayChallengeModern";
import Freebie from "./pages/Freebie";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import IntimateSuccess from "./pages/IntimateSuccess";
import Issues from "./pages/Issues";
import JoinGroup from "./pages/JoinGroup";
import TelegramTest from "./pages/TelegramTest";
import TermsConditions from "./pages/TermsConditions";
import CancellationRefund from "./pages/CancellationRefund";
import PaymentTestPage from './pages/PaymentTestPage';
import ThirtyDayChallenge from './pages/ThirtyDayChallenge';
import NewYearBundle from './pages/NewYearBundle';
import ComboOffer from './pages/ComboOffer';
import ComingSoon from './pages/ComingSoon';
import InstructorsPage from './pages/Instructors';
import WaitingListAdmin from './pages/WaitingListAdmin';
import Webinars from './pages/Webinars';
import Programs from './pages/Programs';
import Products from './pages/Products';
import GoogleAnalytics from "./components/GoogleAnalytics";
import ClarityEvents from "./components/ClarityEvents";
import StickyCtaBar from "./components/StickyCtaBar";
import { initClarity } from "./utils/clarity";

const queryClient = new QueryClient();

// ScrollToTop component to reset scroll position on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

initClarity();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ScrollToTop />
          <GoogleAnalytics />
          <ClarityEvents />
          <main className="flex-grow pt-[88px] md:pt-[112px]">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/products" element={<Products />} />
              <Route path="/instructors" element={<InstructorsModern />} />
              <Route path="/about" element={<AboutModern />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/student-booking" element={<StudentBooking />} />
              <Route path="/instructor-booking" element={<InstructorBooking />} />
              <Route path="/instructor/:instructorName" element={<DynamicInstructorBooking />} />
              <Route path="/join-group" element={<JoinGroup />} />
              <Route path="/telegram-test" element={<TelegramTest />} />
              <Route path="/guide" element={<GuideModern />} />
              <Route path="/freebie" element={<Freebie />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/intimate-success" element={<IntimateSuccess />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/sessions" element={<SessionsModern />} />
              <Route path="/intimatetalks" element={<IntimateTalksModern />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/cancellation-refund" element={<CancellationRefund />} />
              <Route path="/payment-test" element={<PaymentTestPage />} />
              <Route path="/30-day-challenge" element={<ThirtyDayChallengeModern />} />
              <Route path="/combo-offer" element={<ComboOffer />} />
              <Route path="/newyear-bundle" element={<NewYearBundle />} />
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/admin/waiting-list" element={<WaitingListAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <StickyCtaBar />
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
