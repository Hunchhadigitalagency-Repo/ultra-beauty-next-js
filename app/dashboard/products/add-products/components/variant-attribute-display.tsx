"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { VariantClass } from "@/schemas/menu/products/product-schema";

interface VariantAttributeDisplayProps {
  attributes: VariantClass[];
  onDelete: (index: number, name: string) => void;
}

export default function VariantAttributeDisplay({
  attributes,
  onDelete,
}: VariantAttributeDisplayProps) {
  const getAttributeDisplay = (attribute: VariantClass) => {
    // Check if it's a color attribute (you can customize this logic based on your attribute types)

    // Default display for other attributes (like size, material, etc.)
    return (
      <div className="px-5 py-1 border border-gray-700 rounded-[2px] text-sm bg-gray-50">
        {attribute.variant_name}
      </div>
    );
  };

  if (attributes.length === 0) {
    return null;
  }


  return (
    <div className="flex flex-wrap md:gap-5 gap-2 items-center mt-2">
      {attributes.map((attribute, index) => (
        <div
          key={`${attribute.attribute}-${attribute.attribute_variant}-${index}`}
          className="relative group"
        >
          {getAttributeDisplay(attribute)}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-red-500 text-white hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onDelete(index, attribute.attribute_name)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
