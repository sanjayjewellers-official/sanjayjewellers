import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { Language, Product } from '../types';
import { translations } from '../data/translations';

interface CategoryGridProps {
  currentLang: Language;
  onSelectCategory: (category: string) => void;
  products: Product[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  currentLang,
  onSelectCategory,
  products,
}) => {
  const t = translations[currentLang].categories;

  const categories = [
    {
      id: 'gala',
      title: '👑 Necklaces & Chokers (कंठहार व चोकर)',
      count: products.filter((p) => p.mainCategory === 'gala').length || 18,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-2 md:row-span-2',
      badge: '👑 Heritage Rani Haar',
    },
    {
      id: 'pairon_chandi',
      title: '🌟 Anklets & Silver Craft (पायल व बिछिया संग्रह)',
      count: products.filter((p) => p.mainCategory === 'pairon_chandi').length || 8,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1 md:row-span-2',
      badge: '🌟 999 Chandi Highlight',
    },
    {
      id: 'haath_kalaai',
      title: '💫 Bangles & Bracelets (कंगन व चूड़ियां)',
      count: products.filter((p) => p.mainCategory === 'haath_kalaai').length || 15,
      image: 'https://images.unsplash.com/photo-1611591475111-a83d3b6f00c5?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1',
      badge: '👑 Temple Kada',
    },
    {
      id: 'sir_matha',
      title: '✨ Bridal Headwear (शीशफूल व माँगटीका)',
      count: products.filter((p) => p.mainCategory === 'sir_matha').length || 10,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1',
      badge: '👑 Bridal Shringaar',
    },
    {
      id: 'kaan',
      title: '💎 Earrings & Jhumkas (झुमके व बालियां)',
      count: products.filter((p) => p.mainCategory === 'kaan').length || 30,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1',
    },
  ];

  return (
    <section id="categories" className="py-20 bg-white dark:bg-[#0a0806] relative text-[#1a1612] dark:text-[#f7e7ce] transition-colors duration-400 border-t border-[#e6dac1] dark:border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4ebd0] dark:bg-[#1a1408] border border-[#b8860b]/30 dark:border-[#d4af37]/50 text-[#8c1d1e] dark:text-[#d4af37] text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
            <Compass className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#4a3e31] dark:text-[#d4af37] font-sans font-light tracking-wide">
            {t.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative overflow-hidden cursor-pointer border-2 border-[#e6dac1] dark:border-[#d4af37]/30 rounded-3xl shadow-xl bg-[#1c150c] ${cat.span}`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-85"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  {cat.badge ? (
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-[#8c1d1e] text-white dark:bg-[#d4af37] dark:text-black shadow-lg">
                      {cat.badge}
                    </span>
                  ) : <div />}

                  <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/60 border border-white/40 dark:border-[#d4af37]/40 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-[#0a0806] transition-colors shadow-lg">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-sans font-bold text-[#d4af37] uppercase tracking-widest bg-black/60 px-2.5 py-1 rounded-md border border-[#d4af37]/30 inline-block">
                    {cat.count}+ Designs
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] font-sans text-[#d4af37] group-hover:underline flex items-center gap-1 uppercase tracking-widest font-bold">
                    {t.viewAll} →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
