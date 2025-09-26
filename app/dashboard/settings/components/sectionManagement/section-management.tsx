"use client";

import { useEffect, useState } from "react";
import HeaderBackCard from "@/components/common/cards/header-back-card";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createSection } from "@/lib/api/settings/section-management-api";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { ISection } from "@/types/Settings";
import useFetchData from "@/hooks/use-fetch";

const initialSections = [
  { id: 1, name: "Recommended By Expert Section", isActive: false },
  { id: 2, name: "Product FAQ Section", isActive: false },
  { id: 3, name: "Product Tutorial Section", isActive: false },
];

const SectionManagement = () => {
  const [sections, setSections] = useState(initialSections);
  const { data } = useFetchData<ISection[]>("/section/");

  const onToggleActive = async (isActive: boolean, name: string) => {
    try {
      const response = await createSection({ name, is_active: isActive });
      if (response.status === 201) {
        toast.success("Section toggled successfully");
      }
    } catch (error) {
      handleError(error, toast);
    }
  };

  const handleToggle = (id: number) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? {
            ...section,
            isActive: !section.isActive,
          }
          : section
      )
    );

    const toggledSection = sections.find((section) => section.id === id);
    if (toggledSection) {
      onToggleActive(!toggledSection.isActive, toggledSection.name);
    }
  };

  useEffect(() => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        const match = data?.find((item: any) => item.name === section.name);

        return match ? { ...section, isActive: match.is_active } : section;
      })
    );
  }, [data]);

  return (
    <Card className="border-none shadow-none rounded-sm p-0">
      <CardContent className="pt-4 pb-8">
        <div className="flex w-full justify-between pb-6">
          <HeaderBackCard
            title="Manage Section"
            fallBackLink="/dashboard/settings"
          />
        </div>
        <div className="space-y-4">
          {sections.map((section) => {
            return (
              <div
                key={section.id}
                className="flex items-center justify-between bg-muted px-4 py-4 rounded-sm"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {section.name}
                </p>
                <div className="flex items-center gap-4">
                  <Switch
                    checked={section.isActive}
                    onCheckedChange={() => handleToggle(section.id)}
                    className="cursor-pointer"
                  />
                  <Label className="text-xs text-muted-foreground">
                    ACTIVATE
                  </Label>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionManagement;
