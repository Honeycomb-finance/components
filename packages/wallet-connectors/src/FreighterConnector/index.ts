import { JsonRpcProvider } from '@ethersproject/providers';
import { getNetwork, getPublicKey, isAllowed, isConnected, setAllowed, signTransaction } from '@stellar/freighter-api';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types';
import axios from 'axios';

interface TransactionResponse{
  jsonrpc: '2.0'
  id: number,
  result: {
    hash: string,
    stattus: string;

  }
}

export class FreighterConnector extends AbstractConnector {
  private provider!: JsonRpcProvider;
  private chainId!: 7566437 | 7566438;
  private network!: string;
  private publicKey!: string;
  readonly url = `https://rpc-futurenet.stellar.org`; // This rpc not accepts EVM methods
  private normalizeChainId!: boolean;
  private normalizeAccount!: boolean;

  constructor(
    kwargs: AbstractConnectorArguments & {
      normalizeChainId: boolean;
      normalizeAccount: boolean;
    },
  ) {
    super(kwargs);
    this.normalizeChainId = kwargs.normalizeChainId;
    this.normalizeAccount = kwargs.normalizeAccount;
    this.chainId = 7566437;
  }

  public async activate(): Promise<ConnectorUpdate> {
    const connected = await isConnected();
    if (!connected) {
      throw new Error('Not found Freighter');
    }

    let publickey = '';

    try {
      publickey = await getPublicKey();
    } catch {
      console.debug('Freighter wallet not connected/authorized');
    }

    if (publickey.length === 0) {
      const allowed = await isAllowed();

      if (!allowed) {
        await setAllowed();
        publickey = await getPublicKey();
      }
    }

    const network = await getNetwork();

    // TODO: this is random numbers, we need to decide the numbers
    this.chainId = network === 'PUBLIC' ? 7566437 : 7566438;
    this.network = network;
    this.publicKey = publickey;

    this.provider = await this.getProvider();

    return { provider: this.provider, account: publickey, chainId: this.chainId };
  }

  public async getProvider(): Promise<any> {
    return new JsonRpcProvider(
      { url: this.url, timeout: 5000 },
      {
        chainId: this.chainId,
        name: 'Stellar',
      },
    );
  }

  public async getChainId(): Promise<number> {
    return this.chainId;
  }

  public async getAccount(): Promise<null | string> {
    const connected = await isConnected();
    if (!connected) {
      return null;
    }

    const publickey = await getPublicKey();
    return publickey;
  }

  // TODO: For now don't have a method in wallet for us deactive it
  public deactivate() {
    return;
  }

  public async isAuthorized(): Promise<boolean> {
    const connected = await isConnected();
    if (!connected) {
      return false;
    }

    const authorized = await isAllowed();
    return authorized;
  }

  public async sendTransaction(transactionXdr: string) {
    const connected = await isConnected();
    if (!connected || !this.publicKey) {
      throw new Error('Freighter not initialized!');
    }

    const signedTransaction = await signTransaction(transactionXdr, {
      network: this.network,
      accountToSign: this.publicKey,
    });

    const response = await axios.post<TransactionResponse>(this.url, {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "sendTransaction",
      "params": {
        "transaction": signedTransaction,
      }
    });

    return response.data.result.hash
  }
}

export const freighter = new FreighterConnector({
  supportedChainIds: [7566437, 7566438],
  normalizeAccount: false,
  normalizeChainId: false,
});
