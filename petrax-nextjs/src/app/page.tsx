'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { toast } from 'sonner';
import { useWallet } from '@/contexts';
import { IconTrendingUp, IconShield, IconBolt, IconGlobe, IconArrowRight } from '@tabler/icons-react';

// Stats data
const stats = [
  { label: 'Volume Traded', value: '$2.5B+', icon: IconTrendingUp },
  { label: 'Active Traders', value: '50K+', icon: IconGlobe },
  { label: 'Uptime', value: '99.9%', icon: IconShield },
  { label: 'Transactions', value: '1M+', icon: IconBolt },
];

export default function HomePage() {
  const { wallet } = useWallet();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    if (!wallet.isConnected) {
      toast.info('Connect your wallet to get started', {
        description: 'You need to connect your ICP wallet to start trading oil commodities.',
        duration: 4000,
      });
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-20">
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y, opacity }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </motion.div>

        <div className="layout relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Logo with Animation */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl font-bold text-gradient">PetraX</div>
            </motion.div>

            {/* Main Heading with Stagger Animation */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Trade{' '}
              <span className="text-gradient">oil</span>{' '}
              with{' '}
              <span className="text-gradient">blockchain</span>{' '}
              <span className="text-gradient">technology</span>{' '}
              on ICP
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Connect your wallet and start trading oil commodities using ICP blockchain technology.
              Track your portfolio and trade with confidence on our secure platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/marketplace"
                className="btn btn-primary btn-xl group"
                onClick={handleGetStarted}
              >
                Explore Marketplace
                <IconArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/trading" className="btn btn-outline btn-xl">
                Start Trading
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                      <stat.icon className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-secondary">
        <div className="layout">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              How It Works
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Our platform makes oil trading accessible to everyone through a simple three-step process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Step 1 */}
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'var(--color-primary)' }}
                whileHover={{ scale: 1.1 }}
              >
                1
              </motion.div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Browse Oil Markets
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Explore our selection of available oil commodities
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                Browse through a curated selection of oil products from various global markets and refineries.
              </p>
              <Link href="/marketplace" className="btn btn-outline group">
                View Marketplace
                <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'var(--color-primary)' }}
                whileHover={{ scale: 1.1 }}
              >
                2
              </motion.div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Buy Oil Commodities
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Purchase oil commodities using ICP or other cryptocurrencies
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                Choose from a wide range of oil products and pay with your preferred cryptocurrency. Transactions are secure and executed instantly on the blockchain.
              </p>
              <Link href="/marketplace" className="btn btn-outline group">
                View Marketplace
                <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'var(--color-primary)' }}
                whileHover={{ scale: 1.1 }}
              >
                3
              </motion.div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Sell & Cash Out
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Sell your oil commodities and receive payment
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                Sell your oil holdings anytime and receive funds in ICP or other cryptocurrencies. Withdrawals are processed within 24 hours.
              </p>
              <Link href="/trading" className="btn btn-outline group">
                Manage Portfolio
                <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-primary">
        <div className="layout">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Why Choose PetraX?
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Experience the future of oil trading with our cutting-edge platform built for professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Secure Platform */}
            <motion.div
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                <IconShield className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Secure Platform
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                All transactions are encrypted and protected by advanced security protocols powered by ICP blockchain technology.
              </p>
            </motion.div>

            {/* Easy Cash-outs */}
            <motion.div
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--color-success-light)' }}>
                <IconBolt className="h-8 w-8" style={{ color: 'var(--color-success)' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Lightning Fast
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Execute trades instantly and cash out within 24 hours. Our platform ensures quick and efficient transactions.
              </p>
            </motion.div>

            {/* Transparent Fees */}
            <motion.div
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--color-secondary-light)' }}>
                <IconTrendingUp className="h-8 w-8" style={{ color: 'var(--color-secondary)' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Transparent Fees
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                No hidden fees or monthly charges. What you see is what you pay, with competitive rates for all traders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-secondary">
        <div className="layout">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Cutting-Edge Technology
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Built with innovative technologies for a seamless oil trading experience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Oil Market Integration */}
            <motion.div
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                <IconGlobe className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Global Oil Market Integration
              </h4>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Real-time integration with global oil markets for current commodity pricing.
              </p>
            </motion.div>

            {/* Blockchain Security */}
            <motion.div
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-success-light)' }}>
                <IconShield className="h-6 w-6" style={{ color: 'var(--color-success)' }} />
              </div>
              <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                ICP Blockchain Security
              </h4>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Leveraging Internet Computer Protocol blockchain technology to secure oil trading transactions.
              </p>
            </motion.div>

            {/* Crypto Payments */}
            <motion.div
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary-light)' }}>
                <IconBolt className="h-6 w-6" style={{ color: 'var(--color-secondary)' }} />
              </div>
              <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Cryptocurrency Payments
              </h4>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Seamless integration with ICP and other cryptocurrency payment methods for oil trading.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {['Fast Execution', 'Easily Accessible', 'Secure Platform', 'Smart Contracts', 'Oil Trading'].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {feature}
                </h5>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Trade oil commodities with cryptocurrency. Accessible oil trading for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="layout">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Trading Oil?
            </h2>
            <p className="text-xl mb-12 leading-relaxed opacity-90">
              Join thousands of traders who trust PetraX for secure, transparent, and efficient oil commodity trading on the blockchain.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href="/marketplace"
                className="btn bg-white text-blue-600 hover:bg-gray-100 btn-xl group"
                onClick={handleGetStarted}
              >
                Get Started Now
                <IconArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/trading"
                className="btn border-white text-white hover:bg-white hover:text-blue-600 btn-xl"
              >
                View Trading Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
