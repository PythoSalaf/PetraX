'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t mt-auto" style={{ borderColor: 'var(--border-muted)' }}>
      <div className="layout py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="text-2xl font-bold text-gradient">PetraX</div>
              <div className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                   style={{ backgroundColor: 'var(--color-primary)' }}></div>
            </Link>
            <p className="mb-6 max-w-md leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Revolutionizing oil trading with AI-powered insights and Web3 technology.
              Trade smarter, faster, and more securely on the decentralized marketplace.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                   style={{ backgroundColor: 'var(--background-tertiary)' }}>
                <span style={{ color: 'var(--color-primary)' }}>🐦</span>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                   style={{ backgroundColor: 'var(--background-tertiary)' }}>
                <span style={{ color: 'var(--color-primary)' }}>💼</span>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                   style={{ backgroundColor: 'var(--background-tertiary)' }}>
                <span style={{ color: 'var(--color-primary)' }}>📧</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/trading" className="transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Trading
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
             style={{ borderColor: 'var(--border-muted)' }}>
          <div className="flex items-center space-x-4">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              © 2024 PetraX. All rights reserved.
            </p>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-success)' }}></div>
              <span className="text-xs" style={{ color: 'var(--color-success)' }}>Secure Platform</span>
            </div>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              Privacy
            </Link>
            <Link href="/terms" className="text-sm transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              Terms
            </Link>
            <Link href="/cookies" className="text-sm transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
