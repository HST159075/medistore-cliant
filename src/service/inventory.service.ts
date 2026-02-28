const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const InventoryService = {
  // সব মেডিসিন আনা
  getMedicines: async (cookieString: string) => {
    const res = await fetch(`${backendUrl}/api/seller/medicines`, {
      headers: { Cookie: cookieString },
      credentials: "include",
    });
    return await res.json();
  },

  // ক্যাটাগরি আনা
  getCategories: async () => {
    const res = await fetch(`${backendUrl}/api/categories`);
    return await res.json();
  },


  addMedicine: async (
    data: {
      name: string;
      price: number;
      stock: number;
      categoryId: string;
      manufacturer: string;
    },
    cookieString: string,
  ) => {
    const res = await fetch(`${backendUrl}/api/seller/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return res;
  },

  // মেডিসিন ডিলিট করা
  deleteMedicine: async (id: string, cookieString: string) => {
    const res = await fetch(`${backendUrl}/api/seller/medicines/${id}`, {
      method: "DELETE",
      headers: { Cookie: cookieString },
      credentials: "include",
    });
    return res;
  },
};