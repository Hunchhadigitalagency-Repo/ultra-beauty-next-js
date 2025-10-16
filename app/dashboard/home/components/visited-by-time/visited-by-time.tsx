"use client";

import { useEffect, useState } from "react";
import DataCard from "@/components/common/cards/data-card";
import api from "@/services/api-instance";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VisitData {
  [day: string]: {
    [timeSlot: string]: number;
  };
}

const timeSlots = [
  "00:00-04:00",
  "04:00-08:00",
  "08:00-12:00",
  "12:00-16:00",
  "16:00-20:00",
  "20:00-24:00",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getColorIntensity = (visits: number, maxVisits: number) => {
  if (maxVisits === 0) return "bg-red-50";
  const ratio = visits / maxVisits;

  if (ratio === 0) return "bg-red-100";
  if (ratio < 0.25) return "bg-red-200";
  if (ratio < 0.5) return "bg-red-300";
  if (ratio < 0.75) return "bg-red-500";
  return "bg-red-700";
};

export default function VisitedByTime() {
  const [data, setData] = useState<VisitData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/track-visit/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching visit data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data || Object.keys(data).length === 0) return <p>Loading...</p>;
  const allVisits = Object.values(data).flatMap((day) => Object.values(day));
  const maxVisits = Math.max(...allVisits, 0);

  return (
    <DataCard title="Visited by Time">
      <div className="h-auto flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="flex items-center py-1">
              {/* Time slot label - fixed width */}
              <div className="w-24 flex-shrink-0 text-xs font-medium text-gray-600 pr-2">
                {timeSlot}
              </div>

              {/* Heatmap cells - matching header grid */}
              <TooltipProvider>
                <div className="flex-1 grid grid-cols-7 gap-1">
                  {days.map((day) => {
                    const visits = data[day]?.[timeSlot] || 0;
                    const colorClass = getColorIntensity(visits, maxVisits);

                    return (
                      <Tooltip key={`${day}-${timeSlot}`}>
                        <TooltipTrigger asChild className="">
                          <div
                            className={`h-8 w-3/4 rounded-sm ${colorClass} hover:opacity-80 transition-opacity cursor-pointer`}
                            title={`${day} ${timeSlot}: ${visits} visits`}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent className="flex flex-col bg-white text-gray-400">
                          <p><span className="font-medium">Time Slot:</span> {timeSlot}</p>
                          <p><span className="font-medium">Visitors:</span> {visits}</p>
                        </TooltipContent>
                      </Tooltip>

                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          ))}
          <div className="flex bg-white sticky top-0 z-10">
            <div className="w-20 flex-shrink-0"></div>
            {/* Day headers */}
            <div className="flex-1 grid grid-cols-7 gap-1">
              {days.map((day) => (
                <div
                  key={day}
                  className="text-xs sm:text-sm font-medium text-gray-600 text-center py-2"
                >
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DataCard>
  );
}
