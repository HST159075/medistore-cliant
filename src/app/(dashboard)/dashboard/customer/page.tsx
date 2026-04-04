"use client";

import { useEffect, useState, useCallback } from "react";
import RoleGuard from "@/components/RoleGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Clock, Loader2, RefreshCw } from "lucide-react";
import { fetchCustomerOrdersAction } from "@/actions/order";

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

export default function CustomerPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchCustomerOrdersAction();
      if (result.success && Array.isArray(result.data)) {
        setOrders(result.data);
      } else {
        setOrders([]);
      }
    } catch (_error) {
      console.error("Error fetching orders:", _error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Auto-refresh orders when entering the page (in case of new orders)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadOrders();
    }, 1500); // Refresh after 1.5 seconds to ensure backend has processed the order

    return () => clearTimeout(timer);
  }, [loadOrders]);

  const getStatusBadge = (status: Order["status"]) => {
    const variants: Record<string, string> = {
      PENDING: "bg-amber-100 text-amber-700",
      DELIVERED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
      PROCESSING: "bg-blue-100 text-blue-700",
      SHIPPED: "bg-purple-100 text-purple-700",
    };

    return (
      <Badge
        className={`${variants[status] || "bg-gray-100"} border-none shadow-none`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <RoleGuard allowedRoles={["CUSTOMER"]}>
      <div className="p-6 md:p-10 max-w-6xl mx-auto text-black">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Welcome to Your Profile
        </h1>

        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Package size={20} className="text-blue-600" /> Recent Orders
            </h2>
            <Button
              onClick={loadOrders}
              disabled={loading}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-gray-500 animate-pulse font-medium">
                অর্ডার লোড হচ্ছে...
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-dashed border-2 border-gray-200">
              <p className="text-gray-500 italic font-medium">
                এখনো কোনো অর্ডার পাওয়া যায়নি।
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                        Order ID: {order.id.slice(-8)}
                      </p>
                      <p className="font-bold text-2xl text-gray-900">
                        ৳{order.totalPrice}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock size={14} />{" "}
                        {new Date(order.createdAt).toLocaleDateString("bn-BD")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between border-t md:border-none pt-4 md:pt-0">
                      {getStatusBadge(order.status)}
                      <button className="text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors">
                        View Details
                      </button>
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
