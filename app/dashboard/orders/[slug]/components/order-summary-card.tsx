interface DataItem {
  label: string;
  value: string;
}

interface SummaryCardProps {
  title: string;
  topRightLabel?: string;
  data: DataItem[];
}

function OrderSummaryCard({ title, topRightLabel, data }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {topRightLabel && (
          <span className="text-sm text-foreground">{topRightLabel}</span>
        )}
      </div>

      <div className="space-y-4 divide-y divide-gray-200">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-blast:border-b-0"
          >
            <span className="text-sm font-medium text-foreground uppercase tracking-wide">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderSummaryCard;
