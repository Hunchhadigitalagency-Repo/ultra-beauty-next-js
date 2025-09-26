import { IOrders } from "@/types/orders";
import Image from "next/image";

interface userInfoCardProps {
  userInfoData: IOrders;
}

function UserInfoCard({ userInfoData }: userInfoCardProps) {
  const userData = {
    imageUrl: userInfoData?.user?.profile_picture,
    info: [
      {
        label: "NAME",
        value: userInfoData?.user?.first_name + '\t' + userInfoData?.user?.last_name || "-",
      },
      {
        label: "EMAIL",
        value: userInfoData?.user?.email || "-",
      },
    ],
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">User Info</h2>
      </div>

      {/* Responsive wrapper */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">
        {userData?.imageUrl && (
          <Image
            src={userData?.imageUrl}
            height={60}
            width={60}
            alt="User"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover mx-auto sm:mx-0"
          />
        )}

        <div className="flex flex-col gap-3 divide-y divide-gray-200">
          {userData.info.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center border-blast:border-b-0  py-3"
            >
              <p className="w-24 text-sm text-foreground font-medium">
                {item.label}
              </p>
              <p className="text-sm text-gray-800 break-words max-w-xs sm:max-w-md">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
