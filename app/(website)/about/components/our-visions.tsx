import React from "react";
import Image from "next/image";

const OurVisions: React.FunctionComponent = () => {
  return (
    <section className="bg-[#EDF8FF]">
      <div className="padding grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
        {/* Image Section */}
        <div className="relative w-full h-[250px] md:h-[400px] rounded-md overflow-hidden">
          <Image
            src="https://img.freepik.com/free-vector/back-view-family-sitting-sofa-watching-news-tv-mother-father-son-couch-living-room-flat-vector-illustration-family-entertainment-concept-banner-landing-web-page_74855-23951.jpg"
            alt="our vision"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex justify-center items-start flex-col gap-8">
          <h4 className="text-2xl font-bold text-yellow leading-tight">
            About Our Visions
          </h4>

          <h3 className="text-primary text-3xl font-bold">
            Your Desire Our Challenges
          </h3>

          <p className="text-custom-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            commodi, tempora itaque suscipit expedita ut eligendi hic est minus
            consectetur eum cum provident eaque dolor reprehenderit atque
            necessitatibus laudantium labore!
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurVisions;
