export interface PackagingSize {
  size: '100g' | '250g' | '500g' | '1kg';
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'food' | 'crafts';
  basePrice: number;
  description: string;
  imageUrl: string;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  packagingSizes?: PackagingSize[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  imageUrl: string;
  excerpt: string;
}

export interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}