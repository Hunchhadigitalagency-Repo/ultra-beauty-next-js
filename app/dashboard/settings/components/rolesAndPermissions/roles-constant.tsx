import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { Switch } from "@/components/ui/switch";

import UserAvatarGroup from "@/components/common/user-avatar-group/user-avatar-group";

export const RolesConstant = (dispatch: AppDispatch): Col<any>[] => {
  console.log(dispatch);
  return [
    {
      title: "ROLES",
      render: (data: any) => <span>{data.roles}</span>,
    },
    {
      title: "USERS",
      render: (data: any) => (
        <UserAvatarGroup
          users={data.users}
          onChange={(updatedUsers) => {
            console.log("Updated Users:", updatedUsers);
          }}
        />
      ),
    },
    {
      title: "STATUS",
      render: (data: any) => (
        <Switch
          checked={data.status}
          id="activate"
          className="cursor-pointer"
        />
      ),
    },
    {
      title: "ACTION",
      render: (data: any) => (
        <TableActions data={data} type={ETypes.ROLES} name={data.roles} />
      ),
    },
  ];
};
