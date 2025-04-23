// Type definitions for Facebook Pixel
interface Window {
  fbq: (
    event: string,
    eventName: string,
    params?: {
      [key: string]: string | number | boolean | undefined;
    }
  ) => void;
  _fbq: {
    push: (args: unknown[]) => void;
    loaded: boolean;
    version: string;
    queue: unknown[];
  };
}
