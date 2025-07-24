'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@/contexts';
import { HeroIcon, Chart, Drum, TradeIcon } from '../../public/assets';

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
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full"
               style={{ backgroundColor: 'var(--color-primary)' }}></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full"
               style={{ backgroundColor: 'var(--color-warning)' }}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full"
               style={{ backgroundColor: 'var(--color-success)' }}></div>
        </div>

        <div className="layout py-20 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Welcome to{' '}
                <span className="text-gradient">PetraX</span>
              </h1>
              <p className="text-xl mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                Revolutionizing oil trading with AI-powered insights and Web3 technology.
                Trade smarter, faster, and more securely on the decentralized marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/marketplace" className="btn btn-primary btn-lg">
                  Explore Marketplace
                </Link>
                {!wallet.isConnected && (
                  <button
                    onClick={handleConnectWallet}
                    disabled={wallet.isConnecting}
                    className="btn btn-outline btn-lg"
                  >
                    {wallet.isConnecting && <div className="loading-spinner mr-2"></div>}
                    {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src={HeroIcon}
                  alt="PetraX Oil Trading Platform"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                  priority
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 card-glass rounded-xl flex items-center justify-center">
                <Image src={Chart} alt="Chart" width={40} height={40} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 card-glass rounded-xl flex items-center justify-center">
                <Image src={Drum} alt="Oil Drum" width={40} height={40} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="layout">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Why Choose PetraX?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Experience the future of oil trading with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-primary-light)' }}>
                <div className="text-2xl" style={{ color: 'var(--color-primary)' }}>🔗</div>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Blockchain Security
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Built on Internet Computer Protocol for maximum security and transparency
              </p>
            </div>

            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-success-light)' }}>
                <div className="text-2xl" style={{ color: 'var(--color-success)' }}>🤖</div>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                AI-Powered Insights
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Advanced analytics and market predictions to optimize your trading decisions
              </p>
            </div>

            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-warning-light)' }}>
                <div className="text-2xl" style={{ color: 'var(--color-warning)' }}>⚡</div>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Lightning Fast
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Execute trades in milliseconds with our optimized trading engine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary">
        <div className="layout">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">$2.5B+</div>
              <div style={{ color: 'var(--text-muted)' }}>Total Volume Traded</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div style={{ color: 'var(--text-muted)' }}>Active Traders</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
              <div style={{ color: 'var(--text-muted)' }}>Uptime</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div style={{ color: 'var(--text-muted)' }}>Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Preview Section */}
      <section className="py-20 bg-secondary">
        <div className="layout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Advanced Trading Tools
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                Access professional-grade trading tools with real-time market data,
                advanced charting, and AI-powered analytics to make informed decisions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--color-success)' }}>
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>Real-time market data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--color-success)' }}>
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>Advanced charting tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--color-success)' }}>
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>AI-powered insights</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card-glass p-6 rounded-2xl">
                <Image
                  src={TradeIcon}
                  alt="Trading Interface"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-tertiary">
        <div className="layout text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Ready to Start Trading?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Join thousands of traders who trust PetraX for their oil trading needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="btn btn-primary btn-lg">
              Start Trading Now
            </Link>
            <Link href="/trading" className="btn btn-secondary btn-lg">
              View Trading Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
