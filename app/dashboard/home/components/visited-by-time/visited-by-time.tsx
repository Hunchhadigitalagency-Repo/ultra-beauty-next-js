"use client";

import DataCard from "@/components/common/cards/data-card";

const DummyData = () => {
  const timeSlots = [
    "6 AM - 8 AM",
    "8 AM - 10 AM",
    "10 AM - 12 PM",
    "12 PM - 2 PM",
    "2 PM - 4 PM",
    "4 PM - 6 PM",
    "6 PM - 8 PM",
    "8 PM - 10 PM",
  ];

  const days = ["SUN", "MON", "TUE", "WED", "THURS", "FRI", "SAT"];

  const data: { [key: string]: { [key: string]: number } } = {};

  timeSlots.forEach((timeSlot) => {
    data[timeSlot] = {};
    days.forEach((day) => {
      data[timeSlot][day] = Math.floor(Math.random() * 1500);
    });
  });

  return { timeSlots, days, data };
};

const getColorIntensity = (visits: number) => {
  if (visits < 200) return "bg-[#66A2C8]";
  if (visits < 1000) return "bg-[#66A2C8]";
  if (visits === 1000) return "bg-[#8BBEDE]";
  return "bg-[#1477B4]";
};

const Legend = () => {
  const legendItems = [
    { color: "bg-[#66A2C8]", label: "<200" },
    { color: "bg-[#66A2C8]", label: "<1000" },
    { color: "bg-[#8BBEDE]", label: "=1000" },
    { color: "bg-[#1477B4]", label: ">1000" },
  ];

  return (
    <div className="flex items-center gap-4">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${item.color}`}></div>
          <span className="text-sm text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function VisitedByTime() {
  const { timeSlots, days, data } = DummyData();

  return (
    <DataCard title="Visited by Time" filter={<Legend />}>
      <div className="overflow-x-auto">
        <div>
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="grid grid-cols-9 space-y-1.5">
              <div className=" col-span-2 flex items-center text-xs text-gray-600 pr-2 font-medium">
                {timeSlot}
              </div>

              {days.map((day) => {
                const visits = data[timeSlot][day];
                const colorClass = getColorIntensity(visits);

                return (
                  <div
                    key={`${timeSlot}-${day}`}
                    className={`
                      aspect-square rounded-sm ${colorClass} 
                      hover:opacity-80 transition-opacity cursor-pointer h-6 w-10 
                    `}
                  ></div>
                );
              })}
            </div>
          ))}
          <div className="grid grid-cols-9 gap-2">
            <div></div>
            <div></div>
            {days.map((day) => (
              <div
                key={day}
                className=" text-sm font-medium text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DataCard>
  );
}
