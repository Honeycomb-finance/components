import { Interface } from '@ethersproject/abi';

import Png from '@pangolindex/exchange-contracts/artifacts/contracts/pangolin-token/Png.sol/Png.json';
import GovernorAlpha from '@pangolindex/governance/artifacts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
import ProposalStorage from './ProposalStorage.json';
import Governor from './governor.json';
import GovernorAssistant from './governorAssistant.json';

export const PROPOSAL_STORAGE_INTERFACE = new Interface(ProposalStorage.abi);

export const GovernorAssistantABI = GovernorAssistant.abi;
export const GovernorABI = Governor.abi;
export const GovernorAlphaABI = GovernorAlpha.abi;
export const PNGABI = Png.abi;