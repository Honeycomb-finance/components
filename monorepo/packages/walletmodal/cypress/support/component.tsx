// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import { Web3Provider } from '@ethersproject/providers';
import { HoneycombProvider } from '@pangolindex/honeycomb-provider';
import { NetworkContextName, useActiveWeb3React } from '@pangolindex/shared';
import { Web3ReactProvider, createWeb3ReactRoot, useWeb3React } from '@web3-react/core';
import { theme } from '../../src/utils/theme';

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
}

function Component(children: React.ReactNode) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <HoneycombProvider library={undefined} chainId={43114} account={undefined} theme={theme as any}>
          {children}
        </HoneycombProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}

Cypress.Commands.add('mount', (children, options, rerenderKey) => {
  return mount(Component(children), options, rerenderKey)
})

// Example use:
// cy.mount(<MyComponent />)