import { Contract } from '@ethersproject/contracts';
import { useChainId, useContract } from '@honeycomb-finance/shared';
import { CHAINS } from '@pangolindex/sdk';
import NonFungiblePositionManager from 'src/constants/abis/nonfungiblePositionManager.json';
import PangolinV3Pool from 'src/constants/abis/PangolinV3Pool.json';
import TickLensABI from 'src/constants/abis/tickLens.json';

export function useConcLiqNFTPositionManagerContract(withSignerIfPossible?: boolean): Contract | null {
  const chainId = useChainId();
  return useContract(
    chainId && CHAINS[chainId]?.contracts?.elixir?.nftManager,
    NonFungiblePositionManager.abi,
    withSignerIfPossible,
  );
}

export function useTickLensContract(): Contract | null {
  const chainId = useChainId();
  const address = chainId ? CHAINS[chainId]?.contracts?.elixir?.tickLens : undefined;
  return useContract(address, TickLensABI.abi);
}

export function usePangolinV3PoolContract(poolAddress: string): Contract | null {
  return useContract(poolAddress, PangolinV3Pool.abi);
}
