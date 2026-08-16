import React, { useState } from 'react';
import { TrendingUp, Calculator, ShieldCheck, Sparkles } from 'lucide-react';
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
    <section id="rate-calculator" className="py-14 bg-white dark:bg-[#110e0c] border-y border-[#ebdcc9] dark:border-[#2d261d] relative transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header with Ultra-Clear Contrast */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4ebd0] dark:bg-[#2a2215] border border-[#b8860b]/40 text-[#8c1d1e] dark:text-[#d4af37] text-xs font-bold uppercase tracking-widest font-sans">
            <TrendingUp className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>LIVE BULLION MARKET BENCHMARK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#6c6152] dark:text-[#d1c7b7] font-sans font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Live Market Rates Grid (Crisp White/Slate Cards with Bold Contrast) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* 24K */}
          <div className="bg-[#faf6ee] dark:bg-[#1a1612] border border-[#e2d5be] dark:border-[#382f25] p-5 rounded-2xl text-center space-y-1.5 shadow-sm hover:border-[#b8860b] transition-all">
            <span className="text-[11px] text-[#8c1d1e] dark:text-[#f59e0b] uppercase tracking-widest font-sans font-bold block">
              24K Gold (999 Pure)
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1612] dark:text-[#fef08a]">
              ₹{metalRate.gold24k.toLocaleString('en-IN')}
              <span className="text-xs text-[#7a6d5c] dark:text-[#a89d8d] font-sans font-normal"> /g</span>
            </div>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Benchmark
            </span>
          </div>

          {/* 22K (Most Popular) */}
          <div className="bg-[#fffdf7] dark:bg-[#221a12] border-2 border-[#b8860b] dark:border-[#d4af37] p-5 rounded-2xl text-center space-y-1.5 shadow-md scale-102">
            <span className="text-[11px] text-[#b45309] dark:text-[#fbbf24] uppercase tracking-widest font-sans font-bold block">
              22K Gold (916 Standard)
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#8c1d1e] dark:text-[#fde047]">
              ₹{metalRate.gold22k.toLocaleString('en-IN')}
              <span className="text-xs text-[#7a6d5c] dark:text-[#a89d8d] font-sans font-normal"> /g</span>
            </div>
            <span className="text-[10px] bg-[#b8860b] text-white dark:bg-[#d4af37] dark:text-black px-2 py-0.5 rounded-full font-bold inline-block">
              ★ Most Popular Jewelry
            </span>
          </div>

          {/* 18K */}
          <div className="bg-[#faf6ee] dark:bg-[#1a1612] border border-[#e2d5be] dark:border-[#382f25] p-5 rounded-2xl text-center space-y-1.5 shadow-sm hover:border-[#b8860b] transition-all">
            <span className="text-[11px] text-[#4338ca] dark:text-[#818cf8] uppercase tracking-widest font-sans font-bold block">
              18K Gold (750 Hallmark)
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1612] dark:text-[#fef08a]">
              ₹{metalRate.gold18k.toLocaleString('en-IN')}
              <span className="text-xs text-[#7a6d5c] dark:text-[#a89d8d] font-sans font-normal"> /g</span>
            </div>
            <span className="text-[10px] text-[#4338ca] dark:text-[#a5b4fc] font-semibold">
              Diamond & Daily Wear
            </span>
          </div>

          {/* 999 Silver */}
          <div className="bg-[#f3f6f9] dark:bg-[#16222b] border-2 border-[#94a3b8] dark:border-[#38bdf8]/40 p-5 rounded-2xl text-center space-y-1.5 shadow-sm hover:border-[#38bdf8] transition-all">
            <span className="text-[11px] text-[#0f172a] dark:text-[#38bdf8] uppercase tracking-widest font-sans font-bold block">
              999 Fine Silver (चांदी)
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a] dark:text-[#e0f2fe]">
              ₹{metalRate.silver999.toLocaleString('en-IN')}
              <span className="text-xs text-[#475569] dark:text-[#94a3b8] font-sans font-normal"> /g</span>
            </div>
            <span className="text-[10px] text-[#0369a1] dark:text-[#7dd3fc] font-bold">
              Payal, Bichhiya & Murti
            </span>
          </div>

        </div>

        {/* Valuation Calculator Tool (High-Contrast, Clean Layout) */}
        <div className="bg-[#fbf8f2] dark:bg-[#171411] border border-[#e2d5be] dark:border-[#382f25] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebdcc9] dark:border-[#2d261d] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#b8860b] text-white">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                  Instant Gold & Silver Price Calculator (मूल्य अनुमान)
                </h3>
                <p className="text-xs text-[#6c6152] dark:text-[#a89d8d]">
                  100% transparent estimate including live market rate, making charges, and 3% GST.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Certified Transparent</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Purity selector */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#3d3226] dark:text-[#e8dec8]">
                {t.selectPurity}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '24k', label: '24K Gold (999)' },
                  { id: '22k', label: '22K Gold (916)' },
                  { id: '18k', label: '18K Gold (750)' },
                  { id: 'silver', label: '999 Fine Silver' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPurity(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-sans font-bold transition-all border ${
                      purity === item.id
                        ? 'bg-gradient-to-r from-[#b45309] to-[#d97706] text-white border-transparent shadow-md'
                        : 'bg-white dark:bg-[#1a1612] text-[#4d4030] dark:text-[#d1c7b7] border-[#e2d5be] dark:border-[#382f25] hover:border-[#b8860b]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight input */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#3d3226] dark:text-[#e8dec8]">
                {t.enterWeight}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white dark:bg-[#1a1612] border border-[#d8c8af] dark:border-[#382f25] rounded-xl px-4 py-2.5 text-sm font-mono text-[#1a1612] dark:text-[#f7e7ce] focus:outline-none focus:ring-2 focus:ring-[#b8860b] shadow-inner"
                />
                <span className="absolute right-4 top-2.5 text-xs text-[#7a6d5c] dark:text-[#a89d8d] font-mono font-bold">
                  Grams
                </span>
              </div>
              <div className="flex gap-1.5 pt-1">
                {[5, 10, 20, 50].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setWeightGrams(preset)}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1a1612] border border-[#e2d5be] dark:border-[#382f25] text-[10px] font-sans font-semibold text-[#5c5244] dark:text-[#d1c7b7] hover:border-[#b8860b]"
                  >
                    {preset}g
                  </button>
                ))}
              </div>
            </div>

            {/* Making Charges */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-bold uppercase tracking-wider text-[#3d3226] dark:text-[#e8dec8]">
                  Making Charges
                </span>
                <span className="font-mono font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                  {makingChargesPercent}%
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                step="1"
                value={makingChargesPercent}
                onChange={(e) => setMakingChargesPercent(parseInt(e.target.value))}
                className="w-full accent-[#b8860b] cursor-pointer mt-2"
              />
              <div className="flex justify-between text-[10px] text-[#7a6d5c] dark:text-[#a89d8d] font-sans">
                <span>Simple (6%)</span>
                <span>Bridal Intricate (24%)</span>
              </div>
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="pt-4 border-t border-[#ebdcc9] dark:border-[#2d261d] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#1a1612] p-4 rounded-2xl border border-[#e2d5be] dark:border-[#382f25]">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7a6d5c] dark:text-[#a89d8d]">
                Estimated Price (incl. GST & Making)
              </span>
              <div className="text-3xl font-serif font-bold text-[#8c1d1e] dark:text-[#fde047]">
                ₹{Math.round(totalEstimatedPrice).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-sans text-[#5c5244] dark:text-[#d1c7b7]">
              <div>Metal Value: <strong>₹{Math.round(rawMetalValue).toLocaleString('en-IN')}</strong></div>
              <div>Making: <strong>₹{Math.round(makingChargeAmount).toLocaleString('en-IN')}</strong></div>
              <div>GST (3%): <strong>₹{Math.round(gstAmount).toLocaleString('en-IN')}</strong></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
