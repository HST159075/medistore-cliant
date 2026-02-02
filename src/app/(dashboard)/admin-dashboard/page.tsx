"use client";
import { authClient } from "@/lib/auth.client";
import { User } from "@/lib/auth.client"; 

export default function AdminPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user as User;

  if (user?.role !== "ADMIN") return <p className="p-10 text-red-500">Access Denied: Admins Only</p>;

  return <div className="p-10 text-2xl font-bold">Welcome to Admin Dashboard 🛡️</div>;
}