import Image from 'next/image';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import ReviewModal from './review-modal';
import { ReviewCardProps } from '@/types/profile';

const ReviewCard: React.FunctionComponent<ReviewCardProps> = ({ image, description, name, slug, onReviewSave }) => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

    return (
        <div className='card flex justify-between items-center gap-4 lg:px-5'>
            <div className='flex gap-2 md:gap-4 flex-1'>
                <div className='flex justify-center items-center'>
                    <div className=' w-14 h-14 md:w-20 md:h-20 relative shrink-0'>
                        <Image
                            fill
                            className="object-cover rounded"
                            src={image}
                            alt='Product_Image'
                        />
                    </div>
                </div>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} className='font-medium self-center line-clamp-1 w-[80%] text-sm md:text-base '>
                </p>
            </div>
            <button
                onClick={() => setIsReviewModalOpen(!isReviewModalOpen)}
                className='
                bg-primary text-white px-2.5 py-1 sm:px-5 sm:py-2 md:px-8 md:py-2.5 rounded-sm
                 cursor-pointer text-sm md:text-base font-medium
                 '>
                Leave a review
            </button>
            <ReviewModal
                isModalOpen={isReviewModalOpen}
                setIsModalOpen={setIsReviewModalOpen}
                title={name}
                image={image}
                description={description}
                slug={slug}
                onReviewSave={onReviewSave}
            />
        </div>
    )
}

export default ReviewCard