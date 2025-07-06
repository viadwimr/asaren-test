const timeout = { timeout: 6000 };

class MedicalHistoryPage {
  selectMedicalHistory() {
    cy.get('[data-testid="onboarding-personaldisease-item-0"]', timeout).click();
  }

  clickNext() {
    cy.contains('Next').click();
  }
}
module.exports = { MedicalHistoryPage };