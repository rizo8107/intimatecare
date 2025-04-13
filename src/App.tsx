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
import JoinGroup from "./pages/JoinGroup";
import { ReactNode } from "react";

const queryClient = new QueryClient();

// Layout component for pages that should display navbar and footer
const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

// Layout for pages that should NOT display navbar and footer
const BlankLayout = ({ children }: { children: ReactNode }) => (
  <main className="min-h-screen">{children}</main>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Hidden routes with no navbar/footer */}
          <Route
            path="/verify-join/:groupType"
            element={
              <BlankLayout>
                <JoinGroup />
              </BlankLayout>
            }
          />
          
          {/* Regular routes with navbar/footer */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Index />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/sessions"
            element={
              <MainLayout>
                <Sessions />
              </MainLayout>
            }
          />
          <Route
            path="/intimatetalks"
            element={
              <MainLayout>
                <IntimateTalks />
              </MainLayout>
            }
          />
          <Route
            path="/guide"
            element={
              <MainLayout>
                <Guide />
              </MainLayout>
            }
          />
          <Route
            path="/freebie"
            element={
              <MainLayout>
                <Freebie />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
