import { EChips } from "@/types/chip-type";

interface ChipProps {
  chipType: string;
  title: string;
}

const CardChips = ({ chipType, title }: ChipProps) => {
  const bgColorClass = (() => {
    switch (chipType) {
      case EChips.IS_NEW:
        return "bg-green-600";
      case EChips.IS_BEST_SELLER:
        return "bg-blue-600";
      case EChips.IS_FLASH_SALE:
        return "bg-red-600";
      case EChips.IS_DISCOUNT_PERCENTAGE:
        return "bg-red-600";

      default:
        return "bg-gray-900";
    }
  })();

  return (
    <span
      className={`${bgColorClass} text-white text-sm font-semibold px-3 py-1 rounded`}
    >
      {title}
    </span>
  );
};

export default CardChips;
