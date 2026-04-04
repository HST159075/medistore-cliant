const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const AdminService = {

  getDashboardStats: async (cookieString: string) => {
    const res = await fetch(`${backendUrl}/api/admin/stats`, {
      headers: { 
        Cookie: cookieString,
        "Cache-Control": "no-cache" 
      },
      cache: "no-store",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard stats");
    return await res.json();
  },

 
  getAllUsers: async (cookieString: string) => {
    const res = await fetch(`${backendUrl}/api/admin/users`, {
      headers: { Cookie: cookieString },
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  },


  updateUserStatus: async (userId: string, status: string, cookieString: string) => {
    try {
      const res = await fetch(`${backendUrl}/api/admin/users/${userId}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString,
        },
        credentials: "include",
        body: JSON.stringify({ status }), 
      });
      return res;
    } catch (error) {
      console.error("Update user status error:", error);
      throw error;
    }
  },
};