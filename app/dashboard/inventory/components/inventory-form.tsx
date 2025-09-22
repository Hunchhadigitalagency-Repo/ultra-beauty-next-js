"use client";

import React from "react";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image, { StaticImageData } from "next/image";

type Variant = {
  id: number;
  variation: string;
  variationType: string;
  quantity: string;
};

export interface InventoryData {
  productName: string;
  productImage: StaticImageData;
  productSKU?: string;
  variants: Variant[];
}

interface Props {
  data: InventoryData;
  onAddVariant?: () => void;
  onUpdateVariant?: (id: number, field: keyof Variant, value: string) => void;
}

export default function InventoryManagementForm({
  data,
  onAddVariant,
  onUpdateVariant,
}: Props) {
  return (
    <div className="min-h-screen bg-[#f0f9ff] py-10 px-6">
      <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full mx-auto">
        {/* Form Section */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-md">
          {/* SELECT PRODUCT */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              SELECT PRODUCT
            </label>
            <Input
              type="text"
              value={data.productName}
              disabled
              className="w-[500px] border border-gray-300 rounded-md bg-gray-100 text-sm"
            />
          </div>

          {/* VARIANT MANAGEMENT */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-900">Variant Management</h2>
            <Button
              onClick={onAddVariant}
              className="flex items-center gap-2 border border-orange-500 bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 rounded-md"
            >
              <Plus className="w-4 h-4" />
              Add New Variant
            </Button>
          </div>

          {/* Variant Fields */}
          <div className="space-y-4 mb-6">
            {data.variants.map((variant) => (
              <div key={variant.id} className="flex gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">
                    VARIATION
                  </label>
                  <div className="text-[10px] border h-[20px] mt-1 text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                    {variant.variation}
                  </div>
                  <div className="text-[10px] border h-[20px] mt-1 text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                    {variant.variationType}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">
                    QUANTITY
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Quantity"
                    value={variant.quantity}
                    onChange={(e) =>
                      onUpdateVariant?.(variant.id, "quantity", e.target.value)
                    }
                    className="w-[200px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Attachment Section */}
          <div className="mb-6">
            <label className="text-xs font-medium text-gray-600 block mb-2">
              ATTACHMENT
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Select your Attachment</p>
              <Input type="file" className="hidden" />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md font-medium transition-colors">
              Save
            </Button>
          </div>
        </div>

        {/* Product Preview Section */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow-md h-fit flex gap-4 items-center">
          <Image
            src={data.productImage}
            alt="Product"
            width={60}
            height={60}
            className="rounded-md w-16 h-16 object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{data.productName}</h3>
            <p className="text-xs text-gray-500">Product SKU: {data.productSKU ?? "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
