import { dummyProducts } from "@/lib/dummy-data";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "./ProductDetailsClient";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const product = dummyProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
