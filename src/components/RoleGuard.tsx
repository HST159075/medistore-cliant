"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient, type User } from "@/lib/auth.client";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function RoleGuard({ children, allowedRoles }: Props) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user as User | undefined;

  useEffect(() => {
    if (isPending) return;
    if (!session || !user) {
      router.push("/login");
      return;
    }

    const role = (user.role || "CUSTOMER").toUpperCase();
    if (!allowedRoles.includes(role)) {
      const dest = role === "ADMIN" ? "/admin-dashboard" : role === "SELLER" ? "/seller-dashboard" : "/dashboard/customer";
      router.push(dest);
    }
  }, [session, isPending, user, allowedRoles, router]);

  if (isPending) return (
    <div className="p-10 text-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );


  if (!session || !user) return null;

  return <>{children}</>;
}
