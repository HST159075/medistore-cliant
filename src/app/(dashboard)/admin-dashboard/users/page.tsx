"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

// অ্যাকশন ইম্পোর্ট
import { fetchUsersAction, updateUserStatusAction } from "@/actions/admin.action";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  
  const loadUsers = async () => {
    
    await Promise.resolve();
    setLoading(true);

    const result = await fetchUsersAction();
    if (result.success) {
      setUsers(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;
      await loadUsers();
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (userId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus; // Toggle boolean
    const previousUsers = users;
    
    // Optimistic update
    setUsers((prev) => 
      prev.map((u) => u.id === userId ? { ...u, status: newStatus } : u)
    );
    setStatusUpdating(userId);

    const result = await updateUserStatusAction(userId, newStatus);

    if (!result.success) {
      alert(result.message);
      // Revert the optimistic update
      setUsers(previousUsers);
    }
    
    setStatusUpdating(null);
  };

  if (loading)
    return (
      <div className="p-20 text-center flex flex-col items-center gap-2">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-gray-500 font-medium">Loading Users...</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
      <div className="bg-white rounded-lg shadow border text-black overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-50">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action (Ban/Unban)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {user.role.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status ? "default" : "destructive"}>
                      {user.status ? "Active" : "Banned"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={user.status}
                      onCheckedChange={() => handleStatusChange(user.id, user.status)}
                      disabled={statusUpdating === user.id}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-gray-500">
                  No users found or server error.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}