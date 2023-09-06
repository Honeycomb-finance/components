import { JsonRpcProvider } from '@ethersproject/providers';
import { freighter } from '../src/FreighterConnector';

describe('testing freighter connector', () => {
  it('activate throw error', async () => {
    await expect(freighter.activate()).rejects.toThrow();
  });

  it('getProvider', async () => {
    await expect(freighter.getProvider()).resolves.toBeInstanceOf(JsonRpcProvider);
  });

  it('getChainId', async () => {
    await expect(freighter.getChainId()).resolves.toBe(7566437);
  });

  it('getAccount', async () => {
    await expect(freighter.getAccount()).resolves.toBe(null);
  });

  it('isAuthorized', async () => {
    await expect(freighter.isAuthorized()).resolves.toBe(false);
  });

  //it('sendTransaction', async () => {});
});
