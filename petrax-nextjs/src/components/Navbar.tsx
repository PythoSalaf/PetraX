'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IoMenuOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useWallet } from '@/contexts';
import { truncateAddress } from '@/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="layout">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gradient">
            PetraX
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-purple-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className="text-white hover:text-purple-400 transition-colors duration-200"
            >
              Marketplace
            </Link>
            <Link
              href="/trading"
              className="text-white hover:text-purple-400 transition-colors duration-200"
            >
              Trading
            </Link>
          </div>

          {/* Wallet Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleWalletAction}
              disabled={wallet.isConnecting}
              className={`btn-primary ${
                wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {getWalletButtonText()}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-purple-400 transition-colors"
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
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-purple-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className="text-white hover:text-purple-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/trading"
                className="text-white hover:text-purple-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Trading
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
