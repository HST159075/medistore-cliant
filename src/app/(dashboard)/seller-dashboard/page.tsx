"use client";

import { useEffect, useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast"; // ১. টোস্ট ইম্পোর্ট

// অ্যাকশন ইম্পোর্ট
import { fetchInventoryAction, addMedicineAction, deleteMedicineAction } from "@/actions/inventory.action";

// ইন্টারফেসগুলো ফাংশনের বাইরে নিয়ে আসা ভালো
interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId?: string;
}

interface Category {
  id: string;
  name: string;
}

interface FormData {
  name: string;
  price: string;
  stock: string;
  categoryId: string;
  manufacturer: string;
}

export default function SellerInventory() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // ২. সাবমিটিং স্টেট
  const [formData, setFormData] = useState<FormData>({ 
    name: "", price: "", stock: "", categoryId: "", manufacturer: "Generic" 
  });

  const loadData = async () => {
    const res = await fetchInventoryAction();
    if (res.success) {
      setMedicines(Array.isArray(res.medicines) ? res.medicines : []);
      setCategories(Array.isArray(res.categories) ? res.categories : []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Please select a category");

    setIsSubmitting(true);
    const res = await addMedicineAction({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });

    if (res.success) {
      toast.success("Medicine added successfully!"); // ৩. সাকসেস টোস্ট
      setOpen(false);
      loadData();
      setFormData({ name: "", price: "", stock: "", categoryId: "", manufacturer: "Generic" });
    } else {
      toast.error(res.message || "Failed to add medicine");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    
    const res = await deleteMedicineAction(id);
    if (res.success) {
      toast.success("Medicine deleted");
      loadData();
    } else {
      toast.error("Delete failed");
    }
  };

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-2">
      <Loader2 className="animate-spin text-blue-600" size={32} />
      <p className="text-gray-500 font-medium">Loading Inventory...</p>
    </div>
  );

  return (
    <RoleGuard allowedRoles={["SELLER"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">My Inventory</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                <PlusCircle className="mr-2" size={18} /> Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Add New Medicine</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Medicine Name</Label>
                  <Input required placeholder="Napa 500mg" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select onValueChange={(val) => setFormData({ ...formData, categoryId: val })} value={formData.categoryId}>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      {categories.map((cat: Category) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price (৳)</Label>
                    <Input required type="number" placeholder="0.00" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input required type="number" placeholder="100" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                  </div>
                </div>
                <Button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11">
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                  {isSubmitting ? "Saving..." : "Save Medicine"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* টেবিল কার্ড */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-black">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-transparent">
                <TableHead className="w-[300px] font-bold">Name</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Stock</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-gray-400">
                    No medicines found in your inventory.
                  </TableCell>
                </TableRow>
              ) : (
                medicines.map((med: Medicine) => (
                  <TableRow key={med.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-semibold text-gray-700">{med.name}</TableCell>
                    <TableCell className="text-gray-600 font-medium">৳{med.price}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={med.stock < 10 ? "destructive" : "secondary"}
                        className="rounded-full px-3 py-0.5"
                      >
                        {med.stock} in stock
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" 
                        onClick={() => handleDelete(med.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </RoleGuard>
  );
}