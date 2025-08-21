"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantityRowProps {
  onDecrease: () => void;
  onIncrease: () => void;
  className?: string;
  value?: number;
  loading?: boolean
}

const QuantityRow = ({ onDecrease, onIncrease, className, value, loading }: QuantityRowProps) => {
  return (
    <div className={`flex items-center ${className}`}>

      <Button
        disabled={loading}
        variant="ghost"
        size="icon"
        className="w-4 h-4 bg-transparent rounded-full md:h-8 md:w-8 "
        onClick={onDecrease}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="px-4 py-2 min-w-[50px] text-center">{value}</span>
      <Button
        disabled={loading}
        variant="ghost"
        size="icon"
        className="w-4 h-4 bg-transparent rounded-full md:h-8 md:w-8"
        onClick={onIncrease}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantityRow;
