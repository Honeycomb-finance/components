import { ChainId, ElixirTrade, Trade } from '@pangolindex/sdk';
import { useSwapCallback } from './evm';
import { useHederaSwapCallback } from './hedera';
import { useNearSwapCallback } from './near';
import { SwapCallbackState } from './constant';
import { INITIAL_ALLOWED_SLIPPAGE } from '@honeycomb-finance/shared';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useDummySwapCallback(
  trade: Trade | ElixirTrade | undefined,
  recipientAddressOrName: string | null,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE,
): { state: SwapCallbackState; callback: null | (() => Promise<string>); error: string | null } {
  return { state: SwapCallbackState.INVALID, callback: null, error: null };
}

export type UseSwapCallbackHookType = {
  [chainId in ChainId]:
    | typeof useSwapCallback
    | typeof useNearSwapCallback
    | typeof useHederaSwapCallback
    | typeof useDummySwapCallback;
};

export const useSwapCallbackHook: UseSwapCallbackHookType = {
  [ChainId.FUJI]: useSwapCallback,
  [ChainId.AVALANCHE]: useSwapCallback,
  [ChainId.WAGMI]: useSwapCallback,
  [ChainId.COSTON]: useSwapCallback,
  [ChainId.SONGBIRD]: useSwapCallback,
  [ChainId.FLARE_MAINNET]: useSwapCallback,
  [ChainId.HEDERA_TESTNET]: useHederaSwapCallback,
  [ChainId.HEDERA_MAINNET]: useHederaSwapCallback,
  [ChainId.NEAR_MAINNET]: useNearSwapCallback,
  [ChainId.NEAR_TESTNET]: useNearSwapCallback,
  [ChainId.COSTON2]: useSwapCallback,
  [ChainId.EVMOS_TESTNET]: useSwapCallback,
  [ChainId.EVMOS_MAINNET]: useSwapCallback,
  // TODO: Remove following lines
  [ChainId.ETHEREUM]: useSwapCallback,
  [ChainId.POLYGON]: useSwapCallback,
  [ChainId.FANTOM]: useSwapCallback,
  [ChainId.XDAI]: useSwapCallback,
  [ChainId.BSC]: useSwapCallback,
  [ChainId.ARBITRUM]: useSwapCallback,
  [ChainId.CELO]: useSwapCallback,
  [ChainId.OKXCHAIN]: useSwapCallback,
  [ChainId.VELAS]: useSwapCallback,
  [ChainId.AURORA]: useSwapCallback,
  [ChainId.CRONOS]: useSwapCallback,
  [ChainId.FUSE]: useSwapCallback,
  [ChainId.MOONRIVER]: useSwapCallback,
  [ChainId.MOONBEAM]: useSwapCallback,
  [ChainId.OP]: useSwapCallback,
  [ChainId.SKALE_BELLATRIX_TESTNET]: useSwapCallback,
  [ChainId.SOROBAN]: useDummySwapCallback,
  [ChainId.SOROBAN_TESTNET]: useDummySwapCallback,
};
