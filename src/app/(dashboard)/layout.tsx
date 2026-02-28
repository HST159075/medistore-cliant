"use client";
import { authClient } from "@/lib/auth.client";
import { User } from "@/lib/auth.client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Settings } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const user = session?.user as User;

  const menuItems = {
    ADMIN: [
      { name: "Stats", href: "/admin-dashboard", icon: LayoutDashboard },
      { name: "Users", href: "/admin-dashboard/users", icon: Users },
      { name: "Orders", href: "/admin-dashboard/orders", icon: ShoppingBag },
    ],
    SELLER: [
      { name: "Inventory", href: "/seller-dashboard", icon: Package },
      
    ],
    CUSTOMER: [
      { name: "My Orders", href: "/dashboard/customer", icon: ShoppingBag },
      { name: "Profile", href: "/dashboard/profile", icon: Settings },
    ],
  };

  const currentMenu = user ? menuItems[user.role as keyof typeof menuItems] : [];

  if (isPending) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="m-auto text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 font-bold text-xl text-blue-600">MediStore</div>
        <nav className="mt-4 px-4 space-y-2">
          {currentMenu.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={`flex items-center gap-3 p-3 rounded-lg transition ${pathname === item.href ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}>
                <item.icon size={20} /> {item.name}
              </span>
            </Link>
          ))}
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 mt-10" 
            onClick={async () => { await authClient.signOut(); router.push("/login"); }}>
            <LogOut className="mr-2" size={20} /> Logout
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}