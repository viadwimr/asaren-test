const timeout = { timeout: 6000 };

class TypicalDayPage {
  selectRange(value) {
    cy.wait(1000);
    cy.get('input[type="range"]').invoke('val', value).trigger('input')
    cy.wait(1000);
    cy.get('input[type="range"]').should('have.value', value)
  }

  selectTypicalDay() {
    cy.get('[data-testid="counter-button-increment"]', timeout).click();
  }

  clickNext() {
    cy.contains('Next').click();
  }

  checkErrorMessages() {
    return cy.get('.error-message');
  }
}
module.exports = { TypicalDayPage };