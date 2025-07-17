import React from 'react';
import Image from 'next/image';


interface OffersCardProps {
    product: string;
}

const OffersCard: React.FunctionComponent<OffersCardProps> = ({ product }) => {
    return (
        <div className='w-[90%]'>
            <div className=' w-full h-36 md:h-52 lg:h-80 relative overflow-hidden rounded-sm group cursor-pointer'>
                <Image
                    src={product}
                    alt={'Offer Image'}
                    layout='fill'
                />
            </div>
        </div>
    )
}

export default OffersCard