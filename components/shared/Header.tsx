"use client";

import { CartSheet } from "@/components/storefront/CartSheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserMenu } from "@/components/shared/UserMenu";
import { useCartStore } from "@/store/cart-store";
import { MenuIcon, MountainIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.length;
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="bg-background/95 fixed top-0 z-50 w-full border-b flex justify-center shadow-sm backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Topflight</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/products"
            className="hover:text-foreground"
            prefetch={false}
          >
            Products
          </Link>
          <Link href="#" className="hover:text-foreground" prefetch={false}>
            About
          </Link>
          <Link href="#" className="hover:text-foreground" prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {/* User Menu */}
          <UserMenu />
          
          {/* Cart - Sheet for md+ screens, direct link for mobile */}
          <div className="hidden md:block">
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-96 p-0">
                <SheetTitle className="hidden">Cart</SheetTitle>
                <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile cart link */}
          <Link href="/cart" className="relative md:hidden" prefetch={false}>
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  prefetch={false}
                >
                  <MountainIcon className="h-6 w-6" />
                  <span>Topflight</span>
                </Link>
                <nav className="grid gap-2">
                  <Link
                    href="/products"
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    Products
                  </Link>
                  <Link
                    href="/cart"
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    Cart ({itemCount})
                  </Link>
                  <Link
                    href="#"
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    Contact
                  </Link>
                </nav>
                <div className="pt-4 border-t">
                  <UserMenu />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
