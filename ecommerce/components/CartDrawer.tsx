'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    totalItems,
    subtotal,
    shipping,
    discount,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_GOAL = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_GOAL) * 100));
  const amountNeeded = Math.max(0, FREE_SHIPPING_GOAL - subtotal);
  const finalTotal = Math.max(0, subtotal - discount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError(null);
      setPromoInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-in-right border-l border-slate-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 font-sans tracking-tight">
                    Shopping Bag
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {totalItems} {totalItems === 1 ? 'creation' : 'creations'} selected
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="mt-4 p-3 bg-blue-50/70 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                {subtotal >= FREE_SHIPPING_GOAL ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Complimentary Express Shipping Unlocked!
                  </span>
                ) : (
                  <span className="text-blue-900">
                    Add <span className="font-extrabold text-blue-700">${amountNeeded}</span> more for Free Express Delivery
                  </span>
                )}
                <span className="text-blue-700 font-mono text-[11px] font-bold">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Explore our royal collection of timepieces, studio audio, and luxury lifestyle pieces.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider shadow-royal-sm transition-all"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-4 p-3.5 rounded-xl border border-slate-200/90 hover:border-blue-200 bg-white transition-all shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.selectedColor)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                          Variant: {item.selectedColor}
                        </p>
                      )}
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor
                            )
                          }
                          className="px-2 py-1 text-slate-600 hover:text-blue-700 hover:bg-slate-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor
                            )
                          }
                          className="px-2 py-1 text-slate-600 hover:text-blue-700 hover:bg-slate-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900 font-mono">
                          ${item.product.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-slate-400 block font-mono">
                            ${item.product.price} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. ROYAL20)"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError(null);
                        }}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Coupon &apos;{appliedPromo}&apos; active</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{promoError}</p>
                )}
                {!appliedPromo && (
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                    <span>Try:</span>
                    <button
                      type="button"
                      onClick={() => setPromoInput('ROYAL20')}
                      className="text-blue-700 font-bold hover:underline"
                    >
                      ROYAL20 (-20%)
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setPromoInput('BLUE10')}
                      className="text-blue-700 font-bold hover:underline"
                    >
                      BLUE10 (-10%)
                    </button>
                  </div>
                )}
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-slate-900 font-mono">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Royal Privilege Discount</span>
                    <span className="font-mono">-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express White-Glove Shipping</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {shipping === 0 ? (
                      <span className="text-emerald-700 uppercase font-bold text-[11px]">Free</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="font-mono text-blue-700 text-lg">${finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold text-sm tracking-wide uppercase shadow-royal-md hover:shadow-royal-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>Proceed to Royal Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-medium">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <span>•</span>
                <span>Complimentary Signature Box</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

