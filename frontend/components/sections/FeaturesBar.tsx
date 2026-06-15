import React from 'react';
import { mockFeatures } from '@/lib/mock-data';

const colors = {
  primary: '#22C55E',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  border: '#E5E7EB',
  textMuted: '#6B7280',
};

const icons: Record<string, React.ReactNode> = {
  delivery: (
    <svg
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <rect
        x="1"
        y="3"
        width="15"
        height="13"
        rx="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  phone: (
    <svg
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chat: (
    <svg
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  price: (
    <svg
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" />
      <path
        d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const FeaturesBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <section
    className={`w-full py-6 ${className}`}
    style={{ borderBottom: `1px solid ${colors.border}` }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockFeatures.map((feature, i) => (
          <div
            key={feature.id}
            className="flex items-center gap-3"
            style={{
              paddingRight: i < mockFeatures.length - 1 ? '1rem' : '0',
              borderRight: i < mockFeatures.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}
          >
            <span style={{ color: colors.primary, flexShrink: 0 }}>{icons[feature.icon]}</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold" style={{ color: colors.secondary }}>
                {feature.title}
              </span>
              <span className="text-xs" style={{ color: colors.textMuted }}>
                {feature.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesBar;
