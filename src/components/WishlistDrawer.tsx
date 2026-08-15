import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  currentLang: Language;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveWishlist,
  onAddToCart,
  currentLang,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLang].nav;
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-[#041d15] border-l-2 border-[#b8860b]/40 dark:border-amber-500/30 h-full flex flex-col shadow-2xl relative text-[#1a1612] dark:text-amber-100">
        
        {/* Header */}
        <div className="p-5 border-b border-[#e6dac1] dark:border-amber-500/20 flex items-center justify-between bg-[#faf6ee] dark:bg-[#02120d]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="font-serif font-bold text-lg text-[#1a1612] dark:text-amber-200">
              {t.wishlist} ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5c5244] dark:text-amber-300 hover:text-[#8c1d1e] dark:hover:text-amber-100 rounded-full hover:bg-black/5"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Heart className="w-12 h-12 text-[#b8860b]/30 mx-auto" />
              <p className="text-sm font-serif text-[#5c5244] dark:text-amber-200/60">No saved items in your wishlist yet.</p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="flex gap-4 p-3.5 bg-[#faf6ee] dark:bg-[#06291e] border border-[#e6dac1] dark:border-amber-500/20 rounded-2xl shadow-xs"
              >
                <img
                  src={p.image}
                  alt={p.name[currentLang]}
                  className="w-20 h-20 object-cover rounded-xl border border-[#e6dac1] dark:border-amber-500/20"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-serif font-bold text-[#1a1612] dark:text-amber-100 line-clamp-1">
                      {p.name[currentLang]}
                    </h4>
                    <button
                      onClick={() => onRemoveWishlist(p.id)}
                      className="text-[#5c5244] hover:text-rose-500 p-1"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] text-[#8c1d1e] dark:text-[#d4af37] font-mono block font-bold">
                    {p.purity} • {p.goldWeightGrams > 0 ? `${p.goldWeightGrams}g` : 'Silver'}
                  </span>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs font-mono font-bold text-[#8c1d1e] dark:text-amber-300">
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(p);
                        onRemoveWishlist(p.id);
                      }}
                      className="gold-shimmer-btn text-white dark:text-emerald-950 font-bold text-[10px] uppercase py-1.5 px-3 rounded-lg flex items-center gap-1 shadow-sm"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
