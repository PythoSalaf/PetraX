'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroIcon, TradeIcon } from '../../public/assets';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="layout relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ color: 'var(--text-primary)' }}>
              The Future of{' '}
              <span className="text-gradient">Oil Trading</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Professional oil trading platform powered by blockchain technology.
              Trade with confidence, transparency, and security.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/marketplace" className="btn btn-primary btn-xl">
                View Marketplace
              </Link>
              <Link href="/trading" className="btn btn-outline btn-xl">
                Start Trading
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative">
              <Image
                src={HeroIcon}
                alt="PetraX Oil Trading Platform"
                width={800}
                height={500}
                className="rounded-3xl shadow-2xl w-full"
                priority
              />
              {/* Floating Stats */}
              <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-gradient">$2.5B+</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Volume Traded</div>
              </div>
              <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-gradient">50K+</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Active Traders</div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-gradient">99.9%</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary">
        <div className="layout">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Why Choose PetraX?
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Professional-grade oil trading platform with enterprise security and cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-primary-light)' }}>
                <div className="text-3xl" style={{ color: 'var(--color-primary)' }}>🔒</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Enterprise Security
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Bank-grade security with blockchain transparency and multi-layer protection
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-success-light)' }}>
                <div className="text-3xl" style={{ color: 'var(--color-success)' }}>📊</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Real-Time Analytics
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Advanced market insights and AI-powered predictions for informed trading
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-secondary-light)' }}>
                <div className="text-3xl" style={{ color: 'var(--color-secondary)' }}>⚡</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Instant Execution
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Lightning-fast trade execution with minimal latency and maximum efficiency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Platform Section */}
      <section className="py-24 bg-primary">
        <div className="layout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-2 shadow-2xl">
                <Image
                  src={TradeIcon}
                  alt="Trading Interface"
                  width={600}
                  height={400}
                  className="rounded-2xl w-full"
                  unoptimized
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                Professional Trading Platform
              </h2>
              <p className="text-xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Access institutional-grade trading tools with real-time market data,
                advanced analytics, and seamless execution.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ backgroundColor: 'var(--color-success)' }}>
                    <span className="text-sm text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      Real-Time Market Data
                    </h4>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Live pricing and market movements updated every second
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ backgroundColor: 'var(--color-success)' }}>
                    <span className="text-sm text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      Advanced Analytics
                    </h4>
                    <p style={{ color: 'var(--text-muted)' }}>
                      AI-powered insights and predictive market analysis
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ backgroundColor: 'var(--color-success)' }}>
                    <span className="text-sm text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      Instant Execution
                    </h4>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Lightning-fast order processing and settlement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="layout text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Ready to Start Trading?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Join thousands of professional traders who trust PetraX for secure,
            transparent, and efficient oil trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/marketplace" className="btn btn-primary btn-xl">
              Explore Marketplace
            </Link>
            <Link href="/trading" className="btn btn-outline btn-xl">
              Start Trading Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
