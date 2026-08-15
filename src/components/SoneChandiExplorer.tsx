import React, { useState, useMemo } from 'react';
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
  Tag
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
}) => {
  const [activeMainCat, setActiveMainCat] = useState<string>(selectedMainCategory || 'all');
  const [activeSubCat, setActiveSubCat] = useState<string>('all');
  const [activeMetal, setActiveMetal] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [weightFilter, setWeightFilter] = useState<string>('all'); // all, light, medium, heavy
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all'); // all, inStock
  const [sortBy, setSortBy] = useState<string>('featured'); // featured, price_asc, price_desc, rating, new
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activePriceBreakdownId, setActivePriceBreakdownId] = useState<string | null>(null);

  const treeT = translations[currentLang].categoryTree;
  const navT = translations[currentLang].nav;

  // Main Categories definition
  const mainCategories: { id: MainCategory | 'all'; label: string; icon: string; desc: string }[] = [
    { id: 'all', label: treeT.all, icon: '👑', desc: 'Explore all 30-Year Heritage Gold & Silver Masterpieces' },
    { id: 'sir_matha', label: treeT.mainCategories.sir_matha, icon: '✨', desc: 'Royal Bridal Maang Tikkas, Borla & Shephool' },
    { id: 'kaan', label: treeT.mainCategories.kaan, icon: '💎', desc: 'Handcrafted Jhumkas, Karnfool & Imperial Balis' },
    { id: 'gala', label: treeT.mainCategories.gala, icon: '📿', desc: 'Grand Rani Haars, Mangalsutras, Chokers & Hansli' },
    { id: 'haath_kalaai', label: treeT.mainCategories.haath_kalaai, icon: '👑', desc: 'Royal Kangans, Bajuvaands & Artisanal Haath Phools' },
    { id: 'ungliyan', label: treeT.mainCategories.ungliyan, icon: '💍', desc: '22K Gold Rings & Royal Nizam Arsi Mirror Rings' },
    { id: 'kamar', label: treeT.mainCategories.kamar, icon: '✨', desc: 'Temple Heritage Kardhani & Tagdi Waistbelts' },
    { id: 'pairon_chandi', label: treeT.mainCategories.pairon_chandi, icon: '🌟', desc: '999 Fine Silver Payals, Jhanjhar & Bichhiya' },
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
          <a href="#" className="flex items-center gap-1 hover:text-[#d4af37] transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </a>
          <ChevronRight className="w-3 h-3 text-[#d4af37]/60" />
          <button 
            onClick={() => { setActiveMainCat('all'); setActiveSubCat('all'); }}
            className="hover:text-[#d4af37] transition-colors"
          >
            Sone-Chandi Catalog
          </button>
          
          {activeMainCat !== 'all' && (
            <>
              <ChevronRight className="w-3 h-3 text-[#d4af37]/60" />
              <button 
                onClick={() => setActiveSubCat('all')}
                className="hover:text-[#d4af37] transition-colors font-medium text-[#d4af37]"
              >
                {activeMainCatObj.label}
              </button>
            </>
          )}

          {activeSubCat !== 'all' && activeSubCatLabel && (
            <>
              <ChevronRight className="w-3 h-3 text-[#d4af37]/60" />
              <span className="font-bold text-[#d4af37]">
                {activeSubCatLabel}
              </span>
            </>
          )}
        </nav>

        {/* Dynamic Category Banner Header */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#05110d] via-[#0b2239] to-[#0d3b2e] border border-[#d4af37]/40 text-[#f7e7ce] overflow-hidden shadow-2xl">
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

            <p className="text-xs sm:text-sm text-[#f7e7ce]/80 font-sans max-w-xl leading-relaxed">
              {activeMainCatObj.desc}. 100% BIS Hallmarked 22K/24K Gold & 999 Fine Silver Crafted by Heritage Artisans in Sariya.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#d4af37]">
              <span>Showing <strong>{filteredProducts.length}</strong> Designs</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                BIS Hallmarked
              </span>
            </div>
          </div>
        </div>

        {/* Level 1: Main Categories Navigation Tabs */}
        <div className="space-y-3">
          <div className="text-xs font-sans font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Select Category (श्रेणी चुनें)</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {mainCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveMainCat(cat.id);
                  setActiveSubCat('all');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all duration-300 flex items-center gap-2 shadow-sm ${
                  activeMainCat === cat.id
                    ? 'gold-shimmer-btn border border-[#d4af37] scale-102 shadow-lg'
                    : 'theme-bg-surface theme-text-primary border theme-border hover:border-[#d4af37]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Level 2: Sub-Categories Filters (if applicable) */}
        {availableSubCats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl theme-bg-surface border theme-border space-y-2.5 shadow-md"
          >
            <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Sub-Category Designs (विशेष प्रकार)</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveSubCat('all')}
                className={`px-3 py-1 rounded-lg text-xs font-sans transition-all ${
                  activeSubCat === 'all'
                    ? 'bg-[#d4af37] text-black font-bold shadow-md'
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
                      ? 'bg-[#d4af37] text-black font-bold shadow-md'
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
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1">
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
                          ? 'bg-[#d4af37] text-black font-bold'
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
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Weight:
                </span>
                <select
                  value={weightFilter}
                  onChange={(e) => setWeightFilter(e.target.value)}
                  className="theme-bg-card theme-text-primary text-xs rounded-lg px-2.5 py-1 border theme-border focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="all">All Weights</option>
                  <option value="light">Light (&lt;15g)</option>
                  <option value="medium">Medium (15g–40g)</option>
                  <option value="heavy">Heavy Grand (40g+)</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="flex items-center gap-2 border-l theme-border pl-4">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Max Price:
                </span>
                <input
                  type="range"
                  min="10000"
                  max="600000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-[#d4af37] cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-[#d4af37]">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Sorting & View Toggle Controls */}
            <div className="flex items-center gap-3 ml-auto">
              
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#d4af37]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="theme-bg-card theme-text-primary text-xs rounded-lg px-3 py-1.5 border theme-border focus:outline-none focus:border-[#d4af37] font-sans"
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
                      ? 'bg-[#d4af37] text-black shadow-sm'
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
                      ? 'bg-[#d4af37] text-black shadow-sm'
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
          /* Grid View (4 Cols Desktop, 3 Tablet, 2 Mobile) */
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
                        <span className="bg-[#d4af37] text-black font-bold text-[9px] font-sans uppercase tracking-wider px-2 py-0.5 rounded shadow-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          {product.purity}
                        </span>
                        {product.isPrimeCollection && (
                          <span className="bg-amber-600 text-white font-bold text-[8px] font-sans uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
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
                            : 'theme-bg-primary theme-border theme-text-primary hover:text-[#d4af37]'
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
                          className="flex-1 bg-[#d4af37] text-black text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 hover:bg-amber-300 transition-all shadow-lg"
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
                          <span className="uppercase tracking-wider font-bold text-[#d4af37]">
                            {product.hallmarkCode}
                          </span>
                          <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>

                        <h3 className="text-sm font-serif font-medium theme-text-primary group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-1">
                          {product.name[currentLang]}
                        </h3>

                        <div className="flex items-center gap-2 text-[10px] theme-text-secondary">
                          <span className="font-mono font-bold text-[#d4af37]">
                            {product.goldWeightGrams}g Weight
                          </span>
                          <span>•</span>
                          <span>{product.inStock ? 'In Stock Sariya' : 'Custom Order'}</span>
                        </div>
                      </div>

                      {/* Price + Breakdown Info Toggle */}
                      <div className="pt-2 border-t theme-border space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-base font-mono font-bold text-[#d4af37]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => setActivePriceBreakdownId(isBreakdownOpen ? null : product.id)}
                              className="text-xs text-[#d4af37] hover:text-amber-300 transition-colors"
                              title="View Price Breakdown"
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[9px] theme-text-secondary uppercase">
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
                            <div className="flex justify-between text-amber-500">
                              <span>Making Charges (~12%):</span>
                              <span>₹{Math.round(product.price * 0.12).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between border-t theme-border pt-1 font-bold text-[#d4af37]">
                              <span>GST (3%):</span>
                              <span>₹{Math.round(product.price * 0.03).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        )}

                        {/* Card Action Buttons (Add to Bag & WhatsApp Inquiry) */}
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
          /* List View (Horizontal Stretch) */
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
                    {/* List Image */}
                    <div className="relative w-full sm:w-48 aspect-square rounded-xl overflow-hidden bg-black/5 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name[currentLang]}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 bg-[#d4af37] text-black font-bold text-[9px] uppercase px-2 py-0.5 rounded shadow">
                        {product.purity}
                      </span>
                    </div>

                    {/* List Details */}
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[10px] font-mono theme-text-secondary">
                        <span className="text-[#d4af37] font-bold">{product.hallmarkCode}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          {product.rating} ({product.reviewCount} reviews)
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-medium theme-text-primary">
                        {product.name[currentLang]}
                      </h3>

                      <p className="text-xs theme-text-secondary max-w-xl">
                        {product.subtitle[currentLang]}
                      </p>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-mono">
                        <span className="bg-[#d4af37]/10 text-[#d4af37] px-2.5 py-0.5 rounded border border-[#d4af37]/30 font-bold">
                          Weight: {product.goldWeightGrams}g
                        </span>
                        <span className="theme-text-secondary">
                          Purity: {product.purity}
                        </span>
                      </div>
                    </div>

                    {/* List Price & Action Column */}
                    <div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0 w-full sm:w-auto border-t sm:border-t-0 sm:border-l theme-border pt-4 sm:pt-0 sm:pl-5">
                      <div className="text-center sm:text-right">
                        <div className="text-[10px] uppercase theme-text-secondary font-mono">Estimated Price</div>
                        <div className="text-xl font-mono font-bold text-[#d4af37]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="gold-shimmer-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md flex-1 sm:flex-initial"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>

                        <a
                          href={getWhatsAppUrl(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md flex-1 sm:flex-initial"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-200 fill-current" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 theme-bg-surface border theme-border rounded-2xl space-y-3">
            <Gem className="w-10 h-10 text-[#d4af37] mx-auto animate-bounce" />
            <h3 className="text-xl font-serif theme-text-primary">No designs match this specific filter combination</h3>
            <p className="text-xs theme-text-secondary">Try clearing price sliders or resetting category filters.</p>
            <button
              onClick={() => {
                setActiveMainCat('all');
                setActiveSubCat('all');
                setActiveMetal('all');
                setMaxPrice(600000);
                setWeightFilter('all');
              }}
              className="px-5 py-2 rounded-xl bg-[#d4af37] text-black text-xs font-bold shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
