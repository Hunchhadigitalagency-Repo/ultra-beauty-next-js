"use client"
import { FaPlay } from "react-icons/fa";
import { useRef, useState } from 'react';
import { StaticImageData } from 'next/image';

interface HeroVideoProps {
  src: string | null;
  poster: string | StaticImageData | undefined;
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
        src={src === null ? undefined : src}
        poster={typeof poster === 'string' ? poster : poster?.src}
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
            <FaPlay className="text-primary w-6 h-6" />
          </div>
        </button>
      )}
    </div>
  );
}