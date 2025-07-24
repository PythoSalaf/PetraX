import { useState, useEffect, useCallback } from 'react';
import { MarketData, FilterOptions, LoadingState } from '@/types';
import { useDebounce } from './useDebounce';

// Mock data - in a real app, this would come from an API
const mockMarketData: MarketData[] = [
  {
    id: 1,
    location: 'West Texas Intermediate',
    seller: 'Global Energy Ltd.',
    quantity: '3000',
    icon: '/src/assets/chart.png',
    price: 75.50,
    currency: 'USD',
    lastUpdated: new Date(),
  },
  {
    id: 2,
    location: 'Brent Crude',
    seller: 'North Sea Oil Co.',
    quantity: '2500',
    icon: '/src/assets/icon.jpeg',
    price: 78.20,
    currency: 'USD',
    lastUpdated: new Date(),
  },
  // Add more mock data as needed
];

/**
 * Custom hook for managing market data with filtering and search
 */
export function useMarketData() {
  const [data, setData] = useState<MarketData[]>([]);
  const [filteredData, setFilteredData] = useState<MarketData[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    searchTerm: '',
  });

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  // Fetch market data
  const fetchMarketData = useCallback(async () => {
    setLoadingState({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockMarketData);
      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch market data';
      setLoadingState({ isLoading: false, error: errorMessage });
    }
  }, []);

  // Filter data based on current filters
  const filterData = useCallback(() => {
    let filtered = [...data];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => {
        const location = item.location.toLowerCase();
        switch (filters.category) {
          case 'crude':
            return location.includes('crude') || location.includes('wti') || location.includes('brent');
          case 'refined':
            return location.includes('refined') || location.includes('gasoline') || location.includes('diesel');
          case 'synthetic':
            return location.includes('synthetic') || location.includes('bitumen');
          default:
            return true;
        }
      });
    }

    // Filter by search term
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.location.toLowerCase().includes(searchLower) ||
        item.seller.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(item =>
        item.price &&
        item.price >= filters.priceRange!.min &&
        item.price <= filters.priceRange!.max
      );
    }

    // Filter by location
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(item =>
        item.location.toLowerCase().includes(locationLower)
      );
    }

    setFilteredData(filtered);
  }, [data, filters, debouncedSearchTerm]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      category: 'all',
      searchTerm: '',
    });
  }, []);

  // Refresh data
  const refreshData = useCallback(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  // Get item by ID
  const getItemById = useCallback((id: number): MarketData | undefined => {
    return data.find(item => item.id === id);
  }, [data]);

  // Initial data fetch
  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  // Filter data when filters or data change
  useEffect(() => {
    filterData();
  }, [filterData]);

  return {
    data: filteredData,
    allData: data,
    loading: loadingState.isLoading,
    error: loadingState.error,
    filters,
    updateFilters,
    resetFilters,
    refreshData,
    getItemById,
    totalItems: filteredData.length,
    hasData: filteredData.length > 0,
  };
}
