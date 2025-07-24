'use client';

import React, { useState } from 'react';
import { OilCard } from '@/components';
import { marketData } from '@/lib/data';
import { useDebounce } from '@/hooks';

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredData = marketData.filter(item => {
    const matchesSearch = item.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         item.seller.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    // Simple category filtering based on oil type
    const categoryMatch = selectedCategory === 'brent' ? item.location.includes('Brent') :
                         selectedCategory === 'wti' ? item.location.includes('West Texas') :
                         selectedCategory === 'dubai' ? item.location.includes('Dubai') :
                         selectedCategory === 'opec' ? item.location.includes('OPEC') :
                         true;
    
    return matchesSearch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="layout">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Oil <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-300">
            Discover and trade premium oil contracts from verified sellers worldwide
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-6">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by location or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="brent">Brent Crude</option>
              <option value="wti">West Texas Intermediate</option>
              <option value="dubai">Dubai Crude</option>
              <option value="opec">OPEC Basket</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredData.length} of {marketData.length} contracts
          </p>
        </div>

        {/* Oil Cards Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((oil) => (
              <OilCard key={oil.id} {...oil} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No contracts found</h3>
            <p className="text-gray-400">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-gradient mb-2">
              {marketData.length}+
            </div>
            <div className="text-gray-400">Active Contracts</div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-gradient mb-2">
              ${Math.round(marketData.reduce((sum, item) => sum + (item.price || 0), 0) / marketData.length)}
            </div>
            <div className="text-gray-400">Avg. Price/Barrel</div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-gradient mb-2">
              {new Set(marketData.map(item => item.seller)).size}+
            </div>
            <div className="text-gray-400">Verified Sellers</div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-gradient mb-2">
              24/7
            </div>
            <div className="text-gray-400">Market Access</div>
          </div>
        </div>
      </div>
    </div>
  );
}
