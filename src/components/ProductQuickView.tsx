import React, { useState } from 'react';
import { X, ShieldCheck, Heart, ShoppingBag, Eye, Award, Truck, Check, Star, Sparkles } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface ProductQuickViewProps {
  product: Product | null;
  currentLang: Language;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onTryOn: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  currentLang,
  onClose,
  onAddToCart,
  onTryOn,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const t = translations[currentLang].productModal;
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [added, setAdded] = useState(false);

  const images = [product.image, ...(product.secondaryImages || [])];

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#041d15] border-2 border-[#b8860b]/40 dark:border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] text-[#1a1612] dark:text-[#f7e7ce]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-[#f4ebd0] dark:bg-emerald-950/80 border border-[#b8860b]/40 dark:border-amber-400/50 text-[#8c1d1e] dark:text-amber-200 rounded-full hover:bg-[#8c1d1e] hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-[#faf6ee] dark:bg-emerald-950/80 flex flex-col justify-between space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#e6dac1] dark:border-amber-500/30 shadow-inner">
            <img
              src={selectedImage}
              alt={product.name[currentLang]}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-[#b8860b] dark:bg-amber-500 text-white dark:text-emerald-950 font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {product.purity}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                    selectedImage === img
                      ? 'border-[#b8860b] ring-2 ring-[#b8860b]/50'
                      : 'border-[#e6dac1] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-8 space-y-5 overflow-y-auto">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8c1d1e] dark:text-emerald-400 bg-[#f4ebd0] dark:bg-emerald-950 px-2.5 py-1 rounded border border-[#b8860b]/30 dark:border-emerald-500/30 font-bold">
                {product.hallmarkCode}
              </span>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 rounded-full border transition-all ${
                  isWishlisted
                    ? 'bg-rose-600 text-white border-rose-400'
                    : 'bg-[#faf6ee] dark:bg-emerald-950 border-[#e6dac1] dark:border-amber-500/30 text-[#8c1d1e] dark:text-amber-200'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h2 className="text-2xl font-serif font-bold text-[#1a1612] dark:text-amber-100">
              {product.name[currentLang]}
            </h2>

            <p className="text-xs text-[#5c5244] dark:text-amber-200/80 font-normal">
              {product.subtitle[currentLang]}
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-[#faf6ee] dark:bg-[#02120d] p-4 rounded-xl border border-[#e6dac1] dark:border-amber-500/30 space-y-1">
            <span className="text-[10px] text-[#5c5244] dark:text-amber-400/70 uppercase block font-semibold">Total Estimated Value</span>
            <div className="text-2xl font-serif font-extrabold text-[#8c1d1e] dark:text-amber-300">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-[#5c5244] dark:text-amber-100/60 block">
              Includes Metal Value + ~{product.makingChargesPercent}% Making Charge + 3% GST
            </span>
          </div>

          {/* Specifications Table */}
          <div className="space-y-2 text-xs">
            <span className="text-[#8c1d1e] dark:text-amber-300 font-bold uppercase tracking-wider block border-b border-[#e6dac1] dark:border-amber-500/20 pb-1">
              {t.specs}
            </span>
            <div className="grid grid-cols-2 gap-2 text-[#5c5244] dark:text-amber-100/80">
              <div className="bg-[#faf6ee] dark:bg-emerald-950/60 p-2.5 rounded-lg border border-[#e6dac1] dark:border-amber-500/10">
                <span className="text-[#8c1d1e] dark:text-amber-400/60 block text-[10px]">{t.weight}</span>
                <span className="font-mono font-bold text-[#1a1612] dark:text-[#f7e7ce]">{product.goldWeightGrams > 0 ? `${product.goldWeightGrams} Grams` : 'Silver'}</span>
              </div>
              <div className="bg-[#faf6ee] dark:bg-emerald-950/60 p-2.5 rounded-lg border border-[#e6dac1] dark:border-amber-500/10">
                <span className="text-[#8c1d1e] dark:text-amber-400/60 block text-[10px]">{t.purity}</span>
                <span className="font-bold text-[#1a1612] dark:text-[#f7e7ce]">{product.purity} BIS Hallmark</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#5c5244] dark:text-amber-100/70 font-light leading-relaxed">
            {product.description[currentLang]}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="gold-shimmer-btn text-white dark:text-emerald-950 font-bold text-xs uppercase py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{added ? 'Added to Bag!' : t.addToCart}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onTryOn(product);
                }}
                className="bg-[#faf6ee] dark:bg-emerald-900/80 border-2 border-[#b8860b] dark:border-amber-400/50 hover:border-[#8c1d1e] text-[#8c1d1e] dark:text-amber-200 text-xs font-bold uppercase py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4 text-[#b8860b] dark:text-amber-400" />
                <span>{t.tryOnThis}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#5c5244] dark:text-amber-200/70 bg-[#faf6ee] dark:bg-emerald-950/40 p-2.5 rounded-lg border border-[#e6dac1] dark:border-amber-500/20">
              <Truck className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0" />
              <span>{t.shippingInfo}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
