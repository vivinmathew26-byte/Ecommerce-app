# 🛍️ ShopEasy — E-Commerce App

Full-stack e-commerce application with Django REST + React, deployed via Jenkins CI/CD on AWS EC2 with Kubernetes.

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Django REST Framework |
| Frontend | React 18 |
| Database | PostgreSQL 15 |
| Container | Docker + Docker Compose |
| CI/CD | Jenkins |
| Orchestration | Kubernetes |
| Cloud | AWS EC2 |
| Proxy | Nginx |

## 🚀 Quick Start (Local Dev)

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/ecommerce.git
cd ecommerce

# 2. Copy env file
cp .env.example .env

# 3. Start with Docker
make dev-up

# 4. Create superuser
make createsuperuser

# App runs at:
# Frontend → http://localhost:3000
# Backend API → http://localhost:8000/api
# Django Admin → http://localhost:8000/admin
```

## 🐳 Production Deploy

```bash
# Edit .env with your EC2 IP and secrets
nano .env

# Build and start all services
make up

# Run migrations
make migrate

# App runs at http://your-ec2-ip
```

## 📁 Project Structure

```
ecommerce/
├── backend/          # Django REST API
│   ├── users/        # Auth, JWT
│   ├── products/     # Products, Categories, Reviews
│   ├── cart/         # Shopping Cart
│   ├── orders/       # Order Management
│   └── Dockerfile
├── frontend/         # React App
│   ├── src/
│   │   ├── pages/    # Home, Products, Cart, Orders
│   │   ├── components/
│   │   ├── context/  # Auth & Cart state
│   │   └── services/ # API calls
│   └── Dockerfile
├── nginx/            # Reverse Proxy config
├── k8s/              # Kubernetes manifests
├── jenkins/          # Jenkinsfile
├── docker-compose.yml
└── Makefile
```

## 🔗 API Endpoints

```
POST   /api/users/register/
POST   /api/users/login/
GET    /api/users/profile/
GET    /api/products/
GET    /api/products/:id/
GET    /api/products/categories/
POST   /api/products/reviews/
GET    /api/cart/
POST   /api/cart/
DELETE /api/cart/:id/
GET    /api/orders/
POST   /api/orders/
GET    /api/orders/:id/
```
