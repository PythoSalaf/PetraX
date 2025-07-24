'use client';

import { useState, useEffect, useCallback } from 'react';
import type { MarketData, ChartData } from '@/types';

interface UseMarketDataReturn {
  marketData: MarketData[];
  chartData: ChartData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMarketData(): UseMarketDataReturn {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock data for now - replace with actual API calls
      const mockMarketData: MarketData[] = [
        {
          id: 1,
          location: 'Texas, USA',
          seller: 'PetroTech Corp',
          quantity: '50,000 barrels',
          icon: '/assets/drum.png',
          price: 75.50,
          currency: 'USD',
          lastUpdated: new Date(),
        },
        {
          id: 2,
          location: 'Alberta, Canada',
          seller: 'Northern Oil Ltd',
          quantity: '75,000 barrels',
          icon: '/assets/drum.png',
          price: 72.25,
          currency: 'USD',
          lastUpdated: new Date(),
        },
        {
          id: 3,
          location: 'North Sea, UK',
          seller: 'Atlantic Energy',
          quantity: '100,000 barrels',
          icon: '/assets/drum.png',
          price: 78.90,
          currency: 'USD',
          lastUpdated: new Date(),
        },
      ];

      const mockChartData: ChartData[] = generateMockChartData();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMarketData(mockMarketData);
      setChartData(mockChartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  return {
    marketData,
    chartData,
    isLoading,
    error,
    refetch,
  };
}

function generateMockChartData(): ChartData[] {
  const data: ChartData[] = [];
  const now = new Date();
  const basePrice = 75;

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const randomChange = (Math.random() - 0.5) * 5;
    const price = basePrice + randomChange;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: price,
      high: price + Math.random() * 2,
      low: price - Math.random() * 2,
      close: price + (Math.random() - 0.5) * 1,
    });
  }

  return data;
}
