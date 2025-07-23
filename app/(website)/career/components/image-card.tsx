import React from 'react';
import Image from 'next/image';


interface ImageCardProps {
    product: string;
}

const ImageCard: React.FunctionComponent<ImageCardProps> = ({ product }) => {
    return (
        <div className=' w-full h-36 md:h-52 lg:h-80 relative overflow-hidden group cursor-pointer'>
            <Image
                src={product}
                alt={'Image'}
                layout='fill'
                className='rounded-t-sm rounded-bl-sm rounded-br-[50px]'
            />
        </div>
    )
}

export default ImageCard