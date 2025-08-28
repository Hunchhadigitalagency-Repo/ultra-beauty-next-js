import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ReviewLoader: React.FunctionComponent = () => {
    return (
        <section className="animate-pulse flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
                <div className="flex gap-5">
                    <Skeleton className="w-14 h-14 md:w-20 md:h-20 rounded-md" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <Skeleton className="h-10 w-36 rounded-md" />
            </div>
        </section>

    )
}

export default ReviewLoader