import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { Toast } from '@/components/Toast';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'ROYAL COBALT | Modern Luxury E-Commerce Atelier',
  description:
    'Curated objects of distinction. Automatic Swiss timepieces, spatial acoustic sound, and modern essentials in signature Royal Cobalt blue.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <CartProvider>
          {children}
          <CartDrawer />
          <QuickViewModal />
          <CheckoutModal />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}

