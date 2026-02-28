"use client";

import { LayoutDashboard, ShoppingBag, Settings, User } from "lucide-react";
import Link from "next/link"; 
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth.client";
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
  { title: "My Orders", url: "/dashboard/customer", icon: ShoppingBag },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as { role?: string } | undefined;
  const router = useRouter();

  const role = user?.role?.toUpperCase();
  const dashboardUrl = session && user
    ? role === "ADMIN"
      ? "/admin-dashboard"
      : role === "SELLER"
      ? "/seller-dashboard"
      : "/dashboard/customer"
    : "/login";

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
                    {item.title === "Dashboard" ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (isPending) return;
                          router.push(dashboardUrl);
                        }}
                        className="w-full text-left flex items-center gap-3 p-6 hover:bg-blue-50"
                      >
                        <item.icon className="h-5 w-5 text-gray-500" />
                        <span className="font-medium text-gray-700">
                          {item.title}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 p-6 hover:bg-blue-50"
                      >
                        <item.icon className="h-5 w-5 text-gray-500" />
                        <span className="font-medium text-gray-700">
                          {item.title}
                        </span>
                      </Link>
                    )}
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
