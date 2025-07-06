const { HealthGoalsPage } = require('../support/pages/HealthGoalsPage');
const { AnyConditionsPage } = require('../support/pages/AnyConditionsPage');
const { AboutYouPage } = require('../support/pages/AboutYouPage');
const { PhysicalExamPage } = require('../support/pages/PhysicalExamPage');
const { PhysicalActivityPage } = require('../support/pages/PhysicalActivityPage');
const { DailyAveragePage } = require('../support/pages/DailyAveragePage');
const { TypicalDayPage } = require('../support/pages/TypicalDayPage');
const { LifestylePage } = require('../support/pages/LifeStylePage');

const timeout = { timeout: 6000 };

describe('Life Style', () => {
  const healthGoalsPage = new HealthGoalsPage();
  const anyConditionsPage = new AnyConditionsPage();
  const aboutYouPage = new AboutYouPage();
  const physicalExamPage = new PhysicalExamPage();
  const physicalActivityPage = new PhysicalActivityPage();
  const dailyAveragePage = new DailyAveragePage();
  const typicalDayPage = new TypicalDayPage();
  const lifeStylePage = new LifestylePage();

  it('TC008-1 - Verify user can input valid', () => {
    cy.visit('/');
    healthGoalsPage.getStart('Get started today');
    healthGoalsPage.selectGoals([0]);
    healthGoalsPage.clickNext();
    anyConditionsPage.selectConditions(['[data-testid="option-0"]', '[data-testid="option-1"]']);
    anyConditionsPage.clickNext();
    aboutYouPage.selectGender('[data-testid="onboarding-gender-item-male"] > .ion-no-padding');
    aboutYouPage.selectBirthDate('1');
    aboutYouPage.selectEtnicity('[data-testid="onboarding-ethnicity-option-0"]');
    aboutYouPage.clickNext();
    cy.wait(1000);
    physicalExamPage.fillPhysicalData('57', '154');
    physicalExamPage.clickNext();
    physicalActivityPage.selectActivity('[data-testid="activity-modal-option-0"]');
    physicalActivityPage.clickNext();
    dailyAveragePage.selectDailyAverage();
    dailyAveragePage.clickNext();
    typicalDayPage.selectTypicalDay();
    typicalDayPage.clickNext();
    lifeStylePage.selectLifeStyle();
    lifeStylePage.clickNext();
    cy.contains('diagnosed', timeout).should('be.visible');

  });
});

/*
describe('TC004 - Answer lifestyle survey', () => {
  const healthGoalsPage = new HealthGoalsPage();
  const physicalExamPage = new PhysicalExamPage();
  const medicalHistoryPage = new MedicalHistoryPage();
  const lifestylePage = new LifestylePage();

  it('should allow answering all lifestyle questions', () => {
    cy.visit('/');
    healthGoalsPage.selectGoals(['Lose Weight']);
    healthGoalsPage.clickNext();
    physicalExamPage.fillPhysicalData('60', '160');
    physicalExamPage.clickNext();
    medicalHistoryPage.selectCondition('Diabetes', 'No');
    medicalHistoryPage.selectCondition('High Blood Pressure', 'No');
    medicalHistoryPage.clickNext();
    lifestylePage.answerSurvey([
      { question: 'Do you smoke?', answer: 'No' },
      { question: 'Do you drink alcohol?', answer: 'No' },
      { question: 'How often do you exercise?', answer: 'Often' }
    ]);
    lifestylePage.clickNext();
    cy.contains('Your Biological Age').should('be.visible');
  });
});
*/