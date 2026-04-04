"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { OrderService } from "@/service/order.service";
import type { OrderPayload } from "@/types/order";

export async function createOrderAction(orderPayload: OrderPayload) {
  try {
    const cookieStore = await cookies();
    const { status, data } = await OrderService.createOrder(
      orderPayload,
      cookieStore.toString(),
    );

    if (status === 201 || (status === 200 && data.success)) {
      // এই পাথগুলো রিভ্যালিডেট করা জরুরি
      revalidatePath("/dashboard/customer");
      revalidatePath("/admin-dashboard/orders");
      return { success: true, message: "Order placed successfully!", order: data.order };
    }
    return { success: false, message: data.message || "Failed to place order." };
  } catch {
    return { success: false, message: "Server connection failed" };
  }
}

export async function fetchCustomerOrdersAction() {
  try {
    const cookieStore = await cookies();
    const result = await OrderService.getCustomerOrders(cookieStore.toString());
    
    // ব্যাকএন্ড যদি { success: true, data: [...] } পাঠায় তবে এটি কাজ করবে
    if (result?.success && Array.isArray(result.data)) {
      return { success: true, data: result.data };
    }
    // যদি ব্যাকএন্ড সরাসরি অ্যারে পাঠায়
    if (Array.isArray(result)) {
      return { success: true, data: result };
    }
    
    return { success: false, data: [] };
  } catch {
    return { success: false, data: [] };
  }
}

export async function fetchAdminOrdersAction() {
  try {
    const cookieStore = await cookies();
    const result = await OrderService.getAdminOrders(cookieStore.toString());

    if (result?.success && Array.isArray(result.data)) {
      return { success: true, data: result.data };
    }
    if (Array.isArray(result)) {
      return { success: true, data: result };
    }

    return { success: false, data: [] };
  } catch {
    return { success: false, data: [] };
  }
}