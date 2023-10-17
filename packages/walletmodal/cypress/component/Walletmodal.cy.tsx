import React from 'react';
import WalletModal from '../../src/components/WalletModal';
import './index.css';

describe('Walletmodal', () => {
  it('renders', () => {
    cy.viewport(1300, 750);
    cy.mount(
      <WalletModal
        open
        closeModal={() => console.log('Close')}
        onWalletConnect={(wallet) => console.log('Connected wallet: ', wallet)}
      />,
    );
  });

  it('render stellar chain and freighter wallet mainnet', () => {
    cy.viewport(1300, 750);
    cy.mount(
      <WalletModal
        open
        closeModal={() => console.log('Close')}
        onWalletConnect={(wallet) => console.log('Connected wallet: ', wallet)}
      />,
    );

    const stellarChainButton = cy.get('button#7566437');
    stellarChainButton.should('exist');
    stellarChainButton.click();

    const freighterWallet = cy.get('#freighterwallet');
    freighterWallet.should('exist');
    freighterWallet.click();
    cy.contains('Connect Wallet').click();

    cy.waitUntil(() => cy.contains('Error connecting, try again.'));
  });

  it('render stellar chain and freighter wallet testnet', () => {
    cy.viewport(1300, 750);
    cy.mount(
      <WalletModal
        open
        closeModal={() => console.log('Close')}
        onWalletConnect={(wallet) => console.log('Connected wallet: ', wallet)}
      />,
    );
    cy.contains('Testnet').click();

    const stellarChainButton = cy.get('button#7566438');
    stellarChainButton.should('exist');
    stellarChainButton.click();

    const freighterWallet = cy.get('#freighterwallet');
    freighterWallet.should('exist');
    freighterWallet.click();
    cy.contains('Connect Wallet').click();

    cy.waitUntil(() => cy.contains('Error connecting, try again.'));
  });
});
