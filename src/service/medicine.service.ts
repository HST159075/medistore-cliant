const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export interface MedicineInput {
  name: string;
  price: number;
  stock: number;
  manufacturer: string;
  categoryId: string;
  description?: string | null;
  image?: string | null;
}


export interface Medicine extends MedicineInput {
  id: string;
  sellerId: string;
  createdAt: string; 
  updatedAt: string;
}

// ৩. জেনেরিক এপিআই রেসপন্স ইন্টারফেস
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const medicineService = {
  /**
   * নতুন মেডিসিন তৈরি করার মেথড
   */
  async create(data: MedicineInput): Promise<ApiResponse<Medicine>> {
    const res = await fetch(`${BASE_URL}/api/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Better Auth সেশন পাঠানোর জন্য
    });

    const result: ApiResponse<Medicine> = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to create medicine");
    }

    return result;
  },

  /**
   * সব মেডিসিন নিয়ে আসার মেথড
   */
  async getAll(): Promise<ApiResponse<Medicine[]>> {
    try {
      const res = await fetch(`${BASE_URL}/api/medicines`, {
        cache: "no-store", // রিয়েল-টাইম ডেটার জন্য
        credentials: "include",
      });

      const result: ApiResponse<Medicine[]> = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch medicines");
      }

      return result;
    } catch (error) {
      console.error("Fetch Error:", error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown error", 
        data: [] 
      };
    }
  },
};