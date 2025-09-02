"use client";

import { useCartStore } from "@/store/cart-store";
import { dummyProducts } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeFromCart, clearCart } = useCartStore();
  const router = useRouter();

  // Get product details for cart items
  const cartItems = items.map((item) => {
    const product = dummyProducts.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
    };
  }).filter((item) => item.product);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0);
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleRemoveItem = (productId: string) => {
    const product = dummyProducts.find((p) => p.id === productId);
    removeFromCart(productId);
    toast.success(`${product?.name || 'Item'} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
    onOpenChange(false);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    onOpenChange(false);
    router.push("/checkout");
  };

  const handleViewCart = () => {
    onOpenChange(false);
    router.push("/cart");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0 border-b">
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Shopping Cart ({cartItems.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center flex-1">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some products to get started.
            </p>
            <Button onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.product!.image}
                      alt={item.product!.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">
                      {item.product!.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.product!.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.product!.category}
                      </Badge>
                      {item.product!.bestSeller && (
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">
                          Best Seller
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-destructive hover:text-destructive h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 border-t p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={handleViewCart}
                  className="w-full"
                >
                  View Full Cart
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClearCart}
                  className="w-full text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
