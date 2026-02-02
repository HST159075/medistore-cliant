"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MedicineData {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId?: string;
  manufacturer: string;
}

interface Category {
  id: string;
  name: string;
}

export default function SellerInventory() {
  const [medicines, setMedicines] = useState<MedicineData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({ 
    name: "", 
    price: "", 
    stock: "", 
    categoryId: "",
    manufacturer: "Generic" 
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [medRes, catRes] = await Promise.all([
        fetch("http://localhost:5000/api/seller/medicines", { credentials: "include" }),
        fetch("http://localhost:5000/api/categories", { credentials: "include" })
      ]);

      const medData = await medRes.json();
      const catData = await catRes.json();

      // Debugging Logs
      console.log("Med Data:", medData);
      console.log("Cat Data:", catData);

      setMedicines(Array.isArray(medData) ? medData : []);
      setCategories(Array.isArray(catData) ? catData : []);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/seller/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          categoryId: formData.categoryId || undefined 
        }),
      });

      if (res.ok) {
        setOpen(false);
        fetchData(); 
        setFormData({ name: "", price: "", stock: "", categoryId: "", manufacturer: "Generic" });
      } else {
        alert("Server error while adding medicine.");
      }
    } catch (err) { 
      alert("Failed to add medicine!"); 
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/seller/medicines/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setMedicines((prev) => prev.filter((med) => med.id !== id));
      }
    } catch (err) {
      alert("Delete failed!");
    }
  };

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-2">
      <Loader2 className="animate-spin text-blue-600" size={32} />
      <p className="text-gray-500 font-medium">Loading Inventory...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Inventory</h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2" size={18} /> Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-black">
              <div className="space-y-2">
                <Label>Medicine Name</Label>
                <Input 
                  required 
                  value={formData.name} 
                  onChange={(e)=>setFormData({...formData, name: e.target.value})} 
                  placeholder="e.g. Napa Extend" 
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  onValueChange={(val) => setFormData({...formData, categoryId: val})}
                  value={formData.categoryId}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder={categories.length > 0 ? "Select Category" : "No Categories Found"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-500">Please create categories in DB first</div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Manufacturer</Label>
                <Input 
                  required 
                  value={formData.manufacturer} 
                  onChange={(e)=>setFormData({...formData, manufacturer: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (৳)</Label>
                  <Input 
                    required 
                    type="number" 
                    value={formData.price} 
                    onChange={(e)=>setFormData({...formData, price: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input 
                    required 
                    type="number" 
                    value={formData.stock} 
                    onChange={(e)=>setFormData({...formData, stock: e.target.value})} 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Save Medicine
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden text-black">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 text-gray-700">
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.length > 0 ? (
              medicines.map((med) => (
                <TableRow key={med.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{med.name}</TableCell>
                  <TableCell>৳{med.price}</TableCell>
                  <TableCell>
                    <Badge variant={med.stock < 10 ? "destructive" : "secondary"}>
                      {med.stock} in stock
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-red-600"
                      onClick={() => handleDelete(med.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-gray-500 italic">
                  No medicines found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}