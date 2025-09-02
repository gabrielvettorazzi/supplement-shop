"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { items, addToCart } = useCartStore();

  const isInCart = (productId: string) => {
    return items.some((item) => item.productId === productId);
  };

  const handleAddToCart = (product: Product) => {
    if (isInCart(product.id)) {
      toast.info(`${product.name} is already in your cart`);
      return;
    }
    addToCart(product.id);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        const inCart = isInCart(product.id);
        
        return (
          <Card
            key={product.id}
            className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-0 shadow-sm"
          >
            <Link href={`/products/${product.id}`} className="block">
              <CardHeader className="p-0 relative">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  {product.bestSeller && (
                    <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600 text-xs">
                      Best Seller
                    </Badge>
                  )}
                  {inCart && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </CardHeader>
            </Link>
            
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`} className="block">
                <CardTitle className="text-base font-semibold truncate mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {product.description}
                </CardDescription>
              </Link>
              
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
                <p className="text-lg font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => handleAddToCart(product)}
                className={`w-full transition-all duration-200 ${
                  inCart 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'hover:bg-primary/90'
                }`}
                disabled={inCart}
              >
                {inCart ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    In Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
