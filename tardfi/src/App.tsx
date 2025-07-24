import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from '@/components';
import { Home, MarketPlace, Trade } from '@/pages';
import { WalletProvider } from '@/contexts/WalletContext';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <div className="flex flex-col min-h-screen w-full bg-[#030710]">
        <Navbar />

        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market-place" element={<MarketPlace />} />
            <Route path="/trade/:id" element={<Trade />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </WalletProvider>
  );
};

export default App;
