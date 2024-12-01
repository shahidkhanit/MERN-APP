pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'shahidkhan777/mern-app'
        DOCKER_CREDENTIALS = 'docker-hub-cred' // The ID for Docker Hub credentials in Jenkins
        DOCKER_COMPOSE_SERVER = 'docker-compose-server' // The Docker Compose server node name
    }
    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github-cred', url: 'https://github.com/shahidkhanit/MERN-APP', branch: 'main'
            }
        }
        stage('Build MERN App') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:latest .'
                }
            }
        }
        stage('Test MERN App') {
            steps {
                script {
                    // Add test commands for your MERN app as needed
                    sh 'docker run --rm $DOCKER_IMAGE:latest npm test'
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS", url: 'https://index.docker.io/v1/']) {
                        sh 'docker push $DOCKER_IMAGE:latest'
                    }
                }
            }
        }
        stage('Deploy on Docker Compose Server') {
            steps {
                script {
                    sshagent(['docker-compose-server-ssh-credentials']) { // Replace with the actual SSH credentials ID
                        sh """
                        ssh user@${DOCKER_COMPOSE_SERVER} 'docker pull $DOCKER_IMAGE:latest'
                        ssh user@${DOCKER_COMPOSE_SERVER} 'cd /path/to/docker-compose/ && docker-compose up -d'
                        """
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline Complete!'
        }
    }
}
