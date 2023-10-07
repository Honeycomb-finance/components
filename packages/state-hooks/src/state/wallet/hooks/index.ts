/* eslint-disable max-lines */
import { useDummyHook } from '@honeycomb-finance/shared';
import { ChainId } from '@pangolindex/sdk';
import { useETHBalances, useTokenBalances, useTokenBalance } from './evm';
import { useHederaBalance, useHederaTokenBalances, useHederaTokenBalance } from './hedera';
import { useNearBalance, useNearTokenBalances, useNearTokenBalance } from './near';

export type UseAccountBalanceHookType = {
  [chainId in ChainId]: typeof useETHBalances | typeof useNearBalance | typeof useHederaBalance | typeof useDummyHook;
};

export const useAccountBalanceHook: UseAccountBalanceHookType = {
  [ChainId.FUJI]: useETHBalances,
  [ChainId.AVALANCHE]: useETHBalances,
  [ChainId.WAGMI]: useETHBalances,
  [ChainId.COSTON]: useETHBalances,
  [ChainId.SONGBIRD]: useETHBalances,
  [ChainId.FLARE_MAINNET]: useETHBalances,
  [ChainId.HEDERA_TESTNET]: useHederaBalance,
  [ChainId.HEDERA_MAINNET]: useHederaBalance,
  [ChainId.NEAR_MAINNET]: useNearBalance,
  [ChainId.NEAR_TESTNET]: useNearBalance,
  [ChainId.COSTON2]: useETHBalances,
  // TODO: Need to implement following chains
  [ChainId.ETHEREUM]: useETHBalances,
  [ChainId.POLYGON]: useETHBalances,
  [ChainId.FANTOM]: useETHBalances,
  [ChainId.XDAI]: useETHBalances,
  [ChainId.BSC]: useETHBalances,
  [ChainId.ARBITRUM]: useETHBalances,
  [ChainId.CELO]: useETHBalances,
  [ChainId.OKXCHAIN]: useETHBalances,
  [ChainId.VELAS]: useETHBalances,
  [ChainId.AURORA]: useETHBalances,
  [ChainId.CRONOS]: useETHBalances,
  [ChainId.FUSE]: useETHBalances,
  [ChainId.MOONRIVER]: useETHBalances,
  [ChainId.MOONBEAM]: useETHBalances,
  [ChainId.OP]: useETHBalances,
  [ChainId.EVMOS_TESTNET]: useETHBalances,
  [ChainId.EVMOS_MAINNET]: useETHBalances,
  [ChainId.SKALE_BELLATRIX_TESTNET]: useETHBalances,
};

export type UseTokenBalancesHookType = {
  [chainId in ChainId]: typeof useTokenBalances | typeof useNearTokenBalances | typeof useHederaTokenBalances;
};

export const useTokenBalancesHook: UseTokenBalancesHookType = {
  [ChainId.FUJI]: useTokenBalances,
  [ChainId.AVALANCHE]: useTokenBalances,
  [ChainId.WAGMI]: useTokenBalances,
  [ChainId.COSTON]: useTokenBalances,
  [ChainId.SONGBIRD]: useTokenBalances,
  [ChainId.FLARE_MAINNET]: useTokenBalances,
  [ChainId.HEDERA_TESTNET]: useHederaTokenBalances,
  [ChainId.HEDERA_MAINNET]: useHederaTokenBalances,
  [ChainId.NEAR_MAINNET]: useNearTokenBalances,
  [ChainId.NEAR_TESTNET]: useNearTokenBalances,
  [ChainId.COSTON2]: useTokenBalances,
  [ChainId.EVMOS_TESTNET]: useTokenBalances,
  [ChainId.EVMOS_MAINNET]: useTokenBalances,
  // TODO: We need to check following chains
  [ChainId.ETHEREUM]: useTokenBalances,
  [ChainId.POLYGON]: useTokenBalances,
  [ChainId.FANTOM]: useTokenBalances,
  [ChainId.XDAI]: useTokenBalances,
  [ChainId.BSC]: useTokenBalances,
  [ChainId.ARBITRUM]: useTokenBalances,
  [ChainId.CELO]: useTokenBalances,
  [ChainId.OKXCHAIN]: useTokenBalances,
  [ChainId.VELAS]: useTokenBalances,
  [ChainId.AURORA]: useTokenBalances,
  [ChainId.CRONOS]: useTokenBalances,
  [ChainId.FUSE]: useTokenBalances,
  [ChainId.MOONRIVER]: useTokenBalances,
  [ChainId.MOONBEAM]: useTokenBalances,
  [ChainId.OP]: useTokenBalances,
  [ChainId.SKALE_BELLATRIX_TESTNET]: useTokenBalances,
};

export type UseTokenBalanceHookType = {
  [chainId in ChainId]:
    | typeof useTokenBalance
    | typeof useNearTokenBalance
    | typeof useHederaTokenBalance
    | typeof useDummyHook;
};

export const useTokenBalanceHook: UseTokenBalanceHookType = {
  [ChainId.FUJI]: useTokenBalance,
  [ChainId.AVALANCHE]: useTokenBalance,
  [ChainId.WAGMI]: useTokenBalance,
  [ChainId.COSTON]: useTokenBalance,
  [ChainId.SONGBIRD]: useTokenBalance,
  [ChainId.FLARE_MAINNET]: useTokenBalance,
  [ChainId.HEDERA_TESTNET]: useHederaTokenBalance,
  [ChainId.HEDERA_MAINNET]: useHederaTokenBalance,
  [ChainId.NEAR_MAINNET]: useNearTokenBalance,
  [ChainId.NEAR_TESTNET]: useNearTokenBalance,
  [ChainId.COSTON2]: useTokenBalance,
  [ChainId.ETHEREUM]: useDummyHook,
  [ChainId.POLYGON]: useDummyHook,
  [ChainId.FANTOM]: useDummyHook,
  [ChainId.XDAI]: useDummyHook,
  [ChainId.BSC]: useDummyHook,
  [ChainId.ARBITRUM]: useDummyHook,
  [ChainId.CELO]: useDummyHook,
  [ChainId.OKXCHAIN]: useDummyHook,
  [ChainId.VELAS]: useDummyHook,
  [ChainId.AURORA]: useDummyHook,
  [ChainId.CRONOS]: useDummyHook,
  [ChainId.FUSE]: useDummyHook,
  [ChainId.MOONRIVER]: useDummyHook,
  [ChainId.MOONBEAM]: useDummyHook,
  [ChainId.OP]: useDummyHook,
  [ChainId.EVMOS_TESTNET]: useTokenBalance,
  [ChainId.EVMOS_MAINNET]: useTokenBalance,
  [ChainId.SKALE_BELLATRIX_TESTNET]: useTokenBalance,
};

export * from './hedera';
export * from './evm';
export * from './near';
