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

echo "➡️ Running db seed..."
npx prisma db seed

echo "🚀 Starting Next.js..."
if [ "$NODE_ENV" = "development" ]; then
  echo "📦 Starting development server..."
  npm run dev:docker
else
  echo "📦 Building and starting production server..."
  npm run build
  npm run start
fi
