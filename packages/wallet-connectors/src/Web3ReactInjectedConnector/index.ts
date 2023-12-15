import { AbstractConnector } from '@web3-react/abstract-connector';
import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types';
import { Send, SendOld, SendReturn, SendReturnResult } from './types';

function parseSendReturn(sendReturn: SendReturnResult | SendReturn): any {
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn;
}

export class NoEthereumProviderError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'No Ethereum provider was found on window.ethereum.';
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'The user rejected the request.';
  }
}

export class InjectedConnector extends AbstractConnector {
  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs);

    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  private handleChainChanged(chainId: string | number): void {
    console.log("Handling 'chainChanged' event with payload", chainId);

    this.emitUpdate({ chainId, provider: window.ethereum });
  }

  private handleAccountsChanged(accounts: string[]): void {
    console.log("Handling 'accountsChanged' event with payload", accounts);

    if (accounts.length === 0) {
      this.emitDeactivate();
    } else {
      this.emitUpdate({ account: accounts[0] });
    }
  }

  private handleClose(code: number, reason: string): void {
    console.log("Handling 'close' event with payload", code, reason);

    this.emitDeactivate();
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!window.ethereum) {
      throw new NoEthereumProviderError();
    }

    if (window.ethereum.on) {
      window.ethereum.on('chainChanged', this.handleChainChanged);
      window.ethereum.on('accountsChanged', this.handleAccountsChanged);
      window.ethereum.on('close', this.handleClose);
    }

    if ((window.ethereum as any).isMetaMask) {
      (window.ethereum as any).autoRefreshOnNetworkChange = false;
    }

    // try to activate + get account via eth_requestAccounts
    let account;
    try {
      account = await (window.ethereum.send as Send)('eth_requestAccounts').then(
        (sendReturn) => parseSendReturn(sendReturn)[0],
      );
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError();
      }
      console.warn('eth_requestAccounts was unsuccessful, falling back to enable');
    }

    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      account = await window.ethereum.enable().then((sendReturn) => sendReturn && parseSendReturn(sendReturn)[0]);
    }

    return { provider: window.ethereum, ...(account ? { account } : {}) };
  }

  public async getProvider(): Promise<any> {
    return window.ethereum;
  }

  public async getChainId(): Promise<number | string> {
    if (!window.ethereum) {
      throw new NoEthereumProviderError();
    }

    let chainId;
    try {
      chainId = await (window.ethereum.send as Send)('eth_chainId').then(parseSendReturn);
    } catch {
      console.warn('eth_chainId was unsuccessful, falling back to net_version');
    }

    if (!chainId) {
      try {
        chainId = await (window.ethereum.send as Send)('net_version').then(parseSendReturn);
      } catch {
        console.warn('net_version was unsuccessful, falling back to net version v2');
      }
    }

    if (!chainId) {
      try {
        chainId = parseSendReturn((window.ethereum.send as SendOld)({ method: 'net_version' }));
      } catch {
        console.warn('net_version v2 was unsuccessful, falling back to manual matches and static properties');
      }
    }

    if (!chainId) {
      if ((window.ethereum as any).isDapper) {
        chainId = parseSendReturn((window.ethereum as any).cachedResults.net_version);
      } else {
        chainId =
          (window.ethereum as any).chainId ||
          (window.ethereum as any).netVersion ||
          (window.ethereum as any).networkVersion ||
          (window.ethereum as any)._chainId;
      }
    }

    return chainId;
  }

  public async getAccount(): Promise<null | string> {
    if (!window.ethereum) {
      throw new NoEthereumProviderError();
    }

    let account;
    try {
      account = await (window.ethereum.send as Send)('eth_accounts').then(
        (sendReturn) => parseSendReturn(sendReturn)[0],
      );
    } catch {
      console.warn('eth_accounts was unsuccessful, falling back to enable');
    }

    if (!account) {
      try {
        account = await window.ethereum.enable().then((sendReturn) => parseSendReturn(sendReturn)[0]);
      } catch {
        console.warn('enable was unsuccessful, falling back to eth_accounts v2');
      }
    }

    if (!account) {
      account = parseSendReturn((window.ethereum.send as SendOld)({ method: 'eth_accounts' }))[0];
    }

    return account;
  }

  public deactivate() {
    if (window.ethereum && window.ethereum.removeListener) {
      window.ethereum.removeListener('chainChanged', this.handleChainChanged);
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
      window.ethereum.removeListener('close', this.handleClose);
    }
  }

  public async isAuthorized(): Promise<boolean> {
    if (!window.ethereum) {
      return false;
    }

    try {
      return await (window.ethereum.send as Send)('eth_accounts').then((sendReturn) => {
        if (parseSendReturn(sendReturn).length > 0) {
          return true;
        } else {
          return false;
        }
      });
    } catch {
      return false;
    }
  }
}
