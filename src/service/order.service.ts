import type { OrderPayload } from "@/types/order";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const OrderService = {
  // 'any' এর বদলে 'OrderPayload' ব্যবহার করুন
  createOrder: async (orderData: OrderPayload, cookieString: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
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


  // কাস্টমারের অর্ডার হিস্ট্রি দেখা (ভবিষ্যতের জন্য)
  getCustomerOrders: async (cookieString: string) => {
    const res = await fetch(`${backendUrl}/api/orders/my-orders`, {
      headers: { Cookie: cookieString },
      credentials: "include",
    });
    return await res.json();
  }
}
