#!groovy

@Library("workflowlibs") _

pipeline {

    agent none

    options {
        ansiColor colorMapName: 'XTerm'
        timestamps()
    }

    stages {
        stage('Checkout Global Library') {
            steps {
                script{
                    globalBootstrap {
                        libraryName   = "cellsworkflowlibs"
                        libraryBranch = "master"

                        entrypointParams = [
                            type                  : "cellsLitComponent",
                            lint                  :  true,
                            sonarQube             :  true,
                            test                  :  true,
                            publish               :  true,
                            deploySecGCP          :  true
                        ]
                    }
                }
            }
        }
    }
}