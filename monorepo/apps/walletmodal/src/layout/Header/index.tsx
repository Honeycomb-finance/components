import { Box, Button } from '@pangolindex/core';
import { shortenAddressMapping, useActiveWeb3React, useChainId } from '@pangolindex/shared';
import {
  ApplicationModal,
  useApplicationState,
  useModalOpen,
  useWalletModalToggle,
  useWalletModalToggleWithChainId,
} from '@pangolindex/state-hooks';
import { WalletModal } from '@pangolindex/walletmodal';
import React, { useCallback } from 'react';
import { supportedWallets } from '../../constants';
import Logo from '../Logo';
import { HeaderFrame, MenuLink, Menuwrapper } from './styled';
import { stellarShortenAddress } from '../../utils';

export default function Header() {
  const context = useActiveWeb3React();
  const { account } = context;
  const chainId = useChainId();

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const onToogleWalletModal = useWalletModalToggleWithChainId();
  const onOpenWalletModal = useWalletModalToggle();
  const { walletModalChainId } = useApplicationState();

  let shortenAddress = shortenAddressMapping[chainId];
  if(!shortenAddress){
    shortenAddress =  stellarShortenAddress;
  }

  const closeWalletModal = useCallback(() => {
    onToogleWalletModal(undefined);
  }, [onToogleWalletModal]);

  return (
    <HeaderFrame>
      <Logo />
      <Box display="flex" flex={1}>
        <Menuwrapper>
          <MenuLink id="dashboard" to="/">
            Dashboard
          </MenuLink>
        </Menuwrapper>
        <Box display="grid" style={{ gap: '10px', gridAutoFlow: 'column' }}>
          <Button variant="primary" onClick={onOpenWalletModal} width="200px" height="40px">
            {account ? `Connected ${shortenAddress(account, chainId)}` : 'Connect Wallet'}
          </Button>
        </Box>
      </Box>
      <WalletModal
        open={walletModalOpen}
        closeModal={closeWalletModal}
        onWalletConnect={closeWalletModal}
        initialChainId={walletModalChainId}
        supportedWallets={supportedWallets}
      />
    </HeaderFrame>
  );
}
