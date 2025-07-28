"use client"
import React from 'react';
import SectionHeader from '@/components/common/header/section-header';
import ReturnForm from './components/return-form';

const ReturnOrder: React.FunctionComponent = () => {

    return (
        <section className='padding space-y-8 bg-[#FAFAFA]'>
            <SectionHeader
                title='Return  Details'
                description='See the Return order Details.'
            />
            <div className='px-5 py-2 text-sm md:text-base bg-secondary rounded-md'>
                Product
            </div>
            <ReturnForm />
        </section>
    )
}

export default ReturnOrder