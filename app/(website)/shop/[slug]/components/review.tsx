import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { ReviewsResponse } from "@/types/reviews";
import SectionHeader from "@/components/common/header/section-header";
import ReviewHistoryCard from "@/app/(website)/profile/components/MyReview/components/review-history-card";

interface ReviewProps {
    reviews: ReviewsResponse[];
}

const Review: React.FC<ReviewProps> = ({ reviews }) => {

    const initialCount = 3;
    const increment = 2;
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const displayedReviews = reviews.slice(0, visibleCount);
    const { profile } = useAppSelector((state) => state.authentication.profileDetails);

    const handleSeeMore = () => {
        setVisibleCount((prev) => Math.min(prev + increment, reviews.length));
    };

    const handleSeeLess = () => {
        setVisibleCount(initialCount);
    };


    return (
        <section className="">
            <SectionHeader
                title="Reviews"
                titleClassName="font-semibold"
            />
            <div>
                {displayedReviews.length > 0 ? (
                    displayedReviews.map((review) => (
                        <ReviewHistoryCard
                            key={review.id}
                            image={review.picture || profile?.profile_picture}
                            rating={review.rating}
                            review={review.review}
                            product={""} />
                    ))
                ) : (
                    <p className="font-poppins">
                        No reviews yet
                    </p>
                )}
            </div>

            <div className="flex gap-2 mt-2">
                {visibleCount < reviews.length && (
                    <button
                        onClick={handleSeeMore}
                        className="text-blue-600 hover:underline"
                    >
                        See More
                    </button>
                )}
                {visibleCount > initialCount && (
                    <button
                        onClick={handleSeeLess}
                        className="text-blue-600 hover:underline"
                    >
                        Show Less
                    </button>
                )}
            </div>
        </section>
    );
};

export default Review;
