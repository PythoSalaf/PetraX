'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t mt-auto" style={{ borderColor: 'var(--border-muted)' }}>
      <div className="layout py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              PetraX Oil Trading
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Trade oil commodities with cryptocurrency. Accessible oil trading for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/marketplace" className="transition-colors duration-200"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/trading" className="transition-colors duration-200"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Trading
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Contact</h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Need help? Reach out to us at support@petrax-trading.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 text-center"
             style={{ borderColor: 'var(--border-muted)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2025 PetraX Oil Trading. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
