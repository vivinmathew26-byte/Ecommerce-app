#!/bin/bash
echo "Waiting for postgres..."
while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
  sleep 1
done
echo "PostgreSQL is ready!"
python manage.py migrate
python manage.py collectstatic --noinput
exec "$@"
