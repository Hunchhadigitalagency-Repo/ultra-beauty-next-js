"use client";

import { useEffect, useRef, useState } from "react";

export default function ProductDescription({
  detail_description,
  title,
  youtube_link,
}: {
  detail_description: string;
  title: string;
  youtube_link?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [expandedText, setExpandedText] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    setShowButton(contentRef?.current.scrollHeight > contentRef?.current.clientHeight);
  }, [detail_description]);

  const getYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const videoIdMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&\n?#]+)/
      );
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      }
      return null;
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return null;
    }
  };

  const embedUrl = youtube_link ? getYouTubeEmbedUrl(youtube_link) : null;

  const EmptyState = () => (
    <div className="mt-10 bg-white rounded-2xl shadow-sm p-8 text-center">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">
        No {title} yet
      </h2>
    </div>
  );

  if (!detail_description) return <EmptyState />;

  return (
    <div className="bg-white rounded-2xl px-6 mt-0">
      <div
        ref={contentRef}
        className={`rendered-content prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed transition-all duration-300 
       font-poppins text-base ${expandedText ? "" : "line-clamp-5"}
          `}
        dangerouslySetInnerHTML={{ __html: detail_description }}
      />
      {showButton && (
        <div
          onClick={() => setExpandedText(!expandedText)}
          className="text-base font-medium cursor-pointer text-primary hover:text-primary hover:underline"
        >
          {expandedText ? "Show Less" : "Read More"}
        </div>
      )}
      {/* YouTube Video Section */}
      {embedUrl && (
        <div className="mt-8 w-3/4 m-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Product Video
          </h3>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={embedUrl}
              title={`${title} - Product Video`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {youtube_link && !embedUrl && (
        <div className="mt-8 w-3/4 h-[500px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Product Video
          </h3>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm mb-2">
              Unable to embed video. View it directly:
            </p>
            <a
              href={youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline break-all"
            >
              {youtube_link}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}