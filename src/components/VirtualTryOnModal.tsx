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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#041d15] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-emerald-950/80 border border-amber-400/50 text-amber-200 rounded-full hover:bg-amber-400 hover:text-emerald-950 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Live Visualizer Stage */}
        <div className="relative flex-1 bg-emerald-950/90 flex items-center justify-center overflow-hidden min-h-[360px] md:min-h-[500px]">
          {/* Model Background */}
          <img
            src={attireModels[attire].bg}
            alt={attireModels[attire].name}
            className="w-full h-full object-cover filter brightness-90 contrast-110"
            referrerPolicy="no-referrer"
          />

          {/* Jewellery Overlay Element */}
          <div
            className="absolute transition-transform duration-200 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            style={{
              transform: `translateY(${offsetY}px) scale(${scale / 100})`,
              width: '65%',
              maxWidth: '320px',
            }}
          >
            <img
              src={activeProduct.image}
              alt={activeProduct.name[currentLang]}
              className="w-full h-auto filter drop-shadow-[0_0_15px_rgba(229,193,88,0.5)]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Watermark Branding */}
          <div className="absolute bottom-4 left-4 bg-emerald-950/80 border border-amber-500/40 px-3 py-1.5 rounded-lg text-[11px] font-serif font-bold text-gold-gradient backdrop-blur-md">
            Swarna Mahal • Virtual Try-On
          </div>
        </div>

        {/* Right Controls Panel */}
        <div className="w-full md:w-80 p-6 bg-[#06231a] border-t md:border-t-0 md:border-l border-amber-500/30 space-y-6 overflow-y-auto">
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.title}</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-amber-100">
              {activeProduct.name[currentLang]}
            </h3>
            <p className="text-xs text-amber-300 font-mono">
              ₹{activeProduct.price.toLocaleString('en-IN')} • {activeProduct.purity}
            </p>
          </div>

          {/* Product Switcher Thumbnail Strip */}
          <div className="space-y-2">
            <label className="text-xs text-amber-200/80 font-semibold uppercase tracking-wider block">
              Select Jewellery Piece
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition-all ${
                    activeProduct.id === p.id
                      ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                      : 'border-amber-500/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.image} alt={p.name.en} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Attire Selection */}
          <div className="space-y-2">
            <label className="text-xs text-amber-200/80 font-semibold uppercase tracking-wider block">
              {t.selectModel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(attireModels) as (keyof typeof attireModels)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setAttire(key)}
                  className={`p-2 rounded-lg text-xs font-medium text-left border transition-all ${
                    attire === key
                      ? 'bg-amber-400 text-emerald-950 font-bold border-amber-300 shadow-md'
                      : 'bg-emerald-950/60 text-amber-200 border-amber-500/30 hover:border-amber-400'
                  }`}
                >
                  {attireModels[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Positioning Sliders */}
          <div className="space-y-4 pt-2 border-t border-amber-500/20">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-amber-200/80">
                <span>{t.adjustSize}</span>
                <span className="font-mono">{scale}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="140"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-amber-200/80">
                <span>Vertical Alignment</span>
                <span className="font-mono">{offsetY}px</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>
          </div>

          {/* Save Action */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSavePreview}
              className="w-full gold-shimmer-btn text-emerald-950 font-bold text-xs uppercase py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-900" />
                  <span>Preview Saved to Gallery!</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>{t.takeScreenshot}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
