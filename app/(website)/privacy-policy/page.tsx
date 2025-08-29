'use client';
import React from 'react';
import DOMPurify from 'dompurify';
import useFetchData from '@/hooks/use-fetch';
import SectionHeader from '@/components/common/header/section-header';

export interface privacyPolicyResponse {
    id: number;
    topic: string;
    effective_date: string;
    description: string;
}

const PrivacyPolicy: React.FunctionComponent = () => {

    const { data } = useFetchData<privacyPolicyResponse>('privacy-policy')

    return (
        <section className='padding'>
            <SectionHeader
                title={data?.topic || "-"}
                description='Privacy and ploicy are listed'
                titleClassName='text-primary'
            />
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-[70%_30%] mt-5 items-start'>
                {/* Content */}
                <div className='w-full order-2 lg:order-1'>
                    {data && (
                        <div className="flex flex-col gap-4">
                            <p
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicy