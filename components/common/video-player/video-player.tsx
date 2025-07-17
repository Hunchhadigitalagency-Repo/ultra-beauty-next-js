"use client"
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
interface HeroVideoProps {
  src: string;
  poster: string;
  className?: string;
}
const isUtubeVideo = (url: string) => {
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(url);
};
const getUTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return url;
};
export default function VideoPlayer({
  src,
  poster,
  className = "",
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isYouTube, setIsYouTube] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  useEffect(() => {
    if (isUtubeVideo(src)) {
      setIsYouTube(true);
      setEmbedUrl(getUTubeEmbedUrl(src));
    } else {
      setIsYouTube(false);
    }
    setIsPlaying(false);
  }, [src]);
  const togglePlay = () => {
    if (isYouTube) {
      setIsPlaying(true);
      return;
    }
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
      {isYouTube ? (
        <>
          {!isPlaying && (
            <>
              <Image
                height={100}
                width={100}
                src={poster}
                alt="Video Poster"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={togglePlay}
                className="group absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-indigo-600 transition group-hover:scale-105 group-hover:bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10 translate-x-[2px]"
                  >
                    <path d="M5 3.98v16.04c0 1.1 1.19 1.79 2.15 1.24l13.32-8.02a1.43 1.43 0 0 0 0-2.48L7.15 2.74A1.43 1.43 0 0 0 5 3.98Z" />
                  </svg>
                </div>
              </button>
            </>
          )}
          {isPlaying && (
            <iframe
              src={embedUrl}
              title="YouTube Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={src}
            poster={poster}
            preload="metadata"
            playsInline
            controls={isPlaying}
            onEnded={() => setIsPlaying(false)}
          />
          {!isPlaying && (
            <>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play video"
                className="group absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-indigo-600 transition group-hover:scale-105 group-hover:bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10 translate-x-[2px]"
                  >
                    <path d="M5 3.98v16.04c0 1.1 1.19 1.79 2.15 1.24l13.32-8.02a1.43 1.43 0 0 0 0-2.48L7.15 2.74A1.43 1.43 0 0 0 5 3.98Z" />
                  </svg>
                </div>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}










