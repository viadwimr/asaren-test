const { HealthGoalsPage } = require('../support/pages/HealthGoalsPage');
const { AnyConditionsPage } = require('../support/pages/AnyConditionsPage');
const { AboutYouPage } = require('../support/pages/AboutYouPage');
const { PhysicalExamPage } = require('../support/pages/PhysicalExamPage');
const { PhysicalActivityPage } = require('../support/pages/PhysicalActivityPage');
const { DailyAveragePage } = require('../support/pages/DailyAveragePage');
const { TypicalDayPage } = require('../support/pages/TypicalDayPage');
const { LifestylePage } = require('../support/pages/LifeStylePage');
const { MedicalHistoryPage } = require('../support/pages/MedicalHistoryPage');
const { ParentDiagnosisPage } = require('../support/pages/ParentDiagnosisPage');
const { UploadMedicalPage } = require('../support/pages/UploadMedicalPage');
const { ResultScreenPage } = require('../support/pages/ResultScreenPage');

const timeout = { timeout: 6000 };

describe('Result Screen', () => {
  const healthGoalsPage = new HealthGoalsPage();
  const anyConditionsPage = new AnyConditionsPage();
  const aboutYouPage = new AboutYouPage();
  const physicalExamPage = new PhysicalExamPage();
  const physicalActivityPage = new PhysicalActivityPage();
  const dailyAveragePage = new DailyAveragePage();
  const typicalDayPage = new TypicalDayPage();
  const lifeStylePage = new LifestylePage();
  const medicalHistoryPage = new MedicalHistoryPage();
  const parentDiagnosisPage = new ParentDiagnosisPage();
  const uploadMedicalPage = new UploadMedicalPage();
  const resultScreenPage = new ResultScreenPage();

  it('TC012-1 - Verify user can input valid', () => {
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
    medicalHistoryPage.selectMedicalHistory();
    medicalHistoryPage.clickNext();
    parentDiagnosisPage.selectParentDiagnosis();
    parentDiagnosisPage.clickNext();
    uploadMedicalPage.skipUploadMedical();
    resultScreenPage.submitData();
    cy.request({
      method: 'POST',
      url: 'https://api.test.asaren.ai/graphql',
      body: 
      {
        "operationName": "findLatestHealthScoreReport",
        "variables": {
          "deviceId": "d832355c-f38d-4e3a-a4dc-dc42e29930c8"
        },
        
        "query":  `query findLatestHealthScoreReport($typeId: String, $profileId: String, $deviceId: String) {
        HealthScore {
          Report {
            findOneLatest(typeId: $typeId, profileId: $profileId, deviceId: $deviceId) {
              id
              uncalculatedSource
              score
              description
              interpretation
              source
              isCalculating
              profileId
              deviceId
              createdAt
              predictiveStrength
              isRecommendationGenerated
              age {
                id
                differenceAge
                chronologicalAge
                chronologicalAgeFull {
                  years
                  months
                  days
                  __typename
                }
                estimatedBiologicalAge
                estimatedBiologicalAgeFull {
                  years
                  months
                  days
                  __typename
                }
                __typename
              }
              details {
                id
                healthScoreReportId
                healthScoreId
                profileId
                type
                analysis
                position
                __typename
              }
              summary {
                id
                strength
                opportunities
                topLifestyleBoosts {
                  id
                  takeaway
                  factor
                  action
                  __typename
                }
                explorePotential {
                  id
                  aspect
                  benefit
                  __typename
                }
                supportingReferences {
                  source
                  link
                  __typename
                }
                nextStep
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
     `
    }
    }).then((res) => {
      const report = res.body.data.HealthScore.Report.findOneLatest;
      const { score, interpretation, isCalculating, age, details } = report;

      if (isCalculating) {
        cy.contains('Based on the available quiz data').should('not.exist');
        return;
      }

      const synthesis = details.find(d => d.type === 'SYNTHESIS_AND_CONSIDETAIONS');
      expect(synthesis).to.exist;
      cy.contains(synthesis.analysis).should('be.visible');

      const explanations = details.filter(d => d.type === 'EXPLANATION');
      explanations.forEach((item) => {
        cy.contains(item.analysis).should('be.visible');
      });

      const biological = parseFloat(age.estimatedBiologicalAge);
      const chronological = parseFloat(age.chronologicalAge);
      const difference = parseFloat(age.differenceAge);
      expect(difference).to.be.closeTo(biological - chronological, 0.01);

      if (biological > chronological) {
        cy.contains('biological age is slightly higher').should('be.visible');
      } else if (biological < chronological) {
        cy.contains('biological age is slightly lower').should('be.visible');
      } else {
        cy.contains('same as your chronological age').should('be.visible');
      }

      cy.contains(score.toString()).should('be.visible');
      cy.contains(interpretation).should('be.visible');
    });
  });
});