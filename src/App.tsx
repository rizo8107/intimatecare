import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Sessions from "./pages/Sessions";
import StudentBooking from "./pages/StudentBooking";
import IntimateTalks from "./pages/IntimateTalks";
import Guide from "./pages/Guide";
import Freebie from "./pages/Freebie";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import IntimateSuccess from "./pages/IntimateSuccess";
import Issues from "./pages/Issues";
import JoinGroup from "./pages/JoinGroup";
import TelegramTest from "./pages/TelegramTest";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ClarityEvents from "./components/ClarityEvents";
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
          <main className="flex-grow pt-16 md:pt-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/student-booking" element={<StudentBooking />} />
              <Route path="/join-group" element={<JoinGroup />} />
              <Route path="/telegram-test" element={<TelegramTest />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/freebie" element={<Freebie />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/intimate-success" element={<IntimateSuccess />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/intimatetalks" element={<IntimateTalks />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
