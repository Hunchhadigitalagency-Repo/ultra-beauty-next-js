import React, { useState } from 'react';
import { REVIEW_TABS } from '../profile-tabs';

const MyReviews: React.FunctionComponent = () => {

    const [activeTabIndex, setactiveTabIndex] = useState<number>(0);

    return (
        <section className='flex flex-col gap-3'>
            <h1 className="text-primary font-medium text-lg lg:text-xl">
                My Review
            </h1>
            <div
                className='flex justify-between gap-0 lg:justify-start lg:gap-10 bg-secondary px-2 py-2.5 lg:px-5 lg:py-4 rounded-sm'
            >
                {
                    REVIEW_TABS.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setactiveTabIndex(index)}
                            className={
                                `text-sm md:text-base font-medium cursor-pointer px-2 
                                ${activeTabIndex === index && 'text-primary border-b-2 border-primary'}`
                            }>
                            {item.name}</button>
                    ))
                }
            </div>
            {REVIEW_TABS[activeTabIndex].component}

        </section>
    )
}

export default MyReviews