import React, { useState } from 'react';
import { Sparkles, Globe, ShieldCheck, Mail, MapPin, Phone, Instagram, Facebook, Youtube, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onOpenBooking,
}) => {
  const t = translations[currentLang].footer;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#05110d] border-t border-[#d4af37]/30 text-[#f7e7ce] relative overflow-hidden font-sans">
      
      {/* Newsletter Bar */}
      <div className="border-b border-[#d4af37]/20 bg-[#030a08] py-12 px-4 sm:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-[#d4af37] font-bold uppercase tracking-[0.3em] bg-[#d4af37]/10 px-3 py-1 border border-[#d4af37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Royal Club Privileges</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#f7e7ce]">
            {t.newsletterTitle}
          </h3>

          <p className="text-xs sm:text-sm text-[#f7e7ce]/70 font-light max-w-lg mx-auto tracking-wide">
            {t.newsletterDesc}
          </p>

          {subscribed ? (
            <div className="bg-[#d4af37]/10 border border-[#d4af37] p-3 text-xs text-[#f7e7ce] font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.voucherSuccess}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#05110d] border border-[#d4af37]/40 text-xs text-[#f7e7ce] px-4 py-3 focus:outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                className="bg-[#d4af37] text-[#05110d] font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#f7e7ce] transition-colors"
              >
                {t.subscribeBtn}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
        
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#d4af37] flex items-center justify-center text-[#05110d] font-bold font-serif text-lg">
              S
            </div>
            <span className="text-lg font-serif font-light text-[#f7e7ce]">
              {t.aboutTitle}
            </span>
          </div>
          <p className="text-[#f7e7ce]/70 leading-relaxed font-light">
            {t.aboutText}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 bg-[#0b2239] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:border-[#d4af37] hover:text-[#f7e7ce] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-[#0b2239] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:border-[#d4af37] hover:text-[#f7e7ce] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-[#0b2239] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:border-[#d4af37] hover:text-[#f7e7ce] transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-serif font-light text-[#d4af37] uppercase tracking-widest text-sm">
            {t.quickLinks}
          </h4>
          <ul className="space-y-2 text-[#f7e7ce]/70 font-light">
            <li><a href="#prime-collection" className="hover:text-[#d4af37] transition-colors">Prime Collection</a></li>
            <li><a href="#categories" className="hover:text-[#d4af37] transition-colors">Royal Categories</a></li>
            <li><a href="#craftsmanship" className="hover:text-[#d4af37] transition-colors">Heritage & Purity</a></li>
            <li><a href="#rate-calculator" className="hover:text-[#d4af37] transition-colors">Live Gold Rate Calculator</a></li>
            <li><button onClick={onOpenBooking} className="hover:text-[#d4af37] text-left">VIP Consultation Booking</button></li>
          </ul>
        </div>

        {/* Flagship Boutiques */}
        <div className="space-y-3">
          <h4 className="font-serif font-light text-[#d4af37] uppercase tracking-widest text-sm">
            {t.boutiques}
          </h4>
          <ul className="space-y-2.5 text-[#f7e7ce]/70 font-light">
            <li className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
              <span>Bhubaneswar: Janpath, Saheed Nagar</span>
            </li>
            <li className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
              <span>Mumbai: Opera House, South Mumbai</span>
            </li>
            <li className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
              <span>Delhi: South Extension Part 1</span>
            </li>
            <li className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
              <span>Jaipur: Johari Bazaar Heritage Palace</span>
            </li>
          </ul>
        </div>

        {/* Language Switcher & Trust Seals */}
        <div className="space-y-4">
          <h4 className="font-serif font-light text-[#d4af37] uppercase tracking-widest text-sm">
            Language & Trust
          </h4>
          
          <div className="flex gap-2">
            {[
              { code: 'en', name: 'English' },
              { code: 'hi', name: 'हिंदी' },
              { code: 'or', name: 'ଓଡ଼ିଆ' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code as Language)}
                className={`px-3 py-1.5 text-xs font-semibold border transition-all ${
                  currentLang === lang.code
                    ? 'bg-[#d4af37] text-[#05110d] border-[#d4af37]'
                    : 'bg-[#0b2239] text-[#f7e7ce] border-[#d4af37]/30'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          <div className="p-3 bg-[#030a08] border border-[#d4af37]/20 space-y-1">
            <div className="flex items-center gap-1.5 text-[#d4af37] font-bold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% BIS Hallmarked</span>
            </div>
            <p className="text-[10px] text-[#f7e7ce]/60 font-light">
              {t.securityNotice}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#d4af37]/10 py-4 px-4 text-center text-[10px] text-[#d4af37]/60 uppercase tracking-widest">
        © 2026 {t.rights}
      </div>

    </footer>
  );
};
