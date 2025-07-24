/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate ICP Principal ID
 */
export const isValidPrincipal = (principal: string): boolean => {
  try {
    // Basic validation - ICP principals are base32 encoded
    const base32Regex = /^[a-z2-7]+-[a-z2-7]+-[a-z2-7]+-[a-z2-7]+-[a-z2-7]+$/;
    return base32Regex.test(principal.toLowerCase());
  } catch {
    return false;
  }
};

/**
 * Validate positive number
 */
export const isPositiveNumber = (value: string | number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num > 0;
};

/**
 * Validate trade quantity
 */
export const isValidTradeQuantity = (quantity: string | number, min: number = 0.01, max: number = 1000000): boolean => {
  const num = typeof quantity === 'string' ? parseFloat(quantity) : quantity;
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate price
 */
export const isValidPrice = (price: string | number): boolean => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(num) && num > 0 && num < 1000000;
};

/**
 * Validate search term
 */
export const isValidSearchTerm = (term: string): boolean => {
  return term.trim().length >= 2 && term.trim().length <= 100;
};

/**
 * Sanitize input string
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validate wallet address format
 */
export const isValidWalletAddress = (address: string): boolean => {
  // Basic validation for ICP account identifiers
  const accountIdRegex = /^[a-f0-9]{64}$/i;
  return accountIdRegex.test(address);
};

/**
 * Check if string is empty or only whitespace
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return !value || value.trim().length === 0;
};

/**
 * Validate percentage value (0-100)
 */
export const isValidPercentage = (value: string | number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 100;
};

/**
 * Validate date is not in the past
 */
export const isFutureDate = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTime() > Date.now();
};

/**
 * Validate oil contract specifications
 */
export const validateOilSpecs = (specs: {
  apiGravity?: number;
  sulfurContent?: number;
  viscosity?: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (specs.apiGravity !== undefined) {
    if (specs.apiGravity < 10 || specs.apiGravity > 50) {
      errors.push('API Gravity must be between 10 and 50');
    }
  }

  if (specs.sulfurContent !== undefined) {
    if (specs.sulfurContent < 0 || specs.sulfurContent > 5) {
      errors.push('Sulfur content must be between 0% and 5%');
    }
  }

  if (specs.viscosity !== undefined) {
    if (specs.viscosity < 1 || specs.viscosity > 1000) {
      errors.push('Viscosity must be between 1 and 1000 cSt');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
