"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Truck, CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth.client";
import { createOrderAction } from "@/actions/order";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = authClient.useSession();

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

    const orderPayload = {
      items: cart.map((item: CartItem) => ({
        medicineId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: totalPrice,
      address: address,
      phone: phone,
    };

    try {
      const result = await createOrderAction(orderPayload);

      if (result.success) {
        alert(result.message);
        clearCart();
        router.push("/dashboard/customer");
      } else {
        alert(result.message);
      }
    } catch {
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending)
    return (
      <div className="h-screen flex items-center justify-center bg-white text-black">
        <Loader2 className="animate-spin mr-2" /> Checking Session...
      </div>
    );

  if (!cart || cart.length === 0)
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 text-black">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <CreditCard className="text-blue-600" /> Checkout Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-gray-800">
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
                    placeholder="House 12, Road 5, Dhanmondi, Dhaka"
                    className="mt-1 bg-gray-50 border-gray-200 h-12 rounded-lg text-black"
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
                    className="mt-1 bg-gray-50 border-gray-200 h-12 rounded-lg text-black"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800 italic">
              * Payment: Cash on Delivery (COD) enabled.
            </div>
          </div>

          <div>
            <Card className="border-none shadow-sm bg-white sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-72 overflow-y-auto">
                  {cart.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex justify-between py-2 border-b border-gray-50"
                    >
                      <div className="text-sm">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500 text-xs">
                          Qty: {item.quantity} x ৳{item.price}
                        </p>
                      </div>
                      <span className="font-bold text-gray-700">
                        ৳{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-700">৳{totalPrice}</span>
                </div>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-6 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Confirm & Place Order"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
