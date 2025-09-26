import useFetchDropdown from "@/hooks/use-fetch-dropdown";
import { IUser } from "@/types/user-management";
import defaultImage from "@/assets/images.jpeg"

export const useCouponUser = () => {
    // Make sure the generic here is IUser[], not IUser[][]
    const { data: users } = useFetchDropdown<IUser[]>(
        "/regular-users/"
    );

    const couponUser = users?.map((user: any) => ({
        id: user.user_id.toString(), // convert to string if needed
        name: user.first_name + " " + user.last_name,
        avatar: user.profile_picture || user.google_avatar || defaultImage,
    }));

    return couponUser || [];
};
