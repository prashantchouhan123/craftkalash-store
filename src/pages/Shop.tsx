import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { dbService } from '../services/db';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, X, ArrowUpDown, HelpCircle } from 'lucide-react';

export const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // States for filter values
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState<number>(10000); // Max ₹10000
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync params from URL
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const loadCatalog = async () => {
      setIsLoading(true);
      const allProducts = await dbService.products.getAll();
      const allCategories = await dbService.categories.getAll();
      setProducts(allProducts);
      setCategories(allCategories);
      setIsLoading(false);
    };
    loadCatalog();
  }, []);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // 1. Search Query
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.category_name.toLowerCase().includes(query);

    // 2. Category Filter
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      const catObj = categories.find(c => c.slug === selectedCategory);
      if (catObj) {
        matchesCategory = product.category_id === catObj.id;
      }
    }

    // 3. Price Filter
    const activePrice = product.discount_price || product.price;
    const matchesPrice = activePrice <= priceRange;

    // 4. Stock Filter
    const matchesStock = !showInStockOnly || product.stock_status !== 'out_of_stock';

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discount_price || a.price;
    const priceB = b.discount_price || b.price;

    if (sortBy === 'price-low') {
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      return priceB - priceA;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0; // Featured / Default
  });

  // Pagination calculation
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
    
    // Update URL query params
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set('q', searchQuery.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange(150);
    setSortBy('featured');
    setShowInStockOnly(false);
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="bg-wood-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title bar */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="font-display font-bold text-3xl text-wood-950">Heirloom Catalog</h1>
          <p className="text-xs sm:text-sm text-wood-500 mt-1">Sustainably harvested German Linden & North American Maple toys.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ========================================================== */}
          {/* SIDEBAR FILTERS (DESKTOP) */}
          {/* ========================================================== */}
          <div className="lg:col-span-1 bg-white border border-wood-200 rounded-2xl p-5 sm:p-6 h-fit space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-wood-100">
              <span className="font-display font-bold text-wood-950 flex items-center gap-2 text-base">
                <SlidersHorizontal className="w-4 h-4 text-wood-700" /> Filters
              </span>
              <button 
                onClick={handleClearFilters}
                className="text-xs font-semibold text-forest-600 hover:text-forest-800 transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Search Input Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-wood-600 block">Search Query</label>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Enter keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-wood-50 text-wood-950 text-xs pl-3.5 pr-8 py-2.5 rounded-lg border border-wood-200 focus:outline-hidden focus:border-wood-600 focus:bg-white transition-all"
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-wood-500 hover:text-wood-800 cursor-pointer">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

              {/* Categories filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-wood-600 block">Categories</label>
                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      selectedCategory === 'all' 
                        ? 'bg-wood-800 text-white font-semibold' 
                        : 'text-wood-700 hover:bg-wood-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === cat.slug 
                          ? 'bg-wood-800 text-white font-semibold' 
                          : 'text-wood-700 hover:bg-wood-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

            {/* Stock Availability Filter */}
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-wood-800 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={(e) => {
                    setShowInStockOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded border-wood-300 text-wood-800 focus:ring-wood-800 cursor-pointer"
                />
                In Stock Items Only
              </label>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CATALOG DISPLAY & TOOLBAR */}
          {/* ========================================================== */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white border border-wood-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm font-semibold text-wood-700">
                Showing <span className="text-wood-950 font-bold">{totalItems}</span> matching hand-crafted pieces
              </p>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-wood-500 font-medium whitespace-nowrap flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-wood-50 border border-wood-200 text-wood-950 text-xs rounded-lg px-3 py-1.5 focus:outline-hidden focus:border-wood-600 font-medium cursor-pointer"
                >
                  <option value="featured">Featured Favorites</option>
                  <option value="rating">Top Customer Ratings</option>
                  <option value="name">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Catalog Grid */}
            {isLoading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="animate-pulse space-y-4 text-center">
                  <div className="w-12 h-12 border-4 border-wood-800 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-wood-500">Carefully carving wood catalog...</p>
                </div>
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map(prod => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 pt-6">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-wood-200 bg-white hover:bg-wood-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`w-9 h-9 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          currentPage === idx + 1
                            ? 'bg-wood-800 text-white shadow-xs'
                            : 'bg-white border border-wood-200 text-wood-700 hover:bg-wood-100'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-wood-200 bg-white hover:bg-wood-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white border border-wood-200 rounded-2xl py-16 px-4 text-center space-y-4">
                <div className="w-16 h-16 bg-wood-50 rounded-full flex items-center justify-center text-wood-400 mx-auto">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-wood-950 text-lg">No wooden toys matching search parameters</h3>
                <p className="text-xs text-wood-500 max-w-sm mx-auto">
                  Try adjusting filters or checking for spelling typos. Or reset the filters to see our standard catalog.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="wood-btn-primary px-5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
