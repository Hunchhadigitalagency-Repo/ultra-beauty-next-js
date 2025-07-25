import React from 'react';
import VideoPlayer from '@/components/common/video-player/video-player';

const PromoVideoSection = () => {
  return (
    <div className='padding'>
      <VideoPlayer
        src="https://www.youtube.com/watch?v=sklbgVVs9LI"
        poster=""
        className="aspect-video" /* 16 : 9, can switch to aspect-[4/3] etc. */ />
    </div>
  )
}

export default PromoVideoSection