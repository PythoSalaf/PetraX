/**
 * Validate email address format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate trade quantity
 */
export const isValidTradeQuantity = (quantity: number, maxQuantity: number): boolean => {
  return quantity > 0 && quantity <= maxQuantity && Number.isFinite(quantity);
};

/**
 * Validate price value
 */
export const isValidPrice = (price: number): boolean => {
  return price > 0 && Number.isFinite(price);
};

/**
 * Validate wallet address format
 */
export const isValidWalletAddress = (address: string): boolean => {
  // Basic validation for ICP principal format
  if (!address || address.length < 10) return false;
  
  // Check if it contains only valid characters (alphanumeric and hyphens)
  const validChars = /^[a-zA-Z0-9-]+$/;
  return validChars.test(address);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate required fields in a form
 */
export const validateRequiredFields = (
  data: Record<string, unknown>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } => {
  const missingFields = requiredFields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

/**
 * Validate numeric range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validate string length
 */
export const isValidLength = (str: string, minLength: number, maxLength?: number): boolean => {
  if (str.length < minLength) return false;
  if (maxLength && str.length > maxLength) return false;
  return true;
};

/**
 * Sanitize input string
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
