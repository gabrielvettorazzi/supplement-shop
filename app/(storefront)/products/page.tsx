"use client";

import { ProductGrid } from "@/components/storefront/ProductGrid";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { dummyProducts } from "@/lib/dummy-data";
import { FilterIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function AllProductsPage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [bestSellersOnly, setBestSellersOnly] = useState(false);
  const [sort, setSort] = useState("price-asc");

  const filteredProducts = useMemo(() => {
    let products = dummyProducts;

    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categories.length > 0) {
      products = products.filter((p) => categories.includes(p.category));
    }

    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (bestSellersOnly) {
      products = products.filter((p) => p.bestSeller);
    }

    products.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "alpha-asc":
          return a.name.localeCompare(b.name);
        case "alpha-desc":
          return b.name.localeCompare(a.name);
        case "best-sellers":
          return a.bestSeller === b.bestSeller ? 0 : a.bestSeller ? -1 : 1;
        default:
          return 0;
      }
    });

    return products;
  }, [search, categories, priceRange, bestSellersOnly, sort]);

  const allCategories = useMemo(
    () => [...new Set(dummyProducts.map((p) => p.category))],
    []
  );

  const handleCategoryChange = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setCategories([]);
    setPriceRange([0, 100]);
    setBestSellersOnly(false);
  };

  const FilterSidebar = () => (
    <div className="space-y-6 px-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Search</h3>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <Slider
          min={0}
          max={100}
          step={1}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Separator />
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="best-sellers"
            checked={bestSellersOnly}
            onCheckedChange={(checked) => setBestSellersOnly(!!checked)}
          />
          <label
            htmlFor="best-sellers"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Only show best sellers
          </label>
        </div>
      </div>
      <Separator />
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="container py-8 mx-auto">
      <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
        <aside className="hidden md:block sticky top-24">
          <FilterSidebar />
        </aside>
        <main>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">All Products</h1>
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <FilterIcon className="h-5 w-5" />
                    <span className="sr-only">Open filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-3/4 sm:w-1/2">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="alpha-asc">Alphabetical: A-Z</SelectItem>
                  <SelectItem value="alpha-desc">Alphabetical: Z-A</SelectItem>
                  <SelectItem value="best-sellers">
                    Best Sellers First
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
}
