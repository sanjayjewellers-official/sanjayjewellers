import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Crown, 
  Gem, 
  Grid, 
  Grid3X3, 
  List, 
  X, 
  ArrowUpDown, 
  Check, 
  Heart, 
  Eye, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  ArrowLeft, 
  ChevronRight, 
  TrendingUp,
  Tag,
  CheckCircle2,
  Info,
  ChevronDown
} from 'lucide-react';
import { Product, Language, MainCategory, SubCategory, MetalType, MetalRate } from '../types';
import { translations } from '../data/translations';

interface ShopPageProps {
  products: Product[];
  currentLang: Language;
  initialCategory?: string;
  initialSubCategory?: string;
  initialSearchQuery?: string;
  metalRate: MetalRate;
  onNavigateHome: () => void;
  onQuickView: (product: Product) => void;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  currentLang,
  initialCategory = 'all',
  initialSubCategory = 'all',
  initialSearchQuery = '',
  metalRate,
  onNavigateHome,
  onQuickView,
  onTryOn,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const t = translations[currentLang].shopPage;
  const treeT = translations[currentLang].categoryTree;
  const navT = translations[currentLang].nav;

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedMainCat, setSelectedMainCat] = useState<string>(initialCategory);
  const [selectedSubCat, setSelectedSubCat] = useState<string>(initialSubCategory);
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [selectedPurity, setSelectedPurity] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [weightBracket, setWeightBracket] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid-compact' | 'grid-spacious' | 'list'>('grid-spacious');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [activePriceBreakdownId, setActivePriceBreakdownId] = useState<string | null>(null);

  // Sync initialCategory
  useEffect(() => {
    if (initialCategory) {
      setSelectedMainCat(initialCategory);
    }
  }, [initialCategory]);

  // Categories definition
  const mainCategories = useMemo(() => [
    { 
      id: 'all', 
      label: treeT.all, 
      icon: '👑', 
      count: products.length,
      badge: 'Complete Collection' 
    },
    { 
      id: 'pairon_chandi', 
      label: treeT.mainCategories.pairon_chandi, 
      icon: '✨', 
      count: products.filter(p => p.mainCategory === 'pairon_chandi').length,
      badge: '🌟 Payal & Bichhiya Special',
      isHighlight: true,
      highlightType: 'payal'
    },
    { 
      id: 'gala', 
      label: treeT.mainCategories.gala, 
      icon: '📿', 
      count: products.filter(p => p.mainCategory === 'gala').length,
      badge: '👑 Desi Rani Haar & Chokers',
      isHighlight: true,
      highlightType: 'desi'
    },
    { 
      id: 'sir_matha', 
      label: treeT.mainCategories.sir_matha, 
      icon: '✨', 
      count: products.filter(p => p.mainCategory === 'sir_matha').length,
      badge: '👑 Bridal Shringaar',
      isHighlight: true,
      highlightType: 'desi'
    },
    { 
      id: 'haath_kalaai', 
      label: treeT.mainCategories.haath_kalaai, 
      icon: '💫', 
      count: products.filter(p => p.mainCategory === 'haath_kalaai').length,
      badge: '👑 Temple Kada & Kangan'
    },
    { 
      id: 'kaan', 
      label: treeT.mainCategories.kaan, 
      icon: '💎', 
      count: products.filter(p => p.mainCategory === 'kaan').length,
      badge: '💎 Chandbali & Jhumka'
    },
    { 
      id: 'ungliyan', 
      label: treeT.mainCategories.ungliyan, 
      icon: '💍', 
      count: products.filter(p => p.mainCategory === 'ungliyan').length,
      badge: '💍 Cocktail & Heritage Rings'
    },
    { 
      id: 'kamar', 
      label: treeT.mainCategories.kamar, 
      icon: '✨', 
      count: products.filter(p => p.mainCategory === 'kamar').length,
      badge: '👑 Royal Kardhani'
    },
  ], [treeT, products]);

  // Subcategories mapping
  const subCategoryMap: Record<string, { id: SubCategory; label: string }[]> = useMemo(() => ({
    pairon_chandi: [
      { id: 'payal', label: treeT.subCategories.payal },
      { id: 'bichhiya', label: treeT.subCategories.bichhiya },
    ],
    gala: [
      { id: 'haar', label: treeT.subCategories.haar },
      { id: 'choker', label: treeT.subCategories.choker },
      { id: 'mangalsutra', label: treeT.subCategories.mangalsutra },
      { id: 'hansli', label: treeT.subCategories.hansli },
    ],
    sir_matha: [
      { id: 'maang_tikka', label: treeT.subCategories.maang_tikka },
      { id: 'shephool', label: treeT.subCategories.shephool },
    ],
    haath_kalaai: [
      { id: 'kangan', label: treeT.subCategories.kangan },
      { id: 'bajuvaand', label: treeT.subCategories.bajuvaand },
      { id: 'haath_phool', label: treeT.subCategories.haath_phool },
    ],
    kaan: [
      { id: 'jhumka', label: treeT.subCategories.jhumka },
      { id: 'karnfool', label: treeT.subCategories.karnfool },
      { id: 'bali', label: treeT.subCategories.bali },
    ],
    ungliyan: [
      { id: 'angoothi', label: treeT.subCategories.angoothi },
    ],
    kamar: [
      { id: 'kardhani', label: treeT.subCategories.kardhani },
    ],
  }), [treeT]);

  // Active subcategories based on selection
  const currentSubCategories = useMemo(() => {
    if (selectedMainCat === 'all') {
      return Object.values(subCategoryMap).flat();
    }
    return subCategoryMap[selectedMainCat] || [];
  }, [selectedMainCat, subCategoryMap]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = 
          item.name.en.toLowerCase().includes(q) ||
          item.name.hi.toLowerCase().includes(q) ||
          item.name.or.toLowerCase().includes(q);
        const matchesSubtitle = 
          item.subtitle.en.toLowerCase().includes(q) ||
          item.subtitle.hi.toLowerCase().includes(q);
        const matchesHallmark = item.hallmarkCode.toLowerCase().includes(q);
        const matchesPurity = item.purity.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle && !matchesHallmark && !matchesPurity) return false;
      }

      // Main Category
      if (selectedMainCat !== 'all' && item.mainCategory !== selectedMainCat) {
        return false;
      }

      // Sub Category
      if (selectedSubCat !== 'all' && item.subCategory !== selectedSubCat) {
        return false;
      }

      // Metal Type
      if (selectedMetal !== 'all' && item.metalType !== selectedMetal) {
        return false;
      }

      // Purity
      if (selectedPurity !== 'all' && item.purity !== selectedPurity) {
        return false;
      }

      // Max Price
      if (item.price > maxPrice) {
        return false;
      }

      // In stock
      if (inStockOnly && !item.inStock) {
        return false;
      }

      // Weight Bracket
      if (weightBracket === 'light' && item.goldWeightGrams >= 15) return false;
      if (weightBracket === 'medium' && (item.goldWeightGrams < 15 || item.goldWeightGrams > 40)) return false;
      if (weightBracket === 'heavy' && item.goldWeightGrams <= 40) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'weight_desc') return b.goldWeightGrams - a.goldWeightGrams;
      if (sortBy === 'newest') return b.reviewCount - a.reviewCount;
      // Featured: Prime first then best rated
      if (a.isPrimeCollection && !b.isPrimeCollection) return -1;
      if (!a.isPrimeCollection && b.isPrimeCollection) return 1;
      return b.rating - a.rating;
    });
  }, [
    products, 
    searchQuery, 
    selectedMainCat, 
    selectedSubCat, 
    selectedMetal, 
    selectedPurity, 
    maxPrice, 
    inStockOnly, 
    weightBracket, 
    sortBy
  ]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedMainCat !== 'all') count++;
    if (selectedSubCat !== 'all') count++;
    if (selectedMetal !== 'all') count++;
    if (selectedPurity !== 'all') count++;
    if (maxPrice < 1000000) count++;
    if (weightBracket !== 'all') count++;
    if (inStockOnly) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedMainCat, selectedSubCat, selectedMetal, selectedPurity, maxPrice, weightBracket, inStockOnly, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedMainCat('all');
    setSelectedSubCat('all');
    setSelectedMetal('all');
    setSelectedPurity('all');
    setMaxPrice(1000000);
    setWeightBracket('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const handleWhatsAppEnquiry = (product: Product) => {
    const text = encodeURIComponent(
      `Namaste Sanjay Jewellers! 🙏 I am interested in exploring and ordering:\n\n*${product.name[currentLang]}*\nCode: ${product.hallmarkCode}\nPurity: ${product.purity}\nWeight: ${product.goldWeightGrams}g\nEstimated Price: ₹${product.price.toLocaleString('en-IN')}\n\nPlease share design catalog and available customization options.`
    );
    window.open(`https://wa.me/919425275511?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen theme-bg-primary text-[#1a1612] dark:text-[#f7e7ce] transition-colors duration-400 pb-24">
      
      {/* Top Banner / Breadcrumb Header */}
      <div className="bg-[#fbf7ee] dark:bg-[#14120f] border-b border-[#e6dac1] dark:border-[#d4af37]/20 pt-8 pb-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Breadcrumbs & Home button */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-[#7c6f5e] dark:text-[#f7e7ce]/70">
              <button 
                onClick={onNavigateHome}
                className="hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.breadcrumbHome}</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              <span className="text-[#8c1d1e] dark:text-[#d4af37] font-bold">
                {t.breadcrumbShop}
              </span>
              {selectedMainCat !== 'all' && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  <span className="font-semibold text-[#1a1612] dark:text-[#f7e7ce]">
                    {mainCategories.find(c => c.id === selectedMainCat)?.label}
                  </span>
                </>
              )}
            </nav>

            {/* Live Gold & Silver Market Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white dark:bg-[#1f1b16] border border-[#e2d5be] dark:border-[#d4af37]/30 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-1.5 text-[#b8860b] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live 22K Gold: ₹{metalRate.gold22k}/g</span>
              </div>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <div className="text-[#5c5244] dark:text-[#f7e7ce]/80 font-medium">
                999 Silver: ₹{metalRate.silver999}/g
              </div>
            </div>
          </div>

          {/* Title & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ebd0] dark:bg-[#d4af37]/15 border border-[#b8860b]/30 text-[#8c1d1e] dark:text-[#d4af37] text-[11px] font-sans font-bold uppercase tracking-widest">
                <Crown className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>100% BIS Hallmarked Boutique</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                {t.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#6c6152] dark:text-[#f7e7ce]/70 max-w-2xl font-sans font-light">
                {t.subtitle}
              </p>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c7e6c]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={navT.searchPlaceholder}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#d8c8af] dark:border-[#d4af37]/30 text-[#1a1612] dark:text-[#f7e7ce] text-xs sm:text-sm font-sans placeholder-[#9b8d7a] focus:outline-none focus:ring-2 focus:ring-[#b8860b] shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Metal Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'all', label: treeT.metalTypes.all, icon: '👑' },
              { id: 'gold', label: treeT.metalTypes.gold, icon: '🟡' },
              { id: 'silver', label: treeT.metalTypes.silver, icon: '⚪' },
              { id: 'polki_kundan', label: treeT.metalTypes.polki_kundan, icon: '💎' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMetal(m.id)}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all duration-200 flex items-center gap-2 border ${
                  selectedMetal === m.id
                    ? 'bg-gradient-to-r from-[#b45309] to-[#d97706] text-white border-transparent shadow-md shadow-[#d97706]/20 scale-102'
                    : 'bg-white dark:bg-[#1f1b16] border-[#e2d5be] dark:border-[#383025] text-[#3d3226] dark:text-[#e8dec8] hover:border-[#b8860b] hover:bg-[#faf6ee] dark:hover:bg-[#2a241e]'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Shop Body: Sidebar Filters + Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            
            {/* Filter Card */}
            <div className="bg-white dark:bg-[#171411] border border-[#e6dac1] dark:border-[#332b21] rounded-3xl p-6 shadow-sm space-y-6 sticky top-24">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#ebdcc9] dark:border-[#2d261d]">
                <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#1a1612] dark:text-[#f7e7ce]">
                  <SlidersHorizontal className="w-5 h-5 text-[#b8860b]" />
                  <span>{t.filterHeading}</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-sans font-bold text-[#8c1d1e] dark:text-[#d4af37] hover:underline"
                  >
                    {t.clearAll} ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Main Categories Accordion/List */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-bold uppercase tracking-widest text-[#7a6d5c] dark:text-[#f7e7ce]/60">
                  {treeT.all}
                </label>
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {mainCategories.map((cat) => {
                    const isSelected = selectedMainCat === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedMainCat(cat.id);
                          setSelectedSubCat('all');
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-sans transition-all duration-200 flex items-center justify-between group border ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#b45309] to-[#d97706] text-white font-bold border-transparent shadow-sm'
                            : cat.isHighlight
                            ? 'bg-[#fffaf0] dark:bg-[#231d16] border-[#e7c788] dark:border-[#5a482b] text-[#5c3e0e] dark:text-[#fef08a] hover:bg-[#faebd7] font-semibold'
                            : 'bg-[#faf6ee]/70 dark:bg-[#1c1814] border-[#ebdcc9] dark:border-[#2d261d] text-[#332b21] dark:text-[#f3ede4] hover:bg-white dark:hover:bg-[#25201a] font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-sm">{cat.icon}</span>
                          <span className="truncate">{cat.label}</span>
                        </div>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${
                          isSelected 
                            ? 'bg-black/30 text-white' 
                            : 'bg-black/5 dark:bg-white/10 text-[#6d5f4e] dark:text-[#f7e7ce]/70'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subcategories (if available) */}
              {currentSubCategories.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#ebdcc9] dark:border-[#2d261d]">
                  <label className="text-xs font-sans font-bold uppercase tracking-widest text-[#7a6d5c] dark:text-[#f7e7ce]/60">
                    Sub-Design Filter
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedSubCat('all')}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-sans transition-all ${
                        selectedSubCat === 'all'
                          ? 'bg-[#8c1d1e] text-white font-bold'
                          : 'bg-[#f4ebd0] dark:bg-[#231d16] text-[#4d4030] dark:text-[#f7e7ce]/80 hover:bg-[#ebdcc9]'
                      }`}
                    >
                      All Types
                    </button>
                    {currentSubCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubCat(sub.id)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-sans transition-all ${
                          selectedSubCat === sub.id
                            ? 'bg-[#8c1d1e] text-white font-bold shadow-sm'
                            : 'bg-[#f4ebd0] dark:bg-[#231d16] text-[#4d4030] dark:text-[#f7e7ce]/80 hover:bg-[#ebdcc9]'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Slider */}
              <div className="space-y-3 pt-2 border-t border-[#ebdcc9] dark:border-[#2d261d]">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-bold uppercase tracking-widest text-[#7a6d5c] dark:text-[#f7e7ce]/60">
                    {t.priceRangeLabel}
                  </span>
                  <span className="font-serif font-bold text-[#b8860b] dark:text-[#d4af37]">
                    Up to ₹{(maxPrice).toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={1000000}
                  step={10000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#b8860b] cursor-pointer"
                />
                
                {/* Price Brackets quick click */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {[
                    { label: '< ₹50K', val: 50000 },
                    { label: '₹50K - ₹1.5L', val: 150000 },
                    { label: '₹1.5L - ₹4L', val: 400000 },
                    { label: 'All Budgets', val: 1000000 },
                  ].map((b) => (
                    <button
                      key={b.label}
                      onClick={() => setMaxPrice(b.val)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-sans font-medium text-center border ${
                        maxPrice === b.val
                          ? 'bg-[#b8860b]/20 border-[#b8860b] text-[#8c1d1e] dark:text-[#d4af37] font-bold'
                          : 'bg-[#faf6ee] dark:bg-[#201b15] border-[#ebdcc9] dark:border-[#383025] text-[#6d5f4e] dark:text-[#f7e7ce]/70'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purity Selection */}
              <div className="space-y-2 pt-2 border-t border-[#ebdcc9] dark:border-[#2d261d]">
                <label className="text-xs font-sans font-bold uppercase tracking-widest text-[#7a6d5c] dark:text-[#f7e7ce]/60">
                  {t.purityLabel}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Purity' },
                    { id: '22K 916', label: '22K 916 Gold' },
                    { id: '24K 999', label: '24K 999 Gold' },
                    { id: '999 Silver', label: '999 Fine Silver' },
                    { id: '925 Silver', label: '925 Silver' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPurity(p.id)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-sans transition-all border ${
                        selectedPurity === p.id
                          ? 'bg-[#1a1612] text-[#d4af37] dark:bg-[#d4af37] dark:text-black font-bold border-transparent'
                          : 'bg-[#faf6ee] dark:bg-[#201b15] border-[#ebdcc9] dark:border-[#383025] text-[#554737] dark:text-[#f7e7ce]/70'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Filter */}
              <div className="space-y-2 pt-2 border-t border-[#ebdcc9] dark:border-[#2d261d]">
                <label className="text-xs font-sans font-bold uppercase tracking-widest text-[#7a6d5c] dark:text-[#f7e7ce]/60">
                  {t.weightLabel}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'all', label: 'Any Weight' },
                    { id: 'light', label: 'Light (<15g)' },
                    { id: 'medium', label: 'Medium (15-40g)' },
                    { id: 'heavy', label: 'Grand (40g+)' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setWeightBracket(w.id)}
                      className={`px-2 py-1.5 rounded-xl text-[11px] font-sans text-center border ${
                        weightBracket === w.id
                          ? 'bg-[#b8860b] text-white font-bold border-transparent'
                          : 'bg-[#faf6ee] dark:bg-[#201b15] border-[#ebdcc9] dark:border-[#383025] text-[#554737] dark:text-[#f7e7ce]/70'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-2 border-t border-[#ebdcc9] dark:border-[#2d261d] flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-[#3d3226] dark:text-[#e8dec8]">
                  {t.inStockOnly}
                </span>
                <button
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    inStockOnly ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      inStockOnly ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>

          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 space-y-6">
            
            {/* Top Results Bar */}
            <div className="bg-white dark:bg-[#171411] border border-[#e6dac1] dark:border-[#332b21] rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-4 py-2 rounded-2xl bg-[#b8860b] text-white font-sans text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>

                <div className="text-sm font-sans font-medium text-[#5c5244] dark:text-[#f7e7ce]/70">
                  {t.showingResults.replace('{count}', filteredProducts.length.toString())}
                </div>

                {/* Active Filter Chips */}
                {selectedMainCat !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ebd0] dark:bg-[#d4af37]/20 border border-[#b8860b]/30 text-[#8c1d1e] dark:text-[#d4af37] text-xs font-sans font-semibold">
                    <span>{mainCategories.find(c => c.id === selectedMainCat)?.label}</span>
                    <button onClick={() => setSelectedMainCat('all')} className="hover:opacity-75">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedMetal !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ebd0] dark:bg-[#d4af37]/20 border border-[#b8860b]/30 text-[#8c1d1e] dark:text-[#d4af37] text-xs font-sans font-semibold">
                    <span>Metal: {selectedMetal}</span>
                    <button onClick={() => setSelectedMetal('all')} className="hover:opacity-75">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Sorting & Layout toggles */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                
                {/* Sort Dropdown */}
                <div className="relative flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#b8860b]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#faf6ee] dark:bg-[#201b15] border border-[#ebdcc9] dark:border-[#383025] rounded-xl px-3 py-2 text-xs font-sans font-semibold text-[#1a1612] dark:text-[#f7e7ce] focus:outline-none focus:ring-1 focus:ring-[#b8860b] cursor-pointer"
                  >
                    <option value="featured">{t.sortOptions.featured}</option>
                    <option value="price_asc">{t.sortOptions.priceAsc}</option>
                    <option value="price_desc">{t.sortOptions.priceDesc}</option>
                    <option value="rating">{t.sortOptions.rating}</option>
                    <option value="weight_desc">{t.sortOptions.weightDesc}</option>
                    <option value="newest">{t.sortOptions.newest}</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#faf6ee] dark:bg-[#201b15] border border-[#ebdcc9] dark:border-[#383025]">
                  <button
                    onClick={() => setViewMode('grid-spacious')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid-spacious'
                        ? 'bg-[#b8860b] text-white shadow-sm'
                        : 'text-[#6c6152] dark:text-[#f7e7ce]/60 hover:text-black dark:hover:text-white'
                    }`}
                    title="Spacious 3-Column Grid"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid-compact')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid-compact'
                        ? 'bg-[#b8860b] text-white shadow-sm'
                        : 'text-[#6c6152] dark:text-[#f7e7ce]/60 hover:text-black dark:hover:text-white'
                    }`}
                    title="Compact 4-Column Grid"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[#b8860b] text-white shadow-sm'
                        : 'text-[#6c6152] dark:text-[#f7e7ce]/60 hover:text-black dark:hover:text-white'
                    }`}
                    title="Detailed List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

            {/* PRODUCT LISTINGS */}
            {filteredProducts.length === 0 ? (
              
              /* Empty State */
              <div className="bg-white dark:bg-[#171411] border border-[#e6dac1] dark:border-[#332b21] rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#f4ebd0] dark:bg-[#d4af37]/15 flex items-center justify-center mx-auto text-[#b8860b]">
                  <Gem className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                  {t.noProductsTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#6c6152] dark:text-[#f7e7ce]/70 font-sans">
                  {t.noProductsDesc}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#b45309] to-[#d97706] text-white font-sans text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all"
                >
                  {t.resetFilters}
                </button>
              </div>

            ) : viewMode === 'list' ? (

              /* LIST VIEW */
              <div className="space-y-4">
                {filteredProducts.map((p) => {
                  const isWishlisted = wishlistIds.includes(p.id);
                  const isBreakdownOpen = activePriceBreakdownId === p.id;
                  const goldBaseValue = Math.round(p.goldWeightGrams * metalRate.gold22k);
                  const makingCharge = Math.round((goldBaseValue * p.makingChargesPercent) / 100);
                  const gst = Math.round((goldBaseValue + makingCharge) * 0.03);

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-[#171411] border border-[#e6dac1] dark:border-[#332b21] rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-center"
                    >
                      {/* Image */}
                      <div className="relative w-full md:w-56 h-52 shrink-0 rounded-2xl overflow-hidden bg-[#0d1f1c]">
                        <img
                          src={p.image}
                          alt={p.name[currentLang]}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={() => onToggleWishlist(p)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                            isWishlisted
                              ? 'bg-rose-500 text-white'
                              : 'bg-black/50 text-white hover:bg-rose-500'
                          }`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        {p.isPrimeCollection && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#b8860b] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                            👑 Heritage Prime
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-3 w-full">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300">
                            ✓ {p.purity} BIS Hallmarked
                          </span>
                          <span className="text-xs text-[#7a6d5c] dark:text-[#f7e7ce]/70">
                            Weight: <strong className="text-[#1a1612] dark:text-white">{p.goldWeightGrams}g</strong>
                          </span>
                          <span className="text-xs text-[#7a6d5c] dark:text-[#f7e7ce]/70">
                            HUID: <code className="text-[#b8860b] font-mono font-bold">{p.hallmarkCode}</code>
                          </span>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                          {p.name[currentLang]}
                        </h3>

                        <p className="text-xs text-[#6c6152] dark:text-[#f7e7ce]/70 line-clamp-2">
                          {p.description[currentLang]}
                        </p>

                        <div className="flex items-center gap-1 text-amber-500 text-xs">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold text-[#1a1612] dark:text-white">{p.rating}</span>
                          <span className="text-gray-400">({p.reviewCount} reviews)</span>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="w-full md:w-56 shrink-0 flex flex-col justify-between gap-3 border-t md:border-t-0 md:border-l border-[#ebdcc9] dark:border-[#2d261d] pt-4 md:pt-0 md:pl-6">
                        <div>
                          <div className="text-xs text-[#7a6d5c] dark:text-[#f7e7ce]/60 font-sans">
                            Estimated Price:
                          </div>
                          <div className="text-2xl font-serif font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                            ₹{p.price.toLocaleString('en-IN')}
                          </div>
                          <button
                            onClick={() => setActivePriceBreakdownId(isBreakdownOpen ? null : p.id)}
                            className="text-[11px] text-[#b8860b] hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Info className="w-3 h-3" />
                            <span>View Price Breakdown</span>
                          </button>

                          {isBreakdownOpen && (
                            <div className="mt-2 p-2.5 rounded-xl bg-[#faf6ee] dark:bg-[#201b15] text-[10px] space-y-1 border border-[#ebdcc9] dark:border-[#383025]">
                              <div className="flex justify-between"><span>Gold Value:</span><span>₹{goldBaseValue.toLocaleString('en-IN')}</span></div>
                              <div className="flex justify-between"><span>Making ({p.makingChargesPercent}%):</span><span>₹{makingCharge.toLocaleString('en-IN')}</span></div>
                              <div className="flex justify-between"><span>GST (3%):</span><span>₹{gst.toLocaleString('en-IN')}</span></div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={() => onAddToCart(p)}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#b45309] to-[#d97706] text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-md transition-all"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </button>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => onQuickView(p)}
                              className="py-1.5 rounded-lg border border-[#ebdcc9] dark:border-[#383025] hover:bg-[#faf6ee] dark:hover:bg-[#201b15] text-[11px] font-sans font-semibold text-center"
                            >
                              Quick View
                            </button>
                            <button
                              onClick={() => onTryOn(p)}
                              className="py-1.5 rounded-lg bg-[#f4ebd0] dark:bg-[#d4af37]/20 text-[#8c1d1e] dark:text-[#d4af37] text-[11px] font-sans font-bold text-center"
                            >
                              ✨ Try-On
                            </button>
                          </div>

                          <button
                            onClick={() => handleWhatsAppEnquiry(p)}
                            className="w-full py-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-sans font-bold flex items-center justify-center gap-1 border border-emerald-200 dark:border-emerald-800"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp Inquire</span>
                          </button>
                        </div>

                      </div>

                    </motion.div>
                  );
                })}
              </div>

            ) : (

              /* GRID VIEW (Compact / Spacious) */
              <div className={`grid gap-6 ${
                viewMode === 'grid-compact'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredProducts.map((p, idx) => {
                  const isWishlisted = wishlistIds.includes(p.id);
                  const isBreakdownOpen = activePriceBreakdownId === p.id;
                  const goldBaseValue = Math.round(p.goldWeightGrams * metalRate.gold22k);
                  const makingCharge = Math.round((goldBaseValue * p.makingChargesPercent) / 100);
                  const gst = Math.round((goldBaseValue + makingCharge) * 0.03);

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                      className="group bg-white dark:bg-[#171411] border border-[#e6dac1] dark:border-[#332b21] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col justify-between"
                    >
                      {/* Image Frame */}
                      <div className="relative h-64 sm:h-72 w-full bg-[#0d1f1c] overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name[currentLang]}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-60 transition-opacity" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                          <div className="flex flex-col gap-1">
                            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#f7e7ce] text-[10px] font-sans font-bold uppercase tracking-wider">
                              {p.purity}
                            </span>
                            {p.isPrimeCollection && (
                              <span className="px-2.5 py-1 rounded-full bg-[#8c1d1e] text-white text-[9px] font-bold uppercase tracking-wider shadow">
                                👑 Heritage
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => onToggleWishlist(p)}
                            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                              isWishlisted
                                ? 'bg-rose-500 text-white scale-110'
                                : 'bg-black/40 text-white hover:bg-rose-500 hover:scale-110'
                            }`}
                            title="Add to Wishlist"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        {/* Quick Hover Action Bar */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <button
                            onClick={() => onQuickView(p)}
                            className="flex-1 py-2 px-3 rounded-xl bg-white/90 dark:bg-[#1a1612]/90 backdrop-blur-md text-[#1a1612] dark:text-[#f7e7ce] text-xs font-sans font-bold flex items-center justify-center gap-1.5 shadow-lg hover:bg-white dark:hover:bg-black transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#b8860b]" />
                            <span>Quick View</span>
                          </button>
                          <button
                            onClick={() => onTryOn(p)}
                            className="py-2 px-3 rounded-xl bg-[#d4af37] text-black text-xs font-sans font-bold flex items-center justify-center gap-1 shadow-lg hover:bg-[#e6c258] transition-colors"
                            title="Virtual Try-On"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Try On</span>
                          </button>
                        </div>

                        {/* Weight Badge */}
                        <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity">
                          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-sans font-semibold border border-white/10">
                            ⚖️ {p.goldWeightGrams}g
                          </span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono text-[#b8860b] dark:text-[#d4af37] font-bold">
                              HUID: {p.hallmarkCode}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500 font-bold">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{p.rating}</span>
                              <span className="text-gray-400 font-normal">({p.reviewCount})</span>
                            </div>
                          </div>

                          <h3 className="text-base sm:text-lg font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce] line-clamp-1 group-hover:text-[#b8860b] transition-colors">
                            {p.name[currentLang]}
                          </h3>

                          <p className="text-xs text-[#6c6152] dark:text-[#f7e7ce]/70 line-clamp-2 font-sans font-light">
                            {p.subtitle[currentLang]}
                          </p>
                        </div>

                        {/* Price & Add to Bag */}
                        <div className="pt-3 border-t border-[#ebdcc9] dark:border-[#2d261d] space-y-3">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <div className="text-[10px] text-[#7a6d5c] dark:text-[#f7e7ce]/60 uppercase tracking-widest font-sans font-bold">
                                Price (incl. GST)
                              </div>
                              <div className="text-xl sm:text-2xl font-serif font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                                ₹{p.price.toLocaleString('en-IN')}
                              </div>
                            </div>

                            <button
                              onClick={() => setActivePriceBreakdownId(isBreakdownOpen ? null : p.id)}
                              className="text-[10px] text-[#b8860b] hover:underline font-semibold"
                            >
                              {isBreakdownOpen ? 'Hide' : 'Breakdown'}
                            </button>
                          </div>

                          {isBreakdownOpen && (
                            <div className="p-2.5 rounded-xl bg-[#faf6ee] dark:bg-[#201b15] text-[10px] space-y-1 border border-[#ebdcc9] dark:border-[#383025]">
                              <div className="flex justify-between"><span>Gold Base:</span><span>₹{goldBaseValue.toLocaleString('en-IN')}</span></div>
                              <div className="flex justify-between"><span>Making ({p.makingChargesPercent}%):</span><span>₹{makingCharge.toLocaleString('en-IN')}</span></div>
                              <div className="flex justify-between"><span>GST (3%):</span><span>₹{gst.toLocaleString('en-IN')}</span></div>
                            </div>
                          )}

                          <div className="grid grid-cols-5 gap-2">
                            <button
                              onClick={() => onAddToCart(p)}
                              className="col-span-4 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#b45309] to-[#d97706] text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow hover:shadow-md transition-all active:scale-98"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Bag</span>
                            </button>
                            
                            <button
                              onClick={() => handleWhatsAppEnquiry(p)}
                              className="col-span-1 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                              title="Inquire on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          </div>

                        </div>

                      </div>

                    </motion.div>
                  );
                })}
              </div>

            )}

          </main>

        </div>
      </div>

      {/* MOBILE DRAWER FILTERS */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-[#171411] z-50 p-6 overflow-y-auto space-y-6 shadow-2xl lg:hidden text-[#1a1612] dark:text-[#f7e7ce]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#ebdcc9] dark:border-[#2d261d]">
                <div className="flex items-center gap-2 font-serif font-bold text-lg">
                  <SlidersHorizontal className="w-5 h-5 text-[#b8860b]" />
                  <span>{t.filterHeading}</span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Main Categories */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-bold uppercase tracking-widest text-[#7a6d5c]">
                  Categories
                </label>
                <div className="space-y-1.5">
                  {mainCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedMainCat(cat.id);
                        setSelectedSubCat('all');
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans flex items-center justify-between border ${
                        selectedMainCat === cat.id
                          ? 'bg-[#b8860b] text-white font-bold border-transparent'
                          : 'bg-[#faf6ee] dark:bg-[#1f1b16] border-[#ebdcc9] dark:border-[#332b21] text-[#332b21] dark:text-[#f3ede4]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </div>
                      <span className="text-[10px] opacity-75">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span>Price Range</span>
                  <span className="font-bold text-[#b8860b]">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={1000000}
                  step={10000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#b8860b]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#ebdcc9] dark:border-[#2d261d] space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-2xl bg-[#b8860b] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2.5 rounded-2xl border border-[#ebdcc9] dark:border-[#383025] text-xs font-sans font-bold"
                >
                  Reset All
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
