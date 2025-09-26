import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DataCard from "@/components/common/cards/data-card";
import { useAppDispatch } from "@/redux/hooks";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { IPreference } from "@/types/Settings";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";
import { ESettings, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";

const PreferenceTab = () => {
  const dispatch = useAppDispatch();

  const { data, loading } = useInfiniteFetch<IPreference>("/themes");
  const [Preferences, setPreferences] = useState<IPreference[]>([]);

  useEffect(() => {
    setPreferences(data);
  }, [data]);

  const handleItemUpdate = (updatedItem: IPreference) => {
    setPreferences((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };
  return (
    <DataCard
      title="Preferences"
      filter={
        <Button
          onClick={() => dispatch(setActiveSetting(ESettings.ADD_PREFERENCES))}
        >
          Add Preferences
        </Button>
      }
    >
      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-lg">Loading Preferences...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-lg">No any preferences added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
          {Preferences.map((theme) => (
            <div
              key={theme.id}
              className="p-6 flex flex-col gap-2 items-center"
            >
              <div className="w-full bg-muted flex flex-col gap-2 mb-4 p-4 rounded-sm">
                {["secondary", "primary", "ternary"].map((name, i) => {
                  const color = theme.colors.find((c) => c.color_name === name);
                  if (!color) return null;
                  return (
                    <div
                      key={i}
                      className={`w-full ${
                        color.color_name === "primary" ? "h-32" : "h-8"
                      } rounded-sm`}
                      style={{ backgroundColor: color.color_value }}
                    />
                  );
                })}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <TableStatusSwitch type={ETypes.PREFERENCES} rowData={theme} onUpdate={handleItemUpdate}/>
                <Label className="text-sm font-semibold">
                  {theme.is_active ? "ACTIVATE" : "DE ACTIVE"}
                </Label>
              </div>
              <div className="flex relative">
                <p className="text-md font-semibold">{theme.theme_name}</p>
                <div
                  className="flex gap-2 justify-end absolute -right-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setSelectedData(theme));
                  }}
                >
                  <TableActions
                    data={theme}
                    type={ETypes.PREFERENCES}
                    name={theme?.theme_name as string}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DataCard>
  );
};

export default PreferenceTab;
