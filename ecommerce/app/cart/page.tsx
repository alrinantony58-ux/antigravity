'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  ArrowLeft,
  Truck,
  CheckCircle2,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
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

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Boutique</span>
          </Link>
        </div>

        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              Your Shopping Bag
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review and finalize your curated acquisitions.
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-rose-600 hover:underline font-semibold"
            >
              Clear Entire Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-royal-sm">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Your bag is presently empty
            </h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Discover our signature automatic timepieces, spatial acoustic speakers, and luxury lifestyle pieces.
            </p>
            <Link
              href="/"
              className="px-8 py-3.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow-royal-md transition-all inline-block"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
            
            {/* Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Shipping Meter */}
              <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  {subtotal >= FREE_SHIPPING_GOAL ? (
                    <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Complimentary White-Glove Shipping Unlocked!
                    </span>
                  ) : (
                    <span className="text-blue-950 font-medium">
                      Add <span className="font-extrabold text-blue-700">${amountNeeded}</span> more for Free Royal Delivery
                    </span>
                  )}
                  <span className="text-blue-700 font-mono font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-blue-200/60 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-700 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover bg-slate-100 border border-slate-100"
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                          {item.product.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.product.name}
                        </h3>
                        {item.selectedColor && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            Finish: <span className="text-slate-800 font-medium">{item.selectedColor}</span>
                          </p>
                        )}
                        <span className="text-xs font-bold text-slate-700 font-mono mt-1 block">
                          ${item.product.price} each
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor
                            )
                          }
                          className="px-2.5 py-1 text-slate-600 hover:text-blue-700 hover:bg-slate-200"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-900 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor
                            )
                          }
                          className="px-2.5 py-1 text-slate-600 hover:text-blue-700 hover:bg-slate-200"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <span className="text-base font-extrabold text-slate-900 font-mono min-w-[70px] text-right">
                        ${item.product.price * item.quantity}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                <h2 className="text-base font-bold text-slate-900 font-sans border-b border-slate-100 pb-3">
                  Order Summary
                </h2>

                {/* Promo Code Form */}
                <div>
                  {!appliedPromo ? (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Promo code (ROYAL20)"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value);
                            setPromoError(null);
                          }}
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium uppercase"
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
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code &apos;{appliedPromo}&apos; active</span>
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
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 font-mono">${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Royal Privilege Discount</span>
                      <span className="font-mono">-${discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Delivery</span>
                    <span className="font-semibold text-slate-900 font-mono">
                      {shipping === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-100">
                    <span>Estimated Total</span>
                    <span className="font-mono text-blue-700 text-xl">${finalTotal}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-royal-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Royal Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Encrypted 256-Bit Sovereign Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

