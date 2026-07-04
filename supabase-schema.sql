-- ====================================================================
-- SUPABASE SCHEMA FOR WOODLAND CRAFTS HANDCRAFTED WOODEN TOYS
-- ====================================================================
-- Copy and paste this script directly into your Supabase SQL Editor.
-- This will set up all required tables, relationships, and basic columns.

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    discount_price NUMERIC(10, 2),
    images TEXT[] NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    specifications JSONB DEFAULT '{}'::JSONB NOT NULL,
    stock_status VARCHAR(50) DEFAULT 'in_stock'::CHARACTER VARYING NOT NULL,
    stock_quantity INTEGER DEFAULT 10 NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.00 NOT NULL,
    reviews_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    rating INTEGER DEFAULT 5 NOT NULL,
    comment TEXT NOT NULL,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    category VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_avatar TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id UUID NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- pending, processing, shipped, delivered, cancelled
    shipping_address JSONB NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'cod' NOT NULL, -- cod, online
    payment_status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- pending, paid, failed
    subtotal NUMERIC(10, 2) NOT NULL,
    delivery_charge NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    coupon_code VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID,
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. WISHLIST TABLE
CREATE TABLE IF NOT EXISTS public.wishlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, product_id)
);

-- 9. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread' NOT NULL, -- unread, read, replied
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- RLS (ROW LEVEL SECURITY) POLICIES
-- ====================================================================

-- Enable Row Level Security on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Categories policies: Read-Only for everyone, write for admin (authenticated)
CREATE POLICY "Allow public read on categories" ON public.categories FOR SELECT TO public USING (true);
CREATE POLICY "Allow admin write on categories" ON public.categories FOR ALL TO authenticated USING (auth.jwt() ->> 'email' LIKE '%admin%');

-- 2. Products policies: Read-Only for everyone, write for admin
CREATE POLICY "Allow public read on products" ON public.products FOR SELECT TO public USING (true);
CREATE POLICY "Allow admin write on products" ON public.products FOR ALL TO authenticated USING (auth.jwt() ->> 'email' LIKE '%admin%');

-- 3. Testimonials policies: Read-Only for everyone, write for admin
CREATE POLICY "Allow public read on testimonials" ON public.testimonials FOR SELECT TO public USING (true);
CREATE POLICY "Allow admin write on testimonials" ON public.testimonials FOR ALL TO authenticated USING (auth.jwt() ->> 'email' LIKE '%admin%');

-- 4. Gallery policies: Read-Only for everyone, write for admin
CREATE POLICY "Allow public read on gallery" ON public.gallery FOR SELECT TO public USING (true);
CREATE POLICY "Allow admin write on gallery" ON public.gallery FOR ALL TO authenticated USING (auth.jwt() ->> 'email' LIKE '%admin%');

-- 5. Reviews policies: Read for everyone, write for authenticated users
CREATE POLICY "Allow public read on reviews" ON public.reviews FOR SELECT TO public USING (true);
CREATE POLICY "Allow auth insert reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 6. Orders policies: Read and write for own orders, all for admin
CREATE POLICY "Allow users select own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow users insert own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow admin full control on orders" ON public.orders FOR ALL TO authenticated USING (auth.jwt() ->> 'email' LIKE '%admin%');

-- 7. Order items policies: Same as orders
CREATE POLICY "Allow users select own order items" ON public.order_items FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Allow users insert own order items" ON public.order_items FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- 8. Wishlist policies: All access for own wishlist
CREATE POLICY "Allow users select own wishlist" ON public.wishlist FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow users modify own wishlist" ON public.wishlist FOR ALL TO authenticated USING (auth.uid() = user_id);

-- 9. Contact messages policies: Public insert, Admin read/write
CREATE POLICY "Allow public insert on contact messages" ON public.contact_messages FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow admin all on contact messages" ON public.contact_messages FOR ALL TO authenticated USING (auth.jwt() ->> 'email' LIKE '%admin%');
