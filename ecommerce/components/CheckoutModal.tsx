'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { X, CheckCircle2, ShieldCheck, Lock, Sparkles, ArrowRight } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    subtotal,
    discount,
    shipping,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: 'Lord Arthur Vance',
    email: 'arthur.vance@maison.com',
    address: '42 Belgrave Square, Royal Row',
    city: 'London',
    postalCode: 'SW1X 8PG',
    cardNumber: '•••• •••• •••• 9284',
    expiry: '12/28',
    cvv: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const total = Math.max(0, subtotal - discount + shipping);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`RC-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        />

        {/* Modal Content */}
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-slate-200">
          
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-slate-100 p-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {orderConfirmed ? (
            /* Order Confirmation View */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto border-2 border-blue-200 shadow-royal-md animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-blue-700" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Transaction Verified
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                  Thank You for Your Patronage
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your acquisition has been confirmed under order reference{' '}
                  <span className="font-mono font-bold text-blue-700">{orderId}</span>. Our concierge team is preparing your bespoke packaging.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-800">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Confirmation Sent To:</span>
                  <span className="font-semibold text-slate-800">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-semibold text-blue-700">Next Business Day (Express)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="px-8 py-3.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow-royal-md transition-all cursor-pointer"
              >
                Return to Royal Collection
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-widest mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure 256-Bit Encrypted Checkout</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-sans">
                  Royal Dispatch & Payment
                </h3>
              </div>

              {/* Order Quick Summary */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">
                    Order Total ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
                  </p>
                  <p className="text-slate-500">Including complimentary express courier</p>
                </div>
                <span className="text-xl font-black text-blue-800 font-mono">
                  ${total}
                </span>
              </div>

              {/* Shipping Address Inputs */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  White-Glove Shipping Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Concierge Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Street Address & Suite
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Payment Method
                </h4>

                <div className="p-3 border border-blue-200 rounded-xl bg-blue-50/30 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Security Code (CVV)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-800 hover:to-blue-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-royal-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing Sovereign Transaction...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm Order of ${total}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Protected by Royal Cobalt Buyer Guarantee & Authenticity Seal</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

