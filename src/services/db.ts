import { createClient } from '@supabase/supabase-js';
import { 
  User, Address, Category, Product, CartItem, Order, 
  GalleryItem, Testimonial, ContactMessage, Review, Coupon 
} from '../types';

// Detect and initialize Supabase
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseUrl !== 'MY_SUPABASE_URL' && supabaseAnonKey && supabaseAnonKey !== 'MY_SUPABASE_ANON_KEY');

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!) 
  : null;

// ==========================================
// SEED DATA FOR LOCAL / MOCK FALLBACK
// ==========================================

const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Stacking & Sorting',
    slug: 'stacking-sorting',
    description: 'Montessori-inspired wooden toys designed to develop fine motor skills, coordination, and geometric understanding.',
    image_url: '/assets/images/smart_puzzle_banner_1782961608852.jpg'
  },
  {
    id: 'cat-2',
    name: 'Puzzles & Blocks',
    slug: 'puzzles-blocks',
    description: 'High-quality building blocks and wooden puzzles crafted from diverse wood grains to spark structural creativity.',
    image_url: '/assets/images/three_puzzles_banner_1782961574854.jpg'
  },
  {
    id: 'cat-3',
    name: 'Vehicles & Pull Toys',
    slug: 'vehicles-pull-toys',
    description: 'Smooth-rolling wooden cars, tanks, and trucks with safe non-toxic finishes.',
    image_url: '/assets/images/wooden_dump_truck_banner_1782961161981.jpg'
  },
  {
    id: 'cat-4',
    name: 'Imaginative Play',
    slug: 'imaginative-play',
    description: 'Play kitchens, custom wooden tools, and organic play sets to nurture storytelling and open-ended play.',
    image_url: '/assets/images/mini_kitchen_set_banner_1782961520615.jpg'
  },
  {
    id: 'cat-5',
    name: 'Baby & Toddler',
    slug: 'baby-toddler',
    description: 'Traditional wooden baby walkers, baby chowkis, and infant motor skill developmental aids.',
    image_url: '/assets/images/baby_walker_banner_1_1782961533434.jpg'
  },
  {
    id: 'cat-8',
    name: 'Baby Walkers',
    slug: 'baby-walkers',
    description: 'Traditional and handcrafted wooden push walkers for your baby\'s first steps.',
    image_url: '/assets/images/traditional_baby_walker_multicolor_1782993367940.jpg'
  },
  {
    id: 'cat-6',
    name: 'Wellness & Accessories',
    slug: 'wellness-accessories',
    description: 'Handcrafted wellness tools and natural seed wood drinking vessels for clean daily routines.',
    image_url: '/assets/images/seed_wood_glass_banner_1782961555398.jpg'
  },
  {
    id: 'cat-7',
    name: 'Traditional Home Decor',
    slug: 'traditional-decor',
    description: 'Artisanal hand-painted doll couples, miniature charpais, and hand-woven home accents.',
    image_url: '/assets/images/wooden_couple_banner_1782961619283.jpg'
  }
];

