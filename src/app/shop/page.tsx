"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Pill } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartSheet } from "@/components/CartSheet";

interface Medicine {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  stock: number;
  category?: { name: string };
  seller?: { name: string };
}

export default function ShopPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/medicines?search=${search}`,
      );
      const result = await response.json();

      if (result.success) {
        setMedicines(result.data);
      }
    } catch (err) {
      console.error("Error loading shop:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMedicines();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  if (loading && medicines.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Pill className="animate-spin text-blue-600 mr-2" />
        <span className="text-black font-medium">Loading Pharmacy...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 flex items-center gap-2 tracking-tight">
            MediStore <span className="text-blue-600">OTC Shop</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Quality medicines, no prescription needed.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[450px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search for tablets, syrups or brands..."
              className="pl-12 py-6 bg-gray-50 border-gray-200 rounded-2xl focus:ring-blue-500 text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <CartSheet />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {medicines.map((med) => (
          <Card
            key={med.id}
            className="group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden rounded-2xl border border-gray-100"
          >
            <CardHeader className="bg-blue-50/50 pb-6 relative">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3">
                  {med.category?.name || "Tablet"}
                </Badge>
                {med.stock > 0 ? (
                  <span className="text-[10px] font-bold text-green-600 uppercase bg-green-50 px-2 py-1 rounded">
                    In Stock
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-red-500 uppercase bg-red-50 px-2 py-1 rounded">
                    Out of Stock
                  </span>
                )}
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {med.name}
              </CardTitle>
              <div className="text-sm text-gray-400 font-medium">
                {med.manufacturer}
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 mb-1 tracking-wider uppercase">
                    Price per unit
                  </p>
                  <div className="text-3xl font-black text-blue-800">
                    ৳{med.price}
                  </div>
                </div>
                <div className="text-[11px] text-gray-400 text-right">
                  Seller:{" "}
                  <span className="text-gray-600 font-semibold">
                    {med.seller?.name || "MediStore"}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pb-6 pt-2">
              <Button
                onClick={() =>
                  addToCart({
                    id: med.id,
                    name: med.name,
                    price: med.price,
                    quantity: 1,
                    stock: med.stock,
                  })
                }
                className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 text-lg font-bold transition-all transform group-active:scale-95"
                disabled={med.stock === 0}
              >
                <ShoppingCart className="mr-2" size={20} />
                {med.stock > 0 ? "Add to Cart" : "Restocking Soon"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {medicines.length === 0 && !loading && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl mt-10">
          <Pill size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-700">
            No Medicine Found!
          </h3>
          <p className="text-gray-500">
            Try searching for something else or check back later.
          </p>
        </div>
      )}
    </div>
  );
}
