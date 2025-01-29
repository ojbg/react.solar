pipeline {
    agent any

    environment {
        APP_URL = 'react.solar.no-labs.com'
        PROJECT_PATH = '/home/iser/apps'
         SERVER_IP = '78.28.64.134'
        user='iser'
        remote="host=ssh://${user}@${SERVER_IP}"
        credentials='Liikva'  
        logPath='/home/iser/apps/logs'
        nginxPath='/etc/nginx/sites-available'
        temp='/home/iser/temp'
    }

    tools { nodejs "nodejs"}

    stages {
        stage('Setup') {
            steps {
                echo 'Create log files'
                sshCommand("sudo touch ${logPath}/${APP_URL}.access.log ${logPath}/${APP_URL}.error.log")                
            }
        }

        stage('Build webapp') {
            steps {
                echo 'Install npm dependencies'
                sh 'npm install'

                echo 'Building webapp'
                sh 'npm run build'
            }
        }

          stage('Setup docker') {
            steps {
                echo 'create docker context'
                sh "docker context create remote --docker ${remote}"
                echo 'use remote context'
                sh 'docker context use remote'
            }
        }

        stage('Deploy') {
            steps {
                echo 'deploy docker containers'              
                sshagent([credentials]) {
                    sh 'docker compose build --no-cache'
                    sh 'docker compose up -d'
                }                
            }
        }

        stage('Nginx') {
        steps {
            echo 'copy nginx conf'
            sshagent([credentials]) {
                sh "scp ${WORKSPACE}/nginx/${APP_URL}.conf ${user}@${SERVER_IP}:${temp}"
            }                    

            echo 'setup nginx conf'
            sshagent([credentials]) {
                sh """
                    ssh ${user}@${SERVER_IP} sudo -S bash -c '"mv ${temp}/${APP_URL}.conf ${nginxPath} && \
                    ln -sf ${nginxPath}/${APP_URL}.conf /etc/nginx/sites-enabled/${APP_URL}.conf && \
                    nginx -s reload"'
                """
            }              
            }
        }
    }

     post {
        always {
            cleanDockerContext()
        }
    }
}

def cleanDockerContext () {
    echo 'use default context'
    sh 'docker context use default'
    echo 'delete docker remote context'
    sh 'docker context rm remote'
}

def sshCommand (command) {
    sshagent([credentials]) {
        sh "ssh -o StrictHostKeyChecking=no -l ${user} ${SERVER_IP} '${command}'"
     }
}