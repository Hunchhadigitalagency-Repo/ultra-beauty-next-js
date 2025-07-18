import React from 'react';
import Image from 'next/image';

interface CategoryCardProps {
    title: string;
    image: string;
}

const CategoryCard: React.FunctionComponent<CategoryCardProps> = ({ title, image }) => {
    return (
        <div className='flex w-[90%] flex-col items-center justify-center gap-2'>
            <div className=' w-full h-36 md:h-52 lg:h-64 relative overflow-hidden rounded-lg group cursor-pointer'>
                <Image
                    src={image}
                    alt={title}
                    layout='fill'
                />
            </div>
            <p className='w-[]text-center text-sm sm:text-base uppercase font-medium'>{title}</p>
        </div>
    )
}

export default CategoryCard