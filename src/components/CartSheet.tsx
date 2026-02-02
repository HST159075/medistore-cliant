"use client";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
  SheetClose,
  SheetDescription // ✅ ১. এটি ইমপোর্ট করো
} from "@/components/ui/sheet"; 
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export function CartSheet() {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative border-blue-200">
          <ShoppingCart size={20} className="text-blue-600" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="bg-white text-black flex flex-col h-full w-[350px] sm:w-[400px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-black">
            <ShoppingCart className="text-blue-600" /> Your Cart
          </SheetTitle>
          {/* ✅ ২. এটি যোগ করো এররটি দূর করার জন্য */}
          <SheetDescription className="text-gray-500">
            Review your selected medicines before checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto mt-6 pr-2 text-black">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-blue-600 font-medium">
                      ৳{item.price} x {item.quantity}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between text-xl font-extrabold text-gray-900 px-1">
              <span>Total:</span>
              <span className="text-blue-700">৳{totalPrice}</span>
            </div>
            
            <SheetClose asChild>
              <Link href="/checkout" className="w-full block">
                <Button className="w-full py-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold text-white transition-transform active:scale-[0.98]">
                  Proceed to Checkout
                </Button>
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}