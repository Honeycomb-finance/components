import { Text } from '@honeycomb-finance/core';
import { DoubleSideStakingInfo, SpaceType } from '@honeycomb-finance/pools';
import { useTranslation } from '@honeycomb-finance/shared';
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
  const { t } = useTranslation();

  return (
    <div>
      {/* <EarnOption type={type} setType={setType} /> //TODO: */}
      <Text
        color="text1"
        fontSize={[22, 18]}
        fontWeight={500}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {t('pool.addLiquidity')}
      </Text>
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
