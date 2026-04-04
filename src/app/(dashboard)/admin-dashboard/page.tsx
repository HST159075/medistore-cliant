"use client";

import { useEffect, useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, ShoppingBag, BadgeDollarSign, AlertTriangle, Loader2, TrendingUp 
} from "lucide-react";
import { fetchAdminStatsAction } from "@/actions/admin";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

interface Stats {
  totalRevenue?: number;
  totalCustomers?: number;
  totalMedicines?: number;
  totalOrders?: number;
  lowStockAlert?: number;
  salesHistory?: { date: string, amount: number }[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await fetchAdminStatsAction();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  // স্ট্যাটাস কার্ডের ডেটা অ্যারে
  const statCards = [
    {
      title: "মোট আয়",
      value: `৳${stats?.totalRevenue || 0}`,
      icon: <BadgeDollarSign className="text-green-600" />,
      color: "bg-green-100",
      desc: "সফল ডেলিভারি থেকে"
    },
    {
      title: "মোট কাস্টমার",
      value: stats?.totalCustomers || 0,
      icon: <Users className="text-blue-600" />,
      color: "bg-blue-100",
      desc: "নিবন্ধিত ইউজার"
    },
    {
      title: "মোট অর্ডার",
      value: stats?.totalOrders || 0,
      icon: <ShoppingBag className="text-purple-600" />,
      color: "bg-purple-100",
      desc: "সর্বমোট অর্ডার"
    },
    {
      title: "স্টক অ্যালার্ট",
      value: stats?.lowStockAlert || 0,
      icon: <AlertTriangle className="text-red-600" />,
      color: "bg-red-100",
      desc: "৫টির কম স্টক"
    },
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="p-6 md:p-10 max-w-7xl mx-auto text-black bg-gray-50 min-h-screen">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard 🛡️</h1>
            <p className="text-gray-500">Real-time store analytics</p>
          </div>
          <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full animate-pulse text-sm font-bold shadow-lg">
            <TrendingUp size={18} /> লাইভ আপডেট চালু
          </div>
        </div>

        {/* ১. স্ট্যাটাস কার্ড গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    {card.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{card.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ২. চার্ট সেকশন */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* লাইভ সেলিং লাইন চার্ট */}
          <Card className="p-6 shadow-md border-none bg-white">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold text-gray-700">Selling Chart (সাপ্তাহিক)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] min-h-[300px] px-0">
              {stats?.salesHistory && stats.salesHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%" minHeight={250} minWidth={200}>
                  <LineChart data={stats.salesHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `৳${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#10b981' }} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                   <p>কোনো বিক্রয় তথ্য নেই</p>
                   <p className="text-xs">অর্ডার ডেলিভারি করলে এখানে আপডেট হবে</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* অর্ডার স্ট্যাটাস বার চার্ট */}
          <Card className="p-6 shadow-md border-none bg-white">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold text-gray-700">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] min-h-[300px] px-0">
              <ResponsiveContainer width="100%" height="100%" minHeight={250} minWidth={200}>
                <BarChart data={[{ name: 'Orders', count: stats?.totalOrders || 0 }]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: '#f9fafb'}} />
                  <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>
      </div>
    </RoleGuard>
  );
}