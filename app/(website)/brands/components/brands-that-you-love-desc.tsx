import React from 'react';
import Image from 'next/image';
import letan from "@/assets/LeTan.png";
import moira from "@/assets/MORIA.png";
import urban from "@/assets/URBAN.png";
import australis from "@/assets/australis.png";
import { MdFormatQuote } from "react-icons/md";
import SearchBox from '@/components/common/filter/search-box';
import SectionHeader from '@/components/common/header/section-header';

const BrandItems = [
  {
    image: australis,
    name: "Australis",
    decription: "The major cosmetic product brands and what makes them stand out. These brands operate in various  segments of  the  beauty  industry skincare, makeup, haircare, and fragrance—and cater to different customer needs, price ranges, and global  markets.  The major  cosmetic  product  brands and what makes them stand out. These brands operate in various segments of the beauty industry—skincare, makeup, haircare, and fragranceand cater to different customer needs, price ranges, and global markets .The major cosmetic product brands and what  makes them  stand  out.  These brands operate in various segments of the beauty industry—skincare, makeup,  haircare,  and  fragrance— and  cater to  different  customer needs, price ranges, and global markets.The major cosmetic product brands and what makes them stand out. These brands operate in various  segments of the beauty industry—skincare, makeup, haircare, and fragrance—and cater to different customer needs, price ranges, and global markets"
  },
  {
    image: moira,
    name: "Moira",
    decription: "The major cosmetic product brands and what makes them stand out. These brands operate in various  segments of  the  beauty  industry skincare, makeup, haircare, and fragrance—and cater to different customer needs, price ranges, and global  markets.  The major  cosmetic  product  brands and what makes them stand out. These brands operate in various segments of the beauty industry—skincare, makeup, haircare, and fragranceand cater to different customer needs, price ranges, and global markets .The major cosmetic product brands and what  makes them  stand  out.  These brands operate in various segments of the beauty industry—skincare, makeup,  haircare,  and  fragrance— and  cater to  different  customer needs, price ranges, and global markets.The major cosmetic product brands and what makes them stand out. These brands operate in various  segments of the beauty industry—skincare, makeup, haircare, and fragrance—and cater to different customer needs, price ranges, and global markets"
  },
  {
    image: letan,
    name: "Le Tan",
    decription: "The major cosmetic product brands and what makes them stand out. These brands operate in various  segments of  the  beauty  industry skincare, makeup, haircare, and fragrance—and cater to different customer needs, price ranges, and global  markets.  The major  cosmetic  product  brands and what makes them stand out. These brands operate in various segments of the beauty industry—skincare, makeup, haircare, and fragranceand cater to different customer needs, price ranges, and global markets .The major cosmetic product brands and what  makes them  stand  out.  These brands operate in various segments of the beauty industry—skincare, makeup,  haircare,  and  fragrance— and  cater to  different  customer needs, price ranges, and global markets.The major cosmetic product brands and what makes them stand out. These brands operate in various  segments of the beauty industry—skincare, makeup, haircare, and fragrance—and cater to different customer needs, price ranges, and global markets"
  },
  {
    image: urban,
    name: "Urban",
    decription: "The major cosmetic product brands and what makes them stand out. These brands operate in various  segments of  the  beauty  industry skincare, makeup, haircare, and fragrance—and cater to different customer needs, price ranges, and global  markets.  The major  cosmetic  product  brands and what makes them stand out. These brands operate in various segments of the beauty industry—skincare, makeup, haircare, and fragranceand cater to different customer needs, price ranges, and global markets .The major cosmetic product brands and what  makes them  stand  out.  These brands operate in various segments of the beauty industry—skincare, makeup,  haircare,  and  fragrance— and  cater to  different  customer needs, price ranges, and global markets.The major cosmetic product brands and what makes them stand out. These brands operate in various  segments of the beauty industry—skincare, makeup, haircare, and fragrance—and cater to different customer needs, price ranges, and global markets"
  }
]

const BrandsDescSection = () => {
  return (
    <section className='padding space-y-8'>
      <div className='flex flex-col md:flex-row gap-5 justify-between'>
        <SectionHeader
          titleClassName='text-xl md:text-2xl xl:text-3xl'
          descriptionClassName=' md:text-sm lg:text-base'
          title="Brands That You Love"
          description="Find the brand from the market that are loved by most women."
        />
        <SearchBox
          className='rounded-sm text-sm md:text-xl lg:text-base py-2 md:mt-5 font-semibold focus-visible:border-white'
          placeholder="Find the brand as your requirement"
        />
      </div>

      {/* brand level with description */}
      <div className="space-y-10">
        {BrandItems.map((brand, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] gap-4 sm:gap-7 items-start rounded-md"
          >
            {/* Image Block */}
            <div className="w-full flex gap-3  border border-pink-300 justify-center items-center rounded-sm p-2">
              <div className="relative w-28 h-16 rounded-none sm:w-full sm:h-28 md:h-32">
                <Image
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>

            {/* Description Block */}
            <div className="w-full space-y-1">
              <MdFormatQuote className="text-primary w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-playfair text-primary">
                {brand.name}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground font-poppins text-justify">
                {brand.decription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

  )
}

export default BrandsDescSection