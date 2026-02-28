interface OrderData {
  items: Array<{ medicineId: string; quantity: number; price: number }>;
  totalPrice: number;
  address: string;
  phone: string;
}

export const OrderService = {
  createOrder: async (orderData: OrderData, cookieString: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://meadi-server.onrender.com";

      const res = await fetch(`${backendUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookieString,
        },
        body: JSON.stringify(orderData),
      });

      // সার্ভার রেসপন্স চেক করা
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create order on server");
      }

      return await res.json();
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error("OrderService Error:", err.message);
      throw err; 
    }
  },
};