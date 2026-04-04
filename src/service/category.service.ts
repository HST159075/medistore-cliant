const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const categoryService = {
  async getAllCategories() {
    try {
      const res = await fetch(`${BASE_URL}/api/categories`); 
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error("Fetch Categories Error:", error);
      return [];
    }
  }
};