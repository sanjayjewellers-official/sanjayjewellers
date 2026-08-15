import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';
import { CartItem, Language } from '../types';
import { translations } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  currentLang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currentLang,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLang].cart;
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState('');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalDiscount = voucherDiscount;
  const grandTotal = Math.max(0, subtotal - totalDiscount);

  const handleApplyVoucher = () => {
    if (voucherCode.trim().toUpperCase() === 'SANJAY1000') {
      setVoucherDiscount(1000);
      setVoucherError('');
    } else {
      setVoucherError('Invalid Voucher Code. Try SANJAY1000');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckoutSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-[#05110d] border-l-2 border-[#b8860b]/40 dark:border-[#d4af37]/30 h-full flex flex-col shadow-2xl relative text-[#1a1612] dark:text-[#f7e7ce]">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#e6dac1] dark:border-[#d4af37]/20 flex items-center justify-between bg-[#faf6ee] dark:bg-[#030a08]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#b8860b] dark:text-[#d4af37]" />
            <h3 className="font-serif font-bold text-lg text-[#1a1612] dark:text-[#f7e7ce]">
              {t.title}
            </h3>
            <span className="text-xs bg-[#b8860b]/15 dark:bg-[#d4af37]/20 text-[#8c1d1e] dark:text-[#d4af37] font-mono font-bold px-2 py-0.5 rounded-full border border-[#b8860b]/30">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5c5244] dark:text-[#d4af37] hover:text-[#8c1d1e] dark:hover:text-[#f7e7ce] rounded-full hover:bg-black/5"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Cart Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isCheckoutSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                VIP Order Request Received!
              </h4>
              <p className="text-xs text-[#5c5244] dark:text-[#f7e7ce]/70 leading-relaxed max-w-xs mx-auto">
                Thank you for selecting Sanjay Jewellers Sariya. Our master jeweler will contact you via WhatsApp for hallmarking verification.
              </p>
              <button
                onClick={() => {
                  setIsCheckoutSuccess(false);
                  onClose();
                }}
                className="gold-shimmer-btn text-white dark:text-[#05110d] font-bold text-xs uppercase px-6 py-2.5 rounded-xl"
              >
                Continue Exploring
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#f4ebd0] dark:bg-[#d4af37]/10 flex items-center justify-center mx-auto text-[#b8860b] dark:text-[#d4af37]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-serif text-[#1a1612] dark:text-[#f7e7ce]">
                {t.empty}
              </p>
              <button
                onClick={onClose}
                className="text-xs text-[#b8860b] dark:text-[#d4af37] font-bold hover:underline uppercase tracking-wider"
              >
                {t.continueShopping} →
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3.5 bg-[#faf6ee] dark:bg-[#0b2239]/50 border border-[#e6dac1] dark:border-[#d4af37]/20 rounded-2xl shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name[currentLang]}
                  className="w-20 h-20 object-cover rounded-xl border border-[#e6dac1] dark:border-[#d4af37]/20"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-serif font-bold text-[#1a1612] dark:text-[#f7e7ce] line-clamp-1">
                      {item.product.name[currentLang]}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#5c5244] hover:text-rose-500 p-1"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] text-[#8c1d1e] dark:text-[#d4af37] font-mono block font-bold">
                    {item.product.purity} • {item.product.goldWeightGrams > 0 ? `${item.product.goldWeightGrams}g` : 'Silver'}
                  </span>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs font-mono font-bold text-[#8c1d1e] dark:text-[#d4af37]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    <div className="flex items-center border border-[#e6dac1] dark:border-[#d4af37]/30 rounded-lg bg-white dark:bg-[#05110d]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#5c5244] dark:text-[#d4af37] hover:bg-black/5"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#5c5244] dark:text-[#d4af37] hover:bg-black/5"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Totals & Checkout */}
        {cartItems.length > 0 && !isCheckoutSuccess && (
          <div className="p-5 border-t border-[#e6dac1] dark:border-[#d4af37]/20 bg-[#faf6ee] dark:bg-[#030a08] space-y-4">
            
            {/* Voucher input */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Voucher (e.g. SANJAY1000)"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="w-full bg-white dark:bg-[#05110d] border border-[#e6dac1] dark:border-[#d4af37]/40 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#1a1612] dark:text-[#f7e7ce] uppercase font-mono focus:outline-none focus:border-[#b8860b]"
                  />
                </div>
                <button
                  onClick={handleApplyVoucher}
                  className="bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#05110d] px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans uppercase"
                >
                  Apply
                </button>
              </div>
              {voucherError && <span className="text-[10px] text-rose-500 font-mono block">{voucherError}</span>}
              {voucherDiscount > 0 && (
                <span className="text-[10px] text-emerald-600 font-mono font-bold block">
                  ✓ ₹{voucherDiscount} Royal Privilege Discount Applied!
                </span>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs font-sans text-[#5c5244] dark:text-[#f7e7ce]/80 pt-1">
              <div className="flex justify-between">
                <span>{t.subtotal}:</span>
                <span className="font-mono font-bold text-[#1a1612] dark:text-[#f7e7ce]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {voucherDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Voucher Discount:</span>
                  <span className="font-mono">-₹{voucherDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#e6dac1] dark:border-[#d4af37]/20 pt-2 text-sm font-bold text-[#1a1612] dark:text-[#f7e7ce]">
                <span>{t.grandTotal}:</span>
                <span className="font-mono text-base text-[#8c1d1e] dark:text-[#d4af37]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleSimulateCheckout}
              className="w-full gold-shimmer-btn text-white dark:text-[#05110d] font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <span>{t.checkout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#5c5244] dark:text-[#f7e7ce]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#d4af37]" />
              <span>100% Insured Delivery & Store Pickup in Sariya</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
