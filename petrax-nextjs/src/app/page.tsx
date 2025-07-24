'use client';

import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/contexts';

export default function HomePage() {
  const { wallet, connect } = useWallet();

  const handleConnectWallet = async () => {
    try {
      await connect('internet-identity');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="layout py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="text-gradient">PetraX</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolutionizing oil trading with AI-powered insights and Web3 technology. 
              Trade smarter, faster, and more securely on the decentralized marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace" className="btn-primary">
                Explore Marketplace
              </Link>
              {!wallet.isConnected && (
                <button
                  onClick={handleConnectWallet}
                  disabled={wallet.isConnecting}
                  className="btn-outline"
                >
                  {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="layout">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose PetraX?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the future of oil trading with our cutting-edge platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Blockchain Security
              </h3>
              <p className="text-gray-400">
                Built on Internet Computer Protocol for maximum security and transparency
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                AI-Powered Insights
              </h3>
              <p className="text-gray-400">
                Advanced analytics and market predictions to optimize your trading decisions
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-400">
                Execute trades in milliseconds with our optimized trading engine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="layout">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">$2.5B+</div>
              <div className="text-gray-400">Total Volume Traded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">50K+</div>
              <div className="text-gray-400">Active Traders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="layout text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of traders who trust PetraX for their oil trading needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="btn-primary">
              Start Trading Now
            </Link>
            <Link href="/trading" className="btn-secondary">
              View Trading Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
