'use client';

import React, { useState } from 'react';

const colors = {
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#0D1B2A',
  white: '#FFFFFF',
  textMuted: '#9CA3AF',
  border: 'rgba(255,255,255,0.15)',
  inputBg: 'rgba(255,255,255,0.08)',
};

const NewsletterCTA: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className={`w-full py-16 ${className}`} style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: colors.primary }}
          >
            Stay Updated
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: colors.white }}>
              Join the <span style={{ color: colors.primary }}>Javal Community</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
              Get exclusive deals, new product alerts, and expert electrical tips delivered straight
              to your inbox.
            </p>
          </div>
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill={colors.primary} />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke={colors.white}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-bold" style={{ color: colors.white }}>
                You are in! Welcome to the community.
              </p>
              <p className="text-sm" style={{ color: colors.textMuted }}>
                Check your inbox for a confirmation email.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-md text-sm focus:outline-none"
                style={{
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  color: colors.white,
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-md text-sm font-bold flex-shrink-0"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  opacity: loading ? 0.8 : 1,
                }}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
          {!submitted && (
            <p className="text-xs" style={{ color: colors.textMuted }}>
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
