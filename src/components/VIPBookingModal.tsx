import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, User, Phone, Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { BookingDetails, Language } from '../types';
import { translations } from '../data/translations';

interface VIPBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const VIPBookingModal: React.FC<VIPBookingModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLang].booking;

  const [form, setForm] = useState<BookingDetails>({
    fullName: '',
    email: '',
    phone: '',
    preferredCity: 'Sariya Showroom',
    serviceType: 'store_visit',
    date: '2026-08-20',
    timeSlot: '11:00 AM - 01:00 PM',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#041d15] border-2 border-[#b8860b]/40 dark:border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl text-[#1a1612] dark:text-amber-100 max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-[#f4ebd0] dark:bg-emerald-950/80 border border-[#b8860b]/40 dark:border-amber-400/50 text-[#8c1d1e] dark:text-amber-200 rounded-full hover:bg-[#8c1d1e] hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-amber-500/20 border border-emerald-500 dark:border-amber-400 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-amber-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#8c1d1e] dark:text-amber-300">
              VIP Appointment Reserved
            </h3>
            <p className="text-sm text-[#5c5244] dark:text-amber-100/80 max-w-md mx-auto leading-relaxed">
              Namaste {form.fullName}! Your personal jewellery consultation at Sanjay Jewellers Sariya has been confirmed for {form.date}. Our gemologist will reach out on WhatsApp ({form.phone}).
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="gold-shimmer-btn text-white dark:text-emerald-950 font-bold text-xs uppercase px-8 py-3 rounded-full"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ebd0] dark:bg-amber-500/10 border border-[#b8860b]/30 dark:border-amber-500/30 text-[#8c1d1e] dark:text-amber-300 text-[10px] font-sans font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Consultation</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#1a1612] dark:text-amber-100">
                {t.title}
              </h2>
              <p className="text-xs text-[#5c5244] dark:text-amber-200/70">
                {t.subtitle}
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-bold text-[#1a1612] dark:text-amber-200 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#b8860b] dark:text-amber-400" />
                  <span>{t.fullName}</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Maharani Gayatri Devi"
                  className="w-full bg-[#faf6ee] dark:bg-[#02120d] border border-[#e6dac1] dark:border-amber-500/30 rounded-xl px-4 py-2.5 text-[#1a1612] dark:text-amber-100 focus:outline-none focus:border-[#b8860b]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#1a1612] dark:text-amber-200 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#b8860b] dark:text-amber-400" />
                  <span>{t.phone}</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 9800000000"
                  className="w-full bg-[#faf6ee] dark:bg-[#02120d] border border-[#e6dac1] dark:border-amber-500/30 rounded-xl px-4 py-2.5 text-[#1a1612] dark:text-amber-100 focus:outline-none focus:border-[#b8860b]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#1a1612] dark:text-amber-200 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#b8860b] dark:text-amber-400" />
                  <span>{t.email}</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@royal.com"
                  className="w-full bg-[#faf6ee] dark:bg-[#02120d] border border-[#e6dac1] dark:border-amber-500/30 rounded-xl px-4 py-2.5 text-[#1a1612] dark:text-amber-100 focus:outline-none focus:border-[#b8860b]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#1a1612] dark:text-amber-200 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#b8860b] dark:text-amber-400" />
                  <span>{t.city}</span>
                </label>
                <select
                  value={form.preferredCity}
                  onChange={(e) => setForm({ ...form, preferredCity: e.target.value })}
                  className="w-full bg-[#faf6ee] dark:bg-[#02120d] border border-[#e6dac1] dark:border-amber-500/30 rounded-xl px-4 py-2.5 text-[#1a1612] dark:text-amber-100 focus:outline-none focus:border-[#b8860b]"
                >
                  <option value="Sariya Showroom">Sariya Main Boutique</option>
                  <option value="Bhubaneswar">Bhubaneswar Private Suite</option>
                  <option value="Raigarh">Raigarh / Bilaspur</option>
                  <option value="Home Trial">VIP Doorstep Home Trial</option>
                </select>
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full gold-shimmer-btn text-white dark:text-emerald-950 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.confirmBtn}</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
