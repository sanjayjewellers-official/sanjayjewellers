import React, { useState } from 'react';
import { TrendingUp, Calculator, RefreshCw, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { MetalRate, Language } from '../types';
import { translations } from '../data/translations';

interface GoldRateTickerProps {
  metalRate: MetalRate;
  currentLang: Language;
}

export const GoldRateTicker: React.FC<GoldRateTickerProps> = ({
  metalRate,
  currentLang,
}) => {
  const [purity, setPurity] = useState<'24k' | '22k' | '18k'>('22k');
  const [weightGrams, setWeightGrams] = useState<number>(10);
  const [makingChargesPercent, setMakingChargesPercent] = useState<number>(12);

  const t = translations[currentLang].calculator;

  // Rate per gram
  const ratePerGram =
    purity === '24k'
      ? metalRate.gold24k
      : purity === '22k'
      ? metalRate.gold22k
      : metalRate.gold18k;

  const rawGoldValue = weightGrams * ratePerGram;
  const makingChargeAmount = (rawGoldValue * makingChargesPercent) / 100;
  const subtotalBeforeGst = rawGoldValue + makingChargeAmount;
  const gstAmount = subtotalBeforeGst * 0.03; // 3% GST on Gold Jewelry in India
  const totalEstimatedPrice = subtotalBeforeGst + gstAmount;

  return (
    <section id="rate-calculator" className="py-16 bg-[#05110d] border-y border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest font-sans">
            <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.liveBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#f7e7ce]">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#f7e7ce]/70 font-sans font-light tracking-wide">
            {t.subtitle}
          </p>
        </div>

        {/* Live Market Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          
          <div className="bg-[#0b2239]/60 border border-[#d4af37]/20 p-5 rounded-lg text-center space-y-1 shadow-xl hover:border-[#d4af37] transition-colors">
            <span className="text-[10px] text-[#d4af37] uppercase tracking-widest font-sans font-bold block">24K Gold (999 Fine)</span>
            <div className="text-xl sm:text-2xl font-serif font-light text-[#f7e7ce]">
              ₹{metalRate.gold24k.toLocaleString('en-IN')}<span className="text-xs text-[#d4af37]/60 font-sans">{t.perGram}</span>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Benchmark
            </span>
          </div>

          <div className="bg-[#0d3b2e]/60 border border-[#d4af37]/40 p-5 rounded-lg text-center space-y-1 shadow-xl hover:border-[#d4af37] transition-colors">
            <span className="text-[10px] text-[#d4af37] uppercase tracking-widest font-sans font-bold block">22K Gold (916 Standard)</span>
            <div className="text-xl sm:text-2xl font-serif font-light text-[#f7e7ce]">
              ₹{metalRate.gold22k.toLocaleString('en-IN')}<span className="text-xs text-[#d4af37]/60 font-sans">{t.perGram}</span>
            </div>
            <span className="text-[10px] text-[#d4af37] flex items-center justify-center gap-1 font-mono font-bold">
              Most Popular
            </span>
          </div>

          <div className="bg-[#0b2239]/60 border border-[#d4af37]/20 p-5 rounded-lg text-center space-y-1 shadow-xl hover:border-[#d4af37] transition-colors">
            <span className="text-[10px] text-[#d4af37] uppercase tracking-widest font-sans font-bold block">18K Gold (750 Alloy)</span>
            <div className="text-xl sm:text-2xl font-serif font-light text-[#f7e7ce]">
              ₹{metalRate.gold18k.toLocaleString('en-IN')}<span className="text-xs text-[#d4af37]/60 font-sans">{t.perGram}</span>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 font-mono">
              Diamond Setting
            </span>
          </div>

          <div className="bg-[#0b2239]/60 border border-[#d4af37]/20 p-5 rounded-lg text-center space-y-1 shadow-xl hover:border-[#d4af37] transition-colors">
            <span className="text-[10px] text-slate-300 uppercase tracking-widest font-sans font-bold block">Fine Silver (999)</span>
            <div className="text-xl sm:text-2xl font-serif font-light text-[#f7e7ce]">
              ₹{metalRate.silver999.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-sans">{t.perGram}</span>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 font-mono">
              Live Silver
            </span>
          </div>

        </div>

        {/* Interactive Estimator Box */}
        <div className="bg-[#05110d] border border-[#d4af37]/30 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#d4af37]/20 pb-4">
            <Calculator className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-base sm:text-lg font-serif font-light text-[#f7e7ce]">
              Custom Jewellery Valuation Calculator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Purity Selection */}
            <div className="space-y-2">
              <label className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest font-sans block">
                {t.selectPurity}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['24k', '22k', '18k'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPurity(p)}
                    className={`py-2 text-[10px] font-sans font-bold uppercase tracking-wider transition-all ${
                      purity === p
                        ? 'bg-[#d4af37] text-[#05110d]'
                        : 'bg-[#0b2239] text-[#f7e7ce] border border-[#d4af37]/20 hover:border-[#d4af37]'
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <label className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest font-sans block">
                {t.enterWeight}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#030a08] border border-[#d4af37]/30 focus:border-[#d4af37] text-[#f7e7ce] px-4 py-2 text-xs font-mono focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-[#d4af37]/70 font-sans font-bold uppercase tracking-wider">Grams</span>
              </div>
            </div>

            {/* Making Charge Input */}
            <div className="space-y-2">
              <label className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest font-sans block">
                Making Charges (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="30"
                  value={makingChargesPercent}
                  onChange={(e) => setMakingChargesPercent(Number(e.target.value))}
                  className="w-full bg-[#030a08] border border-[#d4af37]/30 focus:border-[#d4af37] text-[#f7e7ce] px-4 py-2 text-xs font-mono focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-[#d4af37]/70 font-sans font-bold uppercase tracking-wider">%</span>
              </div>
            </div>

          </div>

          {/* Breakdown Result */}
          <div className="bg-[#030a08] border border-[#d4af37]/20 p-5 space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#f7e7ce]/80 border-b border-[#d4af37]/20 pb-3">
              <div>
                <span className="text-[#d4af37]/60 text-[10px] uppercase tracking-wider block font-sans">Gold Base Value:</span>
                <span className="font-mono font-semibold text-[#f7e7ce]">₹{Math.round(rawGoldValue).toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[#d4af37]/60 text-[10px] uppercase tracking-wider block font-sans">Making Charge ({makingChargesPercent}%):</span>
                <span className="font-mono font-semibold text-[#f7e7ce]">₹{Math.round(makingChargeAmount).toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[#d4af37]/60 text-[10px] uppercase tracking-wider block font-sans">GST (3%):</span>
                <span className="font-mono font-semibold text-[#f7e7ce]">₹{Math.round(gstAmount).toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[#d4af37]/60 text-[10px] uppercase tracking-wider block font-sans">Hallmark Certificate:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1 text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" /> Included
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
              <div>
                <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest block font-sans">
                  {t.estimatedPrice}
                </span>
                <div className="text-2xl sm:text-3xl font-serif font-light text-[#f7e7ce]">
                  ₹{Math.round(totalEstimatedPrice).toLocaleString('en-IN')}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#f7e7ce]/60 font-sans tracking-wide">
                <Shield className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{t.calculatingNote}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
