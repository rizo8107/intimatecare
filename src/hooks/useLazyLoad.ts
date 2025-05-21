import { useEffect, useRef, useState } from 'react';

interface UseLazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * A custom hook for lazy loading elements when they enter the viewport
 * @param options - Intersection Observer options
 * @returns An object containing the ref to attach to the element and whether it's visible
 */
const useLazyLoad = ({
  rootMargin = '200px 0px',
  threshold = 0.1,
  triggerOnce = true
}: UseLazyLoadOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Disconnect the previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        // Update visibility state when intersection changes
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // If triggerOnce is true, disconnect the observer after the element becomes visible
          if (triggerOnce && observerRef.current && elementRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    // Start observing the element if it exists
    const currentElement = elementRef.current;
    if (currentElement && observerRef.current) {
      observerRef.current.observe(currentElement);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (observerRef.current && currentElement) {
        observerRef.current.unobserve(currentElement);
        observerRef.current.disconnect();
      }
    };
  }, [rootMargin, threshold, triggerOnce]);

  return { ref: elementRef, isVisible };
};

export default useLazyLoad;
