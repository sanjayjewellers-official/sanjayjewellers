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
  const [purity, setPurity] = useState<'24k' | '22k' | '18k' | 'silver'>('22k');
  const [weightGrams, setWeightGrams] = useState<number>(10);
  const [makingChargesPercent, setMakingChargesPercent] = useState<number>(12);

  const t = translations[currentLang].calculator;

  // Rate per gram
  const ratePerGram =
    purity === '24k'
      ? metalRate.gold24k
      : purity === '22k'
      ? metalRate.gold22k
      : purity === '18k'
      ? metalRate.gold18k
      : metalRate.silver999;

  const rawMetalValue = weightGrams * ratePerGram;
  const makingChargeAmount = (rawMetalValue * makingChargesPercent) / 100;
  const subtotalBeforeGst = rawMetalValue + makingChargeAmount;
  const gstAmount = subtotalBeforeGst * 0.03; // 3% GST
  const totalEstimatedPrice = subtotalBeforeGst + gstAmount;

  return (
    <section id="rate-calculator" className="py-16 theme-bg-surface border-y theme-border relative transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b8860b]/10 dark:bg-[#d4af37]/10 border border-[#b8860b]/30 dark:border-[#d4af37]/30 text-[#8c1d1e] dark:text-[#d4af37] text-xs font-semibold uppercase tracking-widest font-sans">
            <TrendingUp className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37]" />
            <span>{t.liveBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5c5244] dark:text-[#f7e7ce]/70 font-sans font-light tracking-wide">
            {t.subtitle}
          </p>
        </div>

        {/* Live Market Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          
          <div className="theme-bg-card border theme-border p-5 rounded-2xl text-center space-y-1 shadow-md hover:border-[#b8860b] dark:hover:border-[#d4af37] transition-colors">
            <span className="text-[10px] text-[#8c1d1e] dark:text-[#d4af37] uppercase tracking-widest font-sans font-bold block">24K Gold (999 Pure)</span>
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
              ₹{metalRate.gold24k.toLocaleString('en-IN')}<span className="text-xs text-[#5c5244] dark:text-[#d4af37]/60 font-sans">{t.perGram}</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Benchmark
            </span>
          </div>

          <div className="theme-bg-card border-2 border-[#b8860b]/40 dark:border-[#d4af37]/40 p-5 rounded-2xl text-center space-y-1 shadow-md hover:border-[#b8860b] dark:hover:border-[#d4af37] transition-colors">
            <span className="text-[10px] text-[#8c1d1e] dark:text-[#d4af37] uppercase tracking-widest font-sans font-bold block">22K Gold (916 Standard)</span>
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
              ₹{metalRate.gold22k.toLocaleString('en-IN')}<span className="text-xs text-[#5c5244] dark:text-[#d4af37]/60 font-sans">{t.perGram}</span>
            </div>
            <span className="text-[10px] text-amber-700 dark:text-amber-300 font-mono font-bold">
              ★ Most Popular Jewelry
            </span>
          </div>

          <div className="theme-bg-card border theme-border p-5 rounded-2xl text-center space-y-1 shadow-md hover:border-[#b8860b] dark:hover:border-[#d4af37] transition-colors">
            <span className="text-[10px] text-[#8c1d1e] dark:text-[#d4af37] uppercase tracking-widest font-sans font-bold block">18K Gold (750 Hallmark)</span>
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
              ₹{metalRate.gold18k.toLocaleString('en-IN')}<span className="text-xs text-[#5c5244] dark:text-[#d4af37]/60 font-sans">{t.perGram}</span>
            </div>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
              Diamond / Modern
            </span>
          </div>

          <div className="theme-bg-card border-2 border-slate-300 dark:border-[#d4af37]/30 p-5 rounded-2xl text-center space-y-1 shadow-md hover:border-slate-400 dark:hover:border-[#d4af37] transition-colors">
            <span className="text-[10px] text-slate-700 dark:text-slate-300 uppercase tracking-widest font-sans font-bold block">999 Fine Silver (चांदी)</span>
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
              ₹{metalRate.silver999.toLocaleString('en-IN')}<span className="text-xs text-[#5c5244] dark:text-[#d4af37]/60 font-sans">{t.perGram}</span>
            </div>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-300 font-mono font-bold">
              Payal / Jhanjhar / Murti
            </span>
          </div>

        </div>

        {/* Valuation Calculator Tool */}
        <div className="bg-[#ffffff] dark:bg-[#0b2239] border-2 border-[#b8860b]/30 dark:border-[#d4af37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-[#e6dac1] dark:border-[#d4af37]/20 pb-4">
            <div className="p-2.5 rounded-xl bg-[#b8860b]/10 dark:bg-[#d4af37]/15 border border-[#b8860b]/30 dark:border-[#d4af37]/30">
              <Calculator className="w-5 h-5 text-[#b8860b] dark:text-[#d4af37]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                Instant Transparency Calculator (सटीक मूल्य अनुमान)
              </h3>
              <p className="text-xs text-[#5c5244] dark:text-[#f7e7ce]/70">
                Calculate gold or silver jewellery cost with live benchmark, making charges, and GST.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Purity selector */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#1a1612] dark:text-[#f7e7ce]">
                {t.selectPurity}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '24k', label: '24K Gold' },
                  { id: '22k', label: '22K Gold' },
                  { id: '18k', label: '18K Gold' },
                  { id: 'silver', label: '999 Silver' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPurity(item.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-sans font-bold transition-all ${
                      purity === item.id
                        ? 'bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#05110d] shadow-md'
                        : 'bg-[#faf6ee] dark:bg-[#05110d] text-[#5c5244] dark:text-[#f7e7ce]/70 border theme-border hover:border-[#b8860b]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight input */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#1a1612] dark:text-[#f7e7ce]">
                {t.enterWeight}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-[#faf6ee] dark:bg-[#05110d] border border-[#e6dac1] dark:border-[#d4af37]/40 rounded-xl px-4 py-2.5 text-sm font-mono text-[#1a1612] dark:text-[#f7e7ce] focus:outline-none focus:border-[#b8860b] dark:focus:border-[#d4af37]"
                />
                <span className="absolute right-4 top-2.5 text-xs text-[#5c5244] dark:text-[#f7e7ce]/60 font-mono">
                  grams
                </span>
              </div>
            </div>

            {/* Making charge slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sans font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                <span className="uppercase tracking-wider">Making Charges:</span>
                <span className="text-[#8c1d1e] dark:text-[#d4af37] font-mono">{makingChargesPercent}%</span>
              </div>
              <input
                type="range"
                min="8"
                max="20"
                step="1"
                value={makingChargesPercent}
                onChange={(e) => setMakingChargesPercent(parseInt(e.target.value))}
                className="w-full accent-[#b8860b] dark:accent-[#d4af37] cursor-pointer mt-2"
              />
              <div className="flex justify-between text-[10px] text-[#5c5244] dark:text-[#f7e7ce]/60 font-mono">
                <span>Simple (8%)</span>
                <span>Bridal Intricate (20%)</span>
              </div>
            </div>

          </div>

          {/* Breakdown & Total Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#faf6ee] dark:bg-[#05110d] p-6 rounded-2xl border theme-border">
            <div className="space-y-2 text-xs font-sans text-[#5c5244] dark:text-[#f7e7ce]/80">
              <div className="flex justify-between">
                <span>Metal Cost ({weightGrams}g @ ₹{ratePerGram}/g):</span>
                <span className="font-mono text-[#1a1612] dark:text-[#f7e7ce] font-bold">₹{rawMetalValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Making Charges ({makingChargesPercent}%):</span>
                <span className="font-mono text-[#1a1612] dark:text-[#f7e7ce] font-bold">₹{Math.round(makingChargeAmount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (3% on Jewellery):</span>
                <span className="font-mono text-[#1a1612] dark:text-[#f7e7ce] font-bold">₹{Math.round(gstAmount).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center md:items-end border-t md:border-t-0 md:border-l theme-border pt-4 md:pt-0 md:pl-6 space-y-1">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8c1d1e] dark:text-[#d4af37]">
                {t.estimatedPrice}
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                ₹{Math.round(totalEstimatedPrice).toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#5c5244] dark:text-[#f7e7ce]/60 font-sans text-center md:text-right">
                100% BIS Hallmarked Guaranteed
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
