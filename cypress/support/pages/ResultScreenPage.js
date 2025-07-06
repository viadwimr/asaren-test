const timeout = { timeout: 6000 };

class ResultScreenPage {
  submitData() {
    cy.get('round-progress > svg')
      .trigger('touchstart')
      .wait(1000)
      .trigger('touchend');
    cy.get('.h-11', timeout).click();
    cy.get('.size-\\[24px\\]', timeout).click();
    cy.wait(5000);
    cy.get('.size-\\[20px\\]', timeout).click();
  }
}
module.exports = { ResultScreenPage };