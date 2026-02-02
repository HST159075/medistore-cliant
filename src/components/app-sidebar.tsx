"use client";

import { LayoutDashboard, ShoppingBag, Settings, User } from "lucide-react";
import Link from "next/link"; // ✅ Link ইমপোর্ট নিশ্চিত করুন
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Orders", url: "/dashboard/customer", icon: ShoppingBag }, // ✅ সঠিক পাথ
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white border-r">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-600 font-bold text-xl p-8 mb-4">
            MediStore
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-3 p-6 hover:bg-blue-50">
                      <item.icon className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-gray-700">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}