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