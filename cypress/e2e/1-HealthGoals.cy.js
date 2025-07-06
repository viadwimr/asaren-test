const { HealthGoalsPage } = require('../support/pages/HealthGoalsPage');

const timeout = { timeout: 6000 };

describe('Health Goals', () => {
  const healthGoalsPage = new HealthGoalsPage();
  const randomNumber = Math.floor(Math.random() * 4);

  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit('/');
    cy.wait(3000);
    healthGoalsPage.getStart('Get started today');
  });

  it('TC001-1 - Verify user can select only one health goal', () => {
    healthGoalsPage.selectGoals([randomNumber]);
    cy.get('ion-text.active').should('have.length', 1);
    healthGoalsPage.clickNext();
    cy.contains('any conditions').should('be.visible');
  });

  it(`TC001-2 - Verify user cannot proceed without selecting a health goal`, () => {
    cy.get('ion-button').then(($btn) => {
      const isDisabledAttr = $btn.is(':disabled');
      const hasDisabledClass = $btn.hasClass('button-disabled');
      expect(isDisabledAttr || hasDisabledClass).to.be.true;
    });
  });

  it(`TC001-3 - Verify user cannot select “Other” without entering a custom health goal`, () => {
    healthGoalsPage.selectGoals([4]);
    cy.get('ion-button').then(($btn) => {
      const isDisabledAttr = $btn.is(':disabled');
      const hasDisabledClass = $btn.hasClass('button-disabled');
      expect(isDisabledAttr || hasDisabledClass).to.be.true;
    });
  });

  it(`TC001-4 - Verify user can select other with input custom health goals`, () => {
    healthGoalsPage.selectGoals([4]);
    cy.get('#ion-input-0', timeout).type('~!@#$%^&*()_+ QWERTYUIOPASDFGHJKLzxcvbnm,..//`1234567890-=  qwertyuiop[]asdfghjkl;zxcvbnm,.');
    cy.get('ion-text.active').should('have.length', 1);
    healthGoalsPage.clickNext();
    cy.contains('any conditions').should('be.visible');
  });

  it(`TC001-5 - Verify user can't select multiple health goals`, () => {
    healthGoalsPage.selectGoals([randomNumber, randomNumber]);
    cy.get('ion-text.active').should('have.length', 1);
    healthGoalsPage.clickNext();
    cy.contains('any conditions').should('be.visible');
  });
});