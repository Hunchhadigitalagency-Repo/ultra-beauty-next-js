"use client";

import React from "react";
import DOMPurify from "dompurify";
import useFetchData from "@/hooks/use-fetch-data";
import SectionHeader from "@/components/common/header/section-header";
import LoadingSpinner from "@/components/common/loader/loading-spinner";

interface TermsAndCondition {
  id: number;
  topic: string;
  description: string;
  is_active: boolean;
}

const TermsAndCondition: React.FC = () => {
  const { data: termsAndCondition, isLoading } =
    useFetchData<TermsAndCondition>("/terms-conditions/", true);

  if (isLoading) {
    return (
      <p className="h-[70vh] w-full flex items-center justify-center">
        <LoadingSpinner />
      </p>
    );
  }

  let cleanHtml = DOMPurify.sanitize(termsAndCondition?.description || "", {
    USE_PROFILES: { html: true },
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHtml, "text/html");
  const h1Elements = Array.from(doc.querySelectorAll("h1"));
  h1Elements.forEach((el, index) => {
    el.id = `heading-${index + 1}`;
  });
  cleanHtml = doc.body.innerHTML;

  const toc = h1Elements.map((el) => ({
    id: el.id,
    text: el.textContent?.trim() || "",
  }));

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    
    if (element) {
      const yOffset = -86; 
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="space-y-12 px-7 md:px-40 py-10">
      <SectionHeader
        title="Terms And Conditions"
        description=""
        titleClassName="text-primary"
      />

      <div className="flex flex-col md:flex-row gap-8">
        <article
          className="rich-text prose max-w-none flex-1 overflow-x-auto text-gray-800"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        {toc.length > 0 && (
          <div className="hidden md:block md:w-[300px] lg:w-[350px] xl:w-[400px] max-h-[400px] overflow-y-auto sticky top-24 self-start p-4 border rounded-md bg-gray-50 shadow-sm font-poppins">
            <h3 className="font-semibold text-lg mb-3 border-b pb-2 text-gray-900">
              Table of Contents
            </h3>
            <ul className="space-y-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <button
                    className="text-gray-900 hover:text-gray-700 transition-colors duration-200 text-left w-full focus:outline-none cursor-pointer line-clamp-1"
                    onClick={() => scrollToHeading(item.id)}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default TermsAndCondition;
