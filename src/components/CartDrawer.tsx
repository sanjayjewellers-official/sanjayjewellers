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
    if (voucherCode.trim().toUpperCase() === 'SWARNA1000') {
      setVoucherDiscount(1000);
      setVoucherError('');
    } else {
      setVoucherError('Invalid Voucher Code. Use SWARNA1000');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckoutSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#05110d] border-l border-[#d4af37]/30 h-full flex flex-col shadow-2xl relative text-[#f7e7ce]">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#030a08]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-serif font-light text-lg text-[#f7e7ce]">
              {t.title}
            </h3>
            <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] font-mono px-2 py-0.5 border border-[#d4af37]/30">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#d4af37] hover:text-[#f7e7ce] hover:bg-[#d4af37]/10"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isCheckoutSuccess ? (
          <div className="p-8 text-center my-auto space-y-4">
            <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37] animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif font-light text-[#f7e7ce]">
              Royal Order Reserved!
            </h4>
            <p className="text-xs text-[#f7e7ce]/70 font-sans font-light leading-relaxed">
              Your order allocation has been secured at Swarna Mahal. Our senior concierge will connect via phone/WhatsApp to arrange insured delivery or boutique pickup.
            </p>
            <button
              onClick={() => {
                setIsCheckoutSuccess(false);
                onClose();
              }}
              className="bg-[#d4af37] text-[#05110d] hover:bg-[#f7e7ce] font-sans font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors shadow-lg"
            >
              Continue Exploring
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="p-12 text-center my-auto space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#d4af37]/30 mx-auto" />
            <p className="text-sm font-serif text-[#f7e7ce]/60">{t.empty}</p>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-[#0b2239] border border-[#d4af37]/20 p-3 flex gap-3 items-center shadow-md"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name[currentLang]}
                    className="w-16 h-16 object-cover border border-[#d4af37]/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-serif font-light text-[#f7e7ce] truncate">
                      {item.product.name[currentLang]}
                    </h4>
                    <span className="text-[10px] text-[#d4af37] font-mono block">
                      {item.product.purity} • {item.product.goldWeightGrams}g
                    </span>
                    <span className="text-sm font-serif font-light text-[#f7e7ce] block">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#d4af37]/50 hover:text-rose-400 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center border border-[#d4af37]/30 bg-[#05110d] px-1.5 py-0.5 text-xs font-mono">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-1 text-[#d4af37] hover:text-[#f7e7ce]"
                      >
                        -
                      </button>
                      <span className="px-2 text-[#f7e7ce]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-1 text-[#d4af37] hover:text-[#f7e7ce]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary & Checkout */}
            <div className="p-5 border-t border-[#d4af37]/20 bg-[#030a08] space-y-4">
              
              {/* Voucher Box */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t.voucherPlaceholder}
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1 bg-[#05110d] border border-[#d4af37]/30 text-xs px-3 py-2 text-[#f7e7ce] focus:outline-none focus:border-[#d4af37] uppercase font-mono"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#05110d] font-sans font-bold text-xs uppercase tracking-wider px-3 py-2 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {voucherDiscount > 0 && (
                  <span className="text-[10px] text-emerald-400 font-sans font-semibold block">
                    ✓ {t.discountApplied} (-₹1,000)
                  </span>
                )}
                {voucherError && (
                  <span className="text-[10px] text-rose-400 block">{voucherError}</span>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#f7e7ce]/80 border-t border-[#d4af37]/10 pt-3 font-sans">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Royal Voucher Discount:</span>
                    <span className="font-mono">-₹1,000</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#f7e7ce] border-t border-[#d4af37]/20 pt-2">
                  <span>{t.total}</span>
                  <span className="font-serif font-light text-lg text-[#f7e7ce]">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSimulateCheckout}
                className="w-full bg-[#d4af37] text-[#05110d] hover:bg-[#f7e7ce] font-sans font-bold text-xs uppercase tracking-widest py-3.5 transition-colors shadow-xl flex items-center justify-center gap-2"
              >
                <span>{t.checkout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#d4af37]/80 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Insured Doorstep Express Delivery Included</span>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};
