
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import AboutPreview from "@/components/AboutPreview";
import SessionsPreview from "@/components/SessionsPreview";
import TelegramPreview from "@/components/TelegramPreview";
import GuidePreview from "@/components/GuidePreview";
import FreebieSection from "@/components/FreebieSection";
import NewsletterSection from "@/components/NewsletterSection";
import YouTubeSection from "@/components/YouTubeSection";

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeatureSection />
      <AboutPreview />
      <SessionsPreview />
      <YouTubeSection />
      <TelegramPreview />
      <GuidePreview />
      <FreebieSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;
