import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JavaL — Light & Plug Concept',
  description: 'Premium electrical products for your home and office',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
