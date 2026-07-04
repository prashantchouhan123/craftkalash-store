import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { dbService, isSupabaseConfigured, supabase } from '../services/db';
import { Product, Category, Order, User, GalleryItem, Testimonial, ContactMessage } from '../types';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, ShoppingBag, FolderHeart, Users, Image as ImageIcon, MessageSquare, Plus, Edit, Trash2, 
  Settings, CheckCircle, Ship, RefreshCw, AlertCircle, Sparkles, Star, Package, Mail, Check, ExternalLink, Inbox,
  Database
} from 'lucide-react';

type AdminTab = 'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'gallery' | 'reviews' | 'messages' | 'database';

export const Admin: React.FC = () => {
  const { currentUser } = useShop();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states - Products
  const [prodEditingId, setProdEditingId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodDiscPrice, setProdDiscPrice] = useState<number | undefined>(undefined);
  const [prodDesc, setProdDesc] = useState('');
  const [prodCatId, setProdCatId] = useState('');
  const [prodImages, setProdImages] = useState<string[]>(['']);
  const [prodFeatures, setProdFeatures] = useState<string[]>(['']);
  const [prodSpecs, setProdSpecs] = useState<Record<string, string>>({
    "Material": "Organic Maple Wood",
    "Age Group": "1 - 5 Years",
    "Certification": "EN71 Safe & Certified"
  });
  const [prodStockStatus, setProdStockStatus] = useState<'in_stock' | 'low_stock' | 'out_of_stock'>('in_stock');
  const [prodStockQty, setProdStockQty] = useState(15);
  const [prodFlipkartLink, setProdFlipkartLink] = useState('');
  const [prodIsFeatured, setProdIsFeatured] = useState(false);

  // Form states - Categories
  const [catEditingId, setCatEditingId] = useState<string | null>(null);
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Form states - Gallery
  const [galTitle, setGalTitle] = useState('');
  const [galImage, setGalImage] = useState('');
  const [galCat, setGalCat] = useState('Workshop');
  const [galDesc, setGalDesc] = useState('');

  // Form states - Testimonials
  const [testiName, setTestiName] = useState('');
  const [testiRole, setTestiRole] = useState('Happy Parent');
  const [testiText, setTestiText] = useState('');
  const [testiRating, setTestiRating] = useState(5);
  const [testiImage, setTestiImage] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200');

  // Message tab states
  const [msgFilter, setMsgFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [msgSearch, setMsgSearch] = useState('');

  // Database Diagnostics states
  const [diagRunning, setDiagRunning] = useState(false);
  const [diagResults, setDiagResults] = useState<{
    status: 'success' | 'failed' | 'idle';
    message: string;
    details: { table: string; status: 'ok' | 'error' | 'fallback'; count: number; errorMsg?: string }[];
  } | null>(null);

  // Seeding states
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await (dbService as any).seed.run();
      setSeedResult(res);
      // Run diagnostics immediately after seeding to update count and statuses!
      runDiagnostics();
    } catch (err: any) {
      setSeedResult({ success: false, message: err.message || 'Seeding failed.' });
    } finally {
      setSeeding(false);
    }
  };

  const runDiagnostics = async () => {
    setDiagRunning(true);
    const details: any[] = [];
    let overallSuccess = true;

    if (!isSupabaseConfigured) {
      setDiagResults({
        status: 'failed',
        message: 'Supabase URL/Key is missing or placeholder values are set in .env. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.',
        details: []
      });
      setDiagRunning(false);
      return;
    }

    const tablesToCheck = ['categories', 'products', 'orders', 'reviews', 'gallery', 'testimonials', 'contact_messages'];

    for (const tableName of tablesToCheck) {
      try {
        const { count, error } = await supabase!
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (error) {
          overallSuccess = false;
          details.push({
            table: tableName,
            status: 'error',
            count: 0,
            errorMsg: error.message
          });
        } else {
          details.push({
            table: tableName,
            status: 'ok',
            count: count || 0,
            errorMsg: ''
          });
        }
      } catch (err: any) {
        overallSuccess = false;
        details.push({
          table: tableName,
          status: 'error',
          count: 0,
          errorMsg: err.message || 'Connection / Schema check failed'
        });
      }
    }

    setDiagResults({
      status: overallSuccess ? 'success' : 'failed',
      message: overallSuccess 
        ? 'All 7 database tables are successfully connected, configured, and accessible!' 
        : 'Connection issues or missing columns/tables detected. Check specific table errors below.',
      details
    });
    setDiagRunning(false);
  };

  useEffect(() => {
    // Check admin permissions
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.role !== 'admin') {
      alert('Security Alert: Restrained access. Workshop Owner credentials required.');
      navigate('/');
      return;
    }

    loadAdminData();
  }, [currentUser, navigate]);

  const loadAdminData = async () => {
    setIsLoading(true);
    const prods = await dbService.products.getAll();
    const cats = await dbService.categories.getAll();
    const ords = await dbService.orders.getAll();
    const custs = await dbService.users.getAll();
    const gals = await dbService.gallery.getAll();
    const testies = await dbService.testimonials.getAll();
    const msgs = await dbService.contactMessages.getAll();

    setProducts(prods);
    setCategories(cats);
    setOrders(ords);
    setCustomers(custs);
    setGallery(gals);
    setTestimonials(testies);
    setContactMessages(msgs);

    if (cats.length > 0 && !prodCatId) {
      setProdCatId(cats[0].id);
    }
    setIsLoading(false);
  };

  if (!currentUser || currentUser.role !== 'admin') return null;

  // Stats
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  // PRODUCT ACTIONS
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCat = categories.find(c => c.id === prodCatId);

    const productData: Partial<Product> = {
      name: prodName,
      price: prodPrice,
      discount_price: prodDiscPrice || undefined,
      description: prodDesc,
      category_id: prodCatId,
      category_name: selectedCat?.name || 'Wooden Toys',
      images: prodImages.filter(img => img.trim() !== ''),
      features: prodFeatures.filter(f => f.trim() !== ''),
      specifications: prodSpecs,
      stock_status: prodStockStatus,
      stock_quantity: prodStockQty,
      flipkart_link: prodFlipkartLink || undefined,
      is_featured: prodIsFeatured,
      rating: 5.0,
      reviews_count: 0
    };

    if (prodEditingId) {
      await dbService.products.upsert({ ...productData, id: prodEditingId });
      setProdEditingId(null);
    } else {
      await dbService.products.upsert(productData);
    }

    // Reset Form
    setProdName('');
    setProdPrice(0);
    setProdDiscPrice(undefined);
    setProdDesc('');
    setProdImages(['']);
    setProdFeatures(['']);
    setProdFlipkartLink('');
    setProdIsFeatured(false);
    await loadAdminData();
  };

  const handleEditProductClick = (p: Product) => {
    setProdEditingId(p.id);
    setProdName(p.name);
    setProdPrice(p.price);
    setProdDiscPrice(p.discount_price);
    setProdDesc(p.description);
    setProdCatId(p.category_id);
    setProdImages(p.images);
    setProdFeatures(p.features);
    setProdSpecs(p.specifications);
    setProdStockStatus(p.stock_status);
    setProdStockQty(p.stock_quantity);
    setProdFlipkartLink(p.flipkart_link || '');
    setProdIsFeatured(p.is_featured || false);
  };

  const handleDeleteProduct = async (id: string) => {
    await dbService.products.delete(id);
    await loadAdminData();
  };

  // CATEGORY ACTIONS
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<Category, 'id'> & { id?: string } = {
      name: catName,
      image_url: catImage,
      description: catDesc,
      slug: catName.toLowerCase().replace(/\s+/g, '-')
    };

    if (catEditingId) {
      await dbService.categories.upsert({ ...data, id: catEditingId });
      setCatEditingId(null);
    } else {
      await dbService.categories.upsert(data);
    }

    setCatName('');
    setCatImage('');
    setCatDesc('');
    await loadAdminData();
  };

  const handleEditCategoryClick = (c: Category) => {
    setCatEditingId(c.id);
    setCatName(c.name);
    setCatImage(c.image_url);
    setCatDesc(c.description);
  };

  const handleDeleteCategory = async (id: string) => {
    await dbService.categories.delete(id);
    await loadAdminData();
  };

  // ORDER ACTIONS
  const handleUpdateOrderStatus = async (orderId: string, status: 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    const success = await dbService.orders.updateStatus(orderId, status);
    if (success) {
      await loadAdminData();
    }
  };

  // GALLERY ACTIONS
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (galTitle && galImage) {
      await dbService.gallery.add({
        title: galTitle,
        image_url: galImage,
        category: galCat,
        description: galDesc
      });
      setGalTitle('');
      setGalImage('');
      setGalDesc('');
      await loadAdminData();
    }
  };

  const handleDeleteGallery = async (id: string) => {
    await dbService.gallery.delete(id);
    await loadAdminData();
  };

  // TESTIMONIAL ACTIONS
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (testiName && testiText) {
      await dbService.testimonials.add({
        name: testiName,
        role: testiRole,
        comment: testiText,
        rating: testiRating,
        avatar_url: testiImage,
        is_verified: true
      });
      setTestiName('');
      setTestiText('');
      await loadAdminData();
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    await dbService.testimonials.delete(id);
    await loadAdminData();
  };

  const handleToggleMessageStatus = async (id: string, currentStatus: ContactMessage['status']) => {
    const nextStatus: ContactMessage['status'] = currentStatus === 'unread' ? 'read' : 'unread';
    await dbService.contactMessages.updateStatus(id, nextStatus);
    await loadAdminData();
  };

  const handleDeleteMessage = async (id: string) => {
    await dbService.contactMessages.delete(id);
    await loadAdminData();
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-wood-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-wood-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-wood-500">Loading admin ledger controls...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-wood-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left bg-white border border-wood-200 p-6 rounded-3xl shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img 
              src="/src/assets/images/craft_kalash_logo_1782992126419.jpg" 
              alt="CraftKalash Logo" 
              className="h-16 w-16 object-contain rounded-xl border border-wood-200 shadow-2xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-wood-950 flex items-center justify-center sm:justify-start gap-2">
                Workshop Admin Console
              </h1>
              <p className="text-xs sm:text-sm text-wood-500 mt-1">
                Add handcrafted toys, review shipments, manage milestone categories, and respond to parent feedbacks.
              </p>
            </div>
          </div>
          <button 
            onClick={loadAdminData}
            className="bg-white border border-wood-200 hover:border-wood-800 px-4 py-2.5 rounded-xl text-xs font-semibold text-wood-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white border border-wood-200 p-1.5 rounded-2xl shadow-2xs">
          {([
            { id: 'dashboard', label: 'Metrics', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'products', label: 'Toys', icon: <Package className="w-4 h-4" /> },
            { id: 'categories', label: 'Categories', icon: <FolderHeart className="w-4 h-4" /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
            { id: 'gallery', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'reviews', label: 'Reviews', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'messages', label: 'Messages', icon: <Mail className="w-4 h-4" /> },
            { id: 'database', label: 'Database Status', icon: <Database className="w-4 h-4" /> },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-wood-800 text-white shadow-xs'
                  : 'text-wood-700 hover:bg-wood-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================== */}
        {/* TABS INNER LOGIC */}
        {/* ========================================================== */}

        {/* Tab 1: Dashboard Stats */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white border border-wood-200 rounded-3xl p-6 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-wood-500 uppercase tracking-wider">Total Toys Listed</span>
                  <div className="w-8 h-8 bg-forest-50 text-forest-700 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-black text-2xl text-wood-950 mt-4">{products.length} Items</h3>
                <p className="text-[10px] text-wood-400">Includes active wood carvings and limited runs</p>
              </div>

              <div className="bg-white border border-wood-200 rounded-3xl p-6 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-wood-500 uppercase tracking-wider">Active Shipments</span>
                  <div className="w-8 h-8 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-black text-2xl text-wood-950 mt-4">
                  {orders.filter(o => o.status === 'processing' || o.status === 'shipped').length} Orders
                </h3>
                <p className="text-[10px] text-wood-400">Currently in carving queue or logistics</p>
              </div>

              <div className="bg-white border border-wood-200 rounded-3xl p-6 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-wood-500 uppercase tracking-wider">Registered Families</span>
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-700 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-black text-2xl text-wood-950 mt-4">{customers.length} Customers</h3>
                <p className="text-[10px] text-wood-400">Subscribed for heirloom notifications</p>
              </div>

              <div className="bg-white border border-wood-200 rounded-3xl p-6 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-wood-500 uppercase tracking-wider">Workshop Revenue</span>
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-black text-2xl text-wood-950 mt-4 font-mono">₹{totalRevenue.toLocaleString()}</h3>
                <p className="text-[10px] text-wood-400">Excludes canceled block shipments</p>
              </div>

            </div>

            {/* Quick overview panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Orders */}
              <div className="bg-white border border-wood-200 rounded-3xl p-6 shadow-2xs space-y-4">
                <h3 className="font-display font-bold text-wood-950 text-base">Recent Orders Queue</h3>
                <div className="divide-y divide-wood-100 text-xs sm:text-sm">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-mono font-bold text-wood-950">{o.id}</p>
                        <p className="text-[10px] text-wood-400">{new Date(o.created_at).toLocaleDateString()} • {o.shipping_address.receiver_name}</p>
                      </div>
                      <span className="font-mono font-bold text-wood-900">₹{o.total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low stock indicators */}
              <div className="bg-white border border-wood-200 rounded-3xl p-6 shadow-2xs space-y-4">
                <h3 className="font-display font-bold text-wood-950 text-base">Workshop Wood logs / Stock Status</h3>
                <div className="divide-y divide-wood-100 text-xs sm:text-sm">
                  {products.slice(0, 5).map(p => (
                    <div key={p.id} className="py-3 flex justify-between items-center">
                      <p className="font-display font-bold text-wood-950 line-clamp-1 pr-4">{p.name}</p>
                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                          p.stock_status === 'in_stock' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {p.stock_quantity} left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Toy/Product manager */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <form onSubmit={handleSaveProduct} className="lg:col-span-5 bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display font-bold text-wood-950 text-base pb-2 border-b border-wood-100 flex items-center gap-1">
                <Plus className="w-5 h-5 text-wood-700" /> 
                {prodEditingId ? 'Edit Wood Craft' : 'Carve New Toy Block'}
              </h3>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Toy Name</label>
                <input
                  type="text" required value={prodName} onChange={(e) => setProdName(e.target.value)}
                  placeholder="Waldorf Stacking Rainbow"
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Base Price (₹)</label>
                  <input
                    type="number" step="1" required value={prodPrice} onChange={(e) => setProdPrice(parseFloat(e.target.value))}
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Discount Price (₹)</label>
                  <input
                    type="number" step="1" value={prodDiscPrice || ''} onChange={(e) => setProdDiscPrice(parseFloat(e.target.value) || undefined)}
                    placeholder="Optional"
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Milestone Category</label>
                <select
                  value={prodCatId} onChange={(e) => setProdCatId(e.target.value)}
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Description</label>
                <textarea
                  required rows={3} value={prodDesc} onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Introduce the wood species, sensory feedback, age compatibility, play opportunities..."
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg p-3 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Product Images</label>
                
                {/* Drag and drop / file input */}
                <div className="border-2 border-dashed border-wood-200 hover:border-wood-800 rounded-xl p-4 text-center bg-wood-50 hover:bg-wood-100 transition-colors cursor-pointer relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            setProdImages([reader.result]);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <ImageIcon className="w-5 h-5 text-wood-400 mx-auto mb-1 group-hover:text-wood-600 transition-colors" />
                  <p className="text-[10px] text-wood-600 font-bold">Drag & drop or click to upload</p>
                  <p className="text-[9px] text-wood-400 mt-0.5">Supports PNG, JPG, WEBP</p>
                </div>

                {/* Edit URL Directly */}
                <div>
                  <span className="text-[9px] font-bold text-wood-500 uppercase tracking-wide block mb-1">Or paste image URL:</span>
                  <input
                    type="text" required value={prodImages[0] || ''} onChange={(e) => setProdImages([e.target.value])}
                    placeholder="https://unsplash.com/..."
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                  />
                </div>

                {prodImages[0] && (
                  <div className="relative w-16 h-16 rounded-lg border border-wood-200 overflow-hidden bg-white">
                    <img src={prodImages[0]} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setProdImages([''])}
                      className="absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full text-[10px] hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Flipkart Purchase Link</label>
                <input
                  type="text" value={prodFlipkartLink} onChange={(e) => setProdFlipkartLink(e.target.value)}
                  placeholder="https://www.flipkart.com/..."
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 py-2 border-t border-b border-wood-100">
                <input
                  type="checkbox"
                  id="prodIsFeatured"
                  checked={prodIsFeatured}
                  onChange={(e) => setProdIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded-md border-wood-300 text-wood-800 focus:ring-wood-500"
                />
                <label htmlFor="prodIsFeatured" className="text-xs font-bold text-wood-800 select-none cursor-pointer">
                  Featured Product (Show on Homepage)
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Stock Status</label>
                  <select
                    value={prodStockStatus} onChange={(e) => setProdStockStatus(e.target.value as any)}
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Stock Qty</label>
                  <input
                    type="number" value={prodStockQty} onChange={(e) => setProdStockQty(parseInt(e.target.value))}
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full wood-btn-primary py-3 rounded-lg text-xs font-bold cursor-pointer"
              >
                {prodEditingId ? 'Apply Carving Updates' : 'List Handcrafted Toy'}
              </button>
            </form>

            {/* List Column */}
            <div className="lg:col-span-7 bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display font-bold text-wood-950 text-base pb-2 border-b border-wood-100">Active Listings ({products.length})</h3>
              
              <div className="divide-y divide-wood-100 max-h-160 overflow-y-auto pr-2 text-xs sm:text-sm">
                {products.map(p => (
                  <div key={p.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-wood-50 rounded-lg overflow-hidden shrink-0 border border-wood-150">
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-wood-950">{p.name}</h4>
                        <p className="text-[10px] text-wood-400">{p.category_name} • ₹{p.price}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 text-xs font-bold">
                      <button
                        onClick={() => handleEditProductClick(p)}
                        className="p-2 bg-wood-100 hover:bg-wood-800 text-wood-800 hover:text-white rounded-lg transition-all cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all cursor-pointer border border-red-100"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Categories manager */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <form onSubmit={handleSaveCategory} className="lg:col-span-5 bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display font-bold text-wood-950 text-base pb-2 border-b border-wood-100 flex items-center gap-1">
                <Plus className="w-5 h-5 text-wood-700" />
                {catEditingId ? 'Edit Collection Category' : 'Create Custom Category'}
              </h3>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Collection Title</label>
                <input
                  type="text" required value={catName} onChange={(e) => setCatName(e.target.value)}
                  placeholder="Waldorf Sensory Toys"
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Cover Graphic Image Link</label>
                <input
                  type="text" required value={catImage} onChange={(e) => setCatImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Collection Short Description</label>
                <textarea
                  required rows={4} value={catDesc} onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Sanded arcs, smooth boards, non-toxic water coloring designed for..."
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg p-3 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full wood-btn-primary py-3 rounded-lg text-xs font-bold cursor-pointer"
              >
                {catEditingId ? 'Apply Collection Updates' : 'Add Toy Category'}
              </button>
            </form>

            {/* List Column */}
            <div className="lg:col-span-7 bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display font-bold text-wood-950 text-base pb-2 border-b border-wood-100">Available Categories ({categories.length})</h3>
              
              <div className="divide-y divide-wood-100 max-h-160 overflow-y-auto pr-2 text-xs sm:text-sm">
                {categories.map(c => (
                  <div key={c.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-wood-50 rounded-lg overflow-hidden shrink-0 border border-wood-150">
                        <img src={c.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-wood-950">{c.name}</h4>
                        <p className="text-[10px] text-wood-400">Slug: {c.slug}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 text-xs font-bold">
                      <button
                        onClick={() => handleEditCategoryClick(c)}
                        className="p-2 bg-wood-100 hover:bg-wood-800 text-wood-800 hover:text-white rounded-lg transition-all cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(c.id)}
                        className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all cursor-pointer border border-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: Orders Control center */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-wood-200 rounded-3xl p-6 space-y-6 shadow-2xs">
            <h3 className="font-display font-bold text-wood-950 text-base pb-3 border-b border-wood-100">Live Shipments Dashboard ({orders.length})</h3>
            
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse text-wood-700">
                  <thead>
                    <tr className="border-b border-wood-200 text-[10px] font-black uppercase text-wood-400 tracking-wider">
                      <th className="py-3 px-2">Order ID</th>
                      <th className="py-3 px-2">Recipient</th>
                      <th className="py-3 px-2">Items Count</th>
                      <th className="py-3 px-2">Grand Total</th>
                      <th className="py-3 px-2">Payment Status</th>
                      <th className="py-3 px-2 text-center">Process Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-wood-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-wood-50/50">
                        <td className="py-4 px-2 font-mono font-bold text-wood-950">{o.id}</td>
                        <td className="py-4 px-2 leading-relaxed">
                          <p className="font-bold text-wood-900">{o.shipping_address.receiver_name}</p>
                          <p className="text-[10px] text-wood-400">{o.shipping_address.city}, {o.shipping_address.state}</p>
                        </td>
                        <td className="py-4 px-2 font-semibold text-wood-800">
                          {o.items.reduce((sum, item) => sum + item.quantity, 0)} toys
                        </td>
                        <td className="py-4 px-2 font-mono font-bold text-wood-900">₹{o.total.toLocaleString()}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            o.payment_status === 'paid' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                          }`}>
                            {o.payment_status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-center">
                          <div className="flex gap-1 justify-center">
                            <button
                              onClick={() => handleUpdateOrderStatus(o.id, 'processing')}
                              className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                                o.status === 'processing' 
                                  ? 'bg-amber-800 text-white border-amber-800' 
                                  : 'bg-white text-wood-600 hover:bg-wood-100 border-wood-200'
                              }`}
                              title="Sanding & Processing"
                            >
                              Carving
                            </button>
                            <button
                              onClick={() => handleUpdateOrderStatus(o.id, 'shipped')}
                              className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                                o.status === 'shipped' 
                                  ? 'bg-blue-800 text-white border-blue-800' 
                                  : 'bg-white text-wood-600 hover:bg-wood-100 border-wood-200'
                              }`}
                              title="Hand to courier"
                            >
                              Ship
                            </button>
                            <button
                              onClick={() => handleUpdateOrderStatus(o.id, 'delivered')}
                              className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                                o.status === 'delivered' 
                                  ? 'bg-emerald-800 text-white border-emerald-800' 
                                  : 'bg-white text-wood-600 hover:bg-wood-100 border-wood-200'
                              }`}
                              title="Mark Delivered"
                            >
                              Deliv
                            </button>
                            <button
                              onClick={() => handleUpdateOrderStatus(o.id, 'cancelled')}
                              className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                                o.status === 'cancelled' 
                                  ? 'bg-red-800 text-white border-red-800' 
                                  : 'bg-white text-wood-600 hover:bg-wood-100 border-wood-200'
                              }`}
                              title="Cancel Order"
                            >
                              Canc
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-wood-400 text-xs sm:text-sm">
                No orders listed in database queue yet.
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Customers manager */}
        {activeTab === 'customers' && (
          <div className="bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
            <h3 className="font-display font-bold text-wood-950 text-base pb-3 border-b border-wood-100">Registered Family Accounts ({customers.length})</h3>
            
            <div className="divide-y divide-wood-100 max-h-160 overflow-y-auto pr-2 text-xs sm:text-sm">
              {customers.map(cust => (
                <div key={cust.id} className="py-3 flex justify-between items-center gap-4">
                  <div>
                    <h4 className="font-display font-bold text-wood-950">{cust.full_name}</h4>
                    <p className="text-[10px] text-wood-400 mt-0.5">{cust.email} • Phone: {cust.phone || 'None listed'}</p>
                  </div>
                  <span className="text-[10px] bg-wood-100 text-wood-800 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                    {cust.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Gallery snapshot manager */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <form onSubmit={handleAddGallery} className="lg:col-span-5 bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display font-bold text-wood-950 text-base pb-2 border-b border-wood-100">Add Workshop Snap</h3>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Photo Title</label>
                <input
                  type="text" required value={galTitle} onChange={(e) => setGalTitle(e.target.value)}
                  placeholder="Artisanal sandpapering blocks"
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Image Link</label>
                <input
                  type="text" required value={galImage} onChange={(e) => setGalImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Stage Category</label>
                <select
                  value={galCat} onChange={(e) => setGalCat(e.target.value)}
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Finishing">Finishing</option>
                  <option value="Materials">Materials</option>
                  <option value="Playroom">Playroom</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Photo Caption Description</label>
                <textarea
                  required rows={3} value={galDesc} onChange={(e) => setGalDesc(e.target.value)}
                  placeholder="Explain what traditional woodcraft tools or honeybees waxing processes are active here..."
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg p-3 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full wood-btn-primary py-3 rounded-lg text-xs font-bold cursor-pointer"
              >
                Add Snapshot to Journal
              </button>
            </form>

            {/* List Column */}
            <div className="lg:col-span-7 bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display font-bold text-wood-950 text-base pb-2 border-b border-wood-100">Gallery Journal ({gallery.length})</h3>
              
              <div className="divide-y divide-wood-100 max-h-160 overflow-y-auto pr-2 text-xs sm:text-sm">
                {gallery.map(it => (
                  <div key={it.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-wood-50 rounded-lg overflow-hidden shrink-0 border border-wood-150">
                        <img src={it.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-wood-950">{it.title}</h4>
                        <p className="text-[10px] text-wood-400">{it.category}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteGallery(it.id)}
                      className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all border border-red-100 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 7: Reviews & Testimonials */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <form onSubmit={handleAddTestimonial} className="lg:col-span-5 bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display font-bold text-wood-950 text-base pb-2 border-b border-wood-100">Add Testimonial Quote</h3>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Parent Name</label>
                <input
                  type="text" required value={testiName} onChange={(e) => setTestiName(e.target.value)}
                  placeholder="Sophia Mitchell"
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Parent Role</label>
                <input
                  type="text" required value={testiRole} onChange={(e) => setTestiRole(e.target.value)}
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg px-3 py-2 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider block mb-1">Quote Text</label>
                <textarea
                  required rows={4} value={testiText} onChange={(e) => setTestiText(e.target.value)}
                  placeholder="My toddler plays with these sorting pegs for hours. The wood finish is incredibly silky and smells purely of forest logs..."
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg p-3 text-xs text-wood-950 focus:outline-hidden focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full wood-btn-primary py-3 rounded-lg text-xs font-bold cursor-pointer"
              >
                Add Testimonial Card
              </button>
            </form>

            {/* List Column */}
            <div className="lg:col-span-7 bg-white border border-wood-200 rounded-3xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display font-bold text-wood-950 text-base pb-2 border-b border-wood-100">Parent Testimonials ({testimonials.length})</h3>
              
              <div className="divide-y divide-wood-100 max-h-160 overflow-y-auto pr-2 text-xs sm:text-sm">
                {testimonials.map(it => (
                  <div key={it.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-wood-50 rounded-full overflow-hidden shrink-0 border border-wood-150">
                        <img 
                          src={it.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'} 
                          alt={it.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-wood-950">{it.name}</h4>
                        <p className="text-[10px] text-wood-500 font-medium italic">"{(it.comment || '').slice(0, 50)}..."</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTestimonial(it.id)}
                      className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all border border-red-100 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 8: Contact Messages Management */}
        {activeTab === 'messages' && (() => {
          const filteredMsgs = contactMessages.filter(msg => {
            const matchesSearch = 
              msg.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
              msg.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
              msg.subject.toLowerCase().includes(msgSearch.toLowerCase()) ||
              msg.message.toLowerCase().includes(msgSearch.toLowerCase()) ||
              (msg.phone && msg.phone.toLowerCase().includes(msgSearch.toLowerCase()));
            
            if (msgFilter === 'unread') return matchesSearch && msg.status === 'unread';
            if (msgFilter === 'read') return matchesSearch && msg.status === 'read';
            return matchesSearch;
          });

          return (
            <div className="space-y-8 animate-fade-in">
              {/* Filter controls and Search */}
              <div className="bg-white border border-wood-200 p-6 rounded-3xl shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                  <button
                    onClick={() => setMsgFilter('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      msgFilter === 'all'
                        ? 'bg-wood-800 text-white'
                        : 'bg-wood-50 text-wood-700 hover:bg-wood-100'
                    }`}
                  >
                    All Messages ({contactMessages.length})
                  </button>
                  <button
                    onClick={() => setMsgFilter('unread')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      msgFilter === 'unread'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Unread ({contactMessages.filter(m => m.status === 'unread').length})
                  </button>
                  <button
                    onClick={() => setMsgFilter('read')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      msgFilter === 'read'
                        ? 'bg-forest-700 text-white'
                        : 'bg-forest-50 text-forest-800 hover:bg-forest-100 border border-forest-100'
                    }`}
                  >
                    Read ({contactMessages.filter(m => m.status === 'read').length})
                  </button>
                </div>

                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search sender, email, subject, or word..."
                    value={msgSearch}
                    onChange={(e) => setMsgSearch(e.target.value)}
                    className="w-full bg-wood-50 border border-wood-200 rounded-xl px-4 py-2.5 text-xs text-wood-950 focus:outline-hidden focus:border-wood-600 focus:bg-white pl-10"
                  />
                  <div className="absolute left-3.5 top-3.5 text-wood-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                </div>
              </div>

              {/* Messages Grid/List */}
              <div className="grid grid-cols-1 gap-6">
                {filteredMsgs.length > 0 ? (
                  filteredMsgs.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`bg-white border transition-all rounded-3xl p-6 sm:p-8 shadow-2xs relative ${
                        msg.status === 'unread' 
                          ? 'border-amber-200 bg-amber-50/5 shadow-inner' 
                          : 'border-wood-200'
                      }`}
                    >
                      {msg.status === 'unread' && (
                        <div className="absolute top-6 right-6 flex items-center gap-1 bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          New Message
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-4 max-w-3xl">
                          <div>
                            <span className="text-[10px] text-wood-400 font-mono font-semibold block mb-1">
                              {new Date(msg.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                            <h3 className="font-display font-bold text-lg text-wood-950 flex items-center gap-2">
                              {msg.subject}
                            </h3>
                          </div>

                          <div className="p-4 sm:p-5 bg-wood-50 rounded-2xl border border-wood-100 text-sm text-wood-800 leading-relaxed whitespace-pre-wrap font-sans">
                            {msg.message}
                          </div>

                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-wood-600">
                            <div>
                              <span className="font-bold text-wood-700">Sender:</span> {msg.name}
                            </div>
                            <div>
                              <span className="font-bold text-wood-700">Email:</span>{' '}
                              <a href={`mailto:${msg.email}`} className="text-forest-700 hover:underline">
                                {msg.email}
                              </a>
                            </div>
                            {msg.phone && (
                              <div>
                                <span className="font-bold text-wood-700">Phone:</span> {msg.phone}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex md:flex-col gap-2 shrink-0 self-end md:self-start w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-wood-100">
                          <button
                            onClick={() => handleToggleMessageStatus(msg.id, msg.status)}
                            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all w-full ${
                              msg.status === 'unread'
                                ? 'bg-forest-50 border-forest-200 text-forest-700 hover:bg-forest-100'
                                : 'bg-wood-50 border-wood-200 text-wood-700 hover:bg-wood-100'
                            }`}
                          >
                            <Check className="w-4 h-4 shrink-0" />
                            {msg.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                          </button>

                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(`Dear ${msg.name},\n\nThank you for reaching out to Craft Kalash.\n\nBest Regards,\nBudhni Wooden Artist (Workshop Owner)\nCraft Kalash Budhni`)}`}
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer bg-wood-950 text-white hover:bg-wood-900 shadow-xs text-center w-full"
                          >
                            <Mail className="w-4 h-4 shrink-0" />
                            Reply via Email
                          </a>

                          {msg.phone && (
                            <a
                              href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs text-center w-full"
                            >
                              <ExternalLink className="w-4 h-4 shrink-0" />
                              WhatsApp Chat
                            </a>
                          )}

                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer bg-red-50 hover:bg-red-600 border border-red-100 text-red-600 hover:text-white transition-all w-full"
                          >
                            <Trash2 className="w-4 h-4 shrink-0" />
                            Delete Message
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-wood-200 rounded-3xl p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-wood-50 rounded-full flex items-center justify-center text-wood-400 mx-auto border border-wood-100">
                      <Inbox className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-wood-950">No messages found</h3>
                      <p className="text-xs text-wood-500 mt-1 max-w-sm mx-auto">
                        {msgSearch 
                          ? `No messages matched "${msgSearch}". Try adjusting your search query.`
                          : `There are no ${msgFilter !== 'all' ? msgFilter : ''} contact submissions in the queue yet.`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          );
        })()}

        {/* Tab 9: Database Setup & Synchronization diagnostics */}
        {activeTab === 'database' && (
          <div className="space-y-8 animate-fade-in text-wood-950">
            {/* Connection Status Card */}
            <div className="bg-white border border-wood-200 rounded-3xl p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-wood-100 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <div>
                    <h3 className="font-display font-bold text-lg text-wood-950">
                      {isSupabaseConfigured ? 'Supabase Connected' : 'Local Storage Mode'}
                    </h3>
                    <p className="text-xs text-wood-500 mt-0.5">
                      {isSupabaseConfigured 
                        ? `Live Cloud synchronization is currently ACTIVE.` 
                        : 'Using localized state fallback. Define Supabase keys to enable cloud storage.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSupabaseConfigured && (
                    <button
                      onClick={handleSeedDatabase}
                      disabled={seeding}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${seeding ? 'animate-bounce' : ''}`} />
                      {seeding ? 'Seeding...' : 'Seed Sample Products'}
                    </button>
                  )}

                  <button
                    onClick={runDiagnostics}
                    disabled={diagRunning}
                    className="bg-wood-950 text-white hover:bg-wood-900 px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${diagRunning ? 'animate-spin' : ''}`} />
                    {diagRunning ? 'Running Tests...' : 'Test Connection & Schema'}
                  </button>
                </div>
              </div>

              {/* URL/Keys indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 bg-wood-50 rounded-2xl border border-wood-100">
                  <span className="text-wood-400 font-medium block mb-1">SUPABASE URL</span>
                  <code className="text-wood-800 break-all">
                    {isSupabaseConfigured 
                      ? `${(import.meta as any).env.VITE_SUPABASE_URL.substring(0, 16)}...` 
                      : 'Missing in env'}
                  </code>
                </div>
                <div className="p-4 bg-wood-50 rounded-2xl border border-wood-100">
                  <span className="text-wood-400 font-medium block mb-1">ANON PUBLIC KEY</span>
                  <code className="text-wood-800 break-all">
                    {isSupabaseConfigured 
                      ? `${(import.meta as any).env.VITE_SUPABASE_ANON_KEY.substring(0, 16)}...` 
                      : 'Missing in env'}
                  </code>
                </div>
              </div>
            </div>

            {/* Seed Database Results */}
            {seedResult && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${seedResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {seedResult.success ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                  <span>{seedResult.success ? 'Success' : 'Seeding Failed'}</span>
                </div>
                <p>{seedResult.message}</p>
                {seedResult.success && (
                  <p className="mt-1 text-[10px] text-emerald-600">
                    💡 The initial premium products have been fully uploaded to your Supabase tables! Run the Test Connection below to verify.
                  </p>
                )}
              </div>
            )}

            {/* Diagnostic Results */}
            {diagResults && (
              <div className={`border p-6 rounded-3xl shadow-2xs ${diagResults.status === 'success' ? 'bg-emerald-50/20 border-emerald-200' : 'bg-red-50/10 border-red-200'}`}>
                <div className="flex items-start gap-3">
                  {diagResults.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-4 w-full">
                    <div>
                      <h4 className="font-display font-bold text-sm text-wood-950">Diagnostic Results</h4>
                      <p className="text-xs text-wood-600 mt-1">{diagResults.message}</p>
                    </div>

                    {diagResults.details.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {diagResults.details.map(t => (
                          <div key={t.table} className="bg-white border border-wood-200 rounded-2xl p-4 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-semibold text-wood-800">{t.table}</span>
                              <span className={`text-[10px] px-2 py-0.5 font-bold rounded-full uppercase tracking-wider ${
                                t.status === 'ok' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {t.status}
                              </span>
                            </div>
                            <div className="mt-3 flex items-baseline gap-1.5">
                              <span className="font-display font-bold text-lg text-wood-950">{t.count}</span>
                              <span className="text-[10px] text-wood-400 font-semibold uppercase tracking-wider">records</span>
                            </div>
                            {t.errorMsg && (
                              <p className="text-[10px] text-red-500 font-sans mt-2 border-t border-red-50 pt-2 break-words">
                                ⚠️ {t.errorMsg}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel: Steps to Connect */}
              <div className="bg-white border border-wood-200 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="font-display font-bold text-lg text-wood-950 flex items-center gap-2 border-b border-wood-100 pb-4">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  How to verify and link your database?
                </h3>
                
                <ol className="space-y-4 text-xs text-wood-700 leading-relaxed list-decimal pl-4">
                  <li>
                    <strong>Check your environment variables (.env):</strong> Ensure you have created a <code>.env</code> file in the project with <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> pointing to your live Supabase project.
                  </li>
                  <li>
                    <strong>Execute the SQL Schemas:</strong> Copy the master database creation script shown on the right, and paste it into your <strong>Supabase SQL Editor</strong> (located inside the Supabase console &rarr; SQL Editor tab &rarr; click "+ New query" &rarr; Paste &rarr; click "Run").
                  </li>
                  <li>
                    <strong>Test Connection:</strong> Click the <strong>"Test Connection & Schema"</strong> button above. If it returns <span className="text-emerald-600 font-bold">ok</span> for all tables, your database is successfully connected and integrated!
                  </li>
                  <li>
                    <strong>Live Verification:</strong> Go to the contact page, submit a contact form query, then return to the Admin panel under "Messages". You will see your query flowing directly from the cloud in real-time, shared across all admin sessions.
                  </li>
                </ol>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800">
                  💡 <strong>Razorpay Integration:</strong> Since the current order flow is styled for <strong>Cash on Delivery (COD)</strong> and mock instant transitions, you do not require a live payment gateway key (<code>VITE_RAZORPAY_KEY_ID</code>) for normal testing or offline operations. You can implement Razorpay payments in the future if a real payment collection gateway is desired.
                </div>
              </div>

              {/* Right Panel: MASTER SQL SCRIPT */}
              <div className="bg-wood-900 border border-wood-950 text-wood-100 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-wood-800 pb-4 mb-4">
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-amber-400">Master Supabase Schema Setup</h3>
                    <span className="text-[10px] bg-wood-955 border border-wood-800 text-wood-400 px-2 py-0.5 rounded-md font-mono">SQL Editor Code</span>
                  </div>
                  <p className="text-xs text-wood-300 leading-relaxed mb-4">
                    Copy and run this entire SQL script inside your Supabase project to automatically provision all 7 required tables with correct column typings, references, and auto-timestamps:
                  </p>
                  
                  <div className="bg-wood-950 rounded-2xl p-4 border border-wood-800 font-mono text-xs overflow-y-auto max-h-80 text-amber-200/95 leading-relaxed select-all scrollbar-thin">
                    {`-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  category_name TEXT,
  price REAL NOT NULL,
  discount_price REAL,
  images JSONB,
  description TEXT NOT NULL,
  features JSONB,
  specifications JSONB,
  stock_status TEXT DEFAULT 'in_stock',
  stock_quantity INTEGER DEFAULT 0,
  rating REAL DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  flipkart_link TEXT,
  is_featured BOOLEAN DEFAULT false
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  items JSONB NOT NULL,
  total_amount REAL NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar TEXT
);

-- 7. Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'unread'
);`}
                  </div>
                </div>

                <div className="pt-4 border-t border-wood-800 text-[11px] text-wood-400 flex items-center gap-1.5">
                  <span>💡 Double-click or press Ctrl+A inside the black script box to copy all queries instantly.</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
