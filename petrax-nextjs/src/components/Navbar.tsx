'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenuOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useWallet } from '@/contexts';
import { truncateAddress } from '@/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { wallet, connect, disconnect } = useWallet();

  const handleWalletAction = async () => {
    if (wallet.isConnected) {
      await disconnect();
    } else {
      try {
        await connect('internet-identity');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const getWalletButtonText = (): string => {
    if (wallet.isConnecting) return 'Connecting...';
    if (wallet.isConnected && wallet.accountId) {
      return truncateAddress(wallet.accountId);
    }
    return 'Connect Wallet';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/trading', label: 'Trading' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
      <div className="layout">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold text-gradient">PetraX</div>
            <div className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                 style={{ backgroundColor: 'var(--color-primary)' }}></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActivePage(item.href)
                    ? 'text-primary border border-primary/20'
                    : 'text-secondary hover:text-primary hover:bg-tertiary/50'
                }`}
                style={{
                  color: isActivePage(item.href) ? 'var(--color-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActivePage(item.href) ? 'var(--color-primary-light)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActivePage(item.href)) {
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.backgroundColor = 'var(--background-tertiary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActivePage(item.href)) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Wallet Button & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleWalletAction}
              disabled={wallet.isConnecting}
              className={`btn btn-primary ${
                wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {wallet.isConnecting && (
                <div className="loading-spinner mr-2"></div>
              )}
              {getWalletButtonText()}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg transition-all duration-200 hover:bg-tertiary/50"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor = 'var(--background-tertiary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = 'transparent';
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
          <div className="md:hidden py-4 border-t" style={{ borderColor: 'var(--border-muted)' }}>
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActivePage(item.href)
                      ? 'border border-primary/20'
                      : ''
                  }`}
                  style={{
                    color: isActivePage(item.href) ? 'var(--color-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActivePage(item.href) ? 'var(--color-primary-light)' : 'transparent'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  onTouchStart={(e) => {
                    if (!isActivePage(item.href)) {
                      e.currentTarget.style.backgroundColor = 'var(--background-tertiary)';
                    }
                  }}
                  onTouchEnd={(e) => {
                    if (!isActivePage(item.href)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
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
