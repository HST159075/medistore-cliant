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

// অ্যাকশন ইম্পোর্ট
import { fetchInventoryAction, addMedicineAction, deleteMedicineAction } from "@/actions/inventory.action";

export default function SellerInventory() {
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

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: "", price: "", stock: "", categoryId: "", manufacturer: "Generic" });

  const loadData = async () => {
    setLoading(true);
    const res = await fetchInventoryAction();
    if (res.success) {
      setMedicines(Array.isArray(res.medicines) ? res.medicines : []);
      setCategories(Array.isArray(res.categories) ? res.categories : []);
    }
    setLoading(false);
  };

  // loadData is asynchronous and updates state, so we wrap it inside an effect callback
  useEffect(() => {
    const fetchInitial = async () => {
      await loadData();
    };
    fetchInitial();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addMedicineAction({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });

    if (res.success) {
      setOpen(false);
      loadData();
      setFormData({ name: "", price: "", stock: "", categoryId: "", manufacturer: "Generic" });
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await deleteMedicineAction(id);
    if (res.success) loadData();
    else alert("Delete failed");
  };

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-2">
      <Loader2 className="animate-spin text-blue-600" size={32} />
      <p className="text-gray-500">Loading Inventory...</p>
    </div>
  );

  return (
    <RoleGuard allowedRoles={["SELLER"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">My Inventory</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2" size={18} /> Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
              <DialogHeader><DialogTitle>Add New Medicine</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div>
                  <Label>Medicine Name</Label>
                  <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select onValueChange={(val) => setFormData({ ...formData, categoryId: val })} value={formData.categoryId}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {categories.map((cat: Category) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price (৳)</Label>
                    <Input required type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                  </div>
                  <div>
                    <Label>Stock</Label>
                    <Input required type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600">Save Medicine</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow border overflow-hidden text-black">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((med: Medicine) => (
                <TableRow key={med.id}>
                  <TableCell className="font-medium">{med.name}</TableCell>
                  <TableCell>৳{med.price}</TableCell>
                  <TableCell>
                    <Badge variant={med.stock < 10 ? "destructive" : "secondary"}>{med.stock} in stock</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="text-red-600" onClick={() => handleDelete(med.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </RoleGuard>
  );
}