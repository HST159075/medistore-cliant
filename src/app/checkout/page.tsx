"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Truck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth.client";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  // Form states
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/checkout");
    }
  }, [session, isPending, router]);

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      alert("Please provide address and phone number!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            medicineId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalPrice: totalPrice,
          address: address,
          phone: phone,
        }),
        credentials: "include", 
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert("Order Placed Successfully!");
        clearCart();
        router.push("/dashboard/customer");
      } else {
        alert(result.message || "Order failed to save!");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-black">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold">Your cart is empty!</h2>
        <Button
          onClick={() => router.push("/shop")}
          className="mt-4 bg-blue-600"
        >
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 text-black">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <CreditCard className="text-blue-600" /> Checkout Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Truck size={20} className="text-blue-600" /> Shipping
                Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Full Delivery Address
                </label>
                <Input
                  placeholder="Example: House 12, Road 5, Dhanmondi, Dhaka"
                  className="mt-1 bg-gray-50 text-black border-gray-200 h-12 rounded-lg"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Contact Number
                </label>
                <Input
                  placeholder="017XXXXXXXX"
                  className="mt-1 bg-gray-50 text-black border-gray-200 h-12 rounded-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            <strong>Payment Method:</strong> Cash on Delivery (COD) is currently
            available for all OTC medicines.
          </div>
        </div>

        <div>
          <Card className="border-none shadow-md bg-white sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-bold">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-blue-700">৳{totalPrice}</span>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-6 mt-4 bg-green-600 hover:bg-green-700 text-lg font-bold text-white shadow-lg transition-all active:scale-95 rounded-xl"
              >
                {loading ? "Processing..." : "Confirm & Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
