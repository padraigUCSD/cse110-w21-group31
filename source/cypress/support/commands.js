// eslint-disable-next-line import/no-extraneous-dependencies
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command.js';

addMatchImageSnapshotCommand();

/**
 * Add any commands to run before each spec here. Call cy.prepare() in the before() section of any spec.
 *
 * Currently cy.visit()'s the URL specified in process.env.URL, or localhost:8080 if unspecified.
 */
Cypress.Commands.add('prepare', () => {
  const url = process.env.URL || 'http://localhost:8080';
  cy.visit(url);
})
