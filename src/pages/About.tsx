import React from 'react';
import { TreePine, Hammer, Heart, ShieldAlert, Award, Star } from 'lucide-react';
// @ts-ignore
import storyImage from '../assets/images/regenerated_image_1783147499765.png';

export const About: React.FC = () => {
  return (
    <div className="bg-wood-50 min-h-screen py-12">
      {/* Editorial Headline */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-3">Our Core Philosophy</span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-wood-950 tracking-tight leading-tight">
          Sustaining Traditional Woodworking, Crafting Timeless Childhood Joy.
        </h1>
        <p className="text-sm sm:text-base text-wood-700 mt-5 leading-relaxed max-w-2xl mx-auto">
          Welcome to Craft Kalash, where we combine the rich heritage of traditional Indian woodworking with modern safety and quality standards to create heirloom-quality wooden treasures.
        </p>
      </section>

      {/* Interactive Story Canvas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-wood-200 bg-wood-100">
              <img 
                src={storyImage} 
                alt="Artisan handcrafting premium wooden toys with traditional skills" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-wood-950">Our Story</h2>
            <p className="text-sm text-wood-600 leading-relaxed">
              At <strong>Craft Kalash</strong>, we are passionate about creating premium handcrafted wooden products that combine traditional Indian craftsmanship with modern quality standards. As an e-commerce brand by <strong>Budhni Wooden Artist</strong>, we specialize in beautifully made wooden baby walkers, toys, and handcrafted wooden creations using carefully selected natural wood.
            </p>
            <p className="text-sm text-wood-600 leading-relaxed">
              Every product is designed with a focus on safety, durability, functionality, and timeless craftsmanship, bringing authentic handmade excellence to families across India.
            </p>
            <p className="text-sm text-wood-600 leading-relaxed font-semibold italic text-wood-800">
              "Our mission is to preserve traditional woodworking while delivering trusted, high-quality products directly to our customers."
            </p>
            <div>
              <p className="font-display font-bold text-wood-950 text-base">Budhni Wooden Artist</p>
              <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold">Master Artisan & Creator of Craft Kalash</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable forestry / Quality focus banner */}
      <section className="bg-wood-950 text-wood-100 py-16 border-y-4 border-wood-800 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-wood-900 border border-wood-800 rounded-xl flex items-center justify-center text-forest-50">
              <TreePine className="w-6 h-6 text-forest-400" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white">Forest Stewardship</h3>
            <p className="text-xs text-wood-400 leading-relaxed max-w-xs">
              Every wooden block is sourced from FSC-certified sustainable forest cooperatives. For every single tree harvested for our toys, we actively fund two sapling replantings.
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-wood-900 border border-wood-800 rounded-xl flex items-center justify-center text-forest-50">
              <Hammer className="w-6 h-6 text-forest-400" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white">Hand-Dowel Joining</h3>
            <p className="text-xs text-wood-400 leading-relaxed max-w-xs">
              We never use toxic metal nails, chemical binders, or cheap screws that can snag on tiny fingers. Our toys are held together with premium wood dowel joints and organic adhesives.
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-wood-900 border border-wood-800 rounded-xl flex items-center justify-center text-forest-50">
              <Award className="w-6 h-6 text-forest-400" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white">ASTM and EN71 Certified</h3>
            <p className="text-xs text-wood-400 leading-relaxed max-w-xs">
              All coloring pigments are made from 100% natural organic milk paints and food-grade mineral dyes, making our toys 100% spit-safe, chemical-free, and teething-friendly.
            </p>
          </div>
        </div>
      </section>

      {/* Materials grid comparison */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-wood-950">Materials We Use vs. Avoid</h2>
          <p className="text-sm text-wood-500 mt-1">We refuse to compromise on a child's developmental environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GOOD */}
          <div className="bg-emerald-50/50 border border-emerald-200/60 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-emerald-800">
              <TreePine className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display font-bold text-lg">Pure Natural Lumber</h3>
            </div>
            <ul className="space-y-3.5 text-xs text-emerald-950">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Premium Budhni Teak & Hardwood:</strong> Exceptionally dense, splinter-resistant, naturally anti-microbial, and extremely durable.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Natural Neem & Babool Wood:</strong> Cultured wood with natural insect-resistant properties, perfectly weighted for walkers and baby toys.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Pure Beeswax & Natural Polish:</strong> Hand-rubbed organic finishes that are completely non-toxic and child-safe.</span>
              </li>
            </ul>
          </div>

          {/* BAD */}
          <div className="bg-red-50/50 border border-red-200/60 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-red-800">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h3 className="font-display font-bold text-lg">Synthetic Compounds (Never Used)</h3>
            </div>
            <ul className="space-y-3.5 text-xs text-red-950">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✖</span>
                <span><strong>Plastic & BPA:</strong> Static, artificial, toxic if chewed, and pollutes landfills for millennia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✖</span>
                <span><strong>MDF & Plywood binders:</strong> Contains formaldehyde, highly brittle, and loses shape if wet.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✖</span>
                <span><strong>Polyurethane Gloss Coatings:</strong> Peels easily into clear plastic flakes, which can be swallowed.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
