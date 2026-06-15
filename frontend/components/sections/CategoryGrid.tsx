import React from 'react';
import Link from 'next/link';
import { mockCategories } from '@/lib/mock-data';

const colors = {
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  border: '#E5E7EB',
  bgLight: '#F9FAFB',
  textMuted: '#6B7280',
  overlay: 'rgba(13,27,42,0.45)',
};

const CategoryImagePlaceholder = ({ name }: { name: string }) => (
  <div
    className="w-full h-full flex flex-col items-center justify-center gap-2"
    style={{ backgroundColor: colors.bgLight }}
  >
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={colors.border} strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke={colors.textMuted} strokeWidth="1.5" />
      <path
        d="M21 15l-5-5L5 21"
        stroke={colors.textMuted}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
    <span className="text-xs text-center px-2 font-medium" style={{ color: colors.textMuted }}>
      {name}
    </span>
  </div>
);

const CategoryCard = ({
  category,
  large = false,
}: {
  category: (typeof mockCategories)[0];
  large?: boolean;
}) => (
  <Link
    href={`/products?category=${category.slug}`}
    className="relative overflow-hidden rounded-xl block group"
    style={{ height: large ? '260px' : '150px' }}
  >
    <div className="absolute inset-0">
      <CategoryImagePlaceholder name={category.name} />
    </div>
    <div
      className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
      style={{ backgroundColor: colors.overlay, opacity: 0.5 }}
    />
    <div className="absolute bottom-0 left-0 right-0 p-3">
      <p className="text-sm font-bold" style={{ color: colors.white }}>
        {category.name}
      </p>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
        {category.productCount} products
      </p>
    </div>
    <div
      className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
      style={{ backgroundColor: colors.primary }}
    >
      <svg
        width="12"
        height="12"
        fill="none"
        stroke={colors.white}
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </Link>
);

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
      className="flex items-center gap-1 text-sm font-semibold"
      style={{ color: colors.primary }}
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

const CategoryGrid: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [large, ...rest] = mockCategories;
  const topRight = rest.slice(0, 2);
  const bottomRow = rest.slice(2, 6);

  return (
    <section className={`w-full py-12 ${className}`} style={{ backgroundColor: colors.bgLight }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Shop by Category" viewAllHref="/categories" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <CategoryCard category={large} large />
          </div>
          <div className="flex flex-col gap-4">
            {topRight.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bottomRow.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
