import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star, Eye, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountPercent = product.price && product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100) 
    : 0;

  const flipkartLink = product.flipkart_link || `https://www.flipkart.com/search?q=${encodeURIComponent(product.name)}`;

  return (
    <div className="wood-card group relative flex flex-col h-full bg-white rounded-sm border border-wood-200 overflow-hidden shadow-xs transition-all duration-300 hover:shadow-md">
      {/* Product Image Section */}
      <div className="relative block overflow-hidden aspect-square bg-wood-50">
        {/* Main image link */}
        <Link to={`/product/${product.id}`} className="absolute inset-0 block w-full h-full z-0">
          {/* Product Image */}
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3.5 left-3.5 z-10 bg-forest-600 text-white font-mono text-[9px] font-bold px-2 py-1 rounded-sm shadow-xs uppercase tracking-widest">
            {discountPercent}% OFF
          </span>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-wood-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2 pointer-events-none">
          <div className="pointer-events-auto">
            <Link
              to={`/product/${product.id}`}
              className="p-2.5 rounded-sm bg-white text-wood-900 hover:bg-wood-950 hover:text-white shadow-md transition-all scale-90 group-hover:scale-100 cursor-pointer border border-wood-200 inline-block"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex justify-between items-center gap-2 mb-1.5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-forest-600">
            {product.category_name}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-sm text-amber-700 text-xs font-semibold">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="block mb-2 hover:text-forest-600 transition-colors">
          <h3 className="font-display font-bold text-wood-950 leading-tight text-sm line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Description Snippet */}
        <p className="text-xs text-wood-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Price & Buy Action */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-wood-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-forest-600 uppercase tracking-wider">Heirloom Quality</span>
            <span className="text-[8px] text-wood-400">Latest Spec</span>
          </div>

          {product.flipkart_link ? (
            <a
              href={product.flipkart_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-[#ff9f00] hover:bg-[#f39200] text-white rounded-sm flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Buy
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <span className="px-3 py-2 text-wood-500 bg-wood-50 rounded-sm text-[9px] font-bold uppercase tracking-widest border border-wood-200">
              Catalog Piece
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
