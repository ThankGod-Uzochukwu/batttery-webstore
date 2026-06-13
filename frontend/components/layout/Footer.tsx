import React from 'react';
import Link from 'next/link';

// ============================================
// BRAND COLORS — change these to update theme
// ============================================
const colors = {
  primary: '#22C55E',
  secondary: '#0D1B2A',
  textMuted: '#6B7280',
  white: '#FFFFFF',
  border: '#E5E7EB',
  bgLight: '#F9FAFB',
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10" style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1: Company */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: colors.white }}>
            Company
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/press"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                Press
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 2: Categories */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: colors.white }}>
            Categories
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/categories/laptops"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                href="/categories/phones"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                Phones
              </Link>
            </li>
            <li>
              <Link
                href="/categories/accessories"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: colors.white }}>
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/products"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="text-sm hover:underline"
                style={{ color: colors.textMuted }}
              >
                Shipping & Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 4: Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: colors.white }}>
            Contact
          </h3>
          <ul className="space-y-2">
            <li className="text-sm" style={{ color: colors.textMuted }}>
              Email: info@javal.com
            </li>
            <li className="text-sm" style={{ color: colors.textMuted }}>
              Phone: +1 (123) 456-7890
            </li>
            <li className="text-sm" style={{ color: colors.textMuted }}>
              Address: 123 Battery St, Tech City
            </li>
          </ul>
        </div>
      </div>
      <div
        className="mt-10 pt-6 border-t text-center text-xs"
        style={{ borderColor: colors.border, color: colors.textMuted }}
      >
        &copy; {new Date().getFullYear()} Javal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
