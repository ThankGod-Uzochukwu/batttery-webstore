import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#CC0000',
          dark: '#990000',
          light: '#FF3333',
        },
        // Secondary colors
        secondary: {
          DEFAULT: '#1a1a1a',
          light: '#333333',
        },
        // Accent
        accent: '#FF6600',
        // Background
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F5F5',
        },
        // Border
        border: '#E0E0E0',
        // Text
        text: {
          primary: '#1a1a1a',
          secondary: '#555555',
          muted: '#999999',
        },
        // Status colors
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1.25' }],
        sm: ['14px', { lineHeight: '1.375' }],
        base: ['16px', { lineHeight: '1.5' }],
        lg: ['18px', { lineHeight: '1.625' }],
        xl: ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.5' }],
        '3xl': ['30px', { lineHeight: '1.375' }],
        '4xl': ['36px', { lineHeight: '1.25' }],
        '5xl': ['48px', { lineHeight: '1.25' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      lineHeight: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      spacing: {
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '30': '120px',
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0 2px 8px rgba(0,0,0,0.08)',
        md: '0 4px 16px rgba(0,0,0,0.10)',
        lg: '0 8px 32px rgba(0,0,0,0.12)',
        card: '0 2px 12px rgba(0,0,0,0.08)',
      },
    },
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};

export default config;
