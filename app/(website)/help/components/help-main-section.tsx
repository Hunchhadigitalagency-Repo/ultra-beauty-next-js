import React from "react";
import SearchBox from "@/components/common/filter/search-box";
import SectionHeader from "@/components/common/header/section-header";

const HelpSection: React.FunctionComponent = () => {
  return (
    <section className="padding">
      <div
        className="w-full bg-cover bg-center bg-no-repeat rounded-md"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/woman-with-gold-glitter-her-face-is-sleeping_1262781-124895.jpg')`,
        }}
      >
        <div className="py-40 flex flex-col gap-3">
          <SectionHeader
            titleClassName="text-white text-2xl"
            title="Hi, How can we help?"
            description=""
            className="items-center text-white"
          />
          <div className="flex justify-center gap-4 items-center">
            <SearchBox
              iconClassName="text-white"
              className="bg-transparent border border-white rounded-sm text-white  !placeholder-white  focus-visible:border-white"
              placeholder="Search for the topic or question........."
            />
            <button className="bg-white font-bold  text-primary px-4 py-1.5 rounded-sm hover:bg-primary/90 transition-colors cursor-pointer">
              <p className="text-base">Submit</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
