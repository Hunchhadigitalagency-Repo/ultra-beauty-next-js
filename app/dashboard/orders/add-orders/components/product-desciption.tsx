"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch, } from "@/redux/hooks";
import QuantityRow from "@/components/common/product/quantity-row";
import RatingStars from "@/components/common/product/rating-stars";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ErrorState, SelectedAttribute, IVariantAttribute, IDashboardProduct } from "@/types/product";
import {
    BaggageClaim,
    DeleteIcon,
} from "lucide-react";

import { getOptions } from "@/utils/single-product-utility";
import PriceRow from "@/components/common/product/price-row";
import { toast } from "sonner";
import { calculatePrice } from "@/hooks/use-price-calculator";
import Image from "next/image";
import CardChips from "@/components/common/chips/card-chips";
import { EChips } from "@/types/chip-type";
// import { CartItem } from "@/types/cart";
import { addProductItem } from "@/redux/features/checkout-slice";
import SingleProductAccordion from "@/app/(website)/shop/[slug]/components/single-product-accordion";
interface Props {
    product: IDashboardProduct,
    onClose?: () => void;
}

const ProductDescriptionSection: React.FunctionComponent<Partial<Props>> = ({ product, onClose }) => {

    const [quantity, setQuantity] = useState(1);
    const [errors, setErrors] = useState<ErrorState>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttribute[]>([]);
    const dispatch = useAppDispatch()
    // console.log(product);

    // console.log(checkStock)
    const attributeOrder = useMemo(() => {
        return (
            product?.variants[0]?.product_variants.map(
                (pv) => pv.attribute.name
            ) || []
        );
    }, [product?.variants]);

    const optionStep = product
        ? getOptions({
            selectedAttribute: selectedAttributes,
            product: product as any,
            attributeOrder: attributeOrder
        })
        : { data: [] }; // or a se
    const variantData = optionStep.data?.map(item => ({
        variantId: item.id,
        quantity: item.item_quantity
    }))?.[0];

    const variantId = variantData?.variantId?.toString() || "";

    // Check if all attributes are selected
    const allAttributesSelected = attributeOrder.length === 0 ||
        attributeOrder.every(attrName =>
            selectedAttributes.some(sel => sel.name === attrName)
        );

    // Calculate available stock based on selection state
    let availableStock = 0;

    if (attributeOrder.length === 0) {
        availableStock = Number(product?.quantity ?? 0)
    } else if (allAttributesSelected && variantData) {
        availableStock = variantData.quantity ?? 0;
    } else {
        availableStock = Number(product?.quantity ?? 0);
    }


    const validateSelection = useCallback(() => {
        const newErrors: ErrorState = {};

        attributeOrder.forEach(attrName => {
            if (!selectedAttributes.some(sel => sel.name === attrName)) {
                newErrors[attrName] = `Please select a variant for ${attrName}`;
            } else {
                newErrors[attrName] = null;
            }
        });

        setErrors(prevErrors => {
            const isEqual = attributeOrder.every(
                attrName => prevErrors[attrName] === newErrors[attrName]
            );
            if (isEqual) {
                return prevErrors;
            }
            return newErrors;
        });

        return !Object.values(newErrors).some(err => err !== null);
    }, [attributeOrder, selectedAttributes, setErrors]);

    useEffect(() => {
        if (!hasSubmitted) return;
        validateSelection();
    }, [selectedAttributes, hasSubmitted, validateSelection]);

    const discountedPrice = product?.discount_percentage
        ? (
            Number(product?.price) -
            (Number(product?.price) * Number(product?.discount_percentage)) / 100
        ).toFixed(2)
        : null;

    function handleSelect(name: string, value: string) {
        setSelectedAttributes((prev) => {
            const existingIndex = prev.findIndex(attr => attr.name === name);
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

        const isValidSelection = validateSelection();
        if (!isValidSelection) return;

        if (availableStock === 0) {
            toast.error("Selected variant is out of stock");
            return;
        }

        if (!product) return;



        const variantAttributes: IVariantAttribute[] =
            product.variants
                .find(v => v.id.toString() === variantId)
                ?.product_variants.map(pv => ({
                    id: pv.id,
                    attribute: {
                        id: pv.attribute.id,
                        name: pv.attribute.name
                    },
                    attribute_variant: {
                        id: pv.attribute_variant.id,
                        name: pv.attribute_variant.name
                    },
                    updated_at: pv.updated_at
                })) || [];


        const cartItem: any = {
            id: "123",
            slug: product?.slug_name,
            name: product.name,
            image: product.images[0]?.file || "",
            color: selectedAttributes.find(a => a.name.toLowerCase() === "color")?.value || "",
            size: selectedAttributes.find(a => a.name.toLowerCase() === "size")?.value || "",
            originalPrice: Number(product.price),
            currentPrice: parseInt(finalPrice),
            discount: Number(product.discount_percentage) || 0,
            quantity,
            selected: true,
            productId: product.id,
            is_tax_applicable: product.is_tax_applicable || false,
            tax_percent: product?.tax_applied?.tax_percentage || 0,
            attribute: variantAttributes
        };

        dispatch(addProductItem(cartItem));
        toast.message("Product added")
        onClose?.();
    };


    const {
        finalPrice,
        previousPrice,
        discountTag: finalDiscountTag,
    } = product
            ? calculatePrice({
                price: product.price,
                is_flash_sale: product.is_flash_sale,
                flash_sale_discount: product.flash_sale_discount || "",
                discountTag: product.discount_percentage,
            })
            : { finalPrice: "", previousPrice: "", discountTag: "" };

    console.log(previousPrice, finalDiscountTag);
    return (

        <div className="flex flex-col   p-6 md:p-12 h-fit max-h-[600px]">
            <div className="flex flex-col md:flex-row gap-4">

                <div className="w-full md:w-1/2 h-[250px] md:h-[350px] relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={product?.images[0]?.file || ""}
                        alt={product?.name || 'Image'}
                        fill
                        className="object-cover"
                    />
                    {/* Chips */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {product?.is_best_seller && (
                            <CardChips title="Best Seller" chipType={EChips.IS_BEST_SELLER} />
                        )}
                        {product?.is_flash_sale && (
                            <CardChips title="Flash Sale" chipType={EChips.IS_FLASH_SALE} />
                        )}
                        {product?.is_new && <CardChips title="New" chipType={EChips.IS_NEW} />}
                    </div>
                </div>


                <div className="flex-1 flex flex-col gap-4 ">
                    <div className="flex items-center gap-2">
                        <RatingStars rating={product?.average_rating || 0} />
                        <span className="text-sm text-gray-500">{product?.average_rating}/5 Star Rating</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product?.name}</h1>
                    <SingleProductAccordion
                        title="Details"
                        description={product?.general_description || ''} />

                    <div className="flex gap-2 ">
                        {
                            attributeOrder.map((attrName) => {
                                const alreadySelected = selectedAttributes.find(a => a.name === attrName);

                                const options = [
                                    ...new Set(
                                        product?.variants
                                            .filter(variant =>
                                                selectedAttributes
                                                    .filter(sel => sel.name !== attrName)
                                                    .every(sel =>
                                                        variant.product_variants.some(
                                                            pv =>
                                                                pv.attribute.name === sel.name &&
                                                                pv.attribute_variant.name === sel.value
                                                        )
                                                    )
                                            )
                                            .map(v => {
                                                const pv = v.product_variants.find(p => p.attribute.name === attrName);
                                                return pv ? pv.attribute_variant.name : null;
                                            })
                                            .filter(Boolean)
                                    ),
                                ];

                                return (
                                    <div key={attrName} className="flex items-center gap-5 mb-4">
                                        <h3 className="text-md font-medium font-poppins lg:text-lg">
                                            {
                                                attrName.charAt(0).toUpperCase() + attrName.slice(1)
                                            }
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {
                                                options.map(opt => (
                                                    <button
                                                        key={opt}
                                                        className={`px-5 py-1 border rounded-md text-sm  cursor-pointer ${alreadySelected?.value === opt ? "bg-primary text-white" : "bg-white text-black"
                                                            }`}
                                                        onClick={() => {
                                                            if (opt !== null) handleSelect(attrName, opt);
                                                        }}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                        {
                                            errors[attrName] && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors[attrName]}
                                                </p>
                                            )
                                        }
                                    </div>
                                );
                            }
                            )
                        }
                        {selectedAttributes.length > 0 && (
                            <Button onClick={() => setSelectedAttributes([])} variant="destructive" className="text-sm h-9 w-max flex items-center gap-2">
                                Clear  <DeleteIcon />
                            </Button>
                        )}
                    </div>

                    <div className="flex">
                        <div className="flex flex-col items-start justify-between w-full gap-4 pt-2 pl-3 sm:flex-row sm:items-center sm:pl-0 sm:pt-6">
                            <PriceRow
                                price={product?.discount_percentage ? discountedPrice || '' : product?.price || ''}
                                previousPrice={product?.discount_percentage && product?.price}
                                // discountTag={product?.discount_percentage}
                                priceClassname="gap-5"
                                discountClassName="bg-primary text-white"
                            />

                            <div className="flex flex-row-reverse gap-8 sm:flex-row sm:gap-14 lg:gap-4 xl:gap-8 ">
                                {quantity !== null && (

                                    <span
                                        className={`bg-primary items-center flex  text-white text-sm px-3 py-1 rounded`}
                                    >
                                        {quantity > 0 ? "Available" : "Not Available"}    </span>
                                )}
                                <QuantityRow
                                    value={quantity}
                                    onDecrease={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                                    onIncrease={() => setQuantity((prev) => (prev + 1))}
                                />
                            </div>

                        </div>

                    </div>


                    {/* <div className="mt-4">
                    {discountedPrice ? (
                        <PriceRow
                            previousPrice={previousPrice || ""}
                            price={finalPrice}
                            discountTag={finalDiscountTag || ""}
                            className="flex items-center gap-4"
                            priceClassname="text-2xl font-bold text-gray-900"
                            discountClassName="text-sm text-red-500"
                        />
                    ) : (
                        <h2 className="text-2xl font-bold text-green-500">NPR. {product?.price}</h2>
                    )}
                </div> */}


                </div>
            </div>
            <Button
                className={`w-full text-black font-medium h-12 rounded-full mt-4 ${availableStock === 0 ? "bg-gray-300 cursor-not-allowed" : " w-full text-[#FFFFFF] font-bold py-1 md:py-5 xl:py-6 rounded-sm bg-primary"}`}
                onClick={handleSubmit}
                disabled={availableStock === 0}
            >
                Add to Bag <BaggageClaim className="ml-2" />
            </Button>
        </div>

    );
};

export default ProductDescriptionSection;