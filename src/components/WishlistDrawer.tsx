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
      <div className="w-full max-w-md bg-[#041d15] border-l border-amber-500/30 h-full flex flex-col shadow-2xl relative text-amber-100">
        
        {/* Header */}
        <div className="p-5 border-b border-amber-500/20 flex items-center justify-between bg-[#02120d]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-current" />
            <h3 className="font-serif font-bold text-lg text-gold-gradient">
              {t.wishlist} ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-amber-300 hover:text-amber-100 rounded-full hover:bg-amber-500/10"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Heart className="w-12 h-12 text-amber-500/20 mx-auto" />
              <p className="text-sm font-serif text-amber-200/60">No saved items in your wishlist yet.</p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-[#02120d] border border-amber-500/20 rounded-xl p-3 flex gap-3 items-center shadow-md"
              >
                <img
                  src={p.image}
                  alt={p.name[currentLang]}
                  className="w-16 h-16 object-cover rounded-lg border border-amber-500/30 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-serif font-bold text-amber-100 truncate">
                    {p.name[currentLang]}
                  </h4>
                  <span className="text-[10px] text-amber-400 font-mono block">
                    {p.purity} • {p.goldWeightGrams}g
                  </span>
                  <span className="text-sm font-serif font-bold text-gold-gradient block">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveWishlist(p.id)}
                    className="text-amber-400/50 hover:text-rose-400 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(p);
                      onRemoveWishlist(p.id);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-[10px] uppercase px-2.5 py-1.5 rounded flex items-center gap-1 shadow-sm"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    Move to Bag
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
