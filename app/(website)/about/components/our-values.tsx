import React from "react";
import Image from "next/image";
import SectionHeader from "@/components/common/header/section-header";

const valuesData = [
  {
    id: 1,
    title: "Increased Sales",
    description:
      "At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support your posture, reduce fatigue, and help you stay focused throughout your workday, from thoughtfully engineered seat cushions to posture-friendly lax",
  },
  {
    id: 2,
    title: "Cost-Effective Marketing",
    description:
      "At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support your posture, reduce fatigue, and help you stay focused throughout your workday, from thoughtfully engineered seat cushions to posture-friendly lax",
  },
  {
    id: 3,
    title: "Enhanced Customer Experience",
    description:
      "At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support your posture, reduce fatigue, and help you stay focused throughout your workday, from thoughtfully engineered seat cushions to posture-friendly lax",
  },
  {
    id: 4,
    title: "Flexibility and Adaptability",
    description:
      "At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support your posture, reduce fatigue, and help you stay focused throughout your workday, from thoughtfully engineered seat cushions to posture-friendly lax",
  },
];

const OurValues: React.FunctionComponent = () => {
  return (
    <section className="bg-[#EDF8FF]">
      <div className="space-y-8 padding">
        {/* Header */}
        <SectionHeader title="Our Values" description="Hear our Values" />

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image */}
          <div className="relative w-full h-full">
            <Image
              src="https://img.freepik.com/free-photo/business-concept-with-team-close-up_23-2149151159.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
              alt="Person sitting in modern chair in office workspace"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Right Side - Values List */}
          <div className="space-y-8">
            {valuesData.map((value) => (
              <div className="flex gap-4 items-center" key={value.id}>
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">
                      {value.id}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-custom-black mb-0.5">
                    {value.title}:
                  </h3>
                  <p className="text-custom-black text-xs leading-relaxed line-clamp-3  text-ellipsis">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
