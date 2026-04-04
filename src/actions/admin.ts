"use server";

import { cookies } from "next/headers";
import { AdminService } from "@/service/admin.service";

export type DashboardStats = {
  totalRevenue?: number;
  totalCustomers?: number;
  totalMedicines?: number;
  totalOrders?: number;
  lowStockAlert?: number;
  salesHistory?: { date: string; amount: number }[];
};

type SuccessData<T = unknown> = {
  success: boolean;
  data?: T;
};

export type AdminStatsActionResult = {
  success: boolean;
  data: DashboardStats | null;
  message?: string;
};

function isDashboardStats(obj: unknown): obj is DashboardStats {
  if (typeof obj !== "object" || obj === null) return false;
  const record = obj as Record<string, unknown>;

  // Accept both number and number-like string values (backend may serialize numbers as strings)
  // and allow cases where only some of the expected keys are present.
  return (
    "totalRevenue" in record ||
    "totalCustomers" in record ||
    "totalOrders" in record ||
    "salesHistory" in record
  );
}

function isSuccessData(obj: unknown): obj is SuccessData {
  if (typeof obj !== "object" || obj === null) return false;
  const record = obj as Record<string, unknown>;
  return typeof record.success === "boolean";
}

export async function fetchAdminStatsAction(): Promise<AdminStatsActionResult> {
  try {
    const cookieStore = await cookies();

    const result = await AdminService.getDashboardStats(cookieStore.toString());

    if (isDashboardStats(result)) {
      return { success: true, data: result };
    }

  
    if (isSuccessData(result) && result.success) {
      const data = result.data;
      if (isDashboardStats(data)) {
        return { success: true, data };
      }

      return { success: true, data: null };
    }

    return { success: false, data: null, message: "ডেটা পাওয়া যায়নি" };
  } catch (error) {
    console.error("Admin Stats Action Error:", error);
    return { success: false, data: null, message: "সার্ভার কানেকশন ফেইল্ড" };
  }
}