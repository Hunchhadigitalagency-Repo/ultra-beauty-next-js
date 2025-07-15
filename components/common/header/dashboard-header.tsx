import { SidebarTrigger } from "@/components/ui/sidebar";
import { getHeaderTitle } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import UserDropdown from "./user-dropdown";

const DashboardHeader = () => {
  const pathname = usePathname();

  const headerTitle = getHeaderTitle(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 sticky top-0 bg-white z-50 ">
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-2xl font-semibold text-foreground">
          {headerTitle}
        </h1>
      </div>

      <div className="flex gap-2 items-center">
        <UserDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
