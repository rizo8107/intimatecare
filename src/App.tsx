import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Sessions from "./pages/Sessions";
import IntimateTalks from "./pages/IntimateTalks";
import Guide from "./pages/Guide";
import Freebie from "./pages/Freebie";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import IntimateSuccess from "./pages/IntimateSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16 md:pt-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/intimatetalks" element={<IntimateTalks />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/freebie" element={<Freebie />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/intimate-success" element={<IntimateSuccess />} />
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
