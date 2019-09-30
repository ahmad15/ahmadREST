pipeline {
  environment {
    registry = "ahmadpl/ahmad-ms"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  tools {nodejs "Node" }
  stages {
    stage('Cloning Git') {
        steps {
            git 'https://github.com/ahmad15/ahmadREST.git'
        }
    }
    stage('Build') {
       steps {
         sh 'npm install'
       }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$GIT_COMMIT"
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$GIT_COMMIT"
      }
    }
  }
}
