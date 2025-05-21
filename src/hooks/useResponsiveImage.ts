import { useState, useEffect, useCallback } from 'react';

interface ResponsiveImageOptions {
  src: string;
  sizes?: {
    small?: number;
    medium?: number;
    large?: number;
  };
  formats?: string[];
}

/**
 * A hook that returns the most appropriate image source based on screen size and browser support
 * @param options Configuration options for responsive images
 * @returns The optimized image source
 */
// Check for WebP support - run once and cache the result
let webpSupportPromise: Promise<boolean> | null = null;
const checkWebpSupport = (): Promise<boolean> => {
  if (!webpSupportPromise) {
    webpSupportPromise = new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    });
  }
  return webpSupportPromise;
};

const useResponsiveImage = ({
  src,
  sizes = {
    small: 640,
    medium: 1280,
    large: 1920
  },
  formats = ['webp', 'jpg', 'png']
}: ResponsiveImageOptions) => {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  
  // Function to get the optimized image path
  const getOptimizedImagePath = useCallback(async () => {
    // Skip optimization for external images
    if (!src || (src.startsWith('http') && !src.includes(window.location.hostname))) {
      setOptimizedSrc(src);
      return;
    }
    
    try {
      // Determine screen size category
      const screenWidth = window.innerWidth;
      let sizeCategory = 'large';
      
      if (screenWidth <= (sizes.small || 640)) {
        sizeCategory = 'small';
      } else if (screenWidth <= (sizes.medium || 1280)) {
        sizeCategory = 'medium';
      }
      
      // Extract filename and extension
      const fileName = src.split('/').pop() || '';
      const fileNameWithoutExt = fileName.split('.')[0];
      const originalExt = fileName.split('.').pop() || '';
      
      // Check for WebP support
      const supportsWebP = await checkWebpSupport();
      
      // Determine best format
      let bestFormat = supportsWebP && formats.includes('webp') ? 'webp' : originalExt;
      
      // Use original format if not in our supported formats
      if (!formats.includes(bestFormat)) {
        bestFormat = formats[0];
      }
      
      // For local development, just return the original src since optimized images might not exist yet
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setOptimizedSrc(src);
        return;
      }
      
      // Construct optimized path
      const optimizedPath = `/optimized/${fileNameWithoutExt}-${sizeCategory}.${bestFormat}`;
      
      // Check if the optimized file exists
      try {
        const response = await fetch(optimizedPath, { method: 'HEAD' });
        if (response.ok) {
          setOptimizedSrc(optimizedPath);
        } else {
          // Fallback to original
          setOptimizedSrc(src);
        }
      } catch (error) {
        // If error, use original
        setOptimizedSrc(src);
      }
    } catch (error) {
      // If any error occurs, use the original source
      setOptimizedSrc(src);
    }
  }, [src, sizes, formats]);
  
  useEffect(() => {
    getOptimizedImagePath();
  }, [getOptimizedImagePath]);
  
  return optimizedSrc;
};

export default useResponsiveImage;
