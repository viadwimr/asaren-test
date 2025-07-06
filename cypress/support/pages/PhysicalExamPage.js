const timeout = { timeout: 6000 };

class PhysicalExamPage {
  fillPhysicalData(weight, height) {
    cy.get('[data-testid="weight-input"] > .input-wrapper > .native-wrapper').type(weight);
    cy.get('[data-testid="onboarding-height-input-value"] > .input-wrapper > .native-wrapper').type(height);
  }

  clickNext() {
    cy.contains('Next').click();
  }

  checkErrorMessages() {
    return cy.get('.error-message');
  }
}
module.exports = { PhysicalExamPage };