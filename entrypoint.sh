#!/bin/sh
set -e

if [ "$NODE_ENV" = "development" ]; then
  echo "⏳ Waiting for Mongo (local compose)..."
  until nc -z mongo 27017; do
    sleep 1
  done
  echo "✅ Local Mongo is ready."
fi

echo "➡️ Running db push..."
npx prisma db push

if [ "$NODE_ENV" = "development" ]; then
  echo "➡️ Running db seed..."
  npx prisma db seed
fi

echo "🚀 Starting Next.js..."
npm run dev:docker
