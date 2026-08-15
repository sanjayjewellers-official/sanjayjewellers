import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, ShieldCheck, ArrowRight, Award } from 'lucide-react';
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

    const goldColors = ['#fce8b3', '#d4af37', '#e5c158', '#f9e29c', '#ffffff'];

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
          ctx.shadowColor = '#e5c158';
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
    <section className="relative min-h-screen flex items-center justify-center pt-44 sm:pt-48 pb-20 overflow-hidden bg-[#05110d] text-[#f7e7ce]">
      
      {/* Immersive UI Radial Gradient Atmosphere */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #0d3b2e 0%, transparent 50%), radial-gradient(circle at 80% 70%, #0b2239 0%, transparent 50%)' }} />

      {/* Decorative Ambient Blurs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d4af37] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#004d40] opacity-[0.08] blur-[100px] rounded-full pointer-events-none" />

      {/* Background Image with Dark Emerald Vignette */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury Jewelry Banner"
          className="w-full h-full object-cover object-center scale-105 filter brightness-40 contrast-125 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05110d] via-[#05110d]/80 to-[#05110d]/90" />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-lg">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>SANJAY JEWELLERS SARIYA • 30 YEARS OF TRUST & HERITAGE</span>
          </div>

          <div className="inline-flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#d4af37]" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-[#d4af37] font-bold">
              {t.tag}
            </span>
            <div className="h-[1px] w-12 bg-[#d4af37]" />
          </div>
        </motion.div>

        {/* Immersive Theme Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-light tracking-tight text-[#f7e7ce] leading-[1.05]">
            {t.titleLine1}
          </h1>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-[#d4af37] font-normal tracking-wide">
            {t.titleLine2}
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto text-sm sm:text-base text-[#f7e7ce]/70 font-sans font-light tracking-wide leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <a
            href="#prime-collection"
            className="group flex items-center gap-4 w-fit"
          >
            <div className="bg-[#d4af37] text-[#05110d] px-10 py-4 text-xs font-bold font-sans uppercase tracking-[0.2em] hover:bg-[#f7e7ce] transition-colors shadow-2xl">
              {t.exploreBtn}
            </div>
            <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center group-hover:bg-[#d4af37]/10 transition-colors">
              <div className="w-2 h-2 border-t-2 border-r-2 border-[#d4af37] rotate-45 ml-[-2px]" />
            </div>
          </a>

          <button
            onClick={onOpenTryOn}
            className="border border-[#d4af37]/40 hover:border-[#d4af37] text-[#d4af37] px-8 py-4 text-xs font-bold font-sans uppercase tracking-[0.2em] hover:bg-[#d4af37]/10 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-[#d4af37]" />
            <span>{t.tryOnBtn}</span>
          </button>
        </motion.div>

        {/* Trust & Hallmark Feature Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-10 border-t border-[#d4af37]/10 text-xs font-sans tracking-widest uppercase opacity-80"
        >
          <div className="flex items-center justify-center gap-2 bg-[#0b2239]/40 p-3 rounded-lg border border-[#d4af37]/15">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="font-bold text-[10px] text-[#f7e7ce]">100% BIS Hallmarked</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#0b2239]/40 p-3 rounded-lg border border-[#d4af37]/15">
            <Award className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="font-bold text-[10px] text-[#f7e7ce]">Lifetime Guarantee</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 bg-[#0b2239]/40 p-3 rounded-lg border border-[#d4af37]/15">
            <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="font-bold text-[10px] text-[#f7e7ce]">VIP Concierge Trial</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
