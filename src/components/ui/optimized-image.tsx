import { useState, useEffect, useRef } from 'react';
import useLazyLoad from '../../hooks/useLazyLoad';
import useResponsiveImage from '../../hooks/useResponsiveImage';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
  lazyLoad?: boolean;
  blurEffect?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderColor = 'transparent',
  lazyLoad = true,
  blurEffect = false,
  objectFit = 'cover',
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  // Use responsive image hook to get the best image source for the device
  const responsiveImageSrc = useResponsiveImage({
    src,
    sizes: {
      small: 640,
      medium: 1280,
      large: width && width > 1280 ? width : 1920
    }
  });
  const [imageSrc, setImageSrc] = useState('');
  const { ref, isVisible } = useLazyLoad({
    rootMargin: '200px 0px', // Start loading 200px before the image enters the viewport
    triggerOnce: true
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    containerRef.current = element;
    if (ref.current !== null) {
      (ref as any).current = element;
    }
  };

  useEffect(() => {
    // Only process the image when it becomes visible or if lazy loading is disabled
    if (isVisible || !lazyLoad) {
      // Reset loaded state when src changes
      setIsLoaded(false);
      
      // Use the responsive image source determined by our hook or fallback to original src
      setImageSrc(responsiveImageSrc || src);
    }
  }, [src, responsiveImageSrc, isVisible, lazyLoad]);
  
  // Separate effect for image loading
  useEffect(() => {
    if (imageSrc) {
      // Preload the image
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        setIsLoaded(true);
      };
    }
  }, [imageSrc]);

  // Determine aspect ratio style
  const aspectRatioStyle = width && height ? { aspectRatio: `${width}/${height}` } : {};

  return (
    <div 
      ref={setRefs}
      className={`relative overflow-hidden ${className}`} 
      style={aspectRatioStyle}
    >
      {/* Placeholder/background while image loads - transparent by default */}
      <div 
        className={`absolute inset-0 ${blurEffect && !isLoaded ? 'blur-sm' : ''}`}
        style={{ backgroundColor: placeholderColor }}
      />
      
      {/* Actual image */}
      <img
        src={imageSrc || src} // Use original src as fallback
        alt={alt}
        width={width}
        height={height}
        loading={lazyLoad ? "lazy" : "eager"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // If optimized image fails, fall back to original source
          if (imageSrc !== src) {
            setImageSrc(src);
          }
          setIsLoaded(true); // Still mark as loaded so something displays
        }}
        className={`relative w-full h-auto transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
