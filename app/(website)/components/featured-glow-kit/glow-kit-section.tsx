import LinkText from '@/components/common/header/link-text'
import SectionHeader from '@/components/common/header/section-header'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import GlowKitCard from './glow-kit-card'

const GlowKitList=[
    {
        image:"https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title:"Moira Cosmetics", 
        desc:"Hemp Seed Aloe Vera Serum Mist"
     },
    {
        image:"https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title:"Moira Cosmetics", 
        desc:"Maskar Eye Liner Lines Set"
     },
    
    {
        image:"https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title:"Moira Cosmetics", 
        desc:"Hemp Seed Aloe Vera Serum Mist"
     }


]

const GlowKitSection = () => {
  return (
    <section className="padding flex flex-col gap-2 md:gap-4 ">
      <div className="flex justify-between gap-4 ">
        <SectionHeader
          title="Featured Glow Kit"
          titleClassName="font-playfair text-[#333333] "
          description="Make yourself Up to fit the every Occassion"
        />
        <LinkText title="ALL BRANDS" href="/shop" />
      </div>

      <div className="relative w-full">
        <Carousel>
          <CarouselContent className='-ml-0 flex sm:gap-5'>
            {GlowKitList.map((kit, index) => (
              <CarouselItem
                key={index}
                className="pl-0 basis-[45%]   md:basis-[45%] lg:basis-[32%]" >
                <GlowKitCard image={kit.image} title={kit.title} desc={kit.desc} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export default GlowKitSection