const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-3',
    name: 'CraftKalash Handcrafted Wooden Baby Walker',
    category_id: 'cat-8',
    category_name: 'Baby Walkers',
    price: 89.99,
    discount_price: 79.99,
    images: [
      '/assets/images/baby_walker_user_image_1782991246771.jpg'
    ],
    description: 'A gorgeous, premium handcrafted wooden baby walker designed with exceptional stability and a sturdy base to guide your baby\'s first steps with safety and confidence. Embellished with beautiful, gentle-ringing rattle bells to delight and encourage their physical growth and balancing milestones.',
    features: [
      'Sturdy heavy-duty solid timber rungs and sidebar',
      'Rattle bells ring gently to prompt infant steps',
      'Traction-wrapped silent wooden wheels protect floors',
      '100% natural, lead-free vegetable lacquer finishes'
    ],
    specifications: {
      'Material': 'Premium Ivory Wood and Haldu Wood',
      'Dimensions': '18" H x 14" W x 16" D',
      'Weight': '5.5 lbs',
      'Age Recommendation': '9 months - 2 years',
      'Origin': 'Channapatna, India'
    },
    stock_status: 'in_stock',
    stock_quantity: 10,
    rating: 4.9,
    reviews_count: 14,
    flipkart_link: 'https://dl.flipkart.com/dl/product/p/itme?pid=VPAHZM2MHY4KFEGT&lid=LSTVPAHZM2MHY4KFEGT1RXFC3&_refId=&_appId=CL'
  },
  {
    id: 'prod-1',
    name: 'Classic Handcrafted Wooden Dump Truck',
    category_id: 'cat-3',
    category_name: 'Vehicles & Pull Toys',
    price: 49.99,
    discount_price: 44.99,
    images: [
      '/assets/images/wooden_dump_truck_banner_1782961161981.jpg'
    ],
    description: 'A premium, handcrafted wooden dump truck featuring rich natural wood grains, a yellow cabin, adjustable dump bed, and dark brown wooden wheels. Smoothly sanded and child-safe for imaginative play.',
    features: [
      '100% natural, sustainably sourced eco-friendly wood',
      'Meticulously sanded corners with non-toxic child-safe finishes',
      'Fully functional adjustable tipping bed for active play',
      'Artisanal handcrafted quality made to last generations'
    ],
    specifications: {
      'Material': 'Sustainably Sourced Oak and Pine Wood',
      'Dimensions': '10" L x 5.5" H x 4.8" W',
      'Weight': '1.8 lbs',
      'Age Recommendation': '18+ months',
      'Origin': 'Artisan Handcrafted'
    },
    stock_status: 'in_stock',
    stock_quantity: 25,
    rating: 4.9,
    reviews_count: 24,
    flipkart_link: 'https://dl.flipkart.com/dl/product/p/itme?pid=VPAHZDD8YU2F263M&lid=LSTVPAHZDD8YU2F263MIPADNY&_refId=&_appId=WA'
  },
  {
    id: 'prod-2',
    name: 'Mini Kitchen Wooden Set',
    category_id: 'cat-4',
    category_name: 'Imaginative Play',
    price: 39.99,
    discount_price: 34.99,
    images: [
      '/assets/images/mini_kitchen_set_banner_1782961520615.jpg'
    ],
    description: 'An elegant, colorful pretend-play kitchen set featuring miniature wooden pots with yellow, orange, blue, and red paint, jars with lids, a rolling pin, a rolling cylinder, and a traditional mortar and pestle.',
    features: [
      'Encourages imaginative storytelling and cooperative roleplay',
      'Sustainably handcrafted with natural child-safe organic paint',
      'Improves fine motor skills and hand-eye coordination',
      'Includes 6 beautifully finished miniature kitchen tools'
    ],
    specifications: {
      'Material': 'Hand-turned Maple and Beech Wood',
      'Dimensions': 'Miniature scale (various sizes 2" to 6")',
      'Weight': '1.1 lbs',
      'Age Recommendation': '2+ years',
      'Origin': 'Artisan Handcrafted'
    },
    stock_status: 'in_stock',
    stock_quantity: 30,
    rating: 4.8,
    reviews_count: 15,
    flipkart_link: 'https://dl.flipkart.com/dl/product/p/itme?pid=RPTHZT6A4HKZTGDH&lid=LSTRPTHZT6A4HKZTGDHGGMQRA&_refId=&_appId=WA'
  },
  {
    id: 'prod-16',
    name: 'CraftKalash Miniature Farm Tractor Set',
    category_id: 'cat-3',
    category_name: 'Vehicles & Pull Toys',
    price: 39.99,
    discount_price: 34.99,
    images: [
      '/assets/images/miniature_farm_tractor_banner_jpg_1782965558478.jpg'
    ],
    description: 'A beautiful, traditional wooden farm tractor set featuring a detachable cargo trailer. Meticulously handcrafted from premium wood with vibrant red wheel accents, designed to promote role play fun and fine motor skills.',
    features: [
      '100% natural, non-toxic organic finish safe for kids',
      'Fully detachable cargo trailer with smooth-rolling wooden wheels',
      'Improves hand-eye coordination and spatial intelligence',
      'Crafted from high-quality premium wood built to last'
    ],
    specifications: {
      'Material': 'Premium Hardwood and Haldu Wood',
      'Dimensions': '11.2" L x 4.5" W x 4.2" H',
      'Weight': '1.3 lbs',
      'Age Recommendation': '2+ years',
      'Origin': 'Handcrafted in Channapatna, India'
    },
    stock_status: 'in_stock',
    stock_quantity: 15,
    rating: 4.9,
    reviews_count: 8,
    flipkart_link: 'https://dl.flipkart.com/dl/product/p/itme?pid=VPAHZBJDYDP2DEYH&lid=LSTVPAHZBJDYDP2DEYH9A5AXW&_refId=&_appId=WA'
  },
  {
    id: 'prod-6',
    name: 'Channapatna Traditional Wooden Baby Walker',
    category_id: 'cat-8',
    category_name: 'Baby Walkers',
    price: 89.99,
    discount_price: 79.99,
    images: [
      '/assets/images/baby_walker_banner_3_1782961661035.jpg'
    ],
    description: 'An authentic Channapatna handcrafted wooden baby walker designed with exceptional stability and a sturdy base to guide your baby\'s first steps with safety and confidence. Embellished with beautiful, gentle-ringing rattle bells to delight and encourage their physical growth and balancing milestones.',
    features: [
      'Sturdy heavy-duty solid timber rungs and sidebar',
      'Rattle bells ring gently to prompt infant steps',
      'Traction-wrapped silent wooden wheels protect floors',
      '100% natural, lead-free vegetable lacquer finishes'
    ],
    specifications: {
      'Material': 'Premium Ivory Wood and Haldu Wood',
      'Dimensions': '18" H x 14" W x 16" D',
      'Weight': '5.5 lbs',
      'Age Recommendation': '9 months - 2 years',
      'Origin': 'Channapatna, India'
    },
    stock_status: 'in_stock',
    stock_quantity: 12,
    rating: 5.0,
    reviews_count: 18,
    flipkart_link: 'https://dl.flipkart.com/dl/product/p/itme?pid=VPAHZMGVZBJPEMKV&lid=LSTVPAHZMGVZBJPEMKV53ZUFH&_refId=&_appId=CL'
  },
  {
    id: 'prod-7',
    name: 'CraftKalash Handcrafted Traditional Wooden Baby Walker',
    category_id: 'cat-8',
    category_name: 'Baby Walkers',
    price: 89.99,
    discount_price: 79.99,
    images: [
      '/assets/images/traditional_baby_walker_multicolor_1782993367940.jpg'
    ],
    description: 'An authentic CraftKalash traditional wooden baby walker designed with exceptional stability and child-safe materials to help your baby take their first steps with safety and confidence. Embellished with beautiful, gentle-ringing rattle bells to encourage physical development and motor skills.',
    features: [
      'Eco-Friendly: Made from natural wood & child-safe colors.',
      'Handcrafted Excellence: Skilled craftsmanship in every detail.',
      'Safe & Durable: Sturdy build for worry-free play.',
      'Encourages Movement & Development: Helps build balance, coordination & confidence.'
    ],
    specifications: {
      'Material': 'Premium Ivory Wood and Haldu Wood',
      'Dimensions': '18" H x 14" W x 16" D',
      'Weight': '5.5 lbs',
      'Age Recommendation': '9 months - 2 years',
      'Origin': 'Channapatna, India'
    },
    stock_status: 'in_stock',
    stock_quantity: 12,
    rating: 5.0,
    reviews_count: 18,
    flipkart_link: 'https://dl.flipkart.com/dl/product/p/itme?pid=VPAHZHNZ7HJGDYZD&lid=LSTVPAHZHNZ7HJGDYZDN36PT1&_refId=&_appId=WA'
  },
  {
    id: 'prod-8',
    name: 'Traditional Wooden Baby Walker | Handmade Push Walker',
    category_id: 'cat-8',
    category_name: 'Baby Walkers',
    price: 89.99,
    discount_price: 79.99,
    images: [
      '/assets/images/traditional_baby_walker_1782992339503.jpg'
    ],
    description: 'An authentic Channapatna handcrafted wooden baby walker (push walker) designed with exceptional stability and a sturdy base to guide your baby\'s first steps with safety and confidence. Embellished with beautiful, gentle-ringing rattle bells to delight and encourage their physical growth and balancing milestones.',
    features: [
      'Sturdy heavy-duty solid timber rungs and sidebar',
      'Rattle bells ring gently to prompt infant steps',
      'Traction-wrapped silent wooden wheels protect floors',
      '100% natural, lead-free vegetable lacquer finishes'
    ],
    specifications: {
      'Material': 'Premium Ivory Wood and Haldu Wood',
      'Dimensions': '18" H x 14" W x 16" D',
      'Weight': '5.5 lbs',
      'Age Recommendation': '9 months - 2 years',
      'Origin': 'Channapatna, India'
    },
    stock_status: 'in_stock',
    stock_quantity: 12,
    rating: 5.0,
    reviews_count: 18,
    flipkart_link: 'https://dl.flipkart.com/dl/product/p/itme?pid=VPAHZHZF2ZTCDNWU&lid=LSTVPAHZHZF2ZTCDNWUUTUVYD&_refId=&_appId=CL'
  },
  {
    id: 'prod-9',
    name: 'Learn Play Grow Smart Puzzle Board',
    category_id: 'cat-1',
    category_name: 'Stacking & Sorting',
    price: 29.99,
    discount_price: 24.99,
    images: [
      '/assets/images/smart_puzzle_banner_1782961608852.jpg'
    ],
    description: 'A beautifully crafted geometric sorting board complete with a red tangram triangle, a yellow circle, a blue heart, a green pentagon, and multi-colored interlocking blocks showing clear organic wood grains.',
    features: [
      'Boosts brain power, cognitive logic, and sorting speed',
      'Promotes shape recognition and basic motor dexterity',
      'Made of solid thick wood with rounded child-safe borders',
      '100% organic paint coating resisting paint-chipping'
    ],
    specifications: {
      'Material': 'Premium Beechwood and Linden Wood',
      'Dimensions': '11" L x 9" W x 1" H',
      'Weight': '1.3 lbs',
      'Age Recommendation': '18+ months',
      'Origin': 'Artisan Handcrafted'
    },
    stock_status: 'in_stock',
    stock_quantity: 26,
    rating: 4.9,
    reviews_count: 17
  },
  {
    id: 'prod-10',
    name: 'Traditional Handcrafted Wooden Couple Dolls',
    category_id: 'cat-7',
    category_name: 'Traditional Home Decor',
    price: 19.99,
    images: [
      '/assets/images/wooden_couple_banner_1782961619283.jpg'
    ],
    description: 'A magnificent pair of traditional Indian handcrafted couple dolls, hand-painted with bright organic red, yellow, and green colors. Perfect as cultural home decor accents or heirloom gifts.',
    features: [
      'Exquisite, detailed hand-carved traditional outfits',
      'Painted with organic vegetable-derived non-toxic lacquer pigments',
      'Adds a warm, charming heritage feel to modern interiors',
      'Timeless Indian craft showcasing artisan expertise'
    ],
    specifications: {
      'Material': 'Wrightia Tinctoria (Aale Mara) Wood',
      'Dimensions': '7" Height x 2.5" Base',
      'Weight': '8 oz',
      'Origin': 'Handcrafted in Channapatna, India'
    },
    stock_status: 'in_stock',
    stock_quantity: 15,
    rating: 5.0,
    reviews_count: 12
  },
  {
    id: 'prod-11',
    name: 'Handcrafted Mini Charpai Bed',
    category_id: 'cat-7',
    category_name: 'Traditional Home Decor',
    price: 15.99,
    images: [
      '/assets/images/mini_charpai_banner_1782961629697.jpg'
    ],
    description: 'A miniature handcrafted wooden cot (charpai) with beautifully turned dark wood legs and high-contrast, sturdy pink and yellow hand-woven ropes. Commonly used as a peaceful rest bed for Ladoo Gopal (deity) idols.',
    features: [
      'Strong, tight premium quality hand-weaving',
      'Sturdy hand-turned dark polished wooden support legs',
      'Divine rest setup bringing a touch of cultural serenity',
      'Perfect size for home temples and cultural decorations'
    ],
    specifications: {
      'Material': 'Solid Teak Wood and Nylon/Cotton Threads',
      'Dimensions': '6.5" L x 4.5" W x 3" H',
      'Weight': '6 oz',
      'Origin': 'Traditional Devotional Crafts'
    },
    stock_status: 'in_stock',
    stock_quantity: 35,
    rating: 4.9,
    reviews_count: 28
  },
  {
    id: 'prod-12',
    name: 'CraftKalash Handcrafted Wooden Baby Chowki',
    category_id: 'cat-7',
    category_name: 'Traditional Home Decor',
    price: 32.99,
    discount_price: 27.99,
    images: [
      '/assets/images/baby_chowki_banner_1782961640075.jpg'
    ],
    description: 'A small traditional Indian low stool (baby chowki) handcrafted with solid dark-polished wooden legs and a vibrant pink and green tightly woven comfortable seat. Multi-functional for seating or display.',
    features: [
      'Durable structure supporting children seating safely',
      '100% skin-safe, soft organic cotton woven threads',
      'Adds traditional color and comfort to children nurseries',
      'Finely sanded legs with eco-friendly wax coat'
    ],
    specifications: {
      'Material': 'Sheesham Wood and Organic Cotton Rope',
      'Dimensions': '10" L x 10" W x 6" H',
      'Weight': '2.2 lbs',
      'Age Recommendation': '12+ months',
      'Origin': 'Artisan Handcrafted'
    },
    stock_status: 'in_stock',
    stock_quantity: 20,
    rating: 4.8,
    reviews_count: 10
  },
  {
    id: 'prod-13',
    name: 'Handcrafted Wooden Army Tank Toy',
    category_id: 'cat-3',
    category_name: 'Vehicles & Pull Toys',
    price: 42.99,
    images: [
      '/assets/images/wooden_tank_banner_1782961651387.jpg'
    ],
    description: 'A spectacular handcrafted wooden toy tank featuring a long adjustable gun barrel, smooth rolling wooden wheels, and high-contrast natural pine wood grain patterns. Completely static-free and non-electric.',
    features: [
      '100% pine wood block construction with raw textures',
      'Completely sanded down for absolute child safety',
      'Encourages strategic thinking and historic creative play',
      'No metal screws, chemical paints, or plastic parts used'
    ],
    specifications: {
      'Material': 'Solid Pine Wood',
      'Dimensions': '8.5" L x 4.5" W x 4" H',
      'Weight': '1.2 lbs',
      'Age Recommendation': '2+ years',
      'Origin': 'Artisan Handcrafted'
    },
    stock_status: 'in_stock',
    stock_quantity: 14,
    rating: 4.8,
    reviews_count: 6
  },
  {
    id: 'prod-5',
    name: "NATURE'S GIFT Seed Wood Glass",
    category_id: 'cat-6',
    category_name: 'Wellness & Accessories',
    price: 24.99,
    discount_price: 19.99,
    images: [
      '/assets/images/seed_wood_glass_banner_1782961555398.jpg'
    ],
    description: 'A beautifully polished wellness tumbler crafted from authentic seed wood, showcasing its rich natural grain. Traditionally known to improve metabolism and boost immunity when drinking water is stored overnight.',
    features: [
      '100% natural seed wood blocks containing herbal properties',
      'Authentic natural grain textures with zero artificial lacquers',
      'Sustainably sourced and harvested organic raw material',
      'Enhances daily hydration and wellness routines naturally'
    ],
    specifications: {
      'Material': 'Traditional Vijayasar (Indian Kino) Seed Wood',
      'Dimensions': '6" Height x 3" Diameter',
      'Weight': '10 oz',
      'Capacity': '250 ml',
      'Origin': 'Handcrafted Wellness Product'
    },
    stock_status: 'in_stock',
    stock_quantity: 40,
    rating: 4.8,
    reviews_count: 32
  }
];

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Emily Sanderson',
    role: 'Parent & Waldorf Educator',
    rating: 5,
    comment: 'The craftsmanship of these wooden toys is simply unmatched. The texture of the Waldorf Rainbow and the smell of the natural wood is a sensory delight for my children. Worth every single penny.',
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'test-2',
    name: 'David K. Vance',
    role: 'Grandparent',
    rating: 5,
    comment: 'I bought the Heritage Toy Train set for my grandson. It reminds me of the pure, simple toys I had as a child. He plays with it daily, and the magnets hold perfectly. Truly heirloom quality.',
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'test-3',
    name: 'Dr. Sarah Patel',
    role: 'Pediatric Occupational Therapist',
    rating: 5,
    comment: 'I highly recommend Woodland Crafts shapes and stackers. Plastic flashing light toys overstimulate, whereas these natural toys invite tactile exploration, focus, and deliberate motor control.',
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
  }
];

