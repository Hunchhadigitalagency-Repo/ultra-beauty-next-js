import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { RolesConstant } from "./roles-constant";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { IRolesPermissions } from "@/types/roles-permissions";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "@/components/common/filter/search-box";
import { ESettings } from "@/types/table";


const RolesAndPermission = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.filter);
  const scrollId = "infinite-scroll-container";

  const { data, loading, hasMore, fetchNext } =
    useInfiniteFetch<IRolesPermissions>("/roles/", "search_role", searchQuery);
  const [RoleAndPermission, setRoleAndPermission] = useState<IRolesPermissions[]>([]);

  useEffect(() => {
    setRoleAndPermission(data);
  }, [data]);

  const handleItemUpdate = (updatedItem: IRolesPermissions) => {
    setRoleAndPermission((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  return (
    <DataCard
      title="Manage Roles and Permission"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting(ESettings.ADD_ROLE))}
          >
            Add Roles
          </Button>
        </div>
      }
    >
      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<></>}
          scrollableTarget={scrollId}
        >
          <CustomTable<IRolesPermissions>
            cols={RolesConstant(dispatch, handleItemUpdate)}
            data={RoleAndPermission as IRolesPermissions[]}
            loading={loading && data.length === 0}
            height="h-auto"
            hasSerialNo={true}
          />
        </InfiniteScroll>
      </div>
    </DataCard>
  );
};

export default RolesAndPermission;
