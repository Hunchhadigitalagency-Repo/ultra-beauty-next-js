"use client";

import { useEffect, useState } from "react";
import TeamCard from "@/components/common/cards/team-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import useFetchData from "@/hooks/use-fetch";
import { ITeam } from "@/types/cms";

const TeamCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { data: teamMembers } = useFetchData<ITeam[]>('/cms/our-team/dropdown/')
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <div className="space-y-8">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className="">
          {teamMembers?.map((member) => (
            <CarouselItem
              key={member.id}
              className=" basis-full md:basis-1/2"
            >
              <TeamCard {...member} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Page indicator */}
      {/* Slide Indicators - positioned inside the image */}
      <div className="flex items-center justify-center gap-4">
       {teamMembers &&
  teamMembers
    .slice(0, teamMembers.length - 1)
    .map((_, slideIndex) => (
      <button
        key={slideIndex}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          slideIndex === current
            ? "bg-orange-500 scale-110"
            : "bg-[#BBBDBC] hover:bg-[#BBBDBC]/70"
        }`}
        onClick={() => api?.scrollTo(slideIndex)}
        aria-label={`Go to slide ${slideIndex + 1}`}
      />
    ))}

      </div>
    </div>
  );
};

export default TeamCarousel;
