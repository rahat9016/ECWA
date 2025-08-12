export interface ProductType {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;  // Optional
  rating: number;
  reviews: number;
  image: string;
  inStock?: boolean;
  featured?: boolean;      // Optional
  brand?: string;
  badge?:string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
