#!/bin/sh
set -e

echo "⏳ Waiting for Mongo..."
until nc -z mongo 27017; do
  sleep 1
done

echo "✅ Mongo is ready. Running Prisma..."

echo "➡️ Running db push..."
npx prisma db push || { echo "❌ db push failed"; exit 1; }

echo "➡️ Running db seed..."
npx prisma db seed || { echo "❌ db seed failed"; exit 1; }

echo "🚀 Starting Next.js..."
npm run dev:docker