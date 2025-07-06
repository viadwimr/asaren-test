def discordStatus = ""
def filename = ""
pipeline {
  agent {
    label 'agent-appium-pub'
  }

  tools {
    nodejs 'nodeJs17'
  }

  stages {
    stage('Install Xvfb') {
      steps {
        script {
          try {
            sh '''
            if ! command -v Xvfb &> /dev/null; then
              echo "Xvfb not found, installing..."
              apt-get update
              apt-get install -y xvfb
            else
              echo "Xvfb is already installed"
            fi
            '''
          } catch(Exception e) {
            error("Failed to install Xvfb")
          }
        }
      }
    }

    stage('Building') {
      steps {
        sh 'npm ci'
        sh 'npm run cy:verify'
      }
    }

    stage('Testing') {
      steps {
        script {
          try {
            def now = new Date()
            def hour = now.getHours()
            def day = now.getDay()
            println hour
            // if(JOB_NAME == 'test' && day == 0 && hour == 2) {
            if(JOB_NAME == 'test') {
              filename = "HealthGoals"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/1-HealthGoals.cy.js' --env allure=true"
            }
          } catch(Exception e) {
            currentBuild.result = 'FAILURE'
          }
        }
      }
      post {
        always {
          script {
            if(filename == "") {
              currentBuild.result = 'ABORTED'
              println("No filename set, marking build as ABORTED.")
            } else {
              if(currentBuild.result == 'FAILURE') {
                discordStatus = 'https://storage.googleapis.com/success_bug_icon/failed.png'
              } else if (currentBuild.currentResult == 'SUCCESS') {
                discordStatus = 'https://storage.googleapis.com/success_bug_icon/passed.png'
              }
              println("Discord status set to: ${discordStatus}")
            }
          }
        }
      }
    }
  }
  post {
    success {
      echo "Sending Discord notification..."
      echo "Discord status: ${discordStatus}"
      echo "Job name: ${JOB_NAME}"
      echo "Build display name: ${BUILD_DISPLAY_NAME}"
      echo "Build URL: ${env.BUILD_URL}/allure"
      echo "Current result: ${currentBuild.currentResult}"
      echo "Filename: ${filename}"
      // sh 'allure generate allure-results --clean -o allure-report'
      // sh 'allure open allure-report'
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      discordSend customAvatarUrl: "https://cdn-icons-png.flaticon.com/512/573/573131.png?w=740&t=st=1662092610~exp=1662093210~hmac=371422cdcab8bcef11a630644d30876eabb73ac7c0dd627d7ed6360054ae3259", 
      customUsername: "Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "${filename}",  
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/${url}"
      echo "Discord notification sent."
      deleteDir()
    }
    failure {
      echo "Sending Discord notification..."
      echo "Discord status: ${discordStatus}"
      echo "Job name: ${JOB_NAME}"
      echo "Build display name: ${BUILD_DISPLAY_NAME}"
      echo "Build URL: ${env.BUILD_URL}/allure"
      echo "Current result: ${currentBuild.currentResult}"
      echo "Filename: ${filename}"
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      discordSend customAvatarUrl: "https://cdn-icons-png.flaticon.com/512/573/573131.png?w=740&t=st=1662092610~exp=1662093210~hmac=371422cdcab8bcef11a630644d30876eabb73ac7c0dd627d7ed6360054ae3259", 
      customUsername: "Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "${filename}",  
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/${url}"
      echo "Discord notification sent."
      deleteDir()
    }
  }
}
