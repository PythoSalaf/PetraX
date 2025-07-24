import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Principal } from '@dfinity/principal';
import { AuthClient } from '@dfinity/auth-client';
import type {
  WalletContextType,
  WalletState,
  WalletProvider,
} from '@/types';

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
  | { type: 'CONNECT_START'; provider: WalletProvider }
  | { type: 'CONNECT_SUCCESS'; principal: Principal; accountId: string; provider: WalletProvider }
  | { type: 'CONNECT_ERROR'; error: string }
  | { type: 'DISCONNECT' }
  | { type: 'SET_BALANCE'; balance: number }
  | { type: 'CLEAR_ERROR' };

// Reducer
const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'CONNECT_START':
      return {
        ...state,
        isConnecting: true,
        error: null,
        provider: action.provider,
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

// Provider component
interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletContextProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // Check for existing connection on mount
  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    try {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal();
        const accountId = principal.toString();
        
        dispatch({
          type: 'CONNECT_SUCCESS',
          principal,
          accountId,
          provider: 'internet-identity',
        });
      }
    } catch (error) {
      console.error('Error checking existing connection:', error);
    }
  };

  const connect = async (provider: WalletProvider): Promise<void> => {
    dispatch({ type: 'CONNECT_START', provider });

    try {
      switch (provider) {
        case 'internet-identity':
          await connectInternetIdentity();
          break;
        case 'plug':
          await connectPlug();
          break;
        default:
          throw new Error(`Unsupported wallet provider: ${provider}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Connection failed';
      dispatch({ type: 'CONNECT_ERROR', error: errorMessage });
      throw error;
    }
  };

  const connectInternetIdentity = async () => {
    const authClient = await AuthClient.create();
    
    return new Promise<void>((resolve, reject) => {
      authClient.login({
        identityProvider: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai'
          : 'https://identity.ic0.app',
        onSuccess: () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal();
          const accountId = principal.toString();
          
          dispatch({
            type: 'CONNECT_SUCCESS',
            principal,
            accountId,
            provider: 'internet-identity',
          });
          resolve();
        },
        onError: (error) => {
          reject(new Error(error || 'Internet Identity connection failed'));
        },
      });
    });
  };

  const connectPlug = async () => {
    // Check if Plug wallet is available
    if (!window.ic?.plug) {
      throw new Error('Plug wallet not found. Please install Plug wallet extension.');
    }

    const whitelist = ['rrkah-fqaaa-aaaaa-aaaaq-cai']; // Add your canister IDs
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:4943' : 'https://ic0.app';

    const connected = await window.ic.plug.requestConnect({
      whitelist,
      host,
    });

    if (!connected) {
      throw new Error('Plug wallet connection rejected');
    }

    const principal = await window.ic.plug.agent.getPrincipal();
    const accountId = principal.toString();

    dispatch({
      type: 'CONNECT_SUCCESS',
      principal,
      accountId,
      provider: 'plug',
    });
  };

  const disconnect = async (): Promise<void> => {
    try {
      if (state.provider === 'internet-identity') {
        const authClient = await AuthClient.create();
        await authClient.logout();
      } else if (state.provider === 'plug' && window.ic?.plug) {
        await window.ic.plug.disconnect();
      }
      
      dispatch({ type: 'DISCONNECT' });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      // Still dispatch disconnect to clear state
      dispatch({ type: 'DISCONNECT' });
    }
  };

  const getBalance = async (): Promise<number | null> => {
    if (!state.isConnected || !state.principal) {
      return null;
    }

    try {
      // This would typically call your backend canister to get balance
      // For now, return a mock balance
      const balance = Math.random() * 1000;
      dispatch({ type: 'SET_BALANCE', balance });
      return balance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: WalletContextType = {
    wallet: state,
    connect,
    disconnect,
    getBalance,
    clearError,
  };

  return (
    <WalletContext.Provider value={value}>
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

// Extend window interface for Plug wallet
declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: (options: { whitelist: string[]; host: string }) => Promise<boolean>;
        disconnect: () => Promise<void>;
        agent: {
          getPrincipal: () => Promise<Principal>;
        };
      };
    };
  }
}
