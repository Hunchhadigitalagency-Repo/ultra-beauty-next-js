import { Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PopularCard = ({ image }: { image: string }) => {
    return (
        <div className='flex relative flex-col w-full gap-4 p-2 border-[1px] border-primary rounded-md'>
            {/* Image Section */}
            <div className='mb-2 relative w-full h-40 sm:h-60 md:h-60 overflow-hidden rounded-lg group cursor-pointer '>
                <Image
                    src={image}
                    alt={'Product Image'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="absolute top-2 right-3 p-2">
                {/* <span className="bg-red-600 text-white text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
                    Fash Sale
                </span> */}
                <Heart className='w-5 h-5 text-foreground' />
            </div>

            <div className="absolute top-2 left-0">
                <span className="bg-primary uppercase text-white text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1 rounded-tr-md rounded-br-md">
                    Best Seller
                </span>
            </div>
            {/* Title Section */}
            <div className='flex flex-col gap-1'>
                <p className='text-xs md:text-sm text-gray'>
                    Ubiya Derma
                </p>
                <h1 className='text-lg font-playfair font-medium'>Product Title</h1>
            </div>
        </div>
    )
}

export default PopularCard