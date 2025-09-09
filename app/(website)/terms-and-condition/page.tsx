'use client'
import React from 'react';
import DOMPurify from 'dompurify';
import useFetchData from '@/hooks/use-fetch';
import SectionHeader from '@/components/common/header/section-header';

interface TermsConditionResponse {
    id: number;
    topic: string;
    description: string;
    created_at: string;
}


const TermsAndConditions: React.FunctionComponent = () => {

    const { data, loading, error } = useFetchData<TermsConditionResponse>('terms-conditions');

    return (
        <section className='padding'>
            <SectionHeader
                title={data?.topic || "-"}
                description='Terms and conditions are listed'
                titleClassName='text-primary'
            />
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-[70%_30%] mt-5 items-start'>
                {/* Content */}
                <div className='w-full order-2 lg:order-1'>
                    {
                        loading ? (
                            <div className='h-60 flex w-full justify-center items-center'>
                                <p className='text-gray'>
                                    Loading ...
                                </p>
                            </div>
                        ) : error ? (
                            <div className='h-60 flex w-full justify-center items-center'>
                                <p className='text-red'>
                                    Error while Fetching Terms and Conditions !
                                </p>
                            </div>
                        ) : data && (
                            <div className="flex flex-col gap-4">
                                <p
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default TermsAndConditions