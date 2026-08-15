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
  Crown
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

  const t = translations[currentLang].nav;
  const treeT = translations[currentLang].categoryTree;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
    { id: 'sir_matha', label: treeT.mainCategories.sir_matha },
    { id: 'kaan', label: treeT.mainCategories.kaan },
    { id: 'gala', label: treeT.mainCategories.gala },
    { id: 'haath_kalaai', label: treeT.mainCategories.haath_kalaai },
    { id: 'ungliyan', label: treeT.mainCategories.ungliyan },
    { id: 'kamar', label: treeT.mainCategories.kamar },
    { id: 'pairon_chandi', label: treeT.mainCategories.pairon_chandi },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Top Ticker & Bar */}
      <div className="bg-[#030a08] border-b border-[#d4af37]/20 text-xs text-[#f7e7ce]/90 py-1.5 px-4 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Ticker marquee message */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
            <span className="flex items-center gap-1.5 text-[#d4af37] font-bold uppercase tracking-widest text-[10px] bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 whitespace-nowrap">
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
            </div>
            <span className="hidden lg:inline-block text-[#d4af37]/40">•</span>
            <span className="hidden lg:flex items-center gap-1 text-[#f7e7ce]/80 text-[11px] font-sans tracking-wide whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              100% BIS Hallmarked Purity
            </span>
          </div>

          {/* Right utility: Theme Switcher, Language Switcher & Direct Contact */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="flex items-center gap-1.5 bg-[#05110d] border border-[#d4af37]/30 hover:border-[#d4af37] px-2.5 py-1 rounded-full text-[10px] font-sans font-bold text-[#d4af37] transition-all"
              title={currentTheme === 'dark' ? t.themeLight : t.themeDark}
              aria-label="Toggle Theme Mode"
            >
              {currentTheme === 'dark' ? (
                <>
                  <Sun className="w-3 h-3 text-amber-300" />
                  <span className="hidden sm:inline">{t.themeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-amber-200" />
                  <span className="hidden sm:inline">{t.themeDark}</span>
                </>
              )}
            </button>

            <a href="tel:+91180088899" className="hidden sm:flex items-center gap-1 hover:text-[#d4af37] transition-colors font-sans text-[11px]">
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>+91 1800-888-999</span>
            </a>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-[#05110d] border border-[#d4af37]/30 hover:border-[#d4af37] px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-tighter text-[#d4af37] transition-all"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{languages.find(l => l.code === currentLang)?.nativeName}</span>
                <ChevronDown className={`w-3 h-3 text-[#d4af37] transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-[#05110d] border border-[#d4af37]/40 rounded-xl shadow-2xl overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#d4af37]/20 transition-colors ${
                        currentLang === lang.code ? 'text-[#d4af37] font-bold bg-[#d4af37]/10' : 'text-[#f7e7ce]/80'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-[#d4af37]/60 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Header */}
      <div className={`transition-all duration-300 bg-[#05110d]/95 backdrop-blur-md shadow-2xl border-b border-[#d4af37]/30 ${
        isScrolled ? 'py-2.5' : 'py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-12 flex items-center justify-between">
          
          {/* Brand Logo & Heritage Crest */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full border-2 border-[#d4af37] p-0.5 flex items-center justify-center bg-gradient-to-br from-[#d4af37]/20 via-[#05110d] to-[#d4af37]/10 group-hover:border-[#f7e7ce] transition-all shadow-md">
              <div className="w-full h-full bg-[#d4af37] rounded-full flex items-center justify-center text-[#05110d] font-bold font-serif text-xs shadow-inner">
                SJS
              </div>
              <Sparkles className="w-3 h-3 text-[#d4af37] absolute -top-1 -right-1 animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-serif font-semibold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#f7e7ce] block leading-tight drop-shadow-sm">
                  SANJAY JEWELLERS SARIYA
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#d4af37] bg-[#d4af37]/15 px-2 py-0.5 rounded-full border border-[#d4af37]/40 shadow-xs flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>{t.tagline}</span>
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-widest font-sans font-medium text-[#d4af37]/80">
            <a href="#prime-collection" className="hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.primeCollection}
            </a>

            {/* Sone-Chandi ke Abhushan Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#d4af37] transition-colors py-1 focus:outline-none"
              >
                <span>Sone-Chandi ke Abhushan</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoryDropdownOpen ? 'rotate-180 text-[#d4af37]' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[#05110d] border border-[#d4af37]/40 rounded-xl shadow-2xl py-3 z-50 animate-fadeIn">
                  <div className="px-4 py-1.5 border-b border-[#d4af37]/20 text-[10px] text-[#d4af37] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#d4af37]" />
                    <span>{t.filterTitle}</span>
                  </div>
                  {mainCategoriesList.map((cat) => (
                    <a
                      key={cat.id}
                      href="#categories"
                      onClick={() => {
                        setCategoryDropdownOpen(false);
                        if (onSelectMainCategory) onSelectMainCategory(cat.id);
                      }}
                      className="block px-4 py-2 text-xs text-[#f7e7ce]/90 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors font-sans normal-case tracking-normal"
                    >
                      {cat.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#categories" className="hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.categories}
            </a>
            <a href="#craftsmanship" className="hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.craftsmanship}
            </a>
            <a href="#rate-calculator" className="hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.goldRate}
            </a>
            <a href="#reviews" className="hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all">
              {t.reviews}
            </a>
          </nav>

          {/* Action Utilities & VIP Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#f7e7ce]/80 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-full transition-all"
              aria-label="Search Jewellery"
              title="Search Jewellery"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#f7e7ce]/80 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-full relative transition-all"
              aria-label="View Wishlist"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#05110d] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2 text-[#f7e7ce]/80 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-full relative transition-all"
              aria-label="View Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#05110d] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* VIP Consultation CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:flex items-center gap-2 bg-[#d4af37] text-[#05110d] hover:bg-[#f7e7ce] transition-colors font-sans font-bold text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.bookAppointment}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#d4af37]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#041d15] border-b border-amber-500/40 px-6 py-6 space-y-4 text-amber-100 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-3 font-medium text-base">
            <a 
              href="#prime-collection" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 py-1 border-b border-amber-500/10"
            >
              {t.primeCollection}
            </a>
            <a 
              href="#categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 py-1 border-b border-amber-500/10"
            >
              {t.categories}
            </a>
            <a 
              href="#craftsmanship" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 py-1 border-b border-amber-500/10"
            >
              {t.craftsmanship}
            </a>
            <a 
              href="#rate-calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 py-1 border-b border-amber-500/10"
            >
              {t.goldRate}
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 py-1 border-b border-amber-500/10"
            >
              {t.reviews}
            </a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full flex items-center justify-center gap-2 gold-shimmer-btn text-emerald-950 font-bold text-xs uppercase tracking-wider py-3 rounded-full shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.bookAppointment}</span>
          </button>
        </div>
      )}
    </header>
  );
};
