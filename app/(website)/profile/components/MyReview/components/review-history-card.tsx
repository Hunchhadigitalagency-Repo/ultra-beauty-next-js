import React from 'react';
import Image from 'next/image';
import { ReviewHistoryCardProps } from '@/types/profile';
import RatingStars from '@/components/common/product/rating-stars';


const ReviewHistoryCard: React.FunctionComponent<ReviewHistoryCardProps> = ({ image, product, rating, review }) => {

    return (
        <div className='flex flex-col gap-3 lg:px-5'>
            <div className='flex gap-5'>
                <div className=' flex justify-center items-center'>
                    <div className='w-14 h-14 md:w-20 md:h-20 relative shrink-0'>
                        <Image
                            layout='fill'
                            src={image}
                            alt='Product Image'
                            className='rounded-sm object-cover'

                        />
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    <p className='font-medium break-words text-sm md:text-base'>{product}</p>
                    <div className='flex gap-5 flex-wrap'>
                        <RatingStars rating={rating} />
                        <p className='text-xs sm:text-sm md:text-base font-semibold text-[#5D5D5D]'>{rating} out of 5</p>
                    </div>
                </div>
            </div>
            <div>
                <p className='text-sm md:text-base font-semibold text-[#5D5D5D]'>Review Detail</p>
                <div className='p-2 border-[1px] bg-white border-[#E2E2E2]'>
                    <p className='font-medium break-words text-sm md:text-base'>
                        {review}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReviewHistoryCard