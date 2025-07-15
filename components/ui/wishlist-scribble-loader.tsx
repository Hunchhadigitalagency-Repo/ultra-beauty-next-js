import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ShoppingCart } from "lucide-react";
import React from "react";

const WishlistCardSkeleton = () => {
    return (
        <section className="relative flex flex-col md:flex-row gap-4 animate-pulse">
            <div className="flex gap-4 md:gap-6 flex-row flex-1">
                <Skeleton className="rounded-lg border md:w-[150px] w-[100px] h-[100px] md:h-[150px]" />

                <div className="flex flex-col flex-1 justify-between">
                    <div className="flex items-center gap-2 md:gap-4 mt-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-8" />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 lg:gap-24 mt-3 md:w-4/5">
                        <div className="flex flex-col gap-2 sm:gap-4 flex-1">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />

                            <div className="flex flex-col md:flex-row gap-2 md:gap-6 mt-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <Button
                    disabled
                    className="flex w-full md:w-[250px] text-custom-black font-medium h-12 rounded-full bg-yellow hover:bg-yellow-500 justify-center"
                >
                    <Skeleton className="h-5 w-24" />
                    <ShoppingCart className="ml-2 opacity-30" />
                </Button>
            </div>

            <Button
                disabled
                variant="ghost"
                className="absolute top-[-15px] right-[-25px] md:top-0 md:right-0 w-12 h-12 p-0"
            >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
            </Button>
        </section>
    );
};

export default WishlistCardSkeleton;
