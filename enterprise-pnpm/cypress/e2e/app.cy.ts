describe('Enterprise PNPM Template E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main title', () => {
    cy.contains('Enterprise PNPM Template').should('be.visible');
  });

  it('should display the subtitle', () => {
    cy.contains('Production-ready full-stack template').should('be.visible');
  });

  it('should have both buttons visible', () => {
    cy.get('[data-testid="primary-button"]')
      .should('be.visible')
      .and('contain.text', 'Click Me!');
    
    cy.get('[data-testid="secondary-button"]')
      .should('be.visible')
      .and('contain.text', 'Secondary Action');
  });

  it('should show alert when primary button is clicked', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });

    cy.get('[data-testid="primary-button"]').click();
    cy.get('@windowAlert').should('have.been.calledWith', 'Hello from Enterprise PNPM template!');
  });

  it('should show alert when secondary button is clicked', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });

    cy.get('[data-testid="secondary-button"]').click();
    cy.get('@windowAlert').should('have.been.calledWith', 'Secondary action executed!');
  });

  it('should update click statistics', () => {
    // Click primary button multiple times
    cy.get('[data-testid="primary-button"]').click();
    cy.get('[data-testid="primary-button"]').click();
    
    // Click secondary button once
    cy.get('[data-testid="secondary-button"]').click();
    
    // Check statistics
    cy.contains('Primary Button: 2 clicks').should('be.visible');
    cy.contains('Secondary Button: 1 clicks').should('be.visible');
    cy.contains('Total Clicks: 3').should('be.visible');
  });

  it('should clear statistics when clear button is clicked', () => {
    // Add some clicks first
    cy.get('[data-testid="primary-button"]').click();
    cy.get('[data-testid="secondary-button"]').click();
    
    // Clear stats
    cy.contains('Clear Stats').click();
    
    // Check that stats are reset
    cy.contains('Primary Button: 0 clicks').should('be.visible');
    cy.contains('Secondary Button: 0 clicks').should('be.visible');
    cy.contains('Total Clicks: 0').should('be.visible');
    
    // Clear button should be hidden
    cy.contains('Clear Stats').should('not.exist');
  });

  it('should toggle theme when theme button is clicked', () => {
    // Check initial theme (light)
    cy.get('body').should('have.css', 'background-color').and('contain', 'rgb(255, 255, 255)');
    
    // Click theme toggle
    cy.get('button[aria-label*="Switch to dark theme"]').click();
    
    // Check dark theme
    cy.get('body').should('have.css', 'background-color').and('contain', 'rgb(15, 23, 42)');
    
    // Toggle back to light
    cy.get('button[aria-label*="Switch to light theme"]').click();
    
    // Check light theme again
    cy.get('body').should('have.css', 'background-color').and('contain', 'rgb(255, 255, 255)');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    
    // Check that elements are still visible and properly arranged
    cy.contains('Enterprise Bun Template').should('be.visible');
    cy.get('[data-testid="primary-button"]').should('be.visible');
    cy.get('[data-testid="secondary-button"]').should('be.visible');
    
    // Buttons should stack vertically on mobile
    cy.get('[data-testid="primary-button"]')
      .then(($btn1) => {
        cy.get('[data-testid="secondary-button"]')
          .then(($btn2) => {
            expect($btn1[0].getBoundingClientRect().top)
              .to.be.lessThan($btn2[0].getBoundingClientRect().top);
          });
      });
  });

  it('should maintain accessibility standards', () => {
    // Check for proper ARIA labels
    cy.get('button[aria-label*="Switch to"]').should('exist');
    
    // Check for proper button roles
    cy.get('[data-testid="primary-button"]').should('have.attr', 'type', 'button');
    cy.get('[data-testid="secondary-button"]').should('have.attr', 'type', 'button');
    
    // Test keyboard navigation
    cy.get('[data-testid="primary-button"]').focus().should('be.focused');
    cy.get('[data-testid="primary-button"]').type('{enter}');
    
    // Should trigger the same action as click
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('keyboardAlert');
    });
  });
});