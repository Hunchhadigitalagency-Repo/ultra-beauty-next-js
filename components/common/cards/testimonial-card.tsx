
import { ITestimonial } from "@/types/cms";
import DOMPurify from "dompurify";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ITestimonialCard {
  testimonial: ITestimonial;
}

const TestimonialCard = ({ testimonial }: ITestimonialCard) => {

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
          }`}
      />
    ));

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

  return (
    <div className="relative bg-white rounded-lg  p-4 flex flex-col items-center text-center h-full border">
      {/* Quote icon in top-left */}
      <div className="absolute top-2 left-[38%] size-8 bg-primary rounded-full flex items-center justify-center">
        <Quote className="fill-white text-white size-4" />
      </div>

      {/* Avatar */}
      <div className="w-20 h-20 mb-4 rounded-lg overflow-hidden">
        <Image
          src={testimonial.image || "/placeholder.svg"}
          alt={testimonial.name}
          width={80}
          height={80}
          className="object-cover"
        />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">{renderStars(testimonial.rating)}</div>

      {/* Quote text */}
      <p
        className="text-muted-foreground text-sm mb-6"
      >&quot;{stripHtml(DOMPurify.sanitize(testimonial.message))}&quot;</p>

      {/* Author */}
      <div className="w-full">
        <h4 className="font-medium text-lg text-foreground">{testimonial.name}</h4>
        <p className="text-sm text-muted-foreground font-medium italic">
          {testimonial.designation}, {testimonial.company}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
