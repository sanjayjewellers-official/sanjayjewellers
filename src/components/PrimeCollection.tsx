import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  ChevronRight, 
  Star, 
  Maximize2,
  Award
} from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface PrimeCollectionProps {
  products: Product[];
  currentLang: Language;
  onQuickView: (product: Product) => void;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const PrimeCollection: React.FC<PrimeCollectionProps> = ({
  products,
  currentLang,
  onQuickView,
  onTryOn,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'kundan' | 'temple' | 'emerald' | 'bridal'>('all');
  const t = translations[currentLang].primeSection;

  const primeProducts = products.filter((p) => p.isPrimeCollection);

  const filteredProducts = primeProducts.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'kundan') return p.name.en.toLowerCase().includes('kundan') || p.name.en.toLowerCase().includes('polki');
    if (activeFilter === 'temple') return p.name.en.toLowerCase().includes('temple');
    if (activeFilter === 'emerald') return p.name.en.toLowerCase().includes('emerald');
    if (activeFilter === 'bridal') return p.category === 'bridal';
    return true;
  });

  return (
    <section id="prime-collection" className="py-20 bg-[#05110d] relative overflow-hidden text-[#f7e7ce]">
      
      {/* Decorative Immersive Pattern Backdrop */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-sans font-bold uppercase tracking-[0.3em] shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7e7ce] tracking-tight">
            {t.title}
          </h2>

          <div className="text-lg sm:text-2xl font-serif text-[#d4af37] font-normal italic">
            "{t.titleNative}"
          </div>

          <p className="text-xs sm:text-sm text-[#f7e7ce]/70 font-sans font-light leading-relaxed pt-2">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'kundan', label: t.filterKundan },
            { id: 'temple', label: t.filterTemple },
            { id: 'emerald', label: t.filterEmerald },
            { id: 'bridal', label: t.filterBridal },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-5 sm:px-7 py-2.5 text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 ${
                activeFilter === tab.id
                  ? 'bg-[#d4af37] text-[#05110d] shadow-lg border border-[#d4af37]'
                  : 'bg-[#0b2239] text-[#f7e7ce]/80 border border-[#d4af37]/20 hover:border-[#d4af37] hover:text-[#f7e7ce]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative bg-[#0b2239] border border-[#d4af37]/20 overflow-hidden shadow-2xl card-3d-glow shimmer-sweep flex flex-col justify-between"
              >
                
                {/* Image Container with Zoom & Badge */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d3b2e]">
                  <img
                    src={product.image}
                    alt={product.name[currentLang]}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2239] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-[#d4af37] text-[#05110d] font-bold text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 shadow-lg flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {product.purity}
                    </span>
                    <span className="bg-[#05110d]/90 border border-[#d4af37]/30 text-[#f7e7ce] text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider">
                      {product.goldWeightGrams}g Pure Gold
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`absolute top-3 right-3 p-2.5 border transition-all ${
                      isWishlisted
                        ? 'bg-rose-600 text-white border-rose-400 shadow-lg'
                        : 'bg-[#05110d]/80 border-[#d4af37]/30 text-[#f7e7ce] hover:text-[#d4af37] hover:border-[#d4af37]'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 bg-[#05110d]/95 hover:bg-[#05110d] border border-[#d4af37]/50 text-[#f7e7ce] text-xs font-bold py-2 px-3 flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{t.quickView}</span>
                    </button>

                    <button
                      onClick={() => onTryOn(product)}
                      className="bg-[#d4af37] hover:bg-[#f7e7ce] text-[#05110d] text-xs font-bold py-2 px-3 flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{t.tryOn}</span>
                    </button>
                  </div>
                </div>

                {/* Card Details Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#d4af37]">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                        <span className="font-bold text-[#f7e7ce]">{product.rating}</span>
                        <span className="text-[#f7e7ce]/50">({product.reviewCount})</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-[#05110d] px-2 py-0.5 border border-emerald-500/30">
                        {product.hallmarkCode}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-light text-[#f7e7ce] group-hover:text-[#d4af37] transition-colors line-clamp-1">
                      {product.name[currentLang]}
                    </h3>

                    <p className="text-xs text-[#f7e7ce]/60 font-sans font-light line-clamp-2">
                      {product.subtitle[currentLang]}
                    </p>
                  </div>

                  {/* Pricing & Add to Cart */}
                  <div className="pt-3 border-t border-[#d4af37]/20 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#d4af37]/70 font-sans block">Estimated Value</span>
                      <span className="text-lg font-serif font-light text-[#f7e7ce]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#d4af37] text-[#05110d] hover:bg-[#f7e7ce] font-sans font-bold text-xs uppercase tracking-wider px-4 py-2.5 shadow-md flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.addToBag}</span>
                    </button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
