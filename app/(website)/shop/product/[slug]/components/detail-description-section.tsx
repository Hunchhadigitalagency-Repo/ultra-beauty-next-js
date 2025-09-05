'use client';
import DOMPurify from 'dompurify';
import { AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import useFetchData from '@/hooks/use-fetch';
import { SingleProductResponse } from '@/types/product';
import React, { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/common/header/section-header';


const DetailDecription: React.FunctionComponent = () => {
    const [expandedText, setExpandedText] = useState(false);
    const params = useParams();
    const slug = params?.slug as string;

    const { data, error, loading } = useFetchData<SingleProductResponse>(`/public-products/${slug}`);
    const [showButton, setShowButton] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;
        setShowButton(textRef?.current.scrollHeight > textRef?.current.clientHeight);
    }, [data?.detail_description]);

    return (
        <section className='w-full padding'>
            {data?.detail_description && (
                <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground">
                    <SectionHeader
                        title="More Description"
                        titleClassName='font-semibold'
                    />
                    {loading ? (
                        <p>
                            Loading data...
                        </p>
                    ) : error ? (
                        <>
                            <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
                            <p className="font-medium text-gray-700">Oops! Something went wrong.</p>
                        </>
                    ) : (
                        <div
                            ref={textRef}
                            className={`font-poppins text-base ${expandedText ? "" : "line-clamp-5"}`}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.detail_description) }}
                        />
                    )}

                    {showButton && (
                        <div
                            onClick={() => setExpandedText(!expandedText)}
                            className="text-base font-medium cursor-pointer text-primary hover:text-primary hover:underline"
                        >
                            {expandedText ? "Show Less" : "Read More"}
                        </div>
                    )}
                </div>

            )}
        </section>
    )
}

export default DetailDecription