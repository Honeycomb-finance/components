import { formatUnits } from '@ethersproject/units';
import { Box, Button, CurrencyLogo, Stat, Text, TextInput } from '@honeycomb-finance/core';
import { PNG, useChainId, usePangolinWeb3, useTranslation } from '@honeycomb-finance/shared';
import { useWalletModalToggle } from '@honeycomb-finance/state-hooks';
import numeral from 'numeral';
import React, { useCallback, useEffect, useState } from 'react';
import { useDerivativeSarUnstakeHook } from 'src/hooks';
import { Position } from 'src/hooks/types';
import ConfirmDrawer from '../ConfirmDrawer';
import { Footer, Header, TokenRow } from '../ConfirmDrawer/styled';
import Title from '../Title';
import { Options } from '../types';
import { Root, Wrapper } from './styleds';

interface Props {
  selectedOption: Options;
  selectedPosition: Position | null;
  onChange: (value: Options) => void;
  onSelectPosition: (position: Position | null) => void;
}

export default function Unstake({ selectedOption, selectedPosition, onChange, onSelectPosition }: Props) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { account } = usePangolinWeb3();
  const chainId = useChainId();

  const png = PNG[chainId];

  const stakedAmount = selectedPosition?.balance ?? 0;

  const { t } = useTranslation();

  const useDerivativeSarUnstake = useDerivativeSarUnstakeHook[chainId];

  const {
    attempting,
    hash,
    typedValue,
    parsedAmount,
    error,
    unstakeError,
    onUserInput,
    wrappedOnDismiss,
    handleMax,
    onUnstake,
  } = useDerivativeSarUnstake(selectedPosition);

  const toggleWalletModal = useWalletModalToggle();

  const handleConfirmDismiss = useCallback(() => {
    setOpenDrawer(false);
    // if there was a tx hash, we want to clear the input
    if (hash) {
      onUserInput('');
      onSelectPosition(null);
    }
    wrappedOnDismiss();
  }, [hash, onSelectPosition, onUserInput]);

  // if changed the position and the drawer is open, close
  useEffect(() => {
    if (openDrawer) setOpenDrawer(false);
  }, [selectedPosition]);

  const renderButton = () => {
    if (!account) {
      return (
        <Button padding="15px 18px" variant="primary" onClick={toggleWalletModal}>
          {t('removeLiquidity.connectWallet')}
        </Button>
      );
    } else {
      return (
        <Button
          variant={'primary'}
          isDisabled={!selectedPosition || !!error}
          onClick={() => setOpenDrawer(true)}
          height="46px"
        >
          {!selectedPosition ? t('sarStakeMore.choosePosition') : error ?? t('sarUnstake.unstake')}
        </Button>
      );
    }
  };

  const ConfirmContent = (
    <Wrapper>
      <Header>
        <TokenRow>
          <Text fontSize={24} fontWeight={500} color="text1" style={{ marginRight: '12px' }}>
            {t('sarUnstake.unstaking', { balance: parsedAmount?.toSignificant(6) ?? 0, symbol: png.symbol })}
          </Text>
          <CurrencyLogo currency={png} size={24} imageSize={48} />
        </TokenRow>
        <Box display="inline-grid" style={{ gridGap: '10px', gridTemplateColumns: 'auto auto' }}>
          <Stat
            title={t('sarUnstake.currentAPR')}
            titlePosition="top"
            stat={`${(selectedPosition?.apr ?? '-').toString()}%`}
            titleColor="text2"
          />
          <Stat title={t('sarStakeMore.newAPR')} titlePosition="top" stat={'0%'} titleColor="text2" />
        </Box>
        <Text color="text1" fontWeight={400} fontSize="14px" textAlign="center">
          {t('sarUnstake.confirmDescription')}
        </Text>
      </Header>
      <Footer>
        <Box my={'10px'}>
          <Button variant="primary" onClick={onUnstake}>
            {t('sarUnstake.unstake')}
          </Button>
        </Box>
      </Footer>
    </Wrapper>
  );

  return (
    <Box>
      <Root>
        <Title selectPosition={selectedPosition} selectedOption={selectedOption} onChange={onChange} />
        <Box>
          <Box justifyContent="space-between" display="flex">
            <Text color="text1" fontSize="18px" fontWeight={500}>
              {t('sarUnstake.unstake')}
            </Text>
            <Text color="text4">
              {t('sarUnstake.stakedBalance', {
                symbol: png.symbol,
                balance: numeral(formatUnits(stakedAmount, png.decimals)).format('0.00a'),
              })}
            </Text>
          </Box>
          <TextInput
            value={typedValue}
            isNumeric={true}
            placeholder="0.00"
            addonAfter={
              <Button variant="plain" backgroundColor="color2" padding="6px" height="auto" onClick={handleMax}>
                <Text color="text1">{t('sarStake.max')}</Text>
              </Button>
            }
            onChange={(value: any) => {
              onUserInput(value);
            }}
          />
        </Box>
        <Box display="grid" bgColor="color3" borderRadius="4px" padding="20px" style={{ gridGap: '20px' }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Text color="text2">{t('sarUnstake.currentAPR')}</Text>
              <Text color="text1">{(selectedPosition?.apr ?? '-').toString()}%</Text>
            </Box>
            <Box>
              <Text color="text2">{t('sarUnstake.aprAfter')}</Text>
              <Text color="text1">0%</Text>
            </Box>
          </Box>
          <Text color="text1" fontWeight={400} fontSize="14px" textAlign="center">
            {t('sarUnstake.unstakeWarning')}
          </Text>
        </Box>
        {renderButton()}
      </Root>

      <ConfirmDrawer
        title={unstakeError || hash || attempting ? '' : t('sarStake.summary')}
        isOpen={openDrawer && !!selectedPosition}
        onClose={handleConfirmDismiss}
        attemptingTxn={attempting}
        txHash={hash}
        errorMessage={unstakeError}
        pendingMessage={t('sarUnstake.pending', { balance: parsedAmount?.toSignificant(2) ?? 0, symbol: png.symbol })}
        successMessage={t('sarUnstake.successSubmit')}
        confirmContent={ConfirmContent}
      />
    </Box>
  );
}
