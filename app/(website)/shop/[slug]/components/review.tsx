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
  <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
    <Star className="w-10 h-10 mx-auto text-gray-300 mb-4" />
    <h2 className="text-xl font-semibold mb-2 text-gray-900">No reviews yet</h2>
    <p className="text-gray-500">Be the first to review this product</p>
  </div>
);

export default function ReviewsComponent({ reviews }: ReviewsComponentProps) {
  if (!reviews?.length) return <EmptyState />;

  return (
    <div className="space-y-6">
      {reviews.map((r) => (
        <Card key={r.id} className="bg-white rounded-2xl shadow-md">
          <CardContent className="flex flex-col md:flex-row gap-4 p-6">
            {/* Avatar and user info */}
            <div className="flex flex-col items-center md:items-start md:w-[150px] gap-2">
              <Avatar className="w-16 h-16">
                <AvatarImage src={r.user.profile_picture} />
                <AvatarFallback>{r.user.name[0]}</AvatarFallback>
              </Avatar>
              <p className="font-semibold text-lg text-gray-900 text-center md:text-left">{r.user.name}</p>
              <RatingStars rating={r.rating} />
            </div>

            {/* Review text and image */}
            <div className="flex-1 flex flex-col gap-3">
              <p className="text-gray-700 text-base">{r.review}</p>

              {r.picture && (
                <div className="w-full rounded-lg overflow-hidden">
                  <Image
                    src={r.picture}
                    alt="review image"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
              )}

              <p className="text-sm text-gray-400">{new Date(r.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
