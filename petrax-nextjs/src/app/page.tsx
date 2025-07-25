'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="layout relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="text-4xl font-bold text-gradient">PetraX</div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Trade{' '}
              <span className="text-gradient">oil</span>{' '}
              with{' '}
              <span className="text-gradient">blockchain</span>{' '}
              <span className="text-gradient">technology</span>{' '}
              on ICP
            </h1>

            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Connect your wallet and start trading oil commodities using ICP blockchain technology.
              Track your portfolio and trade with confidence on our secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/marketplace" className="btn btn-primary btn-xl">
                Explore Marketplace
              </Link>
              <Link href="/trading" className="btn btn-outline btn-xl">
                Start Trading
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-secondary">
        <div className="layout">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              How It Works
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Our platform makes oil trading accessible to everyone through a simple three-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                   style={{ backgroundColor: 'var(--color-primary)' }}>
                1
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Browse Oil Markets
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Explore our selection of available oil commodities
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                Browse through a curated selection of oil products from various global markets and refineries.
              </p>
              <Link href="/marketplace" className="btn btn-outline">
                View Marketplace
              </Link>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                   style={{ backgroundColor: 'var(--color-primary)' }}>
                2
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Buy Oil Commodities
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Purchase oil commodities using ICP or other cryptocurrencies
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                Choose from a wide range of oil products and pay with your preferred cryptocurrency. Transactions are secure and executed instantly on the blockchain.
              </p>
              <Link href="/marketplace" className="btn btn-outline">
                View Marketplace
              </Link>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                   style={{ backgroundColor: 'var(--color-primary)' }}>
                3
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Sell & Cash Out
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Sell your oil commodities and receive payment
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                Sell your oil holdings anytime and receive funds in ICP or other cryptocurrencies. Withdrawals are processed within 24 hours.
              </p>
              <Link href="/trading" className="btn btn-outline">
                Manage Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-primary">
        <div className="layout">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Why Choose PetraX?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Secure Platform */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Secure Platform
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                All transactions are encrypted and protected by advanced security protocols.
              </p>
            </div>

            {/* Easy Cash-outs */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Easy and Quick cash-outs
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Go to your dashboard, select the oil commodities you want to sell, and choose your preferred withdrawal method. Funds will be transferred within 24 hours.
              </p>
            </div>

            {/* Transparent Fees */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Transparent Fees
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                There are no hidden fees or monthly charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-secondary">
        <div className="layout">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Cutting-Edge Technology
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Built with innovative technologies for a seamless oil trading experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Oil Market Integration */}
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Global Oil Market Integration
              </h4>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Real-time integration with global oil markets for current commodity pricing.
              </p>
            </div>

            {/* Blockchain Security */}
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                ICP Blockchain Security
              </h4>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Leveraging Internet Computer Protocol blockchain technology to secure oil trading transactions.
              </p>
            </div>

            {/* Crypto Payments */}
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Cryptocurrency Payments
              </h4>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Seamless integration with ICP and other cryptocurrency payment methods for oil trading.
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Fast Execution
              </h5>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Easily Accessible
              </h5>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Secure Platform
              </h5>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Smart Contracts
              </h5>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Oil Trading
              </h5>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Trade oil commodities with cryptocurrency. Accessible oil trading for everyone.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
