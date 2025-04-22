import clarity from 'clarity-js';

// Define the Clarity interface to match the actual API
interface ClarityInterface {
  start: (config: {
    projectId: string;
    upload?: string;
    delay?: number;
    track?: boolean;
    content?: boolean;
    ip?: boolean;
    cookies?: string[];
    lean?: boolean;
  }) => void;
  event?: (name: string, data?: Record<string, any>) => void;
}

// Cast clarity to the correct interface
const clarityInstance = clarity as unknown as ClarityInterface;

/**
 * Initialize Microsoft Clarity with the provided project ID
 * @param projectId The Microsoft Clarity project ID
 */
export const initClarity = (projectId: string = 'r7wazclxab'): void => {
  try {
    clarityInstance.start({
      projectId,
      upload: 'https://www.clarity.ms/collect',
      delay: 500, // Small delay to ensure page loads properly first
      track: true,
      content: true,
      ip: true,
      cookies: ['_clck', '_clsk'],
      lean: false // Set to true for reduced data collection
    });
    
    console.log('✅ Microsoft Clarity initialized successfully');
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
    if (clarityInstance && typeof clarityInstance.event === 'function') {
      clarityInstance.event(eventName, data);
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('📊 Clarity event tracked:', eventName, data);
      }
    }
  } catch (error) {
    console.error('❌ Error tracking Clarity event:', error);
  }
};

export default {
  init: initClarity,
  trackEvent: trackClarityEvent
};
