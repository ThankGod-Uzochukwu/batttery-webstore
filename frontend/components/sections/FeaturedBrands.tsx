import React from 'react';
import Link from 'next/link';
import { mockBrands } from '@/lib/mock-data';

const colors = {
  primary: '#22C55E',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  border: '#E5E7EB',
  bgLight: '#F9FAFB',
  textMuted: '#6B7280',
};

const BrandLogoPlaceholder = ({ name }: { name: string }) => (
  <div className="w-full h-full flex items-center justify-center px-4">
    <span
      className="text-lg font-black tracking-tight select-none"
      style={{ color: colors.secondary }}
    >
      {name}
    </span>
  </div>
);

const FeaturedBrands: React.FC<{ className?: string }> = ({ className = '' }) => (
  <section
    className={`w-full py-10 ${className}`}
    style={{ borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black" style={{ color: colors.secondary }}>
          Featured Brands
        </h2>
        <Link
          href="/brands"
          className="flex items-center gap-1 text-sm font-semibold"
          style={{ color: colors.primary }}
        >
          +{mockBrands.length - 4} More
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
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {mockBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/products?brand=${brand.slug}`}
            className="group flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              height: '72px',
              backgroundColor: colors.white,
              border: `1px solid ${colors.border}`,
            }}
          >
            <BrandLogoPlaceholder name={brand.name} />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedBrands;
