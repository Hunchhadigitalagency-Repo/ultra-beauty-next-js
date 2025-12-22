// components/product-detail-slider.tsx
"use client";
import React from "react";
import Image from "next/image";
import { IDashboardProduct } from "@/types/product";
import { X, Star, Package } from "lucide-react";
import DateChips from "@/components/common/chips/date-chips";

interface ProductDetailSliderProps {
  data: IDashboardProduct | null;
  onClose: () => void;
}

const ProductDetailSlider: React.FC<ProductDetailSliderProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  const formatPrice = (price: string) => {
    return `NPR ${parseFloat(price).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (isPublished: boolean, isFeatured: boolean) => {
    if (isFeatured) return "bg-purple-100 text-purple-800";
    if (isPublished) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const getStatusText = (isPublished: boolean, isFeatured: boolean) => {
    if (isFeatured) return "Featured";
    if (isPublished) return "Published";
    return "Draft";
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-[400px] h-full shadow-lg p-8 overflow-y-auto animate-slideInRight ml-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <div className="flex gap-3 items-start">
              {data.images && data.images.length > 0 ? (
                <Image
                  src={data.images[0].file}
                  alt={data.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="w-[60px] h-[60px] bg-gray-200 rounded-md flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-sm font-semibold leading-tight">
                  {data.name}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  SKU: {data.sku}
                </p>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm divide-y">
          <div className="flex justify-between py-2">
            <span className="font-medium">SLUG</span>
            <span className="text-blue-600">/{data.slug_name}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium">CATEGORY</span>
            <div className="text-right">
              <div className="font-medium">{data.category?.name}</div>
              {data.subcategory && (
                <div className="text-xs text-muted-foreground">
                  {data.subcategory.name}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium">BRAND</span>
            <span>{data.brand?.name || "No Brand"}</span>
          </div>

          {/* Pricing */}
          <div className="flex justify-between py-2">
            <span className="font-medium">PRICE</span>
            <div className="text-right">
              <div className="font-medium text-green-600">
                {formatPrice(data.price)}
              </div>
              {data.discount_percentage &&
                parseFloat(data.discount_percentage) > 0 && (
                  <div className="text-xs text-red-500">
                    -{data.discount_percentage}% off
                  </div>
                )}
            </div>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium">QUANTITY</span>
            <span
              className={`${
                data.quantity < 5 ? "text-red-600" : "text-green-600"
              }`}
            >
              {data.quantity} units
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium">SOLD</span>
            <span>{data.sold_unit} units</span>
          </div>

          {/* Variants */}
          <div className="py-2">
            <span className="font-medium">VARIANTS</span>
            <div className="flex gap-2 mt-2 flex-wrap">
              {data.variants && data.variants.length > 0 ? (
                data.variants.map((variant: any, index: number) =>
                  variant.product_variants?.map((pv: any, pvIndex: number) => (
                    <div
                      key={`${index}-${pvIndex}`}
                      className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl px-2 py-1 flex justify-center items-center"
                    >
                      {pv.attribute?.name}: {pv.attribute_variant?.name}
                    </div>
                  ))
                )
              ) : (
                <div className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl px-2 py-1 flex justify-center items-center">
                  No variants
                </div>
              )}
            </div>
          </div>

          {/* Status & Flags */}
          <div className="py-2 flex justify-between">
            <span className="font-medium">STATUS</span>
            <div className="flex gap-2 flex-wrap">
              <span
                className={`text-xs px-2 py-1 rounded ${getStatusColor(
                  data.is_published,
                  data.is_Featured
                )}`}
              >
                {getStatusText(data.is_published, data.is_Featured)}
              </span>
              {data.is_new && (
                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                  New
                </span>
              )}
              {data.is_best_seller && (
                <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-800">
                  Best Seller
                </span>
              )}
            </div>
          </div>

          {data.is_flash_sale && (
            <div className="py-2 flex justify-between">
              <span className="font-medium flex flex-col gap-2">
                <span>FLASH SALE </span>
                <span className="text-green text-bold">
                  {" "}
                  {data.flash_sale_discount}%
                </span>
              </span>
              <div className="text-right">
                <div className="text-sm text-red-600 font-medium">Active</div>
                {data.flash_end_date && (
                  <div className="text-xs text-muted-foreground">
                    Ends: <DateChips date={data.flash_end_date} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="py-2 flex justify-between">
            <span className="font-medium">REVIEWS</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{data.average_rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">
                ({data.total_reviews})
              </span>
            </div>
          </div>

          {/* Tax */}
          <div className="py-2 flex justify-between">
            <span className="font-medium">TAX</span>
            <span
              className={
                data.is_tax_applicable ? "text-green-600" : "text-gray-500"
              }
            >
              {data.is_tax_applicable ? "Applicable" : "Not applicable"}
            </span>
          </div>

          {/* YouTube Link */}
          {data.youtube_link && (
            <div className="py-2">
              <span className="font-medium">YOUTUBE</span>
              <a
                href={data.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline block mt-1"
              >
                View Tutorial
              </a>
            </div>
          )}

          {/* Descriptions */}
          <div className="py-2">
            <span className="font-medium">GENERAL DESCRIPTION</span>
            <div
              className="text-xs mt-1 prose prose-xs max-w-none"
              dangerouslySetInnerHTML={{ __html: data.general_description }}
            />
          </div>

          <div className="py-2">
            <span className="font-medium">DETAILED DESCRIPTION</span>
            <div
              className="text-xs mt-1 prose prose-xs max-w-none"
              dangerouslySetInnerHTML={{ __html: data.detail_description }}
            />
          </div>
          {data.tutorial && (
            <div className="py-2">
              <span className="font-medium uppercase">ingredient </span>
              <div
                className="text-xs mt-1 prose prose-xs max-w-none"
                dangerouslySetInnerHTML={{ __html: data.tutorial }}
              />
            </div>
          )}

          {/* Timestamps */}
          <div className="py-2 flex justify-between">
            <span className="font-medium">CREATED</span>
            <span className="text-xs">{formatDate(data.created_at)}</span>
          </div>

          <div className="py-2 flex justify-between">
            <span className="font-medium">UPDATED</span>
            <span className="text-xs">{formatDate(data.updated_at)}</span>
          </div>

          {/* Images Gallery */}
          {data.images && data.images.length > 1 && (
            <div className="py-2">
              <span className="font-medium">IMAGES</span>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {data.images.map((image: any, index: number) => (
                  <Image
                    key={index}
                    src={image.file}
                    alt={`${data.name} - ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded object-cover border"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSlider;
