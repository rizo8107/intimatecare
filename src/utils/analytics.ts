// analytics.ts - Utility functions for Google Analytics tracking

// Analytics event categories
export enum EventCategory {
  ENGAGEMENT = 'engagement',
  FORM = 'form',
  NAVIGATION = 'navigation',
  CONVERSION = 'conversion'
}

// Track page views (this happens automatically via the GoogleAnalytics component)
export const trackPageView = (path: string, title: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-D705759DTK', {
      page_path: path,
      page_title: title
    });
  }
};

// Track custom events
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
    
    // For development debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log('📊 Analytics: Event tracked:', { eventName, category, label, value, ...additionalParams });
    }
  }
};

// Predefined events for consistent tracking
export const trackFormStart = (formName: string) => {
  trackEvent('form_start', EventCategory.FORM, formName);
};

export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_failure', 
    EventCategory.FORM, 
    formName
  );
};

export const trackFormStepComplete = (formName: string, stepNumber: number) => {
  trackEvent('form_step_complete', EventCategory.FORM, formName, stepNumber);
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', EventCategory.ENGAGEMENT, `${buttonName} - ${location}`);
};

export const trackLinkClick = (linkText: string, url: string) => {
  trackEvent('link_click', EventCategory.NAVIGATION, linkText, undefined, { destination: url });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('download', EventCategory.CONVERSION, fileName, undefined, { file_type: fileType });
};

export const trackPaymentInitiated = (amount: number, currency: string = 'INR') => {
  trackEvent('payment_initiated', EventCategory.CONVERSION, currency, amount);
};

export const trackPaymentCompleted = (amount: number, currency: string = 'INR', paymentId?: string) => {
  trackEvent('payment_completed', EventCategory.CONVERSION, currency, amount, { payment_id: paymentId });
};

export const trackTelegramConnect = (success: boolean = true) => {
  trackEvent(
    success ? 'telegram_connect_success' : 'telegram_connect_failure', 
    EventCategory.CONVERSION
  );
};

// Declare global gtag function types
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
