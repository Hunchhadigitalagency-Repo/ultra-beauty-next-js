// utils/calculatePrice.ts
export function calculatePrice({
    price,
    is_flash_sale,
    flash_sale_discount,
    discountTag,
}: {
    price: string;
    is_flash_sale?: boolean;
    flash_sale_discount?: string | number;
    discountTag?: string | number;
}) {
    const numericPrice = parseFloat(price);

    let finalPrice = numericPrice;
    let previousPrice: string | null = null;
    let discount: string | null = null;

    // Convert inputs to numbers or 0 if not provided
    const flashSalePercent =
        is_flash_sale && flash_sale_discount && flash_sale_discount !== "0"
            ? parseFloat(flash_sale_discount.toString())
            : 0;

    const normalDiscountPercent =
        discountTag && discountTag !== "0"
            ? parseFloat(discountTag.toString())
            : 0;

    // Sum up the discounts if both apply
    const totalDiscountPercent = is_flash_sale ? flashSalePercent : normalDiscountPercent;

    if (totalDiscountPercent > 0) {
        previousPrice = numericPrice.toFixed(2);
        finalPrice =
            numericPrice - (numericPrice * totalDiscountPercent) / 100;
        discount = totalDiscountPercent.toString();
    }

    return {
        finalPrice: finalPrice.toFixed(2),
        previousPrice,
        discountTag: discount,
    };
}
