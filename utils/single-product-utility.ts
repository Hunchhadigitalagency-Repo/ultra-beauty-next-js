import { ErrorState, SelectedAttribute, SingleProductResponse } from "@/types/product";

interface GetOptionProps {
    selectedAttribute: SelectedAttribute[];
    product: SingleProductResponse;
    attributeOrder: string[];
}


export const getOptions = ({ selectedAttribute, product, attributeOrder }: GetOptionProps) => {
    let filteredVariants = product.variants.filter((variant) =>
        selectedAttribute.every((sel) =>
            variant.product_variants.some(
                (pv) =>
                    pv.attribute.name === sel.name &&
                    pv.attribute_variant.name === sel.value
            )
        )
    );

    const nextAttributeName = attributeOrder.find(
        (name) => !selectedAttribute.some((sel) => sel.name === name)
    );

    if (!nextAttributeName) {
        return { type: "variant" as const, data: filteredVariants };
    }

    const nextOptions = [
        ...new Set(
            filteredVariants
                .map((v) => {
                    const attr = v.product_variants.find(
                        (pv) => pv.attribute.name === nextAttributeName
                    );
                    return attr ? attr.attribute_variant.name : null;
                })
                .filter(Boolean)
        ),
    ];

    return { type: "attribute" as const, name: nextAttributeName, options: nextOptions };
}
