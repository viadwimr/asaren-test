const timeout = { timeout: 6000 };

class ParentDiagnosisPage {
  selectParentDiagnosis() {
    cy.get('[data-testid="onboarding-parenthistorydisease-item-0"]', timeout).click();
  }

  clickNext() {
    cy.contains('Next').click();
  }
}
module.exports = { ParentDiagnosisPage };