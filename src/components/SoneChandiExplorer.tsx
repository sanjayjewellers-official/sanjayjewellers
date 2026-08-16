import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  Crown, 
  Gem, 
  Layers, 
  Filter, 
  CheckCircle2, 
  ShoppingBag, 
  Eye, 
  Heart, 
  ShieldCheck,
  Star,
  Home,
  MessageCircle,
  Grid,
  List,
  SlidersHorizontal,
  Info,
  X,
  ArrowUpDown,
  Tag,
  ChevronDown,
  Sparkle
} from 'lucide-react';
import { Product, Language, MainCategory, SubCategory, MetalType } from '../types';
import { translations } from '../data/translations';

interface SoneChandiExplorerProps {
  products: Product[];
  currentLang: Language;
  selectedMainCategory?: string;
  onQuickView: (product: Product) => void;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenShopPage?: (category?: string) => void;
}

export const SoneChandiExplorer: React.FC<SoneChandiExplorerProps> = ({
  products,
  currentLang,
  selectedMainCategory,
  onQuickView,
  onTryOn,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenShopPage,
}) => {
  const [activeMainCat, setActiveMainCat] = useState<string>(selectedMainCategory || 'all');
  const [activeSubCat, setActiveSubCat] = useState<string>('all');
  const [activeMetal, setActiveMetal] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(900000);
  const [weightFilter, setWeightFilter] = useState<string>('all'); // all, light, medium, heavy
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all'); // all, inStock
  const [sortBy, setSortBy] = useState<string>('featured'); // featured, price_asc, price_desc, rating, new
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activePriceBreakdownId, setActivePriceBreakdownId] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedMainCategory) {
      setActiveMainCat(selectedMainCategory);
      setActiveSubCat('all');
    }
  }, [selectedMainCategory]);

  const treeT = translations[currentLang].categoryTree;
  const navT = translations[currentLang].nav;

  // Main Categories definition with explicit highlights for Payal and Desi Jewellery
  const mainCategories: { 
    id: MainCategory | 'all'; 
    label: string; 
    icon: string; 
    desc: string; 
    badge?: string; 
    highlightType?: 'payal' | 'desi';
  }[] = [
    { 
      id: 'all', 
      label: treeT.all, 
      icon: '👑', 
      desc: 'Explore all 30-Year Heritage Gold & Silver Masterpieces' 
    },
    { 
      id: 'pairon_chandi', 
      label: treeT.mainCategories.pairon_chandi, 
      icon: '✨', 
      desc: '999 Fine Silver Payals, Bridal Jhanjhar & Bichhiya',
      badge: '🌟 Payal & Chandi Special',
      highlightType: 'payal'
    },
    { 
      id: 'gala', 
      label: treeT.mainCategories.gala, 
      icon: '📿', 
      desc: 'Grand Desi Rani Haars, Mangalsutras, Chokers & Hansli',
      badge: '👑 Desi Rani Haar',
      highlightType: 'desi'
    },
    { 
      id: 'sir_matha', 
      label: treeT.mainCategories.sir_matha, 
      icon: '✨', 
      desc: 'Royal Desi Borla, Maang Tikka & Shephool',
      badge: '👑 Desi Borla Shringaar',
      highlightType: 'desi'
    },
    { 
      id: 'haath_kalaai', 
      label: treeT.mainCategories.haath_kalaai, 
      icon: '💫', 
      desc: 'Royal Temple Kada, Bajuvaand & Haath Phool',
      badge: '👑 Desi Kada & Armlets',
      highlightType: 'desi'
    },
    { 
      id: 'kamar', 
      label: treeT.mainCategories.kamar, 
      icon: '✨', 
      desc: 'Temple Heritage Kardhani & Tagdi Waistbelts',
      badge: '👑 Desi Kardhani',
      highlightType: 'desi'
    },
    { 
      id: 'kaan', 
      label: treeT.mainCategories.kaan, 
      icon: '💎', 
      desc: 'Handcrafted Jhumkas, Karnfool & Imperial Balis' 
    },
    { 
      id: 'ungliyan', 
      label: treeT.mainCategories.ungliyan, 
      icon: '💍', 
      desc: '22K Gold Rings & Royal Nizam Arsi Mirror Rings' 
    },
  ];

  // Map subcategories based on active main category
  const getSubCategories = (mainCat: string) => {
    switch (mainCat) {
      case 'sir_matha':
        return [
          { id: 'maang_tikka', label: treeT.subCategories.maang_tikka },
          { id: 'shephool', label: treeT.subCategories.shephool },
        ];
      case 'kaan':
        return [
          { id: 'jhumka', label: treeT.subCategories.jhumka },
          { id: 'karnfool', label: treeT.subCategories.karnfool },
          { id: 'bali', label: treeT.subCategories.bali },
        ];
      case 'gala':
        return [
          { id: 'haar', label: treeT.subCategories.haar },
          { id: 'mangalsutra', label: treeT.subCategories.mangalsutra },
          { id: 'choker', label: treeT.subCategories.choker },
          { id: 'hansli', label: treeT.subCategories.hansli },
        ];
      case 'haath_kalaai':
        return [
          { id: 'kangan', label: treeT.subCategories.kangan },
          { id: 'bajuvaand', label: treeT.subCategories.bajuvaand },
          { id: 'haath_phool', label: treeT.subCategories.haath_phool },
        ];
      case 'ungliyan':
        return [
          { id: 'angoothi', label: treeT.subCategories.angoothi },
        ];
      case 'kamar':
        return [
          { id: 'kardhani', label: treeT.subCategories.kardhani },
        ];
      case 'pairon_chandi':
        return [
          { id: 'payal', label: treeT.subCategories.payal },
          { id: 'bichhiya', label: treeT.subCategories.bichhiya },
        ];
      default:
        return [];
    }
  };

  const availableSubCats = getSubCategories(activeMainCat);

  // Active Category Meta
  const activeMainCatObj = mainCategories.find(c => c.id === activeMainCat) || mainCategories[0];
  const activeSubCatLabel = availableSubCats.find(s => s.id === activeSubCat)?.label;

  // Filter & Sort products logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (activeMainCat !== 'all' && p.mainCategory !== activeMainCat) return false;
      if (activeSubCat !== 'all' && p.subCategory !== activeSubCat) return false;
      if (activeMetal !== 'all' && p.metalType !== activeMetal) return false;
      if (p.price > maxPrice) return false;
      if (availabilityFilter === 'inStock' && !p.inStock) return false;
      
      if (weightFilter === 'light' && p.goldWeightGrams > 15) return false;
      if (weightFilter === 'medium' && (p.goldWeightGrams <= 15 || p.goldWeightGrams > 40)) return false;
      if (weightFilter === 'heavy' && p.goldWeightGrams <= 40) return false;

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'new') return (b.isPrimeCollection ? 1 : 0) - (a.isPrimeCollection ? 1 : 0);
      return 0; // default featured
    });
  }, [products, activeMainCat, activeSubCat, activeMetal, maxPrice, weightFilter, availabilityFilter, sortBy]);

  // Helper for WhatsApp Inquiry URL
  const getWhatsAppUrl = (product: Product) => {
    const phoneNumber = '919800000000'; // Showroom WhatsApp
    const text = `Namaste Sanjay Jewellers Sariya! I am interested in inquiring about:\n\n✨ *${product.name.en}*\n🆔 Code: ${product.hallmarkCode}\n⚖️ Weight: ${product.goldWeightGrams}g (${product.purity})\n💰 Price: ₹${product.price.toLocaleString('en-IN')}\n\nPlease share availability and delivery estimate.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="sone-chandi-catalog" className="py-16 theme-bg-primary text-primary transition-colors duration-400 border-t theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 space-y-8">
        
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans theme-text-secondary">
          <a href="#" className="flex items-center gap-1 hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </a>
          <ChevronRight className="w-3 h-3 text-[#d4af37]/60" />
          <button 
            onClick={() => { setActiveMainCat('all'); setActiveSubCat('all'); }}
            className="hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors"
          >
            Sone-Chandi Catalog
          </button>
          
          {activeMainCat !== 'all' && (
            <>
              <ChevronRight className="w-3 h-3 text-[#d4af37]/60" />
              <button 
                onClick={() => setActiveSubCat('all')}
                className="hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors font-medium text-[#b8860b] dark:text-[#d4af37]"
              >
                {activeMainCatObj.label}
              </button>
            </>
          )}

          {activeSubCat !== 'all' && activeSubCatLabel && (
            <>
              <ChevronRight className="w-3 h-3 text-[#d4af37]/60" />
              <span className="font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                {activeSubCatLabel}
              </span>
            </>
          )}
        </nav>

        {/* Dynamic Category Banner Header */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#1c150c] via-[#2a2215] to-[#1c150c] dark:from-[#05110d] dark:via-[#0b2239] dark:to-[#0d3b2e] border-2 border-[#b8860b]/40 dark:border-[#d4af37]/40 text-[#f7e7ce] overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Crown className="w-80 h-80 text-[#d4af37]" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-[10px] font-sans font-bold uppercase tracking-[0.25em]">
              <Crown className="w-3 h-3" />
              <span>Sanjay Jewellers Sariya • 30 Years of Trust</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#f7e7ce]">
              {activeMainCat === 'all' ? 'Desi Sone-Chandi ke Abhushan' : activeMainCatObj.label}
              {activeSubCatLabel ? ` — ${activeSubCatLabel}` : ''}
            </h1>

            <p className="text-xs sm:text-sm text-[#f7e7ce]/90 font-sans max-w-xl leading-relaxed">
              {activeMainCatObj.desc}. 100% BIS Hallmarked 22K/24K Gold & 999 Fine Silver Crafted by Heritage Artisans in Sariya.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#d4af37]">
              <span>Showing <strong>{filteredProducts.length}</strong> Designs</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                100% BIS Hallmarked
              </span>
            </div>
          </div>
        </div>

        {/* Level 1: Category Quick Dropdown + Pills Switcher */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-sans font-bold uppercase tracking-widest text-[#8c1d1e] dark:text-[#d4af37] flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Select Category (आभूषण श्रेणी चुनें)</span>
            </div>

            {/* Prominent Category Dropdown Quick Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-2 bg-[#ffffff] dark:bg-[#0d3b2e] border-2 border-[#b8860b] dark:border-[#d4af37] px-4 py-2 rounded-xl text-xs font-sans font-bold text-[#1a1612] dark:text-[#f7e7ce] shadow-md hover:bg-[#f7f1e1] dark:hover:bg-[#124d3c] transition-all"
              >
                <span>{activeMainCatObj.icon}</span>
                <span>Category Dropdown: <strong>{activeMainCatObj.label}</strong></span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37] transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#05110d] border-2 border-[#b8860b] dark:border-[#d4af37] rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-[#e6dac1] dark:border-[#d4af37]/20 text-[11px] font-bold uppercase tracking-wider text-[#b8860b] dark:text-[#d4af37] flex items-center justify-between">
                    <span>Quick Category Jump</span>
                    <button 
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="text-xs hover:text-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1 p-1">
                    {mainCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveMainCat(cat.id);
                          setActiveSubCat('all');
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                          activeMainCat === cat.id
                            ? 'bg-[#b8860b] text-white dark:bg-[#d4af37] dark:text-[#05110d] font-bold shadow-sm'
                            : 'hover:bg-[#f7f1e1] dark:hover:bg-[#0d3b2e] text-[#1a1612] dark:text-[#f7e7ce]'
                        } ${
                          cat.badge
                            ? cat.highlightType === 'payal'
                              ? 'border-l-4 border-l-[#c0c0c0]'
                              : 'border-l-4 border-l-[#8c1d1e] dark:border-l-[#d4af37]'
                            : ''
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{cat.icon}</span>
                          <span>{cat.label}</span>
                        </span>
                        {cat.badge && (
                          <span className="text-[9px] bg-[#8c1d1e] text-white dark:bg-[#05110d] dark:text-[#d4af37] px-1.5 py-0.5 rounded font-bold">
                            {cat.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Category Pills / Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {mainCategories.map((cat) => {
              const isActive = activeMainCat === cat.id;
              const isPayal = cat.highlightType === 'payal';
              const isDesi = cat.highlightType === 'desi';

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveMainCat(cat.id);
                    setActiveSubCat('all');
                  }}
                  className={`relative px-4 py-2.5 rounded-2xl text-xs font-sans font-bold transition-all duration-300 flex items-center gap-2 border shadow-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-[#b45309] to-[#d97706] text-white border-transparent shadow-md shadow-[#d97706]/25 scale-102 ring-2 ring-[#d97706]/40'
                      : isPayal
                      ? 'bg-[#f0f4f8] dark:bg-[#15232a] border-2 border-[#94a3b8] dark:border-[#38bdf8]/40 text-[#0f172a] dark:text-[#e0f2fe] hover:border-[#38bdf8] hover:bg-white dark:hover:bg-[#1a2f38]'
                      : isDesi
                      ? 'bg-[#fffaf0] dark:bg-[#221c16] border border-[#eab308]/60 dark:border-[#eab308]/40 text-[#713f12] dark:text-[#fef08a] hover:border-[#ca8a04] hover:bg-[#fff7e6]'
                      : 'bg-white dark:bg-[#1a1612] text-[#2c1f14] dark:text-[#f3ede4] border border-[#d8c8af] dark:border-[#383025] hover:border-[#b8860b] hover:bg-[#faf6ee] dark:hover:bg-[#241e18]'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span className="font-semibold">{cat.label}</span>
                  {cat.badge && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight ml-0.5 ${
                      isActive
                        ? 'bg-black/30 text-white'
                        : isPayal
                        ? 'bg-[#0f172a] text-white dark:bg-[#38bdf8] dark:text-black'
                        : 'bg-[#8c1d1e] text-white dark:bg-[#d4af37] dark:text-black'
                    }`}>
                      {cat.badge.split(' ')[0]}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Link to Dedicated Shop Page */}
            {onOpenShopPage && (
              <button
                onClick={() => onOpenShopPage(activeMainCat)}
                className="px-4 py-2.5 rounded-2xl text-xs font-sans font-bold bg-[#8c1d1e] text-white hover:bg-[#a62425] transition-all flex items-center gap-1.5 shadow-md ml-auto"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Open Dedicated Shop Page →</span>
              </button>
            )}
          </div>
        </div>

        {/* Level 2: Sub-Categories Filters (if applicable) */}
        {availableSubCats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl theme-bg-surface border theme-border space-y-2.5 shadow-md"
          >
            <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8c1d1e] dark:text-[#d4af37] flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Sub-Category Designs (विशेष प्रकार)</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveSubCat('all')}
                className={`px-3 py-1 rounded-lg text-xs font-sans transition-all ${
                  activeSubCat === 'all'
                    ? 'bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black font-bold shadow-md'
                    : 'theme-bg-card theme-text-secondary hover:theme-text-primary'
                }`}
              >
                All {activeMainCatObj.label}
              </button>
              {availableSubCats.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubCat(sub.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-sans transition-all ${
                    activeSubCat === sub.id
                      ? 'bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black font-bold shadow-md'
                      : 'theme-bg-card theme-text-secondary hover:theme-text-primary'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filter & Sort Bar */}
        <div className="p-4 rounded-2xl theme-bg-surface border theme-border space-y-4 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Filter Group: Metal & Price */}
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Metal Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#b8860b] dark:text-[#d4af37] uppercase tracking-wider flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Metal:
                </span>
                <div className="flex items-center gap-1">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'gold', label: '22K/24K Gold' },
                    { id: 'silver', label: '999 Silver' },
                    { id: 'polki_kundan', label: 'Kundan' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveMetal(m.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition-all ${
                        activeMetal === m.id
                          ? 'bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black font-bold'
                          : 'theme-bg-card theme-text-secondary hover:theme-text-primary'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Range Filter */}
              <div className="flex items-center gap-2 border-l theme-border pl-4">
                <span className="text-xs font-bold text-[#b8860b] dark:text-[#d4af37] uppercase tracking-wider">
                  Weight:
                </span>
                <select
                  value={weightFilter}
                  onChange={(e) => setWeightFilter(e.target.value)}
                  className="theme-bg-card theme-text-primary text-xs rounded-lg px-2.5 py-1 border theme-border focus:outline-none focus:border-[#b8860b] dark:focus:border-[#d4af37]"
                >
                  <option value="all">All Weights</option>
                  <option value="light">Light (&lt;15g)</option>
                  <option value="medium">Medium (15g–40g)</option>
                  <option value="heavy">Heavy Grand (40g+)</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="flex items-center gap-2 border-l theme-border pl-4">
                <span className="text-xs font-bold text-[#b8860b] dark:text-[#d4af37] uppercase tracking-wider">
                  Max Price:
                </span>
                <input
                  type="range"
                  min="10000"
                  max="900000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-[#b8860b] dark:accent-[#d4af37] cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-[#b8860b] dark:text-[#d4af37]">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Sorting & View Toggle Controls */}
            <div className="flex items-center gap-3 ml-auto">
              
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="theme-bg-card theme-text-primary text-xs rounded-lg px-3 py-1.5 border theme-border focus:outline-none focus:border-[#b8860b] dark:focus:border-[#d4af37] font-sans"
                >
                  <option value="featured">Featured / Popularity</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="new">New Heritage Arrivals</option>
                </select>
              </div>

              {/* Grid / List View Toggle Buttons */}
              <div className="flex items-center border theme-border rounded-lg p-0.5 theme-bg-card">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black shadow-sm'
                      : 'theme-text-secondary hover:theme-text-primary'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black shadow-sm'
                      : 'theme-text-secondary hover:theme-text-primary'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Catalog Products Display (Grid View vs List View) */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const isWishlisted = wishlistIds.includes(product.id);
                const isBreakdownOpen = activePriceBreakdownId === product.id;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group relative theme-bg-surface border theme-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 card-3d-glow flex flex-col justify-between"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-black/5">
                      <img
                        src={product.image}
                        alt={product.name[currentLang]}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                        <span className="bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black font-bold text-[9px] font-sans uppercase tracking-wider px-2 py-0.5 rounded shadow-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          {product.purity}
                        </span>
                        {product.isPrimeCollection && (
                          <span className="bg-[#8c1d1e] text-white font-bold text-[8px] font-sans uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                            30 Yr Heritage Signature
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => onToggleWishlist(product)}
                        className={`absolute top-2.5 right-2.5 p-2 rounded-full border transition-all shadow-md ${
                          isWishlisted
                            ? 'bg-rose-600 text-white border-rose-400'
                            : 'theme-bg-primary theme-border theme-text-primary hover:text-[#b8860b] dark:hover:text-[#d4af37]'
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      {/* Quick Hover Overlay */}
                      <div className="absolute inset-x-2 bottom-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => onQuickView(product)}
                          className="flex-1 bg-black/85 backdrop-blur-md text-white border border-[#d4af37]/40 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 hover:border-[#d4af37] transition-all shadow-lg"
                        >
                          <Eye className="w-3 h-3 text-[#d4af37]" />
                          <span>Quick View</span>
                        </button>
                        <button
                          onClick={() => onTryOn(product)}
                          className="flex-1 bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#8c1d1e] dark:hover:bg-amber-300 transition-all shadow-lg"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Try-On</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono theme-text-secondary">
                          <span className="uppercase tracking-wider font-bold text-[#b8860b] dark:text-[#d4af37]">
                            {product.hallmarkCode}
                          </span>
                          <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>

                        <h3 className="text-sm font-serif font-semibold theme-text-primary group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-1">
                          {product.name[currentLang]}
                        </h3>

                        <div className="flex items-center gap-2 text-[10px] theme-text-secondary">
                          <span className="font-mono font-bold text-[#b8860b] dark:text-[#d4af37]">
                            {product.goldWeightGrams > 0 ? `${product.goldWeightGrams}g Gold` : 'Pure Silver'}
                          </span>
                          <span>•</span>
                          <span>{product.inStock ? 'In Stock Sariya' : 'Custom Order'}</span>
                        </div>
                      </div>

                      {/* Price + Breakdown Info Toggle */}
                      <div className="pt-2 border-t theme-border space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-base font-mono font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => setActivePriceBreakdownId(isBreakdownOpen ? null : product.id)}
                              className="text-xs text-[#b8860b] dark:text-[#d4af37] hover:text-amber-500 transition-colors"
                              title="View Price Breakdown"
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[9px] theme-text-muted uppercase">
                            Incl. GST & Making
                          </span>
                        </div>

                        {/* Price Breakdown Popover */}
                        {isBreakdownOpen && (
                          <div className="p-2.5 rounded-lg theme-bg-card border theme-border text-[10px] space-y-1 font-mono theme-text-primary animate-fadeIn">
                            <div className="flex justify-between">
                              <span>Metal Value:</span>
                              <span>₹{Math.round(product.price * 0.85).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-amber-600 dark:text-amber-400">
                              <span>Making Charges (~12%):</span>
                              <span>₹{Math.round(product.price * 0.12).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between border-t theme-border pt-1 font-bold text-[#b8860b] dark:text-[#d4af37]">
                              <span>GST (3%):</span>
                              <span>₹{Math.round(product.price * 0.03).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        )}

                        {/* Card Action Buttons */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            onClick={() => onAddToCart(product)}
                            className="gold-shimmer-btn py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add Bag</span>
                          </button>

                          <a
                            href={getWhatsAppUrl(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-700 hover:bg-emerald-600 text-white py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all shadow-sm"
                          >
                            <MessageCircle className="w-3 h-3 text-emerald-200 fill-current" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4 pt-2">
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const isWishlisted = wishlistIds.includes(product.id);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="theme-bg-surface border theme-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="relative w-full sm:w-36 h-36 shrink-0 rounded-xl overflow-hidden bg-black/5">
                      <img
                        src={product.image}
                        alt={product.name[currentLang]}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-black font-bold text-[8px] font-sans uppercase px-1.5 py-0.5 rounded">
                        {product.purity}
                      </span>
                    </div>

                    <div className="flex-1 space-y-1.5 text-center sm:text-left w-full">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-[#b8860b] dark:text-[#d4af37]">
                          {product.hallmarkCode}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {product.rating} ({product.reviewCount} reviews)
                        </span>
                      </div>

                      <h3 className="text-base font-serif font-bold theme-text-primary">
                        {product.name[currentLang]}
                      </h3>

                      <p className="text-xs theme-text-secondary line-clamp-2">
                        {product.description[currentLang]}
                      </p>

                      <div className="flex items-center gap-3 text-xs theme-text-muted pt-1">
                        <span>Weight: <strong>{product.goldWeightGrams > 0 ? `${product.goldWeightGrams}g` : 'Silver'}</strong></span>
                        <span>•</span>
                        <span>{product.inStock ? 'Ready in Sariya Boutique' : 'Custom Order'}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 theme-border">
                      <div className="text-left sm:text-right">
                        <div className="text-lg font-mono font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[9px] theme-text-muted uppercase">Incl. GST</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="gold-shimmer-btn py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add Bag</span>
                        </button>
                        <button
                          onClick={() => onQuickView(product)}
                          className="theme-bg-card border theme-border theme-text-primary p-2 rounded-xl"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
