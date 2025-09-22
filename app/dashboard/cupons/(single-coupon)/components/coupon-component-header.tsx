

interface CouponComponentHeaderProps {
  title: string;
  type: string;
}

const CouponComponentHeader = ({ title }: CouponComponentHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pl-2">
      <h1 className=" text-lg font-semibold">Analytics of {title} Coupons</h1>

    </div>
  );
};

export default CouponComponentHeader;
