"use client"

import React, { useState } from 'react';
import { Result } from '@/types/product';
import useFetchData from '@/hooks/use-fetch';
import { useAppSelector } from '@/redux/hooks';
import LinkText from '@/components/common/header/link-text';
import { useToggleWishlist } from '@/utils/wishList-utility';
import ProductCard from '@/components/common/cards/product-card';
import SectionHeader from '@/components/common/header/section-header';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { FeaturedCategoriesResponse } from '@/types/featured-categories';

type CategoryProductProps = {
    featuredCategoryId: number;
    featuredCategory: FeaturedCategoriesResponse
}

interface CategoryWiseProduct extends Result {
    id: number
}

const CategoryProduct: React.FunctionComponent<CategoryProductProps> = ({ featuredCategoryId, featuredCategory }) => {

    const toggleWishlist = useToggleWishlist();
    const { isLoggedIn } = useAppSelector((state) => state.authentication)
    const [isWishlisted, setIsWishlisted] = useState<Record<string, boolean>>({});

    const handleToggleWishlist = (slug: string | undefined, isWishlisted: boolean | undefined) => {
        if (!slug) return;
        toggleWishlist(slug, isWishlisted, isLoggedIn);

        setIsWishlisted((prev) => ({
            ...prev,
            [slug]: !isWishlisted,
        }));
    };

    const { data: categoryWiseProducts, loading: isLoading, error } = useFetchData<CategoryWiseProduct[]>(`category-wise-products/${featuredCategoryId}/`);

    return (
        <section className="space-y-4 padding">
            <div className="flex items-center justify-between gap-4">
                <SectionHeader
                    className="max-w-[60%] sm:max-w-full"
                    title={featuredCategory.name}
                // description="hello"
                />
                <LinkText title="Glow Shop" href="/shop" />
            </div>
            <div>
                {
                    isLoading ? (
                        <div className='h-60 flex w-full justify-center items-center'>
                            <p className='text-gray'>
                                Loading {featuredCategory.name}...
                            </p>
                        </div>
                    ) : error ? (
                        <div className='h-60 flex w-full justify-center items-center'>
                            <p className='text-red'>
                                Error While Fetching {featuredCategory.name} Products
                            </p>
                        </div>
                    ) : categoryWiseProducts?.length === 0 ? (
                        <div className='h-60 flex w-full justify-center items-center'>
                            <p className='text-red'>
                                No {featuredCategory.name} found
                            </p>
                        </div>
                    ) :
                        (
                            <Carousel
                                className="w-full"
                            >
                                <CarouselContent className="-ml-4">
                                    {
                                        categoryWiseProducts?.map((categoryWiseProduct) => {

                                            return (
                                                <CarouselItem
                                                    key={categoryWiseProduct.id}
                                                    className="pl-4 basis-1/2 lg:basis-1/4"
                                                >
                                                    <div className="flex w-full h-full">
                                                        <ProductCard
                                                            // id={product.id}
                                                            imageSrc={categoryWiseProduct.images?.[0]?.file}
                                                            alt={categoryWiseProduct.name}
                                                            title={categoryWiseProduct.name}
                                                            price={categoryWiseProduct.price}
                                                            rating={categoryWiseProduct.average_rating}
                                                            slug={categoryWiseProduct.slug_name}
                                                            isWishlisted={isWishlisted[categoryWiseProduct.slug_name] ?? categoryWiseProduct.my_wishlist}
                                                            onToggleWishlist={handleToggleWishlist}
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            )
                                        })
                                    }
                                </CarouselContent>

                                {/* Navigation Arrows */}
                                <CarouselPrevious className="absolute left-0 hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex top-1/3 hover:bg-gray-50" />
                                <CarouselNext className="absolute right-0 hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex top-1/3 hover:bg-gray-50" />
                            </Carousel>
                        )
                }
            </div>
        </section>
    )
}

export default CategoryProduct