import HeroModern from "@/components/HeroModern";
import TrustBadges from "@/components/TrustBadges";
import ProductsPreview from "@/components/ProductsPreview";
import FeaturedIn from "@/components/FeaturedIn";
import AboutPreviewModern from "@/components/AboutPreviewModern";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import SessionsPreview from "@/components/SessionsPreview";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import NewsletterModern from "@/components/NewsletterModern";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Modern Hero with Video CTA */}
      <HeroModern />

      {/* Trust Badges Strip */}
      <TrustBadges />

      {/* Featured In Logos */}
      <FeaturedIn />

      {/* Products Preview - Main Offerings */}
      <ProductsPreview />

      {/* About Section - Build Trust */}
      <AboutPreviewModern />

      {/* Testimonials Carousel - Social Proof */}
      <TestimonialsCarousel />

      {/* Meet the Team/Instructors */}
      <SessionsPreview />

      {/* FAQ Section - Overcome Objections */}
      <FAQSection />

      {/* Strong CTA Section */}
      <CTASection />

      {/* Newsletter with Lead Magnet */}
      <NewsletterModern />
    </div>
  );
};

export default Index;
