import React from 'react';
import SectionHeader from '@/components/common/header/section-header';

interface HelperProps {
  headerTitle: string;
  headerDesc: string;
  helperTitle: string;
  items: string[];
}


const Helper: React.FunctionComponent<HelperProps> = ({ headerTitle, headerDesc, helperTitle ,items}) => {

  return (
    <section className='padding space-y-6'>
      {/* Header */}
      <SectionHeader
        title={headerTitle}
        description={headerDesc}
        titleClassName='text-primary'
      />
      {/* Items */}
      <div className='border border-gray-300 rounded-md p-5 gap-2'>
        <p className="text-foreground text-xl  font-playfair font-semibold">
          {helperTitle}
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground py-5">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {/* button */}
      <div className='flex justify-end'>
        <button className='bg-primary w-1/4 h-12 text-white rounded-full'>
          For any confusion contact us
        </button>
      </div>

    </section>
  )
}

export default Helper
