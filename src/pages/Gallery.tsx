import React, { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { GalleryItem } from '../types';
import { Camera, Eye, Heart, Hammer, Sparkles, Sliders } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('Amazon Banners');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedList, setLikedList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      setIsLoading(true);
      const items = await dbService.gallery.getAll();
      setGallery(items);
      setIsLoading(false);

      // Seed mock likes count
      const seedLikes: Record<string, number> = {};
      items.forEach(it => {
        seedLikes[it.id] = Math.floor(15 + Math.random() * 45);
      });
      setLikes(seedLikes);
    };
    loadGallery();
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedList.includes(id)) {
      setLikedList(prev => prev.filter(item => item !== id));
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
    } else {
      setLikedList(prev => [...prev, id]);
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const categories = ['all', 'Amazon Banners', 'Workshop', 'Finishing', 'Materials', 'Playroom'];

  const filteredGallery = gallery.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-wood-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-wood-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-wood-500">Loading carving gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-wood-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery intro editorial */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-forest-600 uppercase tracking-widest block mb-3">Our Workshop Journal</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-wood-950 tracking-tight leading-tight">
            The Art of Handcrafted Woodwork
          </h1>
          <p className="text-sm text-wood-600 mt-4 leading-relaxed">
            Take a visual tour inside our local workshop. From raw hardwood trunks to meticulously sanded arcs, see how we craft magic using traditional woodworking tools and organic honey waxes.
          </p>
        </div>

        {/* Gallery filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer capitalize ${
                activeFilter === cat
                  ? 'bg-wood-800 text-white border-wood-800 shadow-sm'
                  : 'bg-white text-wood-700 border-wood-200 hover:bg-wood-50 hover:border-wood-500'
              }`}
            >
              {cat === 'all' ? 'Show All Stages' : cat}
            </button>
          ))}
        </div>

        {/* Masonry image grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item) => {
              const isLiked = likedList.includes(item.id);
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-white border border-wood-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  {/* Photo relative wrapper */}
                  <div className="aspect-[4/3] bg-wood-100 overflow-hidden relative">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    
                    {/* Dark gradient mask on hover */}
                    <div className="absolute inset-0 bg-wood-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-wood-800 scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Left floating category tag */}
                    {item.category && (
                      <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[9px] font-bold text-wood-800 uppercase tracking-widest shadow-xs">
                        {item.category}
                      </span>
                    )}

                    {/* Right floating heart clicker */}
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs text-xs font-semibold text-wood-600 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500 text-none' : ''}`} />
                      <span>{likes[item.id] || 0}</span>
                    </button>
                  </div>

                  {/* Caption box */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-wood-950 text-base mb-2 group-hover:text-wood-800 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-wood-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-wood-200 rounded-3xl py-16 text-center text-wood-500 text-sm">
            No gallery logs found under this filter category.
          </div>
        )}

        {/* ========================================================== */}
        {/* LIGHTBOX POPUP MODAL */}
        {/* ========================================================== */}
        {selectedItem && (
          <div 
            className="fixed inset-0 z-50 bg-wood-950/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div 
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-wood-200 relative animate-in zoom-in duration-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              {/* Photo */}
              <div className="aspect-[16/10] bg-wood-100">
                <img 
                  src={selectedItem.image_url} 
                  alt={selectedItem.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    {selectedItem.category && (
                      <span className="text-[10px] uppercase font-black tracking-widest text-forest-600">
                        {selectedItem.category} Stage
                      </span>
                    )}
                    <h3 className="font-display font-bold text-wood-950 text-xl leading-tight">
                      {selectedItem.title}
                    </h3>
                  </div>
                  
                  <div className="flex gap-4 text-xs font-semibold text-wood-600">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-wood-400" /> Professional Photo
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-wood-600 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="flex gap-2 pt-2 border-t border-wood-100 text-[10px] font-bold text-forest-700">
                  <span className="bg-forest-50 border border-forest-100 px-2.5 py-1 rounded">✓ Reusable Image</span>
                  <span className="bg-forest-50 border border-forest-100 px-2.5 py-1 rounded">✓ Clean Grid Compatible</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
