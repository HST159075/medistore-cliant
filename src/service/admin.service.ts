const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const AdminService = {
  // সব ইউজারদের লিস্ট আনা
  getAllUsers: async (cookieString: string) => {
    const res = await fetch(`${backendUrl}/api/admin/users`, {
      headers: { Cookie: cookieString },
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  },

  // ইউজারের স্ট্যাটাস (Ban/Unban) আপডেট করা
  updateUserStatus: async (userId: string, status: string, cookieString: string) => {
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
  },
};