import React from 'react';
import Link from 'next/link';
import { mockBlogPosts } from '@/lib/mock-data';

const colors = {
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  border: '#E5E7EB',
  bgLight: '#F9FAFB',
  textMuted: '#6B7280',
  cardBg: '#1E3448',
};

const BlogCard = ({ post }: { post: (typeof mockBlogPosts)[0] }) => (
  <div
    className="group flex flex-col rounded-xl overflow-hidden"
    style={{ backgroundColor: colors.cardBg }}
  >
    <div
      className="relative overflow-hidden"
      style={{ height: '160px', backgroundColor: colors.secondary }}
    >
      <span
        className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded"
        style={{ backgroundColor: colors.primary, color: colors.white }}
      >
        {post.category}
      </span>
      <div className="w-full h-full flex items-center justify-center">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke={colors.cardBg}
            strokeWidth="1.5"
          />
          <circle cx="8.5" cy="8.5" r="1.5" stroke={colors.textMuted} strokeWidth="1.5" />
          <path
            d="M21 15l-5-5L5 21"
            stroke={colors.textMuted}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
    <div className="flex flex-col gap-3 p-4 flex-1">
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: colors.textMuted }}>
          {post.date}
        </span>
        <span style={{ color: colors.textMuted }}>·</span>
        <span className="text-xs" style={{ color: colors.primary }}>
          {post.readTime}
        </span>
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h3 className="text-sm font-bold leading-snug" style={{ color: colors.white }}>
          {post.title}
        </h3>
      </Link>
      <p
        className="text-xs leading-relaxed line-clamp-2 flex-1"
        style={{ color: colors.textMuted }}
      >
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="flex items-center gap-1 text-xs font-bold mt-auto"
        style={{ color: colors.primary }}
      >
        Read More
        <svg
          width="12"
          height="12"
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
);

const BlogSection: React.FC<{ className?: string }> = ({ className = '' }) => (
  <section className={`w-full py-12 ${className}`} style={{ backgroundColor: colors.secondary }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-black" style={{ color: colors.white }}>
            From Our Blog
          </h2>
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: colors.primary }} />
        </div>
        <Link
          href="/blog"
          className="flex items-center gap-1 text-sm font-semibold"
          style={{ color: colors.primary }}
        >
          View All Posts
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mockBlogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
