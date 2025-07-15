"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import SectionHeader from "../header/section-header";
import RecommendationCard from "../cards/recommendation-card";
import { IRecommendation } from "@/types/website";

const RECOMMENDATIONS: IRecommendation[] = [
  {
    id: 1,
    name: "Dr. Hemanta Jung Karki",
    specialty: "Dermatology Expert",
    institution: "Neuro College of Medical Science",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 2,
    name: "Dr. Anjali Shrestha",
    specialty: "Cardiology Expert",
    institution: "Kathmandu Heart Center",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 3,
    name: "Dr. Rajendra Thapa",
    specialty: "Neurology Expert",
    institution: "National Neuroscience Institute",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 4,
    name: "Dr. Sita Gurung",
    specialty: "Orthopedic Expert",
    institution: "Everest Hospital",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 5,
    name: "Dr. Mina Pandey",
    specialty: "Psychiatry Expert",
    institution: "Nepal Mental Health Institute",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 6,
    name: "Dr. Ravi Acharya",
    specialty: "Pediatrics Expert",
    institution: "Child Care Hospital",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 7,
    name: "Dr. Krishna Bahadur",
    specialty: "General Medicine",
    institution: "Tribhuvan University Hospital",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 8,
    name: "Dr. Sunita Rai",
    specialty: "Gynecology Expert",
    institution: "Women's Health Center",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 9,
    name: "Dr. Binod Sharma",
    specialty: "Ophthalmology Expert",
    institution: "Eye Care Institute",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
  {
    id: 10,
    name: "Dr. Kamala Thapa",
    specialty: "Endocrinology Expert",
    institution: "Diabetes Care Center",
    imageSrc:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
  },
];

export default function RecommendationCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <section className="space-y-6 padding">
 <SectionHeader
  title="Recommended By Medical Expert"
  description="See how people are recommending the product of basera by medical expert"
  className="items-center text-center md:items-start md:text-left"
/>


      <div className="relative">
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
          <CarouselContent className="-ml-2 md:-ml-4">
            {RECOMMENDATIONS.map((doc) => (
              <CarouselItem
                key={doc.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <RecommendationCard {...doc} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
        </Carousel>

        {/* Page indicator */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-xl text-gray-500">
            {String(current).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
