"use client"
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import LinkText from '@/components/common/header/link-text';
import SectionHeader from '@/components/common/header/section-header';
import ProductCard from '@/components/common/cards/product-card';

const PRODUCTS = [
    { id: 1, imageSrc: 'https://images.unsplash.com/photo-1619352520578-8fefbfa2f904?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Red Lipstick', title: 'Red Lipstick', description: 'A beautiful red lipstick for all occasions', brand: 'Pastel Cosmetics', rating: 4.5, price: '$19.99' },
    { id: 2, imageSrc: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Calvin Klein Soft Tube', title: 'Calvin Klein Soft Tube', description: 'A soft tube from Calvin Klein', brand: 'Ubiya Derma', rating: 4.0, price: '$29.99' },
    { id: 3, imageSrc: 'https://images.unsplash.com/photo-1657297950139-179a9a70ea9e?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Jewelry', title: 'Jewelry', description: 'Elegant jewelry for special occasions', brand: 'Indoor Cosmetics', rating: 4.8, price: '$49.99' },
    { id: 4, imageSrc: 'https://images.unsplash.com/photo-1512351660358-6bed42b7b842?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Lip Glow Color Reviver Balm', title: 'Lip Glow Color Reviver Balm', description: 'A color reviver balm for your lips', brand: 'Channel', rating: 4.2, price: '$22.99' }
]

const TrendingSection: React.FunctionComponent = () => {
    return (
        <section className="padding space-y-4">
            <div className="flex justify-between items-center gap-4">
                <SectionHeader
                    className="max-w-[200px] sm:max-w-full"
                    title="Loved By Everyone"
                    titleClassName="font-playfair"
                    description="Find the trending products"
                />
                <LinkText title="Glow Shop" href="/shop" />
            </div>
            <div className="relative">
                <Carousel
                    className="w-full"
                >
                    <CarouselContent className="-ml-1 md:-ml-2">
                        {PRODUCTS.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="pl-2 basis-[45%] sm:basis-1/2 lg:basis-1/4"
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

export default TrendingSection