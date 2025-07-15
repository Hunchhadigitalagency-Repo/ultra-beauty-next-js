import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { RolesConstant } from "./roles-constant";
import { setActiveSetting } from "@/redux/features/setting-slice";

const tableData = [
  {
    roles: "Category A",
    users: [
      {
        id: 1,
        name: "Ram Bahadur Khadka",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        id: 2,
        name: "Sita Gurung",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    ],
    type: "Button",
    status: true,
  },
  {
    roles: "Category B",
    users: [
      {
        id: 3,
        name: "Hari Sharma",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
    ],
    type: "Button",
    status: true,
  },
  {
    roles: "Category C",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category D",
    users: [
      {
        id: 4,
        name: "Anita Karki",
        avatar: "https://randomuser.me/api/portraits/women/72.jpg",
      },
      {
        id: 5,
        name: "Bishal Thapa",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
    type: "Button",
    status: true,
  },
  {
    roles: "Category E",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category G",
    users: [
      {
        id: 6,
        name: "Mina Lama",
        avatar: "https://randomuser.me/api/portraits/women/52.jpg",
      },
    ],
    type: "Button",
    status: false,
  },
  {
    roles: "Category H",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category A",
    users: [
      {
        id: 7,
        name: "Kiran Shrestha",
        avatar: "https://randomuser.me/api/portraits/men/66.jpg",
      },
    ],
    type: "Button",
    status: true,
  },
  {
    roles: "Category I",
    users: [],
    type: "Button",
    status: true,
  },
  {
    roles: "Category J",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category K",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category L",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category M",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category N",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category O",
    users: [],
    type: "Button",
    status: false,
  },
  {
    roles: "Category P",
    users: [],
    type: "Button",
    status: false,
  },
];

const RolesAndPermission = () => {
  const dispatch = useAppDispatch();

  return (
    <DataCard
      title="Manage Roles and Permission"
      filter={
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-sm pl-2">
            <Search className="h-5 w-5" />
            <Input
              className=" border-none shadow-none focus:!border-none focus:!ring-0 focus:outline-none h-9"
              placeholder="Search Attribute name"
            />
          </div>
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting("Add Roles"))}
          >
            Add roles
          </Button>
        </div>
      }
    >
      <CustomTable
        cols={RolesConstant(dispatch)}
        data={tableData as any[]}
        loading={false}
        onRowClick={() => {}}
        height="max-h-[calc(100vh-20px)]"
        hasSerialNo={true}
      />
    </DataCard>
  );
};

export default RolesAndPermission;
