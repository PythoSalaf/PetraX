'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenuOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useWallet } from '@/contexts';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { wallet } = useWallet();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { href: '/home', label: 'Home' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/trading', label: 'Trading' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm" style={{ borderColor: 'var(--border-muted)' }}>
      <div className="layout">
        <div className="flex items-center justify-between h-20">
          {/* Left - Logo */}
          <Link href="/home" className="flex items-center space-x-3 group">
            <div className="text-3xl font-bold text-gradient">PetraX</div>
          </Link>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isActivePage(item.href)
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:text-white hover:shadow-md'
                }`}
                style={{
                  backgroundColor: isActivePage(item.href)
                    ? 'var(--color-primary)'
                    : 'transparent',
                  color: isActivePage(item.href)
                    ? 'white'
                    : 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  if (!isActivePage(item.href)) {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActivePage(item.href)) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right - Wallet Status & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Wallet Status (Desktop) */}
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--background-tertiary)' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: wallet.isConnected ? 'var(--color-success)' : 'var(--color-error)' }}></div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {wallet.isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-3 rounded-xl transition-all duration-200"
              style={{
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--background-tertiary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = 'var(--background-tertiary)';
              }}
            >
              {isMenuOpen ? (
                <IoMdClose className="h-6 w-6" />
              ) : (
                <IoMenuOutline className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t bg-white/95 backdrop-blur-sm" style={{ borderColor: 'var(--border-muted)' }}>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                    isActivePage(item.href)
                      ? 'text-white shadow-lg'
                      : 'text-gray-600'
                  }`}
                  style={{
                    backgroundColor: isActivePage(item.href)
                      ? 'var(--color-primary)'
                      : 'transparent',
                    color: isActivePage(item.href)
                      ? 'white'
                      : 'var(--text-secondary)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  onTouchStart={(e) => {
                    if (!isActivePage(item.href)) {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onTouchEnd={(e) => {
                    if (!isActivePage(item.href)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
