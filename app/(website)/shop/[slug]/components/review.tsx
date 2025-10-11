"use client";
import RatingStars from "@/components/common/product/rating-stars";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  Star } from "lucide-react";
import Image from "next/image";

interface ReviewsComponentProps {
  reviews: any[];
  showAll?: boolean;
}


export const dummyReviews = [
  {
    id: "1",
    rating: 5,
    review: "Absolutely loved this product! Great quality and fast delivery. Highly recommended.",
    picture: "/images/reviews/review1.jpg",
    created_at: "2025-08-10T14:30:00Z",
    user: {
      name: "Alice Johnson",
      profile_picture: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    id: "2",
    rating: 4,
    review: "Good value for money. The packaging could be better, but overall satisfied.",
    picture: "",
    created_at: "2025-08-12T09:15:00Z",
    user: {
      name: "Brian Smith",
      profile_picture: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  },
  {
    id: "3",
    rating: 3,
    review: "It's okay. Works as expected but I had higher expectations from the brand.",
    picture: "",
    created_at: "2025-08-15T18:45:00Z",
    user: {
      name: "Charlie Davis",
      profile_picture: "",
    },
  },
  {
    id: "4",
    rating: 5,
    review: "Exceeded my expectations! Customer service was also fantastic.",
    picture: "/images/reviews/review2.jpg",
    created_at: "2025-08-18T11:20:00Z",
    user: {
      name: "Diana Lopez",
      profile_picture: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  },
  {
    id: "5",
    rating: 2,
    review: "Not worth the price. Had some issues within the first week of use.",
    picture: "",
    created_at: "2025-08-20T07:50:00Z",
    user: {
      name: "Ethan Brown",
      profile_picture: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  },
];

// const formatDate = (date: string) =>
//   new Date(date).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

const EmptyState = () => (
  <div className=" bg-white rounded-2xl shadow-sm p-8 text-center">
    <Star className="w-10 h-10 mx-auto text-gray-300 mb-4" />
    <h2 className="text-xl font-semibold mb-2 text-gray-900">No reviews yet</h2>
    <p className="text-gray-500">Be the first to review this product</p>
  </div>
);

export default function ReviewsComponent({ reviews,  }: ReviewsComponentProps) {

  if (!reviews.length) return <EmptyState />;


  return (
    <div className="bg-white rounded-2xl p-6">
      {/* Reviews Marquee */}
      <div className="mb-8 overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          {reviews?.map((r, i) => (
            <Card key={`${r.id}-${i}`} className="w-[300px] shrink-0 hover:shadow-md">
              <CardContent className="w-full">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={r.user.profile_picture} />
                    <AvatarFallback>{r.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[18px] truncate">{r.user.name}</p>
                    <RatingStars rating={r.rating} />
                  </div>
                </div>
                <p className="text-[15px] text-gray-700 line-clamp-3 mb-4">{r.review}</p>
                {r.picture && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <Image
                      src={r.picture}
                      alt="review image"
                      width={300}
                      height={200}
                      className="w-full h-35 object-contain rounded-md"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}