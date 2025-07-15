import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface DataCardProps {
  title?: string;
  count?: number;
  className?: string;
  filter?: ReactNode;
  children: ReactNode;
}

const DataCard = ({
  title,
  count,
  filter,
  className,
  children,
}: DataCardProps) => {
  return (
    <section
      className={cn("rounded-sm bg-card shadow-xs p-4 space-y-4", className)}
    >
      <div
        className={`flex flex-col gap-2 md:flex-row items-center ${
          title && "justify-between"
        }`}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {count && (
            <div className="rounded-full bg-red h-6 w-6 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">{count}</span>
            </div>
          )}
        </div>

        {filter}
      </div>

      {children}
    </section>
  );
};

export default DataCard;
