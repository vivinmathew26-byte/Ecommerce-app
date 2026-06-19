#!/bin/bash
# ============================================
# Jenkins Setup Script for EC2 Ubuntu
# Run this on your EC2 instance
# ============================================

set -e

echo "🔧 Installing Java..."
sudo apt update -y
sudo apt install -y openjdk-17-jdk

echo "🔧 Installing Jenkins..."
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update -y
sudo apt install -y jenkins

echo "🔧 Installing Docker..."
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker jenkins
sudo usermod -aG docker ubuntu
sudo systemctl enable docker
sudo systemctl start docker

echo "🔧 Installing Python & pip..."
sudo apt install -y python3 python3-pip python3-venv

echo "🔧 Starting Jenkins..."
sudo systemctl enable jenkins
sudo systemctl start jenkins

echo ""
echo "✅ Jenkins installed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Open: http://$(curl -s ifconfig.me):8080"
echo "🔑 Initial password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
