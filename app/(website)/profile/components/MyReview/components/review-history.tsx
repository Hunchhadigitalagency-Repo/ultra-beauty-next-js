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
                        <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="font-extralight text-sm text-gray-400">
                            Oops! Something went wrong.
                        </p>
                        <p className="mt-1 font-extralight text-sm text-gray-400">
                            We couldn’t load the review history data. Please try again.
                        </p>
                    </div>
                ) : data?.length === 0 ? (
                    <div className='flex flex-col items-center justify-center w-full h-60'>
                        <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                        <p className='font-extralight text-sm text-gray-400'>
                            No reviews yet
                        </p>
                    </div>
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