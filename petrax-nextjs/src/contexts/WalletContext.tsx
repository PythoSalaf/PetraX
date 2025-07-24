'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type FC,
} from 'react';
import { Principal } from '@dfinity/principal';
import { icpService } from '@/services';
import type { WalletState, WalletContextType, WalletProvider } from '@/types/wallet';

// Initial state
const initialState: WalletState = {
  isConnected: false,
  isConnecting: false,
  principal: null,
  accountId: null,
  provider: null,
  balance: undefined,
  error: null,
};

// Action types
type WalletAction =
  | { type: 'CONNECT_START' }
  | {
      type: 'CONNECT_SUCCESS';
      principal: Principal;
      accountId: string;
      provider: WalletProvider;
    }
  | { type: 'CONNECT_ERROR'; error: string }
  | { type: 'DISCONNECT' }
  | { type: 'SET_BALANCE'; balance: number }
  | { type: 'CLEAR_ERROR' };

// Reducer
const walletReducer = (
  state: WalletState,
  action: WalletAction
): WalletState => {
  switch (action.type) {
    case 'CONNECT_START':
      return {
        ...state,
        isConnecting: true,
        error: null,
      };

    case 'CONNECT_SUCCESS':
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        principal: action.principal,
        accountId: action.accountId,
        provider: action.provider,
        error: null,
      };

    case 'CONNECT_ERROR':
      return {
        ...state,
        isConnecting: false,
        error: action.error,
      };

    case 'DISCONNECT':
      return {
        ...initialState,
      };

    case 'SET_BALANCE':
      return {
        ...state,
        balance: action.balance,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider props
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: FC<WalletProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // Check for existing connection on mount
  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    try {
      const isAuthenticated = await icpService.isAuthenticated();
      if (isAuthenticated) {
        const principal = await icpService.getPrincipal();
        if (principal) {
          dispatch({
            type: 'CONNECT_SUCCESS',
            principal,
            accountId: principal.toString(),
            provider: 'internet-identity', // Default to II for existing connections
          });
        }
      }
    } catch (error) {
      console.error('Failed to check existing connection:', error);
    }
  };

  const connect = async (provider: WalletProvider): Promise<void> => {
    dispatch({ type: 'CONNECT_START' });

    try {
      const { principal, accountId } = await icpService.connectWallet(provider);
      
      dispatch({
        type: 'CONNECT_SUCCESS',
        principal,
        accountId,
        provider,
      });

      // Get balance after successful connection
      await getBalance();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
      dispatch({
        type: 'CONNECT_ERROR',
        error: errorMessage,
      });
      throw error;
    }
  };

  const disconnect = async (): Promise<void> => {
    try {
      await icpService.disconnect();
      dispatch({ type: 'DISCONNECT' });
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      // Still dispatch disconnect to clear local state
      dispatch({ type: 'DISCONNECT' });
    }
  };

  const getBalance = async (): Promise<number | null> => {
    if (!state.accountId) return null;

    try {
      const balance = await icpService.getBalance(state.accountId);
      dispatch({ type: 'SET_BALANCE', balance });
      return balance;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return null;
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: WalletContextType = {
    wallet: state,
    connect,
    disconnect,
    getBalance,
    clearError,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook to use wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
