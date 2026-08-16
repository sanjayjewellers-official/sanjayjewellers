import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Star, 
  Crown
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'kundan' | 'temple' | 'emerald' | 'bridal' | 'payal'>('all');
  const t = translations[currentLang].primeSection;

  const primeProducts = products.filter((p) => p.isPrimeCollection);

  const filteredProducts = primeProducts.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'kundan') return p.name.en.toLowerCase().includes('kundan') || p.name.en.toLowerCase().includes('polki');
    if (activeFilter === 'temple') return p.name.en.toLowerCase().includes('temple');
    if (activeFilter === 'emerald') return p.name.en.toLowerCase().includes('emerald');
    if (activeFilter === 'bridal') return p.category === 'bridal';
    if (activeFilter === 'payal') return p.mainCategory === 'pairon_chandi';
    return true;
  });

  return (
    <section id="prime-collection" className="py-20 bg-[#faf7f0] dark:bg-[#000000] relative overflow-hidden text-[#1a1612] dark:text-[#fde047] transition-colors duration-400 border-t border-[#ebdcc9] dark:border-[#d4af37]/30">
      
      {/* Decorative Immersive Pattern Backdrop */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#b8860b_1px,transparent_1px)] dark:bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4ebd0] dark:bg-[#1f190e] border border-[#b8860b]/30 dark:border-[#d4af37]/50 text-[#8c1d1e] dark:text-[#fde047] text-[10px] font-sans font-bold uppercase tracking-[0.3em] shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#fde047]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a1612] dark:text-[#fde047]">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#5c5244] dark:text-[#d4af37] font-sans font-normal max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'kundan', label: '👑 Kundan & Desi Polki' },
            { id: 'temple', label: '🏛️ Temple Gold' },
            { id: 'emerald', label: '💎 Royal Emeralds' },
            { id: 'bridal', label: '👰 Bridal Sets' },
            { id: 'payal', label: '🌟 999 Payal Special' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans font-bold transition-all duration-300 ${
                activeFilter === tab.id
                  ? 'bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#000000] shadow-lg scale-105'
                  : 'bg-white dark:bg-[#0a0805] border border-[#e6dac1] dark:border-[#d4af37]/40 text-[#4d4030] dark:text-[#d4af37] hover:border-[#b8860b] dark:hover:border-[#fde047]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Prime Product Cards Grid */}
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
                className="group relative bg-white dark:bg-[#080604] border-2 border-[#e6dac1] dark:border-[#d4af37]/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 card-3d-glow flex flex-col justify-between"
              >
                {/* Product Image & Overlays */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                  <img
                    src={product.image}
                    alt={product.name[currentLang]}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Hallmarked Badge */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                    <span className="bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black font-bold text-[10px] font-sans uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {product.purity}
                    </span>
                    <span className="bg-[#8c1d1e] text-white font-bold text-[9px] font-sans uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md">
                      30 Yr Heritage Signature
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`absolute top-4 right-4 p-2.5 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg ${
                      isWishlisted
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-white/80 dark:bg-black/80 text-[#1a1612] dark:text-[#fde047] border-[#e6dac1] dark:border-[#d4af37]/50 hover:text-[#b8860b]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Floating Action Buttons */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center gap-2">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 bg-white/90 dark:bg-black/90 backdrop-blur-md text-[#1a1612] dark:text-[#fde047] border border-[#b8860b]/40 dark:border-[#d4af37]/50 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#f4ebd0] dark:hover:bg-[#d4af37]/30 transition-all shadow-lg font-sans"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#fde047]" />
                      <span>{t.quickView}</span>
                    </button>
                    <button
                      onClick={() => onTryOn(product)}
                      className="flex-1 bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#8c1d1e] dark:hover:bg-[#fde047] transition-all shadow-lg font-sans"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.tryOn}</span>
                    </button>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#5c5244] dark:text-[#d4af37]">
                      <span className="font-bold tracking-wider">{product.hallmarkCode}</span>
                      <span className="flex items-center gap-1 text-amber-500 dark:text-[#fde047] font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#1a1612] dark:text-[#fde047] group-hover:text-[#b8860b] dark:group-hover:text-[#fde047] transition-colors leading-tight">
                      {product.name[currentLang]}
                    </h3>

                    <p className="text-xs text-[#5c5244] dark:text-[#d4af37] font-sans font-light leading-relaxed line-clamp-2">
                      {product.subtitle[currentLang]}
                    </p>
                  </div>

                  {/* Price & Add to Bag CTA */}
                  <div className="pt-4 border-t border-[#e6dac1] dark:border-[#d4af37]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#5c5244] dark:text-[#d4af37] uppercase tracking-widest font-sans block">
                        Estimated Value (incl. GST)
                      </span>
                      <div className="text-xl sm:text-2xl font-serif font-bold text-[#8c1d1e] dark:text-[#fde047]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="gold-shimmer-btn p-3 rounded-2xl shadow-lg flex items-center justify-center text-white dark:text-[#000000]"
                      title={t.addToBag}
                    >
                      <ShoppingBag className="w-5 h-5" />
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
