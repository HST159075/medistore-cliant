import Link from "next/link";
import {
  Pill,
  ShieldCheck,
  Truck,
  Clock,
  ShoppingCart,
  ArrowRight,
  Search,
  Activity,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20 overflow-x-hidden bg-white">
      <section className="relative bg-[#f8faff] py-24 px-4 overflow-hidden">
        <div className="absolute top-10 left-10 text-blue-100 opacity-50 rotate-12 hidden lg:block">
          <Pill size={120} />
        </div>
        <div className="absolute bottom-10 right-10 text-blue-100 opacity-50 -rotate-12 hidden lg:block">
          <Activity size={120} />
        </div>

        <div className="container mx-auto flex flex-col items-center text-center relative z-10">
          <Badge className="mb-6 bg-blue-600 text-white hover:bg-blue-700 border-none px-6 py-1.5 rounded-full text-sm font-semibold animate-bounce">
            Flash Delivery is Now Live!
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Your Trusted <span className="text-blue-600">Digital</span> <br />
            <span className="relative inline-block">
              Pharmacy.
              <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-100 -z-10"></span>
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed font-medium">
            Order authentic medicines, healthcare products, and wellness
            essentials from licensed pharmacies with lightning-fast delivery.
          </p>
          <div className="relative w-full max-w-2xl mb-12 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search
                className="text-gray-400 group-focus-within:text-blue-600 transition-colors"
                size={24}
              />
            </div>
            <Input
              type="text"
              placeholder="Search for medicines, brands, or symptoms..."
              className="w-full h-16 pl-14 pr-32 rounded-2xl border-none shadow-2xl shadow-blue-100 text-lg focus-visible:ring-2 focus-visible:ring-blue-600 bg-white"
            />
            <Button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 rounded-xl px-6 font-bold">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-2xl px-10 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 text-lg font-bold"
            >
              <Link href="/shop" className="flex items-center">
                Explore Shop <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="flex -space-x-3 items-center">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm"
                >
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
              <span className="ml-4 text-sm font-bold text-gray-600">
                10k+ Happy Customers
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-[40px] shadow-2xl shadow-blue-100 border border-blue-50">
          {[
            {
              icon: <ShieldCheck size={40} />,
              title: "Authentic Meds",
              desc: "100% genuine products sourced from top manufacturers.",
              color: "text-green-600",
            },
            {
              icon: <Truck size={40} />,
              title: "Instant Delivery",
              desc: "Standard and emergency delivery within 60 minutes.",
              color: "text-blue-600",
            },
            {
              icon: <HeartPulse size={40} />,
              title: "Expert Care",
              desc: "Dedicated support team for your medical inquiries.",
              color: "text-red-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex gap-5 items-center px-4 border-r border-gray-100 last:border-none"
            >
              <div className={`${feature.color}`}>{feature.icon}</div>
              <div>
                <h4 className="font-black text-gray-800 text-lg">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-gray-900 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-500 font-medium italic">
              High quality products for your specific needs
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 font-bold px-8"
          >
            <Link href="/shop">View All Categories</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            { name: "Fever & Pain", icon: <Pill />, color: "bg-blue-50" },
            { name: "Diabetes", icon: <Activity />, color: "bg-red-50" },
            { name: "Baby Care", icon: <HeartPulse />, color: "bg-pink-50" },
            { name: "Vitamins", icon: <Pill />, color: "bg-green-50" },
            { name: "First Aid", icon: <ShieldCheck />, color: "bg-orange-50" },
            { name: "Skincare", icon: <Activity />, color: "bg-purple-50" },
          ].map((cat) => (
            <div key={cat.name} className="group cursor-pointer">
              <div
                className={`${cat.color} aspect-square rounded-[32px] flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-blue-200`}
              >
                <div className="scale-125 transition-transform group-hover:scale-150">
                  {cat.icon}
                </div>
              </div>
              <p className="font-black text-center text-gray-700 group-hover:text-blue-600 transition-colors uppercase text-xs tracking-tighter">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container mx-auto px-4">
        <div className="mb-14 flex items-center gap-4">
          <div className="h-[2px] flex-1 bg-gray-100"></div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight px-4">
            Must-Haves
          </h2>
          <div className="h-[2px] flex-1 bg-gray-100"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              name: "Napa Extend 665mg",
              brand: "Beximco Pharma",
              price: 15,
              oldPrice: 18,
              tag: "Popular",
            },
            {
              name: "Sergel 20mg Tablet",
              brand: "Healthcare Pharma",
              price: 70,
              oldPrice: 80,
              tag: "Best Price",
            },
            {
              name: "Savlon Antiseptic",
              brand: "ACI Limited",
              price: 45,
              oldPrice: 50,
              tag: "Safety",
            },
            {
              name: "Oral Saline-N",
              brand: "SMC Enterprise",
              price: 5,
              oldPrice: 6,
              tag: "Essential",
            },
          ].map((product, i) => (
            <Card
              key={i}
              className="group overflow-hidden border-none bg-white shadow-xl shadow-gray-100 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 rounded-[35px] border-b-8 border-b-transparent hover:border-b-blue-600"
            >
              <CardHeader className="p-0">
                <div className="h-64 bg-gray-50 flex items-center justify-center relative transition-colors group-hover:bg-blue-50/20">
                  <Pill
                    size={80}
                    className="text-gray-200 group-hover:text-blue-200 transition-all duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-6 left-6 bg-blue-600 text-white border-none text-[10px] font-black uppercase px-4 py-1 rounded-lg">
                    {product.tag}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-6 right-6 rounded-full bg-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <HeartPulse size={18} className="text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[2px]">
                    Prescription Ready
                  </span>
                  <h3 className="font-black text-xl text-gray-800 mt-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {product.brand}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through font-bold">
                      ৳{product.oldPrice}.00
                    </span>
                    <span className="text-3xl font-black text-gray-900 font-mono tracking-tighter">
                      ৳{product.price}.00
                    </span>
                  </div>
                  <Button
                    size="icon"
                    className="h-14 w-14 rounded-2xl bg-gray-900 group-hover:bg-blue-600 transition-all duration-300 shadow-xl group-active:scale-90"
                  >
                    <ShoppingCart size={24} className="text-white" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="bg-blue-600 rounded-[50px] p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-blue-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-20 -mt-20 opacity-50 shadow-inner"></div>
          <div className="relative z-10 max-w-lg text-center md:text-left">
            <h2 className="text-4xl font-black text-white mb-4 italic">
              Own a Pharmacy?
            </h2>
            <p className="text-blue-100 text-lg font-medium mb-8">
              Expand your business digitally. Register your shop today and start
              serving thousands of customers in your area.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 h-14 rounded-2xl px-10 font-black shadow-xl"
            >
              <Link href="/register">Register as a Seller</Link>
            </Button>
          </div>
          <div className="mt-12 md:mt-0 relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-white font-bold">
                <ShieldCheck className="text-green-400" /> Verified Seller
                Status
              </div>
              <div className="flex items-center gap-3 text-white font-bold">
                <Truck className="text-green-400" /> Delivery Support Provided
              </div>
              <div className="flex items-center gap-3 text-white font-bold">
                <Activity className="text-green-400" /> 0% Commission for 1st
                Month
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
