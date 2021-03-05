describe('Visual Diff Testing', () => {
  before(() => {
    cy.prepare();
    // Fix for https://github.com/jaredpalmer/cypress-image-snapshot/issues/82
    cy.viewport(1000, 660);
  });

  it('Initial load', () => {
    cy.matchImageSnapshot('first-load');
  });

  it('Opens sidebar', () => {
    // Need to force click as the element is not a button
    cy.get('.sidebarIconToggle').click({ force: true })
    cy.matchImageSnapshot('sidebar-open');

    cy.get('.sidebarIconToggle').click({ force: true })
    cy.matchImageSnapshot('sidebar-closed');
  });

  it('Starts the timer', () => {
    // Turn off the clock for consistency, we're only looking for the start button being hidden
    cy.clock();
    cy.get('#control').click();
    cy.matchImageSnapshot('timer-started');
  });
});
