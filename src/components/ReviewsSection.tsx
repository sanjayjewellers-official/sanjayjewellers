import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2, Crown } from 'lucide-react';
import { Language } from '../types';
import { REVIEWS } from '../data/products';

interface ReviewsSectionProps {
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  return (
    <section id="reviews" className="py-20 bg-white dark:bg-[#000000] relative border-t border-[#e6dac1] dark:border-[#d4af37]/30 text-[#1a1612] dark:text-[#fde047] transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4ebd0] dark:bg-[#1f190e] border border-[#b8860b]/30 dark:border-[#d4af37]/50 text-[#8c1d1e] dark:text-[#fde047] text-[10px] font-sans font-bold uppercase tracking-[0.25em]">
            <Crown className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#fde047]" />
            <span>Customer Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1612] dark:text-[#fde047]">
            Stories of Trust & Royal Grandeur
          </h2>

          <p className="text-xs sm:text-sm text-[#5c5244] dark:text-[#d4af37] font-sans">
            Hear from royal families who trusted Sanjay Jewellers Sariya for their grand wedding jewellery.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#faf6ee] dark:bg-[#0a0805] border-2 border-[#e6dac1] dark:border-[#d4af37]/40 rounded-3xl p-6 space-y-4 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500 dark:text-[#fde047]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#5c5244] dark:text-[#d4af37]">
                    {review.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#1a1612] dark:text-[#fde047] font-serif italic leading-relaxed">
                  "{review.comment[currentLang]}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#e6dac1] dark:border-[#d4af37]/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-sans font-bold text-[#1a1612] dark:text-[#fde047]">
                    {review.author}
                  </h4>
                  <span className="text-[10px] text-[#5c5244] dark:text-[#d4af37] block">
                    {review.location}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-[#fde047] font-bold bg-emerald-100 dark:bg-[#1a1408] px-2.5 py-1 rounded-full border border-emerald-300 dark:border-[#d4af37]/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#fde047]" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
