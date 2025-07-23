import React from 'react'
import SectionHeader from '@/components/common/header/section-header';

interface HelperProps{
    headerTitle: string;
    headerDesc: string;
    helperTitle:string;
}

// const items=[
//     { "First go to the login screen."},
//     { "You will see reset password link."},
//     { "You will get OTP."},
//     { "And update the password and save."},
//     { "The password will be reset."}
// ]

const items=[
     "First go to the login screen.",
     "You will see reset password link.",
     "You will get OTP.",
     "And update the password and save.",
     "The password will be reset."
]


const Helper = ({headerTitle, headerDesc, helperTitle}:HelperProps) => {
  return (
   <section className='padding space-y-6'>
    
{/* Header */}
    <SectionHeader title={headerTitle} description={headerDesc} titleClassName='text-primary' />
{/* Items */}
    <div className='border border-gray-300 rounded-md p-5 gap-2'>
      <p className="text-[#333333] text-xl  font-playfair font-semibold">{helperTitle}</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground py-5 ">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
    </div>
{/* button */}
    <div className='flex justify-end'>
      <button className='bg-[#FF2B5F] w-1/4 h-12 text-white rounded-full'>
        For any confusion contact us
      </button>
    </div>
     
   </section>
  )
}

export default Helper
