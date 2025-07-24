import React from 'react';
import Image from 'next/image';
import Rectangle1 from '@/assets/Rectangle28.png';
import Rectangle2 from '@/assets/Rectangle976.png';
const MermaidBanner = () => {
  return (
    <div className='padding grid grid-cols-2 w-full gap-4 lg:gap-8 '>
        <div className='w-full aspect-square  relative lg:aspect-5/3 '>
            <Image
            fill
          src={Rectangle1}
          alt="Rectangle 1"
       
          className="object-cover rounded-2xl "
        />
        </div>
        <div className='w-full aspect-square relative lg:aspect-5/3'>
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