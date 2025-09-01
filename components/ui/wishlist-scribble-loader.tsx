import React from "react";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const WishlistCardSkeleton = () => {
    return (
        <section className="relative flex flex-col gap-4 mt-5 md:flex-row animate-pulse">
            <div className="flex flex-row flex-1 gap-4 md:gap-6">
                <Skeleton className="border rounded-lg w-28 h-28 lg:w-32 lg:h-32" />

                <div className="flex flex-col justify-between flex-1">
                    <div className="flex items-center gap-2 md:gap-4">
                        <Skeleton className="w-20 h-4" />
                        <Skeleton className="w-16 h-4" />
                    </div>

                    <div className="flex flex-col justify-between w-full gap-4 md:flex-row">
                        <div className="flex flex-col flex-1 gap-1">
                            <Skeleton className="w-3/4 h-5" />
                            <Skeleton className="w-full h-4" />
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-36" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <X className="w-5 h-5 text-gray-300 md:w-6 md:h-6" />

        </section>
    );
};

export default WishlistCardSkeleton;
