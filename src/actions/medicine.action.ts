"use server";

import { MedicineInput, medicineService } from "@/service/medicine.service";
import { revalidatePath } from "next/cache";

export async function addMedicineAction(data: MedicineInput) {
  try {
    // সার্ভিস কল করে ব্যাকএন্ডে ডেটা পাঠানো
    const result = await medicineService.create(data);

    if (result.success) {
      // সাকসেস হলে সংশ্লিষ্ট পাথগুলো রিভ্যালিডেট করা
      revalidatePath("/inventory");
      revalidatePath("/seller-dashboard");
      revalidatePath("/shop");

      return {
        success: true,
        message: "Medicine added and listed successfully!",
        data: result.data,
      };
    }

    // ব্যাকএন্ড থেকে আসা এরর মেসেজ হ্যান্ডেল করা
    return {
      success: false,
      message: result.message || "Failed to add medicine",
    };

  } catch (error: unknown) {
    // এরর মেসেজটি সেফলি এক্সট্রাক্ট করা
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    
    console.error("Action Error Log:", errorMessage);
    
    return {
      success: false,
      message: errorMessage,
    };
  }
}