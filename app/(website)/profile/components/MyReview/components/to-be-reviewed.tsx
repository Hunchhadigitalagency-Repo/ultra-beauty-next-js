import React from 'react';
import ReviewCard from './review-card';
import ReviewLoader from './review-loader';
import { AlertCircle } from 'lucide-react';
import useFetchData from '@/hooks/use-fetch';
import { Result } from '@/types/product';

const ToBeReviewed: React.FunctionComponent = () => {

    const { data, loading, error, refetch } = useFetchData<Result[]>('/unreviews', true)

    return (
        <section className='flex flex-col gap-4'>
            {
                loading ? (
                    <ReviewLoader />
                ) : error ? (
                    <div className='flex flex-col py-10 justify-center items-center'>
                        <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                        <p className=" text-sm font-extralight text-gray-400">
                            Oops! Something went wrong.
                        </p>
                        <p className="mt-1 text-sm font-extralight text-gray-400">
                            We couldn’t load the review history data. Please try again.
                        </p>
                    </div>
                ) : data && data.length > 0 ? (
                    data.map((item) => (
                        <ReviewCard
                            key={item.sku}
                            image={item.images?.[0]?.file || "/placeholder.png"}
                            name={item.name || "No Name"}
                            description={item.general_description || "No Description"}
                            slug={item.slug_name}
                            onReviewSave={refetch}
                        />
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center w-full h-60'>
                        <p className='font-extralight text-sm text-gray-400'>
                            No items to be reviewed.
                        </p>
                    </div>
                )}
        </section>

    )
}

export default ToBeReviewed