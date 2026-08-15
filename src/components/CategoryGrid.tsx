import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Compass } from 'lucide-react';
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
      id: 'necklace',
      title: t.necklaces,
      count: products.filter((p) => p.category === 'necklace').length || 18,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      id: 'bridal',
      title: t.bridal,
      count: products.filter((p) => p.category === 'bridal').length || 12,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1 md:row-span-2',
    },
    {
      id: 'bangles',
      title: t.bangles,
      count: products.filter((p) => p.category === 'bangles').length || 15,
      image: 'https://images.unsplash.com/photo-1611591475111-a83d3b6f00c5?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1',
    },
    {
      id: 'rings',
      title: t.rings,
      count: products.filter((p) => p.category === 'rings').length || 24,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1',
    },
    {
      id: 'earrings',
      title: t.earrings,
      count: products.filter((p) => p.category === 'earrings').length || 30,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1',
    },
  ];

  return (
    <section id="categories" className="py-20 bg-[#05110d] relative text-[#f7e7ce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
            <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7e7ce]">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#f7e7ce]/70 font-sans font-light tracking-wide">
            {t.subtitle}
          </p>
        </div>

        {/* Bento / Animated Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative overflow-hidden cursor-pointer border border-[#d4af37]/20 shadow-2xl bg-[#0b2239] ${cat.span}`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-luminosity opacity-80"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#05110d] via-[#05110d]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-[#f7e7ce]">
                <div className="flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-[#05110d]/80 border border-[#d4af37]/40 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-[#05110d] transition-colors shadow-lg">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-sans font-bold text-[#d4af37] uppercase tracking-widest bg-[#05110d]/90 px-2.5 py-1 border border-[#d4af37]/30 inline-block">
                    {cat.count}+ {t.itemsCount}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-light text-[#f7e7ce] group-hover:text-[#d4af37] transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] font-sans text-[#d4af37] group-hover:underline flex items-center gap-1 uppercase tracking-widest">
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
