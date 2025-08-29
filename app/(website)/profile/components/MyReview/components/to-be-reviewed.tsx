import React from 'react';
import ReviewCard from './review-card';
import ReviewLoader from './review-loader';
import { AlertCircle } from 'lucide-react';
import useFetchData from '@/hooks/use-fetch';
import { ReviewsResponse } from '@/types/reviews';

const ToBeReviewed: React.FunctionComponent = () => {

    const { data, loading, error, refetch } = useFetchData<ReviewsResponse[]>('unreviews/', true)

    return (
        <section className='flex flex-col gap-4'>
            {
                loading ? (
                    <ReviewLoader />
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
                    <div>
                        No items to be reviewed.
                    </div>
                ) : (
                    <div>
                        {
                            data?.map((item) => (
                                <ReviewCard
                                    key={item.id}
                                    image={item.product.images[0].file}
                                    description={item.product.general_description}
                                    name={item.product.name}
                                    slug={item.product.slug_name}
                                    onReviewSave={refetch}
                                />
                            ))
                        }
                    </div>
                )
            }
        </section>

    )
}

export default ToBeReviewed