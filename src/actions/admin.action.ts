"use server";

import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";
import { AdminService } from "@/service/admin.service";

export async function fetchUsersAction() {
  try {
    const cookieStore = await cookies();
    const data = await AdminService.getAllUsers(cookieStore.toString());
    return { success: true, data: Array.isArray(data) ? data : [] };
  } catch (error) {
    console.error("Admin Fetch Action Error:", error);
    return { success: false, message: "Could not load users", data: [] };
  }
}

export async function updateUserStatusAction(userId: string, isActive: boolean) {
  try {
    const cookieStore = await cookies();
    const res = await AdminService.updateUserStatus(userId, isActive, cookieStore.toString());

    if (res.ok) {
      revalidatePath("/admin-dashboard/users");
      return { success: true, message: `User ${isActive ? "activated" : "banned"} successfully` };
    }
    
    // Log the response for debugging
    const errorData = await res.json().catch(() => ({}));
    console.error("Status update failed:", res.status, errorData);
    return { success: false, message: errorData.message || "Server failed to update status" };
  } catch (error) {
    console.error("Update status error:", error);
    return { success: false, message: "Network error" };
  }
}