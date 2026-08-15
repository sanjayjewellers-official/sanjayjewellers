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
    <section id="craftsmanship" className="py-24 bg-[#05110d] relative border-t border-[#d4af37]/20 text-[#f7e7ce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7e7ce]">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#f7e7ce]/70 font-sans font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Craftsmanship Image Showcase */}
          <div className="relative">
            <div className="relative border border-[#d4af37]/30 shadow-2xl aspect-[4/3] bg-[#0b2239]">
              <img
                src="https://images.unsplash.com/photo-1611591475111-a83d3b6f00c5?auto=format&fit=crop&w=1200&q=85"
                alt="Jewelry Goldsmith Artisan at work"
                className="w-full h-full object-cover mix-blend-luminosity opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05110d] via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlay Stamp Badge */}
            <div className="absolute -bottom-6 -right-2 sm:bottom-6 sm:right-6 bg-[#05110d]/95 border border-[#d4af37] p-5 shadow-2xl max-w-xs space-y-1">
              <div className="flex items-center gap-2 text-[#d4af37] font-sans font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Karatometer Tested</span>
              </div>
              <p className="text-[11px] text-[#f7e7ce]/70 font-sans font-light leading-relaxed">
                Non-destructive X-ray fluorescence purity verification provided with every piece.
              </p>
            </div>
          </div>

          {/* Right Pillars List */}
          <div className="space-y-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#0b2239]/60 border border-[#d4af37]/20 p-5 flex items-start gap-4 hover:border-[#d4af37] transition-colors shadow-xl"
                >
                  <div className="p-3 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-serif font-light text-[#f7e7ce]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#f7e7ce]/70 font-sans font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
