const timeout = { timeout: 6000 };

class HealthGoalsPage {
  getStart(start) {
    cy.contains(start, timeout).click();
  }
  selectGoals(goals) {
    goals.forEach(goal => {
      cy.get(`[data-testid="option-${goal}"]`, timeout).click();
    });
  }

  clickNext() {
    cy.contains('Next', timeout).click();
  }
}
module.exports = { HealthGoalsPage };