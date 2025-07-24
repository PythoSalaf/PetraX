export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface User {
  id: string;
  principal: string;
  username?: string;
  email?: string;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  preferences: {
    theme: 'light' | 'dark';
    currency: string;
    notifications: boolean;
  };
}

export interface AppConfig {
  apiUrl: string;
  icpNetwork: 'local' | 'testnet' | 'mainnet';
  canisterIds: {
    backend: string;
    ledger: string;
  };
  features: {
    trading: boolean;
    wallet: boolean;
    notifications: boolean;
  };
}

export type Theme = 'light' | 'dark';

export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
}
