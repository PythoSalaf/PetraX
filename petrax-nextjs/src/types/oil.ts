import type { ComponentType } from 'react';

export interface OilType {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export interface MarketData {
  id: number;
  location: string;
  seller: string;
  quantity: string;
  icon: string;
  price?: number;
  currency?: string;
  lastUpdated?: Date;
}

export interface PlatformFeature {
  id: number;
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface TradeOrder {
  id: string;
  type: 'limit' | 'market' | 'conditional';
  side: 'buy' | 'sell';
  quantity: number;
  price?: number;
  status: 'pending' | 'filled' | 'cancelled';
  timestamp: Date;
}

export interface OilContract {
  id: string;
  type: string;
  location: string;
  seller: string;
  quantity: number;
  pricePerBarrel: number;
  totalValue: number;
  deliveryDate: Date;
  specifications: {
    apiGravity?: number;
    sulfurContent?: number;
    viscosity?: number;
  };
}

export type OilCategory = 'all' | 'crude' | 'refined' | 'synthetic';

export interface FilterOptions {
  category: OilCategory;
  searchTerm: string;
  priceRange?: {
    min: number;
    max: number;
  };
  location?: string;
}
