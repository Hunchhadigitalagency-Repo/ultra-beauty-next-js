import React from 'react'
import Image from 'next/image'

interface GlowKitProps{
    image: string,
    title: string,
    desc: string
}

const GlowKitCard: React.FC<GlowKitProps> = ({image, title, desc}) => {
  return (
    <div className='flex flex-col w-[90%] items-center justify-center gap-2'>
    <div className=' w-full h-40 md: md:h-80  lg:h-96 relative overflow-hidden rounded-sm group cursor-pointer'>
       <Image
       src={image} 
       alt={title}
       layout='fill'
       />
    </div>
    <h3 className='text-center text-sm  uppercase text-[#7A7A7A] md:text-s font-medium font-poppins'>{title} </h3>
    <p className='text-center text-l md:text-2xl uppercase font-bold font-playfair'>{desc}</p>
</div>
  )
}

export default GlowKitCard