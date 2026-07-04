import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, Heart, User as UserIcon, Search, 
  Menu, X, Settings, LogOut, ClipboardList, ChevronDown, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { currentUser, signOut } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-wood-200 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-wood-950 text-wood-100 text-[10px] font-bold uppercase tracking-wider py-2 px-4 text-center">
        ✨ Free shipping on heirloom toys for orders over $50! Use code <span className="font-mono bg-wood-900 px-1 py-0.5 rounded text-white font-semibold">FREESHIP</span> ✨
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/images/craft_kalash_logo_1782992126419.jpg" 
              alt="CraftKalash Logo" 
              className="h-12 w-12 object-contain rounded-lg border border-wood-100"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl tracking-tight text-wood-950 uppercase leading-none">
                CRAFT<span className="text-forest-500 font-serif italic font-normal">K</span>ALASH
              </span>
              <span className="text-[9px] uppercase tracking-[0.12em] text-forest-600 font-bold block mt-0.5">
                Sustainable Heirloom Toys
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop (Flipkart Inspired Clean search) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm mx-6 relative">
            <input
              type="text"
              placeholder="Search for stacking rings, rainbows, toy trains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-wood-50 text-wood-950 text-xs pl-4 pr-10 py-2.5 rounded-sm border border-wood-200 focus:outline-hidden focus:border-wood-600 focus:bg-white transition-all"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-wood-600 hover:text-wood-950 cursor-pointer">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-wood-800 hover:text-forest-500 transition-colors">Shop</Link>
            <Link to="/categories" className="text-xs font-bold uppercase tracking-widest text-wood-800 hover:text-forest-500 transition-colors">Categories</Link>
            <Link to="/gallery" className="text-xs font-bold uppercase tracking-widest text-wood-800 hover:text-forest-500 transition-colors">Gallery</Link>
            <Link to="/about" className="text-xs font-bold uppercase tracking-widest text-wood-800 hover:text-forest-500 transition-colors">Our Story</Link>
            <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-wood-800 hover:text-forest-500 transition-colors">Contact</Link>
          </div>

          {/* Icon Actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Admin / Portal Link - only visible on /admin route */}
            {location.pathname === '/admin' && (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-wood-100 transition-colors text-wood-800 hover:text-wood-950 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-wood-200 text-wood-950 flex items-center justify-center font-bold text-xs uppercase border border-wood-300">
                    {currentUser?.full_name ? currentUser.full_name.charAt(0) : <UserIcon className="w-4 h-4" />}
                  </div>
                  <span className="hidden sm:inline max-w-[120px] truncate">
                    {currentUser ? (currentUser.role === 'admin' ? 'Admin Portal' : currentUser.full_name) : 'Admin Access'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2.5 w-56 bg-white rounded-sm shadow-lg border border-wood-200 py-2 z-20"
                      >
                        {currentUser ? (
                          <>
                            <div className="px-4 py-2.5 border-b border-wood-100">
                              <p className="text-[10px] uppercase font-bold text-wood-500">Logged in as</p>
                              <p className="text-sm font-semibold text-wood-950 truncate">{currentUser.full_name}</p>
                              <p className="text-xs text-wood-400 truncate">{currentUser.email}</p>
                            </div>
                            
                            <Link 
                              to="/admin" 
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest-700 hover:bg-forest-50 hover:text-forest-900 transition-colors"
                            >
                              <Settings className="w-4 h-4 text-forest-600" />
                              Admin Dashboard
                            </Link>

                            <button 
                              onClick={() => {
                                setIsProfileDropdownOpen(false);
                                signOut();
                              }}
                              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors border-t border-wood-100 cursor-pointer"
                            >
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="px-4 py-3 text-center">
                              <p className="text-xs text-wood-600 mb-3">Owner & Admin Management Portal</p>
                              <Link 
                                to="/login"
                                onClick={() => setIsProfileDropdownOpen(false)}
                                className="block text-center py-2 bg-wood-950 hover:bg-wood-900 text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors"
                              >
                                Sign In
                              </Link>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-wood-800 hover:bg-wood-100 rounded-lg lg:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-wood-200 bg-white"
          >
            <div className="px-4 pt-3 pb-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search toys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-wood-50 text-wood-950 text-sm pl-4 pr-10 py-2 rounded-lg border border-wood-200"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-wood-600">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-wood-50 text-sm font-semibold text-wood-800">Shop Catalog</Link>
                <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-wood-50 text-sm font-semibold text-wood-800">Categories</Link>
                <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-wood-50 text-sm font-semibold text-wood-800">Process Gallery</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-wood-50 text-sm font-semibold text-wood-800">Our Story</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-wood-50 text-sm font-semibold text-wood-800">Contact</Link>
                <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-wood-50 text-sm font-semibold text-wood-800">FAQs</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
