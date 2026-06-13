'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockHeroSlides } from '@/lib/mock-data';

// ============================================
// BRAND COLORS — change these to update theme
// ============================================
const colors = {
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  textMuted: '#9CA3AF',
};

// ─────────────────────────────────────────
// HERO LOGO PLACEHOLDER
// Shows the JL brand mark when no image
// ─────────────────────────────────────────
const HeroLogoMark = () => (
  <div
    className="relative flex items-center justify-center rounded-2xl"
    style={{
      width: '220px',
      height: '220px',
      backgroundColor: colors.secondary,
      border: `3px solid ${colors.primary}`,
    }}
  >
    {/* Outer ring */}
    <div
      className="absolute inset-0 rounded-2xl opacity-20"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${colors.primary}, transparent 60%)`,
      }}
    />
    {/* JL text */}
    <div className="flex items-end gap-1 z-10">
      <span
        className="text-6xl font-black tracking-tight leading-none"
        style={{ color: colors.white }}
      >
        J
      </span>
      <span
        className="text-6xl font-black tracking-tight leading-none"
        style={{ color: colors.primary }}
      >
        L
      </span>
    </div>
    {/* Plug icon dots */}
    <div className="absolute top-6 right-8 flex flex-col gap-1.5">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-full"
          style={{ width: '6px', height: '16px', backgroundColor: colors.primary, opacity: 0.8 }}
        />
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────
// MAIN HERO SECTION
// ─────────────────────────────────────────
interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const slide = mockHeroSlides[0];

  return (
    <section className={`w-full ${className}`} style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-14 md:py-20">
          {/* LEFT — Text content */}
          <div className="flex flex-col gap-6 max-w-lg">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              <span style={{ color: colors.white }}>{slide.headline} </span>
              <br />
              <span style={{ color: colors.primary }}>{slide.headlineAccent}</span>
              <br />
              <span style={{ color: colors.white }}>{slide.headlineSuffix}</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-sm md:text-base leading-relaxed max-w-sm"
              style={{ color: colors.textMuted }}
            >
              {slide.subtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={slide.primaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold transition-all duration-200"
                style={{ backgroundColor: colors.primary, color: colors.white }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = colors.primaryHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = colors.primary;
                }}
              >
                Shop Now
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link
                href={slide.secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold transition-all duration-200"
                style={{
                  backgroundColor: 'transparent',
                  color: colors.white,
                  border: `2px solid rgba(255,255,255,0.3)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = colors.primary;
                  (e.currentTarget as HTMLElement).style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                  (e.currentTarget as HTMLElement).style.color = colors.white;
                }}
              >
                View Catalogue
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { value: '500+', label: 'Products' },
                { value: '10k+', label: 'Customers' },
                { value: '5★', label: 'Rated' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-lg font-black" style={{ color: colors.primary }}>
                    {stat.value}
                  </span>
                  <span className="text-xs" style={{ color: colors.textMuted }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Brand logo mark */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <HeroLogoMark />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// --- USAGE ---
// import HeroSection from "@/components/sections/HeroSection"
// <HeroSection />
