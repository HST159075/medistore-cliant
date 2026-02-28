"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Pill,
  ShieldCheck,
  Truck,
  ShoppingCart,
  ArrowRight,
  Search,
  Activity,
  HeartPulse,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20 overflow-x-hidden bg-white selection:bg-blue-100 selection:text-blue-700">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-linear-to-b from-[#f0f7ff] to-white py-28 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 text-blue-200/40 animate-[spin_10s_linear_infinite] hidden lg:block">
          <Pill size={150} />
        </div>
        <div className="absolute bottom-20 right-[-5%] text-blue-200/30 animate-pulse hidden lg:block">
          <Activity size={200} />
        </div>
        <div className="absolute top-1/4 right-20 w-4 h-4 bg-blue-400 rounded-full animate-ping" />

        <div className="container mx-auto flex flex-col items-center text-center relative z-10">
          <Badge className="mb-8 bg-white/80 backdrop-blur-md text-blue-600 border border-blue-100 px-6 py-2 rounded-full text-sm font-bold shadow-sm animate-fade-in hover:scale-105 transition-transform duration-300">
            <Zap size={14} className="mr-2 fill-blue-600" />
            Flash Delivery is Now Live!
          </Badge>

          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-none tracking-tight">
            Your Trusted <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-500 to-blue-700">
              Digital Pharmacy.
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed font-medium">
            Order authentic medicines and healthcare essentials with 
            <span className="text-blue-600 font-bold"> 60-minute </span> 
            emergency delivery from licensed pharmacies.
          </p>

          {/* Luxury Search Bar */}
          <div className="relative w-full max-w-3xl mb-16 group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[28px] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.12)] border border-white">
              <div className="pl-6 text-gray-400">
                <Search size={24} className="group-focus-within:text-blue-600 transition-colors" />
              </div>
              <Input
                type="text"
                placeholder="Search for medicines, brands, or symptoms..."
                className="w-full h-18 border-none bg-transparent text-lg focus-visible:ring-0 placeholder:text-gray-400 py-6"
              />
              <div className="pr-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 h-12 font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
                  Search Now
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Button
              asChild
              size="lg"
              className="h-16 rounded-[22px] px-12 bg-gray-900 hover:bg-blue-600 text-white shadow-2xl transition-all duration-500 hover:-translate-y-1 text-lg font-bold"
            >
              <Link href="/shop" className="flex items-center gap-2">
                Explore Shop <ArrowRight size={20} />
              </Link>
            </Button>
            
            <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-gray-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src={`https://i.pravatar.cc/100?u=${i}`}
                    width={48}
                    height={48}
                    className="rounded-full border-4 border-white object-cover shadow-sm"
                    alt="user"
                    unoptimized
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-gray-900 leading-none">10k+ Happy Users</p>
                <div className="flex text-yellow-400 mt-1">
                  {"★★★★★".split("").map((s, i) => <span key={i} className="text-[10px]">{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white rounded-[45px] shadow-[0_40px_100px_rgba(0,0,0,0.07)] border border-gray-50 overflow-hidden">
          {[
            {
              icon: <ShieldCheck size={38} />,
              title: "Verified Source",
              desc: "100% Genuine Medicine",
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              icon: <Truck size={38} />,
              title: "Flash Delivery",
              desc: "Arrives in 60 Minutes",
              color: "bg-blue-50 text-blue-600",
            },
            {
              icon: <HeartPulse size={38} />,
              title: "24/7 Support",
              desc: "Consult with Pharmacists",
              color: "bg-rose-50 text-rose-600",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-10 flex flex-col items-center text-center border-r border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors"
            >
              <div className={`${feature.color} p-5 rounded-[24px] mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              <h4 className="font-black text-gray-900 text-xl mb-1">{feature.title}</h4>
              <p className="text-gray-500 font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <Badge className="bg-blue-50 text-blue-600 border-none mb-4 uppercase tracking-widest font-black text-[10px]">
              Browse by needs
            </Badge>
            <h2 className="text-5xl font-black text-gray-900">Popular Categories</h2>
          </div>
          <Button variant="link" asChild className="text-blue-600 font-black text-lg p-0 h-auto group">
            <Link href="/shop" className="flex items-center gap-2">
              View All <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "Fever & Pain", icon: <Pill />, color: "from-blue-500 to-blue-600" },
            { name: "Diabetes", icon: <Activity />, color: "from-rose-500 to-rose-600" },
            { name: "Baby Care", icon: <HeartPulse />, color: "from-pink-500 to-pink-600" },
            { name: "Vitamins", icon: <Sparkles />, color: "from-amber-500 to-amber-600" },
            { name: "First Aid", icon: <ShieldCheck />, color: "from-emerald-500 to-emerald-600" },
            { name: "Skincare", icon: <Activity />, color: "from-purple-500 to-purple-600" },
          ].map((cat) => (
            <div key={cat.name} className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-[35px] bg-gray-50 overflow-hidden flex flex-col items-center justify-center p-6 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-gray-200">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 text-gray-400 group-hover:text-white transition-all duration-500 scale-[1.8] group-hover:scale-[2.2]">
                  {cat.icon}
                </div>
                <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                  <p className="relative z-10 font-black text-[11px] uppercase tracking-tighter text-gray-600 group-hover:text-white transition-colors">
                    {cat.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED PRODUCTS --- */}
      <section className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-[60px] p-12 md:p-20 overflow-hidden relative">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
          
          <div className="relative z-10 mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Must-Have Essentials</h2>
              <p className="text-gray-400 text-lg font-medium">Get the best deals on daily healthcare products</p>
            </div>
            <Button className="bg-white text-gray-900 hover:bg-blue-600 hover:text-white rounded-2xl h-14 px-10 font-black transition-all">
              View Collection
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              { name: "Napa Extend", brand: "Beximco", price: 15, tag: "Popular" },
              { name: "Sergel 20mg", brand: "Healthcare", price: 70, tag: "Hot" },
              { name: "Savlon Liquid", brand: "ACI Limited", price: 45, tag: "Safety" },
              { name: "Oral Saline", brand: "SMC Ent.", price: 5, tag: "Daily" },
            ].map((product, i) => (
              <Card
                key={i}
                className="group border-none bg-white/5 backdrop-blur-xl hover:bg-white transition-all duration-500 rounded-[40px] overflow-hidden"
              >
                <CardHeader className="p-4">
                  <div className="h-56 rounded-[30px] bg-gray-800/50 group-hover:bg-blue-50 flex items-center justify-center relative transition-colors overflow-hidden">
                    <Pill size={70} className="text-gray-700 group-hover:text-blue-200 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12" />
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white border-none font-black text-[10px] px-3 py-1">
                      {product.tag}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-2">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Pharmacy Grade</p>
                  <h3 className="font-black text-xl text-white group-hover:text-gray-900 transition-colors mb-1">{product.name}</h3>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-6">{product.brand}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-white group-hover:text-gray-900">৳{product.price}</span>
                    <Button size="icon" className="h-12 w-12 rounded-xl bg-blue-600 hover:bg-gray-900 text-white transition-all">
                      <ShoppingCart size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}