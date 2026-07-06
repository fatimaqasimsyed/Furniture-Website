export interface Product {
  id: number;
  sku: string; // Unique product ID (e.g., BS01, BT01)
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  description: string;
  material: string;
  dimensions: string;
  rating: number;
  reviewCount: number;
  badge?: 'New' | 'Bestseller' | 'Limited';
  images: string[];
  tags: string[];
  inStock: boolean;
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface WishlistItem {
  product: Product;
}

export type SortOption = 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
  category: string;
  materials: string[];
  sortBy: SortOption;
  search: string;
}

