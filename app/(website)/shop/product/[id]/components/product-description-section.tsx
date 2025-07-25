"use client";
import React from "react";
import Image from "next/image";
import esewa from "@/assets/esewa.png";
// import { sr } from "date-fns/locale";
import khalti from "@/assets/khalti.png";
import { Product } from "@/types/website";
import coin from "@/assets/coin-dollar.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import globalIime from "@/assets/globalIme.png";
import mastercard from "@/assets/mastercard.png";
import { addToCart } from "@/lib/api/cart/cart-apis";
// import PriceRow from "@/components/common/product/price-row";
import QuantityRow from "@/components/common/product/quantity-row";
import {
  Info,
  Minus,
  Plus,
  ShoppingCart,
  SquareCheck,
  Truck,
} from "lucide-react";

import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaFacebookMessenger
} from "react-icons/fa6";

interface Props {
  product: Product;
}

const ProductDescriptionSection: React.FunctionComponent<Props> = ({ product }) => {

  const discountedPrice = product.discount_percentage
    ? (
      Number(product.price) -
      (Number(product.price) * Number(product.discount_percentage)) / 100
    ).toFixed(2)
    : null;

  return (
    <div className="space-y-8 ">
      <div>
        <h1 className="text-2xl font-bold font-playfair text-foreground mb-2">
          {product.name}
        </h1>
        <div className=" flex items-center justify-between " >
          <Badge className="bg-primary w-36 h-10 font-poppins font-light text-white text-[20px] mb-2">
            Best Seller
          </Badge>
          <span className="text-sm text-foreground font-poppins font-medium pl-28">
            #15 SOLD
          </span>
          <span className="text-sm text-foreground font-poppins font-medium inline-flex gap-2 items-center">
            <Truck />
            Fast Delivery
            <Info />
          </span>
        </div>
        <div className="flex items-center gap-2 justify-between bg-secondary px-4 py-2 rounded-sm">
          <span className="text-l font-medium">
            Details
          </span>
          <Button variant="ghost" size="icon">
            <Minus className="size-5" />
          </Button>

        </div>
        {product.general_description && (
          <div
            className="text-foreground font-poppins text-sm mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.general_description }}
          />
        )}
      </div>
      {/* Variant Products section */}
      <div>
        <div className="flex gap-2">
          {product.variants.slice(0, 5).map((variant, i) => (
            <div className="border border-[#D8D8D8] rounded-md" key={i}>
              <Image
                src={variant?.item_image
                  || product.images?.[0]?.file || ""}
                alt={`Bundle item ${i}`}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
            </div>

          ))}
        </div>
      </div>
      {/* Products Size */}
      <div>
        <h3 className="font-medium mb-2">
          Size
        </h3>
        <div className="flex gap-8">
          {["150 Gram", "200 Gram", "450 Gram", "650 Gram"].map((size, i) => (
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
      {/* Product Price */}
      <div className="flex items-center gap-9">
        <div className="flex justify-between gap-20">
          <div className="flex flex-col gap-3 ">
            <h1 className="font-semibold text-xl">
              NPR.{discountedPrice}
            </h1>
            {discountedPrice && (
              <div className="flex justify-between gap-5">
                <>
                  <p className="line-through text-[#7A7A7A] font-medium" >
                    NPR.{product.price}
                  </p>
                  <p className="bg-primary h-7 w-28 pl-5 py-1 font-medium text-sm  font-poppins text-white rounded-full">
                    {product.discount_percentage}%OFF
                  </p>
                </>
              </div>
            )}
          </div>
          <Badge className="bg-primary text-sm font-poppins text-[#FFFFFF] w-32 h-10">
            Available
          </Badge>
          <QuantityRow
            className="w-42 h-10"
            onDecrease={() => console.log("Decrease")}
            onIncrease={() => console.log("Increase")}
          />
        </div>

      </div>
      {/* ADD To Bag button */}
      <Button
        className="w-full text-[#FFFFFF] font-bold h-12 rounded-sm bg-primary"
        onClick={() => addToCart(product.id, 1)}
      >
        ADD TO BAG
        <ShoppingCart />
      </Button>
      {/* Share Section */}
      <div className="flex items-center justify-between  ">
        <div className="flex items-center gap-4">
          <span className="text-sm font-poppins text-foreground font-medium">
            SHARE:
          </span>
          <div className="flex gap-8 ">
            <FaFacebookMessenger className="h-7 w-7 text-[#5D5D5D]" />
            <FaInstagram className="h-7 w-7 text-[#5D5D5D]" />
            <FaXTwitter className="h-7 w-7 text-[#5D5D5D]" />
            <FaTiktok className="h-7 w-7 text-[#5D5D5D]" />
          </div>
        </div>
        <span className="text-sm text-foreground font-poppins font-medium inline-flex gap-2 items-center">
          Delivery Info
          <Info />
        </span>
      </div>
      {/* Payment Section */}
      <div className="flex items-center gap-2 justify-between bg-[#FFEBED] px-4 py-2 rounded-sm">
        <span className="text-sm text-foreground font-poppins font-medium">
          We Accept
        </span>
        <div className="flex gap-7 items-center">
          <div className="flex justify-center items-center flex-col">
            <Image src={coin.src} alt="COD" width={26} height={36} className="rounded-full " />
            <span className="text-sm font-poppins font-bold">
              C.O.D
            </span>
          </div>
          <Image src={globalIime.src} alt="IME" width={60} height={46} className="rounded-full " />
          <Image src={mastercard.src} alt="masterCard" width={60} height={36} className="rounded-full " />
          <Image src={esewa.src} alt="eSewa" width={36} height={36} className="rounded-full" />
          <Image src={khalti.src} alt="Khalti" width={36} height={36} className="rounded-full" />
        </div>
      </div>
      {/*Bundle Product Section */}
      {product.variants?.length >= 2 && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg">Bundle and Save</h2>
          <div className="flex items-center justify-between gap-20">
            <div className="flex  items-center gap-3">
              {product.variants.slice(0, 2).map((variant, i) => (
                <React.Fragment key={i}>
                  <Image
                    src={variant?.image || product.images?.[0]?.file || ""}
                    alt={`Bundle item ${i}`}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  {i !== 0 && (
                    <Button variant="ghost" size="icon">
                      <Plus className="size-8" />
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex flex-col items-start gap-3">
              {product.variants.slice(0, 2).map((variant, i) => (
                <div key={i} className="flex items-center gap-2">
                  <SquareCheck />
                  <h3 className="font-medium text-sm">
                    {variant?.name || "Hair Cleaner for anti dandruf property and selsun property"}
                  </h3>
                </div>

              ))}
            </div>
          </div>
          <Button className="w-full text-primary border border-primary rounded-sm font-bold  h-12 bg-white">
            Add Bundle To Bag
            <ShoppingCart />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionSection;
