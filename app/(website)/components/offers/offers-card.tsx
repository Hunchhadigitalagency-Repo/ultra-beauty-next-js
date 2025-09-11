import React from 'react';
import Image from 'next/image';
interface OffersCardProps {
    imageSrc: string;
    brand: string;
    productName: string;
}

const OffersCard: React.FunctionComponent<OffersCardProps> = ({ imageSrc, brand, productName }) => {

    return (
        <div className="flex flex-col gap-3 justify-center items-center w-full mt-2">
            <div className="w-full h-36 md:h-52 lg:h-80 relative overflow-hidden rounded-sm group cursor-pointer">
                <Image
                    src={imageSrc}
                    alt="brand logo"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className=" flex flex-col">
                <p className="text-[#7A7A7A] mt-1 text-center text-xs sm:text-sm">
                    {brand}
                </p>
                <h3 className="text-sm text-center sm:text-base md:text-lg lg:text-xl font-semibold font-playfair text-foreground">
                    {productName}
                </h3>
            </div>
        </div>
    )
}

export default OffersCard