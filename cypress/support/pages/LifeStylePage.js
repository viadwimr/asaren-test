const timeout = { timeout: 6000 };

class LifestylePage {
  selectLifeStyle() {
    cy.get('[data-testid="onboarding-smoking-habit-item-never"]', timeout).click();
  }

  clickNext() {
    cy.contains('Next').click();
  }

}
module.exports = { LifestylePage };