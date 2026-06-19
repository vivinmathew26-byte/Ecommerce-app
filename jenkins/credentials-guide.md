# 🔐 Jenkins Credentials Setup Guide

Go to: Jenkins → Manage Jenkins → Credentials → Global → Add Credentials

## Required Credentials (add all 5)

### 1. DOCKERHUB_USER
- Kind: Secret text
- ID: DOCKERHUB_USER
- Secret: your_dockerhub_username

### 2. DOCKERHUB_PASS
- Kind: Secret text
- ID: DOCKERHUB_PASS
- Secret: your_dockerhub_password

### 3. EC2_HOST
- Kind: Secret text
- ID: EC2_HOST
- Secret: your_ec2_public_ip  (e.g. 54.123.45.67)

### 4. EC2_USER
- Kind: Secret text
- ID: EC2_USER
- Secret: ubuntu

### 5. EC2_SSH_KEY
- Kind: SSH Username with private key
- ID: EC2_SSH_KEY
- Private Key: paste contents of your .pem file

## Required Jenkins Plugins
Install from: Manage Jenkins → Plugins → Available

- Docker Pipeline
- SSH Agent
- Pipeline
- Git
- Credentials Binding

## Create Pipeline Job
1. New Item → Pipeline
2. Name: ecommerce-pipeline
3. Pipeline → Definition: Pipeline script from SCM
4. SCM: Git
5. Repository URL: https://github.com/yourusername/ecommerce
6. Script Path: jenkins/Jenkinsfile
7. Save → Build Now
