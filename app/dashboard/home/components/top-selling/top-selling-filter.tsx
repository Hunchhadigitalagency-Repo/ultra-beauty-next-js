import CustomDropdown from '@/components/common/filter/custom-dropdown';
import React from 'react';

const options = [
  { name: "Month", value: "month" },
  { name: "Week", value: "week" },
  { name: "Year", value: "year" },
];

interface TopSellingFilterProps {
  selected: string;
  onChange: (val: string) => void;
}

const TopSellingFilter: React.FC<TopSellingFilterProps> = ({ selected, onChange }) => {
  return (
    <div>
      <CustomDropdown
        placeholder="Select Period"
        width="w-[120px]"
        options={options}
        defaultValue={selected}
        handleChange={onChange}
        getValue={(item) => item.value}
        getLabel={(item) => item.name}
      />
    </div>
  );
};

export default TopSellingFilter;
