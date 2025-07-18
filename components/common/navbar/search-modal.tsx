import React from 'react'
import SearchBox from '../filter/search-box'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import PopularCard from './popular-card'


const CATEGORY_LIST = [
    { title: "Skin Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Bridal Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Make Up", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Child Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
    { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
]

const SearchModal = () => {
    return (
        <div className="absolute w-full z-50 top-full right-0 bg-white padding-y shadow-md mt-4">
            <div className="w-full flex justify-center items-center gap-5">
                <SearchBox placeholder="Find the Product of Your Choice" />
                <button className="bg-primary text-white px-4 py-1.5 rounded-md hover:bg-primary/90 transition-colors cursor-pointer">
                    <p className="text-base">Search</p>
                </button>
            </div>
            <div className="grid grid-cols-[20%_80%] gap-4 mt-4 padding-x">
                <section className="flex flex-col gap-5">
                    <h1 className="text-primary font-playfair font-bold text-3xl">Popular Search</h1>
                    <ul className="text-base font-normal text-foreground flex flex-col gap-2">
                        <li className="cursor-pointer">Foundation & Compact</li>
                        <li className="cursor-pointer">MakeUp Serum</li>
                        <li className="cursor-pointer">Eyeliner</li>
                        <li className="cursor-pointer">Bridal Cosmetics</li>
                        <li className="cursor-pointer">Nail Polish</li>
                        <li className="cursor-pointer">Foundation & Compact</li>
                        <li className="cursor-pointer">Eye MakeUp & Mascara</li>
                    </ul>
                </section>
                <section className="flex flex-col gap-5">
                    <Carousel className="w-full relative" opts={{ align: 'start' }}>
                        <div className='flex justify-between pb-4'>
                            <h1 className="text-primary font-playfair font-bold text-3xl">Most Popular</h1>
                        </div>

                        {/* Buttons in the top-right corner */}
                        <div className="absolute top-2 right-10 flex space-x-2 z-10">
                            <CarouselPrevious className="hidden lg:flex bg-transparent border-0 hover:bg-transparent hover:text-foreground shadow-none" />
                            <CarouselNext className="hidden lg:flex bg-transparent border-0 hover:bg-transparent hover:text-foreground shadow-none" />
                        </div>

                        <CarouselContent className="-ml-1 lg:-ml-4">
                            {CATEGORY_LIST.map((category, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-[40%] pl-4  sm:basis-1/3 lg:basis-1/4"
                                >
                                    <PopularCard image={category.image} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>



                </section>
            </div>
        </div>
    )
}

export default SearchModal