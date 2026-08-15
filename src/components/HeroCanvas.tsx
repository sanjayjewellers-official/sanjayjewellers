import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, ShieldCheck, ArrowRight, Award, Crown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroCanvasProps {
  currentLang: Language;
  onOpenTryOn: () => void;
  onOpenBooking: () => void;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  currentLang,
  onOpenTryOn,
  onOpenBooking,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const t = translations[currentLang].hero;

  // Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle array
    const particlesCount = 70;
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
      speedY: number;
      speedX: number;
      pulseSpeed: number;
    }[] = [];

    const goldColors = ['#b8860b', '#d4af37', '#e5c158', '#f9e29c', '#ffffff'];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.fill();

        // Subtle glow for larger particles
        if (p.radius > 1.8) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#d4af37';
        } else {
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-40 sm:pt-44 pb-16 overflow-hidden bg-[#faf7f0] dark:bg-[#05110d] text-[#1a1612] dark:text-[#f7e7ce] transition-colors duration-400">
      
      {/* Immersive UI Radial Gradient Atmosphere */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(184,134,11,0.12) 0%, transparent 50%)' }} />

      {/* Decorative Ambient Blurs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d4af37] opacity-[0.08] dark:opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#b8860b] opacity-[0.08] blur-[100px] rounded-full pointer-events-none" />

      {/* Background Image with Theme Vignette */}
      <div className="absolute inset-0 z-0 opacity-15 dark:opacity-25">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury Jewelry Banner"
          className="w-full h-full object-cover object-center scale-105 filter contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f0] dark:from-[#05110d] via-[#faf7f0]/80 dark:via-[#05110d]/80 to-[#faf7f0]/95 dark:to-[#05110d]/90" />
      </div>

      {/* Floating Sparkle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Hero Content Box */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-12 text-center space-y-8">
        
        {/* Imperial Eyebrow & Brand Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex flex-col items-center justify-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4ebd0] dark:bg-[#d4af37]/15 border border-[#b8860b]/40 dark:border-[#d4af37]/40 text-[#8c1d1e] dark:text-[#d4af37] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-md">
            <Award className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37]" />
            <span>SANJAY JEWELLERS SARIYA • 30 YEARS OF TRUST & HERITAGE</span>
          </div>

          <div className="inline-flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#b8860b] dark:bg-[#d4af37]" />
            <span className="text-[10px] uppercase tracking-[0.35em] font-sans text-[#b8860b] dark:text-[#d4af37] font-bold">
              {t.tag}
            </span>
            <div className="h-[1px] w-12 bg-[#b8860b] dark:bg-[#d4af37]" />
          </div>
        </motion.div>

        {/* Immersive Theme Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight text-[#1a1612] dark:text-[#f7e7ce] leading-[1.05]">
            {t.titleLine1}
          </h1>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-[#8c1d1e] dark:text-[#d4af37] font-normal tracking-wide">
            {t.titleLine2}
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto text-sm sm:text-base text-[#5c5244] dark:text-[#f7e7ce]/80 font-sans font-normal tracking-wide leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
        >
          <a
            href="#sone-chandi-catalog"
            className="group flex items-center gap-3 w-fit"
          >
            <div className="bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#05110d] px-8 sm:px-10 py-4 text-xs font-bold font-sans uppercase tracking-[0.2em] hover:bg-[#8c1d1e] dark:hover:bg-[#f7e7ce] transition-colors shadow-xl rounded-l-md">
              {t.exploreBtn}
            </div>
            <div className="w-12 h-12 rounded-r-md bg-[#8c1d1e] dark:bg-[#b8860b] text-white flex items-center justify-center group-hover:bg-[#1a1612] transition-colors shadow-xl">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          <button
            onClick={onOpenTryOn}
            className="border-2 border-[#b8860b] dark:border-[#d4af37]/60 hover:border-[#8c1d1e] dark:hover:border-[#d4af37] text-[#8c1d1e] dark:text-[#d4af37] bg-white/70 dark:bg-transparent px-8 py-3.5 text-xs font-bold font-sans uppercase tracking-[0.2em] hover:bg-[#f4ebd0] dark:hover:bg-[#d4af37]/10 transition-colors flex items-center gap-2 rounded-md shadow-sm"
          >
            <Eye className="w-4 h-4 text-[#b8860b] dark:text-[#d4af37]" />
            <span>{t.tryOnBtn}</span>
          </button>
        </motion.div>

        {/* Trust & Hallmark Feature Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-10 border-t border-[#e6dac1] dark:border-[#d4af37]/20 text-xs font-sans tracking-widest uppercase"
        >
          <div className="flex items-center justify-center gap-2 bg-white/90 dark:bg-[#0b2239]/40 p-3 rounded-xl border border-[#e6dac1] dark:border-[#d4af37]/15 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#b8860b] dark:text-[#d4af37] shrink-0" />
            <span className="font-bold text-[10px] text-[#1a1612] dark:text-[#f7e7ce]">100% BIS Hallmarked</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/90 dark:bg-[#0b2239]/40 p-3 rounded-xl border border-[#e6dac1] dark:border-[#d4af37]/15 shadow-sm">
            <Award className="w-4 h-4 text-[#b8860b] dark:text-[#d4af37] shrink-0" />
            <span className="font-bold text-[10px] text-[#1a1612] dark:text-[#f7e7ce]">Lifetime Guarantee</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 bg-white/90 dark:bg-[#0b2239]/40 p-3 rounded-xl border border-[#e6dac1] dark:border-[#d4af37]/15 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#b8860b] dark:text-[#d4af37] shrink-0" />
            <span className="font-bold text-[10px] text-[#1a1612] dark:text-[#f7e7ce]">VIP Doorstep Trial</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
