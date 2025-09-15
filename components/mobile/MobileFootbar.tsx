"use client";
import React from "react";
import { Home, ShoppingCart, UserCircle, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const MobileFootbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: "Home", path: "/" },
        { icon: ShoppingCart, label: "Shop", path: "/shop" },
        { icon: Bell, label: "Alerts", path: "/notifications" },
        { icon: UserCircle, label: "Profile", path: "/profile" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 z-50 w-full bg-primary md:hidden">
            <div className="flex justify-around px-4 py-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={cn(
                                "flex flex-col items-center justify-center text-xs flex-1 transition-all duration-200",
                                isActive
                                    ? "text-white font-semibold scale-105"
                                    : "text-blue-100 hover:text-white"
                            )}
                        >
                            <Icon className={cn("h-6 w-6 mb-1", isActive && "stroke-[2.5]")} />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileFootbar;
