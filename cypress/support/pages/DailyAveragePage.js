const timeout = { timeout: 6000 };

class DailyAveragePage {
  selectDailyAverage() {
    cy.get('[data-testid="onboarding-dailyaverage-button-emotion-db1"]', timeout).click();
  }

  clickNext() {
    cy.contains('Next').click();
  }

  checkErrorMessages() {
    return cy.get('.error-message');
  }
}
module.exports = { DailyAveragePage };