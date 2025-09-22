import React from "react";

interface DateChipsProps {
  date: string | Date; 
}

const DateChips: React.FC<DateChipsProps> = ({ date }) => {
  const parsedDate = new Date(date);

  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short", 
    year: "numeric",
  });

  return (
    <span className="px-3 py-1 text-sm rounded-full  text-gray-700">
      {formattedDate}
    </span>
  );
};

export default DateChips;
