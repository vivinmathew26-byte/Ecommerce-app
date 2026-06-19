#!/bin/bash
# ============================================
# Kubernetes Setup on EC2 (Single Node)
# Run this on your EC2 instance
# ============================================

set -e

echo "🔧 Step 1: Install dependencies..."
sudo apt update -y
sudo apt install -y apt-transport-https ca-certificates curl

echo "🔧 Step 2: Install kubectl..."
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | \
    sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | \
    sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt update -y
sudo apt install -y kubectl

echo "🔧 Step 3: Install K3s (lightweight Kubernetes)..."
curl -sfL https://get.k3s.io | sh -

echo "🔧 Step 4: Configure kubectl..."
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
export KUBECONFIG=~/.kube/config
echo 'export KUBECONFIG=~/.kube/config' >> ~/.bashrc

echo "🔧 Step 5: Install Nginx Ingress Controller..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

echo "⏳ Waiting for ingress controller..."
kubectl wait --namespace ingress-nginx \
    --for=condition=ready pod \
    --selector=app.kubernetes.io/component=controller \
    --timeout=120s

echo "🔧 Step 6: Install Metrics Server (for HPA)..."
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

echo ""
echo "✅ Kubernetes (K3s) is ready!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Run: kubectl get nodes"
echo "Run: kubectl get pods -A"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
