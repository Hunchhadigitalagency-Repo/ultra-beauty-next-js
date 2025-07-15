import React from 'react';
import Image from 'next/image';

interface CategoryCardProps {
    title: string;
    image: string;
}

const CategoryCard: React.FunctionComponent<CategoryCardProps> = ({ title, image }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            <div className='w-64 h-64 relative overflow-hidden rounded-lg group cursor-pointer'>
                <Image
                    src={image}
                    alt={title}
                    layout='fill'
                />
            </div>
            <p className='text-center uppercase font-medium'>{title}</p>
        </div>
    )
}

export default CategoryCard