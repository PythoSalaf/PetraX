import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chart, TradePercentageSelector } from '@/components';
import { useMarketData } from '@/hooks';
import { useWallet } from '@/contexts/WalletContext';
import { MarketData } from '@/types';
import { formatCurrency, formatOilQuantity, isValidTradeQuantity, isValidPrice } from '@/utils';
import { FiArrowLeft, FiInfo, FiTrendingUp } from 'react-icons/fi';

type OrderType = 'limit' | 'market' | 'conditional';
type ViewMode = 'chart' | 'info' | 'trading-data';

const Trade: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getItemById } = useMarketData();
  const { wallet } = useWallet();

  const [oilData, setOilData] = useState<MarketData | null>(null);
  const [orderType, setOrderType] = useState<OrderType>('limit');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const [orderValue, setOrderValue] = useState<string>('');
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const data = getItemById(parseInt(id));
      setOilData(data || null);
    }
  }, [id, getItemById]);

  const handleOrderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setOrderValue(value);
    }
  };

  const handlePercentageSelect = (percentage: number) => {
    setSelectedPercentage(percentage);
    // Calculate order value based on percentage of available balance
    if (wallet.balance) {
      const calculatedValue = (wallet.balance * percentage) / 100;
      setOrderValue(calculatedValue.toFixed(2));
    }
  };

  const handlePlaceOrder = async () => {
    if (!wallet.isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!orderValue || !isValidTradeQuantity(orderValue)) {
      alert('Please enter a valid order amount');
      return;
    }

    if (orderType === 'limit' && oilData?.price && !isValidPrice(oilData.price)) {
      alert('Invalid price for limit order');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`${orderType.charAt(0).toUpperCase() + orderType.slice(1)} order placed successfully!`);
      setOrderValue('');
      setSelectedPercentage(null);
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/market-place');
  };

  if (!oilData) {
    return (
      <div className="w-full pt-[4rem] text-white">
        <div className="layout">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Oil Contract Not Found</h2>
            <p className="text-gray-400 mb-6">The requested oil contract could not be found.</p>
            <button
              onClick={handleBackClick}
              className="custom-gradient px-6 py-2 rounded-lg font-semibold"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-[4rem] text-white min-h-screen">
      <div className="layout">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </button>

          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gradient mb-2">
                  {oilData.location}
                </h1>
                <p className="text-gray-400">Seller: {oilData.seller}</p>
              </div>
              <div className="flex flex-col md:items-end gap-2">
                <div className="text-2xl font-bold text-green-400">
                  {oilData.price ? formatCurrency(oilData.price) : 'Price on request'}
                </div>
                <div className="text-sm text-gray-400">
                  Available: {formatOilQuantity(oilData.quantity)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Trading Interface */}
        <div className="w-full flex items-start flex-col lg:flex-row gap-6">
          {/* Chart Section */}
          <div className="w-full lg:w-[70%] bg-gray-900/50 rounded-lg overflow-hidden">
            <div className="p-4">
              {/* View Mode Tabs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {(['chart', 'info', 'trading-data'] as ViewMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
                        viewMode === mode
                          ? 'text-purple-400 bg-purple-400/10'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {mode === 'chart' && 'Chart'}
                      {mode === 'info' && 'Info'}
                      {mode === 'trading-data' && 'Trading Data'}
                    </button>
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-3">
                  <button className="text-xs text-gray-400 hover:text-white transition-colors">
                    Standard
                  </button>
                  <button className="text-xs text-gray-400 hover:text-white transition-colors">
                    TradingView
                  </button>
                  <button className="text-xs text-gray-400 hover:text-white transition-colors">
                    Depth
                  </button>
                </div>
              </div>

              {/* Content based on view mode */}
              {viewMode === 'chart' && (
                <div className="mt-4">
                  <Chart />
                </div>
              )}

              {viewMode === 'info' && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Contract Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span>{oilData.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Seller:</span>
                          <span>{oilData.seller}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Quantity:</span>
                          <span>{formatOilQuantity(oilData.quantity)}</span>
                        </div>
                        {oilData.price && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Price per barrel:</span>
                            <span className="text-green-400">{formatCurrency(oilData.price)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Market Info</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Updated:</span>
                          <span>{oilData.lastUpdated ? new Date(oilData.lastUpdated).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Currency:</span>
                          <span>{oilData.currency || 'USD'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'trading-data' && (
                <div className="mt-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-4">Recent Trading Activity</h3>
                    <div className="text-center text-gray-400 py-8">
                      <FiTrendingUp className="w-8 h-8 mx-auto mb-2" />
                      <p>Trading data will be available soon</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trading Panel */}
          <div className="w-full lg:w-[30%] bg-gray-900/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gradient">
              Place Order
            </h2>

            {/* Order Type Selection */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                {(['limit', 'market', 'conditional'] as OrderType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`text-sm font-medium px-3 py-2 rounded transition-colors ${
                      orderType === type
                        ? 'text-white bg-purple-600'
                        : 'text-gray-400 hover:text-white border border-gray-600'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Value Input */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Order Amount ({oilData.currency || 'USD'})
              </label>
              <input
                type="text"
                value={orderValue}
                onChange={handleOrderValueChange}
                placeholder="Enter amount"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              />
              {orderValue && oilData.price && (
                <p className="text-xs text-gray-400 mt-2">
                  ≈ {(parseFloat(orderValue) / oilData.price).toFixed(2)} barrels
                </p>
              )}
            </div>

            {/* Percentage Selector */}
            <TradePercentageSelector
              onSelect={handlePercentageSelect}
              selectedPercentage={selectedPercentage}
              disabled={!wallet.isConnected}
            />

            {/* Wallet Connection Status */}
            {!wallet.isConnected && (
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <FiInfo className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">Connect wallet to place orders</span>
                </div>
              </div>
            )}

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={!wallet.isConnected || !orderValue || isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                !wallet.isConnected || !orderValue || isLoading
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'custom-gradient text-white hover:opacity-90 hover:scale-105'
              }`}
            >
              {isLoading ? 'Placing Order...' : `Place ${orderType.charAt(0).toUpperCase() + orderType.slice(1)} Order`}
            </button>

            {/* Order Summary */}
            {orderValue && oilData.price && (
              <div className="mt-6 bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span>{formatCurrency(parseFloat(orderValue))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Quantity:</span>
                    <span>{(parseFloat(orderValue) / oilData.price).toFixed(2)} barrels</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price per barrel:</span>
                    <span>{formatCurrency(oilData.price)}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-green-400">{formatCurrency(parseFloat(orderValue))}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
