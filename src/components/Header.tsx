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
      setIsScrolled(window.scrollY > 30);
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
      desc: '999 Fine Silver Bridal Payals, Jhanjhar & Bichhiya',
      badge: '🌟 Payal & Chandi Special',
      icon: '✨',
      isHighlight: true,
      highlightType: 'payal' 
    },
    { 
      id: 'gala', 
      label: treeT.mainCategories.gala, 
      desc: 'Desi Rani Haar, Mangalsutra, Hansli & Chokers',
      badge: '👑 Desi Jewellery Heritage',
      icon: '📿',
      isHighlight: true,
      highlightType: 'desi' 
    },
    { 
      id: 'sir_matha', 
      label: treeT.mainCategories.sir_matha, 
      desc: 'Desi Rajasthani Borla, Maang Tikka & Shephool',
      badge: '👑 Desi Shringaar',
      icon: '✨',
      isHighlight: true,
      highlightType: 'desi' 
    },
    { 
      id: 'haath_kalaai', 
      label: treeT.mainCategories.haath_kalaai, 
      desc: 'Royal Temple Kada, Bajuvaand & Haath Phool',
      badge: '👑 Desi Kada & Armlets',
      icon: '💫',
      isHighlight: false 
    },
    { 
      id: 'kaan', 
      label: treeT.mainCategories.kaan, 
      desc: 'Shahi Chandbali, Jhumka & Jaipuri Karnfool',
      icon: '💎',
      isHighlight: false 
    },
    { 
      id: 'ungliyan', 
      label: treeT.mainCategories.ungliyan, 
      desc: 'Cocktail Rings & Royal Nizam Arsi Mirror Rings',
      icon: '💍',
      isHighlight: false 
    },
    { 
      id: 'kamar', 
      label: treeT.mainCategories.kamar, 
      desc: 'Temple Heritage Kardhani & Tagdi Waistbelts',
      badge: '👑 Desi Kardhani',
      icon: '✨',
      isHighlight: true,
      highlightType: 'desi' 
    },
  ];

  const handleCategorySelect = (catId: string) => {
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectMainCategory) {
      onSelectMainCategory(catId);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Ticker & Bar */}
      <div className="bg-[#1c150c] dark:bg-[#030a08] border-b border-[#d4af37]/30 text-xs text-[#f7e7ce] py-1.5 px-4 sm:px-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Ticker marquee message */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
            <span className="flex items-center gap-1.5 text-[#d4af37] font-bold uppercase tracking-widest text-[10px] bg-[#d4af37]/15 px-2.5 py-0.5 rounded-full border border-[#d4af37]/40 whitespace-nowrap">
              <TrendingUp className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              {translations[currentLang].hero.liveRateNotice}
            </span>
            <div className="flex items-center gap-2.5 font-mono text-[11px] whitespace-nowrap">
              <span className="text-[#f7e7ce]">
                <strong className="text-[#d4af37]">24K:</strong> ₹{metalRate.gold24k.toLocaleString('en-IN')}/g
              </span>
              <span className="text-[#d4af37]/40">•</span>
              <span className="text-[#f7e7ce]">
                <strong className="text-[#d4af37]">22K:</strong> ₹{metalRate.gold22k.toLocaleString('en-IN')}/g
              </span>
              <span className="text-[#d4af37]/40">•</span>
              <span className="text-[#f7e7ce]">
                <strong className="text-[#d4af37]">18K:</strong> ~₹{metalRate.gold18k.toLocaleString('en-IN')}/g
              </span>
              <span className="text-[#d4af37]/40">•</span>
              <span className="text-[#f7e7ce]">
                <strong className="text-[#c0c0c0]">999 Silver:</strong> ₹{metalRate.silver999.toLocaleString('en-IN')}/g
              </span>
            </div>
            <span className="hidden lg:inline-block text-[#d4af37]/40">•</span>
            <span className="hidden lg:flex items-center gap-1 text-[#f7e7ce]/90 text-[11px] font-sans tracking-wide whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              100% BIS Hallmarked Purity
            </span>
          </div>

          {/* Right utility: Theme Switcher, Language Switcher & Direct Contact */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="flex items-center gap-1.5 bg-[#2a2215] dark:bg-[#05110d] border border-[#d4af37]/40 hover:border-[#d4af37] px-2.5 py-1 rounded-full text-[10px] font-sans font-bold text-[#d4af37] transition-all shadow-xs"
              title={currentTheme === 'dark' ? t.themeLight : t.themeDark}
              aria-label="Toggle Theme Mode"
            >
              {currentTheme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-200" />
                  <span className="hidden sm:inline">Dark Theme</span>
                </>
              )}
            </button>

            <a href="tel:+91180088899" className="hidden sm:flex items-center gap-1 hover:text-[#d4af37] transition-colors font-sans text-[11px] text-[#f7e7ce]/90">
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>+91 1800-888-999</span>
            </a>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-[#2a2215] dark:bg-[#05110d] border border-[#d4af37]/40 hover:border-[#d4af37] px-3 py-1 rounded-full text-[10px] font-sans font-bold text-[#d4af37] transition-all"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{languages.find(l => l.code === currentLang)?.nativeName}</span>
                <ChevronDown className={`w-3 h-3 text-[#d4af37] transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-[#ffffff] dark:bg-[#05110d] border border-[#d4af37]/40 rounded-xl shadow-2xl overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#d4af37]/15 transition-colors ${
                        currentLang === lang.code 
                          ? 'text-[#b8860b] dark:text-[#d4af37] font-bold bg-[#d4af37]/10' 
                          : 'text-[#1a1612] dark:text-[#f7e7ce]/80'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-[#b8860b] dark:text-[#d4af37]/70 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Header */}
      <div className={`transition-all duration-300 bg-white/95 dark:bg-[#05110d]/95 backdrop-blur-md shadow-md dark:shadow-2xl border-b border-[#e6dac1] dark:border-[#d4af37]/30 text-[#1a1612] dark:text-[#f7e7ce] ${
        isScrolled ? 'py-2.5' : 'py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-12 flex items-center justify-between">
          
          {/* Brand Logo & Heritage Crest */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full border-2 border-[#b8860b] dark:border-[#d4af37] p-0.5 flex items-center justify-center bg-gradient-to-br from-[#d4af37]/20 via-[#fcf9f2] dark:via-[#05110d] to-[#d4af37]/10 group-hover:border-[#8c1d1e] dark:group-hover:border-[#f7e7ce] transition-all shadow-md">
              <div className="w-full h-full bg-[#b8860b] dark:bg-[#d4af37] rounded-full flex items-center justify-center text-white dark:text-[#05110d] font-bold font-serif text-xs shadow-inner">
                SJS
              </div>
              <Sparkles className="w-3 h-3 text-[#b8860b] dark:text-[#d4af37] absolute -top-1 -right-1 animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-serif font-bold tracking-[0.12em] text-[#1a1612] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#f7e7ce] dark:via-[#d4af37] dark:to-[#f7e7ce] block leading-tight drop-shadow-xs">
                  SANJAY JEWELLERS SARIYA
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-sans font-bold text-[#8c1d1e] dark:text-[#d4af37] bg-[#8c1d1e]/10 dark:bg-[#d4af37]/15 px-2 py-0.5 rounded-full border border-[#8c1d1e]/20 dark:border-[#d4af37]/40 shadow-xs flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5 text-[#8c1d1e] dark:text-[#d4af37]" />
                  <span>{t.tagline}</span>
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-widest font-sans font-semibold text-[#5c5244] dark:text-[#d4af37]/90">
            
            {/* Prime Collection Link */}
            <a href="#prime-collection" className="hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#b8860b] dark:after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.primeCollection}
            </a>

            {/* Sone-Chandi ke Abhushan & Categories Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all border ${
                  categoryDropdownOpen
                    ? 'bg-[#b8860b]/15 dark:bg-[#d4af37]/20 border-[#b8860b] dark:border-[#d4af37] text-[#b8860b] dark:text-[#d4af37]'
                    : 'bg-[#f7f1e1] dark:bg-[#0d3b2e]/60 border-[#e6dac1] dark:border-[#d4af37]/30 text-[#1a1612] dark:text-[#f7e7ce] hover:border-[#b8860b] dark:hover:border-[#d4af37]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37]" />
                <span>Categories / आभूषण</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform text-[#b8860b] dark:text-[#d4af37] ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {categoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-96 bg-[#ffffff] dark:bg-[#05110d] border-2 border-[#b8860b]/40 dark:border-[#d4af37]/50 rounded-2xl shadow-2xl py-3 z-50 animate-fadeIn text-left">
                  <div className="px-5 py-2 border-b border-[#e6dac1] dark:border-[#d4af37]/20 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#b8860b] dark:text-[#d4af37]">
                    <span className="flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5" />
                      <span>Select Category / आभूषण चुनें</span>
                    </span>
                    <span className="text-[10px] text-[#5c5244] dark:text-[#f7e7ce]/60 lowercase font-normal">
                      click to toggle
                    </span>
                  </div>

                  <div className="max-h-[380px] overflow-y-auto px-2 py-2 space-y-1">
                    {mainCategoriesList.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-start gap-3 group/item ${
                          cat.isHighlight
                            ? cat.highlightType === 'payal'
                              ? 'bg-gradient-to-r from-[#eef2f5] to-[#f4edd8] dark:from-[#0d3b2e] dark:to-[#0b2239] border border-[#c0c0c0] dark:border-[#d4af37]/40 shadow-xs'
                              : 'bg-[#faf3e3] dark:bg-[#0d3b2e]/80 border border-[#b8860b]/30 dark:border-[#d4af37]/40 shadow-xs'
                            : 'hover:bg-[#f7f1e1] dark:hover:bg-[#d4af37]/10'
                        }`}
                      >
                        <span className="text-lg shrink-0 mt-0.5">{cat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-[#1a1612] dark:text-[#f7e7ce] group-hover/item:text-[#b8860b] dark:group-hover/item:text-[#d4af37] font-sans">
                              {cat.label}
                            </span>
                            {cat.badge && (
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter whitespace-nowrap ${
                                cat.highlightType === 'payal'
                                  ? 'bg-[#1c150c] text-[#f7e7ce] border border-[#c0c0c0]'
                                  : 'bg-[#8c1d1e] text-white dark:bg-[#d4af37] dark:text-[#05110d]'
                              }`}>
                                {cat.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#5c5244] dark:text-[#f7e7ce]/70 font-sans truncate mt-0.5">
                            {cat.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="px-4 pt-2 border-t border-[#e6dac1] dark:border-[#d4af37]/20 text-center">
                    <a
                      href="#sone-chandi-catalog"
                      onClick={() => handleCategorySelect('all')}
                      className="text-[10px] font-bold text-[#b8860b] dark:text-[#d4af37] hover:underline uppercase tracking-widest inline-flex items-center gap-1"
                    >
                      <span>Explore Full Sone-Chandi Catalog</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#categories" className="hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#b8860b] dark:after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.categories}
            </a>
            <a href="#craftsmanship" className="hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#b8860b] dark:after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.craftsmanship}
            </a>
            <a href="#rate-calculator" className="hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#b8860b] dark:after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.goldRate}
            </a>
            <a href="#reviews" className="hover:text-[#b8860b] dark:hover:text-[#f7e7ce] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#b8860b] dark:after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.reviews}
            </a>
          </nav>

          {/* Action Utilities & VIP Button */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#5c5244] dark:text-[#f7e7ce]/80 hover:text-[#b8860b] dark:hover:text-[#d4af37] hover:bg-[#f7f1e1] dark:hover:bg-[#d4af37]/10 rounded-full transition-all"
              aria-label="Search Jewellery"
              title="Search Jewellery"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#5c5244] dark:text-[#f7e7ce]/80 hover:text-[#b8860b] dark:hover:text-[#d4af37] hover:bg-[#f7f1e1] dark:hover:bg-[#d4af37]/10 rounded-full relative transition-all"
              aria-label="View Wishlist"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#05110d] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2 text-[#5c5244] dark:text-[#f7e7ce]/80 hover:text-[#b8860b] dark:hover:text-[#d4af37] hover:bg-[#f7f1e1] dark:hover:bg-[#d4af37]/10 rounded-full relative transition-all"
              aria-label="View Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#05110d] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* VIP Consultation CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:flex items-center gap-2 bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#05110d] hover:bg-[#8c1d1e] dark:hover:bg-[#f7e7ce] transition-colors font-sans font-bold text-[10px] uppercase tracking-[0.2em] px-4 sm:px-5 py-2.5 shadow-md rounded-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.bookAppointment}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#b8860b] dark:text-[#d4af37]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#041d15] border-b border-[#e6dac1] dark:border-amber-500/40 px-6 py-6 space-y-4 text-[#1a1612] dark:text-amber-100 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Category Toggle Dropdown */}
          <div className="border border-[#b8860b]/30 dark:border-amber-500/30 rounded-xl p-3 bg-[#faf6ee] dark:bg-[#05110d]">
            <button
              onClick={() => setMobileCatOpen(!mobileCatOpen)}
              className="w-full flex items-center justify-between font-bold text-sm text-[#b8860b] dark:text-[#d4af37]"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Categories (आभूषण श्रेणियां)</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileCatOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileCatOpen && (
              <div className="mt-3 space-y-1.5 pt-2 border-t border-[#e6dac1] dark:border-[#d4af37]/20">
                {mainCategoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between ${
                      cat.isHighlight
                        ? 'bg-[#f4edd8] dark:bg-[#0d3b2e] font-bold text-[#8c1d1e] dark:text-[#d4af37]'
                        : 'hover:bg-white dark:hover:bg-[#0d3b2e]/50 text-[#1a1612] dark:text-amber-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                    {cat.badge && (
                      <span className="text-[9px] bg-[#8c1d1e] text-white dark:bg-[#d4af37] dark:text-[#05110d] px-1.5 py-0.5 rounded font-bold">
                        {cat.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="flex flex-col space-y-3 font-medium text-sm">
            <a 
              href="#prime-collection" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#b8860b] dark:hover:text-amber-300 py-1.5 border-b border-[#e6dac1] dark:border-amber-500/10"
            >
              {t.primeCollection}
            </a>
            <a 
              href="#categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#b8860b] dark:hover:text-amber-300 py-1.5 border-b border-[#e6dac1] dark:border-amber-500/10"
            >
              {t.categories}
            </a>
            <a 
              href="#craftsmanship" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#b8860b] dark:hover:text-amber-300 py-1.5 border-b border-[#e6dac1] dark:border-amber-500/10"
            >
              {t.craftsmanship}
            </a>
            <a 
              href="#rate-calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#b8860b] dark:hover:text-amber-300 py-1.5 border-b border-[#e6dac1] dark:border-amber-500/10"
            >
              {t.goldRate}
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#b8860b] dark:hover:text-amber-300 py-1.5 border-b border-[#e6dac1] dark:border-amber-500/10"
            >
              {t.reviews}
            </a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#05110d] font-bold text-xs uppercase tracking-wider py-3 rounded-full shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.bookAppointment}</span>
          </button>
        </div>
      )}
    </header>
  );
};
