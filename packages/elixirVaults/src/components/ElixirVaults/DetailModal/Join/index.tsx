import { DoubleSideStakingInfo, SpaceType } from '@honeycomb-finance/pools';
import React, { useState } from 'react';
import { ElixirVault } from 'src/hooks/types';
import Stake from './Farm';
import EarnOption, { TradeType } from './Options';
import JoinVault from './Vault';

interface JoinProps {
  stakingInfo?: DoubleSideStakingInfo;
  vault?: ElixirVault;
}

const Join = ({ stakingInfo, vault }: JoinProps) => {
  const [type, setType] = useState(TradeType.Pool as string);

  return (
    <div>
      <EarnOption type={type} setType={setType} />
      {type === TradeType.Pool ? (
        <JoinVault vault={vault} />
      ) : stakingInfo ? (
        <Stake version={2} type={SpaceType.detail} stakingInfo={stakingInfo} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Join;
