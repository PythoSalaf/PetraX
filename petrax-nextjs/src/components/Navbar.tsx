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
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/trading', label: 'Trading' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="layout">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-3xl font-bold text-gradient">PetraX</div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-2 flex-1 justify-center">
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

          {/* Right Side - Wallet Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Wallet Connect Button */}
            <button
              onClick={handleWalletAction}
              disabled={wallet.isConnecting}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
              }`}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
            >
              {wallet.isConnecting && (
                <div className="loading-spinner mr-2"></div>
              )}
              {getWalletButtonText()}
            </button>

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
