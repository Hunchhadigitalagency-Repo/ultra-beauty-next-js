import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';


const ReviewHistoryLoader: React.FunctionComponent = () => {
    return (
        <section className='animate-pulse flex flex-col gap-5'>
            <div className='flex gap-5'>
                <Skeleton className=' w-14 h-14 md:w-20 md:h-20 rounded-md' />
                <div className='flex flex-col gap-5 items-start'>
                    <Skeleton className='h-4 w-48' />
                    <Skeleton className='h-4 w-64 ' />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <Skeleton className='h-4 w-48' />
                <Skeleton className='h-7 w-full' />
            </div>

        </section>
    )
}

export default ReviewHistoryLoader