"use client";

import React from "react";
import SearchBox from "@/components/common/filter/search-box";
import SectionHeader from "@/components/common/header/section-header";

const HelpSection: React.FunctionComponent = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[500px] lg:h-[400px] overflow-hidden rounded-md">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/woman-with-gold-glitter-her-face-is-sleeping_1262781-124895.jpg')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center gap-6">
        <SectionHeader
          title="Hi, How can we help?"
          description=""
          titleClassName="text-white text-3xl md:text-4xl font-semibold"
          className="text-white"
        />

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-3xl">
          <SearchBox
            iconClassName="text-white"
            className="flex-1 bg-transparent border border-white rounded-md text-white placeholder-white focus-visible:border-white px-4 py-2"
            placeholder="Search for the topic or question..."
          />
          <button className="bg-white text-primary px-6 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
