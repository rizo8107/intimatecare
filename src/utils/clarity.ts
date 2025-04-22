/**
 * Microsoft Clarity utility functions
 * Uses the global clarity object that's loaded via the script tag in index.html
 */

// Define the window interface with Clarity
declare global {
  interface Window {
    clarity?: {
      (command: string, ...args: any[]): void;
      q?: any[];
    };
  }
}

/**
 * Initialize Microsoft Clarity with the provided project ID
 * Note: This is a backup initialization in case the script in index.html fails
 * @param projectId The Microsoft Clarity project ID
 */
export const initClarity = (projectId: string = 'r7wazclxab'): void => {
  try {
    // Check if clarity is already loaded via the script tag
    if (typeof window.clarity === 'undefined') {
      console.log('⚠️ Clarity not found on window object, initializing manually');
      
      // Create the clarity function if it doesn't exist
      window.clarity = function(c, l, a, r, i, t, y) {
        // Store arguments in clarity queue
        window.clarity.q = window.clarity.q || [];
        window.clarity.q.push(arguments);
      };
      
      // Load the script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${projectId}`;
      
      // Append to head
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
        console.log('✅ Microsoft Clarity script added to DOM');
      } else {
        document.head.appendChild(script);
        console.log('✅ Microsoft Clarity script added to head');
      }
    } else {
      console.log('✅ Microsoft Clarity already initialized via script tag');
    }
  } catch (error) {
    console.error('❌ Error initializing Microsoft Clarity:', error);
  }
};

/**
 * Track a custom event in Clarity
 * @param eventName The name of the event to track
 * @param data Optional data to include with the event
 */
export const trackClarityEvent = (eventName: string, data?: Record<string, any>): void => {
  try {
    if (window.clarity) {
      window.clarity('event', eventName, data || {});
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('📊 Clarity event tracked:', eventName, data);
      }
    } else {
      console.warn('⚠️ Clarity not available for tracking event:', eventName);
    }
  } catch (error) {
    console.error('❌ Error tracking Clarity event:', error);
  }
};

export default {
  init: initClarity,
  trackEvent: trackClarityEvent
};
