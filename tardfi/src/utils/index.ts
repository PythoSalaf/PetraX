// Format utilities
export {
  formatCurrency,
  formatLargeNumber,
  truncateAddress,
  formatDate,
  formatRelativeTime,
  formatPercentage,
  formatOilQuantity,
  capitalizeWords,
  generateColor,
} from './format';

// Validation utilities
export {
  isValidEmail,
  isValidPrincipal,
  isPositiveNumber,
  isValidTradeQuantity,
  isValidPrice,
  isValidSearchTerm,
  sanitizeInput,
  isValidWalletAddress,
  isEmpty,
  isValidPercentage,
  isFutureDate,
  validateOilSpecs,
} from './validation';

// Constants
export {
  API_CONFIG,
  ICP_CONFIG,
  WALLET_CONFIG,
  OIL_CATEGORIES,
  OIL_TYPES,
  TRADE_CONFIG,
  CHART_CONFIG,
  UI_CONFIG,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURES,
  REGEX_PATTERNS,
} from './constants';
