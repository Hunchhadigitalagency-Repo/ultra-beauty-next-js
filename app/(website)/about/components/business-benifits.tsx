import React from 'react';
import Image from 'next/image';
import benifitsrectangle from '@/assets/benifitsrectangle.png';
import benifitsrectangle2 from '@/assets/benifitsrectangle2.png';

const BUSINESS_BENIFITS_DATA = [
    {
        id: 1,
        title: " Increased Sales:",
        description: "aestheti and hygiene related functoins. Cosmetic formulations often contain acom bination of water, emolients, humectants, preservatives, fragrances,colorants and active",
    }, {
        id: 2,
        title: "Cost Effective Marketing:",
        description: " aestheti and hygiene related functoins. Cosmetic formulations often contain acom bination of water, emolients, humectants, preservatives, fragrances,colorants and active",
    }, {
        id: 3,
        title: "Enchanced Customer Experience:",
        description: " aestheti and hygiene related functoins. Cosmetic formulations often contain acom bination of water, emolients, humectants, preservatives, fragrances,colorants and active",
    }, {
        id: 4,
        title: "Flexibility And Adaptability:",
        description: " aestheti and hygiene related functoins. Cosmetic formulations often contain acom bination of water, emolients, humectants, preservatives, fragrances,colorants and active",
    }
]

const BusinessBenifits: React.FunctionComponent = () => {


    return (
        <div className='relative my-10 md:mb-35 '>
            <div style={{ backgroundImage: `url(${benifitsrectangle.src})` }} className='bg-cover w-full h-full text-white padding  my-10 flex flex-col'>
                <div className='lg:w-[65%] flex flex-col gap-6 my-8'>
                    {BUSINESS_BENIFITS_DATA.map((item) =>
                        <div className='flex gap-3' key={item.id}>
                            <div className='bg-primary md:w-[78px] md:h-[73px] rounded-full lg:min-w-[78px] lg:min-h-[78px] flex justify-center items-center text-white font-bold md:text-3xl min-w-[60px] min-h-[60px] w-[60px] h-[60px]'>
                                {item.id}
                            </div>
                            {/* Item Title */}
                            <div>
                                <h1 className='font-playfair font-bold md:text-2xl sm:text-xl py-2'>
                                    {item.title}
                                </h1>
                                {/* Item Description */}
                                <p className='md:text-base text-sm tracking-tight'>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            <div >
                <Image
                    src={benifitsrectangle2}
                    alt='Girl Image'
                    className='md:absolute md:right-15 md:-bottom-12  px-5 md:px-0'
                    width={520}
                    height={520}
                />
            </div>
        </div>
    )
}

export default BusinessBenifits