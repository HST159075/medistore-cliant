import Link from "next/link";
import { ShoppingCart, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-xl"
        >
          <Pill size={28} />
          <span className="tracking-tight">MediStore</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link
            href="/"
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/dashboard"
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative rounded-full"
          >
            <Link href="/checkout">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                0
              </span>
            </Link>
          </Button>

          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg shadow-md shadow-blue-100"
          >
            <Link href="/Register">Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
