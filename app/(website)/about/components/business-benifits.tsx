import React from 'react'
import benifitsrectangle from '@/assets/benifitsrectangle.png'
import Image from 'next/image'
import benifitsrectangle2 from '@/assets/benifitsrectangle2.png'

const BusinessBenifits = () => {
  return (
    <div style={{backgroundImage:`url(${benifitsrectangle.src})`}} className='bg-cover w-full h-full text-white padding relative mb-20'>
    <div className='lg:w-[65%] flex flex-col gap-6'>
        <div className='flex gap-3'>
            <div className='bg-[#FF2B5F] md:w-[78px] md:h-[73px] rounded-full lg:min-w-[78px] lg:min-h-[78px] flex justify-center items-center text-white font-bold md:text-3xl min-w-[60px] min-h-[60px] w-[60px] h-[60px]'>1</div>
            <div><h1 className='font-playfair font-bold md:text-2xl sm:text-xl py-2'>Increased Sales:</h1>
                <p className='md:text-base text-sm tracking-tight'>aestheti and hygiene related functoins. Cosmetic formulations often contain acom bination of water, emolients, humectants, preservatives, fragrances,colorants and active</p>
            </div>
        </div>
          <div className='flex gap-3'>
            <div className='bg-[#FF2B5F] md:w-[78px] md:h-[73px] rounded-full lg:min-w-[78px] lg:min-h-[78px] flex justify-center items-center text-white font-bold md:text-3xl min-w-[60px] min-h-[60px] w-[60px] h-[60px]'>2</div>
            <div><h1 className='font-playfair font-bold md:text-2xl sm:text-xl py-2'>Cost Effective Marketing:</h1>
                <p className='md:text-base text-sm tracking-tight'>aestheti and hygiene related functoins. Cosmetic formulations often contain acom bination of water, emolients, humectants, preservatives, fragrances,colorants and active</p>
            </div>
        </div>
         <div className='flex gap-3'>
            <div className='bg-[#FF2B5F] md:w-[78px] md:h-[73px] rounded-full lg:min-w-[78px] lg:min-h-[78px] flex justify-center items-center text-white font-bold md:text-3xl min-w-[60px] min-h-[60px] w-[60px] h-[60px]'>3</div>
            <div><h1 className='font-playfair font-bold md:text-2xl sm:text-xl py-2'>Enchanced Customer Experience:</h1>
                <p className='md:text-base text-sm tracking-tight'>aestheti and hygiene related functoins. Cosmetic formulations often contain acom bination of water, emolients, humectants, preservatives, fragrances,colorants and active</p>
            </div>
        </div>
         <div className='flex gap-3'>
            <div className='bg-[#FF2B5F] md:w-[78px] md:h-[73px] rounded-full lg:min-w-[78px] lg:min-h-[78px] flex justify-center items-center text-white font-bold md:text-3xl min-w-[60px] min-h-[60px] w-[60px] h-[60px]'>4</div>
            <div><h1 className='font-playfair font-bold md:text-2xl sm:text-xl py-2'>Flexibility And Adaptability:</h1>
                <p className='md:text-base text-sm tracking-tight'>aestheti and hygiene related functoins. Cosmetic formulations often contain acom bination of water, emolients, humectants, preservatives, fragrances,colorants and active</p>
            </div>
        </div>
       </div>
       <div className='hidden lg:block'>
       <Image src={benifitsrectangle2} alt='Girl Image' className='absolute right-15 -bottom-20 ' width={500} height={500} /></div>
       </div>
  )
}

export default BusinessBenifits