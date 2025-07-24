import React, { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { truncateAddress } from '@/utils';

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { wallet, connect, disconnect } = useWallet();

  const handleWalletAction = async () => {
    if (wallet.isConnected) {
      await disconnect();
    } else {
      try {
        await connect('internet-identity');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const getWalletButtonText = (): string => {
    if (wallet.isConnecting) return 'Connecting...';
    if (wallet.isConnected && wallet.accountId) {
      return truncateAddress(wallet.accountId);
    }
    return 'Connect Wallet';
  };

  return (
    <div className="w-full fixed h-12 md:h-16 flex shadow items-center bg-[#030710] z-50">
      <div className="layout flex items-center justify-between">
        <Link to="/" className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
          PetraX
        </Link>

        <div className="hidden text-white md:flex items-center gap-x-6 bg-gray-900 rounded-3xl py-2 px-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-purple-400 transition-colors ${isActive ? 'text-purple-400' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/market-place"
            className={({ isActive }) =>
              `hover:text-purple-400 transition-colors ${isActive ? 'text-purple-400' : ''}`
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/buy"
            className={({ isActive }) =>
              `hover:text-purple-400 transition-colors ${isActive ? 'text-purple-400' : ''}`
            }
          >
            Buy
          </NavLink>
          <NavLink
            to="/sell"
            className={({ isActive }) =>
              `hover:text-purple-400 transition-colors ${isActive ? 'text-purple-400' : ''}`
            }
          >
            Sell
          </NavLink>
        </div>

        <div className="hidden md:flex items-center md:gap-x-8 lg:gap-x-12">
          <button
            onClick={handleWalletAction}
            disabled={wallet.isConnecting}
            className={`text-white font-semibold rounded-full px-4 py-2 transition-all duration-200 ${
              wallet.isConnected
                ? 'bg-green-600 hover:bg-green-700'
                : 'custom-gradient hover:opacity-90'
            } ${wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {getWalletButtonText()}
          </button>
        </div>

        <div
          className="block md:hidden text-white cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <IoMdClose className="size-8" />
          ) : (
            <IoMenuOutline className="size-8" />
          )}
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <div className="absolute top-12 md:top-16 left-0 w-full bg-[#030710] border-t border-gray-800 md:hidden">
            <div className="layout py-4">
              <div className="flex flex-col gap-4 text-white">
                <NavLink
                  to="/"
                  onClick={() => setToggle(false)}
                  className="hover:text-purple-400 transition-colors"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/market-place"
                  onClick={() => setToggle(false)}
                  className="hover:text-purple-400 transition-colors"
                >
                  Marketplace
                </NavLink>
                <NavLink
                  to="/buy"
                  onClick={() => setToggle(false)}
                  className="hover:text-purple-400 transition-colors"
                >
                  Buy
                </NavLink>
                <NavLink
                  to="/sell"
                  onClick={() => setToggle(false)}
                  className="hover:text-purple-400 transition-colors"
                >
                  Sell
                </NavLink>
                <button
                  onClick={() => {
                    handleWalletAction();
                    setToggle(false);
                  }}
                  disabled={wallet.isConnecting}
                  className={`text-left text-white font-semibold rounded-full px-4 py-2 transition-all duration-200 ${
                    wallet.isConnected
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'custom-gradient hover:opacity-90'
                  } ${wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {getWalletButtonText()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
