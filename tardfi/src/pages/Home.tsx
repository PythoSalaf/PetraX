import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, Drum, HeroIcon, TradeIcon } from '../assets';
import { features, platformFeatures } from '@/components';
import { useWallet } from '@/contexts/WalletContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { wallet, connect } = useWallet();

  const handleWalletConnect = async () => {
    if (!wallet.isConnected) {
      try {
        await connect('internet-identity');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const handleExploreClick = () => {
    navigate('/market-place');
  };

  return (
    <div className="text-white w-full pt-[3rem]">
      <div className="layout">
        {/* Hero Section */}
        <div className="w-full flex items-start justify-between pt-4 md:pt-7 flex-col md:flex-row gap-10">
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl text-gradient lg:text-4xl font-bold leading-[3rem] md:leading-[5rem]">
              Revolutionize Oil Trading <br /> with AI & Web3
            </h1>
            <p className="text-sm md:text-base lg:text-lg py-6 text-gray-300 leading-relaxed">
              Trade oil smarter, faster, and more securely. Experience real-time
              market insights, AI-driven decisions, and a decentralized
              marketplace all in one sleek platform.
            </p>
            <div className="mt-4 flex items-center gap-4 md:gap-8 flex-wrap">
              <button
                onClick={handleWalletConnect}
                disabled={wallet.isConnecting}
                className={`custom-gradient px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  wallet.isConnecting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90 hover:scale-105'
                }`}
              >
                {wallet.isConnecting ? 'Connecting...' :
                 wallet.isConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </button>
              <button
                onClick={handleExploreClick}
                className="border border-gray-400 hover:border-purple-400 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 hover:bg-purple-400/10"
              >
                Explore Marketplace
              </button>
            </div>
          </div>
          <div className="w-full">
            <div className="w-[90%] mx-auto">
              <img
                src={Drum}
                alt="Oil trading platform illustration"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
        {/* Featured Oil Types Section */}
        <section className="my-12">
          <h2 className="text-2xl text-gradient font-semibold md:text-3xl mb-2">
            Featured Oil Types
          </h2>
          <p className="text-gray-400 mb-8">Explore the most traded oil types on our platform</p>
          <div className="w-full grid grid-cols-2 gap-5 md:gap-10 md:grid-cols-4">
            {features.map((item) => (
              <div
                className="w-[90%] mx-auto md:w-[95%] bg-gray-900/50 rounded-xl p-4 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group"
                key={item.id}
              >
                <img
                  src={item.icon}
                  alt={`${item.title} chart`}
                  className="w-full rounded-xl h-[120px] md:h-[140px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-base font-semibold py-2 text-white group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="mt-16 mb-8">
          <h2 className="text-2xl text-gradient font-semibold md:text-3xl mb-2">
            PetraX Features
          </h2>
          <p className="text-gray-400 mb-8">Discover what makes our platform unique</p>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
            {platformFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className="border border-gray-700 hover:border-purple-500 rounded-2xl py-6 px-4 w-[90%] mx-auto md:w-full bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-300 group"
                  key={item.id}
                >
                  <div className="text-center">
                    <div className="text-purple-400 pb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-8 md:size-10" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold py-2 text-white group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mt-16 mb-8 text-center">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 md:p-12 border border-purple-500/20">
            <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who are already using PetraX to revolutionize their oil trading experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleWalletConnect}
                disabled={wallet.isConnecting}
                className={`custom-gradient px-8 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  wallet.isConnecting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90 hover:scale-105'
                }`}
              >
                {wallet.isConnecting ? 'Connecting...' :
                 wallet.isConnected ? 'Start Trading' : 'Connect Wallet to Start'}
              </button>
              <button
                onClick={handleExploreClick}
                className="border border-gray-400 hover:border-purple-400 px-8 py-3 rounded-2xl font-semibold transition-all duration-200 hover:bg-purple-400/10"
              >
                View Marketplace
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
