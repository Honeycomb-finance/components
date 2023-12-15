import { Drawer } from '@honeycomb-finance/core';
import { useTranslation } from '@honeycomb-finance/shared';
import React from 'react';
import Remove from '../Remove';
import { RemoveDrawerProps } from './types';

const RemoveDrawer: React.FC<RemoveDrawerProps> = (props) => {
  const { t } = useTranslation();
  const { isOpen, vault, stakingInfo } = props;
  return (
    <Drawer title={t('common.remove')} isOpen={isOpen} onClose={() => {}}>
      <Remove vault={vault} stakingInfo={stakingInfo} />
    </Drawer>
  );
};
export default RemoveDrawer;
