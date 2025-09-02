"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { ArrowLeft, RotateCcw, Shield, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.bestSeller && (
            <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
              Best Seller
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-primary mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              4.8 (128 reviews)
            </span>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <Badge variant="secondary">{product.category}</Badge>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-sm">30-Day Returns</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Add to Cart */}
          <div className="space-y-4">
            <Button onClick={handleAddToCart} size="lg" className="w-full">
              Add to Cart
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Secure checkout with SSL encryption
            </p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 space-y-8">
        <Separator />

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Premium quality ingredients</p>
              <p>• Third-party tested for purity</p>
              <p>• Made in FDA-registered facilities</p>
              <p>• Suitable for daily use</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Free shipping on orders over $50</p>
              <p>• 2-3 business days delivery</p>
              <p>• 30-day money-back guarantee</p>
              <p>• Easy returns process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
