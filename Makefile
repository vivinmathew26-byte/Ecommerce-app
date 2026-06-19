# =============================
# E-Commerce Makefile Commands
# =============================

# Dev
dev-up:
	docker-compose -f docker-compose.dev.yml up --build

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Production
up:
	docker-compose up --build -d

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	docker-compose restart

# Django commands
migrate:
	docker-compose exec backend python manage.py migrate

makemigrations:
	docker-compose exec backend python manage.py makemigrations

createsuperuser:
	docker-compose exec backend python manage.py createsuperuser

shell:
	docker-compose exec backend python manage.py shell

# Cleanup
clean:
	docker-compose down -v --remove-orphans
	docker system prune -f

# Status
status:
	docker-compose ps
