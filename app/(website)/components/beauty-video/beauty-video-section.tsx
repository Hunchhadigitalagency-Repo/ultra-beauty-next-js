import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import BeautyVideoContent from './beauty-video-card';

const BeautyVideosList = [
  { src: "https://www.youtube.com/watch?v=8guP6F56TPk", poster: "https://images.unsplash.com/photo-1682687220509-61b8a906ca19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { src: "https://www.youtube.com/watch?v=8guP6F56TPk", poster: "https://images.unsplash.com/photo-1682687220509-61b8a906ca19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { src: "https://www.youtube.com/watch?v=8guP6F56TPk", poster: "https://images.unsplash.com/photo-1682687220509-61b8a906ca19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
]

const BeautyVideoSection: React.FunctionComponent = () => {
  return (
    <section className="padding space-y-4">
      <div className="relative  w-full">
        <Carousel>
          <CarouselContent className="flex gap-7">
            {BeautyVideosList.map((video, index) => (
              <CarouselItem
                key={index}
                className="basis-[45%]   sm:basis-1/2 md:basis-[32%] lg:basis-[32%]">
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
  )
}

export default BeautyVideoSection