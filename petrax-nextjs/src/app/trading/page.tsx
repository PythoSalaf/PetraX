'use client';

import React, { useState } from 'react';
import { useWallet } from '@/contexts';

export default function TradingPage() {
  const { wallet } = useWallet();
  const [selectedPair, setSelectedPair] = useState('WTI/USD');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const tradingPairs = [
    { symbol: 'WTI/USD', name: 'West Texas Intermediate', price: 78.45, change: 2.34 },
    { symbol: 'BRENT/USD', name: 'Brent Crude Oil', price: 82.15, change: -1.23 },
    { symbol: 'DUBAI/USD', name: 'Dubai Crude Oil', price: 80.67, change: 1.89 },
  ];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    
    console.log('Order submitted:', {
      pair: selectedPair,
      type: orderType,
      side,
      amount,
      price: orderType === 'limit' ? price : 'market',
    });
    
    alert('Order submitted successfully! (Demo mode)');
  };

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="layout py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Trading <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Trade oil futures and derivatives with advanced tools
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Trading Pairs */}
          <div className="xl:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Trading Pairs
                </h2>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-success)' }}></div>
              </div>
              <div className="space-y-2">
                {tradingPairs.map((pair) => (
                  <div
                    key={pair.symbol}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                      selectedPair === pair.symbol
                        ? 'border-primary/50 shadow-lg'
                        : 'border-transparent hover:border-primary/30'
                    }`}
                    style={{
                      backgroundColor: selectedPair === pair.symbol
                        ? 'var(--color-primary-light)'
                        : 'var(--background-tertiary)'
                    }}
                    onClick={() => setSelectedPair(pair.symbol)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold" style={{
                          color: selectedPair === pair.symbol
                            ? 'var(--color-primary)'
                            : 'var(--text-primary)'
                        }}>
                          {pair.symbol}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {pair.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          ${pair.price}
                        </div>
                        <div className={`text-sm font-medium ${pair.change >= 0 ? 'status-positive' : 'status-negative'}`}>
                          {pair.change >= 0 ? '+' : ''}{pair.change}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trading Form */}
          <div className="xl:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Place Order
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-success)' }}></div>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Live Market</span>
                </div>
              </div>

              {!wallet.isConnected && (
                <div className="p-4 mb-6 rounded-xl border"
                     style={{
                       backgroundColor: 'var(--color-warning-light)',
                       borderColor: 'var(--color-warning)',
                       color: 'var(--color-warning)'
                     }}>
                  <div className="flex items-center space-x-2">
                    <span>⚠️</span>
                    <p className="font-medium">Please connect your wallet to start trading</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitOrder} className="space-y-6">
                {/* Order Type */}
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                    Order Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderType('market')}
                      className={`p-3 rounded-xl font-medium transition-all duration-200 border ${
                        orderType === 'market'
                          ? 'border-primary/50 shadow-lg'
                          : 'border-transparent hover:border-primary/30'
                      }`}
                      style={{
                        backgroundColor: orderType === 'market'
                          ? 'var(--color-primary-light)'
                          : 'var(--background-tertiary)',
                        color: orderType === 'market'
                          ? 'var(--color-primary)'
                          : 'var(--text-secondary)'
                      }}
                    >
                      Market Order
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('limit')}
                      className={`p-3 rounded-xl font-medium transition-all duration-200 border ${
                        orderType === 'limit'
                          ? 'border-primary/50 shadow-lg'
                          : 'border-transparent hover:border-primary/30'
                      }`}
                      style={{
                        backgroundColor: orderType === 'limit'
                          ? 'var(--color-primary-light)'
                          : 'var(--background-tertiary)',
                        color: orderType === 'limit'
                          ? 'var(--color-primary)'
                          : 'var(--text-secondary)'
                      }}
                    >
                      Limit Order
                    </button>
                  </div>
                </div>

                {/* Buy/Sell */}
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                    Order Side
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSide('buy')}
                      className={`p-3 rounded-xl font-medium transition-all duration-200 border ${
                        side === 'buy'
                          ? 'border-success/50 shadow-lg'
                          : 'border-transparent hover:border-success/30'
                      }`}
                      style={{
                        backgroundColor: side === 'buy'
                          ? 'var(--color-success-light)'
                          : 'var(--background-tertiary)',
                        color: side === 'buy'
                          ? 'var(--color-success)'
                          : 'var(--text-secondary)'
                      }}
                    >
                      🟢 Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setSide('sell')}
                      className={`p-3 rounded-xl font-medium transition-all duration-200 border ${
                        side === 'sell'
                          ? 'border-error/50 shadow-lg'
                          : 'border-transparent hover:border-error/30'
                      }`}
                      style={{
                        backgroundColor: side === 'sell'
                          ? 'var(--color-error-light)'
                          : 'var(--background-tertiary)',
                        color: side === 'sell'
                          ? 'var(--color-error)'
                          : 'var(--text-secondary)'
                      }}
                    >
                      🔴 Sell
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Amount (Barrels)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-input"
                    placeholder="Enter amount"
                    required
                  />
                </div>

                {/* Price (for limit orders) */}
                {orderType === 'limit' && (
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-input"
                      placeholder="Enter price"
                      step="0.01"
                      required
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!wallet.isConnected}
                  className={`btn w-full py-4 text-lg font-semibold ${
                    wallet.isConnected
                      ? side === 'buy'
                        ? 'btn-success'
                        : 'btn-error'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{
                    backgroundColor: !wallet.isConnected
                      ? 'var(--background-tertiary)'
                      : undefined,
                    color: !wallet.isConnected
                      ? 'var(--text-muted)'
                      : undefined
                  }}
                >
                  {wallet.isConnected
                    ? `${side === 'buy' ? '🟢 Buy' : '🔴 Sell'} ${selectedPair}`
                    : '🔗 Connect Wallet to Trade'
                  }
                </button>
              </form>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="xl:col-span-1">
            <div className="card h-full">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Price Chart
              </h2>
              <div className="h-64 rounded-xl flex items-center justify-center"
                   style={{ backgroundColor: 'var(--background-tertiary)' }}>
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p style={{ color: 'var(--text-muted)' }}>Chart coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="mt-8">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Market Overview
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-success)' }}></div>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Live Data</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--background-tertiary)' }}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--color-success-light)' }}>
                  <span className="text-xl" style={{ color: 'var(--color-success)' }}>💰</span>
                </div>
                <div className="text-2xl font-bold text-gradient mb-1">$2.1M</div>
                <div style={{ color: 'var(--text-muted)' }}>24h Volume</div>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--background-tertiary)' }}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--color-primary-light)' }}>
                  <span className="text-xl" style={{ color: 'var(--color-primary)' }}>📊</span>
                </div>
                <div className="text-2xl font-bold text-gradient mb-1">156</div>
                <div style={{ color: 'var(--text-muted)' }}>Active Orders</div>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--background-tertiary)' }}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--color-warning-light)' }}>
                  <span className="text-xl" style={{ color: 'var(--color-warning)' }}>🛢️</span>
                </div>
                <div className="text-2xl font-bold text-gradient mb-1">$78.45</div>
                <div style={{ color: 'var(--text-muted)' }}>WTI Price</div>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--background-tertiary)' }}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--color-success-light)' }}>
                  <span className="text-xl" style={{ color: 'var(--color-success)' }}>📈</span>
                </div>
                <div className="text-2xl font-bold status-positive mb-1">+2.34%</div>
                <div style={{ color: 'var(--text-muted)' }}>24h Change</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
