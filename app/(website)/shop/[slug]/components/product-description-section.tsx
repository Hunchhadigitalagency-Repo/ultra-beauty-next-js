"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  // Plus,
  ShoppingCart,
  // SquareCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
// import esewa from "@/assets/esewa.png";
// import khalti from "@/assets/khalti.png";
import coin from "@/assets/coin-dollar.png";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/api/cart/cart-apis";
import { socialLinks } from "@/constants/social-links";
import { getOptions } from "@/utils/single-product-utility";
import PriceRow from "@/components/common/product/price-row";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SingleProductAccordion from "./single-product-accordion";
import RatingStars from "@/components/common/product/rating-stars";
import QuantityRow from "@/components/common/product/quantity-row";
import {
  SingleProductPageProps,
  ErrorState,
  SelectedAttribute,
} from "@/types/product";
import { clearCartItems, clearVoucherData } from "@/redux/features/cart-slice";
import { handleError } from "@/lib/error-handler";
import GetPay from "@/assets/getpay.jpeg";
import PhonePay from "@/assets/unnamed.png";
import SocialShare from "./share-link";
import { updateCartAndWishlistCounts } from "@/lib/update-count";

const ProductDescriptionSection: React.FunctionComponent<
  SingleProductPageProps
> = ({ product, getVariantId }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<ErrorState>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState<
    SelectedAttribute[]
  >([]);
  const [variantStatus, setVarStatus] = useState(false);
  const { isLoggedIn, profileDetails } = useAppSelector(
    (state) => state.authentication
  );
  const userId = profileDetails.id || null;

  const attributeOrder = useMemo(() => {
    return (
      product?.variants[0]?.product_variants.map((pv) => pv.attribute.name) ||
      []
    );
  }, [product?.variants]);

  const optionStep = getOptions({
    selectedAttribute: selectedAttributes,
    product: product,
    attributeOrder: attributeOrder,
  });

  const variantId = optionStep.data?.map((item) => item.id).toString();

  useEffect(() => {
    if (variantId) {
      getVariantId(parseInt(variantId));
    }
  }, [variantId]);
  const validateSelection = useCallback(() => {
    const newErrors: ErrorState = {};
    attributeOrder.forEach((attrName) => {
      if (!selectedAttributes.some((sel) => sel.name === attrName)) {
        newErrors[attrName] = `Please select a variant for ${attrName}`;
      } else {
        newErrors[attrName] = null;
      }
    });

    setErrors((prevErrors) => {
      const isEqual = attributeOrder.every(
        (attrName) => prevErrors[attrName] === newErrors[attrName]
      );
      if (isEqual) {
        return prevErrors;
      }
      return newErrors;
    });

    return !Object.values(newErrors).some((err) => err !== null);
  }, [attributeOrder, selectedAttributes, setErrors]);

  useEffect(() => {
    if (!hasSubmitted) return;
    validateSelection();
  }, [selectedAttributes, hasSubmitted, validateSelection]);

  const discountedPrice = product?.is_flash_sale
    ? Number(product?.price) -
      (Number(product?.price) * Number(product?.flash_sale_discount)) / 100
    : product?.discount_percentage
    ? (
        Number(product?.price) -
        (Number(product?.price) * Number(product?.discount_percentage)) / 100
      ).toFixed(2)
    : null;

  function handleSelect(name: string, value: string) {
    setSelectedAttributes((prev) => {
      const existingIndex = prev.findIndex((attr) => attr.name === name);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { name, value };
        return updated;
      }
      return [...prev, { name, value }];
    });
  }
  const handleSubmit = async () => {
    setHasSubmitted(true);
    validateSelection();
    try {
      if (isLoggedIn) {
        if (variantId !== undefined && userId) {
          await addToCart(
            userId,
            product?.slug_name,
            quantity,
            parseFloat(variantId)
          );
          dispatch(clearCartItems());
          dispatch(clearVoucherData());
          updateCartAndWishlistCounts(dispatch);
          toast.success("Product added to cart successfully!");
          setSelectedAttributes([]);
          setErrors({});
          setHasSubmitted(false);
          setQuantity(1);
        }
      } else {
        router.push("/login");
      }
    } catch (error) {
      handleError(error, toast);
    }
  };
  const stockQuantity = useMemo(() => {
    // Product has variants
    if (product.variants?.length > 0) {
      if (!variantId) return null; // variant not selected yet
      return (
        product.variants.find((v) => v.id === parseInt(variantId))
          ?.item_quantity ?? 0
      );
    }

    // Product has NO variants
    return product.quantity ?? 0;
  }, [product, variantId]);

  const isAvailable =
    stockQuantity !== null ? stockQuantity >= quantity : !!quantity;

  return (
    <div className="flex flex-col justify-start w-full space-y-8 ">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between w-full">
          <h1 className="mb-2 text-sm font-medium text-[#7A7A7A] font-poppins">
            {product?.brand?.name || "No Brand"}
          </h1>
          <div className="flex items-center gap-5">
            <RatingStars rating={product?.average_rating} />
            <span className="text-sm font-medium text-primary">
              {product?.average_rating.toFixed(2)}/5 Star Rating
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-bold capitalize font-playfair line-clamp-2">
          {product?.name}
        </h1>
        <div>
          {product?.is_best_seller == false && (
            <Button className="mt-3 text-white rounded-sm bg-primary">
              Best Seller
            </Button>
          )}
        </div>
      </div>
      {/* Details */}
      <SingleProductAccordion
        title="Details"
        description={product?.general_description}
      />

      {/* Variants */}
      {attributeOrder.map((attrName) => {
        const alreadySelected = selectedAttributes.find(
          (a) => a.name === attrName
        );

        const options = [
          ...new Set(
            product?.variants
              .filter((variant) =>
                selectedAttributes
                  .filter((sel) => sel.name !== attrName)
                  .every((sel) =>
                    variant.product_variants.some(
                      (pv) =>
                        pv.attribute.name === sel.name &&
                        pv.attribute_variant.name === sel.value
                    )
                  )
              )
              .map((v) => {
                const pv = v.product_variants.find(
                  (p) => p.attribute.name === attrName
                );
                return pv ? pv.attribute_variant.name : null;
              })
              .filter(Boolean)
          ),
        ];

        return (
          <div key={attrName} className="flex items-center gap-5 mb-4">
            <h3 className="text-base font-medium font-poppins lg:text-lg">
              {attrName.charAt(0).toUpperCase() + attrName.slice(1)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  className={`px-5 py-1 border rounded-md font-medium cursor-pointer ${
                    alreadySelected?.value === opt
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => {
                    if (opt !== null) handleSelect(attrName, opt);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors[attrName] && (
              <p className="mt-1 text-sm text-red-600">{errors[attrName]}</p>
            )}
          </div>
        );
      })}
      {/* Product Price */}
      <div className="flex flex-col items-start justify-between w-full gap-4 pt-2 pl-3 sm:flex-row sm:items-center sm:pl-0 sm:pt-6">
        <PriceRow
          price={
            product?.discount_percentage
              ? discountedPrice || ""
              : product?.price
          }
          previousPrice={product?.discount_percentage && product?.price}
          discountTag={
            product.is_flash_sale
              ? product.flash_sale_discount
              : product?.discount_percentage
          }
          priceClassname="gap-5"
          discountClassName="bg-primary text-white"
        />

        <div className="flex flex-row-reverse gap-8 sm:flex-row sm:gap-14 lg:gap-4 xl:gap-8 ">
          {stockQuantity !== null && (
            <Button
              className={`text-xs sm:text-sm w-17 !px-2 sm:text-md xl:text-base w-24 ${
                isAvailable ? "bg-primary" : "bg-gray-800 cursor-not-allowed"
              }`}
              disabled={!isAvailable}
            >
              {isAvailable ? "Available" : "Not Available"}
            </Button>
          )}

          <QuantityRow
            value={quantity}
            onDecrease={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            onIncrease={() => setQuantity((prev) => prev + 1)}
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full text-[#FFFFFF] font-bold py-1 md:py-5 xl:py-6 rounded-sm bg-primary"
      >
        ADD TO CART
        <ShoppingCart />
      </Button>
      {/* Share Section */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium font-poppins text-foreground">
            SHARE:
          </span>
          <div className="flex gap-8 ">
            <SocialShare />
          </div>
        </div>
      </div>
      {/* Payment Section */}
      <div className="flex items-center justify-between bg-secondary px-4 py-1 rounded-sm">
        <span className="text-sm font-medium text-foreground font-poppins">
          We Accept
        </span>
        <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-7">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-6 h-6">
              <Image src={coin.src} alt="COD" fill className="rounded-full " />
            </div>
            <span className="text-xs font-bold sm:text-sm font-poppins">
              C.O.D
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-10">
              <Image src={GetPay} alt="card" fill className="rounded-sm " />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-10 h-10">
              <Image
                src={PhonePay}
                alt="fonepay"
                fill
                className="rounded-sm "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionSection;
