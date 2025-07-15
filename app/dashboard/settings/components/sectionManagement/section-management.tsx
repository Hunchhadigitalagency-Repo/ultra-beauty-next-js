"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ISection } from "@/types/Settings";
import { ESettings, ETypes } from "@/types/table";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

const SectionManagement = () => {
  const { data } = useInfiniteFetch<ISection>("/section");

  return (
    <Card className="border-none shadow-none rounded-sm p-0">
      <CardContent className="pt-4 pb-8">
        <div className="flex w-full justify-between pb-6">
          <HeaderBackCard
            title="Manage Section"
            fallBackLink="/dashboard/settings"
            settingValue={ESettings.PROFILE}
          />
        </div>

        <div className="space-y-4 overflow-y-auto h-[calc(100vh-20px)]">
          {data.map((section) => (
            <div
              key={section.name}
              className="flex items-center justify-between bg-muted px-4 py-4 rounded-sm"
            >
              <p className="text-sm font-medium text-muted-foreground">
                {section.name}
              </p>
              <div className="flex items-center gap-4">
                <TableStatusSwitch
                  type={ETypes.SECTION_MANAGEMENT}
                  rowData={section}
                />
                <Label className="text-xs text-muted-foreground">
                  ACTIVATE
                </Label>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionManagement;
