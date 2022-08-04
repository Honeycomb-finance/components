import { formatEther } from '@ethersproject/units';
import { CurrencyAmount, Token } from '@pangolindex/sdk';
import numeral from 'numeral';
import React, { useContext } from 'react';
import { AlertTriangle } from 'react-feather';
import { ThemeContext } from 'styled-components';
import CircleTick from 'src/assets/images/circleTick.svg';
import Drawer from 'src/components/Drawer';
import { usePangolinWeb3 } from 'src/hooks';
import { Position } from 'src/state/psarstake/hooks';
import { getEtherscanLink } from 'src/utils';
import { Box, Button, CurrencyLogo, Loader, Stat, Text } from '../../..';
import { ErrorBox, ErrorWrapper, Footer, Header, Link, Root, SubmittedWrapper, TokenRow } from './styled';

interface Props {
  isOpen: boolean;
  stakeAmount?: CurrencyAmount;
  token: Token;
  dollerWorth?: number;
  position: Position;
  attemptingTxn: boolean;
  txHash: string | null;
  onConfirm: () => void;
  errorMessage: string | null;
  onClose: () => void;
}

const ConfirmDrawer: React.FC<Props> = (props) => {
  const { isOpen, stakeAmount, token, dollerWorth, position, attemptingTxn, errorMessage, txHash, onClose, onConfirm } =
    props;

  const { chainId } = usePangolinWeb3();
  const theme = useContext(ThemeContext);

  // text to show while loading
  const pendingText = `Staking ${stakeAmount?.toSignificant(6) ?? 0} ${token.symbol}`;

  const oldBalance = position.amount;
  const newBalance = oldBalance.add((stakeAmount?.raw ?? 0).toString()).add(position.pendingRewards);

  const newAPR = position.rewardRate.mul(86400).mul(365).mul(100).div(newBalance);

  const weeklyPNG = position.rewardRate.mul(86400).mul(7);

  const ConfirmContent = (
    <Root>
      <Header>
        <TokenRow>
          <Text fontSize={24} fontWeight={500} color="text1" style={{ marginRight: '12px' }}>
            Adding more {stakeAmount?.toSignificant(6) ?? 0}
          </Text>
          <CurrencyLogo currency={token} size={24} imageSize={48} />
        </TokenRow>
        <Box display="inline-grid" style={{ gridGap: '10px', gridTemplateColumns: 'auto auto' }}>
          <Stat title="Dolar Value" titlePosition="top" stat={`${dollerWorth ?? 0}$`} titleColor="text2" />
          <Stat title="New APR" titlePosition="top" stat={`${newAPR}%`} titleColor="text2" />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Text color="text1">Weekly PNG Distributed</Text>
          <Text color="text1">
            {numeral(formatEther(weeklyPNG)).format('0.00a')} {token.symbol}
          </Text>
        </Box>
        <Text color="text1" fontWeight={400} fontSize="14px" textAlign="center">
          A stake action will create a SAR Nft for you.
          <br /> With this NFT you can manage your PSB stake.
          <br />
          <br /> Your Apr will start from 0 and increase the amount you take from reward pool by time.
        </Text>
      </Header>
      <Footer>
        <Box my={'10px'}>
          <Button variant="primary" onClick={onConfirm}>
            Add
          </Button>
        </Box>
      </Footer>
    </Root>
  );

  const PendingContent = <Loader size={100} label={pendingText} />;

  const ErroContent = (
    <ErrorWrapper>
      <ErrorBox>
        <AlertTriangle color={theme.red1} style={{ strokeWidth: 1.5 }} size={64} />
        <Text fontWeight={500} fontSize={16} color={'red1'} style={{ textAlign: 'center', width: '85%' }}>
          {errorMessage}
        </Text>
      </ErrorBox>
      <Button variant="primary" onClick={onClose}>
        Dismiss
      </Button>
    </ErrorWrapper>
  );

  const SubmittedContent = (
    <SubmittedWrapper>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingY={'20px'}>
        <Box flex="1" display="flex" alignItems="center">
          <img src={CircleTick} alt="circle-tick" />
        </Box>
        <Text fontSize={16} color="text1">
          You have successfully staked your token.
        </Text>
        <Text fontSize={16} color="text1">
          Your APR will be recalculated.
        </Text>
        {chainId && txHash && (
          <Link
            as="a"
            fontWeight={500}
            fontSize={14}
            color={'primary'}
            href={getEtherscanLink(chainId, txHash, 'transaction')}
          >
            View on explorer
          </Link>
        )}
      </Box>
      <Button variant="primary" onClick={onClose}>
        Close
      </Button>
    </SubmittedWrapper>
  );

  return (
    <Drawer title={errorMessage || txHash || attemptingTxn ? '' : 'Summary'} isOpen={isOpen} onClose={onClose}>
      {errorMessage ? ErroContent : txHash ? SubmittedContent : attemptingTxn ? PendingContent : ConfirmContent}
    </Drawer>
  );
};
export default ConfirmDrawer;
