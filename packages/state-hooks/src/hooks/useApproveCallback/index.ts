import { ChainId, CurrencyAmount, ElixirTrade, Trade } from '@pangolindex/sdk';
import { useApproveCallback, useApproveCallbackFromTrade } from './evm';
import { useApproveCallbackFromHederaTrade, useHederaApproveCallback } from './hedera';
import { useApproveCallbackFromNearTrade, useNearApproveCallback } from './near';
import { useDummyHook } from '../multiChainsHooks';
import { ApprovalState } from './constant';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useDummyApproveCallback(
  _chainId: ChainId,
  _amountToApprove?: CurrencyAmount,
  _spender?: string,
): [ApprovalState, () => Promise<void>] {
  const callback = async () => {};
  return [ApprovalState.UNKNOWN, callback];
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useDummyApproveCallbackFromTrade(
  _chainId: ChainId,
  _trade?: Trade | ElixirTrade,
  _allowedSlippage = 0,
): [ApprovalState, () => Promise<void>] {
  const callback = async () => {};
  return [ApprovalState.UNKNOWN, callback];
}

export type UseApproveCallbackFromTradeHookType = {
  [chainId in ChainId]:
    | typeof useApproveCallbackFromTrade
    | typeof useApproveCallbackFromNearTrade
    | typeof useApproveCallbackFromHederaTrade
    | typeof useDummyApproveCallbackFromTrade;
};

export const useApproveCallbackFromTradeHook: UseApproveCallbackFromTradeHookType = {
  [ChainId.FUJI]: useApproveCallbackFromTrade,
  [ChainId.AVALANCHE]: useApproveCallbackFromTrade,
  [ChainId.WAGMI]: useApproveCallbackFromTrade,
  [ChainId.COSTON]: useApproveCallbackFromTrade,
  [ChainId.SONGBIRD]: useApproveCallbackFromTrade,
  [ChainId.FLARE_MAINNET]: useApproveCallbackFromTrade,
  [ChainId.HEDERA_TESTNET]: useApproveCallbackFromHederaTrade,
  [ChainId.HEDERA_MAINNET]: useApproveCallbackFromHederaTrade,
  [ChainId.NEAR_MAINNET]: useApproveCallbackFromNearTrade,
  [ChainId.NEAR_TESTNET]: useApproveCallbackFromNearTrade,
  [ChainId.COSTON2]: useApproveCallbackFromTrade,
  [ChainId.EVMOS_TESTNET]: useApproveCallbackFromTrade,
  [ChainId.EVMOS_MAINNET]: useApproveCallbackFromTrade,
  // TODO: Need to implement following chains
  [ChainId.ETHEREUM]: useApproveCallbackFromTrade,
  [ChainId.POLYGON]: useApproveCallbackFromTrade,
  [ChainId.FANTOM]: useApproveCallbackFromTrade,
  [ChainId.XDAI]: useApproveCallbackFromTrade,
  [ChainId.BSC]: useApproveCallbackFromTrade,
  [ChainId.ARBITRUM]: useApproveCallbackFromTrade,
  [ChainId.CELO]: useApproveCallbackFromTrade,
  [ChainId.OKXCHAIN]: useApproveCallbackFromTrade,
  [ChainId.VELAS]: useApproveCallbackFromTrade,
  [ChainId.AURORA]: useApproveCallbackFromTrade,
  [ChainId.CRONOS]: useApproveCallbackFromTrade,
  [ChainId.FUSE]: useApproveCallbackFromTrade,
  [ChainId.MOONRIVER]: useApproveCallbackFromTrade,
  [ChainId.MOONBEAM]: useApproveCallbackFromTrade,
  [ChainId.OP]: useApproveCallbackFromTrade,
  [ChainId.SKALE_BELLATRIX_TESTNET]: useApproveCallbackFromTrade,
  [ChainId.SOROBAN]: useDummyApproveCallbackFromTrade,
  [ChainId.SOROBAN_TESTNET]: useDummyApproveCallbackFromTrade,
};

export type UseApproveCallbackHookType = {
  [chainId in ChainId]:
    | typeof useApproveCallback
    | typeof useNearApproveCallback
    | typeof useHederaApproveCallback
    | typeof useDummyHook;
};

export const useApproveCallbackHook: UseApproveCallbackHookType = {
  [ChainId.FUJI]: useApproveCallback,
  [ChainId.AVALANCHE]: useApproveCallback,
  [ChainId.WAGMI]: useApproveCallback,
  [ChainId.COSTON]: useApproveCallback,
  [ChainId.SONGBIRD]: useApproveCallback,
  [ChainId.FLARE_MAINNET]: useApproveCallback,
  [ChainId.HEDERA_TESTNET]: useHederaApproveCallback,
  [ChainId.HEDERA_MAINNET]: useHederaApproveCallback,
  [ChainId.NEAR_MAINNET]: useNearApproveCallback,
  [ChainId.NEAR_TESTNET]: useNearApproveCallback,
  [ChainId.COSTON2]: useApproveCallback,
  [ChainId.EVMOS_TESTNET]: useApproveCallback,
  [ChainId.EVMOS_MAINNET]: useApproveCallback,
  // TODO: Need to implement following chains
  [ChainId.ETHEREUM]: useApproveCallback,
  [ChainId.POLYGON]: useApproveCallback,
  [ChainId.FANTOM]: useApproveCallback,
  [ChainId.XDAI]: useApproveCallback,
  [ChainId.BSC]: useApproveCallback,
  [ChainId.ARBITRUM]: useApproveCallback,
  [ChainId.CELO]: useApproveCallback,
  [ChainId.OKXCHAIN]: useApproveCallback,
  [ChainId.VELAS]: useApproveCallback,
  [ChainId.AURORA]: useApproveCallback,
  [ChainId.CRONOS]: useApproveCallback,
  [ChainId.FUSE]: useApproveCallback,
  [ChainId.MOONRIVER]: useApproveCallback,
  [ChainId.MOONBEAM]: useApproveCallback,
  [ChainId.OP]: useApproveCallback,
  [ChainId.SKALE_BELLATRIX_TESTNET]: useApproveCallback,
  [ChainId.SOROBAN]: useDummyApproveCallback,
  [ChainId.SOROBAN_TESTNET]: useDummyApproveCallback,
};
