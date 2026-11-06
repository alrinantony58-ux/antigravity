'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { X, Star, ShoppingBag, ShieldCheck, Check, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentColor =
    selectedColor ||
    (quickViewProduct.colors && quickViewProduct.colors.length > 0
      ? quickViewProduct.colors[0].name
      : 'Default');

  const handleAdd = () => {
    addItem(quickViewProduct, quantity, currentColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          onClick={() => setQuickViewProduct(null)}
        />

        {/* Modal Window */}
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-slate-200">
          
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Image Container */}
            <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-slate-100 overflow-hidden">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
              {quickViewProduct.badge && (
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-700 text-white shadow-md">
                    {quickViewProduct.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                    {quickViewProduct.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-800 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{quickViewProduct.rating}</span>
                    <span className="text-slate-400">({quickViewProduct.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
                  {quickViewProduct.name}
                </h2>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save ${quickViewProduct.originalPrice - quickViewProduct.price}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Color Variants */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      Selected Finish: <span className="text-blue-700">{currentColor}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border transition-all ${
                            currentColor === c.name
                              ? 'ring-2 ring-blue-600 ring-offset-2 scale-110'
                              : 'border-slate-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Specifications */}
                {quickViewProduct.specs && (
                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Specifications & Details
                    </h4>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-xs">
                      {Object.entries(quickViewProduct.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-0.5 border-b border-slate-50">
                          <dt className="text-slate-500">{key}</dt>
                          <dd className="font-semibold text-slate-800 text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              {/* Action Stepper & Add to Bag */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-slate-600 hover:text-blue-700 hover:bg-slate-200 transition-colors font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-800 font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-slate-600 hover:text-blue-700 hover:bg-slate-200 transition-colors font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs tracking-wide uppercase transition-all shadow-royal-sm flex items-center justify-center gap-2 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-700 hover:bg-blue-800 text-white hover:shadow-royal-md'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add ${quickViewProduct.price * quantity} to Bag</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    Ships in 24 hours
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    3-Year Atelier Warranty
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

