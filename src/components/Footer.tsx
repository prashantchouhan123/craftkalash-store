import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, ShieldCheck, TreePine, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-wood-950 text-wood-200 border-t-4 border-wood-800">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-wood-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
            <h3 className="font-display font-semibold text-xl text-white tracking-tight">Join our CraftKalash Family</h3>
            <p className="text-sm text-wood-400 mt-1">Get early access to seasonal toy releases, gift guides, and woodworking secrets.</p>
          </div>
          <div className="lg:col-span-2">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-wood-900 border border-wood-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:border-wood-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-wood-700 hover:bg-wood-600 active:translate-y-px text-white font-medium text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                {subscribed ? 'Thanks for subscribing! ✨' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="/src/assets/images/craft_kalash_logo_1782992126419.jpg" 
              alt="CraftKalash Logo" 
              className="h-12 w-12 object-contain rounded-lg border border-wood-800"
              referrerPolicy="no-referrer"
            />
            <span className="font-display font-bold text-lg text-white">CraftKalash</span>
          </div>
          <p className="text-sm text-wood-400 leading-relaxed">
            Crafting beautiful, durable heirloom toys from sustainable timber. Every piece is hand-turned, hand-painted, and polished with love to spark your child's imagination safely.
          </p>
          {/* Trust badges */}
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-wood-400" title="Sustainable FSC Lumber Only">
              <TreePine className="w-4 h-4 text-forest-500" />
              <span>FSC Wood</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-wood-400" title="ASTM Safety Certified">
              <ShieldCheck className="w-4 h-4 text-forest-500" />
              <span>ASTM Child-Safe</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/shop" className="text-wood-400 hover:text-white transition-colors">Shop All Toys</Link></li>
            <li><Link to="/categories" className="text-wood-400 hover:text-white transition-colors">Shop by Category</Link></li>
            <li><Link to="/gallery" className="text-wood-400 hover:text-white transition-colors">Our Workshop Gallery</Link></li>
            <li><Link to="/about" className="text-wood-400 hover:text-white transition-colors">Our Story & Craft</Link></li>
            <li><Link to="/faq" className="text-wood-400 hover:text-white transition-colors">Frequently Asked Questions</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/contact" className="text-wood-400 hover:text-white transition-colors">Get in Touch</Link></li>
            <li><Link to="/faq" className="text-wood-400 hover:text-white transition-colors">Safety Standards</Link></li>
            <li><Link to="/gallery" className="text-wood-400 hover:text-white transition-colors">Workshop Journal</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase mb-4">Workshop Contact</h4>
          <ul className="space-y-4 text-sm text-wood-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-wood-500 shrink-0 mt-0.5" />
              <span>7/77, Jhanda Chouk, Budhni, Madhya Pradesh 466445</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-wood-500 shrink-0" />
              <span>+91 93034 36134</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-wood-500 shrink-0" />
              <span>craftkalash.store@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright & Social bar */}
      <div className="bg-black/25 py-6 text-xs text-wood-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            &copy; {new Date().getFullYear()} CraftKalash. All rights reserved. Made with <Heart className="inline w-3 h-3 text-red-500" /> for generations of play.
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
