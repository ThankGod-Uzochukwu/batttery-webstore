'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// ============================================
// BRAND COLORS — change these to update theme
// ============================================
const colors = {
  primary: '#22C55E',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  border: '#E5E7EB',
  textMuted: '#6B7280',
  bgLight: '#F9FAFB',
};

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Logo = () => (
  <Link href="/" className="flex items-center gap-1 flex-shrink-0">
    <span className="text-2xl font-black tracking-tight" style={{ color: colors.secondary }}>
      Jav
    </span>
    <span className="text-2xl font-black tracking-tight" style={{ color: colors.primary }}>
      aL
    </span>
    <span
      className="w-2 h-2 rounded-full mb-3 -ml-0.5"
      style={{ backgroundColor: colors.primary }}
    />
  </Link>
);

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/products?search=${encodeURIComponent(query)}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center rounded-md overflow-hidden flex-1 max-w-md"
      style={{ border: `1.5px solid ${colors.border}` }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 px-4 py-2 text-sm bg-white focus:outline-none"
        style={{ color: colors.secondary }}
      />
      <button
        type="submit"
        className="px-4 py-2 flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}
        aria-label="Search"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke={colors.white} strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke={colors.white} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
};

const CartIcon = ({ count = 0 }: { count?: number }) => (
  <Link href="/cart" className="relative flex items-center justify-center" aria-label="Cart">
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
        stroke={colors.secondary}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        stroke={colors.secondary}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 10a4 4 0 01-8 0"
        stroke={colors.secondary}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {count > 0 && (
      <span
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
        style={{ backgroundColor: colors.primary, color: colors.white }}
      >
        {count > 99 ? '99+' : count}
      </span>
    )}
  </Link>
);

const WishlistIcon = () => (
  <Link href="/wishlist" className="flex items-center justify-center" aria-label="Wishlist">
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke={colors.secondary}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Link>
);

const DesktopNav = ({ currentPath }: { currentPath: string }) => (
  <nav className="hidden md:flex items-center gap-6">
    {navLinks.map((link) => {
      const isActive = currentPath === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium transition-colors duration-200"
          style={{
            color: isActive ? colors.primary : colors.secondary,
            borderBottom: isActive ? `2px solid ${colors.primary}` : '2px solid transparent',
            paddingBottom: '2px',
          }}
        >
          {link.label}
        </Link>
      );
    })}
  </nav>
);

const MobileMenu = ({
  isOpen,
  onClose,
  currentPath,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(13,27,42,0.5)' }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 left-0 h-full z-50 flex flex-col"
        style={{
          width: '280px',
          backgroundColor: colors.white,
          boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
          animation: 'javal-slide-right 0.25s ease',
        }}
      >
        <style>{`@keyframes javal-slide-right { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <Logo />
          <button onClick={onClose} aria-label="Close menu" style={{ color: colors.secondary }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
          <SearchBar />
        </div>
        <nav className="flex flex-col py-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center px-5 py-3.5 text-sm font-medium transition-colors duration-150"
                style={{
                  color: isActive ? colors.primary : colors.secondary,
                  backgroundColor: isActive ? '#F0FDF4' : 'transparent',
                  borderLeft: isActive ? `3px solid ${colors.primary}` : '3px solid transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-5 py-5" style={{ borderTop: `1px solid ${colors.border}` }}>
          <Link
            href="/auth/signin"
            onClick={onClose}
            className="flex items-center justify-center w-full py-2.5 rounded-md text-sm font-semibold"
            style={{ backgroundColor: colors.primary, color: colors.white }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

const AnnouncementBar = () => (
  <div
    className="w-full text-center py-2 px-4 text-xs font-medium"
    style={{ backgroundColor: colors.primary, color: colors.white }}
  >
    🎉 Free delivery on orders above ₦50,000 — Shop now and save big!
  </div>
);

interface HeaderProps {
  cartCount?: number;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0, className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-30 w-full transition-shadow duration-200 ${className}`}
        style={{
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label="Open menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block rounded-full"
                  style={{ width: '22px', height: '2px', backgroundColor: colors.secondary }}
                />
              ))}
            </button>
            <Logo />
            <DesktopNav currentPath={currentPath} />
            <div className="hidden md:flex flex-1 max-w-md">
              <SearchBar />
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <WishlistIcon />
              <CartIcon count={cartCount} />
              <Link
                href="/auth/signin"
                className="hidden md:inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold"
                style={{ backgroundColor: colors.primary, color: colors.white }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          currentPath={currentPath}
        />
      </header>
    </>
  );
};

export default Header;
