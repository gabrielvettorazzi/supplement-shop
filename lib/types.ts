export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  bestSeller: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
}

export type OrderStatus = "Pending" | "Shipped" | "Delivered";

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  products: Product[];
  shippingInfo: ShippingInfo;
}
