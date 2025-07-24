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
    <div className="min-h-screen bg-primary py-8">
      <div className="layout">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Oil <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Discover and trade premium oil contracts from verified sellers worldwide
          </p>
        </div>

        {/* Enhanced Filters */}
        <div className="mb-8">
          <div className="card-glass p-6 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Search Contracts
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by location or seller..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input pl-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-lg" style={{ color: 'var(--text-muted)' }}>🔍</span>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Oil Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="all">All Types</option>
                  <option value="brent">Brent Crude</option>
                  <option value="wti">West Texas Intermediate</option>
                  <option value="dubai">Dubai Crude</option>
                  <option value="opec">OPEC Basket</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count & Quick Stats */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p style={{ color: 'var(--text-muted)' }}>
              Showing <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{filteredData.length}</span> of {marketData.length} contracts
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-sm font-semibold text-gradient">
                ${Math.round(marketData.reduce((sum, item) => sum + (item.price || 0), 0) / marketData.length)}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Avg. Price</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gradient">
                {new Set(marketData.map(item => item.seller)).size}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Sellers</div>
            </div>
          </div>
        </div>

        {/* Oil Cards Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredData.map((oil) => (
              <OilCard key={oil.id} {...oil} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: 'var(--background-tertiary)' }}>
              <span className="text-4xl" style={{ color: 'var(--text-muted)' }}>🔍</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              No contracts found
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn btn-outline mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Enhanced Stats Section */}
        <div className="bg-secondary rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Marketplace Statistics
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Real-time insights into our global oil trading marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-primary-light)' }}>
                <span className="text-xl" style={{ color: 'var(--color-primary)' }}>📊</span>
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {marketData.length}+
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Active Contracts</div>
            </div>

            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-success-light)' }}>
                <span className="text-xl" style={{ color: 'var(--color-success)' }}>💰</span>
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">
                ${Math.round(marketData.reduce((sum, item) => sum + (item.price || 0), 0) / marketData.length)}
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Avg. Price/Barrel</div>
            </div>

            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-warning-light)' }}>
                <span className="text-xl" style={{ color: 'var(--color-warning)' }}>👥</span>
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {new Set(marketData.map(item => item.seller)).size}+
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Verified Sellers</div>
            </div>

            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'var(--color-primary-light)' }}>
                <span className="text-xl" style={{ color: 'var(--color-primary)' }}>🕒</span>
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">
                24/7
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Market Access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
