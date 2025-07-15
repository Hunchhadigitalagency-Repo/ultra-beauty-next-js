
import React from "react";

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
    subtitle: "Products Categories",
  },
  {
    title: "105+",
    subtitle: "Countries",
  },
];

const AboutStats = () => {
  return (
    <div className="space-y-16 padding">
      <h3 className="text-2xl lg:text-3xl font-semibold text-primary max-w-4xl mx-auto text-center">
        Explore products, categories, and suppliers for your business from
        millions of offerings worldwide
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {aboutStatsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-2 rounded-none border-r last:border-0 border-custom-black"
          >
            <h4 className="text-4xl font-bold text-primary">{stat.title}</h4>
            <p className="text-2xl text-black">{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutStats;
