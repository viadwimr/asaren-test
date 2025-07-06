import './commands'
import '@shelex/cypress-allure-plugin'

Cypress.on('uncaught:exception', (err, runnable) => false);

before(function () {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
});

