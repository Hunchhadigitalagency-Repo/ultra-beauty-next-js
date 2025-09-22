"use client";

import type React from "react";
import "leaflet/dist/leaflet.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/sidebar/app-sidebar";

import DashboardHeader from "@/components/common/header/dashboard-header";
import withAuth from "@/hoc/withAuth";
import { EUserTypes } from "@/types";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 bg-red-100/50 ">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default withAuth(DashboardLayout, [
  EUserTypes.ADMIN,
  EUserTypes.SUPER_ADMIN,
]);
