"use client"
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import LinkText from '@/components/common/header/link-text';
import ProductCard from '@/components/common/cards/product-card';
import SectionHeader from '@/components/common/header/section-header';

type Product = {
    id: number;
    imageSrc: string;
    alt: string;
    title: string;
    description: string;
    brand: string;
    rating: number;
    price: string;
};

interface ProductSectionProps {
    headerTitle: string;
    headerDescription: string;
    headerLink: string;
    products: Product[]
}

const ProductSection: React.FunctionComponent<ProductSectionProps> = ({ headerTitle, headerDescription, headerLink, products }) => {
    return (
        <section className="padding space-y-4">
            <div className="flex justify-between items-center gap-4">
                <SectionHeader
                    className="max-w-[200px] sm:max-w-full"
                    title={headerTitle}
                    titleClassName="font-playfair"
                    description={headerDescription}
                />
                <LinkText title="Glow Shop" href={headerLink} />
            </div>
            <div className="relative">
                <Carousel
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {products.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="pl-4 h-full basis-[45%] sm:basis-1/2 md:basis-1/2 lg:basis-1/4"
                            >
                                <ProductCard
                                    brandname={product.brand}
                                    id={product.id}
                                    imageSrc={product.imageSrc}
                                    alt={product.alt}
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    rating={product.rating}
                                    onToggleWishlist={() => { }}
                                    isWishlisted={false} // Placeholder, implement wishlist logic as needed
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Arrows */}
                    <CarouselPrevious className=" hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
                    <CarouselNext className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
                </Carousel>
            </div>
        </section>
    )
}

export default ProductSection