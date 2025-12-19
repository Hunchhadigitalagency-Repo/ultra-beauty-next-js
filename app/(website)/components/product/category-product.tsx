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
import { AlertCircle } from 'lucide-react';

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
                />
                <LinkText title="Glow Shop" href={`/shop/${featuredCategory.id}`} />
            </div>
            <div>
                {
                    isLoading ? (
                        <div className='h-60 flex w-full justify-center items-center'>
                            <p className='font-extralight text-sm text-gray-400'>
                                Loading {featuredCategory.name}...
                            </p>
                        </div>
                    ) : error ? (
                        <div className='flex flex-col items-center justify-center w-full h-60'>
                            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                            <p className='text-sm font-extralight text-gray-400'>
                                Oops! Something went wrong...
                            </p>
                        </div>
                    ) : categoryWiseProducts?.length === 0 ? (
                        <div className='flex flex-col items-center justify-center w-full h-60'>
                            <AlertCircle className="w-8 h-8 mb-2 font-semibold text-gray-400" />
                            <p className='font-extralight text-sm text-gray-400 capitalize'>
                                Oops! no {featuredCategory.name} products right now...
                            </p>
                        </div>
                    ) :
                        (
                            <Carousel
                                className="w-full"
                            >
                                <CarouselContent>
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
                                                            discountTag={categoryWiseProduct.discount_percentage}
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