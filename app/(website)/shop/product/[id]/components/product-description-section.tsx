"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Info,
  Plus,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import khalti from "@/assets/khalti.png";
import esewa from "@/assets/esewa.png";
import RatingStars from "@/components/common/product/rating-stars";
import QuantityRow from "@/components/common/product/quantity-row";
import { FaInstagram, FaTiktok, FaXTwitter, FaFacebookMessenger } from "react-icons/fa6";
import { Product } from "@/types/website";
import React from "react";
import PriceRow from "@/components/common/product/price-row";
import { addToCart } from "@/lib/api/cart/cart-apis";

interface Props {
  product: Product;
}

const ProductDescriptionSection = ({ product }: Props) => {
  const rating = 4.5;

  const discountedPrice = product.discount_percentage
    ? (
      Number(product.price) -
      (Number(product.price) * Number(product.discount_percentage)) / 100
    ).toFixed(2)
    : null;

  return (
    <div className="space-y-6">
      <div>
        {product.is_must_sold && (
          <Badge className="bg-green-500 text-white mb-2">Best Seller</Badge>
        )}

        <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>

        <div className="flex items-center gap-2 mb-4">
          <RatingStars rating={rating} />
          <span className="text-sm text-gray-600">{rating}/5 Star Rating</span>
        </div>

        {product.general_description && (
          <div
            className="text-foreground text-sm mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.general_description }}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        {discountedPrice ? (
          <PriceRow
            previousPrice={product.price}
            price={discountedPrice}
            discountTag={product.discount_percentage}
            className=""
            discountClassName="text-[15px]"
          />

        ) : (
          <h2 className="text-3xl font-bold text-foreground">NPR. {product.price}</h2>
        )}
      </div>

      <div>
        <h3 className="font-medium mb-2">Color</h3>
        <div className="flex gap-2">
          {["bg-gray-800", "bg-red-500", "bg-blue-500", "bg-orange-500"].map((color, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-full ${color} `}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <div className="flex gap-2">
          {["XXL", "XL", "L", "M"].map((size, i) => (
            <Button
              key={size}
              variant={i === 1 ? "default" : "outline"}
              size="sm"
              className="min-w-[50px]"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <QuantityRow
          className=""
          onDecrease={() => console.log("Decrease")}
          onIncrease={() => console.log("Increase")}
        />
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-800">Available</Badge>
          <Badge className="bg-red-100 text-red-800">Low</Badge>
          <Badge className="bg-blue-100 text-blue-800">Stocking Soon</Badge>
        </div>
      </div>

      <Button
        className="w-full text-custom-black font-medium h-12 rounded-full bg-[#FBBC05]"
        onClick={()=> addToCart(product.id, 1)}
      >
        ADD TO CART <ShoppingCart />
      </Button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">SHARE:</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FaFacebookMessenger />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FaInstagram />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FaXTwitter />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FaTiktok />
            </Button>
          </div>
        </div>
        <span className="text-sm text-gray-600 inline-flex gap-2 items-center">
          Delivery Info <Info />
        </span>
      </div>

      <div className="flex items-center gap-2 justify-between bg-[#FFF4DB] px-4 py-2 rounded-lg">
        <span className="text-sm">We Accept</span>
        <div className="flex gap-4 items-center">
          <Image src={esewa.src} alt="eSewa" width={36} height={36} className="rounded-full" />
          <Image src={khalti.src} alt="Khalti" width={36} height={36} className="rounded-full" />
        </div>
      </div>

      {product.variants?.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg">Bundle and Save</h2>
          <div className="flex items-center justify-between gap-4">
            <div className="">
              {product.variants.slice(0, 2).map((variant, i) => (
                <React.Fragment key={i}>
                  <Image
                    src={variant?.image || product.images?.[0]?.file || ""}
                    alt={`Bundle item ${i}`}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  {i === 0 && (
                    <Button variant="ghost" size="icon">
                      <Plus className="size-8" />
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex flex-col items-start gap-2">
              {product.variants.slice(0, 2).map((variant, i) => (
                <h3 key={i} className="font-medium text-sm">
                  {variant?.name || "Bundle product"}
                </h3>
              ))}
            </div>
          </div>
          <Button className="w-full text-custom-black font-medium rounded-full h-12 bg-[#FBBC05]">
            CHOOSE YOUR BUNDLE <ShoppingCart />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionSection;
