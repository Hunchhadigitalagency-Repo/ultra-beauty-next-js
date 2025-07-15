"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { VariantClass } from "@/schemas/menu/products/product-schema";

interface VariantAttributeDisplayProps {
  attributes: VariantClass[];
  onDelete: (index: number) => void;
}

export default function VariantAttributeDisplay({
  attributes,
  onDelete,
}: VariantAttributeDisplayProps) {
  const getAttributeDisplay = (attribute: VariantClass) => {
    // Check if it's a color attribute (you can customize this logic based on your attribute types)
    const isColor =
      attribute.attribute_name.toLowerCase().includes("color") ||
      attribute.variant_name.toLowerCase().match(/^#[0-9a-f]{6}$/i) ||
      [
        "red",
        "blue",
        "green",
        "yellow",
        "black",
        "white",
        "pink",
        "purple",
        "orange",
      ].includes(attribute.variant_name.toLowerCase());

    if (isColor) {
      return (
        <div
          className="w-8 h-8 rounded-full border-2 border-gray-300"
          style={{
            backgroundColor: attribute.variant_name.startsWith("#")
              ? attribute.variant_name
              : attribute.variant_name.toLowerCase(),
          }}
          title={`${attribute.attribute_name}: ${attribute.variant_name}`}
        />
      );
    }

    // Default display for other attributes (like size, material, etc.)
    return (
      <div className="px-3 py-1 border border-gray-300 rounded text-sm bg-gray-50">
        {attribute.variant_name}
      </div>
    );
  };

  if (attributes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center mt-2">
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
            onClick={() => onDelete(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
