const timeout = { timeout: 6000 };

class AnyConditionsPage {
  selectConditions(conditions) {
    conditions.forEach(conditions => {
      cy.get(conditions, timeout).click();
    });
  }

  clickNext() {
    cy.contains('Next').click();
  }

  checkErrorMessages() {
    return cy.get('.error-message');
  }
}
module.exports = { AnyConditionsPage };