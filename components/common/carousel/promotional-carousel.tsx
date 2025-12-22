"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/use-fetch";
import { AlertCircle, Tag } from "lucide-react";
import subtractImage from "@/assets/Subtract.png";
import LoadingSpinner from "../loader/loading-spinner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { formatDateTime } from "@/lib/date-time-utils";
import SectionHeader from "../header/section-header";

interface PromotionalCarouselProps {
  id: number;
  coupon_type: string;
  name: string;
  title: string;
  subtitle: string;
  image: string;
  code: string;
  discount_percentage: string;
  commission_percentage: any;
  withdrawal_limit: any;
  expiry_date: string;
  products: any[];
  _influencers: any[];
  is_active: boolean;
  created_at: string;
  non_reusable: boolean;
}

export default function PromotionalCarousel() {
  const { data, loading, error } =
    useFetchData<PromotionalCarouselProps[]>("generalcoupons/");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
    }, 5000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <div className={`w-full padding`}>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <AlertCircle className="w-10 h-10 mb-2 text-gray-400" />
          <p className="text-sm font-extralight text-gray-400">
            Oops! Something went wrong...
          </p>
          <p className="mt-1 text-sm text-gray-500">
            We couldn’t load the coupons. Please try again.
          </p>
        </div>
      ) : !data || data.length === 0 || !data.some((slide) => slide.code) ? (
        // <--- remove carousel if no tickets (slide.code) exists
        <div className="flex flex-col items-center justify-center w-full h-60">
          <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm font-extralight text-gray-400 capitalize">
            Oops! no coupons right now...
          </p>
        </div>
      ) : (
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ align: "start", loop: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CarouselContent>
            {data?.map((slide, index) => (
              <CarouselItem key={slide.id}>
                <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden bg-gray-900">
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt="Promotional background"
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>

                  {/* Content overlay */}
                  <div className="relative flex flex-col lg:flex-row z-10 h-40 lg:h-full items-center gap-5 md:gap-9 justify-between p-3 md:p-12">
                    {/* Left side - Main title */}
                    <div className="flex-1 max-w-full">
                      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        <SectionHeader title={slide.title} titleClassName="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight" />
                      </h1>
                    </div>

                    {/* Right side - Ticket */}
                    {slide.code && (
                      <div className="relative w-full flex justify-center items-center md:w-auto ml-0 md:ml-6">
                        <div
                          className="relative rounded-2xl flex justify-start bg-center items-center px-24 py-12 shadow-2xl w-full h-[170px]  md:w-[596px] md:h-[234px]"
                          style={{
                            backgroundImage: `url(${subtractImage.src})`,
                          }}
                        >
                          <div className="flex justify-between items-center flex-col gap-2 md:gap-5 lg:gap-8">
                            <div className="text-left space-y-2 text-foreground">
                              <p className="text-sm font-medium">
                                {slide.subtitle}
                              </p>
                              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                                {slide.discount_percentage}
                              </div>
                            </div>

                            <div className="text-left">
                              <div className="py-1 rounded-md">
                                <code className="text-xl font-semibold">
                                  {slide.code}
                                </code>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {formatDateTime(slide.expiry_date)}
                              </p>
                            </div>
                          </div>

                          <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <Tag className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation dots */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {data?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === current
                            ? "bg-orange-400 scale-110"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
