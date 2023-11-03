import { DoubleSideStakingInfo } from '@honeycomb-finance/pools';
import { ElixirVault } from 'src/hooks/types';

export type DetailModalProps = {
  isOpen: boolean;
  vault?: ElixirVault;
  stakingInfo?: DoubleSideStakingInfo;
  onClose: () => void;
};
