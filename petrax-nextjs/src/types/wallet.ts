import { Principal } from '@dfinity/principal';

export type WalletProvider = 'internet-identity' | 'plug' | 'stoic' | 'bitfinity';

export interface WalletConnection {
  isConnected: boolean;
  principal: Principal | null;
  accountId: string | null;
  provider: WalletProvider | null;
  balance?: number;
}

export interface WalletState extends WalletConnection {
  isConnecting: boolean;
  error: string | null;
}

export interface WalletContextType {
  wallet: WalletState;
  connect: (provider: WalletProvider) => Promise<void>;
  disconnect: () => Promise<void>;
  getBalance: () => Promise<number | null>;
  clearError: () => void;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'trade';
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  from?: string;
  to?: string;
  description?: string;
}

export interface WalletConfig {
  whitelist: string[];
  host: string;
  timeout: number;
}

export interface AuthClientConfig {
  identityProvider: string;
  maxTimeToLive: bigint;
  derivationOrigin?: string;
}

export interface PlugWalletInfo {
  accountId: string;
  principal: Principal;
  agent: unknown;
}

export interface WalletError {
  code: string;
  message: string;
  details?: unknown;
}
