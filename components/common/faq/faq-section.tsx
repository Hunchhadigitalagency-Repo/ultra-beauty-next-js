"use client";
import DOMPurify from "dompurify";
import { FAQResponse } from "@/types/faq";
import useFetchData from "@/hooks/use-fetch";
import { Playfair_Display } from 'next/font/google';
import SectionHeader from "@/components/common/header/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function FAQSection() {
  const { data, loading, error } = useFetchData<FAQResponse[]>(
    "cms/faqs/?pagination=false"
  );

  return (
    <section className="space-y-8 padding">
      {/* Header */}
      <SectionHeader
        title="What People Normally Ask"
        description="Most of the people have common question that we have answered here"
        className="items-center"
      />

      {/* FAQ Accordion */}
      {loading ? (
        <div className='h-60 flex w-full justify-center items-center'>
          <p className='text-gray'>
            Loading FAQs...
          </p>
        </div>
      ) : error ? (
        <div className='h-60 flex w-full justify-center items-center'>
          <p className='text-red'>
            Something went wrong while Fetching FAQs
          </p>
        </div>
      ) : data?.length === 0 ? (
        <div className='h-60 flex w-full justify-center items-center'>
          <p className='text-red'>
            Something went wrong while Fetching FAQs
          </p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="flex flex-col gap-2 pt-5">
          {data?.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={`${faq.id}`}
              className="px-6 py-2 bg-white rounded-none"
            >
              <AccordionTrigger className={`text-left !font-playfair cursor-pointer text-foreground hover:text-primary hover:no-underline data-[state=open]:text-primary font-medium text-xl ${playfair.className}`}>

                <span
                  style={{ fontFamily: "Playfair Display" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(faq.question, { FORBID_ATTR: ['style'] }),
                  }}
                />

              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 text-sm leading-relaxed text-foreground font-poppins">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  );
}
