import Image from 'next/image'
import React from 'react'
import Rectangle1 from '@/assets/Rectangle28.png'
import Rectangle2 from '@/assets/Rectangle976.png'
const MermaidBanner = () => {
  return (
    <div className='padding flex flex-col md:flex-row w-full gap-4 lg:gap-8'>
        <div className='w-full h-60 md:h-80 lg:h-[450px] relative '>
            <Image
            fill
          src={Rectangle1}
          alt="Rectangle 1"
       
          className="object-cover rounded-2xl "
        />
        </div>
        <div className='w-full h-60 md:h-80 lg:h-[450px] relative '>
              <Image
              fill
          src={Rectangle2}
          alt="Rectangle 2"
          className="object-cover rounded-2xl"
          
        />
        </div>
    </div>
  )
}

export default MermaidBanner