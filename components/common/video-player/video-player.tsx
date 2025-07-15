
"use client"

import { useRef, useState } from 'react';

interface HeroVideoProps {
  src:   string;   
  poster: string;  
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  className = '',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}
    >
      {/* actual video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={isPlaying}        /* reveal default controls after click */
        onEnded={() => setIsPlaying(false)}
      />

      {/* translucent gradient for readability (optional) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

      {/* big play button – hidden once we’re playing */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="group absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-indigo-600 transition group-hover:scale-105 group-hover:bg-white">
            {/* play icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10 translate-x-[2px]" /* nudge for optical centering */
            >
              <path d="M5 3.98v16.04c0 1.1 1.19 1.79 2.15 1.24l13.32-8.02a1.43 1.43 0 0 0 0-2.48L7.15 2.74A1.43 1.43 0 0 0 5 3.98Z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}