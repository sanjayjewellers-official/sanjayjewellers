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
    preferredCity: 'Bhubaneswar',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#041d15] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl text-amber-100 max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-emerald-950/80 border border-amber-400/50 text-amber-200 rounded-full hover:bg-amber-400 hover:text-emerald-950 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-400 rounded-full flex items-center justify-center mx-auto text-amber-300 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gold-gradient">
              VIP Appointment Reserved
            </h3>
            <p className="text-sm text-amber-100/80 max-w-md mx-auto leading-relaxed">
              {t.successMsg}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="gold-shimmer-btn text-emerald-950 font-bold text-xs uppercase px-8 py-3 rounded-full shadow-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Swarna Mahal Royal Concierge</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient">
                {t.title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/70 font-light">
                {t.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs text-amber-200 font-semibold block">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Radhika Verma"
                    className="w-full bg-[#02120d] border border-amber-500/30 text-amber-100 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs text-amber-200 font-semibold block">
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#02120d] border border-amber-500/30 text-amber-100 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs text-amber-200 font-semibold block">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@royal.com"
                    className="w-full bg-[#02120d] border border-amber-500/30 text-amber-100 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Boutique City */}
                <div className="space-y-1">
                  <label className="text-xs text-amber-200 font-semibold block">
                    {t.city}
                  </label>
                  <select
                    value={form.preferredCity}
                    onChange={(e) => setForm({ ...form, preferredCity: e.target.value })}
                    className="w-full bg-[#02120d] border border-amber-500/30 text-amber-100 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                  >
                    <option value="Bhubaneswar">Bhubaneswar Flagship</option>
                    <option value="Mumbai">Mumbai Opera House Boutique</option>
                    <option value="Delhi">Delhi South Extension Boutique</option>
                    <option value="Jaipur">Jaipur Johari Bazaar Palace</option>
                    <option value="Hyderabad">Hyderabad Jubilee Hills Salon</option>
                  </select>
                </div>

              </div>

              {/* Service Type Selection */}
              <div className="space-y-1">
                <label className="text-xs text-amber-200 font-semibold block">
                  {t.serviceType}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'store_visit', label: t.typeStore },
                    { id: 'home_trial', label: t.typeHome },
                    { id: 'video_call', label: t.typeVideo },
                  ].map((srv) => (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => setForm({ ...form, serviceType: srv.id as any })}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                        form.serviceType === srv.id
                          ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md font-bold'
                          : 'bg-[#02120d] text-amber-200 border-amber-500/30 hover:border-amber-400'
                      }`}
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-amber-200 font-semibold block">
                    {t.date}
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-[#02120d] border border-amber-500/30 text-amber-100 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-amber-200 font-semibold block">
                    {t.timeSlot}
                  </label>
                  <select
                    value={form.timeSlot}
                    onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                    className="w-full bg-[#02120d] border border-amber-500/30 text-amber-100 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                  >
                    <option value="11:00 AM - 01:00 PM">Morning (11:00 AM - 01:00 PM)</option>
                    <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
                    <option value="06:00 PM - 09:00 PM">Evening (06:00 PM - 09:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1">
                <label className="text-xs text-amber-200 font-semibold block">
                  {t.notes}
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Interested in Kundan bridal chokers above 50 grams..."
                  className="w-full bg-[#02120d] border border-amber-500/30 text-amber-100 text-xs p-3 rounded-xl focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full gold-shimmer-btn text-emerald-950 font-bold text-xs uppercase py-3.5 rounded-full shadow-xl"
              >
                {t.submitBtn}
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
};
