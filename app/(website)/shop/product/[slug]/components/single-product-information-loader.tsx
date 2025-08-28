import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SingleProductInformationLoader = () => {
    return (
        <div className='grid gap-8 lg:grid-cols-2'>
            {/* Product Images Loader */}
            <div className="space-y-8 product-images-section w-96 sm:w-full sm:h-full">
                <Skeleton className="relative rounded-lg h-96 bg-[#f1f1f1] md:h-[600px]">
                    <Skeleton className="absolute border rounded-full top-4 left-4 w-9 h-9 " />
                    <Skeleton className="absolute w-8 border rounded-full h-7 px-7 top-4 right-4" />
                </Skeleton>
                <Skeleton className="flex justify-between h-12 rounded w-96 md:w-full" />
                <Skeleton className="flex justify-between h-12 rounded w-96 md:w-full" />
            </div>

            {/* Product Description Loader */}
            <div className="flex flex-col justify-start w-full space-y-8">
                {/* Brand + Rating */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-96 sm:w-full">
                        <Skeleton className="w-16 h-6 rounded-sm sm:w-28" />
                        <div className="flex items-center gap-5">
                            <Skeleton className="w-16 h-5 rounded-sm sm:w-24" />
                            <Skeleton className="w-16 h-5 rounded-sm sm:w-32" />
                        </div>
                    </div>

                    {/* Product Title */}
                    <Skeleton className="h-8 rounded-sm w-96" />

                    {/* Best Seller */}
                    <Skeleton className="w-24 h-8 rounded-sm" />
                </div>

                {/* Details Accordion */}
                <Skeleton className="w-full h-12 rounded-sm" />

                {/* Variant Options */}
                <div className="space-y-4">
                    <div className="flex items-center gap-5 mb-4">
                        <Skeleton className="w-16 h-5 rounded-sm" />
                        <Skeleton className="h-8 rounded-full w-14" />
                        <Skeleton className="h-8 rounded-full w-14" />
                    </div>
                    <div className="flex items-center gap-5 mb-4">
                        <Skeleton className="w-16 h-5 rounded-sm" />
                        <Skeleton className="h-8 rounded-full w-18" />
                        <Skeleton className="h-8 rounded-full w-18" />
                    </div>
                </div>

                {/* Price + Quantity */}
                <div className="flex items-center justify-between w-full">
                    <Skeleton className="w-24 h-8 rounded-sm" />
                    <div className="flex items-center gap-10">
                        <Skeleton className="w-16 h-8 rounded-sm" />
                        <Skeleton className="h-8 rounded-full w-14" />
                    </div>
                    <Skeleton className="h-10 rounded-sm w-27" />
                </div>

                {/* Add to Cart */}
                <Skeleton className="w-full h-12 rounded-sm" />

                {/* Share Section */}
                <div className="flex items-center justify-between">
                    <Skeleton className="w-16 h-8 rounded" />
                    <div className="flex gap-4">
                        <Skeleton className='w-10 h-10 rounded-full' />
                        <Skeleton className='w-10 h-10 rounded-full' />
                        <Skeleton className='w-10 h-10 rounded-full' />
                        <Skeleton className='w-10 h-10 rounded-full' />
                    </div>
                </div>

                {/* Payment Section */}
                <div className="flex items-center justify-between bg-[#EEEEEE] px-4 rounded-sm py-3">
                    <Skeleton className="w-20 h-8 rounded-sm" />
                    <div className="flex items-center gap-7">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                </div>

                {/* Bundle Section */}
                <div className="space-y-4">
                    <Skeleton className="w-40 h-8 rounded-sm" />
                    <div className="flex items-center justify-between gap-20">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-20 h-20 rounded-sm" />
                            <Skeleton className="w-20 h-20 rounded-sm" />
                        </div>
                        <div className="flex flex-col items-start gap-3">
                            <Skeleton className="w-24 h-5 rounded-sm sm:w-48" />
                            <Skeleton className="w-24 h-5 rounded-sm sm:w-48" />
                        </div>
                    </div>
                    <Skeleton className="h-12 rounded-sm w-96 sm:w-full" />
                </div>
            </div>
        </div >
    )
}

export default SingleProductInformationLoader