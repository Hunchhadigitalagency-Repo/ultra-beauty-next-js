import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const ProfileInformationLoader: React.FunctionComponent = () => {
    return (
        <div className="border-t border-[#CFCECE] p-4 flex gap-4">
            <div className="flex justify-center items-center">
                <Skeleton className="w-20 h-20 rounded-full" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-60" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>
        </div>
    )
}

export default ProfileInformationLoader