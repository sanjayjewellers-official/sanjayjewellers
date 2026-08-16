import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Crown, 
  ArrowRight, 
  ShoppingBag, 
  Eye, 
  Heart, 
  Star, 
  ShieldCheck, 
  MessageCircle,
  Gem,
  Layers
} from 'lucide-react';
import { Product, Language, MainCategory } from '../types';
import { translations } from '../data/translations';

interface HomeShopShowcaseProps {
  products: Product[];
  currentLang: Language;
  onOpenShop: (category?: string) => void;
  onQuickView: (product: Product) => void;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const HomeShopShowcase: React.FC<HomeShopShowcaseProps> = ({
  products,
  currentLang,
  onOpenShop,
  onQuickView,
  onTryOn,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const treeT = translations[currentLang].categoryTree;

  const tabs: { id: string; label: string; icon: string; badge?: string }[] = [
    { id: 'all', label: '👑 All Spotlight', icon: '👑' },
    { id: 'pairon_chandi', label: '✨ Anklets & Silver Craft', icon: '✨', badge: 'Special' },
    { id: 'gala', label: '📿 Necklaces & Rani Haar', icon: '📿' },
    { id: 'haath_kalaai', label: '💫 Bangles & Kada', icon: '💫' },
    { id: 'sir_matha', label: '👑 Bridal Headwear', icon: '👑' },
    { id: 'kaan', label: '💎 Earrings & Jhumkas', icon: '💎' },
  ];

  const displayedProducts = useMemo(() => {
    let filtered = products;
    if (activeTab !== 'all') {
      filtered = products.filter((p) => p.mainCategory === activeTab);
    }
    // Limit to 6 spotlight products for a clean, minimalist home layout
    return filtered.slice(0, 6);
  }, [products, activeTab]);

  return (
    <section className="py-16 bg-[#fbf8f2] dark:bg-[#14120f] border-t border-[#ebdcc9] dark:border-[#2d261d] transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Minimalist Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#ebdcc9] dark:border-[#2d261d]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ebd0] dark:bg-[#d4af37]/15 border border-[#b8860b]/30 text-[#8c1d1e] dark:text-[#d4af37] text-[11px] font-sans font-bold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Heritage Spotlight Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
              Curated Royal Masterpieces
            </h2>
            <p className="text-xs sm:text-sm text-[#6c6152] dark:text-[#f7e7ce]/70 max-w-xl font-sans font-light">
              Explore handpicked highlights from our 30-year legacy of pure gold and fine silver artistry.
            </p>
          </div>

          {/* Direct CTA to Dedicated Shop Page */}
          <button
            onClick={() => onOpenShop(activeTab !== 'all' ? activeTab : 'all')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#b45309] to-[#d97706] text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-102 transition-all shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore All Designs in Shop Now →</span>
          </button>
        </div>

        {/* Minimalist Clean Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-sans font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap border shrink-0 ${
                  isActive
                    ? 'bg-[#1a1612] text-[#f7e7ce] dark:bg-[#d4af37] dark:text-[#14120f] border-transparent shadow-md scale-102'
                    : 'bg-white dark:bg-[#1a1612] text-[#4d4030] dark:text-[#d1c7b7] border-[#e2d5be] dark:border-[#383025] hover:border-[#b8860b] hover:bg-[#faf6ee]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] bg-[#8c1d1e] text-white px-1.5 py-0.2 rounded-full uppercase">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Minimalist Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((p, idx) => {
            const isWishlisted = wishlistIds.includes(p.id);

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group bg-white dark:bg-[#171411] border border-[#e6dac1] dark:border-[#332b21] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-60 w-full bg-[#0d1f1c] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name[currentLang]}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#f7e7ce] text-[10px] font-sans font-bold uppercase">
                      {p.purity}
                    </span>
                    {p.isPrimeCollection && (
                      <span className="px-2.5 py-1 rounded-full bg-[#8c1d1e] text-white text-[9px] font-bold uppercase shadow">
                        👑 Heritage
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleWishlist(p)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                      isWishlisted
                        ? 'bg-rose-500 text-white'
                        : 'bg-black/40 text-white hover:bg-rose-500'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-sans font-semibold">
                      ⚖️ {p.goldWeightGrams}g
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-[#b8860b] dark:text-[#d4af37] font-bold">
                        HUID: {p.hallmarkCode}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{p.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce] line-clamp-1 group-hover:text-[#b8860b] transition-colors">
                      {p.name[currentLang]}
                    </h3>

                    <p className="text-xs text-[#6c6152] dark:text-[#f7e7ce]/70 line-clamp-1 font-sans">
                      {p.subtitle[currentLang]}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-3 border-t border-[#ebdcc9] dark:border-[#2d261d] space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-[#7a6d5c] dark:text-[#f7e7ce]/60 uppercase font-bold">Price</span>
                      <span className="text-lg font-serif font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onQuickView(p)}
                        className="py-2 px-2.5 rounded-xl border border-[#ebdcc9] dark:border-[#383025] hover:bg-[#faf6ee] dark:hover:bg-[#201b15] text-[11px] font-sans font-semibold text-center"
                      >
                        Quick View
                      </button>
                      <button
                        onClick={() => onAddToCart(p)}
                        className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#b45309] to-[#d97706] text-white text-[11px] font-sans font-bold flex items-center justify-center gap-1 shadow-sm"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner to Full Shop */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#1c150c] via-[#2a2215] to-[#1c150c] text-[#f7e7ce] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#b8860b]/30">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#d4af37] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Full Online Boutique Experience</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold">
              Looking for our complete catalog & custom filters?
            </h3>
            <p className="text-xs text-[#f7e7ce]/75 font-sans">
              Filter by price, purity (22K/24K/Silver), gold weight, sub-categories, and sorting options.
            </p>
          </div>

          <button
            onClick={() => onOpenShop('all')}
            className="px-8 py-3.5 rounded-2xl bg-[#d4af37] text-[#14120f] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#e6c258] transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Dedicated Shop Now Page</span>
          </button>
        </div>

      </div>
    </section>
  );
};
