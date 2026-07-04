import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Page Imports
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Categories } from './pages/Categories';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

// Smooth Scroll Restoration helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-wood-50 text-wood-950 selection:bg-wood-200 selection:text-wood-950">
          
          {/* Universal Header */}
          <Navbar />

          {/* Main App Content Router */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={
                <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
                  <h1 className="font-display font-bold text-4xl text-wood-950">Wood Cabin 404</h1>
                  <p className="text-sm text-wood-500 max-w-sm mx-auto">This trail doesn't lead back to the timber toy carving shed. Let's guide you back.</p>
                  <Link to="/" className="wood-btn-primary px-6 py-3 rounded-xl text-xs font-semibold inline-block">
                    Return to Safe Ground
                  </Link>
                </div>
              } />
            </Routes>
          </main>

          {/* Universal Footer */}
          <Footer />

        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
