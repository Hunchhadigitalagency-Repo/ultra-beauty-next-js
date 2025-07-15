// components/ScribbleProductCard.tsx
import React from "react";
import { cn } from "@/lib/utils";

const ScribbleBlock = ({ className }: { className: string }) => (
    <div className={cn("bg-gray-200 animate-pulse rounded", className)} />
);

const ScribbleProductCard = () => {
    return (
        <div className="w-full bg-white rounded-lg p-4 space-y-4">
            <ScribbleBlock className="w-full h-[250px] rounded-lg" />
            <ScribbleBlock className="h-6 w-3/4" />
            <ScribbleBlock className="h-4 w-full" />
            <ScribbleBlock className="h-4 w-5/6" />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <ScribbleBlock className="h-4 w-20" />
                    <ScribbleBlock className="h-4 w-6" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ScribbleBlock className="h-6 w-24" />
                <ScribbleBlock className="h-4 w-16" />
                <ScribbleBlock className="h-4 w-12" />
            </div>
        </div>
    );
};

export { ScribbleProductCard };


