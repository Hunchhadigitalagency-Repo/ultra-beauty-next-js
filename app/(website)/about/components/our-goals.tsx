import React from "react";
import Image from "next/image";
import map from "@/assets/features.png";

const OurGoals: React.FunctionComponent = () => {
  return (
    <section className="bg-primary padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-16">
        <div className="flex flex-col justify-between gap-6 text-white max-w-lg">
          <h3 className="font-bold text-2xl">
            Helping the People of Nepal who stay for Long! Really Long!
          </h3>
          <p className="text-sm">
            At बSERA, we believe comfort isnt a luxury—its a necessity. Our
            ergonomic solutions are designed to support your posture, reduce
            fatigue, and help you stay focused throughout your workday. From
            thoughtfully engineered seat cushions to posture-friendly back
            supports, each product blends Nepali sensibility with modern
            functionality. Whether you&apos;re at the office or working from home,
            बSERA brings comfort to where you sit the most.
          </p>
          <p className="text-sm">
            At बSERA, we believe comfort isnt a luxury—its a necessity. Our
            ergonomic solutions are designed to support your posture, reduce
            fatigue, and help you stay focused throughout your workday. From
            thoughtfully engineered seat cushions to posture-friendly back
            supports, each product blends Nepali sensibility with modern
            functionality. Whether you&apos;re at the office or working from home,
            बSERA brings comfort to where you sit the most.
          </p>
        </div>

        <div className="relative w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={map.src}
              alt="Map of Nepal"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="absolute right-0 top-0 ">
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="rounded-full bg-sky-200 size-4"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGoals;
