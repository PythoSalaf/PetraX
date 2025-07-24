'use client';

import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';
import { ICP_CONFIG } from '@/utils/constants';
import type { WalletProvider } from '@/types/wallet';

export class ICPService {
  private agent: HttpAgent | null = null;
  private authClient: AuthClient | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Create HTTP Agent
      this.agent = new HttpAgent({
        host: ICP_CONFIG.HOST,
      });

      // Only fetch root key in development/local network
      if (ICP_CONFIG.NETWORK === 'local') {
        try {
          await this.agent.fetchRootKey();
        } catch (error) {
          console.warn('Failed to fetch root key from local network. Running in offline mode:', error);
          // Continue without root key for demo purposes
        }
      }

      // Initialize Auth Client
      this.authClient = await AuthClient.create({
        idleOptions: {
          disableIdle: true,
          disableDefaultIdleCallback: true,
        },
      });

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize ICP service:', error);
      // For demo purposes, mark as initialized even if connection fails
      this.isInitialized = true;
      console.warn('ICP service running in offline demo mode');
    }
  }

  async connectWallet(provider: WalletProvider): Promise<{
    principal: Principal;
    accountId: string;
  }> {
    await this.initialize();

    switch (provider) {
      case 'internet-identity':
        return this.connectInternetIdentity();
      case 'plug':
        return this.connectPlug();
      default:
        throw new Error(`Unsupported wallet provider: ${provider}`);
    }
  }

  private async connectInternetIdentity(): Promise<{
    principal: Principal;
    accountId: string;
  }> {
    if (!this.authClient) {
      throw new Error('Auth client not initialized');
    }

    return new Promise((resolve, reject) => {
      this.authClient!.login({
        identityProvider: ICP_CONFIG.IDENTITY_PROVIDER,
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days
        onSuccess: async () => {
          try {
            const identity = this.authClient!.getIdentity();
            const principal = identity.getPrincipal();
            const accountId = principal.toString();

            // Update agent with authenticated identity
            if (this.agent) {
              this.agent.replaceIdentity(identity);
            }

            resolve({ principal, accountId });
          } catch (error) {
            reject(error);
          }
        },
        onError: (error) => {
          reject(new Error(`Internet Identity login failed: ${error}`));
        },
      });
    });
  }

  private async connectPlug(): Promise<{
    principal: Principal;
    accountId: string;
  }> {
    // Check if Plug wallet is available
    if (!window.ic?.plug) {
      throw new Error('Plug wallet not found. Please install Plug extension.');
    }

    try {
      const whitelist = [ICP_CONFIG.CANISTER_IDS.BACKEND];
      const host = ICP_CONFIG.HOST;

      // Request connection
      const connected = await window.ic.plug.requestConnect({
        whitelist,
        host,
      });

      if (!connected) {
        throw new Error('User rejected Plug wallet connection');
      }

      // Get principal and account ID
      const principal = await window.ic.plug.agent.getPrincipal();
      const accountId = principal.toString();

      return { principal, accountId };
    } catch (error) {
      throw new Error(`Plug wallet connection failed: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.authClient) {
      await this.authClient.logout();
    }

    // Reset agent identity
    if (this.agent) {
      // Create anonymous identity for reset
      const { AnonymousIdentity } = await import('@dfinity/agent');
      this.agent.replaceIdentity(new AnonymousIdentity());
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      if (!this.authClient) {
        await this.initialize();
      }

      return this.authClient!.isAuthenticated();
    } catch (error) {
      console.warn('Failed to check authentication status:', error);
      return false;
    }
  }

  async getPrincipal(): Promise<Principal | null> {
    if (!this.authClient || !(await this.isAuthenticated())) {
      return null;
    }

    const identity = this.authClient.getIdentity();
    return identity.getPrincipal();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createActor<T>(canisterId: string, idlFactory: any): Promise<T> {
    if (!this.agent) {
      await this.initialize();
    }

    return Actor.createActor<T>(idlFactory, {
      agent: this.agent!,
      canisterId,
    });
  }

  async getBalance(): Promise<number> {
    try {
      // This would typically call the ledger canister
      // For now, return a mock balance
      return Math.random() * 1000;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }

  async transfer(): Promise<string> {
    try {
      // This would typically call the ledger canister for transfer
      // For now, return a mock transaction ID
      return `txn_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    } catch (error) {
      console.error('Transfer failed:', error);
      throw new Error('Transfer failed');
    }
  }
}

// Global instance
export const icpService = new ICPService();

// Type declarations for Plug wallet
declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: (options: {
          whitelist: string[];
          host: string;
        }) => Promise<boolean>;
        agent: {
          getPrincipal: () => Promise<Principal>;
        };
        isConnected: () => Promise<boolean>;
      };
    };
  }
}
