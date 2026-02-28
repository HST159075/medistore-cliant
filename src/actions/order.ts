"use server";

import { cookies } from "next/headers";

interface OrderItem {
  medicineId: string;
  quantity: number;
  price: number;
}

interface OrderData {
  items: OrderItem[];
  totalPrice: number;
  address: string;
  phone: string;
}

export const createOrderAction = async (orderData: OrderData) => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString,
      },
      body: JSON.stringify(orderData),
    });

    const result = await res.json();
    
    if (!res.ok) {
      return { success: false, message: result.message || "Failed to place order" };
    }

    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Order Action Error:", err);
    return { success: false, message: "Server connection failed" };
  }
};