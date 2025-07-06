const timeout = { timeout: 6000 };

class PhysicalActivityPage {
  selectActivity(activity) {
    cy.get('[data-testid="activity-modal-placeholder"]', timeout).click();
    cy.get(activity, timeout).click();
    cy.get('[data-testid="onboarding-activity-modal-button-add"]', timeout).click();
  }

  clickNext() {
    cy.contains('Next').click();
  }

  checkErrorMessages() {
    return cy.get('.error-message');
  }
}
module.exports = { PhysicalActivityPage };