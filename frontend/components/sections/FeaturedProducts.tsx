'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockFeaturedProducts, formatPrice, type Product } from '@/lib/mock-data';

const colors = {
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  border: '#E5E7EB',
  bgLight: '#F9FAFB',
  textMuted: '#6B7280',
  badgeSale: '#EF4444',
  badgeNew: '#3B82F6',
  badgeBest: '#F59E0B',
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill={s <= Math.round(rating) ? colors.badgeBest : 'none'}
        stroke={colors.badgeBest}
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const badgeColors: Record<string, string> = {
    sale: colors.badgeSale,
    new: colors.badgeNew,
    'best-seller': colors.badgeBest,
    hot: colors.badgeSale,
  };

  return (
    <div
      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)')
      }
    >
      {/* Image */}
      <div className="relative" style={{ height: '180px', backgroundColor: colors.bgLight }}>
        {product.badge && (
          <span
            className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-xs font-bold"
            style={{ backgroundColor: badgeColors[product.badge], color: colors.white }}
          >
            {product.badge.replace(/-/g, ' ')}
          </span>
        )}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.white, boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill={wishlisted ? colors.badgeSale : 'none'}
            stroke={wishlisted ? colors.badgeSale : colors.textMuted}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
        <Link
          href={`/products/${product.slug}`}
          className="flex items-center justify-center w-full h-full"
        >
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke={colors.border}
              strokeWidth="1.5"
            />
            <circle cx="8.5" cy="8.5" r="1.5" stroke={colors.textMuted} strokeWidth="1.5" />
            <path
              d="M21 15l-5-5L5 21"
              stroke={colors.textMuted}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: colors.primary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {product.category.replace(/-/g, ' ')}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: colors.secondary,
              lineHeight: 1.4,
              margin: 0,
            }}
            className="line-clamp-2"
          >
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} />
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontSize: '14px', fontWeight: 900, color: colors.secondary }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span
              style={{ fontSize: '11px', textDecoration: 'line-through', color: colors.textMuted }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discount && (
            <span style={{ fontSize: '11px', fontWeight: 700, color: colors.badgeSale }}>
              -{discount}%
            </span>
          )}
        </div>
        <button
          onClick={() => {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className="w-full rounded-md font-bold text-xs transition-all duration-200 mt-auto"
          style={{
            padding: '8px',
            backgroundColor: added ? colors.primaryHover : colors.primary,
            color: colors.white,
          }}
        >
          {added ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC = () => (
  <section style={{ backgroundColor: colors.white, paddingTop: '48px', paddingBottom: '48px' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: colors.secondary, margin: 0 }}>
            Featured Products
          </h2>
          <div
            style={{
              width: '40px',
              height: '3px',
              backgroundColor: colors.primary,
              borderRadius: '2px',
              marginTop: '6px',
            }}
          />
        </div>
        <Link
          href="/products"
          style={{
            color: colors.primary,
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          View all products →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mockFeaturedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
