"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import image1 from "@/assets/Rectangle 11.png";
// import heroImage2 from "@/assets/temp-images/heroImage2.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import useFetchData from "@/hooks/use-fetch";



export interface HeroSectionResponse {
  id: number
  categories: Category[]
  image: string
  banner_type: string
  title: string
  subtitle: string
  is_active: boolean
  page: any
}
export interface Category {
  id: number
  name: string
}
// const slides = [
//   {
//     id: 1,
//     title: "",
//     description: "",
//     image: image1,
//     buttonText: "",
//   },
//   {
//     id: 2,
//     title: "Transform Your Workspace",
//     description:
//       "Experience the perfect blend of style and functionality. Our premium collection brings comfort and elegance to every corner of your office space.",
//     image: heroImage2,
//     buttonText: "EXPLORE COLLECTION",
//   },
//   {
//     id: 3,
//     title: "Wellness Meets Design",
//     description:
//       "Prioritize health without compromising aesthetics. Our wellness-focused furniture elevates your productivity with mindful comfort and modern design.",
//     image: heroImage2,
//     buttonText: "DISCOVER MORE",
//   },
// ];

export default function HeroSection() {


  const { data, loading, error } = useFetchData<HeroSectionResponse[]>(
    "/cms/banner-general/"
  )

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api || isHovered) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <section className="relative h-60 md:h-[500px] px-5 py-10 padding-x bg-[#FAFAFA] sm:h-[500px] lg:h-[calc(100vh-130px)]">
      {loading ? (
        <p className="text-sm text-center text-muted-foreground">
          Loading Banners
        </p>
      ) : error ? (
        <p className="text-sm font-medium text-center text-red-500">
          Something Went Wrong While Fetching Banners
        </p>
      ) : data?.length === 0 ? (
        <p className="text-sm text-center text-muted-foreground">
          No Banners
        </p>
      ) : (
        <Carousel
          setApi={setApi}
          className="w-full h-full"
          opts={{ align: "start", loop: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <CarouselContent className="w-full md:h-[500px] lg:h-[calc(100vh-130px)]">
            {data?.map((slide, index) => (
              <CarouselItem key={slide.id} className="h-full overflow-hidden rounded-md ">
                <div className="relative  h-36 md:h-96   lg:h-[80%]  overflow-hidden rounded-md">
                  <div className="absolute inset-0 ">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt=""
                      fill
                      className="object-cover rounded-md "
                      priority={index === 0}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Slider arrow section*/}
          <div className="absolute flex flex-row bottom-2">
            <CarouselPrevious className="absolute w-[17px] hidden lg:flex text-[#333333] hover:bg-transparent hover:text-foreground left-4 border-none shadow-none bg-transparent" />
            <CarouselNext className="absolute w-[17px] hidden lg:flex text-[#333333] hover:bg-transparent hover:text-foreground left-16 border-none shadow-none bg-transparent" />
          </div>

          <div className="absolute right-0 z-20 flex space-x-2 -translate-x-1/2 -bottom-4 md:right-0 lg:bottom-2 lg:right-0">
            {data?.map((_, i) => (
              <button
                key={i}
                className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ${i === current
                  ? "bg-red-500 scale-110 h-[10px] w-[15px]"
                  : "bg-[#7A7A7A] hover:bg-white/70"
                  }`}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </Carousel>)}
    </section>
  );
}
