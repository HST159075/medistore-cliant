"use client";

import { useEffect, useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock } from "lucide-react";

interface OrderItem {
  id: string;
  medicineId: string;
  quantity: number;
  price: number;
  medicine: {
    name: string;
  };
}

interface Order {
  id: string;
  totalPrice: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  items: OrderItem[];
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CustomerPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
        });

        const result = await res.json();
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status: Order["status"]) => {
    const variants: Record<string, string> = {
      PENDING: "bg-amber-100 text-amber-700",
      DELIVERED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
      PROCESSING: "bg-blue-100 text-blue-700",
      SHIPPED: "bg-purple-100 text-purple-700",
    };
    
    return (
      <Badge className={`${variants[status] || "bg-gray-100"} border-none shadow-none`}>
        {status}
      </Badge>
    );
  };

  return (
    <RoleGuard allowedRoles={["CUSTOMER"]}>
      <div className="p-6 md:p-10 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Profile</h1>

      <div className="grid gap-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package size={20} className="text-blue-600" /> Recent Orders
        </h2>

        {loading ? (
          <div className="space-y-4">
            <div className="h-24 w-full bg-gray-50 animate-pulse rounded-xl" />
            <div className="h-24 w-full bg-gray-50 animate-pulse rounded-xl" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-dashed border-2">
            <p className="text-gray-500 italic">এখনো কোনো অর্ডার পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 font-mono uppercase">Order ID: {order.id.slice(-8)}</p>
                    <p className="font-bold text-xl text-gray-900">৳{order.totalPrice}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} /> {new Date(order.createdAt).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                    {getStatusBadge(order.status)}
                    <button className="text-blue-600 text-sm font-semibold hover:underline">View Details</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      </div>
    </RoleGuard>
  );
}