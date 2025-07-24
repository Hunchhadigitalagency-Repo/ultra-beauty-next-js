import React from "react";
import VideoPlayer from "@/components/common/video-player/video-player";

const KnowYourProductTabContent = () => {
  return (
    <div>
      <VideoPlayer
        src="/assets/desk-scene.mp4"
        poster="/assets/desk-scene-poster.jpg"
        className="aspect-video" /* 16 : 9, can switch to aspect-[4/3] etc. */
      />
    </div>
  );
};

export default KnowYourProductTabContent;
