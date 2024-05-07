"use client";

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { WalletClient } from 'viem';
import { createContext, useContext, useMemo } from "react";
import { useWalletClient, useAccount } from "wagmi";
import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from 'ethers';

import { WAGMI_CONFIG } from '~/lib/registry/chains';
import { Chain } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'CW721 Base Minter',
  projectId: '90d9ea592d35cf1b397555a8f777b6e2',
  chains: [WAGMI_CONFIG['arctic-1']],
  ssr: true,
});
const queryClient = new QueryClient();

const walletClientToSigner = (client: WalletClient) => {
  const { account, chain, transport } = client;
  if(!account || !chain || !transport) throw new Error("Invalid wallet client");
  const provider = new BrowserProvider(transport as any, {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  });

  return new JsonRpcSigner(provider, account.address);
};

/** @dev Initialize context. */
export const EvmWalletContext = createContext<{
  signer: JsonRpcSigner | null;
} | null>(null);

/** @dev Expose wallet provider for usage. */
export const EvmSignerProvider: FC<{ children: ReactNode }> = (props) => {
  const { isConnected } = useAccount();
  const client = useWalletClient();

  /**
   * @dev Expose signer to context.
   * @property {JsonRpcSigner} signer The signer to use.
   * @notice If signer is not connected, it will return null.
   */
  const signer = useMemo(() => {
    if (!isConnected) return null;
    return client?.data ? walletClientToSigner(client.data) : null;
  }, [client, isConnected]);

  return (
    <EvmWalletContext.Provider value={{ signer }}>
      {props.children}
    </EvmWalletContext.Provider>
  );
};

const WalletProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <EvmSignerProvider>
            {children}
          </EvmSignerProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletProvider;

export const useEvmSigner = () => {
  const context = useContext(EvmWalletContext);
  if (!context) {
    throw new Error("Must be in provider");
  }
  return context;
};

export const getReadonlyEthersProvider = (chain: Chain) => {
  if(chain.rpcUrls[0].http.length >= 1) {
    return new JsonRpcProvider(chain.rpcUrls[0].http[0]);
  }

  throw new Error("Invalid chain");
}