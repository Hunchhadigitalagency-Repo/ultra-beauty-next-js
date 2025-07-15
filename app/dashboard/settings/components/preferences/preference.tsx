import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DataCard from "@/components/common/cards/data-card";
import { useAppDispatch } from "@/redux/hooks";
import { setActiveSetting } from "@/redux/features/setting-slice";

interface ThemePreference {
  id: string;
  name: string;
  active: boolean;
  colors: string[];
}

const themes: ThemePreference[] = [
  {
    id: "orange",
    name: "Orange Theme",
    active: true,
    colors: ["bg-[#1477B4]", "bg-[#F9B00D]", "bg-[#40C040]"],
  },
  {
    id: "dark",
    name: "Dark Theme",
    active: false,
    colors: ["bg-[#5D5D5D]", "bg-[#1E1E1E]", "bg-[#A7A7A7]"],
  },
  {
    id: "green",
    name: "Green Theme",
    active: false,
    colors: ["bg-[#AFE67E]", "bg-[#D00000]", "bg-[#40C040]"],
  },
];

const PreferenceTab = () => {
  const dispatch = useAppDispatch();

  return (
    <DataCard
      title="Preferences"
      filter={
        <Button onClick={() => dispatch(setActiveSetting("Add Preferences"))}>
          Add Preferences
        </Button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {themes.map((theme) => (
          <div key={theme.id} className="p-6 flex flex-col gap-2 items-center">
            <div className="w-full bg-muted flex flex-col gap-2 mb-4 p-4 rounded-sm ">
              {theme.colors.map((color, i) => (
                <div
                  key={i}
                  className={`w-full ${
                    i === 1 ? "h-32" : "h-8"
                  } rounded-sm ${color}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Switch
                checked={theme.active}
                onCheckedChange={() => !theme.active}
                className="cursor-pointer"
              />
              <Label className="text-sm font-semibold">
                {theme.active ? "ACTIVATE" : "DE ACTIVE"}
              </Label>
            </div>
            <p className="text-md font-semibold">{theme.name}</p>
          </div>
        ))}
      </div>
    </DataCard>
  );
};

export default PreferenceTab;
