import { DoubleSideStakingInfo } from '@honeycomb-finance/pools';
import { ElixirVault } from 'src/hooks/types';

export type EarnWidgetProps = {
  vault?: ElixirVault;
  stakingInfo?: DoubleSideStakingInfo;
};
