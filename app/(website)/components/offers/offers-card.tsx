import React from 'react';
import Image from 'next/image';


interface OffersCardProps {
    product: string;
}

const OffersCard: React.FunctionComponent<OffersCardProps> = ({ product }) => {
    return (
        <div className=' w-36 h-36 md:w-64 md:h-64 lg:h-80 lg:w-80 relative overflow-hidden rounded-sm group cursor-pointer'>
            <Image
                src={product}
                alt={'Offer Image'}
                layout='fill'
            />
        </div>
    )
}

export default OffersCard