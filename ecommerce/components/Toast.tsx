'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-blue-500/40 backdrop-blur-md">
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-semibold">{toastMessage}</span>
      </div>
    </div>
  );
};