const SEED_GALLERY: GalleryItem[] = [
  {
    id: 'gal-amazon-banner-1',
    title: 'Amazon A+ Listing: Classic Handcrafted Wooden Dump Truck',
    image_url: '/assets/images/wooden_dump_truck_banner_1782961161981.jpg',
    category: 'Amazon Banners',
    description: 'A premium, professional 1:1 Amazon listing infographic banner for our Handcrafted Wooden Dump Truck. Places the actual toy prominently with elegant typography and child-safety benefit badges.'
  },
  {
    id: 'gal-amazon-banner-2',
    title: 'Amazon A+ Listing: Mini Kitchen Wooden Set',
    image_url: '/assets/images/mini_kitchen_set_banner_1782961520615.jpg',
    category: 'Amazon Banners',
    description: 'Miniature colorful wooden kitchen pots, pans, rolling pin, and mortar pestle arranged beautifully with high-end typography highlighting creativity and fine motor skill development.'
  },
  {
    id: 'gal-amazon-banner-5',
    title: 'Amazon A+ Listing: NATURE\'S GIFT Seed Wood Glass',
    image_url: '/assets/images/seed_wood_glass_banner_1782961555398.jpg',
    category: 'Amazon Banners',
    description: 'Organic polished seed wood wellness tumbler showcasing its authentic natural grain. Promotes natural metabolism, metabolism boosting, and immunity with a serene forest backdrop.'
  },
  {
    id: 'gal-amazon-banner-6',
    title: 'Amazon A+ Listing: Channapatna Traditional Wooden Baby Walker',
    image_url: '/assets/images/baby_walker_banner_3_1782961661035.jpg',
    category: 'Amazon Banners',
    description: 'Traditional handcrafted wooden baby walker with gentle-ringing rattle bells, designed to help babies take their first steps with safety and confidence.'
  },
  {
    id: 'gal-amazon-banner-7',
    title: 'Amazon A+ Listing: CraftKalash Handcrafted Traditional Wooden Baby Walker',
    image_url: '/assets/images/traditional_baby_walker_multicolor_1782993367940.jpg',
    category: 'Amazon Banners',
    description: 'Beautiful traditional handcrafted Channapatna wooden baby walker featuring colorful vegetable-dye lacquer finishing and soft-sounding brass rattles.'
  },
  {
    id: 'gal-amazon-banner-8',
    title: 'Amazon A+ Listing: Traditional Wooden Baby Walker',
    image_url: '/assets/images/traditional_baby_walker_1782992339503.jpg',
    category: 'Amazon Banners',
    description: 'Beautiful traditional handcrafted Channapatna wooden baby walker featuring colorful lacquer finishing and soft-sounding brass rattles.'
  },
  {
    id: 'gal-amazon-banner-9',
    title: 'Amazon A+ Listing: Learn Play Grow Smart Puzzle Board',
    image_url: '/assets/images/smart_puzzle_banner_1782961608852.jpg',
    category: 'Amazon Banners',
    description: 'Premium wood geometric tangram sorting puzzle showcasing vivid child-safe primary colors and solid wood build. Details fine motor skill and problem solving benefits.'
  },
  {
    id: 'gal-amazon-banner-10',
    title: 'Amazon A+ Listing: Traditional Handcrafted Wooden Couple Dolls',
    image_url: '/assets/images/wooden_couple_banner_1782961619283.jpg',
    category: 'Amazon Banners',
    description: 'Artisanal Indian hand-painted wooden dolls in rich red, yellow, and green tones, styled beautifully on a modern minimal display pedestal.'
  },
  {
    id: 'gal-amazon-banner-11',
    title: 'Amazon A+ Listing: Handcrafted Mini Charpai Bed',
    image_url: '/assets/images/mini_charpai_banner_1782961629697.jpg',
    category: 'Amazon Banners',
    description: 'Miniature wooden woven bed with vibrant pink and yellow threads holding a brass Ladoo Gopal deity, creating a divine, peaceful, and warm rest setup.'
  },
  {
    id: 'gal-amazon-banner-12',
    title: 'Amazon A+ Listing: CraftKalash Handcrafted Wooden Baby Chowki',
    image_url: '/assets/images/baby_chowki_banner_1782961640075.jpg',
    category: 'Amazon Banners',
    description: 'Small woven low-lying wooden stool for children featuring eco-friendly cotton threads and solid wood legs, styled in a warm family living room.'
  },
  {
    id: 'gal-amazon-banner-13',
    title: 'Amazon A+ Listing: Handcrafted Wooden Army Tank Toy',
    image_url: '/assets/images/wooden_tank_banner_1782961651387.jpg',
    category: 'Amazon Banners',
    description: 'Solid natural pine wood toy tank with a long cannon barrel, highlighting pristine wood grain textures and eco-friendly child-safe artisan work.'
  },
  {
    id: 'gal-amazon-banner-16',
    title: 'Amazon A+ Listing: Miniature Farm Tractor Set',
    image_url: '/assets/images/miniature_farm_tractor_banner_jpg_1782965558478.jpg',
    category: 'Amazon Banners',
    description: 'A premium, professional 1:1 Amazon listing infographic banner for our Miniature Farm Tractor Set. Highlights its eco-friendly wood craftsmanship, hand-eye coordination benefits, and detachable cargo trailer.'
  },
  {
    id: 'gal-1',
    title: 'Hand-sanding raw maple blocks',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    category: 'Workshop',
    description: 'Every block and arch is meticulously hand-sanded to ensure perfectly silky textures and soft, child-safe corners.'
  },
  {
    id: 'gal-2',
    title: 'Applying organic beeswax finish',
    image_url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    category: 'Finishing',
    description: 'We seal our premium natural wood tones with local, organic beeswax and natural cold-pressed linseed oil.'
  },
  {
    id: 'gal-3',
    title: 'Child-safe water stains testing',
    image_url: 'https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?auto=format&fit=crop&w=800&q=80',
    category: 'Materials',
    description: 'Tested rigorously to meet European EN71 and American ASTM certification guidelines for total safety.'
  },
  {
    id: 'gal-4',
    title: 'Sustainably sourced lumber stockpile',
    image_url: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=800&q=80',
    category: 'Forestry',
    description: 'Our woods are exclusively harvested from certified sustainable FSC woodlands in North America and Bavaria.'
  },
  {
    id: 'gal-5',
    title: 'The magnetic train alignment test',
    image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    category: 'Assembly',
    description: 'Ensuring every wheel, axle, and hidden safety magnet matches our rigorous play tolerance checks.'
  },
  {
    id: 'gal-6',
    title: 'Sensory play corner with Woodland toys',
    image_url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    category: 'Playroom',
    description: 'A beautiful Montessori playroom utilizing simple, organic, low-distraction playroom aesthetics.'
  }
];

