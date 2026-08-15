import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';
import { Review, Language } from '../types';
import { REVIEWS } from '../data/products';
import { translations } from '../data/translations';

interface ReviewsSectionProps {
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].reviews;

  return (
    <section id="reviews" className="py-20 bg-[#05110d] relative border-t border-[#d4af37]/20 text-[#f7e7ce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>Patron Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7e7ce]">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#f7e7ce]/70 font-sans font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0b2239]/80 border border-[#d4af37]/20 p-6 shadow-xl relative space-y-4 flex flex-col justify-between hover:border-[#d4af37] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#d4af37]/30 shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-[#f7e7ce]/90 font-serif italic leading-relaxed">
                  "{review.comment[currentLang]}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif font-light text-[#f7e7ce] block">
                    {review.author}
                  </span>
                  <span className="text-[10px] text-[#d4af37]/70 font-sans block">
                    {review.location} • {review.date}
                  </span>
                </div>

                {review.verifiedBuyer && (
                  <span className="text-[10px] text-emerald-400 bg-[#05110d] px-2 py-1 border border-emerald-500/30 flex items-center gap-1 font-sans">
                    <CheckCircle className="w-3 h-3" /> {t.verified}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
