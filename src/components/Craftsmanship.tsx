import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Gem, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CraftsmanshipProps {
  currentLang: Language;
}

export const Craftsmanship: React.FC<CraftsmanshipProps> = ({ currentLang }) => {
  const t = translations[currentLang].craftsmanship;

  const pillars = [
    {
      icon: ShieldCheck,
      title: t.pillar1Title,
      desc: t.pillar1Desc,
    },
    {
      icon: Award,
      title: t.pillar2Title,
      desc: t.pillar2Desc,
    },
    {
      icon: Gem,
      title: t.pillar3Title,
      desc: t.pillar3Desc,
    },
    {
      icon: RefreshCw,
      title: t.pillar4Title,
      desc: t.pillar4Desc,
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 theme-bg-primary relative border-t theme-border text-[#1a1612] dark:text-[#f7e7ce] transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4ebd0] dark:bg-[#d4af37]/10 border border-[#b8860b]/30 dark:border-[#d4af37]/30 text-[#8c1d1e] dark:text-[#d4af37] text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37] animate-pulse" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#5c5244] dark:text-[#f7e7ce]/70 font-sans font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Craftsmanship Image Showcase */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#e6dac1] dark:border-[#d4af37]/40 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1611591475111-a83d3b6f00c5?auto=format&fit=crop&w=1200&q=85"
              alt="Master Goldsmith at Work"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-md border border-[#e6dac1] dark:border-[#d4af37]/40 space-y-1">
              <span className="text-[10px] font-bold text-[#8c1d1e] dark:text-[#d4af37] uppercase tracking-widest block font-sans">
                Sariya Karigar Legacy
              </span>
              <h4 className="text-base font-serif font-bold text-[#1a1612] dark:text-white">
                30 Years of Unbroken Trust & Handcrafted Perfection
              </h4>
            </div>
          </div>

          {/* Right 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl theme-bg-surface border-2 border-[#e6dac1] dark:border-[#d4af37]/25 space-y-3 shadow-md hover:border-[#b8860b] dark:hover:border-[#d4af37] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f4ebd0] dark:bg-[#d4af37]/15 border border-[#b8860b]/30 dark:border-[#d4af37]/40 flex items-center justify-center text-[#8c1d1e] dark:text-[#d4af37]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#5c5244] dark:text-[#f7e7ce]/70 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