const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    product_id: 'prod-1',
    user_id: 'user-2',
    user_name: 'Sophia Mitchell',
    rating: 5,
    comment: 'Extremely high quality! The beeswax smells wonderful and the wood grains are absolutely beautiful. My 1-year-old is obsessed with stacking them.',
    created_at: '2026-06-15T10:00:00Z'
  },
  {
    id: 'rev-2',
    product_id: 'prod-1',
    user_id: 'user-3',
    user_name: 'Daniel Brooks',
    rating: 4,
    comment: 'Very solid and feels completely safe for babies to chew on. My only minor complaint is that the cherry wood holds water spots if left wet.',
    created_at: '2026-06-20T14:30:00Z'
  },
  {
    id: 'rev-3',
    product_id: 'prod-2',
    user_id: 'user-4',
    user_name: 'Laura G.',
    rating: 5,
    comment: 'Stunning open-ended toy. We build bridges, fences, doll beds, and high-rise towers. Highly recommend the 10-piece over smaller arches!',
    created_at: '2026-06-10T09:15:00Z'
  }
];

// ==========================================
// LOCAL STORAGE SERVICE (OFFLINE ENGINE)
// ==========================================

const initLocalStorageDb = () => {
  const CURRENT_SEED_VERSION = 'v61';
  
  const existingVersion = localStorage.getItem('wt_seed_version');
  if (existingVersion !== CURRENT_SEED_VERSION) {
    // Only set if not already present, to preserve user-added content during upgrades
    if (!localStorage.getItem('wt_categories')) {
      localStorage.setItem('wt_categories', JSON.stringify(SEED_CATEGORIES));
    }
    if (!localStorage.getItem('wt_products')) {
      localStorage.setItem('wt_products', JSON.stringify(SEED_PRODUCTS));
    }
    if (!localStorage.getItem('wt_testimonials')) {
      localStorage.setItem('wt_testimonials', JSON.stringify(SEED_TESTIMONIALS));
    }
    if (!localStorage.getItem('wt_gallery')) {
      localStorage.setItem('wt_gallery', JSON.stringify(SEED_GALLERY));
    }
    if (!localStorage.getItem('wt_reviews')) {
      localStorage.setItem('wt_reviews', JSON.stringify(SEED_REVIEWS));
    }
    localStorage.setItem('wt_seed_version', CURRENT_SEED_VERSION);
  }

  // Fallback check if someone cleared storage or fresh load
  if (!localStorage.getItem('wt_categories')) {
    localStorage.setItem('wt_categories', JSON.stringify(SEED_CATEGORIES));
  }
  if (!localStorage.getItem('wt_products')) {
    localStorage.setItem('wt_products', JSON.stringify(SEED_PRODUCTS));
  }
  if (!localStorage.getItem('wt_testimonials')) {
    localStorage.setItem('wt_testimonials', JSON.stringify(SEED_TESTIMONIALS));
  }
  if (!localStorage.getItem('wt_gallery')) {
    localStorage.setItem('wt_gallery', JSON.stringify(SEED_GALLERY));
  }
  if (!localStorage.getItem('wt_reviews')) {
    localStorage.setItem('wt_reviews', JSON.stringify(SEED_REVIEWS));
  }

  if (!localStorage.getItem('wt_orders')) {
    localStorage.setItem('wt_orders', JSON.stringify([]));
  }
  if (!localStorage.getItem('wt_contact_messages')) {
    localStorage.setItem('wt_contact_messages', JSON.stringify([]));
  }
  if (!localStorage.getItem('wt_wishlist')) {
    localStorage.setItem('wt_wishlist', JSON.stringify([]));
  }
  if (!localStorage.getItem('wt_current_user')) {
    const defaultUser: User = {
      id: 'cust-default',
      email: 'customer@timbertoy.com',
      full_name: 'Jane Doe',
      role: 'customer',
      phone: '+1 555-0199',
      addresses: [
        {
          id: 'addr-1',
          type: 'home',
          is_default: true,
          receiver_name: 'Jane Doe',
          phone: '+1 555-0199',
          street_address: '1024 Woodland Dr.',
          city: 'Portland',
          state: 'Oregon',
          postal_code: '97201',
          country: 'United States'
        }
      ]
    };
    localStorage.setItem('wt_current_user', JSON.stringify(defaultUser));
  }
};

