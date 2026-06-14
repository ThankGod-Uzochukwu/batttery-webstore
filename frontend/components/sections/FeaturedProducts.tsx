'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockFeaturedProducts, formatPrice, type Product } from '@/lib/mock-data';

// ============================================
// BRAND COLORS — change these to update theme
// ============================================
const colors = {
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  bgLight: '#F9FAFB',
  badgeSale: '#EF4444',
  badgeNew: '#3B82F6',
  badgeBestSeller: '#F59E0B',
  badgeHot: '#EF4444',
};

// ─────────────────────────────────────────
// STAR RATING
// ─────────────────────────────────────────
const StarRating = ({ rating, count }: { rating: number; count: number }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={star <= Math.round(rating) ? colors.badgeBestSeller : 'none'}
            stroke={colors.badgeBestSeller}
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span className="text-xs" style={{ color: colors.textMuted }}>
        ({count})
      </span>
    </div>
  );
};

// ─────────────────────────────────────────
// PRODUCT BADGE
// ─────────────────────────────────────────
const ProductBadge = ({ badge }: { badge: Product['badge'] }) => {
  if (!badge) return null;

  const badgeConfig = {
    sale: { label: 'Sale', bg: colors.badgeSale },
    new: { label: 'New', bg: colors.badgeNew },
    'best-seller': { label: 'Best Seller', bg: colors.badgeBestSeller },
    hot: { label: 'Hot', bg: colors.badgeHot },
  };

  const config = badgeConfig[badge];

  return (
    <span
      className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-xs font-bold"
      style={{ backgroundColor: config.bg, color: colors.white }}
    >
      {config.label}
    </span>
  );
};

// ─────────────────────────────────────────
// IMAGE PLACEHOLDER
// ─────────────────────────────────────────
const ImagePlaceholder = ({ name }: { name: string }) => (
  <div
    className="w-full h-full flex flex-col items-center justify-center gap-2"
    style={{ backgroundColor: colors.bgLight }}
  >
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={colors.border} strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke={colors.textMuted} strokeWidth="1.5" />
      <path
        d="M21 15l-5-5L5 21"
        stroke={colors.textMuted}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="text-xs text-center px-2" style={{ color: colors.textMuted }}>
      {name}
    </span>
  </div>
);

// ─────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────
const ProductCard = ({ product }: { product: Product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)')
      }
    >
      {/* Image container */}
      <div className="relative overflow-hidden" style={{ height: '180px' }}>
        <ProductBadge badge={product.badge} />

        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: colors.white,
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          }}
          aria-label="Add to wishlist"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={isWishlisted ? colors.badgeSale : 'none'}
            stroke={isWishlisted ? colors.badgeSale : colors.textMuted}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Product image / placeholder */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <ImagePlaceholder name={product.name} />
        </Link>
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        {/* Category */}
        <span
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: colors.primary }}
        >
          {product.category.replace(/-/g, ' ')}
        </span>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3
            className="text-sm font-semibold leading-snug line-clamp-2 transition-colors duration-150"
            style={{ color: colors.secondary }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = colors.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = colors.secondary)}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price row */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-base font-black" style={{ color: colors.secondary }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs line-through" style={{ color: colors.textMuted }}>
                {formatPrice(product.originalPrice)}
              </span>
              {discount && (
                <span className="text-xs font-bold" style={{ color: colors.badgeSale }}>
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2 rounded-md text-xs font-bold transition-all duration-200 mt-1"
          style={{
            backgroundColor: addedToCart ? colors.primaryHover : colors.primary,
            color: colors.white,
          }}
        >
          {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────
const SectionHeader = ({ title, viewAllHref }: { title: string; viewAllHref: string }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex flex-col gap-1">
      <h2 className="text-xl md:text-2xl font-black" style={{ color: colors.secondary }}>
        {title}
      </h2>
      <div className="w-10 h-1 rounded-full" style={{ backgroundColor: colors.primary }} />
    </div>
    <Link
      href={viewAllHref}
      className="flex items-center gap-1 text-sm font-semibold transition-colors duration-150"
      style={{ color: colors.primary }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = colors.primaryHover)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = colors.primary)}
    >
      Browse all categories
      <svg
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  </div>
);

// ─────────────────────────────────────────
// FEATURED PRODUCTS SECTION
// ─────────────────────────────────────────
interface FeaturedProductsProps {
  className?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ className = '' }) => {
  return (
    <section className={`w-full py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Featured Products" viewAllHref="/products" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mockFeaturedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

// --- USAGE ---
// import FeaturedProducts from "@/components/sections/FeaturedProducts"
// <FeaturedProducts />
