export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'customer';
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  is_default: boolean;
  receiver_name: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  category_id: string; // References Category.id
  category_name: string;
  price?: number;
  discount_price?: number;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock';
  stock_quantity?: number;
  rating: number;
  reviews_count: number;
  flipkart_link?: string;
  is_featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  user_email: string;
  created_at: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: Address;
  payment_method: 'cod' | 'online';
  payment_status: 'pending' | 'paid' | 'failed';
  subtotal: number;
  delivery_charge: number;
  discount: number;
  total: number;
  coupon_code?: string;
  items: OrderItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category?: string;
  description?: string;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar_url?: string;
  is_verified: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'unread' | 'read' | 'replied';
}

export interface Coupon {
  code: string;
  discount_type: 'percentage' | 'fixed';
  value: number;
  min_order_value?: number;
}
