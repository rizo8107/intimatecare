import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare global gtag function
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        page_path?: string;
        page_location?: string;
        page_title?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Google Analytics ID
const GA_MEASUREMENT_ID = 'G-D705759DTK';

const GoogleAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title
      });
      console.log('📊 Analytics: Page view tracked:', location.pathname);
    }
  }, [location]);

  return null; // This component doesn't render anything
};

// Helper function to track events
export const trackEvent = (
  eventName: string,
  category?: string,
  label?: string,
  value?: number,
  additionalParams: Record<string, any> = {}
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
      ...additionalParams
    });
    console.log('📊 Analytics: Event tracked:', eventName, category, label);
  }
};

export default GoogleAnalytics;
