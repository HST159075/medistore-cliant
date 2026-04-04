import type { OrderPayload } from "@/types/order";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const OrderService = {
  createOrder: async (orderData: OrderPayload, cookieString: string) => {
    const res = await fetch(`${backendUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      body: JSON.stringify(orderData),
    });
    
    const data = await res.json();
    return { status: res.status, data };
  },

getCustomerOrders: async (cookieString: string) => {
  try {
    const res = await fetch(`${backendUrl}/api/orders/my-orders`, {
      headers: { 
        Cookie: cookieString,
        "Cache-Control": "no-cache" // ডাটা সব সময় টাটকা রাখবে
      },
      cache: "no-store", // ক্যাশ ব্যবহার করবে না
      credentials: "include",
    });
    
    if (!res.ok) {
      console.error("Failed to fetch orders:", res.status);
      return { success: false, data: [] };
    }
    
    const data = await res.json();

    // Normalize response shapes from the backend.
    const orders =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.orders)
        ? data.orders
        : Array.isArray(data?.result)
        ? data.result
        : [];

    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return { success: false, data: [] };
  }
},

getAdminOrders: async (cookieString: string) => {
  try {
    const res = await fetch(`${backendUrl}/api/orders`, {
      headers: {
        Cookie: cookieString,
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch admin orders:", res.status);
      return { success: false, data: [] };
    }

    const data = await res.json();

    // Normalize response shapes from the backend.
    // Backend may return: { success: true, data: [...] } or { success: true, orders: [...] } or just an array.
    const orders =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.orders)
        ? data.orders
        : Array.isArray(data?.result)
        ? data.result
        : [];

    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return { success: false, data: [] };
  }
}
};