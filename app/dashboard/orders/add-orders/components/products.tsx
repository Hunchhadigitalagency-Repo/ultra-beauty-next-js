import { IProduct } from '@/types/product'
import React from 'react'
import SingleProductCard from './single-product-card'

interface ProductsProps {
    products: IProduct[]
}
const ProductsListDashboard = ({ products }: ProductsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 bg-white p-4">
            {products.map((product: any, index: number) => (
                <SingleProductCard
                    key={index}
                    id={product.id}
                    slug={product?.slug_name}
                    title={product.name}
                    price={product.price}
                    imageSrc={product.images?.[0]?.file || "/fallback-image.jpg"}
                    alt={product.name}
                    category={product.category.name}
                    description={product.general_description}
                    discountTag={product.discount_percentage}
                    rating={product.average_rating}
                    isWishlisted={product.my_wishlist}
                    is_flash_sale={product.is_flash_sale}
                    flash_end_date={product.flash_end_date}
                    flash_sale_discount={product.flash_sale_discount}
                    is_new={product.is_new}
                    product={product}
                />
            ))}
        </div>
    )
}

export default ProductsListDashboard
