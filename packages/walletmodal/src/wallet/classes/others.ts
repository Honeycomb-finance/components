import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { IS_IN_IFRAME } from '@honeycomb-finance/shared';
import {
  WalletConnectConnector,
  WalletConnectConnectorArguments,
  gnosisSafe,
  walletlink,
} from '@honeycomb-finance/wallet-connectors';
import { NetworkType } from '@pangolindex/sdk';
import { isMobile } from 'react-device-detect';
import gnosisSafeIcon from 'src/assets/images/gnosis_safe.png';
import coinbaseWalletIcon from 'src/assets/svg/coinbaseWalletIcon.svg';
import walletConnectIcon from 'src/assets/svg/walletConnectIcon.svg';
import { Wallet, activeFunctionType } from './wallet';

export class GnosisSafeWallet extends Wallet {
  private isInSafe =
    !isMobile &&
    IS_IN_IFRAME &&
    (location.hostname === 'app.safe.global' || location.hostname.endsWith('.safe.global'));

  private triedSafe = false;

  constructor() {
    super({
      connector: gnosisSafe,
      name: 'Gnosis Safe',
      href: 'https://app.safe.global/',
      icon: gnosisSafeIcon,
      description: 'Gnosis Safe Multisig Wallet.',
      supportedChains: [NetworkType.EVM],
    });
  }

  showWallet(): boolean {
    return this.isInSafe;
  }

  installed(): boolean {
    return this.isInSafe;
  }

  override async tryActivation({
    activate,
    onSuccess,
    onError,
  }: {
    activate: activeFunctionType;
    onSuccess?: () => void;
    onError?: (error: unknown) => Promise<void>;
  }) {
    if (!this.triedSafe) {
      const loadedSafe = await (this.connector as SafeAppConnector).isSafeApp();
      if (loadedSafe) {
        await super.tryActivation({ activate, onSuccess, onError });
      }
      this.triedSafe = true;
    }
  }
}

export class CoinbaseWallet extends Wallet {
  private isCbWalletDappBrowser = window?.ethereum?.isCoinbaseWallet;
  private isWalletlink = !!window?.WalletLinkProvider || !!window?.walletLinkExtension;
  private isCbWallet = this.isCbWalletDappBrowser ?? this.isWalletlink;

  constructor() {
    super({
      connector: walletlink,
      name: 'Coinbase Wallet',
      href: 'https://www.coinbase.com/wallet',
      icon: coinbaseWalletIcon,
      description: 'Your key to the world of crypto.',
      supportedChains: [NetworkType.EVM],
    });
  }

  showWallet(): boolean {
    return !isMobile;
  }

  installed(): boolean {
    return this.isCbWallet;
  }
}

export class WalletConnectWallet extends Wallet {
  /**
   *
   * @param projectId Your projectId from WalletConnect
   * @param rpcMap Supported chains mapping with rpc url
   * @param metadata Your project metadata
   */
  constructor(config: WalletConnectConnectorArguments) {
    const walletconnectConnector = new WalletConnectConnector(config);
    super({
      connector: walletconnectConnector,
      name: 'WalletConnect',
      href: 'https://walletconnect.com/',
      icon: walletConnectIcon,
      description:
        'With WalletConnect, you can connect your wallet with hundreds of apps, opening the doors to a new world of web3 experiences.',
      supportedChains: [NetworkType.EVM],
    });
  }

  showWallet(): boolean {
    return !isMobile;
  }

  installed(): boolean {
    return true;
  }
}
