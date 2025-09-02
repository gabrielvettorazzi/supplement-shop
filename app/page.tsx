"use client";

import { FaqAccordion } from "@/components/storefront/FaqAccordion";
import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { role } = useAppStore();

  // Redirect to role selection if no role is set
  useEffect(() => {
    if (!role) {
      router.push("/select-role");
    } else if (role === "admin") {
      router.push("/orders");
    }
  }, [role, router]);

  // Don't render anything if redirecting
  if (!role || role === "admin") {
    return null;
  }

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className="">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Elevate Your Performance
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover our premium range of supplements, designed to help you
              achieve your fitness goals.
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/products")}
              className="mt-4"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Best Sellers
          </h2>
          <ProductCarousel />
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/products")}
            >
              See All Products
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="">
          <FaqAccordion />
        </div>
      </section>
    </main>
  );
}
