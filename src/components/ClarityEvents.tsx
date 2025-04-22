import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackClarityEvent } from '@/utils/clarity';

/**
 * Component to track page views and important events with Microsoft Clarity
 * This component doesn't render anything visible
 */
const ClarityEvents = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    // Track page view when route changes
    trackClarityEvent('page_view', {
      path: location.pathname,
      search: location.search,
      title: document.title
    });
  }, [location]);

  return null;
};

/**
 * Track form interaction events
 * @param formName Name of the form being interacted with
 * @param step Step number or name
 * @param action Action being performed (start, complete, submit)
 * @param success Whether the action was successful
 */
export const trackFormEvent = (
  formName: string,
  step?: number | string,
  action: 'start' | 'step' | 'complete' | 'submit' = 'start',
  success: boolean = true
) => {
  trackClarityEvent('form_interaction', {
    form_name: formName,
    step,
    action,
    success,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track button click events
 * @param buttonName Name or text of the button
 * @param location Where the button is located
 */
export const trackButtonClick = (buttonName: string, location: string) => {
  trackClarityEvent('button_click', {
    button_name: buttonName,
    location,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track Telegram interaction events
 * @param action The action performed (login, connect, etc.)
 * @param success Whether the action was successful
 */
export const trackTelegramEvent = (
  action: 'login' | 'connect' | 'verify',
  success: boolean = true
) => {
  trackClarityEvent('telegram_interaction', {
    action,
    success,
    timestamp: new Date().toISOString()
  });
};

export default ClarityEvents;
