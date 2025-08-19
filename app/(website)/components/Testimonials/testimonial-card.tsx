import React from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { MdFormatQuote } from 'react-icons/md';
import RatingStars from '@/components/common/product/rating-stars';

interface TestimonialResponse {
    id?: number
    name: string
    company?: string
    designation?: string
    message: string
    image: string
    rating: number
    is_active?: boolean
    slug?: any
    created_at?: string
}

const TestimonialCard: React.FunctionComponent<TestimonialResponse> = ({ image, name, rating, message, designation, company }) => {

    return (
        <div className='relative pb-5 lg:pb-6'>
            <div className='flex relative overflow-visible flex-col p-5 bg-[#FFEBED] rounded-md gap-2 md:gap-5'>
                <div className='flex justify-between'>
                    <div className='flex flex-row items-start gap-3 xl:items-center md:gap-5'>
                        <div className='relative w-10 h-10 md:w-16 md:h-16'>
                            <Image
                                src={image}
                                alt='Image'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <div>
                            <h1 className='text-sm font-bold text-primary md:text-base'>{name}</h1>
                            <h1 className='text-xs font-poppins md:text-sm'>
                                {designation}
                            </h1>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xs md:text-sm'>{company}</h1>
                        <span className='hidden xl:block'>
                            <RatingStars rating={rating} />
                        </span>
                    </div>

                </div>

                <span className='block xl:hidden'>
                    <RatingStars rating={rating} />
                </span>
                {/* Message */}
                <p className='line-clamp-4 lg:line-clamp-5 leading-[1.5] h-[7.5em] lg:h-[9em] font-poppins text-xs md:text-base'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }}
                />
                {/* Quotation */}
                <div className='absolute left-0 flex items-center justify-center w-full -bottom-5 lg:-bottom-6'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full lg:w-12 lg:h-12 bg-primary'>
                        <MdFormatQuote className='w-8 h-8 text-white' />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TestimonialCard