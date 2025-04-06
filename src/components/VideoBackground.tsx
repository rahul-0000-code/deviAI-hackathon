
import { useState, useEffect } from "react";

interface VideoBackgroundProps {
  children?: React.ReactNode;
  overlayOpacity?: number;
  videoSrc?: string;
  className?: string;
}

export default function VideoBackground({ 
  children, 
  overlayOpacity = 0.5,
  videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-technology-networks-and-connections-background-7682-large.mp4",
  className = ""
}: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading video
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={videoSrc}
        onLoadedData={() => setIsLoaded(true)}
      >
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-background" 
        style={{ opacity: overlayOpacity }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0">
        <div className="absolute size-16 rounded-full bg-primary/5 blur-3xl animate-float top-1/4 left-1/4"></div>
        <div className="absolute size-32 rounded-full bg-primary/5 blur-3xl animate-float [animation-delay:2s] top-3/4 right-1/4"></div>
        <div className="absolute size-24 rounded-full bg-primary/10 blur-3xl animate-float [animation-delay:4s] bottom-1/4 right-1/3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
