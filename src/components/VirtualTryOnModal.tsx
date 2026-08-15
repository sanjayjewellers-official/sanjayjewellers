import React, { useState } from 'react';
import { X, Sparkles, Sliders, Camera, Check, RotateCcw, ShieldAlert } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface VirtualTryOnModalProps {
  product: Product | null;
  products: Product[];
  currentLang: Language;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  product,
  products,
  currentLang,
  onClose,
  onSelectProduct,
}) => {
  const activeProduct = product || products[0];
  const t = translations[currentLang].tryOnModal;

  const [attire, setAttire] = useState<'saree' | 'lehenga' | 'anarkali' | 'gown'>('saree');
  const [scale, setScale] = useState<number>(100);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const attireModels = {
    saree: {
      name: t.modelAttire1,
      bg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    },
    lehenga: {
      name: t.modelAttire2,
      bg: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    },
    anarkali: {
      name: t.modelAttire3,
      bg: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    },
    gown: {
      name: t.modelAttire4,
      bg: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    },
  };

  const handleSavePreview = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#041d15] border-2 border-[#b8860b]/40 dark:border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] text-[#1a1612] dark:text-amber-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-[#f4ebd0] dark:bg-emerald-950/80 border border-[#b8860b]/40 dark:border-amber-400/50 text-[#8c1d1e] dark:text-amber-200 rounded-full hover:bg-[#8c1d1e] hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Interactive Canvas Visualizer */}
        <div className="w-full md:w-3/5 relative bg-black/5 overflow-hidden flex items-center justify-center min-h-[350px]">
          <img
            src={attireModels[attire].bg}
            alt="Model Attire"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Overlayed Jewelry Simulation */}
          <div
            className="absolute z-20 pointer-events-none transition-all duration-150"
            style={{
              transform: `translateY(${offsetY}px) scale(${scale / 100})`,
            }}
          >
            <img
              src={activeProduct.image}
              alt="Jewelry Try On"
              className="w-48 sm:w-56 h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] filter contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Success Banner */}
          {savedSuccess && (
            <div className="absolute top-4 left-4 z-30 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Preview Look Saved!</span>
            </div>
          )}

          {/* Model selection tabs over image */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2 overflow-x-auto no-scrollbar">
            {(['saree', 'lehenga', 'anarkali', 'gown'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setAttire(key)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-sans font-bold capitalize whitespace-nowrap transition-all ${
                  attire === key
                    ? 'bg-[#b8860b] dark:bg-amber-400 text-white dark:text-emerald-950 shadow-lg scale-105'
                    : 'bg-black/60 text-white/80 hover:bg-black/80'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Right Controls Panel */}
        <div className="w-full md:w-2/5 p-6 space-y-5 overflow-y-auto bg-[#faf6ee] dark:bg-[#041d15]">
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ebd0] dark:bg-amber-500/10 border border-[#b8860b]/30 dark:border-amber-500/30 text-[#8c1d1e] dark:text-amber-300 text-[10px] font-sans font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Virtual Fitting Room</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1a1612] dark:text-amber-100">
              {activeProduct.name[currentLang]}
            </h3>
            <span className="text-xs font-mono font-bold text-[#8c1d1e] dark:text-amber-300">
              {activeProduct.purity} • ₹{activeProduct.price.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Jewelry selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1a1612] dark:text-amber-200 block">
              Choose Product to Try On:
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {products.slice(0, 6).map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className={`w-14 h-14 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    activeProduct.id === p.id
                      ? 'border-[#b8860b] dark:border-amber-400 scale-105 shadow-md'
                      : 'border-[#e6dac1] dark:border-amber-500/20 opacity-60'
                  }`}
                >
                  <img src={p.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Adjustments */}
          <div className="space-y-3 p-4 bg-white dark:bg-[#02120d] rounded-2xl border border-[#e6dac1] dark:border-amber-500/20">
            <div className="flex items-center justify-between text-xs font-bold text-[#1a1612] dark:text-amber-200">
              <span>Scale Size:</span>
              <span className="font-mono text-[#8c1d1e] dark:text-amber-300">{scale}%</span>
            </div>
            <input
              type="range"
              min="60"
              max="140"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full accent-[#b8860b] dark:accent-amber-400 cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs font-bold text-[#1a1612] dark:text-amber-200 pt-2">
              <span>Neckline Position:</span>
              <span className="font-mono text-[#8c1d1e] dark:text-amber-300">{offsetY}px</span>
            </div>
            <input
              type="range"
              min="-60"
              max="60"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full accent-[#b8860b] dark:accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={handleSavePreview}
              className="w-full gold-shimmer-btn text-white dark:text-emerald-950 font-bold text-xs uppercase py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>{t.takeScreenshot}</span>
            </button>

            <button
              onClick={() => {
                setScale(100);
                setOffsetY(0);
              }}
              className="w-full bg-transparent hover:bg-black/5 text-[#5c5244] dark:text-amber-200/60 font-semibold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Position</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
