'use client'
import React, { useState } from 'react';
import SectionHeader from '@/components/common/header/section-header';
import { PRIVACY_POLICY_DATA } from '@/constants/privacy-policy-data';

const TermsAndConditions: React.FunctionComponent = () => {

    const [activeTitleIndex, setActiveTitleIndex] = useState(0)

    return (
        <section className='padding'>
            <SectionHeader
                title='Terms and conditions'
                description='Terms and conditions are listed'
                titleClassName='text-primary'
            />
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-[70%_30%] mt-5 items-start'>
                {/* Content */}
                <div className='w-full order-2 lg:order-1'>
                    {
                        [PRIVACY_POLICY_DATA[activeTitleIndex]]?.map((item, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <h3 className='font-semibold text-xl font-playfair'>
                                    {item.subtitle}
                                    <span className='text-primary'>
                                        {item.additional_info}
                                    </span>
                                </h3>
                                <p className='text-justify'>
                                    {item.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
                {/* Sidebar */}
                <div className="w-full order-1 lg:order-2 p-4 lg:p-8 flex flex-col gap-4 rounded-sm bg-secondary"  >
                    {
                        PRIVACY_POLICY_DATA.map((item, index) => (
                            <p key={index} className="pb-2" onClick={() => setActiveTitleIndex(index)}>
                                <span
                                    className={`inline-block cursor-pointer ${activeTitleIndex === index ? 'text-primary border-b border-primary pb-1 px-2' : 'px-2'}`}>
                                    {item.title}
                                </span>
                            </p>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default TermsAndConditions