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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-[#041d15] border-2 border-[#b8860b]/40 dark:border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl text-[#1a1612] dark:text-amber-100 max-h-[80vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#faf6ee] dark:bg-[#02120d] border-b border-[#e6dac1] dark:border-amber-500/30 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#b8860b] dark:text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#1a1612] dark:text-amber-100 focus:outline-none placeholder:text-[#5c5244]/60 dark:placeholder:text-amber-100/40 font-sans"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#5c5244] dark:text-amber-300 hover:text-[#8c1d1e] dark:hover:text-amber-100 rounded-full hover:bg-black/5"
            aria-label="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-serif text-[#5c5244] dark:text-amber-200/60">
                No matching jewellery designs found for "{query}".
              </p>
              <span className="text-xs text-[#b8860b] dark:text-amber-400/80">
                Try searching for "Kundan", "Payal", "Rani Haar", "Borla", or "Kangan".
              </span>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#faf6ee] dark:bg-[#06291e] border border-[#e6dac1] dark:border-amber-500/20 hover:border-[#b8860b] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name[currentLang]}
                    className="w-12 h-12 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-serif font-bold text-[#1a1612] dark:text-amber-100 group-hover:text-[#b8860b] dark:group-hover:text-amber-300 transition-colors">
                      {product.name[currentLang]}
                    </h4>
                    <span className="text-[10px] text-[#8c1d1e] dark:text-[#d4af37] font-mono font-bold">
                      {product.purity} • ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#5c5244] dark:text-amber-400/80 font-mono">
                    {product.hallmarkCode}
                  </span>
                  <div className="p-2 rounded-xl bg-white dark:bg-emerald-900/60 text-[#b8860b] dark:text-amber-300 border border-[#e6dac1] dark:border-amber-400/30">
                    <Eye className="w-3.5 h-3.5" />
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
