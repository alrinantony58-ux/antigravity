'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeItem: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  discount: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 150;
const FLAT_SHIPPING = 15;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from localStorage safely on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('royal_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        // Seed initial demo items to immediately showcase cart space nicely
        setItems([
          {
            product: {
              id: 'prod-1',
              name: 'Cobalt Horizon Automatic Chronograph',
              tagline: 'Swiss automatic movement with sunburst royal blue dial',
              category: 'Timepieces',
              badge: 'Royal Pick',
              price: 489,
              originalPrice: 599,
              rating: 4.9,
              reviewsCount: 142,
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
              colors: [{ name: 'Royal Blue Dial', hex: '#1d4ed8' }],
              inStock: true,
              description: 'Precision-engineered with 26-jewel automatic mechanical caliber.',
              specs: { Movement: 'Automatic Mechanical' },
            },
            quantity: 1,
            selectedColor: 'Royal Blue Dial',
          },
          {
            product: {
              id: 'prod-4',
              name: 'Cobalt Pro Wireless Mechanical Keyboard',
              tagline: 'Hot-swappable custom tactile switches',
              category: 'Tech',
              badge: 'New',
              price: 185,
              originalPrice: 220,
              rating: 4.7,
              reviewsCount: 114,
              image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
              colors: [{ name: 'Royal Blue & Cream', hex: '#2563eb' }],
              inStock: true,
              description: 'CNC-milled aerospace aluminum chassis with PBT dye-sublimated accents.',
              specs: { Layout: '75% Compact' },
            },
            quantity: 1,
            selectedColor: 'Royal Blue & Cream',
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('royal_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addItem = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    showToast(`Added "${product.name}" to your bag`);
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, selectedColor?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && (!selectedColor || i.selectedColor === selectedColor))
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeItem(productId, selectedColor);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id === productId && (!selectedColor || i.selectedColor === selectedColor)) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ROYAL20') {
      setAppliedPromo('ROYAL20');
      setDiscountPercent(0.20);
      showToast('20% Royal VIP Discount Applied!');
      return { success: true, message: 'ROYAL20 applied (-20%)' };
    } else if (clean === 'BLUE10') {
      setAppliedPromo('BLUE10');
      setDiscountPercent(0.10);
      showToast('10% Welcome Discount Applied!');
      return { success: true, message: 'BLUE10 applied (-10%)' };
    }
    return { success: false, message: 'Invalid code. Try "ROYAL20" or "BLUE10"' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        shipping,
        discount,
        appliedPromo,
        applyPromo,
        removePromo,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

