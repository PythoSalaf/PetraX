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
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="layout py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
          <p className="text-gray-400">Trade oil futures and derivatives with advanced tools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Pairs */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Trading Pairs</h2>
              <div className="space-y-3">
                {tradingPairs.map((pair) => (
                  <div
                    key={pair.symbol}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPair === pair.symbol
                        ? 'bg-purple-600/20 border border-purple-500'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedPair(pair.symbol)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{pair.symbol}</div>
                        <div className="text-sm text-gray-400">{pair.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">${pair.price}</div>
                        <div className={`text-sm ${pair.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Place Order</h2>
              
              {!wallet.isConnected && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                  <p className="text-yellow-400">Please connect your wallet to start trading</p>
                </div>
              )}

              <form onSubmit={handleSubmitOrder} className="space-y-6">
                {/* Order Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Order Type
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setOrderType('market')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        orderType === 'market'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Market
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('limit')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        orderType === 'limit'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Limit
                    </button>
                  </div>
                </div>

                {/* Buy/Sell */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Side
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setSide('buy')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        side === 'buy'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setSide('sell')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        side === 'sell'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Sell
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                    Amount (Barrels)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter amount"
                    required
                  />
                </div>

                {/* Price (for limit orders) */}
                {orderType === 'limit' && (
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    wallet.isConnected
                      ? side === 'buy'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {wallet.isConnected
                    ? `${side === 'buy' ? 'Buy' : 'Sell'} ${selectedPair}`
                    : 'Connect Wallet to Trade'
                  }
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$2.1M</div>
                <div className="text-gray-400">24h Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">156</div>
                <div className="text-gray-400">Active Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">$78.45</div>
                <div className="text-gray-400">WTI Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">+2.34%</div>
                <div className="text-gray-400">24h Change</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
