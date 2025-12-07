import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/constants/sidebar-data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useFetchData from "@/hooks/use-fetch";
import Image from "next/image";

export interface CompanyProfile {
  user: number;
  company_name: string;
  company_address: string;
  company_logo_url: string;
  company_favicon_url: string;
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { data } = useFetchData<CompanyProfile>("/auth/companyprofile/", true);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {data?.company_logo_url ? (
          <div className="w-35 h-fit max-h-35">
            <Image
              src={data.company_logo_url}
              alt={data.company_name || "Company Logo"}
              width={800}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <div className="text-base font-medium leading-none text-center whitespace-nowrap md:text-xl font-playfair text-primary">
            Ultra Beauty
            <br />
            <span className="text-sm font-poppins md:text-base">&</span>
            <br />
            Brand
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {sidebarData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  console.log(pathname, item.url);

                  const isActive = () => {
                    if (pathname === '/dashboard/newsletters-clients') {
                      return item.url === '/dashboard/newsletters-clients';
                    }

                    if (pathname.startsWith('/dashboard/newsletters')) {
                      return pathname.includes(item.url);
                    }

                    return pathname === item.url || pathname.startsWith(`${item.url}/`);
                  };

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive()}>
                        <Link
                          href={item.url}
                          prefetch={false}
                          className="px-4 "
                        >
                          {item.icon && (
                            <div
                              className={`p-1  ${isActive()
                                ? "text-white bg-primary flex items-center justify-center"
                                : ""
                                } `}
                            >
                              <item.icon className="size-4" />
                            </div>
                          )}
                          {item.title.toLowerCase() === 'reports' ?
                            <div className="flex justify-between items-center w-full">
                              <span>{item.title}</span>
                              <span className="text-[10px] text-gray-400">{item.update}</span>
                            </div>
                            :
                            <span>{item.title}</span>
                          }
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
