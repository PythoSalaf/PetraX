import React, { useState, useMemo } from 'react';
import { OilCard } from '@/components';
import { useMarketData } from '@/hooks';
import { OilCategory } from '@/types';
import { OIL_CATEGORIES } from '@/utils';
import { FiSearch, FiFilter } from 'react-icons/fi';

const MarketPlace: React.FC = () => {
  const {
    data,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    totalItems,
    hasData
  } = useMarketData();

  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ searchTerm: e.target.value });
  };

  const handleCategoryChange = (category: OilCategory) => {
    updateFilters({ category });
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  const filteredItemsCount = useMemo(() => totalItems, [totalItems]);

  if (error) {
    return (
      <div className="w-full pt-[4rem] text-white">
        <div className="layout">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Error Loading Marketplace</h2>
            <p className="text-gray-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 custom-gradient px-6 py-2 rounded-lg font-semibold"
            >
              Retry
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
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
            Oil Marketplace
          </h1>
          <p className="text-gray-400">
            Discover and trade premium oil contracts from verified sellers worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for oil types, sellers, locations..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="w-full md:w-[500px] pl-12 pr-4 py-3 rounded-2xl border border-gray-700 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400 w-4 h-4" />
              <span className="text-sm text-gray-400">Filter by:</span>
            </div>

            {OIL_CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filters.category === category.value
                    ? 'bg-purple-600 text-white border border-purple-600'
                    : 'border border-gray-700 text-gray-300 hover:border-purple-500 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}

            {(filters.searchTerm || filters.category !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400 transition-all duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              {loading ? 'Loading...' : `${filteredItemsCount} contracts found`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-800 rounded-2xl h-64 mb-4"></div>
                <div className="bg-gray-800 rounded h-4 mb-2"></div>
                <div className="bg-gray-800 rounded h-3 w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !hasData && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛢️</div>
            <h3 className="text-xl font-semibold mb-2">No contracts found</h3>
            <p className="text-gray-400 mb-6">
              {filters.searchTerm || filters.category !== 'all'
                ? 'Try adjusting your search criteria or filters'
                : 'No oil contracts are currently available'
              }
            </p>
            {(filters.searchTerm || filters.category !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="custom-gradient px-6 py-2 rounded-lg font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Oil Cards Grid */}
        {!loading && hasData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {data.map((item) => (
              <OilCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
