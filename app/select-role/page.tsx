"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleSelectionPage() {
  const router = useRouter();
  const { role, setRole } = useAppStore();

  // Redirect if user is already logged in
  useEffect(() => {
    if (role === "customer") {
      router.push("/");
    } else if (role === "admin") {
      router.push("/orders");
    }
  }, [role, router]);

  const handleCustomerClick = () => {
    setRole("customer");
    router.push("/");
  };

  const handleAdminClick = () => {
    setRole("admin");
    router.push("/orders");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl lg:text-6xl">
          Welcome to Topflight Supplement Store
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300 sm:mt-6 sm:text-lg md:text-xl">
          Please select your role to continue
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:max-w-md md:max-w-2xl md:grid-cols-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Customer</CardTitle>
            <CardDescription>
              Browse and purchase your favorite supplements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleCustomerClick}>
              Enter Storefront
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Administrator</CardTitle>
            <CardDescription>
              Manage orders and view store analytics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              variant="outline"
              onClick={handleAdminClick}
            >
              Enter Provider Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
