import React, { useState } from 'react';
import Image from 'next/image';
import { ReviewCardProps } from '@/types/profile';
import ReviewModal from './review-modal';


const ReviewCard: React.FunctionComponent<ReviewCardProps> = ({ image, description }) => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false)


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
                <p className='font-medium self-center text-sm md:text-base '>
                    {description}
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
                title='Sleek Pregnancy Cushion with some random text abd long text'
                image='https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg'
                description='A product tha will help the Preganancy women to grow and some random text that fitx'
            />
        </div>
    )
}

export default ReviewCard