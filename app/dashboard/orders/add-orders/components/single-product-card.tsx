// components/SingleProductCard.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  } from "@/components/ui/dialog";
import { IFeature, IProduct } from "@/types/product";
import { calculatePrice } from "@/hooks/use-price-calculator";
import { EChips } from "@/types/chip-type";
import CardChips from "@/components/common/chips/card-chips";
import ProductDescriptionSection from "./product-desciption";

interface ProductCardProps {
    id: number;
    slug?: string;
    imageSrc: string;
    alt: string;
    title: string;
    description: string;
    category: string;
    features?: IFeature[];
    rating?: number;
    price: string;
    previousPrice?: string;
    is_flash_sale?: boolean;
    flash_end_date?: string;
    flash_sale_discount?: string;
    is_new?: boolean;
    discountTag?: string;
    onAddToCart?: () => void;
    onToggleWishlist?: (id: string, isWishlisted: boolean) => void;
    isWishlisted?: boolean;
    product: IProduct
}

const SingleProductCard = ({
    imageSrc,
    alt,
    title,
    features,
    category,
    price,
    discountTag,
    is_flash_sale,
    is_new,
    flash_sale_discount,
    product
}: ProductCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const { finalPrice, previousPrice } = calculatePrice({
        price,
        is_flash_sale,
        flash_sale_discount,
        discountTag,
    });

    return (
        <section className="w-full bg-white rounded-lg overflow-hidden border-2 rounded-xl px-2 py-2">
            {/* Product Image */}
            <div className="relative mb-4 w-full h-[200px] overflow-hidden rounded-lg group cursor-pointer">
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover w-full h-full"
                />
                <div className="absolute top-3 left-3">
                    {is_flash_sale && (
                        <CardChips title="Flash Sale" chipType={EChips.IS_FLASH_SALE} />
                    )}
                </div>
                <div className="absolute top-3 right-3">
                    {is_new && <CardChips title="New" chipType={EChips.IS_NEW} />}
                </div>

                {features?.map((feat, i) => (
                    <span
                        key={i}
                        className={`absolute text-sm font-medium px-2 py-1 rounded shadow ${feat.position}`}
                    >
                        {feat.label}
                    </span>
                ))}
            </div>

            {/* Product Info */}
            <div className="px-4 flex flex-col">
                <p className="text-[15px] font-medium text-gray-500 line-clamp-1">
                    {category}
                </p>
                <p className="text-[18px] font-medium line-clamp-1">{title}</p>
                <div className="flex justify-between mt-2">
                    <p className="text-[17px] font-medium">Nrs. {finalPrice}</p>
                    {previousPrice && (
                        <p className="text-[16px] font-medium line-through text-gray-500">
                            Nrs. {previousPrice}
                        </p>
                    )}
                </div>

                {/* Select Product Button (opens dialog) */}
                <Button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-red-100 mt-2 border-pink-500 rounded-sm h-12 text-black hover:bg-red-400"
                >
                    Select Product
                </Button>
            </div>

            {/* Product Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent
                    className="w-full max-w-7xl md:max-w-6xl mx-auto p-6 rounded-lg"
                >
                    <ProductDescriptionSection product={product as any} onClose={() => setIsOpen(false)} />
                </DialogContent>
            </Dialog>

        </section>
    );
};

export default SingleProductCard;
