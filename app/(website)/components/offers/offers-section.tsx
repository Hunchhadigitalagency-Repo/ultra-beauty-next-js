import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import OffersCard from './offers-card';
import Offer1 from '@/assets/temp-images/offer1.png';
import Offer2 from '@/assets/temp-images/offer2.png';
import Offer3 from '@/assets/temp-images/offer3.png';
import Offer4 from '@/assets/temp-images/offer4.png';
import LinkText from '@/components/common/header/link-text';
import SectionHeader from '@/components/common/header/section-header';


const OFFERS_LIST = [
    { title: "Skin Care", image: Offer1 },
    { title: "Bridal Care", image: Offer2 },
    { title: "Make Up", image: Offer3 },
    { title: "Child Care", image: Offer4 },
]

const OffersSection = () => {
    return (
        <section className="padding space-y-4">
            <div className="flex justify-between items-center gap-4">
                <SectionHeader
                    className="max-w-[60%] sm:max-w-full"
                    title="The Offers"
                    titleClassName="font-playfair"
                    description="Best offers are once you buy them. Find all offer that we provide"
                />
                <LinkText title="Glow Shop" href="/shop" />
            </div>
            <div className="relative">
                <Carousel
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {OFFERS_LIST.map((offer) => (
                            <CarouselItem
                                key={offer.title}
                                className="pl-4 basis-[45%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                            >
                                <OffersCard product={offer.image.src} />
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

export default OffersSection