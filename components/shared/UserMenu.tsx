"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store/app-store";
import { useCartStore } from "@/store/cart-store";
import { LogOut, Shield, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserMenu() {
  const { role, logout, setRole } = useAppStore();
  const { clearCart } = useCartStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    clearCart();
    toast.success("Logged out successfully");
    router.push("/select-role");
  };

  const handleRoleSwitch = (newRole: "customer" | "admin") => {
    setRole(newRole);

    if (newRole === "customer") {
      router.push("/");
      toast.success("Switched to Customer mode");
    } else {
      router.push("/orders");
      toast.success("Switched to Admin mode");
    }
  };

  if (!role) {
    return null;
  }

  const getRoleIcon = () => {
    return role === "admin" ? (
      <Shield className="h-4 w-4" />
    ) : (
      <ShoppingCart className="h-4 w-4" />
    );
  };

  const getRoleLabel = () => {
    return role === "admin" ? "Administrator" : "Customer";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {getRoleIcon()}
          <span className="hidden sm:inline">{getRoleLabel()}</span>
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            {getRoleIcon()}
            <span>Current Role: {getRoleLabel()}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {role === "customer" && (
          <DropdownMenuItem onClick={() => handleRoleSwitch("admin")}>
            <Shield className="h-4 w-4 mr-2" />
            Switch to Admin
          </DropdownMenuItem>
        )}

        {role === "admin" && (
          <DropdownMenuItem onClick={() => handleRoleSwitch("customer")}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Switch to Customer
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
