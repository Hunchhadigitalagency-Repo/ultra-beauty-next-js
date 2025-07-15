import Image from "next/image";

interface UserInfoItem {
  label: string;
  value: string;
}

interface UserInfoData {
  imageUrl: string;
  info: UserInfoItem[];
}

function UserInfoCard({ userInfoData }: { userInfoData: UserInfoData }) {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">User Info</h2>
        <button className="text-primary text-sm font-medium hover:underline">
          Go to Detail
        </button>
      </div>

      <div className="mt-4 flex gap-10">
        <Image
          src={userInfoData.imageUrl}
          height={60}
          width={60}
          alt="User"
          className="w-28 h-28 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-2 ">
          {userInfoData.info.map((item, index) => (
            <div key={index} className="flex">
              <p className="w-24 text-sm text-foreground font-medium">
                {item.label}
              </p>
              <p className="text-sm text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
