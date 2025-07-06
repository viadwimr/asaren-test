const timeout = { timeout: 6000 };

class AboutYouPage {
  selectGender(gender) {
    cy.get(gender, timeout).click();
  }

  selectBirthDate(dayBirth) {
    cy.get('[data-testid="onboarding-dob-text-value-default"]', timeout).click();
    cy.wait(3000);
    cy.get('ion-datetime')
      .shadow()
      .find('button.calendar-day')
      .contains(dayBirth)
      .click();
    cy.get('ion-datetime')
      .shadow()
      .find('#confirm-button')
      .should('be.visible')
      .click();
  }

  selectEtnicity(ethnic) {
    cy.wait(1000);
    cy.get('[data-testid="onboarding-ethnicity-item-value"]', timeout).click();
    cy.wait(1000);
    cy.get(ethnic, timeout).click();
  }

  clickNext() {
    cy.contains('Next').click();
  }

  checkErrorMessages() {
    return cy.get('.error-message');
  }
}
module.exports = { AboutYouPage };