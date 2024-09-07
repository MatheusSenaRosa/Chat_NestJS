#!/bin/sh

echo "Docker-Entrypoint Backend iniciado"

npx prisma db push

echo "Docker-Entrypoint Backend finalizado"

exec "$@"