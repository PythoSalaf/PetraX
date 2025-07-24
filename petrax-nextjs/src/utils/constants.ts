// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// ICP Network Configuration
export const ICP_CONFIG = {
  NETWORK: (process.env.NEXT_PUBLIC_ICP_NETWORK as 'local' | 'testnet' | 'mainnet') || 'local',
  HOST: process.env.NEXT_PUBLIC_ICP_HOST || 'http://localhost:4943',
  IDENTITY_PROVIDER: process.env.NEXT_PUBLIC_IDENTITY_PROVIDER || 'http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai',
  CANISTER_IDS: {
    BACKEND: process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID || 'rrkah-fqaaa-aaaaa-aaaaq-cai',
    LEDGER: process.env.NEXT_PUBLIC_LEDGER_CANISTER_ID || 'ryjl3-tyaaa-aaaaa-aaaba-cai',
  },
} as const;

// Wallet Configuration
export const WALLET_CONFIG = {
  SUPPORTED_WALLETS: ['internet-identity', 'plug', 'stoic', 'bitfinity'] as const,
  CONNECTION_TIMEOUT: 30000,
  MAX_RETRY_ATTEMPTS: 3,
} as const;

// Trading Configuration
export const TRADING_CONFIG = {
  MIN_TRADE_AMOUNT: 1,
  MAX_TRADE_AMOUNT: 1000000,
  DEFAULT_SLIPPAGE: 0.5,
  MAX_SLIPPAGE: 5,
  ORDER_TYPES: ['market', 'limit', 'conditional'] as const,
  TRADE_SIDES: ['buy', 'sell'] as const,
} as const;

// UI Configuration
export const UI_CONFIG = {
  THEME: {
    DEFAULT: 'dark' as const,
    STORAGE_KEY: 'petrax-theme',
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
} as const;

// Oil Types and Categories
export const OIL_TYPES = {
  CRUDE: 'crude',
  REFINED: 'refined',
  SYNTHETIC: 'synthetic',
} as const;

export const OIL_CATEGORIES = [
  { id: 'all', label: 'All Types' },
  { id: 'crude', label: 'Crude Oil' },
  { id: 'refined', label: 'Refined Products' },
  { id: 'synthetic', label: 'Synthetic Oil' },
] as const;

// Currency Configuration
export const CURRENCY_CONFIG = {
  DEFAULT: 'USD',
  SUPPORTED: ['USD', 'EUR', 'GBP', 'JPY', 'ICP'] as const,
  SYMBOLS: {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    ICP: 'ICP',
  },
} as const;

// Chart Configuration
export const CHART_CONFIG = {
  DEFAULT_TIMEFRAME: '1D',
  TIMEFRAMES: [
    { value: '1H', label: '1 Hour' },
    { value: '4H', label: '4 Hours' },
    { value: '1D', label: '1 Day' },
    { value: '1W', label: '1 Week' },
    { value: '1M', label: '1 Month' },
  ],
  COLORS: {
    UP: '#10B981',
    DOWN: '#EF4444',
    NEUTRAL: '#6B7280',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  WALLET_CONNECTION_FAILED: 'Failed to connect wallet. Please try again.',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
  INVALID_AMOUNT: 'Please enter a valid amount.',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully!',
  TRANSACTION_COMPLETED: 'Transaction completed successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'petrax-theme',
  WALLET_PROVIDER: 'petrax-wallet-provider',
  USER_PREFERENCES: 'petrax-user-preferences',
  RECENT_SEARCHES: 'petrax-recent-searches',
} as const;
