import React from 'react';
import BeautyVideoContent from './beauty-video-card';
import VideoImage1 from "@/assets/temp-images/videoImage1.png";
import VideoImage2 from "@/assets/temp-images/videoImage2.png";
import VideoImage3 from "@/assets/temp-images/VideoImage3.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';

const BeautyVideosList = [
  { src: null, poster: VideoImage1 },
  { src: null, poster: VideoImage2 },
  { src: null, poster: VideoImage3 },
];

const BeautyVideoSection: React.FunctionComponent = () => {
  return (
    <section className="padding space-y-4">
      <div className="relative w-full">
        <Carousel>
          <CarouselContent className="flex gap-7">
            {BeautyVideosList.map((video, index) => (
              <CarouselItem
                key={index}
                className="basis-[45%] sm:basis-1/2 md:basis-[32%] lg:basis-[32%]">
                <BeautyVideoContent
                  src={video.src}
                  poster={video.poster}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default BeautyVideoSection;
