import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const ShippingInformationLoader: React.FunctionComponent = () => {
    return (
        <div className="border-t border-[#CFCECE] p-4 flex flex-col gap-1.5">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-50" />
            <Skeleton className="h-5 w-30" />
            <Skeleton className="h-5 w-35" />
        </div>
    )
}

export default ShippingInformationLoader