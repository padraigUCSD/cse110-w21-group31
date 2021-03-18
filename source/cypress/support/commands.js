// eslint-disable-next-line import/no-extraneous-dependencies
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command.js';

addMatchImageSnapshotCommand({
  failureThreshold: 0.5, // allow up to 0.5% discrepancy between snapshots to account for inconsistent text rendering across environments
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.1 },
  capture: 'viewport',
});

/**
 * Add any commands to run before each spec here. Call cy.prepare() in the before() section of any spec.
 *
 * Currently cy.visit()'s the URL specified in process.env.URL, or localhost:8080 if unspecified.
 */
Cypress.Commands.add('prepare', () => {
  const url = process.env.URL || 'http://localhost:8080';
  cy.visit(url);
})

/**
 * Advances the timer `times` many times. Must be called after a fresh reload as it sets up a .clock() and
 * expects to find the start button. Also expects AutoBreak/AutoPomo to be disabled.
 */
Cypress.Commands.add('advanceTimer', times => {
  cy.clock();
  cy.get('#control').click();

  const POMO_TIME = 25 * 60 * 1000;
  const BREAK_TIME = 5 * 60 * 1000;
  const LBREAK_TIME = 30 * 60 * 1000;
  // start at 1 since the 0th button press was #control.click() above
  for (let i = 1; i < times; i++) {
    cy.tick(i % 8 === 0 ? LBREAK_TIME : i % 2 === 0 ? BREAK_TIME : POMO_TIME)
      .get('#transition-btn').click()
  }
})
