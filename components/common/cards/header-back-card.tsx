import { setActiveSetting } from "@/redux/features/setting-slice";
import { useAppDispatch } from "@/redux/hooks";
import { ESettings } from "@/types/table";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface HeaderBackCardProps {
  title: string;
  fallBackLink: string;
  settingValue?: string;
}

function HeaderBackCard({
  title,
  fallBackLink,
  settingValue,
}: HeaderBackCardProps) {
  const isInternalSetting = fallBackLink.includes("settings");

  const dispatch = useAppDispatch();

  const handleBack = () => {
    if (isInternalSetting && setActiveSetting) {
      dispatch(setActiveSetting(settingValue ?? ESettings.PROFILE));
    }
  };

  return (
    <div className="flex gap-3 items-center">
      {isInternalSetting ? (
        <div
          className="flex items-center rounded-full bg-primary cursor-pointer"
          onClick={handleBack}
        >
          <ChevronLeft className="text-white" />
        </div>
      ) : (
        <Link href={fallBackLink}>
          <div className="flex items-center rounded-full bg-primary cursor-pointer">
            <ChevronLeft className="text-white" />
          </div>
        </Link>
      )}
      <p className=" text-lg font-semibold">{title}</p>
    </div>
  );
}

export default HeaderBackCard;
