import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCanvas } from './components/HeroCanvas';
import { GoldRateTicker } from './components/GoldRateTicker';
import { PrimeCollection } from './components/PrimeCollection';
import { SoneChandiExplorer } from './components/SoneChandiExplorer';
import { CategoryGrid } from './components/CategoryGrid';
import { Craftsmanship } from './components/Craftsmanship';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { VIPBookingModal } from './components/VIPBookingModal';
import { ReviewsSection } from './components/ReviewsSection';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { ShopPage } from './components/ShopPage';

import { Language, Product, CartItem, MetalRate, Theme } from './types';
import { PRODUCTS, INITIAL_METAL_RATES } from './data/products';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('swarna_theme');
      return (saved as Theme) || 'light';
    } catch {
      return 'light';
    }
  });

  const [currentPage, setCurrentPage] = useState<'home' | 'shop'>('home');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('swarna_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('swarna_wishlist');
      return saved ? JSON.parse(saved) : ['p1', 'p2'];
    } catch {
      return ['p1', 'p2'];
    }
  });

  const [metalRate] = useState<MetalRate>(INITIAL_METAL_RATES);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [tryOnProduct, setTryOnProduct] = useState<Product | null>(null);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Apply Theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (currentTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    try {
      localStorage.setItem('swarna_theme', currentTheme);
    } catch (e) {
      console.error(e);
    }
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync URL hash for page routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#shop')) {
        setCurrentPage('shop');
        const parts = hash.split('/');
        if (parts[1]) {
          setSelectedMainCategory(parts[1]);
        }
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigatePage = (page: 'home' | 'shop', category?: string, subCategory?: string) => {
    setCurrentPage(page);
    if (category) setSelectedMainCategory(category);
    if (subCategory) setSelectedSubCategory(subCategory);

    if (page === 'shop') {
      window.location.hash = category && category !== 'all' ? `shop/${category}` : 'shop';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = 'home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('swarna_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('swarna_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen theme-bg-primary theme-text-primary font-sans selection:bg-[#d4af37] selection:text-[#1a1612] transition-colors duration-400">
      
      {/* Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentTheme={currentTheme}
        onThemeToggle={toggleTheme}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        metalRate={metalRate}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onSelectMainCategory={(catId) => {
          handleNavigatePage('shop', catId);
        }}
      />

      {/* Main Content Sections */}
      <main className="pt-20">
        {currentPage === 'home' ? (
          <>
            {/* Hero Section with Canvas Particle Sparkles */}
            <HeroCanvas
              currentLang={currentLang}
              onOpenTryOn={() => setIsTryOnOpen(true)}
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenShop={() => handleNavigatePage('shop', 'all')}
            />

            {/* Live Gold Rate Ticker & Instant Valuation Calculator */}
            <GoldRateTicker
              metalRate={metalRate}
              currentLang={currentLang}
            />

            {/* Interactive Desi Sone-Chandi ke Abhushan Explorer */}
            <SoneChandiExplorer
              products={PRODUCTS}
              currentLang={currentLang}
              selectedMainCategory={selectedMainCategory}
              onQuickView={(p) => setQuickViewProduct(p)}
              onTryOn={(p) => {
                setTryOnProduct(p);
                setIsTryOnOpen(true);
              }}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlist}
              onOpenShopPage={(cat) => handleNavigatePage('shop', cat || 'all')}
            />

            {/* Hindi Prime Collection Showcase */}
            <PrimeCollection
              products={PRODUCTS}
              currentLang={currentLang}
              onQuickView={(p) => setQuickViewProduct(p)}
              onTryOn={(p) => {
                setTryOnProduct(p);
                setIsTryOnOpen(true);
              }}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlist}
            />

            {/* Categories Section */}
            <CategoryGrid
              currentLang={currentLang}
              onSelectCategory={(cat) => {
                handleNavigatePage('shop', cat);
              }}
              products={PRODUCTS}
            />

            {/* Craftsmanship & Purity Heritage Story */}
            <Craftsmanship currentLang={currentLang} />

            {/* Verified Royal Customer Feedback */}
            <ReviewsSection currentLang={currentLang} />
          </>
        ) : (
          /* DEDICATED SHOP NOW BOUTIQUE PAGE */
          <ShopPage
            products={PRODUCTS}
            currentLang={currentLang}
            initialCategory={selectedMainCategory}
            initialSubCategory={selectedSubCategory}
            metalRate={metalRate}
            onNavigateHome={() => handleNavigatePage('home')}
            onQuickView={(p) => setQuickViewProduct(p)}
            onTryOn={(p) => {
              setTryOnProduct(p);
              setIsTryOnOpen(true);
            }}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Modals & Drawers */}
      {isTryOnOpen && (
        <VirtualTryOnModal
          product={tryOnProduct}
          products={PRODUCTS}
          currentLang={currentLang}
          onClose={() => setIsTryOnOpen(false)}
          onSelectProduct={(p) => setTryOnProduct(p)}
        />
      )}

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          currentLang={currentLang}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onTryOn={(p) => {
            setQuickViewProduct(null);
            setTryOnProduct(p);
            setIsTryOnOpen(true);
          }}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.includes(quickViewProduct.id)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currentLang={currentLang}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={PRODUCTS}
        onRemoveWishlist={(id) => setWishlist((prev) => prev.filter((i) => i !== id))}
        onAddToCart={handleAddToCart}
        currentLang={currentLang}
      />

      <VIPBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currentLang={currentLang}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currentLang={currentLang}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
