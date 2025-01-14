import { PNG, useChainId, useContract } from '@honeycomb-finance/shared';
import { CHAINS, GovernanceType } from '@pangolindex/sdk';
import { GovernorABI, GovernorAlphaABI, GovernorAssistantABI, PNGABI } from 'src/constants';

export function usePngContract() {
  const chainId = useChainId();
  return useContract(PNG[chainId].address, PNGABI, true);
}

export function useGovernanceContract() {
  const chainId = useChainId();
  const address = chainId ? CHAINS[chainId]?.contracts?.governor?.address : undefined;
  const type = chainId ? CHAINS[chainId]?.contracts?.governor?.type : GovernanceType.STANDARD;

  return useContract(address, type === GovernanceType.STANDARD ? GovernorAlphaABI : GovernorABI, true);
}

export function useSarNftGovernanceContract() {
  const chainId = useChainId();
  const address = chainId ? CHAINS[chainId]?.contracts?.governor?.address : undefined;

  return useContract(address, GovernorABI, true);
}

export function useSarNftGovernanceAssistantContract() {
  const chainId = useChainId();
  const address = chainId ? CHAINS[chainId]?.contracts?.governor_assistant : undefined;

  return useContract(address, GovernorAssistantABI, true);
}
