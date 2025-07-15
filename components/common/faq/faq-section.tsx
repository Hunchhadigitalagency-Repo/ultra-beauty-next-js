"use client";

import SectionHeader from "@/components/common/header/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useFetchData from "@/hooks/use-fetch";
import { FAQResponse } from "@/types/faq";
import DOMPurify from "dompurify";

export default function FAQSection() {
  const { data, isLoading:loading, error } = useFetchData<FAQResponse>(
    "cms/faqs/?pagination=false"
  );

  return (
    <section className="padding space-y-8">
      {/* Header */}
      <SectionHeader
        title="What People Normally Ask"
        description="Most of the people have common question that we have answered here"
        className="items-center"
      />

      {/* FAQ Accordion */}
      {loading ? (
        <p className="text-center text-muted-foreground text-sm">
          Loading FAQs...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 text-sm font-medium">
          Something Went Wrong While Fetching FAQs
        </p>
      ) : data?.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm">
          No FAQs found
        </p>
      ) : (
        <Accordion type="single" collapsible defaultValue="item-1">
          {data?.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={`${faq.id}`}
              className="rounded-lg px-6 py-2 bg-white border-none"
            >
              <AccordionTrigger className="text-left cursor-pointer text-foreground hover:text-primary hover:no-underline data-[state=open]:text-primary font-semibold text-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(faq.question),
                  }}
                />
              </AccordionTrigger>
              <AccordionContent className="text-foreground text-sm leading-relaxed pt-2 pb-4">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  );
}
