import React, { useState } from 'react';
import { Accordion } from '../components/Accordion';
import { HelpCircle, ShieldCheck, Truck, Droplet, Hammer } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'safety' | 'shipping' | 'care' | 'craft'>('safety');

  const faqsByTab = {
    safety: [
      {
        title: "Is the wood paint/stain safe if my baby chews on the toys?",
        content: "Yes, 100%! We use certified organic milk paint and natural, water-based stains that show the beautiful natural wood grain beneath. All our finishes are lead-free, chemical-free, saliva-proof, and contain zero volatile organic compounds (VOCs). If your baby chews on our Waldorf rainbow or teethers, it is completely harmless."
      },
      {
        title: "What safety certifications do your wooden toys carry?",
        content: "All our toys are rigorously tested in independent laboratory facilities. They fully exceed and carry the European Union EN71 safety standard and the American ASTM F963 toy safety specifications. We also carry out continuous in-house quality control testing on every batch of wooden logs."
      },
      {
        title: "Do your wooden toys splinter or break easily?",
        content: "No. We exclusively use dense North American hardwood species like Maple, Cherry, and Beech wood. These species are highly dense and contain robust, tight interlocking fibers, which means they are completely shatter-proof and splinter-resistant. This is a massive safety upgrade compared to cheap composite woods (MDF, chipboard) or thin plywoods that easily flake."
      }
    ],
    shipping: [
      {
        title: "How much does shipping cost, and how long does it take?",
        content: "We offer completely free standard shipping on all US orders exceeding $50! For smaller orders, standard shipping is a flat rate of $5.99. Orders are packed and shipped from our Oregon workshop within 1-2 business days. Standard delivery takes 3-5 business days depending on state distance."
      },
      {
        title: "Do you offer premium gift wrapping and personalized engravings?",
        content: "Yes! During checkout, you can check the 'Gift Options' box to add a custom hand-written gift card and premium craft-paper wrapping with a real dried sprig of lavender. Many of our wooden cars and puzzle blocks can also be engraved with your child's name. You can write your custom engraving request directly in the order notes during checkout."
      },
      {
        title: "What is your return policy and warranty guarantee?",
        content: "We stand behind our woodcrafts for a lifetime of play. If any of our toys break during normal, reasonable playroom play, simply send us a picture and we will repair or replace it for free, no questions asked. If you are not completely satisfied with your purchase, you can return unused items in their original packaging within 30 days for a full refund."
      }
    ],
    care: [
      {
        title: "How do I clean and sanitize raw wooden toys?",
        content: "Cleaning is simple and natural! Gently wipe down the wooden toy with a damp cloth and mild Castile soap. Let it air dry completely. Never submerge wooden toys in water, put them in a dishwasher, or use boiling water to sterilize them, as water swells wood fibers, altering the texture, shape, and grain alignment."
      },
      {
        title: "How do I restore the beautiful natural wood sheen over time?",
        content: "With years of vigorous play, wood can naturally dry out or lose its rich luster. You can easily bring its glow back by rubbing it down with a tiny amount of organic, food-grade beeswax cream, flaxseed oil, or even coconut oil! Gently rub it in with a soft cloth, let it dry for 10 minutes, and polish off any excess. It will smell and look brand new!"
      }
    ],
    craft: [
      {
        title: "Where are your toys manufactured, and what woods do you use?",
        content: "Every single piece is designed and hand-carved in our carbon-neutral workshop in Budhni, Madhya Pradesh. We never outsource production to massive foreign factories. Our sustainable logs are harvested from certified FSC forestry cooperatives and locally sourced high-quality wood."
      },
      {
        title: "Are your toys Montessori or Waldorf aligned?",
        content: "Yes! Our wooden arches, stacking pegs, and sorting boxes are designed in direct partnership with Waldorf educators and occupational therapists. We intentionally design open-ended toys without batteries, screens, or lights so your child is invited to actively imagine, think, stack, balance, and problem-solve."
      }
    ]
  };

  const tabs = [
    { id: 'safety', label: 'Safety & Paints', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'shipping', label: 'Gifting & Shipping', icon: <Truck className="w-4 h-4" /> },
    { id: 'care', label: 'Cleaning & Care', icon: <Droplet className="w-4 h-4" /> },
    { id: 'craft', label: 'Lumber & Craft', icon: <Hammer className="w-4 h-4" /> }
  ] as const;

  return (
    <div className="bg-wood-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title bar */}
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-wood-700 mx-auto mb-4" />
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-wood-950 tracking-tight">Parent Knowledge Base</h1>
          <p className="text-xs sm:text-sm text-wood-500 mt-2">Everything you need to know about safety, wood quality, care, and deliveries.</p>
        </div>

        {/* Tab filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10 bg-white border border-wood-200 p-1.5 rounded-2xl shadow-2xs">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeTab === t.id
                  ? 'bg-wood-800 text-white shadow-xs'
                  : 'text-wood-700 hover:bg-wood-50 hover:text-wood-950'
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          <Accordion items={faqsByTab[activeTab]} />
        </div>

        {/* Floating trust assistance badge */}
        <div className="bg-white border border-wood-200 rounded-3xl p-6 sm:p-8 text-center mt-16 max-w-lg mx-auto shadow-2xs">
          <h3 className="font-display font-bold text-wood-950 text-base mb-2">Still Have Questions?</h3>
          <p className="text-xs text-wood-600 leading-relaxed mb-4">
            Our small family workshop is happy to assist. Send the Craft Kalash team a message and we'll reply as quickly as we can!
          </p>
          <a
            href="/contact"
            className="wood-btn-primary px-5 py-2.5 rounded-lg text-xs font-semibold inline-block shadow-2xs"
          >
            Contact Our Workshop Support
          </a>
        </div>

      </div>
    </div>
  );
};
