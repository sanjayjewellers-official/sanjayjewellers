import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Globe, 
  Calendar, 
  Phone, 
  ChevronDown,
  ShieldCheck, 
  TrendingUp,
  Sun, 
  Moon,
  Layers,
  Crown,
  Sparkle,
  Gem,
  Check
} from 'lucide-react';
import { Language, MetalRate, Theme } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeToggle: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBooking: () => void;
  onOpenSearch: () => void;
  metalRate: MetalRate;
  currentPage?: 'home' | 'shop';
  onNavigatePage?: (page: 'home' | 'shop', category?: string) => void;
  onSelectMainCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeToggle,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBooking,
  onOpenSearch,
  metalRate,
  currentPage = 'home',
  onNavigatePage,
  onSelectMainCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  const t = translations[currentLang].nav;
  const treeT = translations[currentLang].categoryTree;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  ];

  const mainCategoriesList = [
    { 
      id: 'all', 
      label: treeT.all, 
      desc: 'All 30-Year Heritage Gold & Silver Masterpieces',
      icon: '👑',
      isHighlight: false 
    },
    { 
      id: 'pairon_chandi', 
      label: treeT.mainCategories.pairon_chandi, 
      desc: '999 Fine Silver Bridal Payals & Bichhiya',
      badge: '🌟 Payal Special',
      icon: '✨',
      isHighlight: true,
      highlightType: 'payal' 
    },
    { 
      id: 'gala', 
      label: treeT.mainCategories.gala, 
      desc: 'Rani Haar, Mangalsutra, Hansli & Chokers',
      badge: '👑 Desi Haar',
      icon: '📿',
      isHighlight: true,
      highlightType: 'desi' 
    },
    { 
      id: 'sir_matha', 
      label: treeT.mainCategories.sir_matha, 
      desc: 'Bridal Maang Tikka, Borla & Shephool',
      badge: '👑 Shringaar',
      icon: '✨',
      isHighlight: true,
      highlightType: 'desi' 
    },
    { 
      id: 'haath_kalaai', 
      label: treeT.mainCategories.haath_kalaai, 
      desc: 'Royal Temple Kada, Bajuvaand & Haath Phool',
      icon: '💫',
      isHighlight: false 
    },
    { 
      id: 'kaan', 
      label: treeT.mainCategories.kaan, 
      desc: 'Chandbali, Jhumka & Jaipuri Karnfool',
      icon: '💎',
      isHighlight: false 
    },
    { 
      id: 'ungliyan', 
      label: treeT.mainCategories.ungliyan, 
      desc: 'Cocktail Rings & Royal Heritage Bands',
      icon: '💍',
      isHighlight: false 
    },
    { 
      id: 'kamar', 
      label: treeT.mainCategories.kamar, 
      desc: 'Temple Heritage Kardhani & Tagdi Belts',
      icon: '✨',
      isHighlight: false 
    },
  ];

  const handleCategorySelect = (catId: string) => {
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage('shop', catId);
    } else if (onSelectMainCategory) {
      onSelectMainCategory(catId);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Ultra-Slim Top Ticker Bar (Single Clean Line, No Wrapping at 100% Zoom) */}
      <div className="bg-[#14100b] dark:bg-[#030a08] border-b border-[#d4af37]/30 text-xs text-[#f7e7ce] py-1 px-4 sm:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Compact Bullion Rates & Hallmark Badge */}
          <div className="flex items-center gap-3 overflow-hidden text-[11px] font-sans">
            <div className="hidden sm:flex items-center gap-1 text-[#d4af37] font-bold uppercase tracking-wider text-[10px] bg-[#d4af37]/15 px-2 py-0.5 rounded-full border border-[#d4af37]/40 shrink-0">
              <TrendingUp className="w-3 h-3 text-[#d4af37]" />
              <span>Live Rates:</span>
            </div>
            
            <div className="flex items-center gap-2 font-mono text-[11px] truncate">
              <span><strong>24K:</strong> ₹{metalRate.gold24k}/g</span>
              <span className="text-[#d4af37]/40">•</span>
              <span className="text-[#d4af37] font-bold"><strong>22K:</strong> ₹{metalRate.gold22k}/g</span>
              <span className="text-[#d4af37]/40">•</span>
              <span><strong>999 Silver:</strong> ₹{metalRate.silver999}/g</span>
            </div>

            <span className="hidden md:flex items-center gap-1 text-[#d4af37] text-[10px] font-sans tracking-wide ml-2 shrink-0">
              <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
              <span>100% BIS Hallmarked</span>
            </span>
          </div>

          {/* Right: Theme Toggle, Direct Phone & Language */}
          <div className="flex items-center gap-2.5 shrink-0 ml-auto text-[11px]">
            <a href="tel:+919425275511" className="hidden sm:flex items-center gap-1 hover:text-[#d4af37] transition-colors text-[#f7e7ce]/80">
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>+91 94252 75511</span>
            </a>

            <span className="hidden sm:inline text-white/20">|</span>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="flex items-center gap-1 bg-[#251e14] dark:bg-[#0d1f19] border border-[#d4af37]/40 hover:border-[#d4af37] px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold text-[#d4af37] transition-all"
              title="Toggle Theme Mode"
            >
              {currentTheme === 'dark' ? (
                <>
                  <Sun className="w-3 h-3 text-amber-300" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-amber-200" />
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 bg-[#251e14] dark:bg-[#0d1f19] border border-[#d4af37]/40 hover:border-[#d4af37] px-2 py-0.5 rounded-full text-[10px] font-sans font-bold text-[#d4af37] transition-all"
              >
                <Globe className="w-3 h-3 text-[#d4af37]" />
                <span>{languages.find(l => l.code === currentLang)?.nativeName}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-[#0d1f19] border border-[#d4af37]/40 rounded-xl shadow-2xl overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                        currentLang === lang.code 
                          ? 'text-[#b8860b] dark:text-[#d4af37] font-bold bg-[#d4af37]/10' 
                          : 'text-[#1a1612] dark:text-[#f7e7ce]/80 hover:bg-[#faf6ee] dark:hover:bg-[#1a2f27]'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[9px] uppercase opacity-70">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Header (Compact & Balanced Height) */}
      <div className={`transition-all duration-300 bg-white/95 dark:bg-[#0a0806]/95 backdrop-blur-md border-b border-[#ebdcc9] dark:border-[#382f25] text-[#1a1612] dark:text-[#f7e7ce] ${
        isScrolled ? 'py-2 shadow-md' : 'py-2.5 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Heritage Crest */}
          <button 
            onClick={() => onNavigatePage?.('home')}
            className="flex items-center gap-2.5 group text-left shrink-0"
          >
            <div className="relative w-9 h-9 rounded-full border-2 border-[#b8860b] dark:border-[#d4af37] flex items-center justify-center bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-xs font-serif font-bold text-[#b8860b] dark:text-[#d4af37]">SJS</span>
              <Sparkles className="w-2.5 h-2.5 text-[#b8860b] absolute -top-0.5 -right-0.5" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-serif font-bold tracking-[0.1em] text-[#1a1612] dark:text-[#f7e7ce] leading-tight">
                SANJAY JEWELLERS
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                Sariya • 30 Yrs Heritage
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-sans font-semibold uppercase tracking-wider text-[#4d4030] dark:text-[#d1c7b7]">
            
            {/* Home */}
            <button 
              onClick={() => onNavigatePage?.('home')}
              className={`hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors py-1 ${
                currentPage === 'home' 
                  ? 'text-[#8c1d1e] dark:text-[#d4af37] font-bold border-b-2 border-[#b8860b] dark:border-[#d4af37]' 
                  : ''
              }`}
            >
              {t.home}
            </button>

            {/* Dedicated Shop Now Boutique */}
            <button 
              onClick={() => onNavigatePage?.('shop', 'all')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                currentPage === 'shop'
                  ? 'bg-gradient-to-r from-[#b45309] to-[#d97706] text-white border-transparent shadow-md shadow-[#d97706]/20 scale-102'
                  : 'bg-[#fff8eb] dark:bg-[#201812] border-[#e2c48c] dark:border-[#523d24] text-[#8c4608] dark:text-[#fde047] hover:bg-[#faebd7] hover:border-[#b8860b]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shop Now</span>
              <span className="text-[9px] bg-[#8c1d1e] text-white px-1.5 py-0.2 rounded-full uppercase font-bold">
                All
              </span>
            </button>

            {/* Categories Dropdown (Opens Shop with Category) */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all border ${
                  categoryDropdownOpen
                    ? 'bg-[#b8860b]/15 border-[#b8860b] text-[#b8860b] dark:text-[#d4af37]'
                    : 'bg-[#faf6ee] dark:bg-[#1a1612] border-[#e2d5be] dark:border-[#383025] text-[#332b21] dark:text-[#e8dec8] hover:border-[#b8860b]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Categories</span>
                <ChevronDown className={`w-3 h-3 text-[#b8860b] transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-[#171411] border-2 border-[#b8860b]/40 dark:border-[#d4af37]/40 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn text-left">
                  <div className="px-4 py-2 border-b border-[#ebdcc9] dark:border-[#2d261d] text-[10px] font-bold uppercase tracking-wider text-[#b8860b] flex items-center justify-between">
                    <span>Explore by Category</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
                    {mainCategoriesList.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#faf6ee] dark:hover:bg-[#25201a] transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span className="font-medium text-[#1a1612] dark:text-[#f7e7ce]">{cat.label}</span>
                        </span>
                        {cat.badge && (
                          <span className="text-[9px] bg-[#8c1d1e] text-white px-1.5 py-0.2 rounded-full font-bold">
                            {cat.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Direct Links */}
            <a 
              href="#rate-calculator" 
              onClick={() => { if (currentPage !== 'home') onNavigatePage?.('home'); }}
              className="hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors py-1"
            >
              Live Gold Rate
            </a>

            <a 
              href="#craftsmanship" 
              onClick={() => { if (currentPage !== 'home') onNavigatePage?.('home'); }}
              className="hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors py-1"
            >
              Heritage
            </a>

            <a 
              href="#reviews" 
              onClick={() => { if (currentPage !== 'home') onNavigatePage?.('home'); }}
              className="hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors py-1"
            >
              Reviews
            </a>
          </nav>

          {/* Action Utilities & Compact VIP Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#5c5244] dark:text-[#f7e7ce]/80 hover:text-[#b8860b] hover:bg-[#faf6ee] dark:hover:bg-[#201812] rounded-full transition-all"
              title="Search Jewellery"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#5c5244] dark:text-[#f7e7ce]/80 hover:text-[#b8860b] hover:bg-[#faf6ee] dark:hover:bg-[#201812] rounded-full relative transition-all"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#b8860b] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="p-2 text-[#5c5244] dark:text-[#f7e7ce]/80 hover:text-[#b8860b] hover:bg-[#faf6ee] dark:hover:bg-[#201812] rounded-full relative transition-all"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#8c1d1e] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Compact VIP Booking Button */}
            <button
              onClick={onOpenBooking}
              className="hidden md:flex items-center gap-1.5 bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#05110d] hover:bg-[#8c1d1e] transition-colors font-sans font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-full shadow-sm"
            >
              <Calendar className="w-3 h-3" />
              <span>Book VIP Visit</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#b8860b] dark:text-[#d4af37]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#14100b] border-b border-[#ebdcc9] dark:border-[#382f25] px-6 py-5 space-y-4 text-[#1a1612] dark:text-[#f7e7ce] shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          
          <nav className="flex flex-col space-y-2 font-medium text-sm">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage?.('home');
              }}
              className="text-left font-bold text-sm text-[#8c1d1e] dark:text-[#d4af37] py-2 border-b border-[#ebdcc9] dark:border-[#2d261d] flex items-center gap-2"
            >
              <span>🏰</span>
              <span>Home</span>
            </button>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage?.('shop', 'all');
              }}
              className="text-left font-bold text-sm py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#b45309] to-[#d97706] text-white flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Now (Dedicated Boutique)</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase">All</span>
            </button>

            {/* Mobile Category Options */}
            <div className="py-2 border-b border-[#ebdcc9] dark:border-[#2d261d] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a6d5c] block mb-1">
                Shop By Category
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {mainCategoriesList.slice(1).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="p-2 rounded-lg text-left text-xs bg-[#faf6ee] dark:bg-[#1a1612] border border-[#ebdcc9] dark:border-[#2d261d] truncate"
                  >
                    <span>{cat.icon} {cat.label.split('(')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <a 
              href="#rate-calculator" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage !== 'home') onNavigatePage?.('home');
              }}
              className="hover:text-[#b8860b] py-1.5 border-b border-[#ebdcc9] dark:border-[#2d261d] block"
            >
              Live Gold Rate
            </a>

            <a 
              href="#craftsmanship" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage !== 'home') onNavigatePage?.('home');
              }}
              className="hover:text-[#b8860b] py-1.5 border-b border-[#ebdcc9] dark:border-[#2d261d] block"
            >
              Heritage & Craftsmanship
            </a>

            <a 
              href="#reviews" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage !== 'home') onNavigatePage?.('home');
              }}
              className="hover:text-[#b8860b] py-1.5 border-b border-[#ebdcc9] dark:border-[#2d261d] block"
            >
              Royal Customer Reviews
            </a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#b8860b] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-2xl shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>Book VIP Appointment</span>
          </button>
        </div>
      )}
    </header>
  );
};
