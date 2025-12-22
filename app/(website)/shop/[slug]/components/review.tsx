"use client";

import RatingStars from "@/components/common/product/rating-stars";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Image from "next/image";

interface ReviewsComponentProps {
  reviews: any[];
}

const EmptyState = () => (
  <div className="bg-gray-50 rounded-2xl shadow-md p-8 text-center border border-gray-200">
    <Star className="w-12 h-12 mx-auto text-gray-300 mb-4" />
    <h2 className="text-xl font-semibold mb-2 text-gray-900">No reviews yet</h2>
    <p className="text-gray-500">Be the first to review this product</p>
  </div>
);

export default function ReviewsComponent({ reviews }: ReviewsComponentProps) {
  if (!reviews?.length) return <EmptyState />;

  return (
    <div className="space-y-6 grid grid-cols-1 lg:grid-cols-2">
      {reviews.map((r) => (
        <Card
          key={r.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <CardContent className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
            <div className="flex flex-col items-center md:items-start md:w-[160px] gap-3">
              <Avatar className="w-16 h-16 border border-gray-200 shadow-sm">
                <AvatarImage src={r.user.profile_picture} />
                <AvatarFallback className="text-gray-600">{r.user.name[0]}</AvatarFallback>
              </Avatar>
              <p className="font-semibold text-lg text-gray-900 text-center md:text-left">{r.user.name}</p>
              <RatingStars rating={r.rating} />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <p className="text-gray-700 text-base leading-relaxed">{r.review}</p>

              {r.picture && (
                <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src={r.picture}
                    alt="review image"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-200 hover:scale-105"
                  />
                </div>
              )}

              <p className="text-sm text-gray-400 mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
