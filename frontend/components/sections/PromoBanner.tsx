import React from 'react';
import Link from 'next/link';

const colors = {
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#0D1B2A',
  secondaryLight: '#1E3448',
  white: '#FFFFFF',
  textMuted: '#9CA3AF',
};

const PromoBanner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <section className={`w-full py-12 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1 — Season Sale */}
        <div
          className="relative overflow-hidden rounded-2xl flex flex-col justify-center px-8 py-10"
          style={{ backgroundColor: colors.secondary, minHeight: '200px' }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10"
            style={{
              background: `radial-gradient(circle at 80% 50%, ${colors.primary}, transparent 60%)`,
            }}
          />
          <div
            className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-5"
            style={{ backgroundColor: colors.primary }}
          />
          <div className="relative z-10 flex flex-col gap-3 max-w-xs">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit"
              style={{ backgroundColor: colors.primary, color: colors.white }}
            >
              Limited Time
            </span>
            <h3 className="text-3xl font-black leading-tight" style={{ color: colors.white }}>
              Season Sale
              <br />
              <span style={{ color: colors.primary }}>Up to 30%</span>
            </h3>
            <p className="text-sm" style={{ color: colors.textMuted }}>
              On selected solar panels, batteries and electrical fittings.
            </p>
            <Link
              href="/products?badge=sale"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold w-fit mt-1"
              style={{ backgroundColor: colors.primary, color: colors.white }}
            >
              Shop the Sale
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
        </div>

        {/* Banner 2 — New Arrivals */}
        <div
          className="relative overflow-hidden rounded-2xl flex flex-col justify-center px-8 py-10"
          style={{ backgroundColor: colors.secondaryLight, minHeight: '200px' }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10"
            style={{
              background: `radial-gradient(circle at 80% 50%, ${colors.primary}, transparent 60%)`,
            }}
          />
          <div className="relative z-10 flex flex-col gap-3 max-w-xs">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit"
              style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: colors.primary }}
            >
              Just Arrived
            </span>
            <h3 className="text-3xl font-black leading-tight" style={{ color: colors.white }}>
              New
              <br />
              <span style={{ color: colors.primary }}>Arrivals</span>
            </h3>
            <p className="text-sm" style={{ color: colors.textMuted }}>
              Fresh stock of solar panels, inverters and smart switches just landed.
            </p>
            <Link
              href="/products?badge=new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold w-fit mt-1"
              style={{
                backgroundColor: 'transparent',
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
              }}
            >
              View New Arrivals
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
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
