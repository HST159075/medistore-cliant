"use client";
import RoleGuard from "@/components/RoleGuard";

export default function AdminPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="p-10 text-2xl font-bold">Welcome to Admin Dashboard 🛡️</div>
    </RoleGuard>
  );
}