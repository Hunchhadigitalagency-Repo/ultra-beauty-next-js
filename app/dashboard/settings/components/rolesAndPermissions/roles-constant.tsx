import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";

import UserAvatarGroup from "@/components/common/user-avatar-group/user-avatar-group";
import { IRolesPermissions } from "@/types/roles-permissions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const RolesConstant = (
  dispatch: AppDispatch,
  onUpdate?: (item: IRolesPermissions, user?:any) => void
): Col<IRolesPermissions>[] => {
  return [
    {
      title: "ROLES",
      render: (data: IRolesPermissions) => <span>{data.role}</span>,
    },
    {
      title: "USERS",
      render: (data: IRolesPermissions) => (
        <UserAvatarGroup
          users={data?.user as any}
          onChange={(updatedUsers) => {
            onUpdate?.(data, updatedUsers);
          }}
        />
      ),
    },
    {
      title: "STATUS",
      render: (data: IRolesPermissions) => (
           <TableStatusSwitch type={ETypes.ROLES} rowData={data} onUpdate={onUpdate}/>
      ),
    },
    {
      title: "ACTION",
      render: (data: IRolesPermissions) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data as IRolesPermissions));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.ROLES}
            name={data.role as string}
          />
        </div>
      ),
    },
  ];
};
