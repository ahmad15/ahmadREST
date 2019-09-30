pipeline {
  agent any
 
  tools {nodejs "Node"}
 
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/ahmad15/ahmadREST'
      }
    }
    
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
  }
}
