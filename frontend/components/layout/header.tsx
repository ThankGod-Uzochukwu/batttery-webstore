'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const colors = {
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  border: '#E5E7EB',
  textMuted: '#6B7280',
};

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Logo = () => (
  <Link
    href="/"
    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}
  >
    <span
      style={{
        fontSize: '22px',
        fontWeight: 900,
        color: colors.secondary,
        letterSpacing: '-0.02em',
      }}
    >
      Jav
    </span>
    <span
      style={{ fontSize: '22px', fontWeight: 900, color: colors.primary, letterSpacing: '-0.02em' }}
    >
      aL
    </span>
    <span
      style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: colors.primary,
        marginBottom: '10px',
        marginLeft: '-1px',
      }}
    />
  </Link>
);

const Header: React.FC<{ cartCount?: number }> = ({ cartCount = 0 }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState('/');

  useEffect(() => {
    // Wrap window access in a typeof check for SSR compatibility
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
      const onScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener('scroll', onScroll);
      // Cleanup function for event listener
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div
        style={{
          backgroundColor: colors.primary,
          color: colors.white,
          textAlign: 'center',
          padding: '8px 16px',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        🎉 Free delivery on orders above ₦50,000 — Shop now and save big!
      </div>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          width: '100%',
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
          transition: 'box-shadow 0.2s',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6" style={{ height: '64px' }}>
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-1.5"
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: '22px',
                    height: '2px',
                    backgroundColor: colors.secondary,
                    borderRadius: '2px',
                  }}
                />
              ))}
            </button>

            <Logo />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const active = path === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: active ? colors.primary : colors.secondary,
                      borderBottom: active
                        ? `2px solid ${colors.primary}`
                        : '2px solid transparent',
                      paddingBottom: '2px',
                      transition: 'color 0.15s',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-sm">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="flex items-center w-full rounded-md overflow-hidden"
                style={{ border: `1.5px solid ${colors.border}` }}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 focus:outline-none text-sm px-3 py-2"
                  style={{ color: colors.secondary, backgroundColor: colors.white }}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center px-3 py-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <svg
                    width="15"
                    height="15"
                    fill="none"
                    stroke={colors.white}
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Wishlist */}
              <Link href="/wishlist" aria-label="Wishlist" style={{ color: colors.secondary }}>
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label="Cart"
                style={{ position: 'relative', color: colors.secondary }}
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                  <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: colors.primary,
                      color: colors.white,
                      fontSize: '10px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Sign In */}
              <Link
                href="/auth/signin"
                className="hidden md:inline-flex items-center rounded-md font-bold text-sm transition-all duration-200"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  padding: '8px 18px',
                  textDecoration: 'none',
                }}
                onMouseEnter={(
                  e // Changed HTMLElement to HTMLAnchorElement
                ) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    colors.primaryHover)
                }
                onMouseLeave={(
                  e // Changed HTMLElement to HTMLAnchorElement
                ) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.primary)
                }
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileOpen && (
          <>
            <div
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 40,
                backgroundColor: 'rgba(13,27,42,0.5)',
              }}
            />
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                zIndex: 50,
                width: '280px',
                backgroundColor: colors.white,
                boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: `1px solid ${colors.border}` }}
              >
                <Logo />
                <button onClick={() => setMobileOpen(false)} style={{ color: colors.secondary }}>
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      padding: '14px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: path === link.href ? colors.primary : colors.secondary,
                      backgroundColor: path === link.href ? '#F0FDF4' : 'transparent',
                      borderLeft:
                        path === link.href
                          ? `3px solid ${colors.primary}`
                          : '3px solid transparent',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div
                style={{
                  marginTop: 'auto',
                  padding: '20px',
                  borderTop: `1px solid ${colors.border}`,
                }}
              >
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: colors.primary,
                    color: colors.white,
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
