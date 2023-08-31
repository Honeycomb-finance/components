import { ChainId } from '@pangolindex/sdk';
import { useElixirRemoveLiquidity } from './evm';
import { useDummyHook } from '@honeycomb-finance/shared';

export type useElixirRemoveLiquidityHookType = {
  [chainId in ChainId]: typeof useElixirRemoveLiquidity | typeof useDummyHook;
};

export const useElixirRemoveLiquidityHook: useElixirRemoveLiquidityHookType = {
  [ChainId.FUJI]: useElixirRemoveLiquidity,
  [ChainId.AVALANCHE]: useElixirRemoveLiquidity,
  [ChainId.WAGMI]: useElixirRemoveLiquidity,
  [ChainId.COSTON]: useElixirRemoveLiquidity,
  [ChainId.SONGBIRD]: useElixirRemoveLiquidity,
  [ChainId.FLARE_MAINNET]: useElixirRemoveLiquidity,
  [ChainId.HEDERA_TESTNET]: useElixirRemoveLiquidity,
  [ChainId.HEDERA_MAINNET]: useElixirRemoveLiquidity,
  [ChainId.NEAR_MAINNET]: useElixirRemoveLiquidity,
  [ChainId.NEAR_TESTNET]: useElixirRemoveLiquidity,
  [ChainId.COSTON2]: useElixirRemoveLiquidity,
  [ChainId.EVMOS_TESTNET]: useElixirRemoveLiquidity,
  [ChainId.EVMOS_MAINNET]: useElixirRemoveLiquidity,
  [ChainId.ETHEREUM]: useElixirRemoveLiquidity,
  [ChainId.POLYGON]: useElixirRemoveLiquidity,
  [ChainId.FANTOM]: useElixirRemoveLiquidity,
  [ChainId.XDAI]: useElixirRemoveLiquidity,
  [ChainId.BSC]: useElixirRemoveLiquidity,
  [ChainId.ARBITRUM]: useElixirRemoveLiquidity,
  [ChainId.CELO]: useElixirRemoveLiquidity,
  [ChainId.OKXCHAIN]: useElixirRemoveLiquidity,
  [ChainId.VELAS]: useElixirRemoveLiquidity,
  [ChainId.AURORA]: useElixirRemoveLiquidity,
  [ChainId.CRONOS]: useElixirRemoveLiquidity,
  [ChainId.FUSE]: useElixirRemoveLiquidity,
  [ChainId.MOONRIVER]: useElixirRemoveLiquidity,
  [ChainId.MOONBEAM]: useElixirRemoveLiquidity,
  [ChainId.OP]: useElixirRemoveLiquidity,
  [ChainId.SKALE_BELLATRIX_TESTNET]: useElixirRemoveLiquidity,
  [ChainId.SOROBAN]: useDummyHook,
  [ChainId.SOROBAN_TESTNET]: useDummyHook,
};
