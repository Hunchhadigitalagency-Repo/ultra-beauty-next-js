'use client';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import useFetchData from '@/hooks/use-fetch';
import { SingleProductResponse } from '@/types/product';
import SectionHeader from '@/components/common/header/section-header';


const DetailDecription: React.FunctionComponent = () => {
    const [expanded, setExpanded] = useState(false);
    const params = useParams();
    const slug = params?.slug as string;

    const { data } = useFetchData<SingleProductResponse>(`/public-products/${slug}`);
    console.log("First", data)

    return (
        <section className='w-full padding'>
            {data?.detail_description && (
                <div className="flex flex-col gap-5 text-sm leading-relaxed text-foreground">
                    <SectionHeader
                        title="More Description"
                        titleClassName='font-semibold'
                    />
                    <div
                        className={`${expanded ? "" : "line-clamp-10"} text-base`}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.detail_description) }}
                    />

                    {data?.detail_description && (
                        <div
                            onClick={() => setExpanded(!expanded)}
                            className="text-base font-medium cursor-pointer text-secondary hover:text-primary hover:underline"
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </div>
                    )}
                </div>

            )}
        </section>
    )
}

export default DetailDecription