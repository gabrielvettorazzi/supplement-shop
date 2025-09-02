"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { dummyProducts } from "@/lib/dummy-data";
import { useCartStore } from "@/store/cart-store";
import { ArrowLeft, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const router = useRouter();

  // Get product details for cart items
  const cartItems = items
    .map((item) => {
      const product = dummyProducts.find((p) => p.id === item.productId);
      return {
        ...item,
        product,
      };
    })
    .filter((item) => item.product);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0);
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleRemoveItem = (productId: string) => {
    const product = dummyProducts.find((p) => p.id === productId);
    removeFromCart(productId);
    toast.success(`${product?.name || "Item"} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted rounded-full p-6 mb-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button size="lg" onClick={() => router.push("/products")}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">Shopping Cart</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              className="text-destructive hover:text-destructive"
            >
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.productId} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
                      <Image
                        src={item.product!.image}
                        alt={item.product!.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold truncate">
                            {item.product!.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {item.product!.description}
                          </p>
                          <div className="flex items-center mt-2 space-x-2 flex-wrap">
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
                        <div className="flex items-center space-x-3 ml-4">
                          <div className="text-right">
                            <p className="text-base sm:text-lg font-bold">
                              ${item.product!.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveItem(item.productId)}
                            className="text-destructive hover:text-destructive h-8 w-8 sm:h-10 sm:w-10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleCheckout} size="lg" className="w-full">
                Proceed to Checkout
              </Button>

              <div className="text-sm text-muted-foreground text-center space-y-1">
                <p>Secure checkout with SSL encryption</p>
                <p>30-day money-back guarantee</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
