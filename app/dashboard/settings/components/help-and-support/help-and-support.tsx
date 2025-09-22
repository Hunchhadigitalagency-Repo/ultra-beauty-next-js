import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { setActiveSetting } from "@/redux/features/setting-slice";
import { IHelpAndSupport } from "@/types/Settings";
import SearchBox from "@/components/common/filter/search-box";
import { HelpAndSupportConstant } from "./help-and-support-constant";
import { ESettings } from "@/types/table";
import useFetchData from "@/hooks/use-fetch";

const HelpAndSupportTab = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.filter);

  const scrollId = "infinite-scroll-container";
  const [helpSupport, sethelpSupport] = useState<IHelpAndSupport[]>([]);

  const { data, loading: isLoading } =
    useFetchData<IHelpAndSupport[]>(`/help-and-support/?search=${searchQuery}`);
  useEffect(() => {
    sethelpSupport(data || []);
  }, [data]);

  const handleItemUpdate = (updatedItem: IHelpAndSupport) => {
    sethelpSupport((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };
  return (
    <DataCard
      title="Help And Support"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() =>
              dispatch(setActiveSetting(ESettings.ADD_HELP_AND_SUPPORT))
            }
          >
            Add Help And Support
          </Button>
        </div>
      }
    >
      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <CustomTable
          cols={HelpAndSupportConstant(dispatch, handleItemUpdate)}
          data={helpSupport as IHelpAndSupport[]}
          loading={isLoading && data?.length === 0}
          onRowClick={() => { }}
          height="h-auto"
          hasSerialNo={true}
        />
      </div>
    </DataCard>
  );
};

export default HelpAndSupportTab;
