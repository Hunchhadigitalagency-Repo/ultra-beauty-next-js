"use client";

import React from "react";
import { cn } from "@/lib/utils";

const ScribbleBlock = ({ className }: { className: string }) => (
  <div className={cn("bg-gray-200 animate-pulse rounded", className)} />
);

interface BlogScrabbledLoaderProps {
  count?: number;
}

const BlogScrabbledLoader: React.FC<BlogScrabbledLoaderProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 w-full py-5">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-4 space-y-4 shadow w-full"
        >
          <ScribbleBlock className="w-full h-[200px] rounded-lg" />
          <ScribbleBlock className="h-6 w-3/4" />
          <ScribbleBlock className="h-5 w-full" />
          <ScribbleBlock className="h-5 w-5/6" />

          <div className="flex justify-between items-center">
            <ScribbleBlock className="h-5 w-24" />
            <ScribbleBlock className="h-5 w-8" />
          </div>

          <div className="flex items-center gap-4">
            <ScribbleBlock className="h-6 w-20" />
            <ScribbleBlock className="h-5 w-16" />
            <ScribbleBlock className="h-5 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogScrabbledLoader;
