import React from 'react'
import { AlertCircle } from 'lucide-react'
import useFetchData from '@/hooks/use-fetch'
import { ReviewsResponse } from '@/types/reviews'
import ReviewHistoryCard from './review-history-card'
import ReviewHistoryLoader from './review-history-loader'

const ReviewHistory: React.FunctionComponent = () => {

    const { data, loading, error } = useFetchData<ReviewsResponse[]>('reviews', true);

    return (
        <div>
            {
                loading ? (
                    <ReviewHistoryLoader />
                ) : error ? (
                    <div className='flex flex-col py-10 justify-center items-center'>
                        <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
                        <p className="font-medium text-gray-700">
                            Oops! Something went wrong.
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            We couldn’t load the review history data. Please try again.
                        </p>
                    </div>
                ) : data?.length === 0 ? (
                    <div>No Reviews Yet</div>
                ) : (
                    <div className='flex flex-col gap-5'>
                        {
                            data?.map((item) => (
                                <ReviewHistoryCard
                                    key={item.id}
                                    image={item.product.images[0].file}
                                    product={item.product.name}
                                    rating={item.rating}
                                    review={item.review}
                                />
                            ))
                        }
                    </div>
                )}
        </div>
    )
}

export default ReviewHistory