if (typeof window !== 'undefined') {
  initLocalStorageDb();
}

const getFromLS = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

const setToLS = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// ==========================================
// UNIFIED DATABASE & AUTHENTICATION SERVICES
// ==========================================

export const dbService = {
  // --- AUTH SERVICES ---
  auth: {
    getCurrentUser: async (): Promise<User | null> => {
      if (isSupabaseConfigured) {
        try {
          const { data: { user } } = await supabase!.auth.getUser();
          if (!user) return null;
          // In real implementation, query standard users metadata table or return converted profile
          return {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || 'Valued Customer',
            role: user.user_metadata?.role || 'customer',
            addresses: [],
          };
        } catch (e) {
          console.error("Supabase Auth error, using local fallback", e);
        }
      }
      return getFromLS<User | null>('wt_current_user', null);
    },

    signUp: async (email: string, password: string, fullName: string): Promise<{ user: User | null; error: string | null }> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                role: 'customer'
              }
            }
          });
          if (error) return { user: null, error: error.message };
          const newUser: User = {
            id: data.user?.id || 'cust-' + Date.now(),
            email,
            full_name: fullName,
            role: 'customer',
            addresses: []
          };
          return { user: newUser, error: null };
        } catch (e: any) {
          return { user: null, error: e.message || "Failed to sign up on Supabase" };
        }
      }
      
      // Local Auth Sim
      const newUser: User = {
        id: 'cust-' + Date.now(),
        email,
        full_name: fullName,
        role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
        addresses: []
      };
      setToLS('wt_current_user', newUser);
      return { user: newUser, error: null };
    },

    signIn: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
      const lowerEmail = email.toLowerCase().trim();
      if (lowerEmail === 'admin@craftkalash.com' || lowerEmail === 'admin@timbertoy.com') {
        if (password !== 'Kalash@2026') {
          return { user: null, error: 'Incorrect secure password for administrator access.' };
        }
        const adminUser: User = {
          id: 'user-3',
          email: lowerEmail,
          full_name: 'Budhni Wooden Artist (Owner)',
          role: 'admin',
          phone: '+91 98765 43210',
          addresses: []
        };
        setToLS('wt_current_user', adminUser);
        return { user: adminUser, error: null };
      }

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.auth.signInWithPassword({ email, password });
          if (error) return { user: null, error: error.message };
          const userObj: User = {
            id: data.user!.id,
            email: data.user!.email!,
            full_name: data.user!.user_metadata?.full_name || 'Valued Customer',
            role: data.user!.user_metadata?.role || 'customer',
            addresses: []
          };
          return { user: userObj, error: null };
        } catch (e: any) {
          return { user: null, error: e.message || "Failed to sign in on Supabase" };
        }
      }

      // Local Auth Sim
      const existingUser = getFromLS<User | null>('wt_current_user', null);
      let userObj: User;
      if (existingUser && existingUser.email === email) {
        userObj = existingUser;
      } else {
        userObj = {
          id: 'cust-' + Date.now(),
          email,
          full_name: email.split('@')[0].toUpperCase(),
          role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
          addresses: [
            {
              id: 'addr-1',
              type: 'home',
              is_default: true,
              receiver_name: email.split('@')[0].toUpperCase(),
              phone: '+1 555-0100',
              street_address: '123 Pinecrest Avenue',
              city: 'Seattle',
              state: 'Washington',
              postal_code: '98101',
              country: 'United States'
            }
          ]
        };
      }
      setToLS('wt_current_user', userObj);
      return { user: userObj, error: null };
    },

    signOut: async (): Promise<void> => {
      if (isSupabaseConfigured) {
        await supabase!.auth.signOut();
      }
      localStorage.removeItem('wt_current_user');
    },

    updateProfile: async (fullName: string, phone: string): Promise<User> => {
      const user = getFromLS<User>('wt_current_user', { id: 'cust-default', email: 'customer@timbertoy.com', role: 'customer', addresses: [] });
      user.full_name = fullName;
      user.phone = phone;
      setToLS('wt_current_user', user);
      return user;
    },

    manageAddress: async (action: 'add' | 'edit' | 'delete', address: Partial<Address> & { id?: string }): Promise<User> => {
      const user = getFromLS<User>('wt_current_user', { id: 'cust-default', email: 'customer@timbertoy.com', role: 'customer', addresses: [] });
      if (!user.addresses) user.addresses = [];

      if (action === 'add') {
        const newAddr: Address = {
          id: 'addr-' + Date.now(),
          type: address.type || 'home',
          is_default: address.is_default || user.addresses.length === 0,
          receiver_name: address.receiver_name || user.full_name || 'Receiver',
          phone: address.phone || user.phone || '',
          street_address: address.street_address || '',
          city: address.city || '',
          state: address.state || '',
          postal_code: address.postal_code || '',
          country: address.country || 'United States'
        };
        if (newAddr.is_default) {
          user.addresses.forEach(a => a.is_default = false);
        }
        user.addresses.push(newAddr);
      } else if (action === 'edit' && address.id) {
        user.addresses = user.addresses.map(a => {
          if (a.id === address.id) {
            const updated = { ...a, ...address } as Address;
            if (updated.is_default) {
              user.addresses.forEach(oth => { if (oth.id !== address.id) oth.is_default = false; });
            }
            return updated;
          }
          return a;
        });
      } else if (action === 'delete' && address.id) {
        user.addresses = user.addresses.filter(a => a.id !== address.id);
        if (user.addresses.length > 0 && !user.addresses.some(a => a.is_default)) {
          user.addresses[0].is_default = true;
        }
      }

      setToLS('wt_current_user', user);
      return user;
    }
  },

  // --- CATEGORIES ---
  categories: {
    getAll: async (): Promise<Category[]> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('categories').select('*').order('name');
          if (!error && data && data.length > 0) return data as Category[];
        } catch (e) {
          console.error("Supabase category fetch failed", e);
        }
      }
      return getFromLS<Category[]>('wt_categories', SEED_CATEGORIES);
    },

    upsert: async (category: Omit<Category, 'id'> & { id?: string }): Promise<Category> => {
      const categories = getFromLS<Category[]>('wt_categories', SEED_CATEGORIES);
      const categoryId = category.id || 'cat-' + Date.now();
      const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
      const catData: Category = {
        id: categoryId,
        name: category.name,
        slug,
        description: category.description || '',
        image_url: category.image_url || 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'
      };

      // Always update local storage first
      const idx = categories.findIndex(c => c.id === categoryId);
      if (idx !== -1) {
        categories[idx] = { ...categories[idx], ...catData };
      } else {
        categories.push(catData);
      }
      setToLS('wt_categories', categories);

      // Save to Supabase if configured
      if (isSupabaseConfigured) {
        try {
          await supabase!.from('categories').upsert(catData);
        } catch (e) {
          console.error("Supabase category upsert exception", e);
        }
      }

      return catData;
    },

    delete: async (id: string): Promise<void> => {
      // 1. Always update local storage
      const categories = getFromLS<Category[]>('wt_categories', SEED_CATEGORIES);
      const filtered = categories.filter(c => c.id !== id);
      setToLS('wt_categories', filtered);

      // 2. Delete from Supabase if configured
      if (isSupabaseConfigured) {
        try {
          await supabase!.from('categories').delete().eq('id', id);
        } catch (e) {
          console.error("Supabase category delete exception", e);
        }
      }
    }
  },

  // --- PRODUCTS ---
  products: {
    getAll: async (): Promise<Product[]> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('products').select('*');
          if (!error && data && data.length > 0) return data as Product[];
        } catch (e) {
          console.error("Supabase product fetch failed", e);
        }
      }
      return getFromLS<Product[]>('wt_products', SEED_PRODUCTS);
    },

    getById: async (id: string): Promise<Product | null> => {
      const products = await dbService.products.getAll();
      return products.find(p => p.id === id) || null;
    },

    upsert: async (product: Partial<Product> & { id?: string }): Promise<Product> => {
      const categories = getFromLS<Category[]>('wt_categories', SEED_CATEGORIES);
      const cat = categories.find(c => c.id === product.category_id);
      const categoryName = cat ? cat.name : 'Uncategorized';

      const productId = product.id || 'prod-' + Date.now();
      const prodData: Product = {
        id: productId,
        name: product.name || 'New Wooden Toy',
        category_id: product.category_id || 'cat-1',
        category_name: categoryName,
        price: product.price || 19.99,
        discount_price: product.discount_price || null,
        images: product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80'],
        description: product.description || 'A beautifully handcrafted wooden toy.',
        features: product.features || ['Non-toxic organic finish', 'Eco-friendly sustainable wood', 'Sanded soft round edges'],
        specifications: product.specifications || { 'Material': 'Maple Wood', 'Age Recommendation': '12+ months' },
        stock_status: product.stock_status || 'in_stock',
        stock_quantity: product.stock_quantity || 10,
        rating: product.rating || 5.0,
        reviews_count: product.reviews_count || 0,
        flipkart_link: product.flipkart_link || null,
        is_featured: product.is_featured || false
      };

      // Always update local storage first
      const products = getFromLS<Product[]>('wt_products', SEED_PRODUCTS);
      const idx = products.findIndex(p => p.id === productId);
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...prodData };
      } else {
        products.push(prodData);
      }
      setToLS('wt_products', products);

      // Save to Supabase if configured
      if (isSupabaseConfigured) {
        try {
          await supabase!.from('products').upsert(prodData);
        } catch (e) {
          console.error("Supabase product upsert exception", e);
        }
      }

      return prodData;
    },

    delete: async (id: string): Promise<void> => {
      // 1. Always update local storage
      const products = getFromLS<Product[]>('wt_products', SEED_PRODUCTS);
      const filtered = products.filter(p => p.id !== id);
      setToLS('wt_products', filtered);

      // 2. Delete from Supabase if configured
      if (isSupabaseConfigured) {
        try {
          await supabase!.from('products').delete().eq('id', id);
        } catch (e) {
          console.error("Supabase product delete exception", e);
        }
      }
    }
  },

  // --- REVIEWS ---
  reviews: {
    getByProductId: async (productId: string): Promise<Review[]> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('reviews').select('*').eq('product_id', productId).order('created_at', { ascending: false });
          if (!error && data) return data as Review[];
          console.warn("Supabase reviews fetch failed, using LS fallback", error);
        } catch (e) {
          console.error("Supabase reviews getByProductId exception", e);
        }
      }
      const reviews = getFromLS<Review[]>('wt_reviews', SEED_REVIEWS);
      return reviews.filter(r => r.product_id === productId);
    },

    add: async (productId: string, rating: number, comment: string, userName: string): Promise<Review> => {
      const newReview: Review = {
        id: 'rev-' + Date.now(),
        product_id: productId,
        user_id: 'user-' + Date.now(),
        user_name: userName || 'Anonym',
        rating,
        comment,
        created_at: new Date().toISOString()
      };

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('reviews').insert(newReview).select().single();
          if (!error && data) {
            // Recalculate average rating for the product in Supabase
            const { data: prodReviews, error: rErr } = await supabase!.from('reviews').select('rating').eq('product_id', productId);
            if (!rErr && prodReviews) {
              const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
              await supabase!
                .from('products')
                .update({ 
                  rating: Number(avgRating.toFixed(1)), 
                  reviews_count: prodReviews.length 
                })
                .eq('id', productId);
            }
            return data as Review;
          }
          console.warn("Supabase reviews insert failed, using LS fallback", error);
        } catch (e) {
          console.error("Supabase reviews add exception", e);
        }
      }

      const reviews = getFromLS<Review[]>('wt_reviews', SEED_REVIEWS);
      reviews.push(newReview);
      setToLS('wt_reviews', reviews);

      // Dynamically update product rating locally
      const products = getFromLS<Product[]>('wt_products', SEED_PRODUCTS);
      const pIdx = products.findIndex(p => p.id === productId);
      if (pIdx !== -1) {
        const prodReviews = reviews.filter(r => r.product_id === productId);
        const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
        products[pIdx].rating = Number(avgRating.toFixed(1));
        products[pIdx].reviews_count = prodReviews.length;
        setToLS('wt_products', products);
      }

      return newReview;
    }
  },

  // --- WISHLIST ---
  wishlist: {
    get: async (): Promise<string[]> => {
      return getFromLS<string[]>('wt_wishlist', []);
    },

    toggle: async (productId: string): Promise<string[]> => {
      const list = getFromLS<string[]>('wt_wishlist', []);
      const index = list.indexOf(productId);
      if (index > -1) {
        list.splice(index, 1);
      } else {
        list.push(productId);
      }
      setToLS('wt_wishlist', list);
      return list;
    }
  },

  // --- ORDERS ---
  orders: {
    getAll: async (): Promise<Order[]> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('orders').select('*').order('created_at', { ascending: false });
          if (!error && data) return data as Order[];
          console.warn("Supabase orders select failed, using LS fallback", error);
        } catch (e) {
          console.error("Supabase orders getAll exception", e);
        }
      }
      return getFromLS<Order[]>('wt_orders', []);
    },

    getUserOrders: async (userId: string): Promise<Order[]> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
          if (!error && data) return data as Order[];
          console.warn("Supabase user orders fetch failed, using LS fallback", error);
        } catch (e) {
          console.error("Supabase user orders exception", e);
        }
      }
      const orders = await dbService.orders.getAll();
      return orders.filter(o => o.user_id === userId);
    },

    create: async (orderData: Omit<Order, 'id' | 'created_at' | 'status'>): Promise<Order> => {
      const newOrder: Order = {
        ...orderData,
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        created_at: new Date().toISOString(),
        status: 'pending'
      };

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('orders').insert(newOrder).select().single();
          if (!error && data) {
            // Reduce product stock quantities in Supabase
            for (const item of newOrder.items) {
              const { data: prod } = await supabase!.from('products').select('stock_quantity').eq('id', item.product_id).single();
              if (prod) {
                const currentStock = prod.stock_quantity || 0;
                const newStock = Math.max(0, currentStock - item.quantity);
                const stockStatus = newStock === 0 ? 'out_of_stock' : newStock <= 5 ? 'low_stock' : 'in_stock';
                await supabase!.from('products').update({ stock_quantity: newStock, stock_status: stockStatus }).eq('id', item.product_id);
              }
            }
            return data as Order;
          }
          console.warn("Supabase orders insert failed, using LS fallback", error);
        } catch (e) {
          console.error("Supabase orders create exception", e);
        }
      }

      const orders = getFromLS<Order[]>('wt_orders', []);
      orders.push(newOrder);
      setToLS('wt_orders', orders);

      // Reduce product stock quantities locally
      const products = getFromLS<Product[]>('wt_products', SEED_PRODUCTS);
      newOrder.items.forEach(item => {
        const pIdx = products.findIndex(p => p.id === item.product_id);
        if (pIdx !== -1) {
          const currentStock = products[pIdx].stock_quantity;
          const newStock = Math.max(0, currentStock - item.quantity);
          products[pIdx].stock_quantity = newStock;
          products[pIdx].stock_status = newStock === 0 
            ? 'out_of_stock' 
            : newStock <= 5 
              ? 'low_stock' 
              : 'in_stock';
        }
      });
      setToLS('wt_products', products);

      return newOrder;
    },

    updateStatus: async (orderId: string, status: Order['status'], paymentStatus?: Order['payment_status']): Promise<Order | null> => {
      if (isSupabaseConfigured) {
        try {
          const updatePayload: any = { status };
          if (paymentStatus) {
            updatePayload.payment_status = paymentStatus;
          }
          const { data, error } = await supabase!
            .from('orders')
            .update(updatePayload)
            .eq('id', orderId)
            .select()
            .single();
          if (!error && data) return data as Order;
          console.warn("Supabase order status update failed, using LS fallback", error);
        } catch (e) {
          console.error("Supabase orders updateStatus exception", e);
        }
      }

      const orders = getFromLS<Order[]>('wt_orders', []);
      const idx = orders.findIndex(o => o.id === orderId);
      if (idx !== -1) {
        orders[idx].status = status;
        if (paymentStatus) {
          orders[idx].payment_status = paymentStatus;
        }
        setToLS('wt_orders', orders);
        return orders[idx];
      }
      return null;
    }
  },

  // --- TESTIMONIALS ---
  testimonials: {
    getAll: async (): Promise<Testimonial[]> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('testimonials').select('*');
          if (!error && data && data.length > 0) return data as Testimonial[];
        } catch (e) {
          console.error("Supabase testimonials getAll exception", e);
        }
      }
      return getFromLS<Testimonial[]>('wt_testimonials', SEED_TESTIMONIALS);
    },

    add: async (t: Omit<Testimonial, 'id'>): Promise<Testimonial> => {
      const newItem: Testimonial = { ...t, id: 'test-' + Date.now() };
      
      // Update LocalStorage first
      const items = getFromLS<Testimonial[]>('wt_testimonials', SEED_TESTIMONIALS);
      items.push(newItem);
      setToLS('wt_testimonials', items);

      if (isSupabaseConfigured) {
        try {
          await supabase!.from('testimonials').insert(newItem);
        } catch (e) {
          console.error("Supabase testimonials add exception", e);
        }
      }
      return newItem;
    },

    delete: async (id: string): Promise<void> => {
      // 1. LocalStorage
      const items = getFromLS<Testimonial[]>('wt_testimonials', SEED_TESTIMONIALS);
      setToLS('wt_testimonials', items.filter(t => t.id !== id));

      // 2. Supabase
      if (isSupabaseConfigured) {
        try {
          await supabase!.from('testimonials').delete().eq('id', id);
        } catch (e) {
          console.error("Supabase testimonials delete exception", e);
        }
      }
    }
  },

  // --- GALLERY ---
  gallery: {
    getAll: async (): Promise<GalleryItem[]> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!.from('gallery').select('*').order('created_at', { ascending: false });
          if (!error && data && data.length > 0) return data as GalleryItem[];
        } catch (e) {
          console.error("Supabase gallery getAll exception", e);
        }
      }
      return getFromLS<GalleryItem[]>('wt_gallery', SEED_GALLERY);
    },

    add: async (g: Omit<GalleryItem, 'id'>): Promise<GalleryItem> => {
      const newItem: GalleryItem = { ...g, id: 'gal-' + Date.now(), created_at: new Date().toISOString() };
      
      // LocalStorage
      const items = getFromLS<GalleryItem[]>('wt_gallery', SEED_GALLERY);
      items.push(newItem);
      setToLS('wt_gallery', items);

      if (isSupabaseConfigured) {
        try {
          await supabase!.from('gallery').insert(newItem);
        } catch (e) {
          console.error("Supabase gallery add exception", e);
        }
      }
      return newItem;
    },

    delete: async (id: string): Promise<void> => {
      // LocalStorage
      const items = getFromLS<GalleryItem[]>('wt_gallery', SEED_GALLERY);
      setToLS('wt_gallery', items.filter(g => g.id !== id));

      // Supabase
      if (isSupabaseConfigured) {
        try {
          await supabase!.from('gallery').delete().eq('id', id);
        } catch (e) {
          console.error("Supabase gallery delete exception", e);
        }
      }
    }
  },

  // --- CONTACT MESSAGES ---
  contactMessages: {
    getAll: async (): Promise<ContactMessage[]> => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase!
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data) return data as ContactMessage[];
        } catch (e) {
          console.error("Supabase contact_messages getAll exception", e);
        }
      }
      return getFromLS<ContactMessage[]>('wt_contact_messages', []);
    },

    submit: async (name: string, email: string, phone: string, subject: string, message: string): Promise<ContactMessage> => {
      const newMsg: ContactMessage = {
        id: 'msg-' + Date.now(),
        name,
        email,
        phone,
        subject,
        message,
        created_at: new Date().toISOString(),
        status: 'unread'
      };

      // LocalStorage
      const messages = getFromLS<ContactMessage[]>('wt_contact_messages', []);
      messages.push(newMsg);
      setToLS('wt_contact_messages', messages);

      if (isSupabaseConfigured) {
        try {
          await supabase!.from('contact_messages').insert(newMsg);
        } catch (e) {
          console.error("Supabase contact_messages submit exception", e);
        }
      }
      return newMsg;
    },

    updateStatus: async (id: string, status: ContactMessage['status']): Promise<void> => {
      // LocalStorage
      const messages = getFromLS<ContactMessage[]>('wt_contact_messages', []);
      const idx = messages.findIndex(m => m.id === id);
      if (idx !== -1) {
        messages[idx].status = status;
        setToLS('wt_contact_messages', messages);
      }

      // Supabase
      if (isSupabaseConfigured) {
        try {
          await supabase!
            .from('contact_messages')
            .update({ status })
            .eq('id', id);
        } catch (e) {
          console.error("Supabase contact_messages updateStatus exception", e);
        }
      }
    },

    delete: async (id: string): Promise<void> => {
      // LocalStorage
      const messages = getFromLS<ContactMessage[]>('wt_contact_messages', []);
      const filtered = messages.filter(m => m.id !== id);
      setToLS('wt_contact_messages', filtered);

      // Supabase
      if (isSupabaseConfigured) {
        try {
          await supabase!
            .from('contact_messages')
            .delete()
            .eq('id', id);
        } catch (e) {
          console.error("Supabase contact_messages delete exception", e);
        }
      }
    }
  },

  // --- USERS / CUSTOMERS ---
  users: {
    getAll: async (): Promise<User[]> => {
      const currentUser = getFromLS<User | null>('wt_current_user', null);
      const defaultUserList: User[] = [
        { id: 'user-1', email: 'customer@timbertoy.com', full_name: 'Sophia Mitchell', role: 'customer', phone: '+1 (555) 019-9869', addresses: [] },
        { id: 'user-2', email: 'parent@kinderplay.org', full_name: 'Daniel Brooks', role: 'customer', phone: '+1 (555) 012-3456', addresses: [] },
        { id: 'user-3', email: 'admin@craftkalash.com', full_name: 'Budhni Wooden Artist (Owner)', role: 'admin', phone: '+91 98765 43210', addresses: [] }
      ];
      if (currentUser && !defaultUserList.some(u => u.email === currentUser.email)) {
        defaultUserList.unshift(currentUser);
      }
      return defaultUserList;
    }
  },

  // --- COUPONS ---
  coupons: {
    validate: (code: string): Coupon | null => {
      const validCoupons: Coupon[] = [
        { code: 'WOODEN10', discount_type: 'percentage', value: 10, min_order_value: 30 },
        { code: 'NATURAL20', discount_type: 'percentage', value: 20, min_order_value: 60 },
        { code: 'FREESHIP', discount_type: 'fixed', value: 5.99, min_order_value: 20 },
        { code: 'WELCOME15', discount_type: 'percentage', value: 15 }
      ];
      return validCoupons.find(c => c.code.toUpperCase() === code.toUpperCase()) || null;
    }
  },

  // --- SEED CLOUD DATABASE ---
  seed: {
    run: async (): Promise<{ success: boolean; message: string }> => {
      if (!isSupabaseConfigured) {
        return { success: false, message: 'Supabase is not configured.' };
      }
      try {
        // 1. Seed Categories
        for (const cat of SEED_CATEGORIES) {
          const { error } = await supabase!.from('categories').upsert(cat);
          if (error) throw new Error(`Category seeding failed: ${error.message}`);
        }

        // 2. Seed Products
        for (const p of SEED_PRODUCTS) {
          const prodData = {
            id: p.id,
            name: p.name,
            category_id: p.category_id,
            category_name: p.category_name,
            price: p.price || 19.99,
            discount_price: p.discount_price,
            images: p.images,
            description: p.description,
            features: p.features,
            specifications: p.specifications,
            stock_status: p.stock_status || 'in_stock',
            stock_quantity: p.stock_quantity || 10,
            rating: p.rating || 5.0,
            reviews_count: p.reviews_count || 0,
            flipkart_link: p.flipkart_link,
            is_featured: p.is_featured || false
          };
          const { error } = await supabase!.from('products').upsert(prodData);
          if (error) throw new Error(`Product seeding failed: ${error.message}`);
        }

        // 3. Seed Testimonials
        for (const t of SEED_TESTIMONIALS) {
          const { error } = await supabase!.from('testimonials').upsert(t);
          if (error) throw new Error(`Testimonials seeding failed: ${error.message}`);
        }

        // 4. Seed Gallery
        for (const g of SEED_GALLERY) {
          const { error } = await supabase!.from('gallery').upsert(g);
          if (error) throw new Error(`Gallery seeding failed: ${error.message}`);
        }

        return { success: true, message: 'All 8 categories, heirloom products, testimonials, and gallery items successfully seeded into your Supabase database!' };
      } catch (err: any) {
        console.error('Seeding exception:', err);
        return { success: false, message: err.message || 'Seeding failed. Verify your SQL table schema first.' };
      }
    }
  }
};
