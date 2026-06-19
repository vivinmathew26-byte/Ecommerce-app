#!/bin/bash
# ============================================
# EC2 App Server Setup Script
# Run this on your EC2 BEFORE first deployment
# ============================================

set -e

echo "🔧 Installing Docker & Docker Compose..."
sudo apt update -y
sudo apt install -y docker.io docker-compose git
sudo usermod -aG docker ubuntu
sudo systemctl enable docker
sudo systemctl start docker

echo "📁 Creating app directory..."
mkdir -p /home/ubuntu/ecommerce
cd /home/ubuntu/ecommerce

echo "📝 Creating .env file..."
cat > .env << 'EOF'
SECRET_KEY=change-this-to-a-strong-random-key
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,YOUR_EC2_IP
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=StrongPassword123!
DB_HOST=db
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://YOUR_EC2_IP
REACT_APP_API_URL=/api
EOF

echo "📥 Copy docker-compose.yml to this server"
echo "   scp -i your-key.pem docker-compose.yml ubuntu@YOUR_EC2_IP:/home/ubuntu/ecommerce/"
echo "   scp -i your-key.pem nginx/nginx.conf ubuntu@YOUR_EC2_IP:/home/ubuntu/ecommerce/nginx/"

echo ""
echo "✅ EC2 App server ready!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Edit /home/ubuntu/ecommerce/.env with your real values"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
