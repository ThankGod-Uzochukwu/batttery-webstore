'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '../ui';

// const colors = {
//   primary: 'var(--color-primary)',
//   secondary: 'var(--color-secondary)',
//   surface: '#FFFFFF',
//   border: '#E5E7EB',
//   muted: '#6B7280',
// };

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-[520px] h-[42px] rounded-[24px] border border-[#E5E7EB] bg-[#F3F4F6] px-4"
      style={{ gap: '10px' }}
    >
      <div className="flex items-center gap-[15px] w-[310px] h-[20px]">
        <div className="relative w-[21px] h-[20px]">
          <svg
            className="absolute inset-0"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="6" stroke="#9CA3AF" strokeWidth="2" />
            <line
              x1="12.1213"
              y1="12.1213"
              x2="18"
              y2="18"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, brands, categories..."
          className="w-[274px] bg-transparent text-[14px] font-normal leading-[17px] text-[#9CA3AF] outline-none"
        />
      </div>
      <button
        type="submit"
        className="flex h-[34px] w-[46px] items-center justify-center rounded-[21px] bg-[#2ECC71] text-[13px] font-medium text-[#1E293B]"
      >
        Go
      </button>
    </form>
  );
};

const ActionBadge = ({ label, icon }: { label: string; icon: string }) => (
  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-3 py-2 text-sm text-[#6B7280]">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E5E7EB] text-[#1E293B] text-sm font-semibold">
      {icon}
    </span>
    {label}
  </div>
);

const AnnouncementBar = () => (
  <div className="w-full bg-[#2ECC71]">
    <div className="max-w-7xl mx-auto px-4 py-2 text-center text-[12px] font-semibold leading-4 text-[#1E293B]">
      ⚡ FREE DELIVERY ON ORDERS ABOVE ₦50,000 • QUALITY • SAFETY • RELIABILITY • SHOP NOW →
    </div>
  </div>
);

const categoryLinks = [
  'Lighting',
  'Switches & Sockets',
  'Appliances',
  'Cables & Wiring',
  'Smart Home',
  'Fire & Security',
  'Tools',
  'Brands',
];

interface HeaderProps {
  cartCount?: number;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0, className = '' }) => {
  // const [scrolled, setScrolled] = useState(false);
  // const currentPath = usePathname();

  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 10);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-30 flex flex-col gap-2 w-full transition-shadow duration-200 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4  lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-4">
              <Icon name="Logo" width={110} height={58} />
            </Link>
            <div className="hidden md:flex flex-1">
              <SearchBar />
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-end">{/* <Icon /> */}</div>
          </div>
        </div>
        <div className="w-full bg-[#1E293B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap items-center gap-6 overflow-x-auto py-3 text-sm font-medium text-white">
              {categoryLinks.map((link) => (
                <Link
                  key={link}
                  href="/"
                  className="whitespace-nowrap transition hover:text-[#D1D5DB]"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
