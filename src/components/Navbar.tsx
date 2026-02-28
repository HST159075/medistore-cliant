"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Pill,
  LayoutDashboard,
  LogOut,
  Loader2,
  Home,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth.client";
import { useRouter } from "next/navigation";

type UserWithRole = {
  name?: string;
  role?: string;
} & Record<string, unknown>;

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as UserWithRole | undefined;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const handleDashboardClick = () => {
    if (!session || !user) {
      router.push("/login");
      return;
    }

    const role = user.role?.toUpperCase();

    if (role === "ADMIN") window.location.href = "/admin-dashboard";
    else if (role === "SELLER") window.location.href = "/seller-dashboard";
    else window.location.href = "/dashboard/customer";
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!mounted) return <div className="h-16 border-b bg-white shadow-sm" />;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* লোগো এবং মেইন নেভিগেশন লিঙ্কস */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-600 font-bold text-xl"
          >
            <Pill size={28} />
            <span className="tracking-tight">MediStore</span>
          </Link>

          {/* নতুন যোগ করা Home এবং Shop বাটন (Desktop view) */}
          <div className="hidden md:flex items-center gap-1">
            <Button asChild variant="ghost" className="text-gray-600 hover:text-blue-600 gap-2">
              <Link href="/">
                <Home size={18} />
                <span>Home</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-gray-600 hover:text-blue-600 gap-2">
              <Link href="/shop">
                <Store size={18} />
                <span>Shop</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* ড্যাশবোর্ড বাটন */}
          <Button
            onClick={handleDashboardClick}
            variant="ghost"
            className="text-gray-600 hover:text-blue-600 gap-2"
          >
            <LayoutDashboard size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>

          {/* কার্ট বাটন */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative rounded-full"
          >
            <Link href="/checkout">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                0
              </span>
            </Link>
          </Button>

          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          ) : (
            <>
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="hidden lg:flex flex-col items-end leading-tight border-l pl-3">
                    <span className="font-bold text-gray-900 text-sm">
                      {user?.name || "User"}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-blue-600">
                      {user?.role || "N/A"}
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-blue-600 font-bold"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md"
                  >
                    <Link href="/Register">Register</Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;