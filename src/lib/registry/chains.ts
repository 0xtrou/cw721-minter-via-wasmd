import { Chain } from "wagmi/chains";

export interface ChainConfig {
  key:               string;
  blockTimeSec:      number;
  confirmations:     number;
  wagmiKey:          string;
  chainName:         string;
  rpcUrl:            string;
  publicRpcUrl:      string;
  nativeRpcUrl:      string;
  chainId:           number;
  explorerUrl:       string;
  contractAddresses: ContractAddresses;
  nativeToken:       NativeToken;
}

export interface ContractAddresses {
  Wasmd: string;
}

export interface NativeToken {
  chainKey:            string;
  coingeckoId:         string;
  name:                string;
  symbol:              string;
  logo:                string;
  contractAddress:     string;
  decimals:            number;
  isGasToken:          boolean;
  recommended:         boolean;
  wrappedTokenAddress: string;
  wrappedTokenSymbol:  string;
}

/**
 * @packageDocumentation
 * @module lib/constants
 * @dev Define config for Ancient8 Testnet.
 */
export const ARCTIC_1 = {
  key: 'arctic-1',
  blockTimeSec: 0.3,
  confirmations: 3,
  wagmiKey: "sei-arctic-1",
  chainName: "Sei Public Devnet",
  rpcUrl: "https://evm-rpc-arctic-1.sei-apis.com",
  publicRpcUrl: "https://evm-rpc-arctic-1.sei-apis.com",
  nativeRpcUrl: "https://rpc-arctic-1.sei-apis.com",
  chainId: 713715,
  explorerUrl: "https://seitrace.com/",
  contractAddresses: {
    Wasmd: '0x0000000000000000000000000000000000001002'
  },
  nativeToken: {
    chainKey: 'arctic-1',
    coingeckoId: "sei-network",
    name: "Sei",
    symbol: "SEI",
    logo: "https://assets.coingecko.com/coins/images/28205/standard/Sei_Logo_-_Transparent.png?1696527207",
    contractAddress: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    isGasToken: true,
    recommended: true,
    wrappedTokenAddress: "0x26841a0A5D958B128209F4ea9a1DD7E61558c330",
    wrappedTokenSymbol: "WETH",
  }
} as ChainConfig;

/**
 * @packageDocumentation
 * @module lib/constants
 * @dev This file defines all the default chains which are used in the app.
 * @notice This file is used to avoid hardcoding of chains in the app.
 * @notice This file is used to avoid typos in the app.
 */
export const DEFAULT_CHAINS = [ARCTIC_1];

export const findChainRegistry = (chainId: number | string) => {
  if (typeof chainId === "string") {
    return DEFAULT_CHAINS.find((chain) => chain.key === chainId) || null;
  }

  return DEFAULT_CHAINS.find((chain) => chain.chainId === chainId) || null;
};

/**
 * @packageDocumentation
 * @module lib/constants
 * @dev List of wagmi chain configs.
 */
export const WAGMI_CONFIG = {} as Record<string, Chain>;
DEFAULT_CHAINS.map((chainRegistry) => {
  WAGMI_CONFIG[chainRegistry.key] = {
    id: chainRegistry.chainId,
    name: chainRegistry.chainName,
    network: chainRegistry.wagmiKey,
    nativeCurrency: {
      decimals: chainRegistry.nativeToken.decimals,
      name: chainRegistry.nativeToken.name,
      symbol: chainRegistry.nativeToken.symbol,
    },
    rpcUrls: {
      default: {
        http: [chainRegistry.publicRpcUrl],
      },
      public: {
        http: [chainRegistry.publicRpcUrl],
      },
    },
    testnet: false,
  } as Chain;
});