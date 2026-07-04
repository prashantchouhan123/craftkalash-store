# Woodland Crafts - Premium Handcrafted Wooden Toys E-Commerce

Welcome to **Woodland Crafts**, a premium, production-ready, responsive, and modern e-commerce platform dedicated to marketing and selling handcrafted children's toys. Made from certified sustainable hardwood (Maple, Cherry, Beech) and colored using non-toxic salivary-safe milk dyes, our toys promote open-ended play, Waldorf coordination, and Montessori milestone growth.

The front-end design is heavily inspired by **Flipkart's clean, structured, and friction-free user shopping layout**, mixed with a warm, editorial wooden-inspired visual style utilizing natural tones (Brown, Beige, Cream, White, Forest Green).

---

## 🚀 Key Features

*   **Tactile Catalog Browser**: Fully responsive, clean bento-grid listings with categories, ratings, wishlist bookmarks, search filters, price-sliding, and sorting options.
*   **Interactive Cart Ledger**: Adjust quantities, monitor free shipping thresholds ($50), and test verified coupon codes (`WOODEN10`, `WELCOME15`, `FREESHIP`).
*   **Aesthetic Single-Item Detail Carousel**: Multi-image thumbnail carousels, bullet characteristics lists, safety specifications grid tables, and verified parent review systems.
*   **Unified Account Profile**: Complete user shipping address manager supporting home, work, or custom locations with a "Set Default" address flag.
*   **Secure Checkout Pipeline**: Cash on Delivery (COD) selected by default, accompanied by clear online credit authorization (Razorpay) mocks.
*   **Workshop Control Panel (Admin Dashboard)**: Totalizing stat cards, product registers (add, update, delete wooden items), collection tags creator, order tracker (flipping states: `processing`, `shipped`, `delivered`, `cancelled`), and feedback archivers.

---

## 🛠️ Tech Stack & Architecture

*   **Core Framework**: React 19 (TypeScript) + Vite
*   **Styling Engine**: Tailwind CSS 4.0
*   **Routing Engine**: React Router DOM (v6)
*   **Animations**: Framer Motion (Framer's modern `motion/react`)
*   **Icons**: Lucide React
*   **Persistent Facade (Database + Storage + Auth)**: Built-in facade layer connecting to **Supabase** with a seamless local storage backup mode so that you can view the complete application without configuring API keys!

---

## 📁 Project Folder Structure

```text
/
├── .env.example            # Sample Environment Configurations
├── .gitignore              # Files excluded from Version Control
├── index.html              # HTML Shell Template
├── metadata.json           # Application Permissions and Metadata
├── package.json            # Project Dependencies & Scripts
├── supabase-schema.sql     # Production-ready SQL Schema for Supabase
├── tsconfig.json           # TypeScript Configurations
├── vite.config.ts          # Vite configuration bundling Tailwind 4
└── src/
    ├── App.tsx             # Routing & Main Navigation Layout Shell
    ├── index.css           # Global typography definitions & wooden color theme
    ├── main.tsx            # React Root Bootstrapper
    ├── types.ts            # Core TypeScript Interfaces (Products, Orders, Users)
    ├── components/         # Reusable UI Custom Components
    │   ├── Accordion.tsx   # Smooth animated FAQ blocks
    │   ├── Footer.tsx      # Comprehensive brand guarantees, sitemap & contact info
    │   ├── Navbar.tsx      # Multi-row navigation, search input, status indicators
    │   └── ProductCard.tsx # Clean item listings with quick-wishlist heart toggles
    ├── context/
    │   └── ShopContext.tsx # Unified React State Engine (Auth, Cart, Coupons, Wishlist)
    ├── pages/              # Primary View Routers
    │   ├── About.tsx       # Legacy values, sustainable criteria & artisans bios
    │   ├── Admin.tsx       # Complete admin portal with product, category & order registers
    │   ├── Cart.tsx        # Item listings with shipping indicators & coupon fields
    │   ├── Categories.tsx # Collection milestone showcase
    │   ├── Checkout.tsx    # Secure multi-step address picker & payment hub
    │   ├── Contact.tsx     # Support telephone coordinates, WhatsApp triggers & query forms
    │   ├── FAQ.tsx         # Tabbed parent knowledge base
    │   ├── Gallery.tsx     # Artisanal journal masonry with lightboxes
    │   ├── Home.tsx        # Premium hero layout with trust badges & video cards
    │   ├── Login.tsx       # Secure customer login form
    │   ├── MyOrders.tsx    # Order tracking historical logs
    │   ├── OrderSuccess.tsx# Celebration receipt and order metadata
    │   ├── Profile.tsx     # Profile settings and Saved Addresses Manager
    │   ├── Shop.tsx        # Responsive filtering grid panel (Flipkart inspired)
    │   └── Signup.tsx      # Customer signup credentials form
    └── services/
        └── db.ts           # Unified database facades bridging Supabase & LocalStorage
```

---

## ⚡ Quick Start: Local Setup

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Install Dependencies
Run the package manager from the project root:
```bash
npm install
```

### 3. Run Development Server
Boot the local server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## ☁️ Supabase Setup & Production Integration

This e-commerce application is configured to run out-of-the-box using local storage mock databases. To migrate to production-ready Cloud database and live user logins, complete the following:

### 1. Execute SQL Schema
*   Open your **Supabase Dashboard** (https://supabase.com).
*   Create a new project.
*   Go to **SQL Editor** on the left panel, paste the entire contents of `/supabase-schema.sql` located in this project's root, and hit **Run**.
*   This instantly creates all tables (`users`, `products`, `categories`, `orders`, `order_items`, `reviews`, `gallery`, `testimonials`, `contact_messages`), triggers, and Row Level Security (RLS) policies.

### 2. Setup Storage Buckets
Create two public storage buckets inside Supabase Storage:
1.  **`product-images`**: Set access control to **Public**. Used for uploading wooden toy listings.
2.  **`gallery-images`**: Set access control to **Public**. Used for your workshop journal photos.

### 3. Configure Env Variables
Create a `.env` file in the project root:
```env
# Supabase credentials
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"

# Payments integration
VITE_RAZORPAY_KEY_ID="rzp_test_your_key_id"
```

---

## 📦 How to Replace Placeholder Images

All mock image links are sourced from premium, high-resolution, open-license Unsplash photography. To swap them with your own physical wooden toy photos:

1.  **Product Images**: Go to the **Admin Dashboard** (`/admin`), edit any product listing, and replace the Cover Image link with your own CDN URL or upload to Supabase Storage and paste the generated public link.
2.  **Gallery Images**: Go to `/admin` -> `Gallery` tab, add or delete snapshots, pasting your new JPEG/PNG image links.
3.  **Static Illustrations**: Edit `/src/pages/About.tsx` or `/src/pages/Home.tsx` to directly exchange the custom image links declared inside the static layouts.

---

## 🚀 Deployment (Vercel Ready)

This workspace is completely optimized and ready for zero-config deployments to **Vercel**:

1.  Push your code to your GitHub Repository.
2.  Import the repository into **Vercel Dashboard**.
3.  Add your production environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) inside the Project Settings.
4.  Hit **Deploy**! Vercel will automatically compile the Vite assets and host your premium wooden toy brand worldwide.
