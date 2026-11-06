export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Tech' | 'Timepieces' | 'Apparel' | 'Audio' | 'Accessories';
  badge?: 'Royal Pick' | 'Bestseller' | 'New' | 'Limited Edition';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  isFeatured?: boolean;
  description: string;
  specs: { [key: string]: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type Category = 'All' | 'Tech' | 'Timepieces' | 'Apparel' | 'Audio' | 'Accessories';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

