import { OilCategory, WalletProvider } from '@/types';

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// ICP Configuration
export const ICP_CONFIG = {
  NETWORK: (process.env.VITE_ICP_NETWORK as 'local' | 'testnet' | 'mainnet') || 'local',
  LOCAL_HOST: 'http://localhost:4943',
  MAINNET_HOST: 'https://ic0.app',
  IDENTITY_PROVIDER: {
    LOCAL: 'http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai',
    MAINNET: 'https://identity.ic0.app',
  },
  CANISTER_IDS: {
    BACKEND: process.env.VITE_BACKEND_CANISTER_ID || 'rrkah-fqaaa-aaaaa-aaaaq-cai',
    LEDGER: process.env.VITE_LEDGER_CANISTER_ID || 'ryjl3-tyaaa-aaaaa-aaaba-cai',
  },
} as const;

// Wallet Configuration
export const WALLET_CONFIG = {
  PROVIDERS: ['internet-identity', 'plug', 'stoic', 'bitfinity'] as WalletProvider[],
  CONNECTION_TIMEOUT: 30000,
  BALANCE_REFRESH_INTERVAL: 30000,
} as const;

// Oil Trading Constants
export const OIL_CATEGORIES: { value: OilCategory; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'crude', label: 'Crude Oil' },
  { value: 'refined', label: 'Refined Oil' },
  { value: 'synthetic', label: 'Synthetic Oil' },
];

export const OIL_TYPES = {
  BRENT: 'Brent Crude',
  WTI: 'West Texas Intermediate',
  DUBAI: 'Dubai Crude',
  OPEC: 'OPEC Basket',
  NIGERIA: 'Nigeria Light Sweet',
} as const;

// Trading Constants
export const TRADE_CONFIG = {
  MIN_QUANTITY: 0.01,
  MAX_QUANTITY: 1000000,
  MIN_PRICE: 0.01,
  MAX_PRICE: 1000000,
  PERCENTAGE_OPTIONS: [10, 25, 50, 75, 100],
  ORDER_TYPES: ['limit', 'market', 'conditional'] as const,
} as const;

// Chart Configuration
export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 400,
  COLORS: {
    BACKGROUND: '#0D0D0D',
    TEXT: '#FFFFFF',
    GRID: '#2B2B43',
    BORDER: '#485C7B',
    UP: '#00C851',
    DOWN: '#FF4444',
  },
  UPDATE_INTERVAL: 5000,
} as const;

// UI Constants
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  MODAL_ANIMATION_DURATION: 200,
  PAGINATION_LIMIT: 20,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  WALLET_CONNECTION: 'petrax_wallet_connection',
  USER_PREFERENCES: 'petrax_user_preferences',
  THEME: 'petrax_theme',
  LAST_PROVIDER: 'petrax_last_provider',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET: {
    NOT_FOUND: 'Wallet not found. Please install the wallet extension.',
    CONNECTION_REJECTED: 'Wallet connection was rejected.',
    CONNECTION_FAILED: 'Failed to connect to wallet.',
    TRANSACTION_FAILED: 'Transaction failed.',
    INSUFFICIENT_BALANCE: 'Insufficient balance.',
  },
  TRADING: {
    INVALID_QUANTITY: 'Please enter a valid quantity.',
    INVALID_PRICE: 'Please enter a valid price.',
    ORDER_FAILED: 'Failed to place order.',
    MARKET_CLOSED: 'Market is currently closed.',
  },
  NETWORK: {
    CONNECTION_ERROR: 'Network connection error.',
    TIMEOUT: 'Request timed out.',
    SERVER_ERROR: 'Server error occurred.',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_FORMAT: 'Invalid format.',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WALLET: {
    CONNECTED: 'Wallet connected successfully!',
    DISCONNECTED: 'Wallet disconnected.',
    TRANSACTION_SUCCESS: 'Transaction completed successfully!',
  },
  TRADING: {
    ORDER_PLACED: 'Order placed successfully!',
    ORDER_CANCELLED: 'Order cancelled successfully!',
  },
} as const;

// Feature Flags
export const FEATURES = {
  WALLET_INTEGRATION: true,
  ADVANCED_TRADING: true,
  NOTIFICATIONS: true,
  DARK_MODE: true,
  ANALYTICS: false,
} as const;

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PRINCIPAL: /^[a-z2-7]+-[a-z2-7]+-[a-z2-7]+-[a-z2-7]+-[a-z2-7]+$/,
  ACCOUNT_ID: /^[a-f0-9]{64}$/i,
  POSITIVE_NUMBER: /^\d*\.?\d+$/,
} as const;
