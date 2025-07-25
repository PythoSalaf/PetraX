'use client';

import React from 'react';
import { useWallet } from '@/contexts';
import { toast } from 'sonner';

export default function TestPage() {
  const { wallet, connect, disconnect } = useWallet();

  const handleConnect = async () => {
    try {
      await connect('internet-identity');
      toast.success('Wallet connected successfully!', {
        description: 'Connected to Internet Identity',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet', {
        description: 'Please try again or check your wallet extension.',
        duration: 4000,
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success('Wallet disconnected successfully!', {
        description: 'You have been logged out',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet', {
        description: 'Please try again.',
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 md:pt-20 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">
          Wallet Connection Test
        </h1>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleConnect}
            disabled={wallet.isConnecting}
            className={`
              px-8 py-4 rounded-xl font-semibold text-white
              transition-all duration-200 shadow-lg
              ${wallet.isConnecting
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:scale-105'
              }
            `}
          >
            {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>

          <button
            onClick={handleDisconnect}
            disabled={!wallet.isConnected}
            className={`
              px-8 py-4 rounded-xl font-semibold text-white
              transition-all duration-200 shadow-lg
              ${!wallet.isConnected
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : 'bg-red-600 hover:bg-red-700 hover:shadow-xl hover:scale-105'
              }
            `}
          >
            Disconnect Wallet
          </button>
        </div>

        {wallet.isConnected && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ Wallet Connected!
            </p>
            <p className="text-green-600 text-sm mt-1">
              Account: {wallet.accountId}
            </p>
          </div>
        )}

        {wallet.error && (
          <div className="mt-6 p-4 bg-red-100 rounded-lg">
            <p className="text-red-800 font-medium">
              ❌ Connection Error
            </p>
            <p className="text-red-600 text-sm mt-1">
              {wallet.error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
