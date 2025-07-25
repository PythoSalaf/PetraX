'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useWallet } from '@/contexts';
import { IconWallet, IconShield, IconBolt, IconArrowRight } from '@tabler/icons-react';

export default function ConnectWalletPage() {
  const { wallet, connect } = useWallet();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to home if wallet is already connected
  useEffect(() => {
    if (wallet.isConnected) {
      router.push('/home');
    }
  }, [wallet.isConnected, router]);

  const handleConnect = async (walletType: string) => {
    try {
      await connect(walletType as any);
      toast.success('Wallet connected successfully!', {
        description: 'Welcome to PetraX oil trading platform.',
        duration: 3000,
      });
      // Redirect will happen automatically via useEffect
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet', {
        description: 'Please try again or check your wallet extension.',
        duration: 4000,
      });
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="layout">
        <div className="max-w-2xl mx-auto text-center">
          {/* Background Animation */}
          <motion.div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </motion.div>

          {/* Logo */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl font-bold text-gradient mb-4">PetraX</div>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Oil Trading Platform
            </p>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Connect Your Wallet
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Connect your ICP wallet to start trading oil commodities on the blockchain.
            </p>
          </motion.div>

          {/* Wallet Connection Buttons */}
          <motion.div 
            className="space-y-4 mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Internet Identity */}
            <button
              onClick={() => handleConnect('internet-identity')}
              disabled={wallet.isConnecting}
              className={`w-full max-w-md mx-auto flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
              }`}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
            >
              <div className="flex items-center space-x-3">
                <IconShield className="h-6 w-6" />
                <span>
                  {wallet.isConnecting ? 'Connecting...' : 'Connect with Internet Identity'}
                </span>
                {wallet.isConnecting && (
                  <div className="loading-spinner ml-2"></div>
                )}
              </div>
            </button>

            {/* Plug Wallet */}
            <button
              onClick={() => handleConnect('plug')}
              disabled={wallet.isConnecting}
              className={`w-full max-w-md mx-auto flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg border-2 ${
                wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
              }`}
              style={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!wallet.isConnecting) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!wallet.isConnecting) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }
              }}
            >
              <div className="flex items-center space-x-3">
                <IconBolt className="h-6 w-6" />
                <span>Connect with Plug Wallet</span>
              </div>
            </button>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="p-4">
              <IconShield className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Secure
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Bank-grade security with blockchain transparency
              </p>
            </div>
            <div className="p-4">
              <IconBolt className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Fast
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Lightning-fast transactions on ICP blockchain
              </p>
            </div>
            <div className="p-4">
              <IconArrowRight className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Easy
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Simple and intuitive trading interface
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
