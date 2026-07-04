import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';
import { Product, Review } from '../types';
import { Star, ShieldCheck, TreePine, Award, Calendar, Send, ExternalLink } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Review form states
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      if (!id) return;
      setIsLoading(true);
      const prod = await dbService.products.getById(id);
      if (prod) {
        setProduct(prod);
        setActiveImage(prod.images[0]);

        // Fetch reviews
        const revs = await dbService.reviews.getByProductId(prod.id);
        setReviews(revs);

        // Fetch related products
        const allProds = await dbService.products.getAll();
        const related = allProds.filter(p => p.category_id === prod.category_id && p.id !== prod.id);
        setRelatedProducts(related.slice(0, 4));
      }
      setIsLoading(false);
    };

    loadDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-wood-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-wood-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-wood-500">Retrieving woodcraft details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-display font-bold text-2xl text-wood-950">Toy Not Found</h2>
        <p className="text-sm text-wood-500">The wooden piece you are looking for has been archived or sold out.</p>
        <Link to="/shop" className="wood-btn-primary px-6 py-3 rounded-xl text-xs font-semibold inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const discountPercent = product.price && product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100) 
    : 0;

  const flipkartLink = product.flipkart_link || `https://www.flipkart.com/search?q=${encodeURIComponent(product.name)}`;

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewComment.trim()) {
      const nameToSubmit = reviewName.trim() || 'Parent Reviewer';
      const newRev = await dbService.reviews.add(product.id, reviewRating, reviewComment, nameToSubmit);
      
      // Update reviews state
      setReviews(prev => [newRev, ...prev]);

      // Refresh product data so average rating & reviews_count updates in real time
      const updatedProd = await dbService.products.getById(product.id);
      if (updatedProd) setProduct(updatedProd);

      // Reset form
      setReviewName('');
      setReviewRating(5);
      setReviewComment('');
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-wood-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-wood-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-wood-950">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-wood-950">Shop</Link>
          <span>/</span>
          <span className="text-wood-800 font-semibold">{product.name}</span>
        </div>

        {/* Product details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl border border-wood-200 p-6 sm:p-10 shadow-xs mb-16">
          
          {/* 1. Image Panel (Left Columns) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square bg-wood-50 rounded-2xl overflow-hidden border border-wood-200 relative">
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-forest-600 text-white font-mono text-xs font-bold px-2.5 py-1 rounded-md shadow-sm z-10 animate-pulse">
                  {discountPercent}% OFF
                </span>
              )}
              <img 
                src={activeImage} 
                alt={product.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-18 h-18 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-wood-50 ${
                      activeImage === img ? 'border-wood-800 shadow-xs' : 'border-wood-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Buy Box & Main Details (Right Columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-forest-600">
                {product.category_name}
              </span>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-wood-950 leading-tight mt-1">
                {product.name}
              </h1>
              
              {/* Rating header */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-amber-500 text-amber-500' 
                          : 'text-wood-200'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-wood-700">{product.rating} / 5.0</span>
                <span className="text-xs text-wood-400">({reviews.length} parent reviews)</span>
              </div>
            </div>

            {/* Pricing block */}
            <div className="bg-wood-50/50 p-4 rounded-xl border border-wood-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-wood-400 tracking-wider">Authenticity</p>
                <span className="text-sm font-bold text-forest-600 uppercase tracking-widest block mt-1">Premium Handcrafted Piece</span>
              </div>

              <div>
                {product.flipkart_link ? (
                  <span className="bg-forest-50 border border-forest-100 text-forest-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm inline-block">
                    ✓ Available on Flipkart
                  </span>
                ) : (
                  <span className="bg-amber-50 border border-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm inline-block">
                    ✓ 100% Heirloom Authentic
                  </span>
                )}
              </div>
            </div>

            {/* Core description */}
            <p className="text-xs sm:text-sm text-wood-600 leading-relaxed">
              {product.description}
            </p>

            {/* Bullet features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-wood-800">Key Craft Elements</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-wood-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-forest-600 rounded-full shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Flipkart purchase box */}
            {product.flipkart_link ? (
              <div className="space-y-4 pt-6 border-t border-wood-100">
                <a
                  href={product.flipkart_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#ff9f00] hover:bg-[#f39200] text-white font-bold text-sm py-4 px-6 rounded-sm text-center shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Buy Now
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
                <div className="text-center">
                  <span className="text-[10px] text-wood-400 font-semibold tracking-wider uppercase">Official Flipkart Affiliate Link</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-6 border-t border-wood-100">
                <div className="w-full bg-wood-100 text-wood-700 font-bold text-sm py-4 px-6 rounded-sm text-center border border-wood-200">
                  Exclusively Available via Catalog Inquiry
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-wood-400 font-semibold tracking-wider uppercase">Heirloom Handcrafted Craftsmanship</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 3. Specifications Sheet (Montessori/Safety breakdown) */}
        <div className="bg-white rounded-3xl border border-wood-200 p-6 sm:p-10 mb-16 shadow-xs">
          <h2 className="font-display font-bold text-xl text-wood-950 mb-6">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-t border-wood-100 pt-6">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-wood-50 text-xs sm:text-sm">
                <span className="font-medium text-wood-500">{key}</span>
                <span className="font-semibold text-wood-950 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Customer Review Form & Submissions list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl border border-wood-200 p-6 sm:p-10 shadow-xs mb-16">
          
          {/* Reviews list (Left column) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-bold text-xl text-wood-950">Parent Feedbacks & Reviews</h2>
            
            {reviews.length > 0 ? (
              <div className="space-y-6 max-h-128 overflow-y-auto pr-2">
                {reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-wood-100 pb-5">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-display font-bold text-wood-950 text-sm">{rev.user_name}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-wood-200'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-wood-400 ml-1">Verified Purchase</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-wood-400 font-medium font-mono">
                        {new Date(rev.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-wood-600 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-wood-500 text-xs sm:text-sm">
                Be the first parent to share a feedback on this wooden toy piece!
              </div>
            )}
          </div>

          {/* Add Review Form (Right column) */}
          <div className="lg:col-span-5 bg-wood-50 p-6 rounded-2xl border border-wood-200 space-y-4">
            <h3 className="font-display font-bold text-base text-wood-950">Write a Review</h3>
            
            {reviewSubmitted && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-lg text-xs font-semibold">
                ✨ Thank you! Your verified parent review was submitted and the rating score has been updated.
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-wood-600 block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Sophia Mitchell"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full bg-white border border-wood-200 rounded-lg px-3.5 py-2 text-xs text-wood-950 focus:outline-hidden focus:border-wood-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-wood-600 block mb-1.5">Rating Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= reviewRating ? 'fill-amber-500 text-amber-500' : 'text-wood-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-wood-600 block mb-1">Comment</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell other families about the wood grain, smells, smooth finishes, or how your child plays with this wooden piece..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-white border border-wood-200 rounded-lg p-3.5 text-xs text-wood-950 focus:outline-hidden focus:border-wood-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* 5. Related/Recommended Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-wood-950 mb-6">Families Also Bought</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
