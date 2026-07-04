import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../services/db';
import { Product, Category, Testimonial } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Accordion } from '../components/Accordion';
import { 
  ArrowRight, ShieldCheck, TreePine, Sparkles, Smile,
  HeartHandshake, ChevronRight, Hammer, Award, Star
} from 'lucide-react';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await dbService.products.getAll();
      const featured = allProducts.filter(p => p.is_featured);
      setFeaturedProducts(featured.length > 0 ? featured : allProducts.slice(0, 4));
      setBestSellers(allProducts.filter(p => p.category_id === 'cat-8' || p.name.toLowerCase().includes('walker')));
      
      const allCategories = await dbService.categories.getAll();
      setCategories(allCategories.slice(0, 8));

      const allTestimonials = await dbService.testimonials.getAll();
      setTestimonials(allTestimonials);
    };

    fetchData();
  }, []);

  const trustBadges = [
    {
      icon: <TreePine className="w-6 h-6 text-forest-600" />,
      title: "100% Sustainable Woods",
      desc: "Exclusively harvested from certified FSC forests, replenishing double the trees we use."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-forest-600" />,
      title: "ASTM Certified Child-Safe",
      desc: "Exceeded stringent safety tests. Lead-free, chemical-free, and perfectly rounded edges."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-forest-600" />,
      title: "Organic Beeswax Polish",
      desc: "Sealed with warm organic beeswax and linseed oil, providing a safe, aromatic sensory glaze."
    },
    {
      icon: <Smile className="w-6 h-6 text-forest-600" />,
      title: "Montessori-Approved",
      desc: "Designed in collaboration with child developmentalists to nurture focus and fine motor skills."
    }
  ];

  const processSteps = [
    {
      num: "01",
      title: "Ethical Wood Sourcing",
      desc: "We hand-select premium boards of Maple, Birch, Cherry, and Walnut with rich grain and zero chemical history."
    },
    {
      num: "02",
      title: "Artisanal Carving",
      desc: "Experienced timber craftsmen hand-cut and hollow every joint in our Oregon-based woodworking workshop."
    },
    {
      num: "03",
      title: "Precision Silky Sanding",
      desc: "Each toy undergoes three stages of careful tumbling and sanding until it is soft and silky to a child's skin."
    },
    {
      num: "04",
      title: "All-Natural Sealant",
      desc: "We paint with eco-friendly water-based stains or milk paint, and finish with our edible honey-beeswax oil blend."
    }
  ];

  const previewFaqs = [
    {
      title: "What makes wooden toys safer than plastic alternatives?",
      content: "Plastic toys often contain harmful chemicals, BPA, or phthalates, and break easily into sharp fragments. Our handcrafted toys are made from dense North American maple and beech woods, meaning they never shatter, contain zero toxins, have naturally antibacterial surfaces, and are perfectly safe for babies who put toys in their mouths."
    },
    {
      title: "How do I clean and maintain my CraftKalash wooden toys?",
      content: "Cleaning is easy! Simply wipe the toy with a damp cloth and mild dish soap, then let it air dry. Avoid soaking wooden toys in water, boiling them, or using harsh disinfectants, as water swells wood and alters grain. Over years of play, you can restore its original beautiful sheen by rubbing it with a little olive oil or organic beeswax!"
    },
    {
      title: "What are your shipping policies and return options?",
      content: "We ship carbon-neutral worldwide! Shipping is completely free within the US for orders exceeding $50. Since we stand behind our heirloom quality, we offer a lifetime guarantee: if any piece breaks during reasonable play, we will repair or replace it for free. You also have 30 days to return unused products for any reason."
    }
  ];

  return (
    <div className="bg-wood-50 min-h-screen">
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden bg-wood-100 py-16 lg:py-24 border-b border-wood-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-200/50 border border-forest-600/10 text-forest-800 text-xs font-bold uppercase tracking-wider rounded-full">
              <Award className="w-3.5 h-3.5" /> Handcrafted Heirloom Toys Since 1994
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-wood-950 leading-tight tracking-tight">
              Simple toys for <span className="text-wood-800 italic font-medium">limitless</span> imaginations.
            </h1>
            
            <p className="text-base text-wood-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Ditch the screens. Invite tactile curiosity with beautiful Montessori wooden toys carved with sustainable lumber, organic beeswax, and generations of craftsmanship.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="wood-btn-primary px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
              >
                Explore Heirloom Catalog
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="wood-btn-secondary px-8 py-4 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                Meet the Craftsmen
              </Link>
            </div>
          </div>

          {/* Hero Image Block */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl border-4 border-white bg-wood-200">
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80"
                alt="Beautiful stacking wooden toys"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Ambient trust overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-5 rounded-sm shadow-lg border border-wood-200 flex items-center gap-3.5 max-w-xs">
              <div className="w-12 h-12 bg-forest-50 rounded-sm flex items-center justify-center text-forest-700 shrink-0">
                <TreePine className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-wood-950 text-sm">FSC Certified Beech</h4>
                <p className="text-xs text-wood-500">Every branch is replanted twofold.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CIRCULAR CATEGORIES PREVIEW */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-wood-950 tracking-tight">Shop by Category</h2>
          <p className="text-sm text-wood-500 mt-1.5">Curated selections tailored for child growth milestones.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/shop?category=${cat.slug}`} 
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-sm overflow-hidden border border-wood-200 group-hover:border-wood-950 shadow-xs transition-all duration-300 relative bg-wood-100">
                <img 
                  src={cat.image_url} 
                  alt={cat.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-display font-bold text-wood-950 text-sm mt-3.5 group-hover:text-forest-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-forest-600 font-bold tracking-widest uppercase flex items-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ChevronRight className="w-3 h-3 ml-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="bg-white py-16 border-y border-wood-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4 text-center sm:text-left">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-wood-950 tracking-tight">Featured Wooden Toys</h2>
              <p className="text-sm text-wood-500 mt-1.5">Fresh from our workshop, crafted to ignite raw playtime curiosity.</p>
            </div>
            <Link 
              to="/shop" 
              className="wood-btn-secondary px-5 py-2.5 text-xs font-semibold flex items-center gap-2 hover:-translate-y-px"
            >
              See All Heirloom Toys
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (TRUST & SAFETY DETAIL) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl text-wood-950 tracking-tight">Pure, Clean, Safe. No Exceptions.</h2>
          <p className="text-sm text-wood-500 mt-2">
            Plastic breaks. Electronic noise pollutes focus. Here is why our handcrafted natural timber is the standard for healthy play.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="bg-white border border-wood-200 p-6 sm:p-8 rounded-sm relative shadow-xs text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-forest-50 rounded-sm flex items-center justify-center text-forest-700 mb-5 border border-forest-100">
                {badge.icon}
              </div>
              <h3 className="font-display font-bold text-wood-950 text-base mb-2.5">{badge.title}</h3>
              <p className="text-xs text-wood-600 leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BEST SELLERS SECTION */}
      <section className="bg-wood-100 py-16 border-t border-b border-wood-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-wood-950 tracking-tight">Family Favorites & Best Sellers</h2>
            <p className="text-sm text-wood-500 mt-1.5">Our most beloved, highly-rated heirloom pieces validated by thousands of children.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. MANUFACTURING PROCESS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-forest-600 uppercase tracking-widest block">Heirloom Integrity</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-wood-950 leading-tight">From FSC Forest to Your Child's Hands</h2>
            <p className="text-sm text-wood-600 leading-relaxed">
              We care about the world our children inherit. That is why every stacker, train, and arch is carved by hand in our local carbon-neutral Oregon workshop. No assembly lines. Just master carpenters, natural dyes, and premium timber.
            </p>
            <div className="pt-4 flex gap-4">
              <div className="flex items-center gap-2">
                <Hammer className="w-5 h-5 text-wood-800" />
                <span className="text-xs font-bold text-wood-900">Handcrafted in USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-wood-800" />
                <span className="text-xs font-bold text-wood-900">Certified Non-Toxic</span>
              </div>
            </div>
            <div className="pt-4">
              <Link 
                to="/gallery" 
                className="wood-btn-primary px-6 py-3 text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                Tour Our Workshop Gallery
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-sm border border-wood-200 shadow-xs relative">
                <span className="absolute top-4 right-4 text-4xl font-display font-black text-wood-100 select-none">
                  {step.num}
                </span>
                <h3 className="font-display font-bold text-wood-950 text-sm mb-2 relative z-10">{step.title}</h3>
                <p className="text-xs text-wood-600 leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REVIEWS & TESTIMONIAL CAROUSEL */}
      <section className="bg-white py-16 border-y border-wood-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-wood-950 tracking-tight">Parent Stories</h2>
            <p className="text-sm text-wood-500 mt-1.5">See why educators and caregivers trust CraftKalash with sensory development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div key={test.id} className="bg-wood-50 border border-wood-200 p-6 sm:p-8 rounded-sm flex flex-col justify-between">
                <div>
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-wood-700 italic leading-relaxed mb-6">
                    "{test.comment}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <img 
                    src={test.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'} 
                    alt={test.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-wood-200"
                  />
                  <div>
                    <h4 className="font-display font-bold text-wood-950 text-sm">{test.name}</h4>
                    <p className="text-[10px] text-forest-600 font-bold uppercase tracking-wider">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION PREVIEW */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-wood-950 tracking-tight">Have Questions?</h2>
          <p className="text-sm text-wood-500 mt-1.5">Common questions from parents about safety, maintenance, and ordering.</p>
        </div>

        <Accordion items={previewFaqs} />

        <div className="text-center mt-8">
          <Link 
            to="/faq" 
            className="text-xs font-bold text-wood-800 hover:text-wood-950 flex items-center justify-center gap-1.5 hover:underline"
          >
            Read All Frequently Asked Questions
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
