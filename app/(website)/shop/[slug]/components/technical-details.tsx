'use client';
import React, { useState } from 'react';
import { Technicaldetails } from '@/constants/technical-data';
import SectionHeader from '@/components/common/header/section-header';

const TechnicalDetails = () => {

    const [showDetails, setShowDetails] = useState(false);
    const visibleDetails = showDetails ? Technicaldetails : Technicaldetails.slice(0, 4);

    return (
        <section className='padding'>
            <div className='grid gap-5'>
                <SectionHeader
                    titleClassName='text-lg'
                    title='Technical Details'
                />
                {
                    visibleDetails.map((detail, index) => (
                        <div
                            key={index}
                            className={`${index % 2 == 0 ? "bg-[#F7F7F7]" : "bg-white"}`}>
                            <div className="grid grid-cols-[30%_70%] px-5 py-3">
                                <h1 className='text-sm md:text-base'>
                                    {detail.title}
                                </h1>
                                <h1 className={`text-sm md:text-base w-full ${showDetails ? "" : "line-clamp-1"}`}>
                                    {detail.desc}
                                </h1>
                            </div>
                        </div>
                    ))
                }
                {
                    Technicaldetails.length > 4 && (
                        <div onClick={(() => setShowDetails(!showDetails))} className="py-5 cursor-pointer text-secondary">
                            {showDetails ? "Show Less" : "See More"}
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default TechnicalDetails