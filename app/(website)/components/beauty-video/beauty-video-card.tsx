'use client'
import React from 'react';
import { StaticImageData } from 'next/image';
import VideoPlayer from '@/components/common/video-player/video-player';

interface BeautyVideoContentProps {
  src: string;
  poster?: string | StaticImageData | undefined;
}

const BeautyVideoContent: React.FC<BeautyVideoContentProps> = ({ src, poster }) => {

  return (
    <div className="w-full rounded-md overflow-hidden">
      <VideoPlayer src={src} poster={typeof poster === 'string' ? poster : poster} />
    </div>
  );
};

export default BeautyVideoContent;

