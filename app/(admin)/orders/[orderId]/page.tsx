"use client";

import { notFound } from "next/navigation";
import { useOrderStore } from "@/store/order-store";
import { OrderDetailsClient } from "./OrderDetailsClient";
import { useEffect, useState } from "react";

interface OrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orders } = useOrderStore();

  useEffect(() => {
    const getParams = async () => {
      const { orderId: id } = await params;
      setOrderId(id);
      
      // Find the order in the store
      const foundOrder = orders.find((o) => o.id === id);
      setOrder(foundOrder);
      setIsLoading(false);
    };

    getParams();
  }, [params, orders]);

  if (isLoading) {
    return (
      <div className="container py-8 mx-auto">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    notFound();
  }

  return <OrderDetailsClient order={order} />;
}
