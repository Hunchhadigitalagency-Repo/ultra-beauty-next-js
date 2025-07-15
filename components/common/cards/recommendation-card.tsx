import { IRecommendation } from "@/types/website";
import Image from "next/image";
import React from "react";


const RecommendationCard = ({ imageSrc, name, specialty, institution }: IRecommendation) => {
  return (
    <div className="flex flex-col items-center text-center gap-3 p-4 bg-white">
      <div
        className={`w-31 h-31 rounded-full overflow-hidden flex items-center justify-center`}
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          width={124}
          height={124}
          className="object-cover rounded-full"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-blue-600">{name}</h3>
        <p className="text-sm font-medium text-gray-700">{specialty}</p>
        <p className="text-sm text-gray-600">{institution}</p>
      </div>
    </div>
  );
};

export default RecommendationCard;
