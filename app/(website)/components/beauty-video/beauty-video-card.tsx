import React  from 'react';

interface BeautyVideoContentProps {
    src: string;
    poster?: string;
  }
  
  const BeautyVideoContent: React.FC<BeautyVideoContentProps> = ({ src, poster }) => {
    const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  
    if (isYouTube) {
      // Convert YouTube link to embed format
      const videoId = src.includes("watch?v=")
        ? src.split("watch?v=")[1]
        : src.split("/").pop();
  
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
   
  
      return (
        <div className="aspect-video w-full rounded-md overflow-hidden">
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
  
    // Local or direct video file
    return (
      <div className="w-full rounded-md overflow-hidden">
        <video
          src={src}
          poster={poster}
          controls
          className="w-full h-auto rounded"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default BeautyVideoContent;
  
