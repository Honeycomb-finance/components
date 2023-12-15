import { DoubleSideStakingInfo } from '@honeycomb-finance/pools';
import { ElixirVault } from 'src/hooks/types';

export interface RemoveDrawerProps {
  isOpen: boolean;
  vault?: ElixirVault;
  stakingInfo?: DoubleSideStakingInfo;
  onClose: () => void;
}
