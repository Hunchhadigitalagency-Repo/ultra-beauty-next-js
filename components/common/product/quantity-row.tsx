"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantityRowProps {
  onDecrease: () => void;
  onIncrease: () => void;
  className?: string
}

const QuantityRow = ({ onDecrease, onIncrease, className }: QuantityRowProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4 md:h-8 md:w-8 rounded-full bg-transparent "
        onClick={onDecrease}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-4 py-2 min-w-[50px] text-center">1</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4 md:h-8 md:w-8 rounded-full bg-transparent"
        onClick={onIncrease}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantityRow;
