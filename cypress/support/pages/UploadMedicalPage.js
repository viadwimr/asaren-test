const timeout = { timeout: 6000 };

class UploadMedicalPage {
  skipUploadMedical() {
    cy.get('[data-testid="onboarding-medicalsource-button-skip"]', timeout).click();
    cy.get('[data-testid="onboarding-skip-button-skip"]', timeout).click();
  }
}
module.exports = { UploadMedicalPage };