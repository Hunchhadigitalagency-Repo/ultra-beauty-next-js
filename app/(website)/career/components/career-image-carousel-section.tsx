import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import ImageCard from './image-card';


const OFFERS_LIST = [
    { title: "Skin Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Bridal Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Make Up", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Child Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
]

const CareerImageCarouselSection: React.FunctionComponent = () => {
    return (
        <section className='pb-0 lg:pb-10'>
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
                                <ImageCard product={offer.image} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className='hidden lg:flex absolute -bottom-10 right-10'>
                        <CarouselPrevious className='' />
                        <CarouselNext className='' />
                    </div>
                </Carousel>
            </div>
        </section>
    )
}

export default CareerImageCarouselSection