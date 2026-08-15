import React, { useState } from 'react';
import { X, Search, Sparkles, ShoppingBag, Eye } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentLang: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currentLang,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const t = translations[currentLang].nav;

  const filtered = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name[currentLang].toLowerCase().includes(q) ||
      p.subtitle[currentLang].toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.purity.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#041d15] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl text-amber-100 max-h-[80vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#02120d] border-b border-amber-500/30 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-amber-100 focus:outline-none placeholder:text-amber-100/40"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-amber-300 hover:text-amber-100 rounded-full hover:bg-amber-500/10"
            aria-label="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Sparkles className="w-8 h-8 text-amber-500/30 mx-auto" />
              <p className="text-xs text-amber-200/60 font-serif">No jewelry matched "{query}"</p>
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="bg-[#02120d] border border-amber-500/20 rounded-xl p-3 flex gap-3 items-center hover:border-amber-400 transition-colors shadow-md"
              >
                <img
                  src={p.image}
                  alt={p.name[currentLang]}
                  className="w-14 h-14 object-cover rounded-lg border border-amber-500/30 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <h4 className="text-xs font-serif font-bold text-amber-100 truncate">
                    {p.name[currentLang]}
                  </h4>
                  <span className="text-[10px] text-amber-400/80 font-mono block">
                    {p.purity} • {p.goldWeightGrams}g
                  </span>
                  <span className="text-xs font-serif font-bold text-gold-gradient block">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="p-2 bg-emerald-950 border border-amber-500/30 text-amber-300 hover:text-amber-100 rounded-lg text-xs flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(p);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Bag
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
