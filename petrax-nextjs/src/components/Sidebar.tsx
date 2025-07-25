'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenuOutline, IoClose } from 'react-icons/io5';
import { useWallet } from '@/contexts';
import { truncateAddress } from '@/utils';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/trading', label: 'Trading' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden p-3 rounded-xl transition-all duration-200 shadow-lg"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white'
        }}
      >
        {isOpen ? (
          <IoClose className="h-6 w-6" />
        ) : (
          <IoMenuOutline className="h-6 w-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-sm border-r shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
        style={{ borderColor: 'var(--border-muted)' }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--border-muted)' }}>
            <Link href="/" className="flex items-center space-x-3 group" onClick={() => setIsOpen(false)}>
              <div className="text-3xl font-bold text-gradient">PetraX</div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
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
          </nav>

          {/* Wallet Connect Button */}
          <div className="p-6 border-t" style={{ borderColor: 'var(--border-muted)' }}>
            <button
              onClick={handleWalletAction}
              disabled={wallet.isConnecting}
              className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
              }`}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
            >
              {wallet.isConnecting && (
                <div className="loading-spinner mr-2 inline-block"></div>
              )}
              {getWalletButtonText()}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
