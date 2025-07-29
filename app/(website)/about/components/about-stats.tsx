
import React from "react";
import explorebg from '@/assets/explorebg.png';
import blackrectangle from "@/assets/exploreBlackRectangle.png";

export const aboutStatsData = [
  {
    title: "2000M+",
    subtitle: "Products",
  },
  {
    title: "200K+",
    subtitle: "Suppliers",
  },
  {
    title: "2900K+",
    subtitle: "Categories",
  },

];

const AboutStats: React.FunctionComponent = () => {
  return (

    <div className="relative  text-white "
      style={{
        backgroundImage: `url(${explorebg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="padding-x py-5"
        style={{
          backgroundImage: `url(${blackrectangle.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold  max-w-4xl text-primary font-playfair">
          Explore the trusted products
          <span className="hidden md:inline">
            , categories....
          </span>
        </h3>
        <p className="text-xs md:text-sm py-3">
          Find the brand from the market that are loved by most women
        </p>

        <div className="grid grid-cols-3  gap-6 py-6">
          {aboutStatsData.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-none last:border-0 border-r-2 border-white gap-4"
            >
              <h4 className="text-xl md:text-3xl lg:text-4xl font-semibold text-primary ">
                {stat.title}
              </h4>
              <p className="text-xl md:text-3xl lg:text-4xl font-playfair ">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>


  );
};

export default AboutStats;
