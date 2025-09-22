import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const BlogsCardSkeleton = () => {
    return (
        <div className="rounded-lg overflow-hidden space-y-2 border-[1px] border-[#D7D7D7] p-3">
            {/* Cover Image */}
            <div className="relative mb-6 w-full h-[400px] overflow-hidden rounded-lg">
                <Skeleton className="w-full h-full" />
            </div>

            {/* Title */}
            <Skeleton className="h-6 w-3/4" />

            {/* Author & Date */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>

            {/* Subtitle */}
            <Skeleton className="h-4 w-full" />
        </div>
    )
}

export default BlogsCardSkeleton