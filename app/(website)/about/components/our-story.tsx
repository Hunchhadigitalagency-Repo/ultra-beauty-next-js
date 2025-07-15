import SectionHeader from "@/components/common/header/section-header";
import VideoPlayer from "@/components/common/video-player/video-player";
import React from "react";

const OurStory = () => {
  return (
    <section className="padding space-y-12">
      <div className="flex items-center justify-center flex-col gap-4 text-custom-black max-w-2xl mx-auto">
        <h4 className="text-2xl font-bold uppercase">
          TRUSTED BY 2500<span className="text-green">+</span> CLIENTS FROM
          AROUND THE WORLD
        </h4>

        <p className="text-base max-w-xl text-center">
          At बSERA, we believe comfort isn&apos;t a luxury—it&apos;s a
          necessity. Our ergonomic solutions are designed to support your
          posture, reduce fatigue, and help you stay focused throughout your
          workday.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-lg shadow-sm">
        <div className="space-y-6 p-4">
          <SectionHeader title="Our Story" description="Hear our Story" />
          <p className="text-foreground font-medium text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            soluta architecto suscipit impedit iste, velit nemo nam beatae
            laudantium id cum blanditiis quod expedita sit dolorum quia
            distinctio nulla natus! Laudantium vitae delectus cumque quibusdam
            optio placeat alias ab consectetur sit! Doloremque aspernatur
            suscipit magni ipsam esse ex impedit provident?
          </p>
        </div>

        <VideoPlayer src="https://img.freepik.com/free-photo/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working_146671-13569.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740" poster="https://img.freepik.com/free-photo/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working_146671-13569.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740" className="h-[400px] !rounded-none !rounded-tr-lg !rounded-br-lg" />

        
      </div>
    </section>
  );
};

export default OurStory;
