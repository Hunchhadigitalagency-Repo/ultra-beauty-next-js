import React from 'react';

interface BrandContentProps {
    brandName: string;
    brandDescription: string;
    brandColor: string;
}

const BrandContent: React.FunctionComponent<BrandContentProps> = ({ brandName, brandDescription, brandColor }) => {
    return (
        <div className={`w-full lg:w-[40%] flex flex-col items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 `}
            style={{ color: brandColor }}
        >
            <h2 className=' font-normal uppercase text-sm ms:text-base lg:text-2xl'>
                Brand Name
            </h2>
            <h1 className='text-3xl md:text-5xl lg:text-7xl'>
                {brandName}
            </h1>
            <p className='px-5 sm:px-0 text-xs sm:text-sm md:text-base lg:text-lg text-center'>
                {brandDescription}
            </p>
            <button className='text-sm sm:text-base mg:text-lg border-[1px] rounded-lg px-4 py-1 sm:py-2 hover:bg-red-500 hover:text-white transition-colors duration-300'
                style={{ borderColor: brandColor }}
            >
                View
            </button>
        </div>
    )
}

export default BrandContent