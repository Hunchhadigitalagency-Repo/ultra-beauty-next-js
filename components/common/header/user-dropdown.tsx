"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import { LogOut, Settings } from "lucide-react";
import LogoutModal from "../modals/logout-modal";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { profileDetails } = useAppSelector((state) => state.authentication);
  const { email, first_name, last_name, profile } = profileDetails;
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar className="size-10">
              <AvatarImage
                src={
                  profile?.profile_picture ||
                  "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                }
                width={40}
                height={40}
                alt="Profile image"
              />
              <AvatarFallback>
                {first_name?.charAt(0) + last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <h5 className="text-foreground text-sm font-medium">
                {first_name} {last_name}
              </h5>
              <span className="text-accent-foreground text-xs capitalize">
                {profile?.user_type}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {first_name} {last_name}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
              <Settings size={16} className="opacity-60" aria-hidden="true" />
              <span>Account settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowLogoutModal(true)}>
            <LogOut size={16} className="opacity-60" aria-hidden="true" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </>
  );
}
