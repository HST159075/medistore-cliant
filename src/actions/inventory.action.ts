"use server";

import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";
import { InventoryService } from "@/service/inventory.service";

export async function fetchInventoryAction() {
  try {
    const cookieStore = await cookies();
    const medicines = await InventoryService.getMedicines(cookieStore.toString());
    const categories = await InventoryService.getCategories();
    return { success: true, medicines, categories };
  } catch (err) {
    console.error("fetchInventoryAction error", err);
    return { success: false, message: "Failed to fetch data" };
  }
}

// shape expected by the backend/service layer
export interface AddMedicineInput {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  manufacturer: string;
}

export async function addMedicineAction(formData: AddMedicineInput) {
  try {
    const cookieStore = await cookies();
    const res = await InventoryService.addMedicine(formData, cookieStore.toString());
    if (res.ok) {
      revalidatePath("/seller-dashboard"); // পেজ রিফ্রেশ করার জন্য
      return { success: true };
    }
    return { success: false, message: "Server error" };
  } catch (err) {
    console.error("addMedicineAction error", err);
    return { success: false, message: "Connection failed" };
  }
}

export async function deleteMedicineAction(id: string) {
  try {
    const cookieStore = await cookies();
    const res = await InventoryService.deleteMedicine(id, cookieStore.toString());
    if (res.ok) {
      revalidatePath("/seller-dashboard");
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("deleteMedicineAction error", err);
    return { success: false };
  }
}