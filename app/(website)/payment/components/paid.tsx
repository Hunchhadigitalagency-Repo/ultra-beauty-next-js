import React from 'react'
import { FaCheck } from "react-icons/fa";
const Paid: React.FunctionComponent = () => {
    return (
        <div className='flex justify-center items-center border-2 h-170 '>
            <div className='flex flex-col gap-4 text-center'>
                <div className='h-20 w-20 rounded-full border-2 mx-auto bg-green flex justify-center items-center text-white text-3xl'>
                    <FaCheck />
                </div>
                <h1 className='font-semibold text-green'>
                    Total Payment:2000
                </h1>
                <h3 className='text-base md:text-lg font-semibold'>
                    Payment Success !
                </h3>
                <p className='text-xs md:text-sm'>
                    Your Payment  has been successfully conformed , thank you for trusting us !
                </p>
                <div className='flex justify-center gap-4'>
                    <button className='text-xs md:text-sm bg-primary px-5 py-2  text-white'>
                        Continue Shopping
                    </button>
                    <button className='text-xs md:text-sm px-5 py-2  text-primary border-2'>
                        Order Detail
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Paid