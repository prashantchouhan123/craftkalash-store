import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../services/db';
import { Category } from '../types';
import { ChevronRight, Sparkles } from 'lucide-react';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      const all = await dbService.categories.getAll();
      setCategories(all);
      setIsLoading(false);
    };
    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-wood-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-wood-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-wood-500">Loading wooden toy categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-wood-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header editorial block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-forest-600 uppercase tracking-widest block mb-3">Milestone Curations</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-wood-950 tracking-tight leading-tight">
            Toys Designed for Creative Growth Phases
          </h1>
          <p className="text-sm text-wood-600 mt-4 leading-relaxed">
            Instead of loud screens that passive-feed attention, explore wooden collections configured to trigger tactile thinking, problem-solving, and coordination at every key milestone.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={cat.id} 
              className="group bg-white border border-wood-200 rounded-3xl overflow-hidden shadow-xs hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="aspect-[16/10] bg-wood-100 overflow-hidden relative">
                <img 
                  src={cat.image_url} 
                  alt={cat.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-wood-800 uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-forest-600" /> Collection {idx + 1}
                </div>
              </div>

              {/* Text Section */}
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="font-display font-bold text-wood-950 text-xl mb-3 group-hover:text-wood-800 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-wood-600 leading-relaxed mb-6 flex-1">
                  {cat.description}
                </p>
                <div className="pt-4 border-t border-wood-100">
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="w-full bg-wood-100 hover:bg-wood-800 text-wood-800 hover:text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    Browse {cat.name}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
