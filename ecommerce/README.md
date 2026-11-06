# 👑 ROYAL COBALT — Modern Luxury Next.js E-Commerce

A modern, high-performance luxury e-commerce web application engineered with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed in a signature **Royal Blue** aesthetic with refined typography and micro-interactions.

---

## ✨ Features & Architecture

### 1. Modern Sticky Navigation Bar (`components/Navbar.tsx`)
- **Signature Monogram & Typography**: Modern sans-serif branding ("ROYAL COBALT Atelier & Maison")
- **Category Navigation**: Instant category switching (All, Timepieces, Audio & Acoustics, Luxury Tech, Apparel, Accessories)
- **Live Search**: Instant keyword filtering across titles, descriptions, and tags
- **Action Suite**: Wishlist heart counter with badge, currency indicator, and shopping bag trigger
- **Cart Badge**: Real-time numerical counter that updates automatically whenever items are added or removed
- **Responsive Mobile Drawer**: Optimized hamburger navigation for mobile and tablet devices

### 2. Comprehensive Listing Space (`components/ProductGrid.tsx` & `ProductCard.tsx`)
- **Curated Masterpiece Catalog**: 12 luxury products across horology, studio audio, titanium accessories, and cashmere
- **Refined Typography**: Clear hierarchical pairing with high-contrast tabular pricing numerals
- **Status Badges**: "Royal Pick", "Bestseller", "New", and "Limited Edition" tags
- **Interactive Product Cards**:
  - Zoom-on-hover imagery
  - Interactive color variant swatches
  - Star ratings with review counts
  - Instant "Quick View" modal preview
  - Wishlist toggle
  - One-click "Add to Bag" with visual confirmation
- **Filter & Sort Bar (`components/FilterBar.tsx`)**:
  - Filter by category pills
  - Sort by Featured, Price (Low to High), Price (High to Low), Highest Rating, New Arrivals
  - Active filter reset with result count tracking

### 3. Dedicated Cart Space (`components/CartDrawer.tsx` & `app/cart/page.tsx`)
- **Dual Cart Modes**:
  1. **Slide-over Cart Drawer**: Accessible instantly from anywhere on the boutique
  2. **Dedicated Cart Page (`/cart`)**: Full-screen overview for reviewing large orders
- **Dynamic Free Shipping Meter**: Real-time progress bar tracking orders towards the complimentary $150 shipping threshold
- **Granular Controls**: Increase, decrease, or remove item variants with instant price updates
- **Promo Code Engine**: Test codes like `ROYAL20` (-20%) and `BLUE10` (-10%)
- **Financial Breakdown**: Subtotal, Applied Royal Discounts, Express White-Glove Shipping, and Total
- **Checkout Modal (`components/CheckoutModal.tsx`)**:
  - 256-bit SSL simulated checkout flow
  - Shipping address and payment forms
  - Order confirmation screen with generated order reference (e.g. `RC-839102`)

---

## 🎨 Color Palette & Typography

| Token | Hex | Role |
|---|---|---|
| `royal-brand` | `#1d4ed8` | Signature Royal Blue |
| `royal-accent` | `#2563eb` | Electric Cobalt Accent & Buttons |
| `royal-deep` | `#1e3a8a` | Deep Royal Navy for Badges & Gradients |
| `royal-dark` | `#0f172a` | Midnight Slate for Headers & Contrast |
| `royal-light` | `#eff6ff` | Ice Blue Soft Backgrounds |
| `gold-accent` | `#fbbf24` | Star Ratings & Limited Edition Accents |

- **Primary Font**: **Plus Jakarta Sans** (Google Fonts)
- **Tabular Figures**: Font-mono for prices and checkout calculations

---

## 🚀 Getting Started

When you have Node.js installed on your machine:

```bash
# 1. Navigate to the project directory
cd ecommerce

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

---

## 📁 File Structure

```
ecommerce/
├── app/
│   ├── cart/
│   │   └── page.tsx         # Dedicated Full-Page Cart Space
│   ├── globals.css          # Design system, royal blue scrollbar & utilities
│   ├── layout.tsx           # Root layout with CartProvider & font configuration
│   └── page.tsx             # Main page (Hero, FilterBar, ProductGrid)
├── components/
│   ├── CartDrawer.tsx       # Slide-over Royal Blue Cart Space
│   ├── CheckoutModal.tsx    # Interactive checkout & confirmation modal
│   ├── FilterBar.tsx        # Category selector, sort, and search controls
│   ├── Footer.tsx           # Royal Cobalt newsletter, links & guarantees
│   ├── HeroBanner.tsx       # Sovereign Edition hero showcase
│   ├── Navbar.tsx           # Modern sticky royal blue navigation bar
│   ├── ProductCard.tsx      # Interactive product card with swatches & add-to-bag
│   ├── ProductGrid.tsx      # Responsive catalog listing space
│   ├── QuickViewModal.tsx   # Detailed product preview modal
│   └── Toast.tsx            # Floating toast notifications
├── lib/
│   ├── cart-context.tsx     # React Context for cart state & promo codes
│   └── products.ts          # Curated luxury products database
├── types/
│   └── index.ts             # TypeScript definitions (Product, CartItem, SortOption)
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS theme extension
└── tsconfig.json            # TypeScript configuration
```

