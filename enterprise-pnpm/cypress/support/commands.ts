/// <reference types="cypress" />

// Custom commands for Enterprise PNPM Template

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to clear local storage and reset app state
       */
      resetAppState(): Chainable<void>;
      
      /**
       * Custom command to set theme preference
       */
      setTheme(theme: 'light' | 'dark'): Chainable<void>;
    }
  }
}

Cypress.Commands.add('resetAppState', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
});

Cypress.Commands.add('setTheme', (theme: 'light' | 'dark') => {
  cy.window().then((win) => {
    const appStore = JSON.stringify({
      state: { theme },
      version: 0,
    });
    win.localStorage.setItem('app-store', appStore);
  });
});

export {};