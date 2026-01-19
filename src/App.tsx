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
import SalesPopup from "./components/SalesPopup";
import UtmTracker from "./components/UtmTracker";
import Posters from "./pages/Posters";
import AdminCMS from "./pages/AdminCMS";
import { initClarity } from "./utils/clarity";

import { FEATURE_FLAGS } from "@/config/featureFlags";
const queryClient = new QueryClient();

// ScrollToTop component to reset scroll position on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const isPosterPage = pathname === '/posters';

  return (
    <div className="flex flex-col min-h-screen">
      {!isPosterPage && <Navbar />}
      <ScrollToTop />
      <GoogleAnalytics />
      <ClarityEvents />
      <main className={!isPosterPage ? "flex-grow pt-[88px] md:pt-[112px]" : "flex-grow"}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/posters" element={<Posters />} />
          <Route path="/instructors" element={<InstructorsModern />} />
          <Route path="/about" element={<AboutModern />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/student-booking" element={<StudentBooking />} />
          <Route path="/instructor-booking" element={<InstructorBooking />} />
          <Route path="/instructor/:instructorName" element={<DynamicInstructorBooking />} />
          {FEATURE_FLAGS.ENABLE_COMMUNITY_PAGES && <Route path="/join-group" element={<JoinGroup />} />}
          <Route path="/telegram-test" element={<TelegramTest />} />
          <Route path="/guide" element={<GuideModern />} />
          <Route path="/freebie" element={<Freebie />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/intimate-success" element={<IntimateSuccess />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/sessions" element={<SessionsModern />} />
          {FEATURE_FLAGS.ENABLE_INTIMATE_TALKS && <Route path="/intimatetalks" element={<IntimateTalksModern />} />}
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/cancellation-refund" element={<CancellationRefund />} />
          <Route path="/payment-test" element={<PaymentTestPage />} />
          <Route path="/30-day-challenge" element={<ThirtyDayChallengeModern />} />
          <Route path="/combo-offer" element={<ComboOffer />} />
          {FEATURE_FLAGS.ENABLE_NEW_YEAR_BUNDLE && <Route path="/newyear-bundle" element={<NewYearBundle />} />}
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/admin/waiting-list" element={<WaitingListAdmin />} />
          <Route path="/admin/cms" element={<AdminCMS />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isPosterPage && (
        <>
          <UtmTracker />
          {pathname !== '/intimate-success' && <SalesPopup />}
          <StickyCtaBar />
          <Footer />
        </>
      )}
    </div>
  );
};

initClarity();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
