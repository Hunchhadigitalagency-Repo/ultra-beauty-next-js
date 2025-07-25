import React from 'react';
import { CreditCard } from 'lucide-react';
import SectionHeader from '@/components/common/header/section-header';

const JobsSection: React.FunctionComponent = () => {
    return (
        <section className='space-y-6 border p-5 rounded-sm'>
            <SectionHeader
                title='Current Opening '
                description='Do you think you are a good fit? Apply now. We would love to meet you.'
                titleClassName='text-primary'
            />
            <div className='flex gap-5 pb-5'>
                <div className='bg-secondary p-3 md:p-4 lg:p-5 rounded-md'>
                    <CreditCard className='w-7 h-7 text-primary' />
                </div>
                <div className='flex justify-start items-center w-full'>
                    <SectionHeader
                        title='Lead AI Engineer'
                        description='Kathmandu , Nepal'
                        titleClassName='text-primary text-lg xl:text-xl'
                        className='!gap-1'
                    />
                </div>
            </div>
        </section>
    )
}

export default JobsSection