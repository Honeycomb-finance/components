import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { HoneycombProvider } from '@pangolindex/honeycomb-provider';
import { NetworkContextName } from '@pangolindex/shared';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import getLibrary from '../src/utils/getLibrary';
import { injected } from '@pangolindex/wallet-connectors';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const InternalProvider = ({ children, theme }) => {
  const { library, chainId, account } = useWeb3ReactCore();

  return (
    <HoneycombProvider library={library} chainId={chainId} account={account ?? undefined} theme={theme}>
      {children}
    </HoneycombProvider>
  );
};

export const decorators = [
  (Story, metadata) => {
    const theme = metadata.args.theme ?? undefined;
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <InternalProvider theme={theme}>
            <Story />
          </InternalProvider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    );
  },
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
