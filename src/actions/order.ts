"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { OrderService } from "@/service/order.service";
import type { OrderPayload } from "@/types/order";

export async function createOrderAction(orderPayload: OrderPayload) {
  try {
    const cookieStore = await cookies();

    // সার্ভিস কল করা
    const { status, data } = await OrderService.createOrder(
      orderPayload,
      cookieStore.toString(),
    );
    if (status === 201 || (status === 200 && data.success)) {
      revalidatePath("/dashboard/customer");
      revalidatePath("/admin-dashboard/orders");
      return {
        success: true,
        message: "Order placed successfully!",
        order: data.order,
      };
    }
    return {
      success: false,
      message: data.message || "Failed to place order.",
    };
  } catch (error: unknown) {
    console.error("Order Action Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Server connection failed";

    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function fetchCustomerOrdersAction() {
  try {
    const cookieStore = await cookies();
    const result = await OrderService.getCustomerOrders(cookieStore.toString());
    
    // API যদি সাকসেস হয় (আপনার ব্যাকএন্ডের রেসপন্স অনুযায়ী চেক করবেন)
    return { 
      success: true, 
      data: Array.isArray(result) ? result : (result.data || []) 
    };
  } catch (error) {
    console.error("Fetch Orders Action Error:", error);
    return { success: false, data: [], message: "অর্ডার লোড করতে সমস্যা হয়েছে।" };
  }
}
