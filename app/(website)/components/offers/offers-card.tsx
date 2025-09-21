import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
interface OffersCardProps {
    imageSrc: string
    brand: string
    productName: string
    slugName: string
}

const OffersCard: React.FunctionComponent<OffersCardProps> = ({ imageSrc, brand, productName, slugName }) => {

    return (
        <Link href={`/shop/${slugName}`}>
            <div className="flex flex-col items-center justify-center w-full gap-3 mt-2">
                <div className="relative w-full overflow-hidden rounded-sm cursor-pointer h-36 md:h-52 lg:h-80 group">
                    <Image
                        src={imageSrc}
                        alt="brand logo"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col ">
                    <p className="text-[#7A7A7A] mt-1 text-center text-xs sm:text-sm">
                        {brand}
                    </p>
                    <h3 className="text-sm font-semibold text-center sm:text-base md:text-lg lg:text-xl font-playfair text-foreground">
                        {productName}
                    </h3>
                </div>
            </div>
        </Link>
    )
}

export default OffersCard