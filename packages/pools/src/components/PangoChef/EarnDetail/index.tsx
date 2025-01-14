import { Box, Button, Drawer, Stat, Text, Tooltip } from '@honeycomb-finance/core';
import { BIG_INT_ZERO, PNG, unwrappedToken, useChainId, useTranslation } from '@honeycomb-finance/shared';
import { ChainId, TokenAmount } from '@pangolindex/sdk';
import numeral from 'numeral';
import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useExtraPendingRewards } from 'src/hooks/minichef/hooks/common';
import { useGetLockingPoolsForPoolIdHook } from 'src/hooks/pangochef';
import { PangoChefInfo } from 'src/hooks/pangochef/types';
import RemoveDrawer from '../../RemoveDrawer';
import ClaimRewardV3 from '../ClaimReward';
import CompoundV3 from '../Compound';
import { Buttons, Container, InnerWrapper, Wrapper } from './styleds';

export interface EarnDetailProps {
  stakingInfo: PangoChefInfo;
  version: number;
}

const EarnedDetailV3 = ({ stakingInfo, version }: EarnDetailProps) => {
  const chainId = useChainId();
  const { t } = useTranslation();

  const [isClaimDrawerVisible, setShowClaimDrawer] = useState(false);
  const [isCompoundDrawerVisible, setShowCompoundDrawer] = useState(false);
  const [isRemoveDrawerVisible, setShowRemoveDrawer] = useState(false);

  const { rewardTokensAmount, rewardTokensMultiplier } = useExtraPendingRewards(stakingInfo);

  const useGetLockingPoolsForPoolId = useGetLockingPoolsForPoolIdHook[chainId];

  const isSuperFarm = (rewardTokensAmount || [])?.length > 0;

  const earnedAmount = stakingInfo?.earnedAmount;

  const redirectToCompound = () => {
    setShowClaimDrawer(false);
    setShowRemoveDrawer(false);
    setShowCompoundDrawer(true);
  };

  const onClose = () => {
    setShowClaimDrawer(false);
    setShowRemoveDrawer(false);
    setShowCompoundDrawer(false);
  };

  const drawerTitle = () => {
    if (isClaimDrawerVisible) {
      return t('earn.claim');
    }
    if (isRemoveDrawerVisible) {
      return t('removeLiquidity.remove');
    }
    return t('sarCompound.compound');
  };

  const theme = useContext(ThemeContext);

  const isDisabledButtons = !earnedAmount?.greaterThan(BIG_INT_ZERO);

  const png = PNG[chainId];
  const lockingPairs = useGetLockingPoolsForPoolId(stakingInfo?.pid);

  function getIfFarmLocked() {
    // we check if this pool has a locked pair greater than 0
    // in songbird and coston the only locked pool is pool 0 (pid === 0)
    // so we check if the pid equal to 0
    if (chainId === ChainId.SONGBIRD || chainId === ChainId.COSTON) {
      return stakingInfo?.pid === '0' && lockingPairs.length > 0;
    }
    // for rest of chains, we need check the lockCount too
    return lockingPairs.length > 0 && !!stakingInfo?.lockCount && stakingInfo?.lockCount > 0;
  }

  const isFarmLocked = getIfFarmLocked();

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Text color="text1" fontSize={[24, 18]} fontWeight={500}>
          {t('dashboardPage.earned')}
        </Text>

        {/* show unstake button */}
        <Button
          variant="primary"
          width="100px"
          height="30px"
          onClick={() => setShowRemoveDrawer(true)}
          isDisabled={isFarmLocked}
        >
          {t('removeLiquidity.remove')}
        </Button>
      </Box>

      <Container>
        <Box width="100%">
          <Text fontSize="12px" color="text1" textAlign="center">
            {t('earn.unclaimedReward', { symbol: png.symbol })}
          </Text>
          <Tooltip id="earnedAmount" effect="solid" backgroundColor={theme.primary}>
            <Text color="eerieBlack" fontSize="12px" fontWeight={500} textAlign="center">
              {earnedAmount.toFixed(Math.min(8, earnedAmount.token?.decimals))} {png.symbol}
            </Text>
          </Tooltip>
          <Text color="text1" fontSize="16px" fontWeight={700} textAlign="center" data-tip data-for="earnedAmount">
            {earnedAmount.toFixed(2)}
          </Text>
        </Box>
        {isSuperFarm && (
          <>
            <InnerWrapper>
              <Text color="text1" fontSize="12px">
                {t('dashboardPage.earned_weeklyIncome')}
              </Text>
              <Text color="text1" fontSize="12px">
                {t('dashboardPage.earned_totalEarned')}
              </Text>
            </InnerWrapper>
            {(rewardTokensAmount || []).map((reward, index) => {
              const tokenMultiplier = rewardTokensMultiplier?.[index];

              const extraTokenWeeklyRewardRate = stakingInfo?.getExtraTokensWeeklyRewardRate?.(
                stakingInfo?.rewardRatePerWeek,
                reward?.token,
                tokenMultiplier,
              ) as TokenAmount;

              return (
                <InnerWrapper key={index}>
                  <Box>
                    <Stat
                      stat={numeral(extraTokenWeeklyRewardRate.toFixed(4)).format(`0.00a`)}
                      statFontSize={[20, 18]}
                      currency={reward?.token}
                      toolTipText={`${
                        extraTokenWeeklyRewardRate?.toFixed(Math.min(8, extraTokenWeeklyRewardRate?.token?.decimals)) ??
                        '-'
                      } `}
                    />
                  </Box>

                  <Box>
                    <Stat
                      stat={numeral(reward?.toFixed(Math.min(4, reward.token?.decimals))).format('0.00a')}
                      statFontSize={[20, 18]}
                      currency={reward?.token}
                      toolTipText={`${reward?.toFixed(Math.min(8, reward.token?.decimals)) ?? '0'}`}
                    />
                  </Box>
                </InnerWrapper>
              );
            })}
          </>
        )}
        <Box
          bgColor="color3"
          borderRadius="8px"
          padding="20px"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Text fontSize="12px" color="text1" textAlign="center">
            {isFarmLocked
              ? `${t('pangoChef.lockingPoolZeroWarning')}${lockingPairs
                  .map(
                    (pair) => `${unwrappedToken(pair[0], chainId).symbol}-${unwrappedToken(pair[1], chainId).symbol}`,
                  )
                  .join(', ')}.`
              : t('pangoChef.claimWarning1')}
          </Text>
        </Box>
      </Container>

      <Buttons>
        <Button
          padding="10px"
          variant="outline"
          isDisabled={isDisabledButtons || isFarmLocked}
          onClick={() => setShowClaimDrawer(true)}
          color={!isDisabledButtons && !isFarmLocked ? theme.text10 : undefined}
        >
          {t('earnPage.claim')}
        </Button>
        <Button
          padding="10px"
          isDisabled={isDisabledButtons}
          variant="primary"
          onClick={() => setShowCompoundDrawer(true)}
        >
          {t('sarCompound.compound')}
        </Button>
      </Buttons>

      <Drawer title={drawerTitle()} isOpen={isClaimDrawerVisible || isCompoundDrawerVisible} onClose={onClose}>
        {isClaimDrawerVisible && (
          <ClaimRewardV3
            onClose={() => setShowClaimDrawer(false)}
            redirectToCompound={redirectToCompound}
            stakingInfo={stakingInfo}
          />
        )}
        {isCompoundDrawerVisible && (
          <CompoundV3 onClose={() => setShowCompoundDrawer(false)} stakingInfo={stakingInfo} />
        )}
      </Drawer>
      <RemoveDrawer
        isOpen={isRemoveDrawerVisible}
        onClose={() => {
          setShowRemoveDrawer(false);
        }}
        stakingInfo={stakingInfo}
        version={version}
        redirectToCompound={redirectToCompound}
      />
    </Wrapper>
  );
};
export default EarnedDetailV3;
